import Image from 'next/image';

const ECT = () => {
  return (
    <div className="bg-primary-light w-full flex lg:flex-row  flex-col items-center shadow-sm rounded-lg justify-end gap-10 px-4 md:px-10 py-10">
      <div className="flex-1 h-full flex flex-col gap-4 items-center">
        <h4 className="font-bold text-xl md:text-2xl text-primary-dark mb-3">
          Elektrokonvulsiv behandling (ECT)
        </h4>
        <div className="w-full rounded-lg overflow-hidden">
          <Image
            src="/images/treatments/ect.jpeg"
            alt="ECT"
            aria-label="ECT behandling"
            width={1200}
            height={800}
            quality={100}
            className="object-cover rounded-sm lg:rounded-full"
            priority
          />
        </div>
      </div>
      <div className="flex-1 space-y-6 text-primary-dark">
        <div>
          <h5 className="font-semibold text-primary-dark mb-2">Vad är ECT?</h5>
          <p className="text-primary-dark">
            ECT är en behandling där en kontrollerad elektrisk stimulering av
            hjärnan framkallar ett kortvarigt epileptiskt anfall. Behandlingen
            utförs under narkos och används främst vid svåra depressioner, mani
            eller katatoni som inte svarat på mediciner.
          </p>
        </div>

        <div>
          <h5 className="font-semibold text-primary-dark mb-2">
            Hur fungerar det?
          </h5>
          <p>
            Den exakta mekanismen bakom ECT är inte helt förstådd, men det tros
            påverka hjärnans signalsubstanser och öka plasticiteten i hjärnan.
            Detta kan hjälpa till att återställa normal hjärnfunktion och
            förbättra symtomen.
          </p>
        </div>
        <div>
          <h5 className="font-semibold text-primary-dark mb-2">
            När används det?
          </h5>
          <ul className="flex flex-col gap-2 list-disc list-inside">
            <li>Vid svåra depressioner som inte svarat på mediciner.</li>
            <li>Vid livshotande tillstånd, som djupa självmordstankar.</li>
            <li>Vid allvarlig mani eller psykos.</li>
            <li>
              När andra behandlingar inte kan användas, exempelvis under
              graviditet.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ECT;
