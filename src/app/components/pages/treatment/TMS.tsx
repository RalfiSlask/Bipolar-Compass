import Image from 'next/image';

const TMS = () => {
  return (
    <div className="bg-tertiary-light w-full flex lg:flex-row  flex-col items-center shadow-sm rounded-lg justify-end gap-10 px-4 md:px-10 py-10">
      <div className="flex-1 space-y-6 text-tertiary-dark">
        <div>
          <h5 className="font-semibold text-tertiary-dark mb-2">
            {' '}
            Vad är TMS?
          </h5>
          <p className="text-tertiary-dark">
            TMS är en icke-invasiv behandling där en magnetisk spole placeras
            mot skalpen för att stimulera specifika områden i hjärnan med hjälp
            av magnetiska pulser. Det är en mildare behandling än ECT och kräver
            ingen narkos.
          </p>
        </div>

        <div>
          <h5 className="font-semibold text-tertiary-dark mb-2">
            Hur fungerar det?
          </h5>
          <p className="text-tertiary-dark">
            TMS riktar sig mot specifika områden i hjärnan som är involverade i
            humörreglering. Genom att stimulera dessa områden med magnetiska
            pulser kan aktiviteten öka och bidra till att lindra symtomen.
          </p>
        </div>
        <div>
          <h5 className="font-semibold text-tertiary-dark mb-2">
            När används det?
          </h5>
          <ul className="flex flex-col gap-2 list-disc list-inside">
            <li>
              Vid måttlig till svår depression, särskilt om mediciner inte haft
              effekt.
            </li>
            <li>
              Vid bipolär depression, som ett alternativ till mediciner eller i
              kombination med dem.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col gap-4 items-center">
        <h4 className="font-bold text-xl md:text-2xl text-tertiary-dark mb-3">
          Transkraniell magnetstimulering (TMS)
        </h4>
        <div className="w-full rounded-lg overflow-hidden">
          <Image
            src="/images/treatments/tms.webp"
            alt="TMS"
            aria-label="TMS behandling"
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

export default TMS;
