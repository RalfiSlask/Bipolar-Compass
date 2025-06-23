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
  const { name, description, website, phone, email, contact, services, image } =
    authority;
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-md border-2 border-${type}-light/60`}
    >
      <div className="flex flex-col gap-6">
        {image && !imageError ? (
          <div className="h-32 relative rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={`${name} logotyp`}
              width={192}
              height={192}
              className="w-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <AuthorityFallbackImage type={type} />
        )}

        <div className="flex-1">
          <h3 className={`text-xl font-bold text-${type}-dark mb-2`}>{name}</h3>

          <p className={`text-${type}-dark mb-4 leading-relaxed`}>
            {description}
          </p>
          <AuthorityContact
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
