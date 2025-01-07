import { IPubMedArticle } from '../types/science';

export const getShortAbstract = (fullAbstract: string): string => {
  if (!fullAbstract) return '';

  const sentences = fullAbstract.split(/[.!?]+/).filter((s) => s.trim());
  const shortVersion = sentences.slice(0, 3).join('. ').trim();

  return (
    shortVersion + (fullAbstract.length > shortVersion.length ? '...' : '.')
  );
};

export const getDateFilterQuery = (selectedAmountOfYears: string) => {
  if (selectedAmountOfYears !== '0') {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setFullYear(today.getFullYear() - Number(selectedAmountOfYears));
    return ` AND ("${
      pastDate.toISOString().split('T')[0]
    }"[Date - Publication] : "${
      today.toISOString().split('T')[0]
    }"[Date - Publication])`;
  }
  return '';
};

export const parseXMLAbstracts = (
  xmlData: string
): { [key: string]: string } => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
  const abstracts: { [key: string]: string } = {};

  xmlDoc.querySelectorAll('PubmedArticle').forEach((article) => {
    const pmid = article.querySelector('PMID')?.textContent;
    if (pmid) {
      const abstractText =
        article.querySelector('Abstract AbstractText')?.textContent || '';
      abstracts[pmid] = abstractText;
    }
  });

  return abstracts;
};

export const getFormattedArticles = (
  ids: string[],
  result: Record<string, IPubMedArticle>,
  abstracts: Record<string, string>
) => {
  return ids.map((id: string) => ({
    id,
    title: result[id]?.title || 'Ingen titel tillgänglig',
    authors:
      result[id]?.authors?.map((author: { name: string }) => author.name) || [],
    pubDate:
      result[id]?.sortpubdate ||
      result[id]?.pubdate ||
      'Inget datum tillgängligt',
    abstract: getShortAbstract(abstracts[id] || ''),
    journal: result[id]?.fulljournalname || '',
    volume: result[id]?.volume || '',
    issue: result[id]?.issue || '',
    pages: result[id]?.pages || '',
    doi: result[id]?.elocationid?.replace('doi: ', '') || '',
    pmid: id,
    publicationType: result[id]?.pubtype?.join(', ') || '',
  }));
};
