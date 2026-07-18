/**
 * Whether a title reads as an actual word (noun/adjective/verb), not placeholder junk like
 * "2, 4, a, b, c, d, e, f, g". Used to keep garbage titles out of the KI-Orb's context —
 * a single real word of 3+ letters (e.g. "Immatrikulieren", or one word in "Stift und Papier")
 * is enough to count as meaningful.
 */
export function isMeaningfulTitle(title: string): boolean {
  const words = title.match(/\p{L}+/gu) ?? [];
  return words.some((word) => word.length >= 3);
}

export function filterMeaningfulTitles<T extends { title: string }>(items: T[]): T[] {
  return items.filter((item) => isMeaningfulTitle(item.title));
}
