import Image from 'next/image';

import Link from 'next/link';
import laughingImage from '../../public/images/about.jpg';
import Chat from './components/chat/Chat';
import BipolarStatistics from './components/pages/home/BipolarStatistics';
import MoodTrackerDiaryShowcase from './components/pages/home/MoodTrackerDiaryShowcase';
import OtherOrganizations from './components/pages/home/OtherOrganizations';
import ThreeSections from './components/pages/home/ThreeSections';

export default function Home() {
  return (
    <section className="w-full h-full flex flex-col items-center">
      <div className="w-full min-h-[calc(100vh-130px)] flex relative mx-auto px-4 md:px-10 max-w-[1440px] z-20">
        <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-8 md:gap-10 py-10 lg:py-0">
          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-col gap-6 md:gap-10 animate-fadeIn">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-primary-dark font-bold leading-tight">
                Din digitala följeslagare för att hantera bipolär sjukdom
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-dark max-w-2xl">
                BipolärKompassen erbjuder verktyg och stöd för att hjälpa dig
                hantera din vardag. Med din egna sida, kunskapsbank och senaste
                forskning står du aldrig ensam i din resa.
              </p>
              <Link
                href="/konto/logga-in"
                className="main-button w-fit mx-auto lg:mx-0 hover:scale-105 transition-transform"
              >
                <span className="button-border"></span>
                <span className="button-text">STARTA DIN RESA</span>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <Image
              src="/images/laughing.jpeg"
              alt="testing"
              width={4910}
              height={3264}
              className="object-cover w-full h-auto rounded-2xl lg:rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden relative z-10 -mt-[300px]">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-[300px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            fill="#F5F3FF"
            fillOpacity="1"
          />
        </svg>
      </div>

      <BipolarStatistics />

      <div className="w-full flex flex-col lg:flex-row bg-tertiary-light items-center justify-center pt-20 pb-32 px-4 sm:px-10">
        <div className="w-full flex flex-col lg:flex-row items-center justify-end max-w-[1440px] gap-10">
          <div className="w-full flex text-tertiary-dark flex-1 flex-col gap-4 items-center lg:items-start justify-center text-center lg:text-left">
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Om oss
            </h3>
            <p className="text-base sm:text-lg font-medium text-tertiary-dark">
              Bipolär Kompassen är gjord av människor som har kommit i kontakt
              med bipolär sjukdom och sett behovet av en digital resurs för att
              hjälp personer i utsatthet. Detta arbete är ideellt och görs av
              frivilliga.
            </p>
            <p className="text-base sm:text-lg font-medium text-tertiary-dark">
              Genom att kombinera modern teknologi med evidensbaserad kunskap
              strävar vi efter att göra det enklare att hantera vardagen med
              bipolär sjukdom.
            </p>
            <button className="tertiary-button">Vår Vision</button>
          </div>
          <div className="w-full lg:flex-1 rounded-lg overflow-hidden mt-8 lg:mt-0">
            <Image
              src={laughingImage}
              alt="Bipolar logo"
              width={792}
              height={527}
              className="object-cover w-full aspect-[792/527] rounded-2xl lg:rounded-full"
            />
          </div>
        </div>
      </div>
      <ThreeSections />
      <MoodTrackerDiaryShowcase />
      <OtherOrganizations />
      <Chat />
    </section>
  );
}
