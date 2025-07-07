import Image from 'next/image';

const AccessToTherapySection = () => {
  return (
    <>
      <div className="flex flex-col content-container">
        <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
          Psykologisk behandling som komplement till läkemedel
        </h3>

        <div className="flex flex-col gap-6">
          <p>
            I Sverige rekommenderas ofta en kombination av läkemedel och
            psykologisk behandling för att effektivt hantera bipolär sjukdom.
            Psykologisk behandling kan både minska symtomen och förebygga nya
            sjukdomsperioder. Det är vanligt att påbörja terapi när
            stämningsläget har stabiliserats.
          </p>

          <div className="lightest-list-container">
            <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
              Tillgång till terapi i Sverige
            </h4>
            <p>
              I Sverige kan du få tillgång till psykologisk behandling genom den
              offentliga hälso- och sjukvården eller via privata mottagningar.
              Många vårdcentraler erbjuder samtalsstöd eller
              korttidsbehandlingar, och vid behov kan du remitteras till en
              psykiatrisk mottagning för mer specialiserad vård.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary-light shadow-primary-dark/20 shadow-md sm:gap-10 treatment-container responsive-margin-bottom">
        <div className="flex-1 h-full flex flex-col gap-4 items-center">
          <h3 className="font-bold text-xl md:text-2xl text-primary-dark mb-3">
            Resurser och hjälp att börja
          </h3>
          <div className="w-full rounded-lg overflow-hidden">
            <Image
              src="/images/treatments/therapy-session.webp"
              alt="terapi session"
              aria-label="terapi session mellan en psykoterapeut och en patient"
              width={1200}
              height={800}
              quality={80}
              className="object-cover rounded-sm lg:rounded-full"
              priority
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6 text-primary-dark">
          <div>
            <h5 className="font-semibold text-primary-dark mb-2 lg:text-lg">
              Hitta legitimerad psykolog eller psykoterapeut:
            </h5>
            <p className="text-primary-dark">
              För att hitta en legitimerad psykolog eller psykoterapeut i
              Sverige kan du använda dig av olika söktjänster som tillhandahålls
              av yrkesföreningar eller regioner. Det är viktigt att säkerställa
              att terapeuten har rätt kompetens och erfarenhet av att behandla
              bipolär sjukdom.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-primary-dark mb-2 lg:text-lg">
              Online-resurser:
            </h5>
            <p className="text-primary-dark">
              Webbplatser som erbjuder information om terapi och behandling. Om
              du söker på{' '}
              <a
                href="https://www.1177.se/"
                className="nav-link"
                target="_blank"
                aria-label="1177:s hemsida, allmän sida för vård"
              >
                1177:s hemsida
              </a>{' '}
              så kan du läsa mer om terapi och behandling. Om du är ung
              rekommenderas att du läser mer på{' '}
              <a
                href="https://www.umo.se/att-ta-hjalp/att-prata-med-nagon/att-ga-i-terapi"
                className="nav-link"
                target="_blank"
                aria-label="UMO:s hemsida, tips för unga att söka hjälp"
              >
                UMO:s hemsida.
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessToTherapySection;
