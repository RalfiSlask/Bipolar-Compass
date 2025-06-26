import FlowChart from '@/app/components/shared/FlowChart';
import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import RoundedImageWithList from '@/app/components/shared/RoundedImageWithList';
import {
  TRUSTEE_FLOW_CHART,
  TRUSTEE_SECTION_DATA,
} from '@/app/data/help/economic';
import { FaBalanceScale } from 'react-icons/fa';

const TrusteeSection = () => {
  return (
    <>
      <RoundedImageWithList data={TRUSTEE_SECTION_DATA} />
      <div className="content-container">
        <SectionTitle
          icon={<FaBalanceScale />}
          extraClasses="justify-center xl:justify-start"
        >
          Hur ansöker du om förvaltare?
        </SectionTitle>
        <FlowChart
          description="Nedan följer ett steg-för-steg flödesschema som visar hur du kan ansöka om förvaltare."
          title="Din väg till förvaltare"
          flowChartSteps={TRUSTEE_FLOW_CHART}
        />
      </div>

      <div className="content-container">
        <SectionTitle icon={<FaBalanceScale />}>
          Skillnader mot god man:
        </SectionTitle>
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <ul className="list-disc list-inside space-y-1 text-red-800 text-sm">
            <li>Du förlorar rätten att ta ekonomiska beslut</li>
            <li>Förvaltaren kontrollerar alla dina pengar</li>
            <li>Du kan inte göra köp utan förvaltarens godkännande</li>
            <li>Svårare att avsluta än god man-arrangemang</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TrusteeSection;
