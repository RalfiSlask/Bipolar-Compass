import {
  AuthoritiesSearchProvider,
  useAuthoritiesSearchContext,
} from '@/app/context/AuthoritiesSearchContext';
import { ColorType } from '@/app/types/colorTypes';
import AuthoritiesSearch from './AuthoritiesSearch';
import AuthorityCard from './AuthorityCard';
import NoSearchResults from './NoSearchResults';

interface IAuthoritiesGridProps {
  title?: string;
  description?: string;
  type?: ColorType;
}

const AuthoritiesGridContent = ({ type = 'primary' }: { type?: ColorType }) => {
  const { filteredAuthorities } = useAuthoritiesSearchContext();

  return (
    <>
      <AuthoritiesSearch type={type} />
      {filteredAuthorities.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAuthorities.map((authority, index) => (
            <AuthorityCard key={index} authority={authority} type={type} />
          ))}
        </div>
      ) : (
        <NoSearchResults type={type} />
      )}
    </>
  );
};

const AuthoritiesGrid = ({
  title,
  description,
  type = 'primary',
}: IAuthoritiesGridProps) => {
  return (
    <AuthoritiesSearchProvider>
      <div
        className={`bg-${type}-light rounded-xl p-6 shadow-lg border-2 border-${type}-light/60`}
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

        <AuthoritiesGridContent type={type} />
      </div>
    </AuthoritiesSearchProvider>
  );
};

export default AuthoritiesGrid;
