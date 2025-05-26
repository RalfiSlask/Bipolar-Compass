import Link from 'next/link';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row bg-tertiary-light items-center justify-center py-12 sm:pt-12 sm:pb-20 lg:pt-20 lg:pb-32 px-4 sm:px-10">
      <div className="w-full flex flex-col lg:flex-row items-center justify-end max-w-[1440px] gap-10">
        <div className="w-full flex text-tertiary-dark flex-1 flex-col gap-4 items-center lg:items-start justify-center text-center lg:text-left">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Om oss</h3>
          <p className="text-base sm:text-lg font-medium text-tertiary-dark">
            BipolärKompassen är gjord av människor som har kommit i kontakt med
            bipolär sjukdom och sett behovet av en digital resurs för att hjälp
            personer i utsatthet. Detta arbete är ideellt och görs av
            frivilliga.
          </p>
          <p className="text-base sm:text-lg font-medium text-tertiary-dark">
            Genom att kombinera modern teknologi med evidensbaserad kunskap
            strävar vi efter att göra det enklare att hantera vardagen med
            bipolär sjukdom.
          </p>
          <Link href="/om-oss/vision" className="tertiary-button">
            Vår Vision
          </Link>
        </div>
        <div className="w-full lg:flex-1 rounded-lg overflow-hidden mt-8 lg:mt-0">
          <Image
            src="/images/home/about.webp"
            alt="Bipolar logo"
            width={792}
            height={527}
            className="object-cover w-full aspect-[792/527] rounded-2xl lg:rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
