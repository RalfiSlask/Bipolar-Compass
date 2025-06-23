'use client';

import { LAW_RIGHTS_FLOW_CHART } from '@/app/data/help/lawRights';
import React from 'react';
import FlowChartItem from './FlowChartItem';

const RightsFlowChart = () => {
  return (
    <div className="rounded-xl">
      <p className="text-center xl:text-left mb-6">
        Nedan följer ett steg-för-steg flödesschema som visar hur du kan gå
        tillväga när du upplever en rättighetskränkning.
      </p>
      <div className="w-full max-w-6xl mx-auto sm:mx-0">
        <h2 className="text-2xl font-bold text-primary-dark mb-6 xl:pb-6 xl:mb-6 text-center xl:border-b xl:border-primary-accent xl:text-left">
          Din väg till rättvisa
        </h2>
        <div className="flex flex-col xl:grid xl:grid-cols-[2fr_0.5fr_2fr_0.5fr_2fr_0.5fr_2fr_0.5fr_2fr] items-center pb-2 xl:pb-0">
          {LAW_RIGHTS_FLOW_CHART.map((step, index) => (
            <React.Fragment key={index}>
              <div className="w-full">
                <FlowChartItem step={step} />
              </div>
              {/* This is the line between the flowchart items */}
              {index < LAW_RIGHTS_FLOW_CHART.length - 1 && (
                <div className="w-full flex justify-center items-center">
                  <div
                    className="w-0.5 h-8 bg-primary-accent flex-shrink-0 my-2 xl:w-8 xl:h-0.5 xl:mx-4 xl:my-0"
                    aria-hidden="true"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightsFlowChart;
