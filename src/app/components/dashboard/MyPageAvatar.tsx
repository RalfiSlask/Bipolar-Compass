import { ICustomSession } from '@/app/types/authoptions';
import { IUserWithMoodTracker } from '@/app/types/user';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';

interface IMyPageAvatarProps {
  user: ICustomSession['user'];
  userData: IUserWithMoodTracker | null;
}

const MyPageAvatar = ({ user, userData }: IMyPageAvatarProps) => {
  const avatarUrl = userData?.profile?.avatarUrl;

  return (
    <Link
      href="/min-sida/installningar"
      className="overflow-hidden rounded-full inline-block"
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={user?.name || 'Användare'}
          className="w-[120px] sm:w-[76px] rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <FiUser className="w-[120px] h-[120px] sm:w-[76px] sm:h-[76px] text-primary-medium" />
        </div>
      )}
    </Link>
  );
};

export default MyPageAvatar;
