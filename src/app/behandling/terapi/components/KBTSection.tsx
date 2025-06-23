import HighlightList from "@/app/components/shared/HighlightList";

const KBTSection = () => {
  return (
    <div className="flex flex-col content-container">
      <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
        Kognitiv beteendeterapi (KBT)
      </h4>
      <div className="flex flex-col gap-4">
        <div>
          <h5 className="font-semibold text-primary-dark mb-2">Vad är KBT?</h5>
          <p>
            KBT är en vanlig terapiform vid bipolär sjukdom i Sverige. Den
            fokuserar på att identifiera och förändra negativa tankemönster och
            beteenden. Behandlingen kan ges individuellt eller i grupp, oftast
            en gång i veckan, och längden på behandlingen varierar beroende på
            individuella behov.
          </p>
        </div>

        <HighlightList
          title="Hur kan det hjälpa?"
          list={[
            "Förstå och hantera triggers som kan orsaka episoder.",
            "Lära sig strategier för att minska stress och förbättra relationer.",
            "Bygga hälsosamma rutiner för att stabilisera humöret.",
          ]}
        />
      </div>
    </div>
  );
};

export default KBTSection;
