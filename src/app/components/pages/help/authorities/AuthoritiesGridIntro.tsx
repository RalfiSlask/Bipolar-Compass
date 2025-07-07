import { ColorType } from '@/app/types/colorTypes';

interface IAuthoritiesGridIntroProps {
  title?: string;
  description?: string;
  type?: ColorType;
}

const AuthoritiesGridIntro = ({
  title,
  description,
  type = 'primary',
}: IAuthoritiesGridIntroProps) => {
  return (
    <div className="mb-6">
      {title && (
        <h2 className={`text-2xl font-bold text-${type}-dark mb-2`}>{title}</h2>
      )}
      {description && <p className={`text-${type}-dark`}>{description}</p>}
    </div>
  );
};

export default AuthoritiesGridIntro;
