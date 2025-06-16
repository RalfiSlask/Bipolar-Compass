'use client';

import { LAW_RIGHTS_FLOW_CHART } from '@/app/data/help/lawRights';
import FlowChartItem from './FlowChartItem';

const RightsFlowChart = () => {
  return (
    <div className="rounded-lg">
      <p className="mb-6">
        Nedan följer ett steg-för-steg flödesschema som visar hur du kan gå
        tillväga när du upplever en rättighetskränkning.
      </p>
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-primary-dark mb-8 text-center">
          Din väg till rättvisa
        </h2>
        <div className="flex flex-col items-center gap-5">
          {LAW_RIGHTS_FLOW_CHART.map((step, index) => (
            <FlowChartItem
              key={index}
              step={step}
              isLast={index === LAW_RIGHTS_FLOW_CHART.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightsFlowChart;
