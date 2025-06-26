const CombinedTreatmentSection = () => {
  return (
    <div className="flex flex-col content-container">
      <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
        Medicinsk behandling i kombination med terapi
      </h3>

      <div className="flex flex-col gap-6">
        <p>
          Terapier kombineras ofta med medicinsk behandling för att ge bästa
          möjliga resultat.
        </p>

        <div className="flex flex-col gap-4">
          <ul className="flex flex-col gap-2 list-disc list-inside">
            <li>
              Stämningsstabiliserande mediciner: Hjälper till att minska
              svängningar mellan mani och depression.
            </li>
            <li>Antidepressiva: Används vid behov i samråd med läkare.</li>
          </ul>
        </div>

        <div className="lightest-list-container">
          <p>
            Att kombinera terapi med medicinering kan ge långsiktiga resultat
            och minska risken för återfall.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CombinedTreatmentSection;
