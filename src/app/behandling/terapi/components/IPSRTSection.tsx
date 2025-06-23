import HighlightList from "@/app/components/shared/HighlightList";

const IPSRTSection = () => {
  return (
    <div className="flex flex-col content-container">
      <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
        Interpersonell och social rytmterapi (IPSRT)
      </h4>
      <div className="flex flex-col gap-4">
        <div>
          <h5 className="font-semibold text-primary-dark mb-2">
            Vad är IPSRT?
          </h5>
          <p>
            En terapi som kombinerar interpersonella strategier med en
            fokusering på dagliga rutiner.
          </p>
        </div>

        <HighlightList
          title="Hur kan det hjälpa?"
          list={[
            "Förbättra relationer och minska konflikter.",
            "Skapa regelbundna rutiner för sömn, mat och aktiviteter.",
            "Förebygga humörsvängningar genom att hantera livshändelser och stress.",
          ]}
        />
      </div>
    </div>
  );
};

export default IPSRTSection;
