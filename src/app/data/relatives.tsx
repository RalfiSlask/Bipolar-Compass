import { FiClock, FiMail, FiShield } from 'react-icons/fi';

export const RELATIVE_TYPES = [
  { value: '', label: 'Välj typ av anhörig...' },
  { value: 'parent', label: 'Förälder' },
  { value: 'sibling', label: 'Syskon' },
  { value: 'partner', label: 'Partner' },
  { value: 'child', label: 'Barn' },
  { value: 'friend', label: 'Vän' },
  { value: 'other', label: 'Annan' },
];

export const RELATIVE_FEATURES = [
  {
    icon: <FiMail className="w-6 h-6" />,
    title: 'E-postutskick',
    description:
      'Skicka automatiska uppdateringar till dina anhöriga via e-post.',
  },
  {
    icon: <FiClock className="w-6 h-6" />,
    title: 'Anpassad frekvens',
    description: 'Välj hur ofta dina anhöriga ska få uppdateringar.',
  },
  {
    icon: <FiShield className="w-6 h-6" />,
    title: 'Säker hantering',
    description: 'All kommunikation hanteras säkert och konfidentiellt.',
  },
];

export const RELATIVE_TIPS = [
  {
    title: 'Informera dig om sjukdomen',
    description:
      'Läs på om bipolär sjukdom. Genom att förstå diagnosen kan du få en bättre bild av vad din närstående går igenom och hur du kan stötta.',
  },
  {
    title: 'Var en lyhörd samtalspartner',
    description:
      'Lyssna utan att döma eller försöka fixa situationen. Bara att få känna sig hörd kan vara en enorm lättnad för den som mår dåligt.',
  },
  {
    title: 'Hjälp till med struktur och rutiner',
    description:
      'Personer med bipolär sjukdom kan ha svårt att hålla struktur i vardagen, särskilt under sjukdomsperioder. Du kan hjälpa till med att skapa och upprätthålla rutiner.',
  },
  {
    title: 'Lär dig känna igen tidiga varningstecken',
    description:
      'Många anhöriga blir med tiden bra på att se tecken på att en manisk eller depressiv period är på väg. Tidig intervention kan hjälpa till att förhindra att episoden förvärras.',
  },
];
