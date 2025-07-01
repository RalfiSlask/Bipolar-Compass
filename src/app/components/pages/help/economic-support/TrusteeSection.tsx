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
    </>
  );
};

export default TrusteeSection;
