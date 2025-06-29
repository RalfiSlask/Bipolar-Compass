import { ReactNode } from 'react';

export interface IFlowChartStep {
  icon: ReactNode;
  title: string;
  description: string;
  tooltip: {
    title: string;
    tips: string[];
  };
}
