import HighlightList from '@/app/components/shared/HighlightList';
import { MdMedicalServices } from 'react-icons/md';

const TreatmentSupport = () => {
  return (
    <div className="md:col-span-2 content-container">
      <div className="flex items-center gap-4 mb-6">
        <MdMedicalServices className="text-4xl text-primary-dark" />
        <h3 className="h-xs text-primary-dark">Behandling och stöd</h3>
      </div>
      <p className="mb-6 ">
        Bipolär sjukdom är en kronisk sjukdom, men det finns effektiva
        behandlingar som kan hjälpa till att stabilisera humöret och förbättra
        livskvaliteten. Behandlingen inkluderar oftast:
      </p>
      <HighlightList
        list={[
          'Medicinering, såsom stämningsstabiliserare eller antidepressiva',
          'Psykoterapi, till exempel KBT eller familjeterapi',
          'Livsstilsförändringar som regelbundna sömn- och rutiner',
        ]}
      />
      <p className="mt-6">
        Det är också viktigt att ha stöd från familj, vänner och vårdpersonal.
        Att förstå sjukdomen är ett viktigt steg för att hantera den.
      </p>
    </div>
  );
};

export default TreatmentSupport;
