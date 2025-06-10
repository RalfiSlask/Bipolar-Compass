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
          className="w-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <FiUser className="w-12 h-12 text-primary-medium" />
        </div>
      )}
    </Link>
  );
};

export default MyPageAvatar;
