import useAuthoritiesContext from '@/app/hooks/useAuthoritiesContext';
import { ColorType } from '@/app/types/colorTypes';

interface IAuthoritiesResultsCountProps {
  type?: ColorType;
}

const AuthoritiesResultsCount = ({
  type = 'primary',
}: IAuthoritiesResultsCountProps) => {
  const { filteredCount, totalCount } = useAuthoritiesContext();

  return (
    <div className={`mb-4 text-sm text-${type}-dark`}>
      Visar {filteredCount} av {totalCount} myndigheter
    </div>
  );
};

export default AuthoritiesResultsCount;
