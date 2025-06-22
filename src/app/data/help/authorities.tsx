import { IAuthority } from '@/app/types/help/authorities';

export const PREPARE_LIST_BEFORE_CALLING = {
  title: 'Förbered dig innan du ringer',
  type: 'primary' as const,
  listItems: [
    {
      id: 1,
      label: 'Ha ditt personnummer redo',
    },
    {
      id: 2,
      label: 'Skriv ner dina frågor på förhand',
    },
    {
      id: 3,
      label: 'Ha relevanta dokument till hands',
    },
    {
      id: 4,
      label: 'Be om referensnummer för ditt ärende',
    },
  ],
};

export const WHAT_TO_EXPECT = {
  title: 'Vad du kan förvänta dig',
  type: 'tertiary' as const,
  listItems: [
    {
      id: 1,
      label: 'Köer och väntetider är vanliga',
    },
    {
      id: 2,
      label: 'Du kan behöva prata med flera personer',
    },
    {
      id: 3,
      label: 'Be om skriftliga svar på viktiga frågor',
    },
    {
      id: 4,
      label: 'Följ upp om du inte får svar',
    },
  ],
};

export const HEALTH_AUTHORITIES: IAuthority[] = [
  {
    name: '1177 Vårdguiden',
    description:
      'Sveriges officiella vårdportal med information om sjukdomar, behandlingar och vårdkontakter.',
    website: 'https://www.1177.se',
    phone: '1177',
    contact: 'https://www.1177.se/kontakt/',
    services: [
      {
        title: 'Vårdinformation',
        description: 'Information om sjukdomar, symptom och behandlingar',
      },
      {
        title: 'Vårdkontakter',
        description:
          'Hitta närmaste vårdcentral, sjukhus eller specialistklinik',
      },
      {
        title: 'Digitala tjänster',
        description: 'Boka tid, se journaler och kommunicera med vården',
      },
      {
        title: 'Akut rådgivning',
        description: 'Få råd om när du ska söka vård',
      },
    ],
    image: '/images/help/authorities/1177.webp',
  },
  {
    name: 'Folkhälsomyndigheten',
    description:
      'Nationell myndighet som arbetar för att främja folkhälsa och förebygga sjukdomar.',
    website: 'https://www.folkhalsomyndigheten.se',
    phone: '010-205 20 00',
    email: 'info@folkhalsomyndigheten.se',
    services: [
      {
        title: 'Folkhälsostatistik',
        description: 'Statistik och rapporter om folkhälsa och sjukdomar',
      },
      {
        title: 'Förebyggande arbete',
        description: 'Program och riktlinjer för att förebygga sjukdomar',
      },
      {
        title: 'Psykisk hälsa',
        description: 'Arbete för att främja psykisk hälsa och välbefinnande',
      },
      {
        title: 'Forskning',
        description: 'Folkhälsovetenskaplig forskning och utveckling',
      },
    ],
    image: '/images/help/authorities/folkhalsomyndigheten.webp',
  },
  {
    name: 'Socialstyrelsen',
    description:
      'Myndighet som ansvarar för statistik, kvalitet och utveckling inom hälso- och sjukvård.',
    website: 'https://www.socialstyrelsen.se',
    phone: '075-247 30 00',
    email: 'socialstyrelsen@socialstyrelsen.se',
    services: [
      {
        title: 'Kvalitetsregister',
        description: 'Statistik och kvalitetsdata för olika sjukdomar',
      },
      {
        title: 'Riktlinjer',
        description: 'Nationella riktlinjer för vård och behandling',
      },
      {
        title: 'Tillsyn',
        description: 'Övervakar vårdens kvalitet och säkerhet',
      },
      {
        title: 'Statistik',
        description: 'Officiell statistik om hälsa och sjukdomar',
      },
    ],
    image: '/images/help/authorities/socialstyrelsen.webp',
  },
  {
    name: 'Inspektionen för vård och omsorg (IVO)',
    description:
      'Tillsynsmyndighet som övervakar kvaliteten i hälso- och sjukvård.',
    website: 'https://www.ivo.se',
    phone: '010-730 30 00',
    email: 'registrator@ivo.se',
    services: [
      {
        title: 'Klagomål',
        description: 'Ta emot och utreda klagomål om vård',
      },
      {
        title: 'Tillsyn',
        description: 'Kontrollera att vården följer lagar och regler',
      },
      {
        title: 'Rapporter',
        description: 'Publicera rapporter om vårdkvalitet',
      },
      {
        title: 'Rådgivning',
        description: 'Ge råd om patienträttigheter',
      },
    ],
    image: '/images/help/authorities/ivo.webp',
  },
  {
    name: 'eHälsomyndigheten',
    description:
      'Myndighet som ansvarar för digitala tjänster inom hälso- och sjukvård, inklusive digitala journaler och e-recept.',
    website: 'https://www.ehalsomyndigheten.se',
    phone: '0771-766 200',
    email: 'registrator@ehalsomyndigheten.se',
    services: [
      {
        title: 'Digitala journaler',
        description:
          'Tillgång till dina digitala journaler och vårdinformation',
      },
      {
        title: 'E-recept',
        description: 'Digitala recept som kan hämtas på alla apotek',
      },
      {
        title: 'Digitala vårdtjänster',
        description: 'Stöd för digitala möten och vårdkontakter',
      },
      {
        title: 'Säker informationsöverföring',
        description: 'Säker överföring av vårdinformation mellan vårdgivare',
      },
      {
        title: 'Patientportaler',
        description: 'Stöd för digitala patientportaler och e-tjänster',
      },
    ],
    image: '/images/help/authorities/ehalsomyndigheten.webp',
  },
];

export const SOCIAL_INSURANCE_AUTHORITIES: IAuthority[] = [
  {
    name: 'Försäkringskassan',
    description:
      'Ansvarar för socialförsäkringen och betalar ut ersättningar vid sjukdom och funktionsnedsättning.',
    website: 'https://www.forsakringskassan.se',
    phone: '0771-524 524',
    contact: 'https://www.forsakringskassan.se/kontakta-forsakringskassan',
    services: [
      {
        title: 'Sjukersättning',
        description:
          'Ersättning vid långvarig sjukdom som påverkar arbetsförmågan',
      },
      {
        title: 'Aktivitetsersättning',
        description:
          'Stöd för att delta i aktiviteter trots funktionsnedsättning',
      },
      {
        title: 'Rehabilitering',
        description: 'Stöd för att återgå till arbete eller studier',
      },
      {
        title: 'Bostadsbidrag',
        description: 'Ekonomiskt stöd för bostadskostnader',
      },
      {
        title: 'Assistansersättning',
        description: 'Stöd för personlig assistans',
      },
      {
        title: 'Bil- och transportstöd',
        description: 'Stöd för anpassade fordon och transporter',
      },
    ],
    image: '/images/help/authorities/forsakringskassan.webp',
  },
];

export const RIGHTS_AUTHORITIES: IAuthority[] = [
  {
    name: 'Diskrimineringsombudsmannen (DO)',
    description:
      'Övervakar att Diskrimineringslagen följs och arbetar mot diskriminering.',
    website: 'https://www.do.se',
    phone: '08-508 825 00',
    email: 'do@do.se',
    services: [
      {
        title: 'Diskrimineringsärenden',
        description: 'Ta emot och utreda anmälningar om diskriminering',
      },
      {
        title: 'Rådgivning',
        description: 'Ge råd om diskrimineringslagstiftning',
      },
      {
        title: 'Medling',
        description: 'Försöka lösa diskrimineringsärenden genom medling',
      },
      {
        title: 'Information',
        description: 'Sprida kunskap om diskrimineringslagstiftning',
      },
    ],
    image: '/images/help/authorities/do.webp',
  },
  {
    name: 'Justitieombudsmannen (JO)',
    description:
      'Övervakar att myndigheter och tjänstemän följer lagar och regler.',
    website: 'https://www.jo.se',
    phone: '08-786 40 00',
    email: 'justitieombudsmannen@jo.se',
    services: [
      {
        title: 'Myndighetskontroll',
        description: 'Övervaka att myndigheter följer lagar och regler',
      },
      {
        title: 'Klagomål',
        description: 'Ta emot klagomål på myndigheters agerande',
      },
      {
        title: 'Rapporter',
        description: 'Publicera rapporter om myndighetsfel',
      },
      {
        title: 'Rådgivning',
        description: 'Ge råd om hur man klagar på myndigheter',
      },
    ],
    image: '/images/help/authorities/jo.webp',
  },
];

export const MUNICIPAL_SERVICES: IAuthority[] = [
  {
    name: 'Socialtjänsten',
    description:
      'Kommunal myndighet som ansvarar för sociala insatser och stöd.',
    website: 'https://www.socialstyrelsen.se/socialtjanst',
    services: [
      {
        title: 'Ekonomiskt bistånd',
        description: 'Stöd vid ekonomiska svårigheter',
      },
      {
        title: 'Bostadsstöd',
        description: 'Hjälp med bostadsfrågor och boende',
      },
      {
        title: 'Stöd och service',
        description: 'Personlig assistans och hemtjänst',
      },
      {
        title: 'Skyddat boende',
        description: 'Särskilda boendeformer för personer med psykisk ohälsa',
      },
      {
        title: 'Rådgivning',
        description: 'Rådgivning om sociala rättigheter och stöd',
      },
    ],
    image: '/images/help/authorities/socialtjansten.webp',
  },
  {
    name: 'Arbetsförmedlingen',
    description: 'Myndighet som hjälper människor att komma i arbete.',
    website: 'https://arbetsformedlingen.se',
    phone: '0771-416 416',
    contact: 'https://arbetsformedlingen.se/kontakt',
    services: [
      {
        title: 'Arbetsförmedling',
        description: 'Hjälp med att hitta arbete',
      },
      {
        title: 'Arbetslivsinriktad rehabilitering',
        description: 'Stöd för att återgå till arbete',
      },
      {
        title: 'Utbildning',
        description: 'Stöd för utbildning och omskolning',
      },
      {
        title: 'Anpassningar',
        description: 'Hjälp med anpassningar i arbetslivet',
      },
    ],
    image: '/images/help/authorities/arbetsformedlingen.webp',
  },
];

export const MENTAL_HEALTH_AUTHORITIES: IAuthority[] = [
  {
    name: 'Myndigheten för ungdoms- och civilsamhällsfrågor (MUCF)',
    description:
      'Myndighet som arbetar för att stärka ungas inflytande och delaktighet i samhället.',
    website: 'https://www.mucf.se',
    phone: '010-473 30 00',
    email: 'info@mucf.se',
    services: [
      {
        title: 'Ungdomsrådgivning',
        description: 'Stöd och rådgivning för unga människor',
      },
      {
        title: 'Civilsamhällsstöd',
        description: 'Stöd för ideella organisationer och föreningar',
      },
      {
        title: 'Ungdomsinflytande',
        description: 'Arbete för att stärka ungas röst i samhället',
      },
      {
        title: 'Forskning',
        description: 'Forskning om unga och civilsamhället',
      },
    ],
    image: '/images/help/authorities/mucf.webp',
  },
  {
    name: 'Nationellt centrum för suicidforskning och prevention (NASP)',
    description:
      'Centrum som arbetar för att förebygga självmord genom forskning, utbildning och stöd.',
    website: 'https://ki.se/nasp',
    phone: '08-524 800 00',
    email: 'nasp@ki.se',
    services: [
      {
        title: 'Suicidforskning',
        description: 'Forskning om självmord och självmordsförsök',
      },
      {
        title: 'Prevention',
        description: 'Program och metoder för att förebygga självmord',
      },
      {
        title: 'Utbildning',
        description: 'Utbildning för vårdpersonal och andra yrkesgrupper',
      },
      {
        title: 'Stöd',
        description: 'Stöd för anhöriga och personer som drabbats av självmord',
      },
      {
        title: 'Rådgivning',
        description: 'Rådgivning om suicidprevention och krisstöd',
      },
    ],
    image: '/images/help/authorities/nasp.webp',
  },
  {
    name: 'Uppdrag Psykisk Hälsa (SKR)',
    description:
      'Sveriges Kommuner och Regioner arbetar för att förbättra psykisk hälsa genom samverkan mellan kommuner och regioner.',
    website: 'https://www.uppdragpsykiskhalsa.se/',
    phone: '020-491 000',
    email: 'uppdragpsykiskhalsa@skr.se',
    services: [
      {
        title: 'Samverkan',
        description: 'Samverkan mellan kommuner och regioner för psykisk hälsa',
      },
      {
        title: 'Kunskapsutveckling',
        description: 'Utveckling av kunskap och metoder för psykisk hälsa',
      },
      {
        title: 'Riktlinjer',
        description: 'Riktlinjer för psykisk hälsa i kommuner och regioner',
      },
      {
        title: 'Stöd',
        description: 'Stöd till kommuner och regioner i psykisk hälsa',
      },
    ],
    image: '/images/help/authorities/skr.webp',
  },
];

export const EDUCATION_AUTHORITIES: IAuthority[] = [
  {
    name: 'Specialpedagogiska skolmyndigheten (SPSM)',
    description:
      'Myndighet som ansvarar för specialpedagogiskt stöd och specialskolor.',
    website: 'https://www.spsm.se',
    phone: '010-473 30 00',
    email: 'spsm@spsm.se',
    services: [
      {
        title: 'Specialpedagogiskt stöd',
        description: 'Stöd för elever med särskilda behov',
      },
      {
        title: 'Specialskolor',
        description: 'Särskilda skolor för elever med funktionsnedsättningar',
      },
      {
        title: 'Rådgivning',
        description: 'Rådgivning för skolor och föräldrar',
      },
      {
        title: 'Utbildning',
        description: 'Utbildning för lärare och specialpedagoger',
      },
    ],
    image: '/images/help/authorities/spsm.webp',
  },
  {
    name: 'Skolverket',
    description:
      'Myndighet som ansvarar för utveckling av skolväsendet och förskolan.',
    website: 'https://www.skolverket.se',
    phone: '020-491 000',
    email: 'registrator@skolverket.se',
    services: [
      {
        title: 'Läroplaner',
        description: 'Utveckling av läroplaner och kursplaner',
      },
      {
        title: 'Kvalitet',
        description: 'Arbete för att förbättra skolans kvalitet',
      },
      {
        title: 'Statistik',
        description: 'Statistik och rapporter om skolväsendet',
      },
      {
        title: 'Stöd',
        description: 'Stöd till skolor och förskolor',
      },
    ],
    image: '/images/help/authorities/skolverket.webp',
  },
];

export const WORK_ENVIRONMENT_AUTHORITIES: IAuthority[] = [
  {
    name: 'Arbetsmiljöverket',
    description:
      'Myndighet som arbetar för att förbättra arbetsmiljön och förebygga arbetsskador.',
    website: 'https://www.av.se',
    phone: '010-730 90 00',
    email: 'arbetsmiljoverket@av.se',
    services: [
      {
        title: 'Arbetsmiljöinspektion',
        description: 'Inspektion av arbetsplatser för att säkerställa säkerhet',
      },
      {
        title: 'Föreskrifter',
        description: 'Föreskrifter och riktlinjer för arbetsmiljö',
      },
      {
        title: 'Rådgivning',
        description: 'Rådgivning om arbetsmiljöfrågor',
      },
      {
        title: 'Statistik',
        description: 'Statistik om arbetsskador och arbetsmiljö',
      },
    ],
    image: '/images/help/authorities/arbetsmiljoverket.webp',
  },
];

export const EQUALITY_AUTHORITIES: IAuthority[] = [
  {
    name: 'Jämställdhetsmyndigheten',
    description:
      'Myndighet som arbetar för att främja jämställdhet och motverka diskriminering.',
    website: 'https://jamstalldhetsmyndigheten.se/',
    phone: '010-495 50 00',
    email: 'info@jamstalldhetsmyndigheten.se',
    services: [
      {
        title: 'Jämställdhet',
        description: 'Arbete för att främja jämställdhet i samhället',
      },
      {
        title: 'Diskriminering',
        description: 'Motverka diskriminering på olika grunder',
      },
      {
        title: 'Rådgivning',
        description: 'Rådgivning om jämställdhet och diskriminering',
      },
      {
        title: 'Forskning',
        description: 'Forskning om jämställdhet och diskriminering',
      },
    ],
    image: '/images/help/authorities/jamstallhetsmyndigheten.webp',
  },
];

export const ALL_AUTHORITIES = [
  ...HEALTH_AUTHORITIES,
  ...SOCIAL_INSURANCE_AUTHORITIES,
  ...RIGHTS_AUTHORITIES,
  ...MUNICIPAL_SERVICES,
  ...MENTAL_HEALTH_AUTHORITIES,
  ...EDUCATION_AUTHORITIES,
  ...WORK_ENVIRONMENT_AUTHORITIES,
  ...EQUALITY_AUTHORITIES,
];

export const EMERGENCY_CONTACTS = [
  {
    title: 'Akut psykisk hjälp',
    description: 'Vid akuta psykiska kriser eller självmordstankar',
    phoneNumber: '112',
    availability: 'Dygnet runt',
    isEmergency: true,
  },
  {
    title: 'Jourhavande präst',
    description: 'Andlig och emotionell stöd vid kriser',
    phoneNumber: '112',
    availability: 'Dygnet runt',
  },
  {
    title: 'BRIS - Barnens rätt i samhället',
    description: 'Stöd för barn och unga under 18 år',
    phoneNumber: '116 111',
    availability: 'Dygnet runt',
  },
  {
    title: 'Mind - Riksförbundet för psykisk hälsa',
    description: 'Stöd och rådgivning för personer med psykisk ohälsa',
    phoneNumber: '020-240 240',
    availability: 'Vardagar 09:00-17:00',
  },
];
