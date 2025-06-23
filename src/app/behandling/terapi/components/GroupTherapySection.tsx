const GroupTherapySection = () => {
  return (
    <div className="flex flex-col content-container">
      <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
        Gruppterapi och stödgrupper
      </h3>

      <div className="flex flex-col gap-6">
        <div>
          <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
            Gruppterapi:
          </h4>
          <p>
            Fungerar som ett sätt att dela erfarenheter och lära av andra med
            bipolär sjukdom. En terapeut leder gruppen och skapar en trygg miljö
            för att diskutera utmaningar och strategier.
          </p>
        </div>

        <div>
          <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
            Stödgrupper:
          </h4>
          <p>
            Informella möten med andra som har liknande erfarenheter. De
            erbjuder känslomässigt stöd och gemenskap.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupTherapySection;
