import { getLlmClient } from '@/server/llm';

/** Generic, vendor-neutral endpoint. Only this file knows a real LlmClient exists. */
export async function POST(request: Request) {
  const body = await request.json();

  const projectGoal = typeof body.projectGoal === 'string' ? body.projectGoal : '';
  const strugglingNote = typeof body.strugglingNote === 'string' ? body.strugglingNote : undefined;
  const existingNodeTitles = Array.isArray(body.existingNodeTitles)
    ? body.existingNodeTitles.filter((t: unknown): t is string => typeof t === 'string')
    : [];

  if (!projectGoal) {
    return Response.json({ error: 'projectGoal is required' }, { status: 400 });
  }

  try {
    const llm = getLlmClient();
    const step = await llm.generateStructuredStep({ projectGoal, strugglingNote, existingNodeTitles });
    return Response.json(step);
  } catch (error) {
    console.error('quest-giver endpoint failed', error);
    return Response.json({ error: 'Failed to generate a suggestion' }, { status: 502 });
  }
}
