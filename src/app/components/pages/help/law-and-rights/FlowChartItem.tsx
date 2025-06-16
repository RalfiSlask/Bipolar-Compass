import { ILawFlowChartStep } from '@/app/types/help/law';
import { useState } from 'react';

interface IFlowChartItemProps {
  step: ILawFlowChartStep;
  isLast: boolean;
}

const FlowChartItem = ({ step, isLast }: IFlowChartItemProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="flex flex-col items-center relative w-full">
      <div
        className="bg-primary-light rounded-full p-4 mb-4 shadow-md cursor-help relative hover:bg-primary-accent/10 transition-colors"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        {step.icon}
        {isTooltipVisible && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
            <h4 className="font-semibold text-primary-dark mb-2">
              {step.tooltip.title}
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {step.tooltip.tips.map((tip, tipIndex) => (
                <li key={tipIndex}>{tip}</li>
              ))}
            </ul>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-white transform rotate-45" />
          </div>
        )}
      </div>
      <div className="text-center max-w-[200px] mb-8">
        <h4 className="font-semibold text-primary-dark mb-1">{step.title}</h4>
        <p className="text-sm text-gray-600">{step.description}</p>
      </div>
      {!isLast && (
        <div className="absolute top-[calc(100%-24px)] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-primary-accent" />
      )}
    </div>
  );
};

export default FlowChartItem;
