'use client';

import { ALL_AUTHORITIES } from '@/app/data/help/authorities';
import { IAuthority } from '@/app/types/help/authorities';
import { createContext, ReactNode, useMemo, useState } from 'react';

interface IAuthoritiesSearchContextValue {
  searchTerm: string;
  selectedService: string;
  allServices: string[];
  filteredAuthorities: IAuthority[];
  filteredCount: number;
  totalCount: number;
  handleSearchChange: (value: string) => void;
  handleServiceFilterChange: (service: string) => void;
  clearSearch: () => void;
  clearFilter: () => void;
  clearAll: () => void;
}

const AuthoritiesSearchContext = createContext<
  IAuthoritiesSearchContextValue | undefined
>(undefined);

interface IAuthoritiesSearchProviderProps {
  children: ReactNode;
}

export const AuthoritiesSearchProvider = ({
  children,
}: IAuthoritiesSearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleServiceFilterChange = (service: string) => {
    setSelectedService(service);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearFilter = () => {
    setSelectedService('');
  };

  const clearAll = () => {
    setSearchTerm('');
    setSelectedService('');
  };

  const allServices = useMemo(() => {
    // flatMap flattens all arrays to one array
    // Example: [["Vårdinfo", "Klagomål"], ["Tillsyn", "Rapporter"]] -> ["Vårdinfo", "Klagomål", "Tillsyn", "Rapporter"]
    const flattedAuthorities = ALL_AUTHORITIES.flatMap((auth) =>
      auth.services.map((service) => service.title)
    );

    // Here we remove duplicated values by using Set
    const authoritiesSet = new Set(flattedAuthorities);

    // We convert back to array and sort it (cant sort Set)
    const authoritiesArray = Array.from(authoritiesSet);
    const sortedServices = authoritiesArray.sort();

    return sortedServices;
  }, []);

  const filteredAuthorities = useMemo(() => {
    return ALL_AUTHORITIES.filter((authority) => {
      const { title, description, services } = authority;
      const authorityName = title.toLowerCase();
      const authorityDescription = description.toLowerCase();
      const authorityServices = services.map((service) =>
        service.title.toLowerCase()
      );

      // We check if the searchTerm is in the title, description or in the services of the authority
      const doesAuthorityNameMatch = authorityName.includes(
        searchTerm.toLowerCase()
      );
      const doesAuthorityDescriptionMatch = authorityDescription.includes(
        searchTerm.toLowerCase()
      );
      const doesAuthorityServiceMatch = authorityServices.some((service) =>
        service.includes(searchTerm.toLowerCase())
      );

      // Check if this authority has the service that user selected in the filter dropdown
      const isSomeServiceMatch = services.some(
        (service) => service.title === selectedService
      );

      const matchesSearch =
        !searchTerm ||
        doesAuthorityNameMatch ||
        doesAuthorityDescriptionMatch ||
        doesAuthorityServiceMatch;

      const matchesService = selectedService === '' || isSomeServiceMatch;

      return matchesSearch && matchesService;
    });
  }, [searchTerm, selectedService]);

  const filteredCount = filteredAuthorities.length;
  const totalCount = ALL_AUTHORITIES.length;

  const contextValue: IAuthoritiesSearchContextValue = {
    searchTerm,
    selectedService,
    allServices,
    filteredAuthorities,
    filteredCount,
    totalCount,
    handleSearchChange,
    handleServiceFilterChange,
    clearSearch,
    clearFilter,
    clearAll,
  };

  return (
    <AuthoritiesSearchContext.Provider value={contextValue}>
      {children}
    </AuthoritiesSearchContext.Provider>
  );
};

export default AuthoritiesSearchContext;
