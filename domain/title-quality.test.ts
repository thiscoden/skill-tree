import { isMeaningfulTitle, filterMeaningfulTitles } from './title-quality';

describe('isMeaningfulTitle', () => {
  it('accepts a multi-word title with real words', () => {
    expect(isMeaningfulTitle('Stift und Papier')).toBe(true);
  });

  it('accepts a single long real word', () => {
    expect(isMeaningfulTitle('Immatrikulieren')).toBe(true);
  });

  it('rejects a comma-separated list of single characters', () => {
    expect(isMeaningfulTitle('2, 4, a, b, c, d, e, f, g')).toBe(false);
  });

  it('rejects an empty or whitespace-only title', () => {
    expect(isMeaningfulTitle('   ')).toBe(false);
    expect(isMeaningfulTitle('')).toBe(false);
  });
});

describe('filterMeaningfulTitles', () => {
  it('keeps only items with a meaningful title', () => {
    const items = [{ title: 'Immatrikulieren' }, { title: 'a, b, c' }, { title: 'Stift und Papier' }];
    expect(filterMeaningfulTitles(items).map((i) => i.title)).toEqual(['Immatrikulieren', 'Stift und Papier']);
  });
});
