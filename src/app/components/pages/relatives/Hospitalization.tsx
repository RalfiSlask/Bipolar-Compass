import Image from 'next/image';
import { FaExclamationCircle } from 'react-icons/fa';

const Hospitalization = () => {
  return (
    <div className="bg-primary-light w-full flex flex-col lg:flex-row items-center shadow-lg rounded-2xl gap-10 px-4 md:px-8 py-12 animate-modal-slide-up">
      <div className="flex-1 space-y-8 text-primary-dark">
        <h2 className="h-xs lg:text-2xl font-bold text-primary-dark">
          När tvångsvård kan bli nödvändig
        </h2>
        <p className="text-lg leading-relaxed">
          I vissa situationer, särskilt när din närstående befinner sig i ett
          maniskt eller psykotiskt tillstånd, kan det bli nödvändigt att ansöka
          om tvångsvård. Detta är ofta en sista utväg när personen inte kan
          förstå sin egen situation eller är en fara för sig själv eller andra.
        </p>
        <p className="text-lg leading-relaxed">
          Tvångsvård regleras av Lagen om psykiatrisk tvångsvård (LPT) och kan
          bli aktuellt om följande kriterier är uppfyllda:
        </p>

        <div className="bg-primary-light/40 border-l-4 border-primary-accent rounded-lg p-6">
          <ul className="flex flex-col gap-4 list-disc list-inside">
            <li className="flex items-start gap-3">
              <FaExclamationCircle className="text-primary-accent mt-1" />
              Personen lider av en allvarlig psykisk störning (som bipolär
              sjukdom i mani eller psykos).
            </li>
            <li className="flex items-start gap-3">
              <FaExclamationCircle className="text-primary-accent mt-1" />
              Personen behöver psykiatrisk vård som inte kan ges frivilligt.
            </li>
            <li className="flex items-start gap-3">
              <FaExclamationCircle className="text-primary-accent mt-1" />
              Personen utgör en fara för sig själv eller andra, eller riskerar
              att allvarligt försämras utan vård.
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 h-full flex flex-col gap-6 items-center">
        <div className="w-full">
          <Image
            src="/images/relatives/hospital.webp"
            alt="Stress"
            aria-label="Stress behandling"
            width={1200}
            height={800}
            quality={80}
            className="object-cover rounded-sm lg:rounded-full"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hospitalization;
