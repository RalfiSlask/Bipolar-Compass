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
  { value: 'weekly', label: '1 gång i veckan' },
  { value: 'as_needed', label: 'Vid behov' },
];
