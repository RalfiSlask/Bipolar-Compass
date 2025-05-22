import { format, isToday } from 'date-fns';
import { sv } from 'date-fns/locale';

import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface IMoodTrackerDaySwitcherProps {
  selectedDate: Date;
  handlePreviousDay: () => void;
  handleNextDay: () => void;
}

const MoodTrackerDaySwitcher = ({
  selectedDate,
  handlePreviousDay,
  handleNextDay,
}: IMoodTrackerDaySwitcherProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex-1">
      <div className="flex items-center justify-between gap-4">
        <button
          aria-label="pil för att gå till föregående dag"
          onClick={handlePreviousDay}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-light text-primary-dark 
          hover:bg-primary-medium hover:text-white transform transition-all duration-300 
          hover:shadow-md active:scale-95"
        >
          <IoChevronBackOutline size={24} />
        </button>

        <div className="text-center">
          <h2 className="text-xl font-medium text-primary-dark">
            {format(selectedDate, 'EEEE', { locale: sv })}
          </h2>
          <p className="text-sm text-gray-500">
            {format(selectedDate, 'd MMMM yyyy', { locale: sv })}
          </p>
        </div>

        <button
          aria-label={`${
            isToday(selectedDate)
              ? 'pil för att gå till nästa dag, utgråad är redan på dagens datum'
              : 'pil för att gå till nästa dag'
          }`}
          onClick={handleNextDay}
          disabled={isToday(selectedDate)}
          className={`w-12 h-12 flex items-center justify-center rounded-xl transform transition-all duration-300 
          ${
            isToday(selectedDate)
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
              : 'bg-primary-light text-primary-dark hover:bg-primary-medium hover:text-white hover:shadow-md active:scale-95'
          }`}
        >
          <IoChevronForwardOutline size={24} />
        </button>
      </div>
    </div>
  );
};

export default MoodTrackerDaySwitcher;
