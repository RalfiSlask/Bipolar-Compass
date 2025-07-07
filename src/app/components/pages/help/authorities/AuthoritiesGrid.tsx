import { AuthoritiesSearchProvider } from '@/app/context/AuthoritiesSearchContext';
import { ColorType } from '@/app/types/colorTypes';
import Authorities from './Authorities';
import AuthoritiesFilter from './AuthoritiesFilter';
import AuthoritiesGridIntro from './AuthoritiesGridIntro';
import AuthoritiesResultsCount from './AuthoritiesResultsCount';
import AuthoritiesSearch from './AuthoritiesSearch';

interface IAuthoritiesGridProps {
  title?: string;
  description?: string;
  type?: ColorType;
}

const AuthoritiesGrid = ({
  title,
  description,
  type = 'primary',
}: IAuthoritiesGridProps) => {
  return (
    <AuthoritiesSearchProvider>
      <div
        className={`bg-${type}-light rounded-xl p-4 sm:p-6 shadow-lg border-2 border-${type}-light/50 responsive-margin-bottom`}
      >
        {(title || description) && (
          <AuthoritiesGridIntro
            title={title}
            description={description}
            type={type}
          />
        )}
        <AuthoritiesSearch type={type} />
        <AuthoritiesFilter type={type} />
        <AuthoritiesResultsCount type={type} />
        <Authorities type={type} />
      </div>
    </AuthoritiesSearchProvider>
  );
};

export default AuthoritiesGrid;
