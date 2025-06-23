import { AuthoritiesSearchProvider } from '@/app/context/AuthoritiesSearchContext';
import { ColorType } from '@/app/types/colorTypes';
import Authorities from './Authorities';
import AuthoritiesFilter from './AuthoritiesFilter';
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
        className={`bg-${type}-light rounded-xl p-4 sm:p-6 shadow-lg border-2 border-${type}-light/50`}
      >
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h2 className={`text-2xl font-bold text-${type}-dark mb-2`}>
                {title}
              </h2>
            )}
            {description && (
              <p className={`text-${type}-dark`}>{description}</p>
            )}
          </div>
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
