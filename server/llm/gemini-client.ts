import { SKILL_ICONS } from '@/constants/skill-icons';
import type { LlmClient, LlmGeneratedTree, LlmPrompt, LlmStructuredStep, LlmTreePrompt } from './types';

const VALID_ICON_IDS = new Set(SKILL_ICONS.map((icon) => icon.id));

const REQUEST_TIMEOUT_MS = 15_000;
const VALID_TYPES = new Set(['task']);
const MAX_TITLE_WORDS = 3;

// A full tree is a much bigger generation than a single step — give it more room to finish.
const TREE_REQUEST_TIMEOUT_MS = 45_000;

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * A fixed enum order biases a constrained model toward always picking the first plausible
 * entry regardless of topic — shuffling per call breaks that anchoring and gives real variety.
 */
function buildIconCatalog(): { ids: string[]; text: string } {
  const shuffledIcons = shuffled(SKILL_ICONS);
  return {
    ids: shuffledIcons.map((icon) => icon.id),
    text: shuffledIcons.map((icon) => `${icon.id}=${icon.label} (${icon.keywords.slice(0, 3).join('/')})`).join('\n'),
  };
}

/** Icon and prerequisite-id enums depend on this request's existing nodes, so the schema is built per call. */
function buildResponseSchema(iconIds: string[], existingNodeIds: string[]) {
  return {
    type: 'OBJECT',
    properties: {
      title: {
        type: 'STRING',
        description:
          'Kurzer Name des Schritts: 1 bis maximal 3 Wörter. Kein ganzer Satz, keine Satzzeichen. Die ausführliche Erklärung gehört ins "description"-Feld.',
      },
      description: { type: 'STRING' },
      icon: { type: 'STRING', enum: iconIds },
      type: { type: 'STRING', enum: ['task'] },
      prerequisiteNodeIds: {
        type: 'ARRAY',
        items: existingNodeIds.length > 0 ? { type: 'STRING', enum: existingNodeIds } : { type: 'STRING' },
      },
    },
    required: ['title', 'type', 'prerequisiteNodeIds'],
  };
}

/**
 * Icon enum depends on this request's shuffled catalog, so the schema is built per call.
 * "thinking_process" is declared first — structured-output generation follows property
 * declaration order, so the model is forced to reason before it commits to nodes/edges.
 */
function buildTreeResponseSchema(iconIds: string[]) {
  return {
    type: 'OBJECT',
    properties: {
      thinking_process: {
        type: 'ARRAY',
        items: { type: 'STRING' },
        description:
          'Kurze Denkschritte VOR der eigentlichen Tree-Erzeugung: (1) kognitive Reibungspunkte des Ziels analysieren, (2) reibungsärmste Tier-1-Einstiegspunkte identifizieren, (3) Abhängigkeiten/Verzweigungen für spätere Schritte mappen. Darf auf Englisch bleiben.',
      },
      nodes: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            id: {
              type: 'STRING',
              description: 'Kurze, eindeutige id innerhalb dieser Antwort (z.B. "n1"). Keine echte Datenbank-id.',
            },
            title: { type: 'STRING' },
            description: { type: 'STRING' },
            icon: { type: 'STRING', enum: iconIds },
          },
          required: ['id', 'title'],
        },
      },
      edges: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            from: { type: 'STRING', description: 'id eines Knotens, der Voraussetzung ist.' },
            to: { type: 'STRING', description: 'id des Knotens, der die Voraussetzung hat.' },
          },
          required: ['from', 'to'],
        },
      },
    },
    required: ['thinking_process', 'nodes', 'edges'],
  };
}

/** MVP implementation: Google Gemini API via Google AI Studio, structured JSON output. */
export class GeminiClient implements LlmClient {
  constructor(
    private readonly apiKey: string,
    private readonly endpoint: string
  ) {}

  async generateStructuredStep(prompt: LlmPrompt): Promise<LlmStructuredStep> {
    const existingNodeIds = prompt.existingNodes.map((n) => n.id);
    const existingStepsText =
      prompt.existingNodes.length > 0 ? prompt.existingNodes.map((n) => `- ${n.id}: ${n.title}`).join('\n') : 'keine';
    const iconCatalog = buildIconCatalog();

    const promptText = [
      `Projekttitel: ${prompt.projectTitle}`,
      `Bereits vorhandene Schritte (id: Titel):\n${existingStepsText}`,
      'Schließe aus Projekttitel und den bereits vorhandenen Schritten, was inhaltlich als Nächstes sinnvoll ist — es gibt keine weitere Nutzereingabe.',
      'Schlage GENAU EINEN nicht-prokrastinierbaren, konkreten nächsten Baby-Step vor (max. 2 Minuten Einstiegsaufwand).',
      '"title" ist nur ein kurzer Name (1 bis maximal 3 Wörter, z.B. "Uni recherchieren" oder "Formular ausfüllen") — die ausführliche Erklärung kommt ins "description"-Feld, nicht in den Titel.',
      'Setze "prerequisiteNodeIds" auf die ids der bereits vorhandenen Schritte, die zwingend VOR diesem neuen Schritt abgeschlossen sein müssen. Leeres Array, falls keiner passt oder keine Schritte vorhanden sind.',
      `Wähle für "icon" die id aus der folgenden Liste, deren Stichwörter am besten zum Titel dieses konkreten Schritts passen (id=Label (Stichwörter)):\n${iconCatalog.text}`,
      'Variiere die Icon-Wahl je nach Thema des Schritts — nicht wiederholt dieselbe id verwenden, nur weil sie vorher gepasst hat.',
      'Antworte ausschließlich als JSON gemäß Schema.',
    ]
      .filter(Boolean)
      .join('\n');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response: Response;
    try {
      // Key goes in a header, never the URL — query strings end up in access logs and
      // proxy history, headers on this endpoint don't.
      response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': this.apiKey },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: buildResponseSchema(iconCatalog.ids, existingNodeIds),
            temperature: 1,
          },
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      // Truncated, status-only detail — the upstream body is never trusted to be safe to log in full.
      throw new Error(`Gemini request failed: ${response.status} ${(await response.text()).slice(0, 200)}`);
    }

    const data = await response.json();
    const text: string | undefined = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Gemini response missing structured content');

    const parsed = JSON.parse(text) as LlmStructuredStep;
    if (!parsed.title || !VALID_TYPES.has(parsed.type)) {
      throw new Error('Gemini response failed schema validation');
    }

    // Schema enums constrain the model, but its output is never trusted blindly — re-check
    // against the actual known-good sets before this leaves the server boundary.
    const existingIdSet = new Set(existingNodeIds);
    const prerequisiteNodeIds = Array.isArray(parsed.prerequisiteNodeIds)
      ? parsed.prerequisiteNodeIds.filter((id): id is string => typeof id === 'string' && existingIdSet.has(id))
      : [];
    const icon = typeof parsed.icon === 'string' && VALID_ICON_IDS.has(parsed.icon) ? parsed.icon : undefined;
    // Schema description asks for 1-3 words, but free text is never schema-enforced —
    // clamp defensively so a rambling title never reaches the tree UI.
    const titleWords = parsed.title.trim().split(/\s+/);
    const title = titleWords.slice(0, MAX_TITLE_WORDS).join(' ');

    return { ...parsed, title, icon, prerequisiteNodeIds };
  }

  async generateSkillTree(prompt: LlmTreePrompt): Promise<LlmGeneratedTree> {
    const iconCatalog = buildIconCatalog();

    // Persona/Task/Decomposition-Rules are the user's system prompt, verbatim. Only "Rules for
    // Output Format" and "JSON Schema Requirement" are adapted to this app's actual data model:
    // a single node type ("task"), no stored XP/tier/quest-type fields, flat nodes+edges instead
    // of nested tiers[].nodes[]. Tier/XP/quest-type thinking is redirected into
    // "thinking_process", into title/description wording, and into the edges graph shape.
    const systemPrompt = [
      'You are an expert Game Designer, Behavioral Psychologist, and Productivity Architect. Your sole',
      'objective is to cure human procrastination by transforming overwhelmingly large real-world goals',
      '(provided by the user) into a gamified "Skill Tree" inspired by RPGs like World of Warcraft.',
      '',
      'Your core philosophy is the "Baby Step" methodology: Procrastination is not a time-management',
      'issue; it is caused by cognitive overload, emotional dysregulation, and action paralysis. To',
      'bypass the brain\'s amygdala resistance, a large goal must be decomposed into absurdly small,',
      'frictionless, and immediately actionable micro-steps.',
      '',
      'Input Variables you will receive from the user:',
      '    PROJECT_TITLE: The high-level goal.',
      '    PROJECT_DESCRIPTION: Context and details about the specific goal.',
      '',
      'Your Task:',
      '    SEQUENTIAL THINKING: First, analyze the cognitive load of the goal and break it down',
      '    logically step-by-step. Identify the psychological friction points.',
      '    DECONSTRUCTION: Translate this analysis into a Directed Acyclic Graph (DAG) representing a',
      '    "Skill Tree" with Tiers and Nodes (baby steps).',
      '',
      'Rules for Goal Decomposition:',
      '    EXTREME MICRO-STEPPING: The steps in Tier 1 MUST be incredibly trivial (e.g., "Stand up",',
      '    "Open a new tab", "Pick up one piece of paper"). They must take less than 2 minutes to',
      '    complete to build immediate psychological momentum.',
      '    LOGICAL SEQUENCING: Steps must follow a strict chronological and causal order. Step B cannot',
      '    be completed unless Step A is done.',
      '    GAMIFICATION: Assign WoW-style RPG elements (e.g., "Quest", "Talent", "Passive Ability").',
      '    Assign an XP value to each step. Trivial steps grant little XP (e.g., 10 XP), major',
      '    milestones grant more (e.g., 100 XP).',
      '    BRANCHING PATHS: Create parallel branches where applicable.',
      '    TIER PROGRESSION: Structure the tree vertically in Tiers (e.g., Tier 1: Novice, Tier 2:',
      '    Apprentice, Tier 3: Journeyman).',
      '',
      'Rules for Output Format:',
      '    Respond ONLY with a valid, well-formed JSON object matching the schema below (enforced by the',
      '    API\'s structured output mode) — no markdown code fences, no explanation text before or after.',
      '    The JSON has exactly three top-level fields: "thinking_process", "nodes", "edges". There is',
      '    no tier-nesting in the output — sequencing and branching are expressed purely through "edges".',
      '    "thinking_process" may stay in English regardless of the user\'s input language — it is',
      '    internal reasoning, not shown to the end user as-is.',
      '    All "title"/"description" values inside "nodes" MUST match the language used in',
      '    PROJECT_TITLE/PROJECT_DESCRIPTION.',
      '    For each node\'s "icon", choose the id from the provided icon catalog whose keywords best fit',
      '    that specific step — vary the choice across nodes, don\'t reuse one id repeatedly.',
      '',
      'JSON Schema Requirement:',
      'This system only supports a single node type (baby-step "task") with no stored XP/tier/quest-type',
      'fields — channel your Tier-/XP-/Quest-type thinking from the Rules for Goal Decomposition above',
      'into "thinking_process", into "title"/"description" wording, and into the branching shape of',
      '"edges" instead of separate output fields. Fill "thinking_process" first, before "nodes"/"edges":',
      'Step 1 analyze the goal\'s cognitive friction, Step 2 identify the lowest-friction Tier-1 starting',
      'points, Step 3 map dependencies/branches for later steps.',
      '',
      'Every "from"/"to" value in "edges" must match an existing node "id". Do not create circular',
      'dependencies.',
    ].join('\n');

    const promptText = [
      systemPrompt,
      '',
      `PROJECT_TITLE: ${prompt.projectTitle}`,
      `PROJECT_DESCRIPTION: ${prompt.goalDescription}`,
      `Icon-Katalog für "icon" (id=Label (Stichwörter)):\n${iconCatalog.text}`,
    ].join('\n');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TREE_REQUEST_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': this.apiKey },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: buildTreeResponseSchema(iconCatalog.ids),
            temperature: 1,
          },
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      throw new Error(`Gemini request failed: ${response.status} ${(await response.text()).slice(0, 200)}`);
    }

    const data = await response.json();
    const text: string | undefined = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Gemini response missing structured content');

    const parsed = JSON.parse(text) as LlmGeneratedTree;
    if (!Array.isArray(parsed.nodes) || parsed.nodes.length === 0 || !Array.isArray(parsed.edges)) {
      throw new Error('Gemini response failed schema validation');
    }

    // Schema enums constrain the model, but its output is never trusted blindly — re-check
    // the icon set here; graph-shape validation (unique ids, known edge targets, acyclic,
    // has a root) happens downstream in importSkillTree, which already owns that logic.
    const nodes = parsed.nodes
      .filter((n): n is LlmGeneratedTree['nodes'][number] => typeof n?.id === 'string' && typeof n?.title === 'string')
      .map((n) => ({
        id: n.id,
        title: n.title,
        description: typeof n.description === 'string' ? n.description : undefined,
        icon: typeof n.icon === 'string' && VALID_ICON_IDS.has(n.icon) ? n.icon : undefined,
      }));
    const edges = parsed.edges.filter(
      (e): e is LlmGeneratedTree['edges'][number] => typeof e?.from === 'string' && typeof e?.to === 'string'
    );

    return { nodes, edges };
  }
}
