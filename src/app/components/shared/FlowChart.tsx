'use client';

import { ColorType } from '@/app/types/colorTypes';
import { IFlowChartStep } from '@/app/types/flowchart';
import React from 'react';
import FlowChartItem from '../pages/help/law-and-rights/FlowChartItem';

interface IFlowChartProps {
  title: string;
  type?: ColorType;
  flowChartSteps: IFlowChartStep[];
  description?: string;
}

const FlowChart = ({
  title,
  flowChartSteps,
  description,
  type = 'primary',
}: IFlowChartProps) => {
  return (
    <div className="rounded-xl">
      {description && (
        <p className={`text-center xl:text-left mb-6 text-${type}-dark`}>
          {description}
        </p>
      )}
      <div className="w-full max-w-6xl mx-auto sm:mx-0">
        <h2
          className={`text-xl font-bold text-${type}-dark mb-6 xl:pb-6 xl:mb-6 text-center xl:border-b xl:border-${type}-accent xl:text-left`}
        >
          {title}
        </h2>
        <div className="flex flex-col xl:grid xl:grid-cols-[2fr_0.5fr_2fr_0.5fr_2fr_0.5fr_2fr_0.5fr_2fr] items-center pb-2 xl:pb-0">
          {flowChartSteps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="w-full">
                <FlowChartItem step={step} type={type} />
              </div>
              {/* This is the line between the flowchart items */}
              {index < flowChartSteps.length - 1 && (
                <div className="w-full flex justify-center items-center">
                  <div
                    className={`w-0.5 h-8 bg-${type}-accent flex-shrink-0 my-2 xl:w-8 xl:h-0.5 xl:mx-4 xl:my-0`}
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

export default FlowChart;
