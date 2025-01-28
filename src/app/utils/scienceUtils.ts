import { IPubMedArticle } from '../types/science';

/**
 * Returns a short version of an abstract
 * @param {string} fullAbstract
 * @returns {string}
 */
export const getShortAbstract = (fullAbstract: string): string => {
  if (!fullAbstract) return '';

  // Splits the abstract into sentences based on the punctuation marks
  const sentences = fullAbstract.split(/[.!?]+/).filter((s) => s.trim());
  const shortVersion = sentences.slice(0, 3).join('. ').trim();

  return (
    shortVersion + (fullAbstract.length > shortVersion.length ? '...' : '.')
  );
};

/**
 * Returns a date filter query based on the selected amount of years
 * @param {string} selectedAmountOfYears
 * @returns {string}
 */
export const getDateFilterQuery = (selectedAmountOfYears: string): string => {
  // If the selected amount of years is not 0, it means that the user has selected a specific amount of years
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

/**
 * Parses XML abstracts from a given string
 * Uses a DOMParser to parse the XML data and extract the abstracts which is then returned as a record *
 * A record is used to store the abstracts with the PMID as the key and the abstract as the value
 * @param {string} xmlData
 * @returns {Record<string, string>}
 */
export const parseXMLAbstracts = (
  xmlData: string
): { [key: string]: string } => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
  const abstracts: { [key: string]: string } = {};

  // Loops through all the articles in the XML document and extracts the PMID and abstract
  // A PMID is a unique identifier for each article
  xmlDoc.querySelectorAll('PubmedArticle').forEach((article) => {
    const pmid = article.querySelector('PMID')?.textContent;
    if (pmid) {
      const abstractText =
        article.querySelector('Abstract AbstractText')?.textContent || '';
      abstracts[pmid] = abstractText;
    }
  });

  // Returns the abstracts as a record with the PMID as the key and the abstract as the value
  return abstracts;
};

/**
 * Formats the articles based on the PMID, result and abstracts
 * @param {string[]} ids
 * @param {Record<string, IPubMedArticle>} result
 * @param {Record<string, string>} abstracts
 * @returns {Record<string, IArticle>}
 */
export const getFormattedArticles = (
  ids: string[],
  result: Record<string, IPubMedArticle>,
  abstracts: Record<string, string>
) => {
  // Maps over the ids and returns an array of articles
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
