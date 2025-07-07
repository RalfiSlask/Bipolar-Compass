import useAuthoritiesContext from '@/app/hooks/useAuthoritiesContext';
import { ColorType } from '@/app/types/colorTypes';
import AuthorityCard from './AuthorityCard';
import NoSearchResults from './NoSearchResults';

const Authorities = ({ type = 'primary' }: { type?: ColorType }) => {
  const { filteredAuthorities } = useAuthoritiesContext();

  return (
    <>
      {filteredAuthorities.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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

export default Authorities;
