import {
  BsCalendarCheck,
  BsClockHistory,
  BsGear,
  BsJournalText,
} from 'react-icons/bs';

export const dashboardNavigationLinks = [
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
    title: 'Inställningar',
    href: '/min-sida/installningar',
    icon: <BsGear className="w-6 h-6 text-primary-dark" />,
  },
];
