import { FiList, FiClock, FiShield } from 'react-icons/fi';

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
    { value: 'lithium', label: 'Lithium' },
    { value: 'lamotrigine', label: 'Lamotrigin' },
    { value: 'valproate', label: 'Valproat' },
    { value: 'carbamazepine', label: 'Karbamazepin' },
  ],
  antipsychotics: [
    { value: 'olanzapine', label: 'Olanzapin (Zyprexa)' },
    { value: 'quetiapine', label: 'Quetiapin (Seroquel)' },
    { value: 'aripiprazole', label: 'Aripiprazol (Abilify)' },
    { value: 'risperidone', label: 'Risperidon (Risperdal)' },
  ],
  antidepressants: [
    { value: 'sertraline', label: 'Sertralin (Zoloft)' },
    { value: 'fluoxetine', label: 'Fluoxetin (Prozac)' },
    { value: 'venlafaxine', label: 'Venlafaxin (Effexor)' },
    { value: 'bupropion', label: 'Bupropion (Wellbutrin)' },
  ],
};

export const MEDICATION_CATEGORIES = [
  { value: '', label: 'Välj kategori...' },
  { value: 'moodStabilizers', label: 'Stämningsstabiliserande' },
  { value: 'antipsychotics', label: 'Antipsykotiska' },
  { value: 'antidepressants', label: 'Antidepressiva' },
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
