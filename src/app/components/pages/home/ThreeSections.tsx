import { threeSections } from '@/app/data/home';
import Image from 'next/image';
import Link from 'next/link';

interface SectionProps {
  title: string;
  description: string;
  buttonText?: string;
  bgColor: string;
  textColor: string;
  buttonVariant: 'primary' | 'secondary' | 'tertiary';
  href: string;
}

const Section = ({
  title,
  description,
  buttonText = 'Läs mer',
  bgColor,
  textColor,
  buttonVariant,
  href,
}: SectionProps) => (
  <div
    className={`px-6 md:px-10 ${bgColor} min-h-[200px] md:h-1/3 flex flex-col justify-center py-8 md:py-0`}
  >
    <Link href={href} className="space-y-3 md:space-y-4">
      <h3 className={`text-xl md:text-2xl font-bold ${textColor}`}>{title}</h3>
      <p className={`${textColor} text-sm md:text-base`}>{description}</p>
      <button className={`${buttonVariant}-button`}>{buttonText}</button>
    </Link>
  </div>
);

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
        <div className="w-full md:w-3/4 flex flex-col h-full rounded-b-3xl md:rounded-r-3xl overflow-hidden">
          {threeSections.map((section, index) => (
            <Section key={index} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeSections;
