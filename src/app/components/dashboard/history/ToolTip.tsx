import { IHistoryChartDataPoint } from '@/app/types/history';

interface IToolTipProps {
  chartData: IHistoryChartDataPoint[];
  tip: string;
}

const ToolTip = ({ chartData, tip }: IToolTipProps) => {
  return (
    <div
      className={`mt-4 p-3 sm:p-4 rounded-lg border text-sm sm:text-base
    transition-all duration-300 hover:scale-[1.01]
    ${
      chartData.length < 3
        ? 'bg-primary-light/50 border-primary-border/50'
        : 'bg-primary-light border-primary-border'
    }`}
    >
      <p className="text-primary-dark">
        <span className="font-semibold">
          {chartData.length < 3 ? '📝 ' : '💡 '}
        </span>
        {tip}
      </p>
    </div>
  );
};

export default ToolTip;
