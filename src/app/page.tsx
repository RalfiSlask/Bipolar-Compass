import Image from 'next/image';

import laughingImage from '../../public/images/about.jpg';
import Chat from './components/chat/Chat';
import BipolarStatistics from './components/pages/home/BipolarStatistics';
import MoodTrackerDiaryShowcase from './components/pages/home/MoodTrackerDiaryShowcase';
import OtherOrganizations from './components/pages/home/OtherOrganizations';
import ThreeSections from './components/pages/home/ThreeSections';

export default function Home() {
  return (
    <section className="w-full h-full flex flex-col items-center">
      <div className="w-full h-[calc(100vh-130px)] flex items-center justify-center relative  mx-auto px-4">
        {/*     <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-6xl font-bold text-primary-dark">
            Bipolärkompassne
          </h1>
          <p className="text-xl text-primary-dark">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
            consectetur perferendis soluta ipsam quis. Voluptatum minus eveniet
            animi aliquid, laborum nam voluptate culpa deleniti.
          </p>
        </div>
        <div className="flex items-end justify-end h-full w-full max-w-[2000px]">
          <Image
            src="/images/test.png"
            alt="testing"
            width={4910}
            height={3264}
            className="object-cover max-h-[90vh] w-auto "
          />
        </div> */}
      </div>
      <BipolarStatistics />
      <div className="w-full flex bg-tertiary-light items-center justify-center pt-20 pb-28 px-10">
        <div className="w-full flex items-center justify-end max-w-[1440px] gap-10">
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
              width={792}
              height={527}
              className="object-cover aspect-[792/527] rounded-full"
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
