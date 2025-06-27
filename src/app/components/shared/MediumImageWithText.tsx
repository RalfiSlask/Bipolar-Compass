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
      className={`grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-6 items-center bg-${type}-light rounded-xl shadow-md shadow-${type}-dark/20 overflow-hidden responsive-margin-bottom ${
        alignment === 'right'
          ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'
          : ''
      }`}
    >
      <div
        className={`w-full h-64 relative ${
          halfSize ? 'lg:col-span-2' : 'lg:col-span-1'
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
      <div className="p-4 lg:p-8 col-span-2">
        <h2 className={`text-2xl font-bold text-${type}-dark mb-2`}>{title}</h2>
        <p className={`text-${type}-dark`}>{description}</p>
      </div>
    </section>
  );
};
