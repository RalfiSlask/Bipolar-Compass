import { ColorType } from '@/app/types/colorTypes';
import { IAuthority } from '@/app/types/help/authorities';
import AuthorityContact from './AuthorityContact';
import AuthorityLogo from './AuthorityLogo';
import AuthorityServices from './AuthorityServices';

interface IAuthorityCardProps {
  authority: IAuthority;
  type?: ColorType;
}

const AuthorityCard = ({
  authority,
  type = 'primary',
}: IAuthorityCardProps) => {
  const { title, description, services } = authority;

  return (
    <div
      className={`bg-white rounded-lg p-4 sm:p-6 shadow-md border-2 border-${type}-light/50`}
    >
      <div className="flex flex-col gap-4">
        <AuthorityLogo authority={authority} type={type} />
        <div className="flex-1">
          <h3
            className={`text-xl font-bold text-${type}-dark mb-2 break-words`}
          >
            {title}
          </h3>
          <p className={`text-${type}-dark mb-4 leading-relaxed`}>
            {description}
          </p>
          <AuthorityContact authority={authority} type={type} />
          <AuthorityServices services={services} type={type} />
        </div>
      </div>
    </div>
  );
};

export default AuthorityCard;
