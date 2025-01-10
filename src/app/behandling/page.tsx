import Link from 'next/link';
import { treatmentLinks } from '../data/treatmentLinks';

const TreatmentPage = () => {
  return (
    <section className="max-w-6xl mx-auto p-6">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-primary-dark mb-4">
          Behandling
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Här kan du läsa om olika typer av behandling som kan hjälpa vid
          bipolär sjukdom.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {treatmentLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start space-x-4">
              <span className="text-4xl">{item.icon}</span>
              <div>
                <h3 className="text-xl font-semibold text-primary-dark group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TreatmentPage;
