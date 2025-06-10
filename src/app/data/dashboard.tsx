import {
  BsCalendarCheck,
  BsClockHistory,
  BsGear,
  BsJournalText,
} from 'react-icons/bs';
import {
  FaCompass,
  FaPills,
  FaSignOutAlt,
  FaUserNurse,
  FaUsers,
} from 'react-icons/fa';

export const DASHBOARD_NAVIGATION_LINKS = [
  {
    title: 'Min Sida',
    href: '/min-sida',
    icon: <FaCompass className="w-6 h-6 text-primary-dark" />,
  },
  {
    title: 'Mood Tracker',
    href: '/min-sida/moodtracker',
    icon: <BsCalendarCheck className="w-6 h-6 text-primary-dark" />,
  },
  {
    title: 'Dagbok',
    href: '/min-sida/dagbok',
    icon: <BsJournalText className="w-6 h-6 text-primary-dark" />,
  },
  {
    title: 'Historik',
    href: '/min-sida/historik',
    icon: <BsClockHistory className="w-6 h-6 text-primary-dark" />,
  },

  {
    title: 'Anhöriga',
    href: '/min-sida/anhoriga',
    icon: <FaUsers className="w-6 h-6 text-primary-dark" />,
  },
  {
    title: 'Vårdgivare',
    href: '/min-sida/vardgivare',
    icon: <FaUserNurse className="w-6 h-6 text-primary-dark" />,
  },
  {
    title: 'Mediciner',
    href: '/min-sida/medicin',
    icon: <FaPills className="w-6 h-6 text-primary-dark" />,
  },
  {
    title: 'Inställningar',
    href: '/min-sida/installningar',
    icon: <BsGear className="w-6 h-6 text-primary-dark" />,
  },
  {
    title: 'Logga ut',
    href: '/',
    icon: <FaSignOutAlt className="w-6 h-6 text-primary-dark" />,
  },
];

export const ANXIETY_COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#FF6384',
  '#36A2EB',
];

export const WEIGHTS = {
  anxiety: 0.25,
  stress: 0.2,
  depression: 0.25,
  energy: 0.15,
  physical: 0.1,
  social: 0.15,
  sleep: 0.2,
};
