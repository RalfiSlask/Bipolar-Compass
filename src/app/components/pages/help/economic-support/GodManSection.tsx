import FlowChart from '@/app/components/shared/FlowChart';
import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import RoundedImageWithList from '@/app/components/shared/RoundedImageWithList';
import {
  GOD_MAN_FLOW_CHART,
  GOD_MAN_SECTION_DATA,
} from '@/app/data/help/economic';
import { FaUser } from 'react-icons/fa';

const GodManSection = () => {
  return (
    <>
      <RoundedImageWithList data={GOD_MAN_SECTION_DATA} />
      <div className="content-container">
        <SectionTitle
          icon={<FaUser />}
          extraClasses="justify-center xl:justify-start"
        >
          Hur ansöker du om god man?
        </SectionTitle>
        <FlowChart
          description="Nedan följer ett steg-för-steg flödesschema som visar hur du kan ansöka om god man."
          title="Din väg till god man"
          flowChartSteps={GOD_MAN_FLOW_CHART}
        />
      </div>
    </>
  );
};

export default GodManSection;
