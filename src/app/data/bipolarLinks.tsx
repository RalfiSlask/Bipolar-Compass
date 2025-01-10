import { BsQuestionCircle } from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';
import { MdOutlineHealthAndSafety, MdPsychology } from 'react-icons/md';

export const bipolarLinks = [
  {
    title: 'Vad är bipolaritet?',
    href: '/bipolaritet/vad-ar-bipolaritet',
    description: 'Lär dig mer om vad bipolär sjukdom innebär',
    icon: (
      <div className="p-3 rounded-full bg-pink-100 shadow-lg ring-2 ring-pink-500/20">
        <MdPsychology className="w-12 h-12 text-pink-500" />
      </div>
    ),
  },
  {
    title: 'Symptom',
    href: '/bipolaritet/symptom',
    description: 'Vanliga tecken och symptom vid bipolär sjukdom',
    icon: (
      <div className="p-3 rounded-full bg-blue-100 shadow-lg ring-2 ring-blue-500/20">
        <FaClipboardList className="w-12 h-12 text-blue-500" />
      </div>
    ),
  },
  {
    title: 'Diagnoser',
    href: '/bipolaritet/diagnoser',
    description: 'Olika typer av bipolär sjukdom och diagnostisering',
    icon: (
      <div className="p-3 rounded-full bg-green-100 shadow-lg ring-2 ring-green-500/20">
        <MdOutlineHealthAndSafety className="w-12 h-12 text-green-500" />
      </div>
    ),
  },
  {
    title: 'Vanliga frågor',
    href: '/bipolaritet/vanliga-fragor',
    description: 'Svar på ofta förekommande frågor',
    icon: (
      <div className="p-3 rounded-full bg-red-100 shadow-lg ring-2 ring-red-500/20">
        <BsQuestionCircle className="w-12 h-12 text-red-500" />
      </div>
    ),
  },
];
