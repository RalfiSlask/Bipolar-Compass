export const SWEDISH_UNIVERSITIES_FILTERS = [
  { value: '', label: 'Alla universitet' },
  { value: 'Karolinska Institutet', label: 'Karolinska Institutet' },
  { value: 'Uppsala University', label: 'Uppsala Universitet' },
  { value: 'Lund University', label: 'Lunds Universitet' },
  { value: 'University of Gothenburg', label: 'Göteborgs Universitet' },
  { value: 'Umeå University', label: 'Umeå Universitet' },
  { value: 'Linköping University', label: 'Linköpings Universitet' },
  { value: 'Stockholm University', label: 'Stockholms Universitet' },
  { value: 'Örebro University', label: 'Örebro Universitet' },
];

export const SWEDISH_HOSPITALS_FILTERS = [
  { value: '', label: 'Alla sjukhus' },
  {
    value: 'Karolinska University Hospital',
    label: 'Karolinska Universitetssjukhuset',
  },
  {
    value: 'Sahlgrenska University Hospital',
    label: 'Sahlgrenska Universitetssjukhuset',
  },
  { value: 'Uppsala University Hospital', label: 'Akademiska sjukhuset' },
  { value: 'Skåne University Hospital', label: 'Skånes Universitetssjukhus' },
  {
    value: 'Norrlands University Hospital',
    label: 'Norrlands Universitetssjukhus',
  },
  {
    value: 'Linköping University Hospital',
    label: 'Universitetssjukhuset i Linköping',
  },
];

export const YEARS_OF_PUBLICATION_FILTERS = [
  { value: '1', label: '1 år' },
  { value: '5', label: '5 år' },
  { value: '10', label: '10 år' },
] as const;

export const TEXT_AVAILABILITY_FILTERS = [
  { id: 'hasAbstract', label: 'Har abstract', value: 'hasabstract' },
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
  { id: 'english', label: 'Engelska', value: 'english[Language]' },
  { id: 'swedish', label: 'Svenska', value: 'swedish[Language]' },
];

export const PUBLICATION_TYPE_FILTERS = [
  {
    id: 'adaptiveClinicalTrial',
    label: 'Adaptive Clinical Trial',
    value: 'adaptive clinical trial[Publication Type]',
  },
  { id: 'address', label: 'Address', value: 'address[Publication Type]' },
  {
    id: 'autobiography',
    label: 'Autobiography',
    value: 'autobiography[Publication Type]',
  },
  {
    id: 'bibliography',
    label: 'Bibliography',
    value: 'bibliography[Publication Type]',
  },
  { id: 'biography', label: 'Biography', value: 'biography[Publication Type]' },
  {
    id: 'booksAndDocuments',
    label: 'Books and Documents',
    value: 'books and documents[Publication Type]',
  },
  {
    id: 'caseReports',
    label: 'Case Reports',
    value: 'case reports[Publication Type]',
  },
  {
    id: 'classicalArticle',
    label: 'Classical Article',
    value: 'classical article[Publication Type]',
  },
  {
    id: 'clinicalConference',
    label: 'Clinical Conference',
    value: 'clinical conference[Publication Type]',
  },
  {
    id: 'clinicalStudy',
    label: 'Clinical Study',
    value: 'clinical study[Publication Type]',
  },
  {
    id: 'clinicalTrial',
    label: 'Clinical Trial',
    value: 'clinical trial[Publication Type]',
  },
  {
    id: 'clinicalTrialProtocol',
    label: 'Clinical Trial Protocol',
    value: 'clinical trial protocol[Publication Type]',
  },
  {
    id: 'clinicalTrialPhase1',
    label: 'Clinical Trial, Phase I',
    value: 'clinical trial, phase i[Publication Type]',
  },
  {
    id: 'clinicalTrialPhase2',
    label: 'Clinical Trial, Phase II',
    value: 'clinical trial, phase ii[Publication Type]',
  },
  {
    id: 'clinicalTrialPhase3',
    label: 'Clinical Trial, Phase III',
    value: 'clinical trial, phase iii[Publication Type]',
  },
  {
    id: 'clinicalTrialPhase4',
    label: 'Clinical Trial, Phase IV',
    value: 'clinical trial, phase iv[Publication Type]',
  },
  {
    id: 'clinicalTrialVeterinary',
    label: 'Clinical Trial, Veterinary',
    value: 'clinical trial, veterinary[Publication Type]',
  },
  {
    id: 'collectedWork',
    label: 'Collected Work',
    value: 'collected work[Publication Type]',
  },
  { id: 'comment', label: 'Comment', value: 'comment[Publication Type]' },
  {
    id: 'comparativeStudy',
    label: 'Comparative Study',
    value: 'comparative study[Publication Type]',
  },
  { id: 'congress', label: 'Congress', value: 'congress[Publication Type]' },
  {
    id: 'consensusDevelopmentConference',
    label: 'Consensus Development Conference',
    value: 'consensus development conference[Publication Type]',
  },
  {
    id: 'consensusDevelopmentConferenceNIH',
    label: 'Consensus Development Conference, NIH',
    value: 'consensus development conference, nih[Publication Type]',
  },
  {
    id: 'controlledClinicalTrial',
    label: 'Controlled Clinical Trial',
    value: 'controlled clinical trial[Publication Type]',
  },
  {
    id: 'correctedAndRepublishedArticle',
    label: 'Corrected and Republished Article',
    value: 'corrected and republished article[Publication Type]',
  },
  { id: 'dataset', label: 'Dataset', value: 'dataset[Publication Type]' },
  {
    id: 'dictionary',
    label: 'Dictionary',
    value: 'dictionary[Publication Type]',
  },
  { id: 'directory', label: 'Directory', value: 'directory[Publication Type]' },
  {
    id: 'duplicatePublication',
    label: 'Duplicate Publication',
    value: 'duplicate publication[Publication Type]',
  },
  { id: 'editorial', label: 'Editorial', value: 'editorial[Publication Type]' },
  {
    id: 'electronicSupplementaryMaterials',
    label: 'Electronic Supplementary Materials',
    value: 'electronic supplementary materials[Publication Type]',
  },
  {
    id: 'englishAbstract',
    label: 'English Abstract',
    value: 'english abstract[Publication Type]',
  },
  {
    id: 'equivalenceTrial',
    label: 'Equivalence Trial',
    value: 'equivalence trial[Publication Type]',
  },
  {
    id: 'evaluationStudy',
    label: 'Evaluation Study',
    value: 'evaluation study[Publication Type]',
  },
  {
    id: 'expressionOfConcern',
    label: 'Expression of Concern',
    value: 'expression of concern[Publication Type]',
  },
  {
    id: 'festschrift',
    label: 'Festschrift',
    value: 'festschrift[Publication Type]',
  },
  {
    id: 'governmentPublication',
    label: 'Government Publication',
    value: 'government publication[Publication Type]',
  },
  { id: 'guideline', label: 'Guideline', value: 'guideline[Publication Type]' },
  {
    id: 'historicalArticle',
    label: 'Historical Article',
    value: 'historical article[Publication Type]',
  },
  {
    id: 'interactiveTutorial',
    label: 'Interactive Tutorial',
    value: 'interactive tutorial[Publication Type]',
  },
  { id: 'interview', label: 'Interview', value: 'interview[Publication Type]' },
  {
    id: 'introductoryJournalArticle',
    label: 'Introductory Journal Article',
    value: 'introductory journal article[Publication Type]',
  },
  { id: 'lecture', label: 'Lecture', value: 'lecture[Publication Type]' },
  {
    id: 'legalCase',
    label: 'Legal Case',
    value: 'legal case[Publication Type]',
  },
  {
    id: 'legislation',
    label: 'Legislation',
    value: 'legislation[Publication Type]',
  },
  { id: 'letter', label: 'Letter', value: 'letter[Publication Type]' },
  {
    id: 'metaAnalysis',
    label: 'Meta-Analysis',
    value: 'meta-analysis[Publication Type]',
  },
  {
    id: 'multicenterStudy',
    label: 'Multicenter Study',
    value: 'multicenter study[Publication Type]',
  },
  { id: 'news', label: 'News', value: 'news[Publication Type]' },
  {
    id: 'newspaperArticle',
    label: 'Newspaper Article',
    value: 'newspaper article[Publication Type]',
  },
  {
    id: 'observationalStudy',
    label: 'Observational Study',
    value: 'observational study[Publication Type]',
  },
  {
    id: 'observationalStudyVeterinary',
    label: 'Observational Study, Veterinary',
    value: 'observational study, veterinary[Publication Type]',
  },
  { id: 'overall', label: 'Overall', value: 'overall[Publication Type]' },
  {
    id: 'patientEducationHandout',
    label: 'Patient Education Handout',
    value: 'patient education handout[Publication Type]',
  },
  {
    id: 'periodicalIndex',
    label: 'Periodical Index',
    value: 'periodical index[Publication Type]',
  },
  {
    id: 'personalNarrative',
    label: 'Personal Narrative',
    value: 'personal narrative[Publication Type]',
  },
  { id: 'portrait', label: 'Portrait', value: 'portrait[Publication Type]' },
  {
    id: 'practiceGuideline',
    label: 'Practice Guideline',
    value: 'practice guideline[Publication Type]',
  },
  {
    id: 'pragmaticClinicalTrial',
    label: 'Pragmatic Clinical Trial',
    value: 'pragmatic clinical trial[Publication Type]',
  },
  { id: 'preprint', label: 'Preprint', value: 'preprint[Publication Type]' },
  {
    id: 'publishedErratum',
    label: 'Published Erratum',
    value: 'published erratum[Publication Type]',
  },
  {
    id: 'randomizedControlledTrial',
    label: 'Randomized Controlled Trial',
    value: 'randomized controlled trial[Publication Type]',
  },
  {
    id: 'randomizedControlledTrialVeterinary',
    label: 'Randomized Controlled Trial, Veterinary',
    value: 'randomized controlled trial, veterinary[Publication Type]',
  },
  {
    id: 'researchSupportAmericanRecoveryAndReinvestmentAct',
    label: 'Research Support, American Recovery and Reinvestment Act',
    value:
      'research support, american recovery and reinvestment act[Publication Type]',
  },
  {
    id: 'researchSupportNIHExtramural',
    label: 'Research Support, N.I.H., Extramural',
    value: 'research support, n.i.h., extramural[Publication Type]',
  },
  {
    id: 'researchSupportNIHIntramural',
    label: 'Research Support, N.I.H., Intramural',
    value: 'research support, n.i.h., intramural[Publication Type]',
  },
  {
    id: 'researchSupportNonUSGovt',
    label: "Research Support, Non-U.S. Gov't",
    value: "research support, non-u.s. gov't[Publication Type]",
  },
  {
    id: 'researchSupportUSGovtNonPHS',
    label: "Research Support, U.S. Gov't, Non-P.H.S.",
    value: "research support, u.s. gov't, non-p.h.s.[Publication Type]",
  },
  {
    id: 'researchSupportUSGovtPHS',
    label: "Research Support, U.S. Gov't, P.H.S.",
    value: "research support, u.s. gov't, p.h.s.[Publication Type]",
  },
  {
    id: 'researchSupportUSGovt',
    label: "Research Support, U.S. Gov't",
    value: "research support, u.s. gov't[Publication Type]",
  },
  {
    id: 'retractedPublication',
    label: 'Retracted Publication',
    value: 'retracted publication[Publication Type]',
  },
  {
    id: 'retractionOfPublication',
    label: 'Retraction of Publication',
    value: 'retraction of publication[Publication Type]',
  },
  { id: 'review', label: 'Review', value: 'review[Publication Type]' },
  {
    id: 'scientificIntegrityReview',
    label: 'Scientific Integrity Review',
    value: 'scientific integrity review[Publication Type]',
  },
  {
    id: 'systematicReview',
    label: 'Systematic Review',
    value: 'systematic review[Publication Type]',
  },
  {
    id: 'technicalReport',
    label: 'Technical Report',
    value: 'technical report[Publication Type]',
  },
  {
    id: 'twinStudy',
    label: 'Twin Study',
    value: 'twin study[Publication Type]',
  },
  {
    id: 'validationStudy',
    label: 'Validation Study',
    value: 'validation study[Publication Type]',
  },
  {
    id: 'videoAudioMedia',
    label: 'Video-Audio Media',
    value: 'video-audio media[Publication Type]',
  },
  { id: 'webcast', label: 'Webcast', value: 'webcast[Publication Type]' },
];
