export const SWEDISH_UNIVERSITIES_FILTERS = [
  { id: '', value: '', label: 'Alla universitet' },
  {
    id: 'Karolinska Institutet',
    value: 'Karolinska Institutet',
    label: 'Karolinska Institutet',
  },
  {
    id: 'Uppsala University',
    value: 'Uppsala University',
    label: 'Uppsala Universitet',
  },
  {
    id: 'Lund University',
    value: 'Lund University',
    label: 'Lunds Universitet',
  },
  {
    id: 'University of Gothenburg',
    value: 'University of Gothenburg',
    label: 'Göteborgs Universitet',
  },
  {
    id: 'Umeå University',
    value: 'Umeå University',
    label: 'Umeå Universitet',
  },
  {
    id: 'Linköping University',
    value: 'Linköping University',
    label: 'Linköpings Universitet',
  },
  {
    id: 'Stockholm University',
    value: 'Stockholm University',
    label: 'Stockholms Universitet',
  },
  {
    id: 'Örebro University',
    value: 'Örebro University',
    label: 'Örebro Universitet',
  },
];

export const SWEDISH_HOSPITALS_FILTERS = [
  { id: '', value: '', label: 'Alla sjukhus' },
  {
    id: 'Karolinska University Hospital',
    value: 'Karolinska University Hospital',
    label: 'Karolinska Universitetssjukhuset',
  },
  {
    id: 'Sahlgrenska University Hospital',
    value: 'Sahlgrenska University Hospital',
    label: 'Sahlgrenska Universitetssjukhuset',
  },
  {
    id: 'Uppsala University Hospital',
    value: 'Uppsala University Hospital',
    label: 'Akademiska sjukhuset',
  },
  {
    id: 'Skåne University Hospital',
    value: 'Skåne University Hospital',
    label: 'Skånes Universitetssjukhus',
  },
  {
    id: 'Norrlands University Hospital',
    value: 'Norrlands University Hospital',
    label: 'Norrlands Universitetssjukhus',
  },
  {
    id: 'Linköping University Hospital',
    value: 'Linköping University Hospital',
    label: 'Universitetssjukhuset i Linköping',
  },
];

export const YEARS_OF_PUBLICATION_FILTERS = [
  { id: '1', value: '1', label: '1 år' },
  { id: '5', value: '5', label: '5 år' },
  { id: '10', value: '10', label: '10 år' },
];

export const TEXT_AVAILABILITY_FILTERS = [
  { id: 'hasAbstract', label: 'Har abstrakt', value: 'hasabstract' },
  { id: 'hasFreeFullText', label: 'Fri fulltext', value: 'ffrft[filter]' },
];

export const ARTICLE_ATTRIBUTE_FILTERS = [
  {
    id: 'hasData',
    label: 'Har associerad data',
    value: 'has associated data[filter]',
  },
];

export const LANGUAGE_FILTERS = [
  { id: 'Engelska', label: 'Engelska', value: 'english[Language]' },
  { id: 'Svenska', label: 'Svenska', value: 'swedish[Language]' },
];

export const PUBLICATION_TYPE_FILTERS = [
  {
    id: 'adaptiveClinicalTrial',
    label: 'Adaptiv klinisk prövning',
    value: 'adaptive clinical trial[Publication Type]',
  },
  { id: 'address', label: 'Adress', value: 'address[Publication Type]' },
  {
    id: 'autobiography',
    label: 'Självbiografi',
    value: 'autobiography[Publication Type]',
  },
  {
    id: 'bibliography',
    label: 'Bibliografi',
    value: 'bibliography[Publication Type]',
  },
  { id: 'biography', label: 'Biografi', value: 'biography[Publication Type]' },
  {
    id: 'booksAndDocuments',
    label: 'Böcker och dokument',
    value: 'books and documents[Publication Type]',
  },
  {
    id: 'caseReports',
    label: 'Fallrapporter',
    value: 'case reports[Publication Type]',
  },
  {
    id: 'classicalArticle',
    label: 'Klassisk artikel',
    value: 'classical article[Publication Type]',
  },
  {
    id: 'clinicalConference',
    label: 'Klinisk konferens',
    value: 'clinical conference[Publication Type]',
  },
  {
    id: 'clinicalStudy',
    label: 'Klinisk studie',
    value: 'clinical study[Publication Type]',
  },
  {
    id: 'clinicalTrial',
    label: 'Klinisk prövning',
    value: 'clinical trial[Publication Type]',
  },
  {
    id: 'clinicalTrialProtocol',
    label: 'Kliniskt prövningsprotokoll',
    value: 'clinical trial protocol[Publication Type]',
  },
  {
    id: 'clinicalTrialPhase1',
    label: 'Klinisk prövning, fas I',
    value: 'clinical trial, phase i[Publication Type]',
  },
  {
    id: 'clinicalTrialPhase2',
    label: 'Klinisk prövning, fas II',
    value: 'clinical trial, phase ii[Publication Type]',
  },
  {
    id: 'clinicalTrialPhase3',
    label: 'Klinisk prövning, fas III',
    value: 'clinical trial, phase iii[Publication Type]',
  },
  {
    id: 'clinicalTrialPhase4',
    label: 'Klinisk prövning, fas IV',
    value: 'clinical trial, phase iv[Publication Type]',
  },
  {
    id: 'clinicalTrialVeterinary',
    label: 'Klinisk prövning, veterinär',
    value: 'clinical trial, veterinary[Publication Type]',
  },
  {
    id: 'collectedWork',
    label: 'Samlat verk',
    value: 'collected work[Publication Type]',
  },
  { id: 'comment', label: 'Kommentar', value: 'comment[Publication Type]' },
  {
    id: 'comparativeStudy',
    label: 'Jämförande studie',
    value: 'comparative study[Publication Type]',
  },
  { id: 'congress', label: 'Kongress', value: 'congress[Publication Type]' },
  {
    id: 'consensusDevelopmentConference',
    label: 'Konsensuskonferens',
    value: 'consensus development conference[Publication Type]',
  },
  {
    id: 'consensusDevelopmentConferenceNIH',
    label: 'Konsensuskonferens, NIH',
    value: 'consensus development conference, nih[Publication Type]',
  },
  {
    id: 'controlledClinicalTrial',
    label: 'Kontrollerad klinisk prövning',
    value: 'controlled clinical trial[Publication Type]',
  },
  {
    id: 'correctedAndRepublishedArticle',
    label: 'Korrigerad och återpublicerad artikel',
    value: 'corrected and republished article[Publication Type]',
  },
  { id: 'dataset', label: 'Dataset', value: 'dataset[Publication Type]' },
  {
    id: 'dictionary',
    label: 'Ordbok',
    value: 'dictionary[Publication Type]',
  },
  { id: 'directory', label: 'Katalog', value: 'directory[Publication Type]' },
  {
    id: 'duplicatePublication',
    label: 'Dubbelpublicering',
    value: 'duplicate publication[Publication Type]',
  },
  { id: 'editorial', label: 'Ledare', value: 'editorial[Publication Type]' },
  {
    id: 'electronicSupplementaryMaterials',
    label: 'Elektroniskt tilläggsmaterial',
    value: 'electronic supplementary materials[Publication Type]',
  },
  {
    id: 'englishAbstract',
    label: 'Engelskt abstrakt',
    value: 'english abstract[Publication Type]',
  },
  {
    id: 'equivalenceTrial',
    label: 'Ekvivalensstudie',
    value: 'equivalence trial[Publication Type]',
  },
  {
    id: 'evaluationStudy',
    label: 'Utvärderingsstudie',
    value: 'evaluation study[Publication Type]',
  },
  {
    id: 'expressionOfConcern',
    label: 'Uttryck för oro',
    value: 'expression of concern[Publication Type]',
  },
  {
    id: 'festschrift',
    label: 'Festskrift',
    value: 'festschrift[Publication Type]',
  },
  {
    id: 'governmentPublication',
    label: 'Myndighetspublikation',
    value: 'government publication[Publication Type]',
  },
  { id: 'guideline', label: 'Riktlinje', value: 'guideline[Publication Type]' },
  {
    id: 'historicalArticle',
    label: 'Historisk artikel',
    value: 'historical article[Publication Type]',
  },
  {
    id: 'interactiveTutorial',
    label: 'Interaktiv handledning',
    value: 'interactive tutorial[Publication Type]',
  },
  { id: 'interview', label: 'Intervju', value: 'interview[Publication Type]' },
  {
    id: 'introductoryJournalArticle',
    label: 'Introducerande tidskriftsartikel',
    value: 'introductory journal article[Publication Type]',
  },
  { id: 'lecture', label: 'Föreläsning', value: 'lecture[Publication Type]' },
  {
    id: 'legalCase',
    label: 'Rättsfall',
    value: 'legal case[Publication Type]',
  },
  {
    id: 'legislation',
    label: 'Lagstiftning',
    value: 'legislation[Publication Type]',
  },
  { id: 'letter', label: 'Brev', value: 'letter[Publication Type]' },
  {
    id: 'metaAnalysis',
    label: 'Metaanalys',
    value: 'meta-analysis[Publication Type]',
  },
  {
    id: 'multicenterStudy',
    label: 'Multicenterstudie',
    value: 'multicenter study[Publication Type]',
  },
  { id: 'news', label: 'Nyheter', value: 'news[Publication Type]' },
  {
    id: 'newspaperArticle',
    label: 'Tidningsartikel',
    value: 'newspaper article[Publication Type]',
  },
  {
    id: 'observationalStudy',
    label: 'Observationsstudie',
    value: 'observational study[Publication Type]',
  },
  {
    id: 'observationalStudyVeterinary',
    label: 'Observationsstudie, veterinär',
    value: 'observational study, veterinary[Publication Type]',
  },
  { id: 'overall', label: 'Översikt', value: 'overall[Publication Type]' },
  {
    id: 'patientEducationHandout',
    label: 'Patientinformation',
    value: 'patient education handout[Publication Type]',
  },
  {
    id: 'periodicalIndex',
    label: 'Tidskriftsindex',
    value: 'periodical index[Publication Type]',
  },
  {
    id: 'personalNarrative',
    label: 'Personlig berättelse',
    value: 'personal narrative[Publication Type]',
  },
  { id: 'portrait', label: 'Porträtt', value: 'portrait[Publication Type]' },
  {
    id: 'practiceGuideline',
    label: 'Praktisk riktlinje',
    value: 'practice guideline[Publication Type]',
  },
  {
    id: 'pragmaticClinicalTrial',
    label: 'Pragmatisk klinisk prövning',
    value: 'pragmatic clinical trial[Publication Type]',
  },
  {
    id: 'preprint',
    label: 'Förhandspublicering',
    value: 'preprint[Publication Type]',
  },
  {
    id: 'publishedErratum',
    label: 'Publicerad rättelse',
    value: 'published erratum[Publication Type]',
  },
  {
    id: 'randomizedControlledTrial',
    label: 'Randomiserad kontrollerad studie',
    value: 'randomized controlled trial[Publication Type]',
  },
  {
    id: 'randomizedControlledTrialVeterinary',
    label: 'Randomiserad kontrollerad studie, veterinär',
    value: 'randomized controlled trial, veterinary[Publication Type]',
  },
  {
    id: 'researchSupportAmericanRecoveryAndReinvestmentAct',
    label: 'Forskningsstöd, American Recovery and Reinvestment Act',
    value:
      'research support, american recovery and reinvestment act[Publication Type]',
  },
  {
    id: 'researchSupportNIHExtramural',
    label: 'Forskningsstöd, N.I.H., extramural',
    value: 'research support, n.i.h., extramural[Publication Type]',
  },
  {
    id: 'researchSupportNIHIntramural',
    label: 'Forskningsstöd, N.I.H., intramural',
    value: 'research support, n.i.h., intramural[Publication Type]',
  },
  {
    id: 'researchSupportNonUSGovt',
    label: 'Forskningsstöd, icke-amerikansk statlig',
    value: "research support, non-u.s. gov't[Publication Type]",
  },
  {
    id: 'researchSupportUSGovtNonPHS',
    label: 'Forskningsstöd, amerikansk statlig, icke-P.H.S.',
    value: "research support, u.s. gov't, non-p.h.s.[Publication Type]",
  },
  {
    id: 'researchSupportUSGovtPHS',
    label: 'Forskningsstöd, amerikansk statlig, P.H.S.',
    value: "research support, u.s. gov't, p.h.s.[Publication Type]",
  },
  {
    id: 'researchSupportUSGovt',
    label: 'Forskningsstöd, amerikansk statlig',
    value: "research support, u.s. gov't[Publication Type]",
  },
  {
    id: 'retractedPublication',
    label: 'Tillbakadragen publikation',
    value: 'retracted publication[Publication Type]',
  },
  {
    id: 'retractionOfPublication',
    label: 'Tillbakadragande av publikation',
    value: 'retraction of publication[Publication Type]',
  },
  {
    id: 'review',
    label: 'Översiktsartikel',
    value: 'review[Publication Type]',
  },
  {
    id: 'scientificIntegrityReview',
    label: 'Vetenskaplig integritetsgranskning',
    value: 'scientific integrity review[Publication Type]',
  },
  {
    id: 'systematicReview',
    label: 'Systematisk översikt',
    value: 'systematic review[Publication Type]',
  },
  {
    id: 'technicalReport',
    label: 'Teknisk rapport',
    value: 'technical report[Publication Type]',
  },
  {
    id: 'twinStudy',
    label: 'Tvillingstudie',
    value: 'twin study[Publication Type]',
  },
  {
    id: 'validationStudy',
    label: 'Valideringsstudie',
    value: 'validation study[Publication Type]',
  },
  {
    id: 'videoAudioMedia',
    label: 'Video-/ljudmedia',
    value: 'video-audio media[Publication Type]',
  },
  { id: 'webcast', label: 'Webbsändning', value: 'webcast[Publication Type]' },
];
