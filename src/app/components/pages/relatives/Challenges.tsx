import Image from 'next/image';
import Link from 'next/link';

const Challenges = () => {
  return (
    <div className="bg-tertiary-light w-full flex flex-col lg:flex-row-reverse items-center shadow-lg rounded-2xl gap-6 px-4 md:px-10 py-4 md:py-10 animate-modal-slide-up">
      <div className="flex-1 space-y-6 text-tertiary-dark">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-tertiary-dark">
          Vanliga utmaningar för anhöriga
        </h3>

        <div>
          <h5 className="font-semibold lg:text-lg mb-2">
            Känslomässig belastning
          </h5>
          <p className="text-base">
            Du kan känna frustration eller maktlöshet när din närstående inte
            mår bra. Det är viktigt att erkänna dessa känslor som normala och
            söka stöd vid behov.
          </p>
        </div>

        <div>
          <h5 className="font-semibold lg:text-lg mb-2">Oro för framtiden</h5>
          <p className="text-base">
            Det är naturligt att känna oro för hur sjukdomen kommer påverka er
            relation, din närståendes arbete eller ekonomi. Genom att skapa en
            stabil stödstruktur kan ni minska dessa risker.
          </p>
        </div>

        <div>
          <h5 className="font-semibold lg:text-lg mb-2">Social isolering</h5>
          <p className="text-base">
            Många anhöriga upplever att de själva blir isolerade när deras
            närstående är sjuk. Det är viktigt att du hittar egna sociala
            sammanhang där du kan få energi.
          </p>
        </div>

        <p className="text-base">
          Det är viktigt att ta hand om sig själv också! Här kan du hitta mer
          information om{' '}
          <Link
            href="/behandling/sjalvhjalp"
            className="nav-link text-tertiary-dark font-semibold"
          >
            själv hjälp
          </Link>
          .
        </p>
      </div>

      <div className="flex-1 h-full flex flex-col gap-6 items-center">
        <div className="w-full">
          <Image
            src="/images/relatives/struggle.webp"
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

export default Challenges;
