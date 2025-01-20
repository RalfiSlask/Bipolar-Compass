import { ReactElement } from 'react';
import { FaBolt, FaRunning, FaSadTear, FaSmile, FaUsers } from 'react-icons/fa';
import { GiDistressSignal, GiMeditation } from 'react-icons/gi';
import { MdSentimentVerySatisfied } from 'react-icons/md';

export const getMoodIcon = (moodName: string): ReactElement | null => {
  const icons: Record<string, ReactElement> = {
    'Ångest': <MdSentimentVerySatisfied className="w-6 h-6 text-yellow-500" />,
    'Energi': <FaBolt className="w-6 h-6 text-red-500" />,
    'Tränat': <FaRunning className="w-6 h-6 text-green-500" />,
    'Socialt': <FaUsers className="w-6 h-6 text-orange-500" />,
    'Sömn (h)': <GiMeditation className="w-6 h-6 text-blue-500" />,
    'Depression': <FaSadTear className="w-6 h-6 text-blue-400" />,
    'Stress': <GiDistressSignal className="w-6 h-6 text-purple-500" />,
    'Lycka': <FaSmile className="w-6 h-6 text-yellow-400" />,
  };

  return icons[moodName] || null;
};
