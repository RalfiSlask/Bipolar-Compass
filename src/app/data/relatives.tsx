import { FiClock, FiShield } from "react-icons/fi";

import { FiMail } from "react-icons/fi";

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
      description:
        'Välj hur ofta dina anhöriga ska få uppdateringar.',
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: 'Säker hantering',
      description:
        'All kommunikation hanteras säkert och konfidentiellt.',
    },
  ]
