import { BiFirstAid, BiHelpCircle, BiLogIn } from 'react-icons/bi';
import { MdMood } from 'react-icons/md';

export const CHAT_SUGGESTIONS = [
  {
    text: 'Vad är bipolaritet?',
    icon: MdMood,
    iconColor: '#FFD700',
  },
  {
    text: 'Kan man bota ångest?',
    icon: BiHelpCircle,
    iconColor: '#4CAF50',
  },
  {
    text: 'Hur loggar jag in?',
    icon: BiLogIn,
    iconColor: '#2196F3',
  },
  {
    text: 'Behöver akut hjälp',
    icon: BiFirstAid,
    iconColor: '#FF5252',
  },
];
