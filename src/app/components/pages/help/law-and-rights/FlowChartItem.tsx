import { ColorType } from '@/app/types/colorTypes';
import { IFlowChartStep } from '@/app/types/flowchart';
import { useState } from 'react';

interface IFlowChartItemProps {
  step: IFlowChartStep;
  type?: ColorType;
}

const FlowChartItem = ({ step, type }: IFlowChartItemProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="flex flex-col items-center relative xl:h-40 w-full">
      <div
        className={`bg-${type}-light rounded-full p-4 mb-4 shadow-md cursor-help relative hover:bg-${type}-accent/10 transition-colors`}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <span className={`text-${type}-dark`}>{step.icon}</span>
        {isTooltipVisible && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-white rounded-xl shadow-xl p-4 z-10">
            <h4 className={`font-semibold text-${type}-dark mb-2`}>
              {step.tooltip.title}
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 flex flex-col gap-1">
              {step.tooltip.tips.map((tip, tipIndex) => (
                <li key={tipIndex}>{tip}</li>
              ))}
            </ul>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-white transform rotate-45" />
          </div>
        )}
      </div>
      <div className="text-center max-w-[200px]">
        <h4 className={`font-semibold text-${type}-dark mb-1`}>{step.title}</h4>
        <p className="text-sm text-gray-600">{step.description}</p>
      </div>
    </div>
  );
};

export default FlowChartItem;
