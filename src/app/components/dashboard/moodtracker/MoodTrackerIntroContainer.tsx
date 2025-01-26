interface IMoodTrackerIntroContainerProps {
  user: string;
  week?: boolean;
}

const MoodTrackerIntroContainer = ({
  user,
  week = false,
}: IMoodTrackerIntroContainerProps) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-4 sm:p-8 relative overflow-hidden">
      <div className="relative z-10">
        <span className="inline-block px-4 py-1 bg-primary-light text-primary-dark rounded-full text-sm font-medium mb-4">
          {week ? 'Veckans hälsokoll' : 'Dagens hälsokoll'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-secondary-dark mb-3">
          Välkommen, {user}!
        </h2>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
          Ta en stund att reflektera över{' '}
          {week ? 'veckans mönster' : 'hur du mår idag'}. Din mentala hälsa är
          viktig, och genom att följa dina mönster kan du bättre förstå dig
          själv.
        </p>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light rounded-full  transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-tertiary-light rounded-full  transform translate-x-8 translate-y-8"></div>
    </div>
  );
};

export default MoodTrackerIntroContainer;
