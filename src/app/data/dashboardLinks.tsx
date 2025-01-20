import {
  BsCalendarCheck,
  BsClockHistory,
  BsGear,
  BsJournalText,
} from 'react-icons/bs';
import { FaCompass, FaPills, FaSignOutAlt, FaUsers } from 'react-icons/fa';

export const dashboardNavigationLinks = [
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
