import React from 'react';
import Image from 'next/image';
import { increaseThumbnailQualityByZoom } from '@/app/utils/bookUtils';

interface IBookInfoImageProps {
  thumbnail: string;
  alt: string;
}

const BookInfoImage = ({ thumbnail, alt }: IBookInfoImageProps) => {
  return (
    <div className="sm:w-1/3 xl:w-1/4">
      {thumbnail ? (
        <div className="w-full flex justify-center">
          <Image
            src={increaseThumbnailQualityByZoom(thumbnail)}
            alt={alt}
            width={0}
            height={0}
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="h-auto w-full rounded-lg object-contain"
            unoptimized
          />
        </div>
      ) : (
        <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Ingen bild tillgänglig</span>
        </div>
      )}
    </div>
  );
};

export default BookInfoImage;
