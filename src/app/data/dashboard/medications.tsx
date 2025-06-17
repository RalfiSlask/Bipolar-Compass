import { FiClock, FiList, FiShield } from 'react-icons/fi';

export const MEDICATION_PAGE_LIST = [
  {
    icon: <FiList className="w-6 h-6" />,
    title: 'Enkel översikt',
    description:
      'Få en tydlig översikt över alla dina mediciner på ett ställe.',
  },
  {
    icon: <FiClock className="w-6 h-6" />,
    title: 'Påminnelser',
    description: 'Ställ in påminnelser så du aldrig missar en dos.',
  },
  {
    icon: <FiShield className="w-6 h-6" />,
    title: 'Säker hantering',
    description: 'Din medicinska information hanteras säkert och privat.',
  },
];

export const MEDICATION_OPTIONS = {
  moodStabilizers: [
    {
      value: 'lamotrigine',
      label: 'Lamotrigin (Lamictal)',
      href: 'https://www.fass.se/LIF/substance?substanceId=IDE4POFIUB0Q2VERT1&userType=2',
    },
    {
      value: 'valproate',
      label: 'Valproinsyra (Ergenyl)',
      href: 'https://www.fass.se/LIF/substance?substanceId=IDE4POC1U973RVERT1&userType=2',
    },
    {
      value: 'carbamazepine',
      label: 'Karbamazepin (Tegretol)',
      href: 'https://www.fass.se/LIF/substance?substanceId=IDE4POC8U9CHDVERT1&userType=2',
    },
    {
      value: 'lithium',
      label: 'Litium (Lithionit)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POE6U9ZNXVERT1',
    },
  ],
  antipsychotics: [
    {
      value: 'olanzapine',
      label: 'Olanzapin (Zyprexa)',
      href: 'https://www.fass.se/LIF/substance?substanceId=IDE4POGVUB7FSVERT1&userType=2',
    },
    {
      value: 'quetiapine',
      label: 'Kvetiapin (Seroquel)',
      href: 'https://www.fass.se/LIF/substance?substanceId=IDE4POIDUCD9UVERT1&userType=2',
    },
    {
      value: 'aripiprazole',
      label: 'Aripiprazol (Abilify)',
      href: 'https://www.fass.se/LIF/substance?substanceId=IDE4POJKUCFGAVERT1&userType=2',
    },
    {
      value: 'risperidone',
      label: 'Risperidon (Risperdal)',
      href: 'https://www.fass.se/LIF/substance?substanceId=IDE4POGSUB54MVERT1&userType=2',
    },
    {
      value: 'ziprasidone',
      label: 'Ziprasidon (Zeldox)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POI9UCABBVERT1',
    },
  ],
  antidepressants: [
    {
      value: 'venlafaxine',
      label: 'Venlafaxin (Efexor)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POFLUB33GVERT1',
    },
    {
      value: 'fluoxetine',
      label: 'Fluoxetin (Fontex)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POF4UAPRVVERT1',
    },
    {
      value: 'bupropion',
      label: 'Bupropion (Voxra)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POEWUAJTOVERT1',
    },
    {
      value: 'mirtazapine',
      label: 'Mirtazapin (Remeron)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POF8UAT55VERT1',
    },
    {
      value: 'duloxetine',
      label: 'Duloxetin (Cymbalta)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POI9UCA92VERT1',
    },
  ],
  anxiolytics: [
    {
      value: 'alimemazine',
      label: 'Alimemazin (Theralen)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POBZU95MDVERT1',
    },
    {
      value: 'hydroxyzine',
      label: 'Hydroxizin (Atarax)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POBWU93I5VERT1',
    },
    {
      value: 'lorazepam',
      label: 'Lorazepam (Temesta)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POCIU9KESVERT1',
    },
    {
      value: 'oxazepam',
      label: 'Oxazepam (Sobril)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POCGU9ITHVERT1',
    },
  ],
  sleepMedication: [
    {
      value: 'zopiclone',
      label: 'Zopiklon (Imovane)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POF0UAMLJVERT1',
    },
    {
      value: 'zolpidem',
      label: 'Zolpidem (Stilnoct)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POFIUB0C5VERT1',
    },
    {
      value: 'melatonin',
      label: 'Melatonin (Circadin)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POIFUCEFAVERT1',
    },
    {
      value: 'mirtazapine_sleep',
      label: 'Mirtazapin (Remeron)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POF8UAT55VERT1',
    },
    {
      value: 'alimemazine_sleep',
      label: 'Alimemazin (Theralen)',
      href: 'https://www.fass.se/LIF/substance?userType=2&substanceId=IDE4POBZU95MDVERT1',
    },
  ],
};

export const MEDICATION_CATEGORIES = [
  { value: '', label: 'Välj kategori...' },
  { value: 'moodStabilizers', label: 'Stämningsstabiliserande' },
  { value: 'antipsychotics', label: 'Antipsykotiska' },
  { value: 'antidepressants', label: 'Antidepressiva' },
  { value: 'anxiolytics', label: 'Lugnande medel / Ångestdämpande' },
  { value: 'sleepMedication', label: 'Sömnmedel' },
];

export const DOSE_UNIT_OPTIONS = [
  { value: 'mg', label: 'mg' },
  { value: 'ml', label: 'ml' },
  { value: 'tabletter', label: 'tabletter' },
  { value: 'droppar', label: 'droppar' },
];

export const MEDICATION_FREQUENCY_OPTIONS = [
  { value: '', label: 'Välj frekvens...' },
  { value: '1_daily', label: '1 gång om dagen' },
  { value: '2_daily', label: '2 gånger om dagen' },
  { value: '3_daily', label: '3 gånger om dagen' },
  { value: '4_daily', label: '4 gånger om dagen' },
  { value: 'as_needed', label: 'Vid behov' },
];
