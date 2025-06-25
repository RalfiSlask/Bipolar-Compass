import { IRoundedImageWithListData } from '@/app/types/general';
import Image from 'next/image';
import { FaExclamationCircle } from 'react-icons/fa';

interface IRoundedImageWithListProps {
  data: IRoundedImageWithListData;
}

export const RoundedImageWithList = ({ data }: IRoundedImageWithListProps) => {
  const {
    title,
    desc,
    subdesc,
    listItems,
    image,
    imageAlt,
    type = 'primary',
    alignment = 'left',
    listIcon: IconComponent = FaExclamationCircle,
  } = data;

  return (
    <div
      className={`bg-${type}-light w-full flex flex-col lg:flex-row items-center shadow-lg rounded-2xl gap-10 px-4 md:px-8 py-4 sm:py-10 animate-modal-slide-up ${
        alignment === 'right' ? 'lg:flex-row-reverse' : ''
      }`}
    >
      <div className={`flex-1 flex flex-col gap-6 text-${type}-dark`}>
        {title && (
          <h2 className={`h-xs lg:text-2xl font-bold text-${type}-dark`}>
            {title}
          </h2>
        )}
        {desc && (
          <p className={`text-base leading-relaxed text-${type}-dark`}>
            {desc}
          </p>
        )}
        {subdesc && (
          <p className={`text-base leading-relaxed text-${type}-dark`}>
            {subdesc}
          </p>
        )}

        <div
          className={`bg-${type}-light/40 border-l-4 border-${type}-dark rounded-lg p-4 sm:p-6`}
        >
          <ul className="flex flex-col gap-4 list-disc list-inside">
            {listItems.map((item, index) => (
              <li key={index} className="flex items-start text-sm gap-3">
                <span className="w-4 h-4">
                  <IconComponent className={`text-${type}-dark mt-1`} />
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 h-full flex flex-col gap-6 items-center justify-center">
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

export default RoundedImageWithList;
