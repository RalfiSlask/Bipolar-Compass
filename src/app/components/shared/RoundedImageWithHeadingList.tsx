import Image from 'next/image';
import Link from 'next/link';

interface IRoundedImageWithHeadingsProps {
  title: string;
  image: string;
  imageAlt: string;
  type?: 'primary' | 'tertiary';
  link?: string;
  linkText?: string;
  alignment?: 'left' | 'right';
  headingsList: {
    title: string;
    description: string;
  }[];
}

const RoundedImageWithHeadingList = ({
  title,
  headingsList,
  image,
  imageAlt,
  type = 'primary',
  link,
  linkText,
  alignment = 'left',
}: IRoundedImageWithHeadingsProps) => {
  return (
    <div
      className={`bg-${type}-light w-full flex flex-col lg:flex-row items-center shadow-lg rounded-2xl gap-6 lg:gap-10 px-4 md:px-10 py-4 md:py-10 animate-modal-slide-up ${
        alignment === 'right' ? '' : 'lg:flex-row-reverse'
      }`}
    >
      <div className={`flex-1 flex flex-col gap-6 text-${type}-dark`}>
        <h3
          className={`text-lg sm:text-xl lg:text-2xl font-bold text-${type}-dark`}
        >
          {title}
        </h3>

        {headingsList.map((heading, index) => (
          <div key={index}>
            <h5 className="font-semibold lg:text-lg mb-2">{heading.title}</h5>
            <p className="">{heading.description}</p>
          </div>
        ))}

        {link && linkText && (
          <p>
            Det är viktigt att ta hand om sig själv också! Här kan du hitta mer
            information om{' '}
            <Link
              href={link || ''}
              className={`nav-link text-${type}-dark font-semibold`}
            >
              {linkText || ''}
            </Link>
            .
          </p>
        )}
      </div>

      <div className="flex-1 h-full flex flex-col gap-6 items-center">
        <div className="w-full">
          <Image
            src={image}
            alt={imageAlt}
            aria-label={imageAlt}
            width={1200}
            height={800}
            quality={80}
            className="object-cover rounded-sm lg:rounded-full"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default RoundedImageWithHeadingList;
