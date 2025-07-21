import { capitalizeFirstLetter } from './textUtils';

const slugToBreadcrumbTitle: Record<string, string> = {
  'sok': 'Sök',
  'anhoriga': 'Anhöriga',
  'hjalp': 'Hjälp',
  'behandling': 'Behandling',
  'bipolaritet': 'Bipolaritet',
  'multimedia': 'Multimedia',
  'forskning': 'Forskning',
  'om-oss': 'Om oss',
  'vad-ar-bipolaritet': 'Vad är bipolaritet',
  'diagnoser': 'Diagnoser',
  'symptom': 'Symptom',
  'vanliga-fragor': 'Vanliga fragor',
  'sjamlag': 'Självhjälp',
  'medicinska-behandlingar': 'Medicinska behandlingar',
  'terapi': 'Terapi',
  'verktyg-och-dokument': 'Verktyg & Dokument',
  'bocker': 'Böcker',
  'musik': 'Musik',
  'podcasts': 'Podcasts',
  'filmer': 'Filmer',
};

export const getBreadcrumbTitle = (
  slug: string,
  fallbackTitle?: string
): string => {
  // Extract the last segment from the slug for mapping
  const lastSegment = slug.split('/').filter(Boolean).pop() || '';

  return (
    slugToBreadcrumbTitle[lastSegment] ||
    fallbackTitle ||
    capitalizeFirstLetter(lastSegment)
  );
};
