'use client';

import { BIPOLAR_TYPES, GENDER_DATA } from '@/app/data/bipolarStatistics';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const BipolarStatistics = () => {
  const COLORS = ['#659598', '#19505b'];
  const BAR_COLOR = '#659598';

  return (
    <div className="bg-secondary-light w-full px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-dark text-center mb-2 sm:mb-6 md:mb-16">
          Bipolaritet I Sverige
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          <div className="bg-primary-dark rounded-lg p-6 text-center shadow-md">
            <span className="block text-3xl font-bold text-white mb-2">1%</span>
            <p className="text-white">
              av befolkingen lever med bipolär sjukdom
            </p>
          </div>

          <div className="bg-primary-dark rounded-lg p-6 text-center shadow-md">
            <span className="block text-3xl font-bold text-white mb-2">
              70%
            </span>
            <p className="text-white">
              av personer med bipolär typ 1 behandlas med litium
            </p>
          </div>

          <div className="bg-primary-dark rounded-lg p-6 text-center shadow-md">
            <h4 className="text-3xl font-bold text-white mb-2">25</h4>
            <p className="text-white">Medel ålder för diagnos</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-6">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col sm:flex-row items-center rounded-lg p-4 shadow-sm">
              <div className="h-[300px] flex-1 sm:flex-1 sm:h-[300px] w-full max-w-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={GENDER_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={100}
                      fill="white"
                      dataKey="value"
                    >
                      {GENDER_DATA.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center sm:flex-1 sm:text-left sm:ml-4">
                <div className="mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-secondary-dark">
                    63%
                  </span>
                </div>
                <p className="text-primary-dark text-sm md:text-base">
                  I Sverige utgör kvinnor majoriteten av registrerade patienter,
                  vilket indikerar en högre diagnosfrekvens hos kvinnor.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center rounded-lg p-4 shadow-sm">
              <div className="h-[250px] sm:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BIPOLAR_TYPES}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Andel']} />
                    <Bar dataKey="value" fill={BAR_COLOR}>
                      {BIPOLAR_TYPES.map((_, index) => (
                        <Cell key={`bar-${index}`} fill={BAR_COLOR} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center sm:text-left sm:ml-4 mt-4 sm:mt-0">
                <div className="mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-secondary-dark">
                    40%
                  </span>
                </div>
                <p className="text-primary-dark text-sm md:text-base">
                  Bipolär typ 1 och typ 2 är lika vanliga, med vardera 40% av
                  diagnoserna.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <Link
            href="/bipolaritet/vad-ar-bipolaritet"
            className="nav-link uppercase text-primary-dark inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            Om bipolär sjukdom
            <HiArrowRight className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BipolarStatistics;
