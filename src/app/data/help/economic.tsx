import { IFlowChartStep } from '@/app/types/flowchart';
import {
  FaBalanceScale,
  FaCheckCircle,
  FaClipboardList,
  FaFileAlt,
  FaFileSignature,
  FaHome,
  FaIdCard,
  FaPhone,
  FaUser,
  FaUserShield,
} from 'react-icons/fa';

export const ECONOMIC_SUPPORT_TABLE_HEADER_DATA = [
  { id: 1, title: 'Skyddsåtgärd' },
  { id: 2, title: 'Din kontroll' },
  { id: 3, title: 'Ingripande' },
  { id: 4, title: 'Ansökningsprocess' },
  { id: 5, title: 'Avslut' },
];

export const ECONOMIC_SUPPORT_TABLE_BODY_ROWS = [
  {
    id: 1,
    cells: [
      { id: 1, title: 'Fullmakt' },
      { id: 2, title: 'Behåller full kontroll' },
      { id: 3, title: 'Minst ingripande' },
      { id: 4, title: 'Enkel - skriv under själv' },
      { id: 5, title: 'När som helst' },
    ],
    bodyColor: 'white',
    borderColor: 'gray-300',
  },
  {
    id: 2,
    cells: [
      { id: 6, title: 'God man' },
      { id: 7, title: 'Behåller rätt att ta beslut' },
      { id: 8, title: 'Måttligt ingripande' },
      { id: 9, title: 'Via socialtjänsten' },
      { id: 10, title: 'Enkelt att avsluta' },
    ],
    bodyColor: 'white',
    borderColor: 'gray-300',
  },
  {
    id: 3,
    cells: [
      { id: 11, title: 'Förvaltare' },
      { id: 12, title: 'Förlorar ekonomisk kontroll' },
      { id: 13, title: 'Mest ingripande' },
      { id: 14, title: 'Via tingsrätten' },
      { id: 15, title: 'Svårare att avsluta' },
    ],
    bodyColor: 'white',
    borderColor: 'gray-300',
  },
];

export const ECONOMIC_SUPPORT_RECOMMENDATION_LIST_ITEMS = [
  {
    id: 1,
    title: 'Fullmakt',
    description: 'Rekommenderas för:',
    listItems: [
      { id: 1, title: 'Preventivt skydd' },
      { id: 2, title: 'Lättare ekonomiska svårigheter' },
      { id: 3, title: 'När du vill behålla kontroll' },
    ],
    type: 'primary' as const,
  },
  {
    id: 2,
    title: 'God man',
    description: 'Rekommenderas för:',
    listItems: [
      { id: 1, title: 'Upprepade ekonomiska problem' },
      { id: 2, title: 'Behov av regelbunden hjälp' },
      { id: 3, title: 'När fullmakt inte räcker' },
    ],
    type: 'tertiary' as const,
  },
  {
    id: 3,
    title: 'Förvaltare',
    description: 'Rekommenderas för:',
    listItems: [
      { id: 1, title: 'Allvarliga ekonomiska problem' },
      { id: 2, title: 'Risk för stora förluster' },
      { id: 3, title: 'Som sista utväg' },
    ],
    type: 'secondary' as const,
  },
];

export const SOCIAL_SUPPORT_BENEFITS = [
  {
    icon: <FaIdCard className="text-tertiary-dark text-3xl mb-4" />,
    title: 'Försörjningsstöd',
    description:
      'Ekonomiskt stöd från kommunen när du inte har tillräckliga inkomster för dina levnadskostnader.',
    link: 'https://www.socialstyrelsen.se/kunskapsstod-och-regler/omraden/ekonomiskt-bistand/ekonomiskt-bistand-for-privatpersoner/',
  },
  {
    icon: <FaUserShield className="text-tertiary-dark text-3xl mb-4" />,
    title: 'Sjukersättning',
    description:
      'Om din sjukdom påverkar din arbetsförmåga kan du ha rätt till sjukersättning från Försäkringskassan.',
    link: 'https://www.forsakringskassan.se/privatperson/vuxen-med-funktionsnedsattning/sjukersattning-resten-av-arbetslivet-sjukpension',
  },
  {
    icon: <FaHome className="text-tertiary-dark text-3xl mb-4" />,
    title: 'Bostadsbidrag',
    description:
      'Ekonomiskt stöd för bostadskostnader om du har låg inkomst. Ansök hos Försäkringskassan.',
    link: 'https://www.forsakringskassan.se/privatperson/arbetssokande/bostadsbidrag',
  },
];

export const GOD_MAN_FLOW_CHART: IFlowChartStep[] = [
  {
    icon: <FaPhone className="text-2xl text-primary-accent" />,
    title: 'Kontakt',
    description: 'Kontakta socialtjänsten i din kommun',
    tooltip: {
      title: 'Kontakta socialtjänsten i din kommun',
      tips: [
        'Ring först för att få vägledning',
        'Fråga efter rätt person att prata med',
        'Be om en referensnummer för ditt ärende',
      ],
    },
  },
  {
    icon: <FaFileAlt className="text-2xl text-primary-accent" />,
    title: 'Ansökningsblankett',
    description: 'Be om en blankett för ansökan om god man',
    tooltip: {
      title: 'Ansökningsblankett',
      tips: [
        'Be om rätt blankett för god man',
        'Fråga om vilka handlingar som behövs',
        'Ta reda på var du ska lämna ansökan',
      ],
    },
  },
  {
    icon: <FaClipboardList className="text-2xl text-primary-accent" />,
    title: 'Fyll i ansökan',
    description: 'Fyll i ansökan med information om varför du behöver hjälp',
    tooltip: {
      title: 'Fyll i ansökan',
      tips: [
        'Var tydlig med varför du behöver hjälp',
        'Beskriv dina ekonomiska svårigheter',
        'Inkludera relevant medicinsk information',
      ],
    },
  },
  {
    icon: <FaUser className="text-2xl text-primary-accent" />,
    title: 'Välj god man',
    description: 'Ange vem du vill ska vara din god man',
    tooltip: {
      title: 'Välj god man',
      tips: [
        'Välj någon du litar på helt',
        'Personen måste vara myndig',
        'Tala med personen innan du ansöker',
      ],
    },
  },
  {
    icon: <FaCheckCircle className="text-2xl text-primary-accent" />,
    title: 'Lämna in ansökan',
    description: 'Lämna in ansökan till socialtjänsten',
    tooltip: {
      title: 'Lämna in ansökan',
      tips: [
        'Kontrollera att allt är ifyllt korrekt',
        'Ta med eventuella bilagor som krävs',
        'Be om en kvitto på inlämningen',
      ],
    },
  },
];

export const TRUSTEE_FLOW_CHART: IFlowChartStep[] = [
  {
    icon: <FaPhone className="text-2xl" />,
    title: 'Kontakt',
    description: 'Kontakta socialtjänsten i din kommun',
    tooltip: {
      title: 'Kontakt',
      tips: [
        'Ring först för att få vägledning',
        'Fråga efter rätt person att prata med',
        'Be om en referensnummer för ditt ärende',
      ],
    },
  },
  {
    icon: <FaFileAlt className="text-2xl" />,
    title: 'Läkarintyg',
    description:
      'Du behöver läkarintyg som visar att du inte kan hantera din ekonomi',
    tooltip: {
      title: 'Läkarintyg',
      tips: [
        'Kontakta din läkare eller psykiater',
        'Be om ett intyg som beskriver dina svårigheter',
        'Intyget ska fokusera på ekonomisk hantering',
      ],
    },
  },
  {
    icon: <FaClipboardList className="text-2xl" />,
    title: 'Socialtjänstens ansökan',
    description: 'Socialtjänsten ansöker till tingsrätten',
    tooltip: {
      title: 'Socialtjänstens ansökan',
      tips: [
        'Socialtjänsten förbereder ärendet',
        'De samlar in all nödvändig dokumentation',
        'Du behöver inte göra något mer just nu',
      ],
    },
  },
  {
    icon: <FaBalanceScale className="text-2xl" />,
    title: 'Tingsrättens beslut',
    description: 'Tingsrätten fattar beslut om förvaltarskap',
    tooltip: {
      title: 'Tingsrättens beslut',
      tips: [
        'Tingsrätten granskar ärendet noggrant',
        'Du kan behöva delta i en förhandling',
        'Beslutet baseras på ditt bästa intresse',
      ],
    },
  },
  {
    icon: <FaUser className="text-2xl" />,
    title: 'Förvaltare utses',
    description: 'En förvaltare utses av tingsrätten',
    tooltip: {
      title: 'Förvaltare utses',
      tips: [
        'Tingsrätten väljer en lämplig förvaltare',
        'Du får information om vem som utsetts',
        'Förvaltaren tar över din ekonomiska kontroll',
      ],
    },
  },
];

export const PROXY_FLOW_CHART: IFlowChartStep[] = [
  {
    icon: <FaUser className="text-2xl text-primary-accent" />,
    title: 'Välj fullmaktshavare',
    description: 'Välj någon du litar på helt att vara din fullmaktshavare',
    tooltip: {
      title: 'Välj fullmaktshavare',
      tips: [
        'Välj någon du litar på helt',
        'Personen måste vara myndig',
        'Tala med personen innan du skapar fullmakten',
      ],
    },
  },
  {
    icon: <FaFileAlt className="text-2xl text-primary-accent" />,
    title: 'Hämta mall',
    description: 'Hämta en mall från din bank eller använd en generell mall',
    tooltip: {
      title: 'Hämta mall',
      tips: [
        'Kontakta din bank för deras mall',
        'Alternativt använd en generell mall',
        'Kontrollera att mallen är giltig',
      ],
    },
  },
  {
    icon: <FaClipboardList className="text-2xl text-primary-accent" />,
    title: 'Fyll i fullmakten',
    description: 'Fyll i fullmakten med dina och fullmaktshavarens uppgifter',
    tooltip: {
      title: 'Fyll i fullmakten',
      tips: [
        'Ange tydligt vad fullmakten ska gälla',
        'Inkludera personnummer för båda parter',
        'Var specifik med vilka rättigheter som ges',
      ],
    },
  },
  {
    icon: <FaFileSignature className="text-2xl text-primary-accent" />,
    title: 'Skriv under',
    description: 'Skriv under fullmakten för hand (viktigt för giltighet)',
    tooltip: {
      title: 'Skriv under',
      tips: [
        'Skriv under för hand - inte digitalt',
        'Båda parter måste skriva under',
        'Ta med legitimation när du lämnar in',
      ],
    },
  },
  {
    icon: <FaCheckCircle className="text-2xl text-primary-accent" />,
    title: 'Lämna in till bank',
    description: 'Lämna in fullmakten till din bank för aktivering',
    tooltip: {
      title: 'Lämna in till bank',
      tips: [
        'Ta med legitimation för båda parter',
        'Kontrollera vad banken kräver',
        'Be om bekräftelse på att fullmakten är aktiv',
      ],
    },
  },
];

export const GOD_MAN_SECTION_DATA = {
  title: 'Vad är en god man?',
  desc: 'En god man är en person som hjälper dig med ekonomiska beslut utan att ta över kontrollen helt. Du behåller rätten att ta egna beslut, men god man kan hjälpa till med praktiska uppgifter som att betala räkningar eller hantera kontakter med myndigheter.',
  subTitle: 'När kan en god man vara aktuell?',
  image: '/images/help/economic/legal-guardian.webp',
  imageAlt: 'Stress',
  type: 'primary' as const,
  alignment: 'left' as const,
  listItems: [
    {
      text: 'Under maniska eller hypomana perioder när du kan fatta impulsiva ekonomiska beslut',
    },
    {
      text: 'När du har svårt att hålla koll på räkningar och utgifter',
    },
    {
      text: 'Om du behöver hjälp med kontakt med myndigheter eller banker',
    },
    {
      text: 'Vid planering av större ekonomiska beslut',
    },
  ],
};

export const TRUSTEE_SECTION_DATA = {
  title: 'Vad är en förvaltare?',
  desc: 'En förvaltare är en mer ingripande form av ekonomiskt skydd än god man. Förvaltaren tar över hela kontrollen över din ekonomi och du förlorar rätten att ta ekonomiska beslut själv. Detta är den mest omfattande formen av ekonomiskt skydd.',
  subTitle: 'När kan en förvaltare vara aktuell?',
  image: '/images/help/economic/trustee.webp',
  imageAlt: 'Stress',
  type: 'tertiary' as const,
  alignment: 'right' as const,
  listItems: [
    {
      text: 'Vid allvarliga maniska episoder med stora ekonomiska förluster',
    },
    {
      text: 'Om du inte kan hantera din ekonomi alls',
    },
    {
      text: 'Om du är i risk att förlora bostad eller andra viktiga tillgångar',
    },
    {
      text: 'Om du är i risk att förlora bostad eller andra viktiga tillgångar',
    },
  ],
};

export const PROXY_SECTION_DATA = {
  title: 'Vad är en fullmakt?',
  desc: 'En fullmakt är ett dokument där du ger någon annan rätt att agera åt dig i vissa ekonomiska ärenden. Du behåller kontrollen och kan när som helst återkalla fullmakten. Detta är den mest flexibla formen av ekonomiskt stöd.',
  subTitle: 'När kan en fullmakt vara aktuell?',
  image: '/images/help/economic/proxy.webp',
  imageAlt: 'Ekonomisk planering',
  type: 'primary' as const,
  alignment: 'left' as const,
  listItems: [
    {
      text: 'Som preventivt skydd innan maniska episoder',
    },
    {
      text: 'När du vill ha hjälp med vardagliga ekonomiska uppgifter',
    },
    {
      text: 'För att underlätta kontakt med banker och myndigheter',
    },
    {
      text: 'När du vill behålla full kontroll men få praktisk hjälp',
    },
  ],
};
