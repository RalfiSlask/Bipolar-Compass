import Image from 'next/image';

const Stress = () => {
  return (
    <div className="bg-primary-light w-full flex lg:flex-row  flex-col items-center shadow-sm rounded-lg justify-end gap-10 px-4 md:px-10 py-10">
      <div className="flex-1 h-full flex flex-col gap-4 items-center">
        <h4 className="font-bold text-xl md:text-2xl text-primary-dark mb-3">
          Hantera stress
        </h4>
        <div className="w-full rounded-lg overflow-hidden">
          <Image
            src="/images/treatments/stress-relief.jpg"
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
      <div className="flex-1 space-y-6 text-primary-dark">
        <div>
          <h5 className="font-semibold lg:text-lg text-primary-dark mb-2">
            Identifiera stressfaktorer
          </h5>
          <p className="text-base text-primary-dark">
            Kartlägg dina stressfaktorer genom att föra dagbok över situationer
            som ökar din stressnivå. Var uppmärksam på tecken som irritabilitet
            och sömnsvårigheter, och utveckla strategier för att hantera dem.
          </p>
        </div>

        <div>
          <h5 className="font-semibold lg:text-lg text-primary-dark mb-2">
            Mindfulness och meditation
          </h5>
          <p className="text-base text-primary-dark">
            Mindfulness och meditation hjälper dig observera tankar och känslor
            utan att bli överväldigad. Börja med korta sessioner på 5-10 minuter
            och fokusera på andningen för att förbättra din förmåga att hantera
            stress.
          </p>
        </div>
        <div>
          <h5 className="font-semibold lg:text-lg text-primary-dark mb-2">
            Avslappningstekniker
          </h5>
          <p className="text-base text-primary-dark">
            Använd djupandning: andas in genom näsan (4 sek), håll andan (4
            sek), andas ut genom munnen (6 sek). Prova även progressiv
            muskelavslappning och guidad visualisering för ökad effekt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stress;
