import Image from 'next/image';

import laughingImage from '../../public/images/about.jpg';
import homeImage from '../../public/images/hej.png';
import Chat from './components/chat/Chat';
import BipolarStatistics from './components/pages/home/BipolarStatistics';
import MoodTrackerDiaryShowcase from './components/pages/home/MoodTrackerDiaryShowcase';
import OtherOrganizations from './components/pages/home/OtherOrganizations';
import ThreeSections from './components/pages/home/ThreeSections';

export default function Home() {
  return (
    <section className="w-full h-full flex flex-col items-center">
      <div className="w-full home-container flex items-center justify-center relative">
        <Image
          src={homeImage}
          alt="Bipolar logo"
          width={1440}
          height={2000}
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center text-white px-4 md:px-8 max-w-[1440px] mx-auto">
          <div className="flex flex-col flex-1 gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Bipolär Kompassen
            </h2>
            <p className="text-2xl font-medium">
              Bipolär Kompassen är en digital hjälpbok för dig som lider av
              bipolär sjukdom.
            </p>
          </div>
        </div>
      </div>
      <BipolarStatistics />
      <div className="w-full flex bg-tertiary-light items-center justify-center pt-20 pb-28 px-10">
        <div className="w-full flex items-center justify-end max-w-[1440px]">
          <div className="w-full flex text-tertiary-dark flex-1 flex-col gap-4 items-start justify-center">
            <h3 className="text-6xl font-bold">Om oss</h3>
            <p className="text-lg font-medium text-tertiary-dark">
              Bipolär Kompassen är gjord av människor som har kommit i kontakt
              med bipolär sjukdom och sett behovet av en digital resurs för att
              hjälp personer i utsatthet. Detta arbete är ideellt och görs av
              frivilliga.
            </p>
            <p className="text-lg font-medium text-tertiary-dark">
              Genom att kombinera modern teknologi med evidensbaserad kunskap
              strävar vi efter att göra det enklare att hantera vardagen med
              bipolär sjukdom.
            </p>
            <button className="tertiary-button">Vår Vision</button>
          </div>
          <div className="flex-1 rounded-lg overflow-hidden">
            <Image
              src={laughingImage}
              alt="Bipolar logo"
              width={800}
              height={600}
              className="object-cover aspect-[6/4] rounded-full"
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
