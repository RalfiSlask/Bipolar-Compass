import { IFlowChartStep } from '@/app/types/flowchart';
import { IContactCard } from '@/app/types/general';
import { IBank } from '@/app/types/help/economic';
import {
  FaBalanceScale,
  FaBuilding,
  FaCalculator,
  FaCheckCircle,
  FaClipboardList,
  FaExclamationCircle,
  FaFileAlt,
  FaFileSignature,
  FaHandHoldingHeart,
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
    type: 'primary' as const,
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
    type: 'primary' as const,
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
    icon: <FaPhone className="text-2xl" />,
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
    icon: <FaFileAlt className="text-2xl" />,
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
    icon: <FaClipboardList className="text-2xl" />,
    title: 'Fyll i ansökan',
    description: 'Fyll i ansökan med information',
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
    icon: <FaUser className="text-2xl" />,
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
    icon: <FaCheckCircle className="text-2xl" />,
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
    description: 'Du behöver få ett intyg från din läkare',
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
  type: 'tertiary' as const,
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
  type: 'primary' as const,
  alignment: 'right' as const,
  listItems: [
    {
      text: 'Om du har allvarliga maniska episoder med stora ekonomiska förluster',
    },
    {
      text: 'Om du inte kan hantera din ekonomi alls',
    },
    {
      text: 'Om du är i risk att förlora bostad eller andra viktiga tillgångar',
    },
    {
      text: 'Om du har upprepade episoder av ekonomiskt vårdslöshet trots tidigare hjälp',
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
  alignment: 'right' as const,
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

export const BANKS: IBank[] = [
  {
    id: 1,
    title: 'Swedbank',
    type: 'primary' as const,
    website:
      'https://www.swedbank.se/privat/juridiska-tjanster/fullmakter.html',
    phone: '0771‑22 11 22',
    image: '',
  },
  {
    id: 2,
    title: 'SEB',
    type: 'primary' as const,
    website: 'https://seb.se/privat/livet/prata-om-ekonomi/anhorigekonomi',
    phone: '0771‑62 10 00',
    image: '/images/help/economic/banks/seb.webp',
  },
  {
    id: 3,
    title: 'Nordea',
    type: 'primary' as const,
    website:
      'https://www.nordea.se/privat/liv/familj/fullmakt-for-bankaranden.html',
    phone: '0771‑22 44 88',
    image: '/images/help/economic/banks/nordea.webp',
  },
  {
    id: 4,
    title: 'Handelsbanken',
    type: 'primary' as const,
    website:
      'https://www.handelsbanken.se/sv/ekonomi-i-livet/privatekonomi/vardagshjalp/vardagsjuridik/hur-fungerar-en-framtidsfullmakt',
    phone: '0771‑77 88 99',
    image: '/images/help/economic/banks/handelsbanken.webp',
  },
  {
    id: 5,
    title: 'ICA Banken',
    type: 'primary' as const,
    website:
      'https://www.icabanken.se/kundservice/fragor-och-svar/konto/fullmakt-for-ombud/',
    phone: '033-47 47 90',
    image: '/images/help/economic/banks/icabanken.webp',
  },
  {
    id: 6,
    title: 'Länsförsäkringar',
    type: 'primary' as const,
    website:
      'https://www.lansforsakringar.se/stockholm/privat/bank/fullmakter-bank/',
    image: '/images/help/economic/banks/lf.webp',
  },
  {
    id: 7,
    title: 'Sparkbanken Nord',
    type: 'primary' as const,
    website:
      'https://www.handelsbanken.se/sv/ekonomi-i-livet/privatekonomi/vardagshjalp/vardagsjuridik/hur-fungerar-en-framtidsfullmakt',
    phone: '0771‑23 00 23',
    image: '/images/help/economic/banks/sparbanken.webp',
  },
];

export const FAMILY_PROXY_SYMPTOMS = [
  {
    text: 'Överenskommelse om att gå igenom utgifter vid tidiga tecken på skov',
  },
  {
    text: 'Plan för att pausa onödiga köp under maniska perioder',
  },
  {
    text: 'Användning av budgetappar eller system',
  },
  {
    text: 'Kontakt med vård eller socialtjänst vid behov',
  },
  {
    text: 'Övervägande av god man om situationen förvärras',
  },
];

export const FAMILY_PROXY_SECTION_DATA = {
  title: 'Familjeavtal och planering',
  desc: 'Även om informella avtal inte är juridiskt bindande kan de vara en viktig del av planeringen för att hantera ekonomiska utmaningar vid bipolär sjukdom. De skapar tydlighet och trygghet för alla inblandade.',
  image: '/images/help/economic/family-proxy.webp',
  imageAlt: 'En familj som går nerför en kulle',
  type: 'tertiary' as const,
  alignment: 'left' as const,
  listIcon: FaExclamationCircle,
  listItems: FAMILY_PROXY_SYMPTOMS,
};

export const PROXY_TEMPLATE_TEXT = `FULLMAKT

Jag, [Fullständigt namn], personnummer [ååååmmdd-xxxx], ger härmed [Fullständigt namn på fullmaktshavare], personnummer [ååååmmdd-xxxx], fullmakt att:

☐ Betala räkningar i mitt namn  
☐ Kontakta min bank i ärenden som rör mina konton  
☐ Göra överföringar mellan mina konton  
☐ Hantera kontakter med Försäkringskassan, socialtjänst eller andra myndigheter  
☐ [Ange annat om så önskas: t.ex. spärra kort, pausa autogiro osv.]

Fullmakten gäller från och med: [datum]  
Tills vidare ☐ eller till och med: [datum] ☐

Ort och datum: ______________________

Fullmaktsgivarens underskrift: ______________________  
Namnförtydligande: ______________________

Fullmaktshavarens underskrift (valfritt): ______________________  
Namnförtydligande: ______________________

VIKTIGT ATT KOMMA IHÅG:
• Skriv under för hand för att fullmakten ska vara giltig
• Ta med legitimation när du lämnar in till bank eller myndighet
• Du kan när som helst återkalla fullmakten
• Kontrollera med din bank vad som krävs specifikt`;

export const FAMILY_PLAN_TEMPLATE_TEXT = `FAMILJEVIS PLAN FÖR EKONOMISKT STÖD VID SKOV

Jag, [ditt namn], har bipolär sjukdom. Under perioder då jag upplever maniska eller hypomana symtom kan jag fatta beslut som påverkar min ekonomi negativt.

Därför har jag tillsammans med [namn på anhörig] kommit överens om följande:

☐ Vid tidiga tecken på skov ska vi tillsammans gå igenom mina utgifter
☐ [Namn] får påminna mig om att pausa onödiga köp eller ta bort kreditkortstillgång
☐ Vi använder [app/budgetsystem] för att följa min ekonomi
☐ Om jag själv inte kan ta ansvar, kommer vi kontakta vård eller socialtjänst
☐ Vi har övervägt att ansöka om god man om situationen förvärras

Datum: ______________________
Underskrift: ______________________ (du själv)
Underskrift: ______________________ (anhörig)

Denna plan revideras vid behov.`;

export const ECONOMIC_CONTACTS: IContactCard[] = [
  {
    id: 1,
    title: 'Försäkringskassan',
    description: 'För sjukersättning, aktivitetsersättning och bostadsbidrag',
    website: 'https://www.forsakringskassan.se',
    icon: FaBuilding,
  },
  {
    id: 2,
    title: 'Konsumentverket',
    description: 'För råd om privatekonomi och konsumentskydd',
    website: 'https://www.konsumentverket.se',
    icon: FaCalculator,
  },
  {
    id: 3,
    title: 'Din kommuns socialtjänst',
    description: 'För försörjningsstöd, budgetrådgivning och god man',
    website: '',
    icon: FaHandHoldingHeart,
  },
  {
    id: 4,
    title: 'Kronofogden',
    description: 'För hjälp med skulder och ekonomiska avtal',
    website: 'https://www.kronofogden.se',
    icon: FaBalanceScale,
  },
];
