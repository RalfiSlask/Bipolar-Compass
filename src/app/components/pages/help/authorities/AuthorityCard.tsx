import { ColorType } from '@/app/types/colorTypes';
import { IAuthority } from '@/app/types/help/authorities';
import Image from 'next/image';
import { useState } from 'react';
import AuthorityContact from './AuthorityContact';
import AuthorityFallbackImage from './AuthorityFallbackImage';
import AuthorityServices from './AuthorityServices';

interface IAuthorityCardProps {
  authority: IAuthority;
  type?: ColorType;
}

const AuthorityCard = ({
  authority,
  type = 'primary',
}: IAuthorityCardProps) => {
  const {
    title,
    description,
    website,
    phone,
    email,
    contact,
    services,
    image,
    imageReplacementText,
  } = authority;
  const [imageError, setImageError] = useState(false);

  // The skr logo has a portrait orientation, the other logos are landscape so we need to adjust the width of it.
  const imageWidth = image?.includes('skr') ? 'w-[150px]' : 'w-[250px]';

  return (
    <div
      className={`bg-white rounded-lg p-4 sm:p-6 shadow-md border-2 border-${type}-light/50`}
    >
      <div className="flex flex-col gap-4">
        {image && !imageError && (
          <Image
            src={image}
            alt={`${name} logotyp`}
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

        <div className="flex-1">
          <h3
            className={`text-xl font-bold text-${type}-dark mb-2 break-words`}
          >
            {title}
          </h3>

          <p className={`text-${type}-dark mb-4 leading-relaxed`}>
            {description}
          </p>
          <AuthorityContact
            title={title || ''}
            website={website || ''}
            phone={phone || ''}
            email={email || ''}
            contact={contact || ''}
            type={type}
          />
          <AuthorityServices services={services} type={type} />
        </div>
      </div>
    </div>
  );
};

export default AuthorityCard;
