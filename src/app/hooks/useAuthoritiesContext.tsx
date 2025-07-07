import AuthoritiesSearchContext from '@/app/context/AuthoritiesSearchContext';
import { useContext } from 'react';

const useAuthoritiesContext = () => {
  const context = useContext(AuthoritiesSearchContext);
  if (context === undefined) {
    throw new Error(
      'useAuthoritiesSearchContext must be used within an AuthoritiesSearchProvider'
    );
  }
  return context;
};

export default useAuthoritiesContext;
