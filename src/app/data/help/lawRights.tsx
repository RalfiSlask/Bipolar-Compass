import { IFlowChartStep } from '@/app/types/flowchart';
import {
  FaBalanceScale,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileAlt,
  FaGavel,
  FaHospital,
  FaIdCard,
  FaPhone,
  FaUserShield,
} from 'react-icons/fa';

export const LAW_RIGHTS_FLOW_CHART: IFlowChartStep[] = [
  {
    icon: <FaExclamationTriangle className="text-2xl text-primary-accent" />,
    title: 'Rättighetskränkning',
    description: 'Dokumentera situationen',
    tooltip: {
      title: 'Rättighetskränkning',
      tips: [
        'Notera exakt när och var det hände',
        'Identifiera vilken rättighet som kränkts',
        'Ta kontakt med någon du litar på för stöd',
      ],
    },
  },
  {
    icon: <FaFileAlt className="text-2xl text-primary-accent" />,
    title: 'Dokumentation',
    description: 'Samla bevis och skriv ner detaljer',
    tooltip: {
      title: 'Dokumentation',
      tips: [
        'Skriv ner alla detaljer om händelsen',
        'Spara eventuella mejl, brev eller andra dokument',
        'Fotografera eller spara bevis om möjligt',
      ],
    },
  },
  {
    icon: <FaPhone className="text-2xl text-primary-accent" />,
    title: 'Kontakt',
    description: 'Ring relevant myndighet',
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
    icon: <FaGavel className="text-2xl text-primary-accent" />,
    title: 'Formellt klagomål',
    description: 'Skicka in skriftlig inlaga',
    tooltip: {
      title: 'Formellt klagomål',
      tips: [
        'Var tydlig och konkret',
        'Inkludera all dokumentation',
        'Specificera vad du vill ha ut av klagomålet',
      ],
    },
  },
  {
    icon: <FaCheckCircle className="text-2xl text-primary-accent" />,
    title: 'Uppföljning',
    description: 'Följ upp ärendet',
    tooltip: {
      title: 'Uppföljning',
      tips: [
        'Följ upp regelbundet',
        'Dokumentera all kommunikation',
        'Be om skriftliga svar på dina frågor',
      ],
    },
  },
];

export const LAW_RIGHTS_BENEFITS = [
  {
    icon: <FaIdCard className="text-tertiary-dark text-3xl mb-4" />,
    title: 'Sjukersättning',
    description:
      'Om din sjukdom påverkar din arbetsförmåga kan du ha rätt till sjukersättning.',
    link: 'https://www.forsakringskassan.se/privatperson/sjuk/funktionsnedsattning-eller-langvarig-sjukdom/sjukersattning',
  },
  {
    icon: <FaUserShield className="text-tertiary-dark text-3xl mb-4" />,
    title: 'Aktivitetsersättning',
    description:
      'Om du har nedsatt arbetsförmåga men kan delta i aktiviteter kan du ha rätt till aktivitetsersättning.',
    link: 'https://www.forsakringskassan.se/privatperson/funktionsnedsattning/aktivitetsersattning',
  },
  {
    icon: <FaHospital className="text-tertiary-dark text-3xl mb-4" />,
    title: 'Bostadsbidrag',
    description:
      'Vid ekonomiska svårigheter kan du ha rätt till bostadsbidrag. Ansök hos Socialförsäkringskassan.',
    link: 'https://www.forsakringskassan.se/privatperson/arbetssokande/bostadsbidrag',
  },
];

export const LAW_FIRMS_SPECIALIZED = [
  {
    name: 'Myndighetsjuridik AB',
    description:
      'Specialiserade på socialförsäkringsrätt och överklaganden mot Försäkringskassan.',
    link: 'https://www.myndighetsjuridik.se',
  },
  {
    name: 'Göran Söderlund',
    description:
      'F.d. handläggare på Försäkringskassan, specialiserad på psykisk ohälsa.',
    link: 'https://www.goransoderlund.se',
  },
  {
    name: 'HQ Rådgivning',
    description: 'Erfaren rådgivning för överklaganden av FK-beslut.',
    link: 'https://hqradgivning.se',
  },
];

export const LAW_GUIDES = [
  {
    name: 'Advokatsamfundet',
    description: 'Gratis 15-minuters juridisk rådgivning via Advokatsamfundet.',
    link: 'https://www.advokatsamfundet.se/Anlita-en-advokat/Advokatjouren/',
  },
  {
    name: 'Funktionsrätt Sverige',
    description: 'Paraplyorganisation som kan guida till rätt stöd och hjälp.',
    link: 'https://funktionsratt.se',
  },
];

export const OFFICIAL_AUTHORITIES = [
  {
    name: '1177 Vårdguiden',
    url: 'https://www.1177.se',
    icon: <FaHospital />,
  },
  {
    name: 'Socialstyrelsen',
    url: 'https://www.socialstyrelsen.se',
    icon: <FaUserShield />,
  },
  {
    name: 'Försäkringskassan',
    url: 'https://www.forsakringskassan.se',
    icon: <FaIdCard />,
  },
  {
    name: 'Diskrimineringsombudsmannen (DO)',
    url: 'https://www.do.se',
    icon: <FaBalanceScale />,
  },
  {
    name: 'Inspektionen för vård och omsorg (IVO)',
    url: 'https://www.ivo.se',
    icon: <FaGavel />,
  },
];

export const OFFICIAL_LAWS = [
  {
    name: 'Patientlagen (2014:821)',
    url: 'https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/patientlag-2014821_sfs-2014-821',
    icon: <FaFileAlt />,
  },
  {
    name: 'Lagen om psykiatrisk tvångsvård (1991:1128)',
    url: 'https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/lag-19911128-om-psykiatrisk-tvangsvard_sfs-1991-1128',
    icon: <FaFileAlt />,
  },
  {
    name: 'Diskrimineringslagen (2008:567)',
    url: 'https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/diskrimineringslag-2008567_sfs-2008-567',
    icon: <FaFileAlt />,
  },
];

export const LAW_RIGHTS_LINKS = [
  'Rätt till information om din sjukdom och behandling',
  'Rätt till delaktighet i vårdbeslut',
  'Rätt till sekretess och integritetsskydd',
  'Rätt till en andra åsikt',
  'Rätt till tillgång till din journal',
  'Rätt till överklagande av vårdbeslut',
];

export const JOURNAL_HANDLING_LINKS = [
  'Kontakta din vårdgivare direkt',
  'Använda 1177:s tjänst för journalutlämning',
  'Begära ändringar om informationen är felaktig',
];
