import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

interface ILinkWithArrowProps {
  link: string;
  text: string | React.ReactNode;
  color?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'lg' | 'xl';
}

const LinkWithArrow = ({ link, text, color, size }: ILinkWithArrowProps) => {
  const colorClasses = {
    primary: 'text-primary-dark hover:text-primary-accent',
    secondary: 'text-secondary-dark',
    tertiary: 'text-tertiary-dark hover:text-tertiary-accent',
  };

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-${
        size ?? 'base'
      } font-semibold inline-flex gap-1 text- items-center text-center sm:text-left group ${
        colorClasses[color ?? 'primary']
      }`}
    >
      {text}
      <HiArrowRight
        className={`group-hover:translate-x-0.5 transition-transform text-${
          size ?? 'base'
        }`}
      />
    </Link>
  );
};

export default LinkWithArrow;
