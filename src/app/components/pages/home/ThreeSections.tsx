import { threeSections } from '@/app/data/home';
import Image from 'next/image';
import Section from './Section';

const ThreeSections = () => {
  return (
    <div className="w-full flex bg-primary-light items-center justify-center md:px-4 py-6 md:py-16 z-10">
      <div className="w-full flex flex-col md:flex-row items-center justify-end max-w-[1440px] md:min-h-[600px] rounded-3xl md:-my-32">
        <div className="relative w-full md:w-1/4 h-[300px] md:h-[600px] flex items-center justify-end overflow-hidden">
          <Image
            src="/images/home/apple.webp"
            alt="Bipolar logo"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            priority
            className="object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
            aria-label="En kvinna som håller upp ett äpple som är hälften rött, hälften grönt"
          />
        </div>
        <div className="w-full md:w-3/4 flex flex-col h-full md:rounded-r-3xl overflow-hidden max-h-[600px]">
          {threeSections.map((section, index) => (
            <Section key={index} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeSections;
