import { IScoringInfo } from '../types/documents';

export const selfAssessmentForms = [
  {
    title: 'MADRS - Montgomery-Åsberg Depression Rating Scale',
    description:
      'Ett formulär med 9 frågor som mäter depressiva symtom. Används för att bedöma svårighetsgraden av depression och för att följa förändringar över tid. Skalan täcker områden som nedstämdhet, oro, sömn, aptit och koncentrationsförmåga.',
    href: '../pdfs/MADRS.pdf',
    ariaLabel: 'Ladda ner MADRS',
    scoringId: 'MADRS',
  },
  {
    title: 'MDQ - Mood Disorder Questionnaire',
    description:
      'Ett screeningverktyg för bipolär sjukdom. Formuläret hjälper till att identifiera tidigare maniska eller hypomana episoder genom att ställa frågor om symtom, tidsperioder och påverkan på vardagslivet. Består av 13 ja/nej-frågor följt av följdfrågor.',
    href: '../pdfs/MDQ.pdf',
    ariaLabel: 'Ladda ner MDQ',
    scoringId: 'MDQ',
  },
  {
    title: 'HAD - Hospital Anxiety and Depression Scale',
    description:
      'Ett formulär med 14 frågor som mäter både ångest och depression. Särskilt utformat för att undvika påverkan från fysiska symtom. Består av två delskalor med 7 frågor vardera för ångest respektive depression. Används ofta inom primärvården.',
    href: '../pdfs/HAD.pdf',
    ariaLabel: 'Ladda ner HAD',
    scoringId: 'HAD',
  },
  {
    title: 'GAD-7 - Generalized Anxiety Disorder 7-Item Scale',
    description:
      'Ett kort screeningverktyg för generaliserat ångestsyndrom (GAD). Består av 7 frågor som mäter ångestsymtom under de senaste två veckorna. Används både för att upptäcka ångest och för att följa behandlingseffekt. Enkelt att fylla i och ger snabbt en bild av ångestnivån.',
    href: '../pdfs/GAD-7.pdf',
    ariaLabel: 'Ladda ner GAD-7',
    scoringId: 'GAD7',
  },
  {
    title: 'Stämningsdagbok',
    description:
      'Ett verktyg för att dagligen dokumentera ditt stämningsläge, sömn, aktivitetsnivå och andra viktiga faktorer. Hjälper dig att identifiera mönster och triggers i ditt mående, samt underlättar kommunikationen med vårdgivare. Rekommenderas att fyllas i dagligen under minst två veckor.',
    href: '../pdfs/diary.pdf',
    ariaLabel: 'Ladda ner Stämningsdagbok',
  },
];

export const scoringInfo: Record<string, IScoringInfo> = {
  MADRS: {
    title: 'MADRS Poängsystem',
    content: [
      'Varje fråga poängsätts från 0-6 där högre poäng indikerar svårare symtom.',
      'Total poäng: 0-60',
      '0-6: Ingen eller mycket lätt depression',
      '7-19: Lätt depression',
      '20-34: Måttlig depression',
      '35+: Svår depression',
    ],
  },
  MDQ: {
    title: 'MDQ Poängsystem',
    content: [
      'Screeningen är positiv om följande kriterier uppfylls:',
      "1. 7 eller fler 'ja'-svar på de första 13 frågorna",
      '2. Flera av dessa symtom uppträdde under samma period',
      '3. Symtomen orsakade måttliga eller allvarliga problem',
      'Ett positivt resultat indikerar behov av vidare utredning',
    ],
  },
  HAD: {
    title: 'HAD Poängsystem',
    content: [
      'Separata poäng för ångest och depression (0-21 poäng vardera)',
      'För båda delskalorna:',
      '0-7: Normal',
      '8-10: Mild',
      '11-14: Måttlig',
      '15-21: Svår',
    ],
  },
  GAD7: {
    title: 'GAD-7 Poängsystem',
    content: [
      'Total poäng: 0-21',
      '0-4: Minimal ångest',
      '5-9: Mild ångest',
      '10-14: Måttlig ångest',
      '15-21: Svår ångest',
      'Ett resultat på 10 eller högre indikerar möjlig GAD',
    ],
  },
};
