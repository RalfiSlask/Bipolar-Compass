'use client';

import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const YAxisLabels = [
  { id: 12, value: '15-19', label: '15-19', procent: 0.94 },
  { id: 11, value: '20-24', label: '20-24', procent: 1.21 },
  { id: 10, value: '25-29', label: '25-29', procent: 1.22 },
  { id: 9, value: '30-34', label: '30-34', procent: 1.16 },
  { id: 8, value: '35-39', label: '35-39', procent: 1.13 },
  { id: 7, value: '40-44', label: '40-44', procent: 1.14 },
  { id: 6, value: '45-49', label: '45-49', procent: 1.17 },
  { id: 5, value: '50-54', label: '50-54', procent: 1.21 },
  { id: 4, value: '55-59', label: '55-59', procent: 1.26 },
  { id: 3, value: '60-64', label: '60-64', procent: 1.28 },
  { id: 2, value: '65-69', label: '65-69', procent: 1.22 },
  { id: 1, value: '70+', label: '70+', procent: 0.86 },
  { id: 0, value: 'Alla åldrar', label: 'Alla åldrar', procent: 0.93 },
];

const BipolarPrevalence = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-full bg-primary-light/50">Laddar...</div>;
  }

  return (
    <div className="w-full border border-gray-200 p-4 rounded-lg">
      <div className="w-full mx-auto mb-10 flex flex-col items-center">
        <h4 className="font-semibold text-primary-dark">
          Prevalens Sverige 2021
        </h4>
        <div className="w-full" style={{ maxWidth: '800px' }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={YAxisLabels}
              margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                padding={{ left: 20, right: 20 }}
                tick={{ fontSize: 12 }}
              />
              {!isSmallScreen ? (
                <YAxis
                  label={{
                    value: 'Prevalens (%)',
                    angle: -90,
                    position: 'insideLeft',
                    offset: -20,
                  }}
                  domain={[0, 1.5]}
                  tick={{ fontSize: 12 }}
                />
              ) : null}
              <Tooltip />
              <Bar
                dataKey="procent"
                fill="#045346"
                barSize={30}
                label={{
                  position: 'top',
                  formatter: (value: number) => `${value}%`,
                  fontSize: 12,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm ">
          <span className="font-semibold text-gray-800 mr-2">Data källa:</span>
          <span className="text-gray-600">
            IHME, Global burden of Disease (2024)
          </span>
        </p>
        <p className="text-sm text-gray-600">
          Länk till data:{' '}
          <a
            href="https://ourworldindata.org/grapher/bipolar-disorder-prevalence-by-age?country=~SWE"
            target="_blank"
            className="text-primary-dark underline"
          >
            Klicka här
          </a>
        </p>
      </div>
    </div>
  );
};

export default BipolarPrevalence;
