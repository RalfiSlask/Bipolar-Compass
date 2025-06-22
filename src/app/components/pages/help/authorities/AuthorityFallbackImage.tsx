import { ColorType } from '@/app/types/colorTypes';
import { FaBuilding } from 'react-icons/fa';

interface IAuthorityFallbackImageProps {
  type: ColorType;
}

const AuthorityFallbackImage = ({ type }: IAuthorityFallbackImageProps) => {
  return (
    <div
      className={`w-full h-32 bg-${type}-light/40 rounded-lg flex items-center justify-center`}
    >
      <FaBuilding className={`w-16 h-16 text-${type}-dark`} />
    </div>
  );
};

export default AuthorityFallbackImage;
