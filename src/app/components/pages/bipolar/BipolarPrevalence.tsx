'use client';

import { Y_AXIS_LABELS } from '@/app/data/bipolar/bipolarStatistics';
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
import Spinner from '../../shared/Spinner';

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
    return <Spinner />;
  }

  return (
    <div className="w-full mt-4 sm:mt-10 sm:pt-10 bg-white/80 backdrop-blur-sm rounded-xl p-0 py-8 sm:px-4 shadow-lg border-2 border-primary-light responsive-margin-bottom">
      <div className="w-full mx-auto mb-10 flex flex-col items-center">
        <h4 className="font-bold text-2xl text-primary-dark">
          Prevalens Sverige 2021
        </h4>
        <div className="w-full" style={{ maxWidth: '800px' }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={Y_AXIS_LABELS}
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
      <div className="flex flex-col gap-1 px-4">
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
            className="nav-link text-primary-dark"
          >
            Klicka här
          </a>
        </p>
      </div>
    </div>
  );
};

export default BipolarPrevalence;
