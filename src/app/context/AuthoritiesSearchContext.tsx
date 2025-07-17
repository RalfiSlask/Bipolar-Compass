'use client';

import {
  ALL_AUTHORITIES,
  SERVICE_CATEGORIES,
} from '@/app/data/help/authorities';
import { IAuthority } from '@/app/types/help/authorities';
import { createContext, ReactNode, useMemo, useState } from 'react';

// Define broader service categories with fuzzy matching

interface IAuthoritiesSearchContextValue {
  searchTerm: string;
  selectedServiceCategory: string;
  allServiceCategories: typeof SERVICE_CATEGORIES;
  filteredAuthorities: IAuthority[];
  filteredCount: number;
  totalCount: number;
  handleSearchChange: (value: string) => void;
  handleServiceCategoryChange: (categoryId: string) => void;
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
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleServiceCategoryChange = (categoryId: string) => {
    setSelectedServiceCategory(categoryId);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearFilter = () => {
    setSelectedServiceCategory('');
  };

  const clearAll = () => {
    setSearchTerm('');
    setSelectedServiceCategory('');
  };

  const filteredAuthorities = useMemo(() => {
    return ALL_AUTHORITIES.filter((authority) => {
      const { title, description, services } = authority;
      const authorityName = title.toLowerCase();
      const authorityDescription = description.toLowerCase();
      const authorityServices = services.map((service) =>
        service.title.toLowerCase()
      );

      // Check if the searchTerm is in the title, description or in the services of the authority
      const doesAuthorityNameMatch = authorityName.includes(
        searchTerm.toLowerCase()
      );
      const doesAuthorityDescriptionMatch = authorityDescription.includes(
        searchTerm.toLowerCase()
      );
      const doesAuthorityServiceMatch = authorityServices.some((service) =>
        service.includes(searchTerm.toLowerCase())
      );

      // Check if this authority has services that match the selected category
      const selectedCategory = SERVICE_CATEGORIES.find(
        (cat) => cat.id === selectedServiceCategory
      );
      const isServiceCategoryMatch =
        !selectedCategory ||
        services.some((service) =>
          selectedCategory.keywords.some(
            (keyword) =>
              service.title.toLowerCase().includes(keyword.toLowerCase()) ||
              service.description.toLowerCase().includes(keyword.toLowerCase())
          )
        );

      const matchesSearch =
        !searchTerm ||
        doesAuthorityNameMatch ||
        doesAuthorityDescriptionMatch ||
        doesAuthorityServiceMatch;

      const matchesServiceCategory =
        selectedServiceCategory === '' || isServiceCategoryMatch;

      return matchesSearch && matchesServiceCategory;
    });
  }, [searchTerm, selectedServiceCategory]);

  const filteredCount = filteredAuthorities.length;
  const totalCount = ALL_AUTHORITIES.length;

  const contextValue: IAuthoritiesSearchContextValue = {
    searchTerm,
    selectedServiceCategory,
    allServiceCategories: SERVICE_CATEGORIES,
    filteredAuthorities,
    filteredCount,
    totalCount,
    handleSearchChange,
    handleServiceCategoryChange,
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
