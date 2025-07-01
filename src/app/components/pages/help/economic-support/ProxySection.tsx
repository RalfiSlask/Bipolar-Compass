import FlowChart from '@/app/components/shared/FlowChart';
import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import { RoundedImageWithList } from '@/app/components/shared/RoundedImageWithList';
import {
  BANKS,
  PROXY_FLOW_CHART,
  PROXY_SECTION_DATA,
} from '@/app/data/help/economic';
import { FaBuilding, FaUser } from 'react-icons/fa';
import Banks from './Banks';

const PrxoySection = () => {
  return (
    <>
      <RoundedImageWithList data={PROXY_SECTION_DATA} />
      <div className="content-container">
        <SectionTitle
          icon={<FaUser />}
          extraClasses="justify-center xl:justify-start"
        >
          Hur ansöker du om fullmakt?
        </SectionTitle>
        <FlowChart
          description="Nedan följer ett steg-för-steg flödesschema som visar hur du kan ansöka om fullmakt."
          title="Din väg till fullmakt"
          flowChartSteps={PROXY_FLOW_CHART}
        />
      </div>
      <div className="content-container">
        <SectionTitle icon={<FaBuilding />} type="primary">
          Banker
        </SectionTitle>
        <p className="text-primary-dark mb-4">
          För att ansöka om fullmakt måste du göra det via en bank. Nedan hittar
          du en lista över banker som kan hjälpa dig.
        </p>
        <Banks banks={BANKS} type="primary" />
      </div>
    </>
  );
};

export default PrxoySection;
