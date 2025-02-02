import Chat from './components/chat/Chat';
import BipolarStatistics from './components/pages/home/BipolarStatistics';
import MoodTrackerDiaryShowcase from './components/pages/home/MoodTrackerDiaryShowcase';
import OtherOrganizations from './components/pages/home/OtherOrganizations';
import ThreeSections from './components/pages/home/ThreeSections';
import AboutUs from './components/pages/home/AboutUs';
import HeroSection from './components/pages/home/HeroSection';

export default function Home() {
  return (
    <section className="w-full h-full flex flex-col items-center bg-primary-light">
      <HeroSection />
      <BipolarStatistics />
      <AboutUs />
      <ThreeSections />
      <MoodTrackerDiaryShowcase />
      <OtherOrganizations />
      <Chat />
    </section>
  );
}
