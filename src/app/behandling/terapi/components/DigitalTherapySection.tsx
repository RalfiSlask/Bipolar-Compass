const DigitalTherapySection = () => {
  return (
    <div className="flex flex-col content-container">
      <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
        Digital terapi och online-stöd
      </h3>

      <div className="flex flex-col gap-6">
        <p>I en digital värld finns allt fler alternativ för terapi online.</p>

        <div>
          <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
            Appar och digitala program:
          </h4>
          <ul className="flex flex-col gap-2 list-disc list-inside">
            <li>Verktyg för mindfulness och humörspårning.</li>
            <li>Interaktiva terapiprogram baserade på KBT.</li>
          </ul>
        </div>

        <div>
          <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
            Online-terapi:
          </h4>
          <p>
            Möjlighet att prata med en terapeut via videosamtal, vilket kan vara
            särskilt användbart om du har svårt att ta dig till en mottagning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DigitalTherapySection;
