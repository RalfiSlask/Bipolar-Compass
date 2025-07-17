import { IBook } from '@/app/types/api/googleBookTypes';
import { increaseThumbnailQualityByZoom } from '@/app/utils/bookUtils';
import Image from 'next/image';

interface IBookCardImageProps {
  volumeInfo: IBook['volumeInfo'];
}

const BookCardImage = ({ volumeInfo }: IBookCardImageProps) => {
  return (
    <div
      className="relative w-full aspect-[2/3] flex-shrink-0 transition-transform duration-200 group-hover:rotate-x-0 group-hover:shadow-lg"
      style={{
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        transform: 'rotateX(12deg)',
      }}
    >
      <Image
        src={increaseThumbnailQualityByZoom(
          volumeInfo.imageLinks?.thumbnail || ''
        )}
        alt={volumeInfo.title}
        fill
        className="object-cover rounded w-full"
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
        unoptimized
      />
    </div>
  );
};

export default BookCardImage;
