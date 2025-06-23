import HighlightList from "@/app/components/shared/HighlightList";

const PsychoeducationSection = () => {
  return (
    <div className="flex flex-col content-container">
      <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
        Psykoedukation
      </h4>
      <div className="flex flex-col gap-4">
        <div>
          <h5 className="font-semibold text-primary-dark mb-2">
            Vad är psykoedukation?
          </h5>
          <p>
            Psykoedukation, även kallad patient- och närståendeutbildning, är en
            viktig del av behandlingen vid bipolär sjukdom i Sverige. Den syftar
            till att öka förståelsen för sjukdomen, hur läkemedel fungerar och
            vad man själv kan göra för att minska risken för nya sjukdomsskov.
          </p>
        </div>

        <HighlightList
          title="Hur kan det hjälpa?"
          list={[
            "Öka insikten om bipolär sjukdom.",
            "Förbättra samarbetet med vårdpersonal och närstående.",
            "Förbättra behandlingsföljsamhet, exempelvis medicinering.",
          ]}
        />
      </div>
    </div>
  );
};

export default PsychoeducationSection;
