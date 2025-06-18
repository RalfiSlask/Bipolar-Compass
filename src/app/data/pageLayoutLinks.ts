import { IPageLayoutData } from '../types/pageLayouts';

const TREATMENT_LINKS = [
  {
    title: 'Medicin',
    href: '/behandling/medicinska-behandlingar',
    description:
      'Läs om olika typer av medicin som kan hjälpa vid bipolär sjukdom',
    image: '/images/treatments/medicine.webp',
  },
  {
    title: 'Självhjälp',
    href: '/behandling/sjalvhjalp',
    description:
      'Läs om olika självhjälpsmetoder som kan hjälpa vid bipolär sjukdom',
    image: '/images/treatments/selfhelp.webp',
  },
  {
    title: 'Terapi',
    href: '/behandling/terapi',
    description:
      'Läs om olika typer av terapi som kan hjälpa vid bipolär sjukdom',
    image: '/images/treatments/therapy.webp',
  },
  {
    title: 'Verktyg & Dokument',
    href: '/behandling/dokument',
    description:
      'Ladda ner krisplaner, självskattningsformulär och andra behandlingsverktyg',
    image: '/images/treatments/forms.webp',
  },
];

const ABOUT_LINKS = [
  {
    title: 'Vision',
    href: '/om-oss/vision',
    description:
      'Utforska vår vision om att skapa en trygg och informativ plattform för personer med bipolär sjukdom.',
    image: '/images/about/vision.webp',
  },
  {
    title: 'Användarvillkor',
    href: '/om-oss/villkor',
    description:
      'Läs våra användarvillkor för att förstå rättigheterna och ansvaret som kommer med att använda vår tjänst.',
    image: '/images/about/user-terms.webp',
  },
  {
    title: 'Integritetspolicy',
    href: '/om-oss/integritetspolicy',
    description:
      'Ta reda på hur vi skyddar din personliga information och säkerställer en säker användarupplevelse.',
    image: '/images/about/privacy.webp',
  },
];

const MULTIMEDIA_LINKS = [
  {
    title: 'Filmer',
    href: '/multimedia/filmer',
    description:
      'Se filmer med kända skådespelare om bipolär sjukdom och dess påverkan',
    image: '/images/multimedia/movies.webp',
  },
  {
    title: 'Musik',
    href: '/multimedia/musik',
    description:
      'Lyssna på våra olika spellistor från spotify som passar för olika sinnestillstånd',
    image: '/images/multimedia/music.webp',
  },
  {
    title: 'Podcasts',
    href: '/multimedia/podcasts',
    description: 'Utforska podcasts om bipolär sjukdom och mental hälsa',
    image: '/images/multimedia/podcasts.webp',
  },
];

const BIPOLAR_LINKS = [
  {
    title: 'Vad är bipolaritet?',
    href: '/bipolaritet/vad-ar-bipolaritet',
    description: 'Lär dig mer om vad bipolär sjukdom innebär',
    image: '/images/bipolar/bipolarity.webp',
  },
  {
    title: 'Symptom',
    href: '/bipolaritet/symptom',
    description: 'Vanliga tecken och symptom vid bipolär sjukdom',
    image: '/images/bipolar/symptoms.webp',
  },
  {
    title: 'Diagnoser',
    href: '/bipolaritet/diagnoser',
    description: 'Olika typer av bipolär sjukdom och diagnostisering',
    image: '/images/bipolar/diagnoses.webp',
  },
  {
    title: 'Vanliga frågor',
    href: '/bipolaritet/vanliga-fragor',
    description: 'Svar på ofta förekommande frågor',
    image: '/images/bipolar/faq.webp',
  },
];

export const PAGE_LAYOUT_DATA: Record<string, IPageLayoutData> = {
  bipolar: {
    title: 'Bipolär sjukdom',
    description:
      'Bipolär sjukdom är en psykisk sjukdom som kännetecknas av kraftiga svängningar i stämningsläget. Personer med sjukdomen upplever perioder av depression och mani eller hypomani.',
    subDescription:
      'Här kan du läsa mer om symtom, olika typer av diagnos och få svar på vanliga frågor om sjukdomen.',
    links: BIPOLAR_LINKS,
  },
  multimedia: {
    title: 'Multimedia',
    description:
      'Utforska vårt multimedia-bibliotek där vi har samlat ett urval av filmer, musik och podcasts som belyser olika aspekter av bipolär sjukdom. Genom att kombinera konst och information hoppas vi ge en djupare förståelse för hur sjukdomen påverkar livet och samtidigt inspirera till reflektion och stöd.',
    subDescription:
      'Upptäck resurser som inte bara utbildar utan också engagerar, vare sig det är genom en tankeväckande film, en lugnande spellista, eller en podcast fylld med insikter om mental hälsa.',
    links: MULTIMEDIA_LINKS,
  },
  treatment: {
    title: 'Behandling',
    description:
      'Bipolär sjukdom är en psykisk sjukdom som kännetecknas av kraftiga svängningar i stämningsläget. Personer med sjukdomen upplever perioder av djup depression där energinivån och motivationen är låg, och perioder av mani eller hypomani som kännetecknas av förhöjd energi, rastlöshet och ibland impulsivitet. Dessa svängningar kan påverka både det sociala livet och arbetsförmågan, och utan rätt behandling kan de bli svåra att hantera.',
    subDescription:
      'Oavsett om du är patient, anhörig eller vårdgivare finns det resurser som kan ge dig värdefull kunskap och vägledning.',
    links: TREATMENT_LINKS,
  },
  about: {
    title: 'Om oss',
    description:
      'Vi är ett engagerat team som drivs av en gemensam vision: att skapa en plattform där personer med bipolär sjukdom kan hitta stöd, kunskap och gemenskap. Vi vet hur viktigt det är att känna sig förstådd och vill erbjuda en trygg plats där hjälp alltid är nära till hands.',
    subDescription:
      'Vårt mål är att göra vardagen enklare och mer hanterbar för dem som lever med bipolär sjukdom – och deras anhöriga.',
    links: ABOUT_LINKS,
  },
};
