'use client';

import ScienceActiveFilters from '@/app/components/pages/science/ScienceActiveFilters';
import ScienceArticleContainer from '@/app/components/pages/science/ScienceArticleContainer';
import ScienceArticleTypeFilter from '@/app/components/pages/science/ScienceArticleTypeFilter';
import ScienceArticleTypesModal from '@/app/components/pages/science/ScienceArticleTypesModal';
import ScienceExtentFilter from '@/app/components/pages/science/ScienceExtentFilter';
import FilterGroup from '@/app/components/pages/science/ScienceFilterGroup';
import SciencePagination from '@/app/components/pages/science/SciencePagination';
import ScienceSortFilter from '@/app/components/pages/science/ScienceSortFilter';
import Spinner from '@/app/components/shared/Spinner';
import {
  ARTICLE_ATTRIBUTE_FILTERS,
  LANGUAGE_FILTERS,
  PUBLICATION_TYPE_FILTERS,
  SWEDISH_HOSPITALS_FILTERS,
  SWEDISH_UNIVERSITIES_FILTERS,
  TEXT_AVAILABILITY_FILTERS,
  YEARS_OF_PUBLICATION_FILTERS,
} from '@/app/data/science';
import { IScienceArticle } from '@/app/types/science';
import {
  getDateFilterQuery,
  getFormattedArticles,
  parseXMLAbstracts,
} from '@/app/utils/scienceUtils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoFilter } from 'react-icons/io5';
import CustomSelect from '../components/shared/CustomSelectDropdown';

const apiKey = process.env.NEXT_PUBLIC_PUB_MED_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_PUB_MED_BASE_URL;
const ARTICLES_PER_PAGE = 10;

const ScienceArticles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<IScienceArticle[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchScope, setSearchScope] = useState<'international' | 'swedish'>(
    'swedish'
  );
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedAmountOfYears, setSelectedAmountOfYears] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [additionalSearch, setAdditionalSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState(
    'bipolar disorder[Title/Abstract]'
  );

  const clearAllFilters = () => {
    setSearchScope('swedish');
    setSelectedUniversity('');
    setSelectedHospital('');
    setSelectedAmountOfYears('0');
    setCurrentPage(1);
    setActiveFilters([]);
    setSelectedLanguage('');
  };

  const getActiveFilters = () => {
    const filters: string[] = [];

    if (searchScope === 'international') {
      filters.push('Internationella artiklar');
    }

    if (selectedAmountOfYears !== '0') {
      filters.push(`${selectedAmountOfYears} år`);
    }

    if (selectedUniversity) {
      const university = SWEDISH_UNIVERSITIES_FILTERS.find(
        (u) => u.value === selectedUniversity
      );
      if (university) filters.push(university.label);
    }

    if (selectedHospital) {
      const hospital = SWEDISH_HOSPITALS_FILTERS.find(
        (h) => h.value === selectedHospital
      );
      if (hospital) filters.push(hospital.label);
    }

    [
      ...TEXT_AVAILABILITY_FILTERS,
      ...ARTICLE_ATTRIBUTE_FILTERS,
      ...PUBLICATION_TYPE_FILTERS,
      ...LANGUAGE_FILTERS,
    ].forEach((filter) => {
      if (activeFilters.includes(filter.id)) {
        filters.push(filter.label);
      }
    });

    if (selectedLanguage) {
      const language = LANGUAGE_FILTERS.find((l) => l.id === selectedLanguage);
      if (language) filters.push(language.label);
    }

    return filters;
  };

  const scienceActiveFilters = getActiveFilters();

  const handleSearch = () => {
    const userSearchTerm = additionalSearch.trim();
    if (userSearchTerm) {
      setSearchQuery(
        `(bipolar disorder[Title/Abstract] AND ${userSearchTerm}[Title/Abstract])`
      );
    } else {
      setSearchQuery('bipolar disorder[Title/Abstract]');
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchPubMedData = async () => {
      setIsLoading(true);

      const dateFilter = getDateFilterQuery(selectedAmountOfYears);

      let affiliationQuery = '';

      if (searchScope === 'swedish') {
        const affiliations = [];

        if (selectedUniversity || selectedHospital) {
          if (selectedUniversity)
            affiliations.push(`${selectedUniversity}[Affiliation]`);
          if (selectedHospital)
            affiliations.push(`${selectedHospital}[Affiliation]`);
        } else {
          SWEDISH_UNIVERSITIES_FILTERS.forEach((uni) => {
            if (uni.value) affiliations.push(`${uni.value}[Affiliation]`);
          });
          SWEDISH_HOSPITALS_FILTERS.forEach((hospital) => {
            if (hospital.value)
              affiliations.push(`${hospital.value}[Affiliation]`);
          });
        }

        affiliationQuery = ` AND (${affiliations.join(' OR ')})`;
      }

      let finalSearchQuery = `${searchQuery}${affiliationQuery}${dateFilter}`;

      // Group filters by type
      const textFilters = TEXT_AVAILABILITY_FILTERS.filter((f) =>
        activeFilters.includes(f.id)
      );
      const attributeFilters = ARTICLE_ATTRIBUTE_FILTERS.filter((f) =>
        activeFilters.includes(f.id)
      );
      const typeFilters = PUBLICATION_TYPE_FILTERS.filter((f) =>
        activeFilters.includes(f.id)
      );

      // Add text availability filters
      textFilters.forEach((filter) => {
        finalSearchQuery += ` AND ${filter.value}`;
      });

      // Add attribute filters
      attributeFilters.forEach((filter) => {
        finalSearchQuery += ` AND ${filter.value}`;
      });

      // Add type filters
      if (typeFilters.length > 0) {
        finalSearchQuery += ` AND (${typeFilters
          .map((f) => f.value)
          .join(' OR ')})`;
      }

      // Add language filter
      if (selectedLanguage) {
        const languageFilter = LANGUAGE_FILTERS.find(
          (l) => l.id === selectedLanguage
        );
        if (languageFilter) {
          finalSearchQuery += ` AND ${languageFilter.value}`;
        }
      }

      try {
        // Add sort parameter to the search URL
        const sortParam = sortOrder
          ? `&sort=${sortOrder === 'newest' ? 'date_desc' : 'date_asc'}`
          : '';

        const searchUrl = `${BASE_URL}/esearch.fcgi?db=pubmed&term=${finalSearchQuery}&retmode=json&retmax=${ARTICLES_PER_PAGE}&retstart=${
          (currentPage - 1) * ARTICLES_PER_PAGE
        }${sortParam}&api_key=${apiKey}`;

        const searchResponse = await axios.get(searchUrl);
        const ids = searchResponse.data.esearchresult.idlist;
        setTotalResults(parseInt(searchResponse.data.esearchresult.count));

        if (ids.length > 0) {
          // We fetch metadata from pubmed from the ids
          const summaryUrl = `${BASE_URL}/esummary.fcgi?db=pubmed&id=${ids.join(
            ','
          )}&retmode=json&api_key=${apiKey}`;
          const summaryResponse = await axios.get(summaryUrl);

          console.log(summaryResponse.data);

          // We also fetch the abstracts from pubmed
          const fetchUrl = `${BASE_URL}/efetch.fcgi?db=pubmed&id=${ids.join(
            ','
          )}&retmode=xml&api_key=${apiKey}`;
          const fetchResponse = await axios.get(fetchUrl);

          // Pubmed returns the abstracts in XML format, so we need to parse it

          const abstracts = parseXMLAbstracts(fetchResponse.data);
          const result = summaryResponse.data.result;

          const formattedArticles = getFormattedArticles(
            ids,
            result,
            abstracts
          );

          setArticles(formattedArticles);
        }
      } catch (error) {
        console.error('Error fetching PubMed data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPubMedData();
  }, [
    currentPage,
    selectedUniversity,
    selectedHospital,
    searchScope,
    selectedAmountOfYears,
    activeFilters,
    selectedLanguage,
    sortOrder,
    searchQuery,
  ]);

  const totalPages = Math.ceil(totalResults / ARTICLES_PER_PAGE);

  const handleLanguageFilterClick = (language: 'swedish' | 'international') => {
    setSearchScope(language);
    setSelectedUniversity('');
    setSelectedHospital('');
    setCurrentPage(1);
  };

  const handleYearsFilterChange = (value: string) => {
    if (value === selectedAmountOfYears) {
      setSelectedAmountOfYears('0');
    } else {
      setSelectedAmountOfYears(value);
    }
    setCurrentPage(1);
  };

  const handleInstituteChange = (
    value: string,
    type: 'university' | 'hospital'
  ) => {
    if (type === 'university') {
      setSelectedUniversity(value);
    } else {
      setSelectedHospital(value);
    }
    setCurrentPage(1);
  };

  const handleModalFilterChange = (newFilters: string[]) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterId: string, checked: boolean) => {
    setActiveFilters((prev) =>
      checked ? [...prev, filterId] : prev.filter((f) => f !== filterId)
    );
    setCurrentPage(1);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value === selectedLanguage ? '' : value);
    setCurrentPage(1);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } else {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }
  };

  const handleSortChange = (order: 'newest' | 'oldest' | null) => {
    setSortOrder(order === sortOrder ? null : order);
  };

  return (
    <section className="w-full min-h-screen bg-primary-light">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 pt-10 pb-20">
        <div className="w-full bg-white mx-auto rounded-lg shadow-md p-6 flex justify-center">
          <div className="max-w-3xl bg-white ">
            <h2 className="text-2xl font-semibold text-primary-dark mb-4">
              Sök bland forskningsartiklar om bipolaritet
            </h2>
            <p className="text-gray-600 mb-6">
              Alla sökningar kombineras med &quot;bipolar disorder&quot; för att
              ge dig relevanta resultat inom området.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  name="search"
                  id="search"
                  aria-label="input för att söka forskningsartiklar"
                  placeholder="Skriv din sökterm här..."
                  className="primary-input w-full"
                  value={additionalSearch}
                  onChange={(e) => setAdditionalSearch(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </div>
              <button
                className="px-8 py-3 bg-primary-medium hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Sök
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Din sökning kommer att kombineras med &quot;bipolar disorder&quot;
              för att hitta relevanta artiklar.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-8 px-4 md:px-10 pb-20">
        <div className="md:hidden sticky top-0 z-20 bg-primary-light py-4">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-md text-primary-dark"
          >
            <div className="flex items-center gap-2">
              <IoFilter className="text-xl" />
              <span className="font-medium">Filtrera artiklar</span>
            </div>
            <span className="bg-primary-medium text-white rounded-full px-2 py-0.5 text-sm">
              {scienceActiveFilters.length}
            </span>
          </button>
        </div>

        <div
          className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
            isMobileFiltersOpen
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div
            className={`bg-white w-full max-w-md h-screen overflow-y-auto transition-transform duration-300 ease-out transform ${
              isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-primary-dark">
                  Filter
                </h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <IoMdClose className="text-2xl text-gray-500" />
                </button>
              </div>
              {scienceActiveFilters.length > 0 && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {scienceActiveFilters.length} aktiva filter
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-primary-medium hover:text-primary-dark"
                  >
                    Rensa alla
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 space-y-6">
              <ScienceExtentFilter
                searchScope={searchScope}
                handleLanguageFilterClick={handleLanguageFilterClick}
              />

              <div className="space-y-4">
                <h3 className="font-medium text-primary-dark">
                  Publiceringsdatum
                </h3>
                <div className="space-y-3">
                  {YEARS_OF_PUBLICATION_FILTERS.map((tab) => (
                    <div key={tab.value} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        value={tab.value}
                        name="years"
                        id={`mobile-${tab.value}`}
                        checked={selectedAmountOfYears === tab.value}
                        onChange={(e) =>
                          handleYearsFilterChange(e.target.value)
                        }
                        className="w-5 h-5 text-primary-medium border-gray-300 rounded focus:ring-primary-medium"
                      />
                      <label
                        htmlFor={`mobile-${tab.value}`}
                        className="text-gray-700"
                      >
                        {tab.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {searchScope === 'swedish' && (
                <div className="space-y-4">
                  <CustomSelect
                    options={SWEDISH_UNIVERSITIES_FILTERS}
                    value={selectedUniversity}
                    onChange={(value) =>
                      handleInstituteChange(value, 'university')
                    }
                    name="university"
                    placeholder="Välj universitet"
                    size="large"
                  />
                  <CustomSelect
                    options={SWEDISH_HOSPITALS_FILTERS}
                    value={selectedHospital}
                    onChange={(value) =>
                      handleInstituteChange(value, 'hospital')
                    }
                    name="hospital"
                    placeholder="Välj sjukhus"
                    size="large"
                  />
                </div>
              )}

              <div className="space-y-6 divide-y divide-gray-200">
                <FilterGroup
                  title="Textinnehåll"
                  filters={TEXT_AVAILABILITY_FILTERS}
                  selectedValues={activeFilters}
                  onChange={handleFilterChange}
                />
                <FilterGroup
                  title="Artikelattribut"
                  filters={ARTICLE_ATTRIBUTE_FILTERS}
                  selectedValues={activeFilters}
                  onChange={handleFilterChange}
                />
                <FilterGroup
                  title="Språk"
                  filters={LANGUAGE_FILTERS}
                  selectedValues={[selectedLanguage]}
                  onChange={(id) => handleLanguageChange(id)}
                  type="radio"
                  name="language"
                />
                <ScienceArticleTypeFilter
                  activeFilters={activeFilters}
                  handleFilterChange={handleFilterChange}
                  setIsModalOpen={setIsModalOpen}
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="hidden md:flex flex-col gap-6 w-72 bg-white p-6 rounded-lg shadow-md  h-fit">
          <ScienceExtentFilter
            searchScope={searchScope}
            handleLanguageFilterClick={handleLanguageFilterClick}
          />

          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-primary-dark">Publiceringsdatum</h3>
            <div className="space-y-2">
              {YEARS_OF_PUBLICATION_FILTERS.map((tab) => (
                <div key={tab.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={tab.value}
                    name="years"
                    id={tab.value}
                    checked={selectedAmountOfYears === tab.value}
                    aria-label={tab.label}
                    onChange={(e) => handleYearsFilterChange(e.target.value)}
                    className="w-4 h-4 text-primary-medium border-gray-300 rounded focus:ring-primary-medium"
                  />
                  <label htmlFor={tab.value} className="text-gray-700">
                    {tab.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {searchScope === 'swedish' && (
            <>
              <div className="space-y-4">
                <CustomSelect
                  options={SWEDISH_UNIVERSITIES_FILTERS}
                  value={selectedUniversity}
                  onChange={(value) =>
                    handleInstituteChange(value, 'university')
                  }
                  name="university"
                  placeholder="Välj universitet"
                  size="large"
                />

                <CustomSelect
                  options={SWEDISH_HOSPITALS_FILTERS}
                  value={selectedHospital}
                  onChange={(value) => handleInstituteChange(value, 'hospital')}
                  name="hospital"
                  placeholder="Välj sjukhus"
                  size="large"
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-6 divide-y divide-gray-200">
            <FilterGroup
              title="Textinnehåll"
              filters={TEXT_AVAILABILITY_FILTERS}
              selectedValues={activeFilters}
              onChange={handleFilterChange}
            />
            <FilterGroup
              title="Artikelattribut"
              filters={ARTICLE_ATTRIBUTE_FILTERS}
              selectedValues={activeFilters}
              onChange={handleFilterChange}
            />
            <FilterGroup
              title="Språk"
              filters={LANGUAGE_FILTERS}
              selectedValues={[selectedLanguage]}
              onChange={(id) => handleLanguageChange(id)}
              type="radio"
              name="language"
            />
            <ScienceArticleTypeFilter
              activeFilters={activeFilters}
              handleFilterChange={handleFilterChange}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex flex-col items-center gap-6">
            <div className="w-full  space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {totalResults} artiklar hittade
                </span>
                <ScienceSortFilter
                  handleSortChange={handleSortChange}
                  sortOrder={sortOrder || 'newest'}
                />
              </div>

              {scienceActiveFilters.length > 0 && (
                <ScienceActiveFilters
                  ScienceActiveFilters={scienceActiveFilters}
                  clearAllFilters={clearAllFilters}
                />
              )}

              <div className="relative space-y-4">
                {isLoading ? (
                  <div className="min-h-[400px] flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  articles.map((article) => (
                    <ScienceArticleContainer
                      key={article.id}
                      article={article}
                    />
                  ))
                )}
              </div>

              {!isLoading && articles.length > 0 && (
                <div className="mt-8">
                  <SciencePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <ScienceArticleTypesModal
          activeFilters={activeFilters}
          handleFilterChange={handleModalFilterChange}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </section>
  );
};

export default ScienceArticles;
