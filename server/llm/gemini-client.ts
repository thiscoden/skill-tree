import { SKILL_ICONS } from '@/constants/skill-icons';
import type { LlmClient, LlmPrompt, LlmStructuredStep } from './types';

const VALID_ICON_IDS = new Set(SKILL_ICONS.map((icon) => icon.id));

const REQUEST_TIMEOUT_MS = 15_000;
const VALID_TYPES = new Set(['task']);
const MAX_TITLE_WORDS = 3;

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
}
