import { ColorType } from '@/app/types/colorTypes';
import Image from 'next/image';

interface IMediumImageWithTextProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type?: ColorType;
  alignment?: 'left' | 'right';
  halfSize?: boolean;
}

export const MediumImageWithText = ({
  title,
  description,
  image,
  imageAlt,
  type = 'primary',
  alignment = 'left',
  halfSize = false,
}: IMediumImageWithTextProps) => {
  return (
    <section
      className={`flex flex-col lg:flex-row items-center lg:gap-8 bg-${type}-light rounded-xl shadow-md shadow-${type}-dark/20 overflow-hidden responsive-margin-bottom ${
        alignment === 'right' ? 'lg:flex-row-reverse' : ''
      }`}
    >
      <div
        className={`flex-shrink-0 w-full h-64 relative ${
          halfSize ? 'lg:w-1/2' : 'lg:w-[340px]'
        }`}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          className={`object-cover object-center ${
            alignment === 'right' ? 'lg:rounded-r-xl' : 'lg:rounded-l-xl'
          }`}
        />
      </div>
      <div className="flex-1 p-4 lg:p-8">
        <h2 className={`text-2xl font-bold text-${type}-dark mb-2`}>{title}</h2>
        <p className={`text-${type}-dark`}>{description}</p>
      </div>
    </section>
  );
};
