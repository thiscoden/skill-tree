# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

This file is the source of truth. If code and this file disagree, treat the code as a bug to fix,
not a reason to ignore this file — unless the divergence is the known Capstone/passive-bonus
legacy called out in the migration note below.

## Project

Skill Tree — Expo/React Native (SDK 54) app that turns a goal into a dependency-gated tree of
tasks. Nodes start `locked`/`available` and flip to `mastered`; mastering a node re-evaluates its
direct children and unlocks the ones whose prerequisites are now all satisfied. Local-first: all
state lives in on-device SQLite (`expo-sqlite`), no user accounts yet.

Creating a project (`app/project/new.tsx`) with a meaningful title + goal description triggers a
one-shot LLM call (`providers/tree-generator/`) that generates a full skill tree, persisted via
`db/import-skill-tree.ts`. The older "KI-Orb" (AI orb, `providers/quest-giver/`) that suggested one
next step at a time is **disabled bis auf Weiteres** — its entry points are commented out in
`app/(tabs)/tree.tsx` and `app/_layout.tsx`, code otherwise left intact and reachable again by
uncommenting those two spots.

## Commands

```bash
npm run start          # expo start (Metro, pick platform interactively)
npm run android        # expo start --android
npm run ios            # expo start --ios
npm run web            # expo start --web
npm run lint           # expo lint (eslint-config-expo flat config)
npm test               # jest (jest-expo preset)
npx jest domain/unlock.test.ts          # single test file
npx jest -t "resolves a diamond graph"  # single test by name
npx tsc --noEmit       # typecheck (no dedicated script exists)
```

## Architecture — strict layering

One-directional: `ui (app/, components/) -> viewmodel/ -> domain/ -> db/repositories/ -> db/client.ts`.
Screens never write raw SQL; they call repositories or domain functions. Do not skip a layer.

- **`db/schema.ts`** — migration runner keyed off `PRAGMA user_version`. Add a migration by
  appending a SQL string to `MIGRATIONS` and bumping `SCHEMA_VERSION`; never edit a shipped one.
- **`db/repositories/*`** — one file per table, maps `snake_case` rows to `camelCase` types from
  `db/types.ts`. Only layer that touches `expo-sqlite`.
- **`domain/unlock.ts`** — pure, DB-free graph logic. AND-only semantics: a node unlocks only when
  *every* incoming edge points at a mastered node. Covered by `domain/unlock.test.ts` — extend
  these tests directly when changing unlock semantics.
- **`domain/mastery.ts`** — only place that mutates node state (`markMastered`, `markUnmastered`).
- **`viewmodel/skill-tree-viewmodel.ts`** — renderer-agnostic `{ nodes, edges, loading, reload }`;
  `components/skill-tree/tree-canvas.tsx` never touches the db directly. `layout.ts` computes tiers
  by prerequisite depth at render time, not the stored `tier` column.
  Das Layout in `layout.ts` berechnet eine Mindestbreite von 320. Die Extra-Breite muss zwingend
  symmetrisch (links und rechts) auf die x-Koordinaten der Nodes verteilt werden, da der Baum sonst
  linkslastig gerendert wird. Regel: Teste Layout-Änderungen immer über `layout.test.ts` und prüfe
  explizit, ob ein einzelner Node exakt bei `width / 2` zentriert ist.

### Gemini backend proxy (tree-generator, formerly KI-Orb)

Three-layer indirection — no LLM vendor name leaks past the server boundary. Same pattern used by
both the active tree-generator and the disabled quest-giver (KI-Orb):

1. **`providers/tree-generator/`** — app-side contract for the one-shot full-tree generation.
   `index.ts` is the one swap point: picks `MockTreeGeneratorProvider` (offline default) or
   `BackendTreeGeneratorProvider` based on `EXPO_PUBLIC_LLM_BACKEND_URL`. Never call a concrete
   provider from a screen directly. `providers/quest-giver/` is the same pattern for the disabled
   single-step KI-Orb — dead code, left intact, shares the same env var.
2. **`app/api/generate-tree+api.ts`** (active) / **`app/api/quest-giver+api.ts`** (dead code) —
   server-only Expo Router API routes. Vendor-neutral body, string length caps, in-memory
   per-process rate limit (no auth yet, so this is the only cost-abuse guard — read the comments
   before touching limits).
3. **`server/llm/`** — server-only vendor abstraction (`LlmClient`/`GeminiClient`,
   `generateSkillTree`/`generateStructuredStep`). `LLM_PROVIDER`/`LLM_API_KEY`/`LLM_ENDPOINT` from
   env. `LLM_API_KEY` stays server-only (never `EXPO_PUBLIC_` prefix), sent as a header, never a
   query string. The system prompt used by `generateSkillTree` is supplied and de-gamified —
   Baby-Step/cognitive-load decomposition, no RPG/quest/XP framing (`gemini-client.ts`).

Preserve the vendor-neutral contract at each boundary — swapping the LLM vendor must stay confined
to `server/llm/`.

### Gemini model selection

Do not hardcode Gemini model names in feature code. Reuse the configured default endpoint from
`server/llm/index.ts` first. Alternative models are allowed only as env overrides, not new code
defaults. Do not introduce `gemini-2.5-*` model defaults; these caused 404s for new users. Before
changing models, search existing `DEFAULT_GEMINI_*` constants and keep `tsc` + tests green.

## Project scope & design — CURRENT RULES

**Capstones and passive bonuses are cut.** The skill tree has exactly one node shape: **Task**
(square). `NodeType` (`db/types.ts`) is `'task'` only — do not reintroduce an octagon/capstone or
circle/passive-bonus variant, in the DB schema, the LLM contracts, or the renderer.

- `db/schema.ts` migration 2 collapsed any pre-existing `'capstone'` rows to `'task'` and tightened
  the `nodes.type` CHECK to `'task'` only — do not loosen it back.
- Visual states for a Task node:
  - `locked` — grey/matte, muted opacity, no animation.
  - `available` — full color, pulsing (Reanimated `withRepeat`/`withSequence`).
  - `mastered` — gold border with a glow effect (Reanimated), no pulse decay.
- KI-Orb button (`components/orb/floating-orb.tsx`) uses the Liquid Glass effect
  (`expo-glass-effect`, `GlassView` / `isLiquidGlassAvailable()`, falling back to `BlurView`) and
  Apple SF Symbols via `IconSymbol` — currently unreachable, see the tree-generator note above.

## Rendering technology — DO NOT CHANGE

Skill tree rendering is **Views + `react-native-svg`** (connector lines only) **+ Reanimated v4**
**+ `react-native-gesture-handler`** (pan/pinch on the canvas). This is a deliberate choice to keep
native accessibility and haptics on plain Views.

**Never introduce `react-native-skia`, WebGPU, or three.js** for the skill tree, in any PR, however
small the ask.

### CRITICAL: GestureHandlerRootView

Any `GestureDetector` / `Gesture.Pan()` / `Gesture.Pinch()` usage crashes the app without a root
wrapper. `app/_layout.tsx` already wraps the entire app in
`<GestureHandlerRootView style={{ flex: 1 }}>` at the top, above `ThemeProvider` and the `Stack`.

**Never remove this wrapper from `app/_layout.tsx`. Never move it down into an individual screen.**
If a gesture crash appears, check this wrapper is still there and still at the root — don't add a
second one somewhere else.

## Env vars

- `LLM_PROVIDER`, `LLM_API_KEY`, `LLM_ENDPOINT` — server-only, read by `server/llm/index.ts`.
- `EXPO_PUBLIC_LLM_BACKEND_URL` — client-visible; unset keeps the app on the offline mock provider
  (used by both `providers/tree-generator/` and, if re-enabled, `providers/quest-giver/`).

## Conventions

- File names are kebab-case (`skill-tree-viewmodel.ts`, `node-form.tsx`), including components.
- IDs are UUIDs via `db/uuid.ts`; timestamps are ISO strings, not epoch numbers.
- Import via the `@/*` path alias, not relative `../../` chains.

## Agent behavior / token efficiency

RTK and Caveman run in the background for this user — always answer in Caveman style: short,
dense, technical only, no filler. Code, commits, and PR text stay written normally (Caveman style
applies to chat replies, not to file content).

On API timeout or context overload: stop, don't keep guessing or retrying blind. Wait for the user
to run `/compact` or `/clear`.
