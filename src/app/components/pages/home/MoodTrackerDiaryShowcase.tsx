import Image from 'next/image';

const MoodTrackerDiaryShowcase = () => {
  return (
    <div className="w-full flex items-center justify-center py-10 sm:pt-28 sm:pb-20 px-4 sm:px-10">
      <div className="w-full flex flex-col items-center gap-8 sm:gap-10 max-w-[1440px]">
        <div className="w-full flex text-secondary-dark flex-1 flex-col gap-8 sm:gap-16 items-center justify-center">
          <div className="flex flex-col gap-4 text-center px-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Dagliga verktyg stärker din resa tillbaka till hälsa
            </h3>
            <p className="text-gray-500 font-medium text-base sm:text-lg lg:text-xl">
              Allas resa för att komma tillbaka till hälsa är unik, men vi kan
              hjälpa dig att hitta vägen och ta det första steget.
            </p>
          </div>

          <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10">
            <div className="flex flex-1 justify-center">
              <div className="flex flex-col gap-4 text-center lg:text-left">
                <h4 className="text-xl sm:text-2xl font-bold">
                  Starta med ditt mående
                </h4>
                <p className="text-base sm:text-lg">
                  Vi har en mood tracker som är enkelt att använda och fokuserar
                  på att du ska få en överblick över ditt tillstånd.
                </p>
                <div className="w-full flex items-center justify-center mt-4">
                  <Image
                    src="/images/mood-tracker.png"
                    alt="Mood tracker diary"
                    width={490}
                    height={253}
                    className="object-contain rounded-2xl lg:rounded-full w-full max-w-[400px]"
                  />
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-px bg-gray-300"></div>
            <div className="h-px lg:hidden bg-gray-300"></div>

            <div className="flex flex-1 justify-center">
              <div className="flex flex-col gap-4 text-center lg:text-left">
                <h4 className="text-xl sm:text-2xl font-bold">
                  Följ din resa med vår dagbok
                </h4>
                <p className="text-base sm:text-lg">
                  Fyll i dina dagliga uppgifter och följ din resa med vår
                  dagbok.
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="primary-button text-lg sm:text-xl lg:text-2xl"
          aria-label="Kom igång"
        >
          Kom igång
        </button>
      </div>
    </div>
  );
};

export default MoodTrackerDiaryShowcase;
