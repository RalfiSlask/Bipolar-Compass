import { FiUser } from 'react-icons/fi';

interface IAvatarImageProps {
  avatarUrl?: string;
}

const AvatarImage = ({ avatarUrl }: IAvatarImageProps) => {
  return (
    <div className="w-full h-full overflow-hidden rounded-full">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <FiUser className="w-7 h-7 sm:w-8 sm:h-8 text-primary-medium" />
        </div>
      )}
    </div>
  );
};

export default AvatarImage;
