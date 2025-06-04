import Image from 'next/image';
import { FiUser } from 'react-icons/fi';

interface IAvatarModalDisplay {
  avatarUrl: string;
}

const AvatarModalDisplay = ({ avatarUrl }: IAvatarModalDisplay) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 border-primary-light/20">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Profilbild"
            width={192}
            height={192}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <FiUser className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-primary-light" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarModalDisplay;
