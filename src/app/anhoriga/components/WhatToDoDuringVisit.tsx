import Image from "next/image";

const WhatToDoDuringVisit = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 px-4 md:px-8 md:gap-8 content-container">
        <div className="flex flex-1">
          <Image
            src="/images/relatives/doctor.webp"
            alt="relative"
            width={1000}
            height={1000}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="h-xs text-primary-dark ">
            Vad händer när läkaren kommer till platsen?
          </h3>
          <div className="bg-primary-light/50 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Initial bedömning:</h4>
                <p>
                  Läkaren pratar med personen och gör en medicinsk och
                  psykiatrisk bedömning.
                </p>
              </li>
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Beslut om vårdintyg:</h4>
                <p>
                  Om läkaren bedömer att kriterierna för tvångsvård är uppfyllda
                  enligt Lagen om psykiatrisk tvångsvård (LPT), kan de utfärda
                  ett vårdintyg direkt på plats.
                </p>
              </li>
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">
                  {" "}
                  Transport till vårdinrättning:
                </h4>
                <p>
                  Om tvångsvård krävs, ansvarar vården för att personen
                  transporteras till en psykiatrisk enhet. I vissa fall
                  samarbetar vården med polisen eller ambulanssjukvården.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row px-4 md:px-8 gap-4 md:gap-8 content-container">
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="h-xs text-primary-dark">
            Vad kan du som anhörig göra under tiden?
          </h3>
          <div className="bg-primary-light/50 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Håll dig lugn:</h4>
                <p>
                  Försök att undvika att eskalera situationen. Förklara för din
                  närstående att det mobila teamet är där för att hjälpa.
                </p>
              </li>
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Förbered information:</h4>
                <p>
                  Ha detaljer om din närståendes medicinska historia, aktuella
                  symtom och eventuella tidigare vårdkontakter redo för att
                  underlätta bedömningen.
                </p>
              </li>
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Ta hand om dig själv:</h4>
                <p>
                  Att hantera sådana situationer kan vara känslomässigt
                  påfrestande. Sök stöd från andra anhöriga eller vänner om
                  möjligt.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-1">
          <Image
            src="/images/relatives/relative-hands.webp"
            alt="relative"
            width={1000}
            height={1000}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default WhatToDoDuringVisit;
