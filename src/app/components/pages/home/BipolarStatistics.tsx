'use client';

import Link from 'next/link';
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
  const genderData = [
    { name: 'Kvinnor', value: 63 },
    { name: 'Män', value: 37 },
  ];

  const typeData = [
    { name: 'Typ 1', value: 40 },
    { name: 'Typ 2', value: 40 },
    { name: 'Andra', value: 20 },
  ];

  const COLORS = ['#659598', '#19505b'];
  const BAR_COLOR = '#659598';

  return (
    <div className="bg-secondary-light w-full px-4 py-16 md:py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark text-center mb-16">
          Bipolaritet I Sverige
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center">
              <div className="h-[300px] w-full max-w-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={100}
                      fill="white"
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center md:text-left ml-4">
                <div className="mb-4">
                  <span className="text-4xl font-bold text-secondary-dark">
                    63%
                  </span>
                </div>
                <p className="text-primary-dark">
                  I Sverige utgör kvinnor majoriteten av registrerade patienter,
                  vilket indikerar en högre diagnosfrekvens hos kvinnor.
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={typeData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={BAR_COLOR} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center md:text-left ml-4">
                <div className="mb-4">
                  <span className="text-4xl font-bold text-secondary-dark">
                    40%
                  </span>
                </div>
                <p className="text-primary-dark">
                  Bipolär typ 1 och typ 2 är lika vanliga, med vardera 40% av
                  diagnoserna.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Link
            href="/bipolaritet/vad-ar-bipolaritet"
            className="primary-button"
          >
            Vad är bipolaritet?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BipolarStatistics;
