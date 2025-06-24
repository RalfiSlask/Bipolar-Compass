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

export const WHAT_TO_EXPECT_LIST = {
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
    title: '1177 Vårdguiden',
    description:
      'Sveriges officiella vårdportal med information om sjukdomar, behandlingar och vårdkontakter.',
    website: 'https://www.1177.se',
    phone: '1177',
    contact: 'https://www.1177.se/kontakt/',
    services: [
      {
        id: 1,
        title: 'Vårdinformation',
        description: 'Information om sjukdomar, symptom och behandlingar',
      },
      {
        id: 2,
        title: 'Vårdkontakter',
        description:
          'Hitta närmaste vårdcentral, sjukhus eller specialistklinik',
      },
      {
        id: 3,
        title: 'Digitala tjänster',
        description: 'Boka tid, se journaler och kommunicera med vården',
      },
      {
        id: 4,
        title: 'Akut rådgivning',
        description: 'Få råd om när du ska söka vård',
      },
    ],
    image: '/images/help/authorities/logos/1177.webp',
  },
  {
    title: 'Folkhälsomyndigheten',
    description:
      'Nationell myndighet som arbetar för att främja folkhälsa och förebygga sjukdomar i samhället.',
    website: 'https://www.folkhalsomyndigheten.se',
    phone: '010-205 20 00',
    email: 'info@folkhalsomyndigheten.se',
    services: [
      {
        id: 1,
        title: 'Folkhälsostatistik',
        description: 'Statistik och rapporter om folkhälsa och sjukdomar',
      },
      {
        id: 2,
        title: 'Förebyggande arbete',
        description: 'Program och riktlinjer för att förebygga sjukdomar',
      },
      {
        id: 3,
        title: 'Psykisk hälsa',
        description: 'Arbete för att främja psykisk hälsa och välbefinnande',
      },
      {
        id: 4,
        title: 'Forskning',
        description: 'Folkhälsovetenskaplig forskning och utveckling',
      },
    ],
    image: '/images/help/authorities/logos/folkhälsomyndigheten.webp',
  },

  {
    title: 'Inspektionen för vård och omsorg (IVO)',
    description:
      'Tillsynsmyndighet som övervakar kvaliteten och säkerheten i hälso- och sjukvård.',
    website: 'https://www.ivo.se',
    phone: '010-730 30 00',
    email: 'registrator@ivo.se',
    services: [
      {
        id: 1,
        title: 'Klagomål',
        description: 'Ta emot och utreda klagomål om vård',
      },
      {
        id: 2,
        title: 'Tillsyn',
        description: 'Kontrollera att vården följer lagar och regler',
      },
      {
        id: 3,
        title: 'Rapporter',
        description: 'Publicera rapporter om vårdkvalitet',
      },
      {
        id: 4,
        title: 'Rådgivning',
        description: 'Ge råd om patienträttigheter',
      },
    ],
    image: '/images/help/authorities/logos/ivo.webp',
  },
  {
    title: 'E-Hälsomyndigheten',
    description:
      'Myndighet som ansvarar för digitala tjänster inom hälso- och sjukvård, inklusive journaler och e-recept.',
    website: 'https://www.ehalsomyndigheten.se',
    phone: '0771-766 200',
    email: 'registrator@ehalsomyndigheten.se',
    services: [
      {
        id: 1,
        title: 'Digitala journaler',
        description:
          'Tillgång till dina digitala journaler och vårdinformation',
      },
      {
        id: 2,
        title: 'E-recept',
        description: 'Digitala recept som kan hämtas på alla apotek',
      },
      {
        id: 3,
        title: 'Digitala vårdtjänster',
        description: 'Stöd för digitala möten och vårdkontakter',
      },
      {
        id: 4,
        title: 'Patientportaler',
        description: 'Stöd för digitala patientportaler och e-tjänster',
      },
    ],
    image: '/images/help/authorities/logos/ehälsomyndigheten.webp',
  },
  {
    title: 'Socialstyrelsen',
    description:
      'Myndighet som ansvarar för statistik, kvalitet och utveckling inom hälso- och sjukvård i Sverige.',
    website: 'https://www.socialstyrelsen.se',
    phone: '075-247 30 00',
    email: 'socialstyrelsen@socialstyrelsen.se',
    services: [
      {
        id: 1,
        title: 'Kvalitetsregister',
        description: 'Statistik och kvalitetsdata för olika sjukdomar',
      },
      {
        id: 2,
        title: 'Riktlinjer',
        description: 'Nationella riktlinjer för vård och behandling',
      },
      {
        id: 3,
        title: 'Tillsyn',
        description: 'Övervakar vårdens kvalitet och säkerhet',
      },
      {
        id: 4,
        title: 'Statistik',
        description: 'Officiell statistik om hälsa och sjukdomar',
      },
    ],
    imageReplacementText: 'Socialstyrelsen',
  },
];

export const SOCIAL_INSURANCE_AUTHORITIES: IAuthority[] = [
  {
    title: 'Försäkringskassan',
    description:
      'Ansvarar för socialförsäkringen och betalar ut ersättningar vid sjukdom och funktionsnedsättning.',
    website: 'https://www.forsakringskassan.se',
    phone: '0771-524 524',
    contact: 'https://www.forsakringskassan.se/kontakta-forsakringskassan',
    services: [
      {
        id: 1,
        title: 'Sjukersättning',
        description:
          'Ersättning vid långvarig sjukdom som påverkar arbetsförmågan',
      },
      {
        id: 2,
        title: 'Aktivitetsersättning',
        description:
          'Stöd för att delta i aktiviteter trots funktionsnedsättning',
      },
      {
        id: 3,
        title: 'Rehabilitering',
        description: 'Stöd för att återgå till arbete eller studier',
      },
      {
        id: 4,
        title: 'Bostadsbidrag',
        description: 'Ekonomiskt stöd för bostadskostnader',
      },
    ],
    image: '/images/help/authorities/logos/försäkringskassan.webp',
  },
];

export const RIGHTS_AUTHORITIES: IAuthority[] = [
  {
    title: 'Justitieombudsmannen (JO)',
    description:
      'Övervakar att myndigheter och tjänstemän följer lagar och regler i sitt dagliga arbete.',
    website: 'https://www.jo.se',
    phone: '08-786 40 00',
    email: 'justitieombudsmannen@jo.se',
    services: [
      {
        id: 1,
        title: 'Myndighetskontroll',
        description: 'Övervaka att myndigheter följer lagar och regler',
      },
      {
        id: 2,
        title: 'Klagomål',
        description: 'Ta emot klagomål på myndigheters agerande',
      },
      {
        id: 3,
        title: 'Rapporter',
        description: 'Publicera rapporter om myndighetsfel',
      },
      {
        id: 4,
        title: 'Rådgivning',
        description: 'Ge råd om hur man klagar på myndigheter',
      },
    ],
    image: '/images/help/authorities/logos/jo.webp',
  },
  {
    title: 'Diskrimineringsombudsmannen (DO)',
    description:
      'Övervakar att Diskrimineringslagen följs och arbetar mot diskriminering i samhället.',
    website: 'https://www.do.se',
    phone: '08-508 825 00',
    email: 'do@do.se',
    services: [
      {
        id: 1,
        title: 'Diskrimineringsärenden',
        description: 'Ta emot och utreda anmälningar om diskriminering',
      },
      {
        id: 2,
        title: 'Rådgivning',
        description: 'Ge råd om diskrimineringslagstiftning',
      },
      {
        id: 3,
        title: 'Medling',
        description: 'Försöka lösa diskrimineringsärenden genom medling',
      },
      {
        id: 4,
        title: 'Information',
        description: 'Sprida kunskap om diskrimineringslagstiftning',
      },
    ],
    image: '/images/help/authorities/logos/do.webp',
  },
];

export const MUNICIPAL_SERVICES: IAuthority[] = [
  {
    title: 'Arbetsförmedlingen',
    description:
      'Myndighet som hjälper människor att komma i arbete och utveckla sin karriär.',
    website: 'https://arbetsformedlingen.se',
    phone: '0771-416 416',
    contact: 'https://arbetsformedlingen.se/kontakt',
    services: [
      {
        id: 1,
        title: 'Arbetsförmedling',
        description: 'Hjälp med att hitta arbete',
      },
      {
        id: 2,
        title: 'Arbetslivsinriktad rehabilitering',
        description: 'Stöd för att återgå till arbete',
      },
      {
        id: 3,
        title: 'Utbildning',
        description: 'Stöd för utbildning och omskolning',
      },
      {
        id: 4,
        title: 'Anpassningar',
        description: 'Hjälp med anpassningar i arbetslivet',
      },
    ],
    image: '/images/help/authorities/logos/arbetsförmedlingen.webp',
  },
  {
    title: 'Socialtjänsten',
    description:
      'Kommunal myndighet som ansvarar för sociala insatser, stöd och ekonomiskt bistånd.',
    website: 'https://www.socialstyrelsen.se/om-socialtjansten/',
    services: [
      {
        id: 1,
        title: 'Ekonomiskt bistånd',
        description: 'Stöd vid ekonomiska svårigheter',
      },
      {
        id: 2,
        title: 'Bostadsstöd',
        description: 'Hjälp med bostadsfrågor och boende',
      },
      {
        id: 3,
        title: 'Stöd och service',
        description: 'Personlig assistans och hemtjänst',
      },
      {
        id: 4,
        title: 'Rådgivning',
        description: 'Rådgivning om sociala rättigheter och stöd',
      },
    ],
    imageReplacementText: 'Socialtjänsten',
  },
];

export const MENTAL_HEALTH_AUTHORITIES: IAuthority[] = [
  {
    title: 'Myndigheten för ungdoms- och civilsamhällsfrågor (MUCF)',
    description:
      'Myndighet som arbetar för att stärka ungas inflytande och delaktighet i samhället.',
    website: 'https://www.mucf.se',
    phone: '010-473 30 00',
    email: 'info@mucf.se',
    services: [
      {
        id: 1,
        title: 'Ungdomsrådgivning',
        description: 'Stöd och rådgivning för unga människor',
      },
      {
        id: 2,
        title: 'Civilsamhällsstöd',
        description: 'Stöd för ideella organisationer och föreningar',
      },
      {
        id: 3,
        title: 'Ungdomsinflytande',
        description: 'Arbete för att stärka ungas röst i samhället',
      },
      {
        id: 4,
        title: 'Forskning',
        description: 'Forskning om unga och civilsamhället',
      },
    ],
    image: '/images/help/authorities/logos/mucf.webp',
  },
  {
    title: 'Uppdrag Psykisk Hälsa (SKR)',
    description:
      'Sveriges kommuner och regioner arbetar för att förbättra psykisk hälsa genom samverkan.',
    website: 'https://www.uppdragpsykiskhalsa.se/',
    phone: '020-491 000',
    email: 'uppdragpsykiskhalsa@skr.se',
    services: [
      {
        id: 1,
        title: 'Samverkan',
        description: 'Samverkan mellan kommuner och regioner för psykisk hälsa',
      },
      {
        id: 2,
        title: 'Kunskapsutveckling',
        description: 'Utveckling av kunskap och metoder för psykisk hälsa',
      },
      {
        id: 3,
        title: 'Riktlinjer',
        description: 'Riktlinjer för psykisk hälsa i kommuner och regioner',
      },
      {
        id: 4,
        title: 'Stöd',
        description: 'Stöd till kommuner och regioner i psykisk hälsa',
      },
    ],
    image: '/images/help/authorities/logos/skr.webp',
  },
];

export const EDUCATION_AUTHORITIES: IAuthority[] = [
  {
    title: 'Specialpedagogiska skolmyndigheten (SPSM)',
    description:
      'Myndighet som ansvarar för specialpedagogiskt stöd och specialskolor för elever med behov.',
    website: 'https://www.spsm.se',
    phone: '010-473 30 00',
    email: 'spsm@spsm.se',
    services: [
      {
        id: 1,
        title: 'Specialpedagogiskt stöd',
        description: 'Stöd för elever med särskilda behov',
      },
      {
        id: 2,
        title: 'Specialskolor',
        description: 'Särskilda skolor för elever med funktionsnedsättningar',
      },
      {
        id: 3,
        title: 'Rådgivning',
        description: 'Rådgivning för skolor och föräldrar',
      },
      {
        id: 4,
        title: 'Utbildning',
        description: 'Utbildning för lärare och specialpedagoger',
      },
    ],
    image: '/images/help/authorities/logos/spsm.webp',
  },
  {
    title: 'Skolverket',
    description:
      'Myndighet som ansvarar för utveckling av skolväsendet och förskolan i Sverige.',
    website: 'https://www.skolverket.se',
    phone: '020-491 000',
    email: 'registrator@skolverket.se',
    services: [
      {
        id: 1,
        title: 'Läroplaner',
        description: 'Utveckling av läroplaner och kursplaner',
      },
      {
        id: 2,
        title: 'Kvalitet',
        description: 'Arbete för att förbättra skolans kvalitet',
      },
      {
        id: 3,
        title: 'Statistik',
        description: 'Statistik och rapporter om skolväsendet',
      },
      {
        id: 4,
        title: 'Stöd',
        description: 'Stöd till skolor och förskolor',
      },
    ],
    image: '/images/help/authorities/logos/skolverket.webp',
  },
];

export const WORK_ENVIRONMENT_AUTHORITIES: IAuthority[] = [
  {
    title: 'Arbetsmiljöverket',
    description:
      'Myndighet som arbetar för att förbättra arbetsmiljön och förebygga arbetsskador.',
    website: 'https://www.av.se',
    phone: '010-730 90 00',
    email: 'arbetsmiljoverket@av.se',
    services: [
      {
        id: 1,
        title: 'Arbetsmiljöinspektion',
        description: 'Inspektion av arbetsplatser för att säkerställa säkerhet',
      },
      {
        id: 2,
        title: 'Föreskrifter',
        description: 'Föreskrifter och riktlinjer för arbetsmiljö',
      },
      {
        id: 3,
        title: 'Rådgivning',
        description: 'Rådgivning om arbetsmiljöfrågor',
      },
      {
        id: 4,
        title: 'Statistik',
        description: 'Statistik om arbetsskador och arbetsmiljö',
      },
    ],
    image: '/images/help/authorities/logos/arbetsmiljöverket.webp',
  },
];

export const EQUALITY_AUTHORITIES: IAuthority[] = [
  {
    title: 'Jämställdhetsmyndigheten',
    description:
      'Myndighet som arbetar för att främja jämställdhet och motverka diskriminering i samhället.',
    website: 'https://jamstalldhetsmyndigheten.se/',
    phone: '010-495 50 00',
    email: 'info@jamstalldhetsmyndigheten.se',
    services: [
      {
        id: 1,
        title: 'Jämställdhet',
        description: 'Arbete för att främja jämställdhet i samhället',
      },
      {
        id: 2,
        title: 'Diskriminering',
        description: 'Motverka diskriminering på olika grunder',
      },
      {
        id: 3,
        title: 'Rådgivning',
        description: 'Rådgivning om jämställdhet och diskriminering',
      },
      {
        id: 4,
        title: 'Forskning',
        description: 'Forskning om jämställdhet och diskriminering',
      },
    ],
    image: '/images/help/authorities/logos/jämställdhetsmyndigheten.webp',
  },
];

export const ALL_AUTHORITIES = [
  ...HEALTH_AUTHORITIES,
  ...RIGHTS_AUTHORITIES,
  ...MENTAL_HEALTH_AUTHORITIES,
  ...EDUCATION_AUTHORITIES,
  ...WORK_ENVIRONMENT_AUTHORITIES,
  ...EQUALITY_AUTHORITIES,
  ...SOCIAL_INSURANCE_AUTHORITIES,
  ...MUNICIPAL_SERVICES,
];

export const QUICK_GUIDE_DATA = [
  {
    id: 1,
    title: 'Vård och behandling',
    description:
      'Behöver du hjälp med vårdkontakter, andra åsikter eller klagomål?',
    contacts: ['1177 Vårdguiden', 'IVO (klagomål)', 'Din vårdgivare'],
    type: 'primary' as const,
  },
  {
    id: 2,
    title: 'Ekonomiskt stöd',
    description:
      'Behöver du hjälp med ersättningar, bidrag eller ekonomiskt bistånd?',
    contacts: ['Försäkringskassan', 'Socialtjänsten', 'Arbetsförmedlingen'],
    type: 'tertiary' as const,
  },
  {
    id: 3,
    title: 'Rättigheter och diskriminering',
    description:
      'Har du blivit diskriminerad eller känner att dina rättigheter kränkts?',
    contacts: ['Diskrimineringsombudsmannen', 'Justitieombudsmannen', 'IVO'],
    type: 'secondary' as const,
  },
  {
    id: 4,
    title: 'Utbildning och skola',
    description:
      'Behöver du hjälp med skolfrågor eller specialpedagogiskt stöd?',
    contacts: ['SPSM (specialpedagogik)', 'Skolverket', 'Din skola/kommun'],
    type: 'primary' as const,
  },
  {
    id: 5,
    title: 'Psykisk hälsa',
    description: 'Behöver du stöd för psykisk hälsa eller ungdomsrådgivning?',
    contacts: [
      'MUCF (ungdomsrådgivning)',
      'Uppdrag Psykisk Hälsa',
      'Folkhälsomyndigheten',
    ],
    type: 'tertiary' as const,
  },
  {
    id: 6,
    title: 'Arbetsmiljö och arbete',
    description:
      'Har du problem på jobbet eller behöver hjälp med arbetsmiljö?',
    contacts: ['Arbetsmiljöverket', 'Arbetsförmedlingen', 'Facket'],
    type: 'secondary' as const,
  },
];
