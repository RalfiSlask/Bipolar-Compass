export const Y_AXIS_LABELS = [
  { id: 12, value: '15-19', label: '15-19', procent: 0.94 },
  { id: 11, value: '20-24', label: '20-24', procent: 1.21 },
  { id: 10, value: '25-29', label: '25-29', procent: 1.22 },
  { id: 9, value: '30-34', label: '30-34', procent: 1.16 },
  { id: 8, value: '35-39', label: '35-39', procent: 1.13 },
  { id: 7, value: '40-44', label: '40-44', procent: 1.14 },
  { id: 6, value: '45-49', label: '45-49', procent: 1.17 },
  { id: 5, value: '50-54', label: '50-54', procent: 1.21 },
  { id: 4, value: '55-59', label: '55-59', procent: 1.26 },
  { id: 3, value: '60-64', label: '60-64', procent: 1.28 },
  { id: 2, value: '65-69', label: '65-69', procent: 1.22 },
  { id: 1, value: '70+', label: '70+', procent: 0.86 },
  { id: 0, value: 'Alla åldrar', label: 'Alla åldrar', procent: 0.93 },
];

export const GENDER_DATA = [
  { name: 'Kvinnor', value: 63 },
  { name: 'Män', value: 37 },
];

export const BIPOLAR_TYPES = [
  { name: 'Typ 1', value: 40 },
  { name: 'Typ 2', value: 40 },
  { name: 'Andra', value: 20 },
];

/* This is for the graph chart for different bipolar diagnoses in the "diagnoser" page */
export const GRAPH_MOOD_LEVELS = [
  { threshold: 40, label: 'Mani' },
  { threshold: 30, label: 'Hypomani' },
  { threshold: 0, label: 'Normal' },
  { threshold: -20, label: 'Lätt Depression' },
  { threshold: -40, label: 'Svår Depression' },
];

export const GRAPH_EXACT_LEVELS = {
  40: 'Mani',
  20: 'Hypomani',
  0: 'Normal',
  '-20': 'Lätt Depression',
  '-40': 'Svår Depression',
};

export const GRAPH_DATA = [
  { time: '0', bipolar1: 0, bipolar2: 0, cyclothymia: 0 },
  { time: '5', bipolar1: 40, bipolar2: 30, cyclothymia: 20 },
  { time: '10', bipolar1: -10, bipolar2: -40, cyclothymia: -20 },
  { time: '15', bipolar1: -50, bipolar2: -40, cyclothymia: -10 },
  { time: '20', bipolar1: 0, bipolar2: 0, cyclothymia: 0 },
];
