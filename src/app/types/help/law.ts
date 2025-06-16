import { ReactNode } from 'react';

export interface ILawFlowChartStep {
  icon: ReactNode;
  title: string;
  description: string;
  tooltip: {
    title: string;
    tips: string[];
  };
}
