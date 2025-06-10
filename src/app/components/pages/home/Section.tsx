import Link from 'next/link';

interface ISectionProps {
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
}: ISectionProps) => (
  <div
    className={`px-4 sm:px-6 ${bgColor} min-h-[200px] md:h-1/3 flex flex-col justify-center py-6`}
  >
    <Link href={href} className="space-y-3 md:flex flex-col">
      <h3 className={`text-xl lg:text-2xl font-bold ${textColor}`}>{title}</h3>
      <p className={`${textColor} text-sm md:text-base`}>{description}</p>
      <button className={`${buttonVariant}-button`}>{buttonText}</button>
    </Link>
  </div>
);

export default Section;
