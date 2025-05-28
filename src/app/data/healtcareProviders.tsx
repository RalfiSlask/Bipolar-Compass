import { FiClock, FiMail, FiShield } from 'react-icons/fi';

export const HEALTHCARE_PROVIDER_TYPES = [
  { value: '', label: 'Välj typ av vårdgivare...' },
  { value: 'doctor', label: 'Läkare' },
  { value: 'psychologist', label: 'Psykolog' },
  { value: 'psychiatrist', label: 'Psykiater' },
  { value: 'nurse', label: 'Sjuksköterska' },
  { value: 'therapist', label: 'Terapeut' },
  { value: 'counselor', label: 'Rådgivare' },
  { value: 'occupational_therapist', label: 'Arbetsterapeut' },
  { value: 'case_manager', label: 'Stödsamordnare' },
  { value: 'other', label: 'Annan' },
];

export const HEALTHCARE_PROVIDER_FEATURES = [
  {
    icon: <FiMail className="w-6 h-6" />,
    title: 'E-postutskick',
    description:
      'Skicka automatiska uppdateringar till dina vårdgivare via e-post.',
  },
  {
    icon: <FiClock className="w-6 h-6" />,
    title: 'Anpassad frekvens',
    description: 'Välj hur ofta dina vårdgivare ska få uppdateringar.',
  },
  {
    icon: <FiShield className="w-6 h-6" />,
    title: 'Säker hantering',
    description: 'All kommunikation hanteras säkert och konfidentiellt.',
  },
];
