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
        title: 'Symptomguide',
        description: 'Sök på symptom och få råd om när du ska söka vård',
      },
      {
        id: 2,
        title: 'Vårdcentraler & sjukhus',
        description:
          'Hitta närmaste vårdcentral, sjukhus eller specialistklinik',
      },
      {
        id: 3,
        title: 'Digitala journaler',
        description: 'Se dina journaler, provsvar och läkemedelslistor',
      },
      {
        id: 4,
        title: 'Boka tid digitalt',
        description: 'Boka vårdtid online hos din vårdcentral',
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
        title: 'Smittskydd',
        description: 'Information om smittsamma sjukdomar och vaccinering',
      },
      {
        id: 2,
        title: 'Miljöhälsa',
        description: 'Rapporter om miljöfaktorer som påverkar hälsan',
      },
      {
        id: 3,
        title: 'Psykisk hälsa',
        description:
          'Nationella program för psykisk hälsa och suicidprevention',
      },
      {
        id: 4,
        title: 'Folkhälsostatistik',
        description: 'Officiell statistik om folkhälsa och sjukdomar i Sverige',
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
        description: 'Anmäl brister i vårdkvalitet eller patienthantering',
      },
      {
        id: 2,
        title: 'Tillsynsrapporter',
        description: 'Läs rapporter om vårdkvalitet på olika vårdgivare',
      },
      {
        id: 3,
        title: 'Patienträttigheter',
        description: 'Information om dina rättigheter som patient',
      },
      {
        id: 4,
        title: 'Vårdgivarregistret',
        description: 'Sök information om vårdgivare och deras tillstånd',
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
        title: 'E-recept',
        description: 'Digitala recept som kan hämtas på alla apotek i Sverige',
      },
      {
        id: 2,
        title: 'Digitala journaler',
        description: 'Säker hantering av digital vårdinformation',
      },
      {
        id: 3,
        title: 'Digitala vårdmöten',
        description: 'Tekniskt stöd för videomöten med vårdpersonal',
      },
      {
        id: 4,
        title: 'Patientportaler',
        description: 'Stöd för kommunikation mellan patient och vårdgivare',
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
        description: 'Nationella register för olika sjukdomar och behandlingar',
      },
      {
        id: 2,
        title: 'Vårdriktlinjer',
        description:
          'Nationella riktlinjer för vård och behandling av olika sjukdomar',
      },
      {
        id: 3,
        title: 'Vårdstatistik',
        description: 'Officiell statistik om vårdkvalitet och patientutfall',
      },
      {
        id: 4,
        title: 'Tillsyn av vård',
        description: 'Övervakar att vården följer lagar och regler',
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
        title: 'Sjukpenning',
        description: 'Ersättning när du är sjuk och inte kan arbeta',
      },
      {
        id: 2,
        title: 'Sjukersättning',
        description: 'Långvarig ersättning vid permanent nedsatt arbetsförmåga',
      },
      {
        id: 3,
        title: 'Aktivitetsersättning',
        description:
          'Stöd för att delta i aktiviteter trots funktionsnedsättning',
      },
      {
        id: 4,
        title: 'Rehabiliteringsersättning',
        description: 'Stöd under rehabilitering för att återgå till arbete',
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
        title: 'Klagomål på myndigheter',
        description: 'Anmäl när myndigheter inte följer lagar eller regler',
      },
      {
        id: 2,
        title: 'Myndighetskontroll',
        description:
          'Övervakar att polis, domstolar och myndigheter följer lagen',
      },
      {
        id: 3,
        title: 'JO-rapporter',
        description: 'Läs rapporter om myndighetsfel och rekommendationer',
      },
      {
        id: 4,
        title: 'Rättsäkerhet',
        description: 'Arbetar för att stärka rättssäkerheten i samhället',
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
        title: 'Anmäl diskriminering',
        description:
          'Anmäl diskriminering på grund av kön, etnicitet, funktionsnedsättning',
      },
      {
        id: 2,
        title: 'Diskrimineringslagar',
        description: 'Information om lagar som skyddar mot diskriminering',
      },
      {
        id: 3,
        title: 'Medling i ärenden',
        description: 'Hjälp att lösa diskrimineringsärenden genom medling',
      },
      {
        id: 4,
        title: 'Kunskapsutveckling',
        description: 'Utbildning och information om diskriminering',
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
        description: 'Hjälp med att hitta arbete och söka jobb',
      },
      {
        id: 2,
        title: 'Arbetslivsinriktad rehabilitering',
        description: 'Stöd för att återgå till arbete efter sjukdom',
      },
      {
        id: 3,
        title: 'Utbildningsstöd',
        description: 'Ekonomiskt stöd för utbildning och omskolning',
      },
      {
        id: 4,
        title: 'Anpassningar på arbetsplats',
        description:
          'Hjälp med anpassningar för personer med funktionsnedsättning',
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
        description: 'Försörjningsstöd när du inte har tillräckligt med pengar',
      },
      {
        id: 2,
        title: 'Bostadsstöd',
        description:
          'Hjälp med bostadsfrågor och boende för personer med särskilda behov',
      },
      {
        id: 3,
        title: 'Personlig assistans',
        description: 'Stöd för personer med funktionsnedsättning i vardagen',
      },
      {
        id: 4,
        title: 'Rådgivning om sociala rättigheter',
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
        description:
          'Stöd och rådgivning för unga människor med psykiska problem',
      },
      {
        id: 2,
        title: 'Civilsamhällsstöd',
        description:
          'Ekonomiskt stöd för ideella organisationer som arbetar med unga',
      },
      {
        id: 3,
        title: 'Ungdomsinflytande',
        description: 'Program för att stärka ungas röst i samhället',
      },
      {
        id: 4,
        title: 'Forskning',
        description: 'Forskning om ungas livsvillkor och psykiska hälsa',
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
        title: 'Samverkan vård',
        description: 'Samverkan mellan kommuner och regioner för psykisk vård',
      },
      {
        id: 2,
        title: 'Kunskapsutveckling',
        description: 'Utveckling av metoder för psykisk hälsa i kommuner',
      },
      {
        id: 3,
        title: 'Vårdriktlinjer',
        description: 'Riktlinjer för psykisk vård i kommuner och regioner',
      },
      {
        id: 4,
        title: 'Stöd till kommuner',
        description: 'Stöd till kommuner i arbetet med psykisk hälsa',
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
        description:
          'Stöd för elever med läs- och skrivsvårigheter, ADHD, autism',
      },
      {
        id: 2,
        title: 'Specialskolor',
        description: 'Särskilda skolor för elever med funktionsnedsättningar',
      },
      {
        id: 3,
        title: 'Specialpedagogisk rådgivning',
        description: 'Rådgivning för skolor och föräldrar om specialpedagogik',
      },
      {
        id: 4,
        title: 'Utbildning',
        description: 'Utbildning för lärare inom specialpedagogik',
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
        description:
          'Utveckling av läroplaner och kursplaner för alla skolformer',
      },
      {
        id: 2,
        title: 'Skolans kvalitet',
        description: 'Arbete för att förbättra skolans kvalitet och resultat',
      },
      {
        id: 3,
        title: 'Skolstatistik',
        description: 'Officiell statistik om skolväsendet och elevers resultat',
      },
      {
        id: 4,
        title: 'Stöd till skolor',
        description: 'Stöd till skolor för utveckling och förbättring',
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
        description: 'Föreskrifter och riktlinjer för säker arbetsmiljö',
      },
      {
        id: 3,
        title: 'arbetsmiljörådgivning',
        description: 'Rådgivning om arbetsmiljöfrågor och säkerhet',
      },
      {
        id: 4,
        title: 'Arbetsmiljöstatistik',
        description: 'Statistik om arbetsskador och olyckor på arbetsplatser',
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
        description:
          'Arbete för att främja jämställdhet mellan kvinnor och män',
      },
      {
        id: 2,
        title: 'Diskriminering',
        description: 'Motverka diskriminering på olika grunder',
      },
      {
        id: 3,
        title: 'Rådgivning om diskriminering',
        description: 'Rådgivning om jämställdhet och diskriminering',
      },
      {
        id: 4,
        title: 'Forskning',
        description: 'Forskning om jämställdhet och diskriminering i samhället',
      },
    ],
    image: '/images/help/authorities/logos/jämställdhetsmyndigheten.webp',
  },
];

export const SERVICE_CATEGORIES = [
  {
    id: 'vard',
    name: 'Vård',
    keywords: [
      'vård',
      'sjukhus',
      'vårdcentral',
      'journal',
      'recept',
      'patient',
      'behandling',
      'symptom',
      'smittskydd',
      'miljöhälsa',
      'psykisk hälsa',
      'vårdriktlinjer',
      'kvalitetsregister',
      'tillsyn av vård',
      'vårdmöten',
      'patientportaler',
    ],
  },
  {
    id: 'ersattning',
    name: 'Ersättning',
    keywords: [
      'ersättning',
      'sjukpenning',
      'sjukersättning',
      'aktivitetsersättning',
      'rehabiliteringsersättning',
    ],
  },
  {
    id: 'stod',
    name: 'Stöd',
    keywords: [
      'stöd',
      'bistånd',
      'civilsamhällsstöd',
      'personlig assistans',
      'bostadsstöd',
      'ekonomiskt bistånd',
      'ekonomiskt stöd',
      'stöd till kommuner',
      'specialpedagogiskt stöd',
      'utbildningsstöd',
    ],
  },
  {
    id: 'skola',
    name: 'Skola',
    keywords: [
      'skola',
      'specialskolor',
      'skolutveckling',
      'läroplaner',
      'specialpedagogiskt',
      'utbildning',
      'skolans kvalitet',
    ],
  },
  {
    id: 'arbete',
    name: 'Arbete',
    keywords: [
      'arbete',
      'arbetsförmedling',
      'arbetslivsinriktad',
      'arbetsmiljö',
      'anpassningar på arbetsplats',
      'rehabilitering',
      'föreskrifter',
    ],
  },
  {
    id: 'rattigheter',
    name: 'Rättigheter',
    keywords: [
      'rättigheter',
      'klagomål',
      'diskriminering',
      'patienträttigheter',
      'myndighetskontroll',
      'rättsäkerhet',
      'medling',
      'jämställdhet',
      'ungdomsinflytande',
    ],
  },
  {
    id: 'statistik',
    name: 'Statistik',
    keywords: ['statistik', 'rapporter', 'register', 'skolstatistik'],
  },
  {
    id: 'radgivning',
    name: 'Rådgivning',
    keywords: [
      'rådgivning',
      'ungdomsrådgivning',
      'specialpedagogisk rådgivning',
      'rådgivning om sociala rättigheter',
      'arbetsmiljörådgivning',
    ],
  },
  {
    id: 'forskning',
    name: 'Forskning',
    keywords: ['forskning', 'kunskapsutveckling'],
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
