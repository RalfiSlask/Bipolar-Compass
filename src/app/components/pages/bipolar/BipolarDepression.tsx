import Image from 'next/image';

const BipolarDepression = () => {
  return (
    <div className="bg-primary-light w-full flex lg:flex-row  shadow-primary-dark/20 flex-col items-center shadow-md rounded-lg justify-end gap-6 md:gap-10 px-4 py-4 md:px-8 md:py-8 responsive-margin-bottom">
      <div className="flex-1 h-full flex flex-col gap-4 items-center">
        <h3 className="font-bold text-xl md:text-2xl text-primary-dark mb-3">
          Depression vid bipolär sjukdom
        </h3>
        <div className="w-full rounded-lg overflow-hidden">
          <Image
            src="/images/bipolar/depression.webp"
            alt="terapi session"
            aria-label="en tjej som tittar framåt med ett leende, en spegel bakom där hon håller sig om huvudet med ångst och ledsamhet"
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
            Hur bipolär depression skiljer sig från vanlig depression
          </h5>
          <p className="lg:text-base xl:text-lg text-primary-dark">
            Depression vid bipolär sjukdom kan vara djup och långvarig, ofta
            svår att skilja från egentlig depression. Skillnaden är att den
            bipolära depressionen förekommer i skov och är en del av sjukdomens
            cykliska natur, vilket innebär att perioder av nedstämdhet kan
            följas av hypomani eller mani.
          </p>
        </div>
        <div>
          <h5 className="font-semibold text-primary-dark mb-2 lg:text-lg">
            Verktyg för att hantera bipolär depression
          </h5>
          <p className="lg:text-base xl:text-lg text-primary-dark">
            För att hantera bipolär depression är det viktigt att skapa rutiner
            och använda strategier som kan mildra symtomen. Regelbunden sömn, en
            stabil dygnsrytm och att undvika stress kan göra stor skillnad. Att
            vara medveten om tidiga varningssignaler och ha en plan för att
            hantera nedstämdhet kan också hjälpa till att minska intensiteten
            och varaktigheten av en depressiv episod.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BipolarDepression;
