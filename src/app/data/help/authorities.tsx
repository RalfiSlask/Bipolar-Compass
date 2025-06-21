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
    logoAttribution: '© 1177 Vårdguiden',
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
    logoAttribution: '© Socialstyrelsen',
  },
  {
    name: 'Inspektionen för vård och omsorg (IVO)',
    description:
      'Tillsynsmyndighet som övervakar kvaliteten i hälso- och sjukvård.',
    website: 'https://www.ivo.se',
    phone: '010-730 30 00',
    email: 'ivo@ivo.se',
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
    logoAttribution: '© IVO',
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
    logoAttribution: '© Försäkringskassan - Tillstånd söks för användning',
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
    logoAttribution: '© DO',
  },
  {
    name: 'Justitieombudsmannen (JO)',
    description:
      'Övervakar att myndigheter och tjänstemän följer lagar och regler.',
    website: 'https://www.jo.se',
    phone: '08-786 40 00',
    email: 'jo@jo.se',
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
    logoAttribution: '© JO',
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
    logoAttribution: '© Socialtjänsten',
  },
  {
    name: 'Arbetsförmedlingen',
    description: 'Myndighet som hjälper människor att komma i arbete.',
    website: 'https://arbetsformedlingen.se',
    phone: '0771-416 416',
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
    logoAttribution:
      '© Arbetsförmedlingen - Används enligt officiella riktlinjer',
  },
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

export const ALL_AUTHORITIES = [
  ...HEALTH_AUTHORITIES,
  ...SOCIAL_INSURANCE_AUTHORITIES,
  ...RIGHTS_AUTHORITIES,
  ...MUNICIPAL_SERVICES,
];
