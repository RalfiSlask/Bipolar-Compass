import Image from 'next/image';
import Link from 'next/link';
import AppleImage from '../../../../../public/images/apple.jpg';

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
  <div className={`px-10 ${bgColor} h-1/3 flex flex-col justify-center`}>
    <Link href={href}>
      <h3 className={`text-2xl font-bold ${textColor}`}>{title}</h3>
      <p className={textColor}>{description}</p>
      <button className={`${buttonVariant}-button mt-4`}>{buttonText}</button>
    </Link>
  </div>
);

const ThreeSections = () => {
  const sections = [
    {
      title: 'Jag är ny diagnostiserad',
      description:
        'Du ska veta att du inte är ensam då 60 miljoner människor världen över level med bipolär sjukdom. Vi är här för att hjälpa dig.',
      bgColor: 'bg-primary-dark',
      textColor: 'text-white',
      buttonVariant: 'secondary',
      href: '/bipolaritet/vad-ar-bipolaritet',
    },
    {
      title: 'Jag forskar om bipolaritet',
      description:
        'Om du är forskare vill vi tacka för ditt engagemang och du kan hitta den senaste forskningen om bipolär sjukdom här.',
      bgColor: 'bg-secondary-light',
      textColor: 'text-primary-dark',
      buttonVariant: 'primary',
      href: '/forskning/artiklar',
    },
    {
      title: 'Jag är anhörig',
      description:
        'Om du är anhörig till en person med bipolär sjukdom kan du hjälpa oss att hjälpa andra',
      bgColor: 'bg-tertiary-light',
      textColor: 'text-tertiary-dark',
      buttonVariant: 'tertiary',
      href: '/anhoriga',
    },
  ] as const;

  return (
    <div className="w-full flex bg-primary-light items-center justify-center h-[600px]">
      <div className="w-full flex items-center justify-end max-w-[1440px] h-[calc(100%+4rem)] -my-6  rounded-3xl">
        <div className="w-1/4 flex items-center justify-end h-full overflow-hidden">
          <Image
            src={AppleImage}
            alt="Bipolar logo"
            width={3448}
            height={5172}
            className="object-cover h-full rounded-l-3xl"
            aria-label="En kvinna som håller upp ett äpple som är hälften rött, hälften grönt"
          />
        </div>
        <div className="w-3/4 flex flex-col h-full rounded-r-3xl overflow-hidden">
          {sections.map((section, index) => (
            <Section key={index} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeSections;
