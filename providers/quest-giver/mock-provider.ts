import type { QuestGiverInput, QuestGiverProvider, QuestGiverSuggestion } from './types';

interface Template {
  title: (goal: string) => string;
  icon: string;
  type: 'task' | 'capstone';
}

const BABY_STEP_TEMPLATES: Template[] = [
  { title: (goal) => `Verbringe 5 Minuten mit Recherche zu "${goal}"`, icon: '15', type: 'task' },
  { title: () => 'Schreibe drei Stichpunkte zum nächsten konkreten Schritt auf', icon: '2', type: 'task' },
  { title: () => 'Öffne eine leere Notiz und tippe nur den ersten Satz', icon: '3', type: 'task' },
  {
    title: (goal) => `Frage jemanden, der "${goal}" schon geschafft hat, um einen Tipp`,
    icon: '13',
    type: 'task',
  },
  { title: () => 'Räume 2 Minuten lang deinen Arbeitsbereich auf, bevor du startest', icon: '6', type: 'task' },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Deterministic, network-free suggestions — keeps the Orb fully usable offline in the MVP. */
export class MockQuestGiverProvider implements QuestGiverProvider {
  async suggestNextStep(input: QuestGiverInput): Promise<QuestGiverSuggestion> {
    await delay(400);

    const existing = new Set(input.existingNodeTitles.map((t) => t.toLowerCase()));
    const goal = input.projectGoal.trim() || 'dein Ziel';

    for (const template of BABY_STEP_TEMPLATES) {
      const title = template.title(goal);
      if (!existing.has(title.toLowerCase())) {
        return {
          title,
          icon: template.icon,
          type: template.type,
          description: input.strugglingNote ? `Baby-Step, weil: ${input.strugglingNote}` : undefined,
        };
      }
    }

    return {
      title: `Mach jetzt 5 Minuten weiter an "${goal}"`,
      icon: '12',
      type: 'task',
    };
  }
}
