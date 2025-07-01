import { IFlowChartStep } from '@/app/types/flowchart';
interface IFlowChartToolTipProps {
  step: IFlowChartStep;
}

const FlowChartToolTip = ({ step }: IFlowChartToolTipProps) => {
  const { title, tips } = step.tooltip;
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-white rounded-xl shadow-xl p-4 z-10">
      <h4 className="font-semibold text-primary-dark mb-2">{title}</h4>
      <ul className="list-disc list-inside text-sm text-gray-600 flex flex-col gap-1">
        {tips.map((tip, tipIndex) => (
          <li key={tipIndex}>{tip}</li>
        ))}
      </ul>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-white transform rotate-45" />
    </div>
  );
};

export default FlowChartToolTip;
