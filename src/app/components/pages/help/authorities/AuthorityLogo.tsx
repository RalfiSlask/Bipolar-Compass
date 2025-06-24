import { ColorType } from '@/app/types/colorTypes';
import { IAuthority } from '@/app/types/help/authorities';
import Image from 'next/image';
import { useState } from 'react';
import AuthorityFallbackImage from './AuthorityFallbackImage';

interface IAuthorityLogoProps {
  authority: IAuthority;
  type: ColorType;
}

const AuthorityLogo = ({ authority, type }: IAuthorityLogoProps) => {
  const { title, image, imageReplacementText } = authority;
  const [imageError, setImageError] = useState(false);

  // The skr logo has a portrait orientation, the other logos are landscape so we need to adjust the width of it.
  const imageWidth = image?.includes('skr') ? 'w-[150px]' : 'w-[250px]';

  return (
    <>
      {image && !imageError && (
        <Image
          src={image}
          alt={`${title} logotyp`}
          width={192}
          height={192}
          className={`${imageWidth} h-20 object-contain`}
          onError={() => setImageError(true)}
        />
      )}

      {imageReplacementText && !imageError && (
        <p className="h-20 text-2xl font-medium flex items-center text-black font-sans break-words">
          {imageReplacementText}
        </p>
      )}

      {((!image && !imageReplacementText) || imageError) && (
        <AuthorityFallbackImage type={type} />
      )}
    </>
  );
};

export default AuthorityLogo;
