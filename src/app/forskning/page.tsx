'use client';

import ScienceActiveFilters from '@/app/components/pages/science/ScienceActiveFilters';
import ScienceArticleContainer from '@/app/components/pages/science/ScienceArticleContainer';
import ScienceArticleTypeFilter from '@/app/components/pages/science/ScienceArticleTypeFilter';
import ScienceExtentFilter from '@/app/components/pages/science/ScienceExtentFilter';
import FilterGroup from '@/app/components/pages/science/ScienceFilterGroup';
import SciencePagination from '@/app/components/pages/science/SciencePagination';
import ScienceSortFilter from '@/app/components/pages/science/ScienceSortFilter';
import Spinner from '@/app/components/shared/Spinner';
import {
  AGE_FILTERS,
  ARTICLE_ATTRIBUTE_FILTERS,
  LANGUAGE_FILTERS,
  PUBLICATION_TYPE_FILTERS,
  SEX_FILTERS,
  SPECIES_FILTERS,
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
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import ScienceAgesFilter from '../components/pages/science/ScienceAgeFilter';
import ScienceModal from '../components/pages/science/ScienceModal';
import CustomSelect from '../components/shared/CustomSelectDropdown';

const apiKey = process.env.NEXT_PUBLIC_PUB_MED_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_PUB_MED_BASE_URL;
const ARTICLES_PER_PAGE = 10;

const ScienceArticles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgesModalOpen, setIsAgesModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<IScienceArticle[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchScope, setSearchScope] = useState<'international' | 'swedish'>(
    'swedish'
  );
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedAmountOfYears, setSelectedAmountOfYears] = useState('0');
  const [selectedSex, setSelectedSex] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [additionalSearch, setAdditionalSearch] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
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

  const removeFilter = (filter: string) => {
    if (filter === 'Internationella artiklar') {
      setSearchScope('swedish');
      return;
    }

    if (filter.includes('år')) {
      setSelectedAmountOfYears('0');
      return;
    }

    const university = SWEDISH_UNIVERSITIES_FILTERS.find(
      (u) => u.label === filter
    );
    if (university) {
      setSelectedUniversity('');
      return;
    }

    const hospital = SWEDISH_HOSPITALS_FILTERS.find((h) => h.label === filter);
    if (hospital) {
      setSelectedHospital('');
      return;
    }

    const language = LANGUAGE_FILTERS.find((l) => l.label === filter);
    if (language) {
      setSelectedLanguage('');
      return;
    }

    const sex = SEX_FILTERS.find((l) => l.label === filter);
    if (sex) {
      setSelectedSex('');
      return;
    }

    const species = SPECIES_FILTERS.find((l) => l.label === filter);
    if (species) {
      setSelectedSpecies('');
      return;
    }

    // This function is used to find the id of a filter based on its label.
    const filterFromLabel = [
      ...TEXT_AVAILABILITY_FILTERS,
      ...ARTICLE_ATTRIBUTE_FILTERS,
      ...PUBLICATION_TYPE_FILTERS,
      ...AGE_FILTERS,
    ].find((f) => f.label === filter)?.id;

    // If the filter is found, it is removed from the active filters.
    if (filterFromLabel) {
      setActiveFilters((prev) => prev.filter((f) => f !== filterFromLabel));
    }
  };

  /*
    This function is used to get the active filters.
    It returns an array of strings, each representing an active filter.
  */
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
      ...AGE_FILTERS,
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

    if (selectedSpecies) {
      const species = SPECIES_FILTERS.find((l) => l.id === selectedSpecies);
      if (species) filters.push(species.label);
    }

    if (selectedSex) {
      const sex = SEX_FILTERS.find((l) => l.id === selectedSex);
      if (sex) filters.push(sex.label);
    }

    return filters;
  };

  const scienceActiveFilters = getActiveFilters();

  /*
    This function is used to handle the search functionality.
    It takes the user's search term, trims it, and sets the search query.
    It also resets the current page to 1.
  */
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

  /*
    This effect is used to fetch the data from PubMed.
    It is triggered when the user changes the filters or the search query.
  */
  useEffect(() => {
    setIsLoading(true);

    const fetchPubMedData = async () => {
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
      const ageFilters = AGE_FILTERS.filter((f) =>
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

      if (ageFilters.length > 0) {
        finalSearchQuery += ` AND (${ageFilters
          .map((f) => f.value)
          .join(' OR ')})`;
      }

      // add sex filter
      if (selectedSex) {
        const sexFilter = SEX_FILTERS.find((l) => l.id === selectedSex);
        if (sexFilter) {
          finalSearchQuery += ` AND ${sexFilter.value}`;
        }
      }

      // add species filter
      if (selectedSpecies) {
        const speciesFilter = SPECIES_FILTERS.find(
          (l) => l.id === selectedSpecies
        );
        if (speciesFilter) {
          finalSearchQuery += ` AND ${speciesFilter.value}`;
        }
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

      // Add sort parameter to the search URL
      const sortParam = sortOrder
        ? `&sort=${sortOrder === 'newest' ? 'date_desc' : 'date_asc'}`
        : '';

      const searchUrl = `${BASE_URL}/esearch.fcgi?db=pubmed&term=${finalSearchQuery}&retmode=json&retmax=${ARTICLES_PER_PAGE}&retstart=${
        (currentPage - 1) * ARTICLES_PER_PAGE
      }${sortParam}&api_key=${apiKey}`;

      try {
        const searchResponse = await axios.get(searchUrl);
        const ids = searchResponse.data.esearchresult.idlist;
        const count = parseInt(searchResponse.data.esearchresult.count);
        setTotalResults(count);

        if (ids.length > 0) {
          // We fetch metadata from pubmed from the ids
          const summaryUrl = `${BASE_URL}/esummary.fcgi?db=pubmed&id=${ids.join(
            ','
          )}&retmode=json&api_key=${apiKey}`;
          const summaryResponse = await axios.get(summaryUrl);

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
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error('Error fetching PubMed data:', error);
        setArticles([]);
        setTotalResults(0);
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
    selectedSex,
    selectedSpecies,
  ]);

  const totalPages = Math.max(Math.ceil(totalResults / ARTICLES_PER_PAGE), 1);

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
    if (isMobileFiltersOpen) {
      setIsMobileFiltersOpen(false);
    }
    setCurrentPage(1);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value === selectedLanguage ? '' : value);
    setCurrentPage(1);
  };

  const handleSexChange = (value: string) => {
    setSelectedSex(value === selectedSex ? '' : value);
    setCurrentPage(1);
  };

  const handleSpeciesChange = (value: string) => {
    setSelectedSpecies(value === selectedSpecies ? '' : value);
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
    <section className="w-full min-h-screen flex flex-col items-center bg-primary-light">
      <div className="max-w-[1440px] w-full px-4 md:px-10 pt-4 md:pb-8 md:pt-8">
        <div className="w-full lg:h-[350px] bg-white rounded-lg shadow-md p-4 md:px-10 py-6 flex flex-col lg:flex-row justify-between gap-10">
          <Image
            src="/images/science/science-testing.webp"
            alt="forskning"
            width={6730}
            height={4444}
            quality={80}
            priority={true}
            aria-label="forskning"
            className="w-auto apspect-auto h-full object-cover"
          />
          <div className="max-w-3xl flex flex-col justify-center bg-white">
            <h2 className="text-xl md:text-2xl font-semibold text-primary-dark mb-4">
              Sök bland forskningsartiklar om bipolaritet
            </h2>
            <p className="text-gray-600 mb-6">
              Ange en sökterm för att hitta forskningsartiklar om bipolär
              sjukdom och dess olika aspekter.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  name="search"
                  id="search"
                  aria-label="input för att söka forskningsartiklar"
                  placeholder="Skriv din sökterm här..."
                  className="primary-input !h-12 w-full"
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
                className="px-8 py-3 bg-primary-dark hover:bg-secondary-dark text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
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

      <div className="max-w-[1440px] w-full px-4 md:px-10 pb-4 md:pb-8">
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

        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {isMobileFiltersOpen && (
            <div className="md:hidden fixed inset-0 z-[120] bg-white overflow-y-auto">
              <div className="p-4 pb-16">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Filtrera artiklar</h2>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-2 text-gray-500"
                  >
                    ✕
                  </button>
                </div>

                <ScienceExtentFilter
                  searchScope={searchScope}
                  handleLanguageFilterClick={handleLanguageFilterClick}
                />

                <div className="flex flex-col gap-4 pt-6">
                  <h3 className="font-medium text-primary-dark">
                    Publiceringsdatum
                  </h3>
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
                          onChange={(e) =>
                            handleYearsFilterChange(e.target.value)
                          }
                          className="w-4 h-4 text-primary-medium border-gray-300 rounded focus:ring-primary-medium"
                        />
                        <label htmlFor={tab.value} className="text-dark">
                          {tab.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {searchScope === 'swedish' && (
                  <div className="space-y-4 pt-6">
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
                  <FilterGroup
                    title="Kön"
                    filters={SEX_FILTERS}
                    selectedValues={[selectedSex]}
                    onChange={(id) => handleSexChange(id)}
                  />
                  <FilterGroup
                    title="Art"
                    filters={SPECIES_FILTERS}
                    selectedValues={[selectedSpecies]}
                    onChange={(id) => handleSpeciesChange(id)}
                  />
                  <ScienceArticleTypeFilter
                    activeFilters={activeFilters}
                    handleFilterChange={handleFilterChange}
                    setIsModalOpen={setIsModalOpen}
                  />
                  <ScienceAgesFilter
                    activeFilters={activeFilters}
                    handleFilterChange={handleFilterChange}
                    setIsModalOpen={setIsAgesModalOpen}
                  />
                </div>
              </div>
            </div>
          )}

          <aside className="hidden md:block bg-white p-6 rounded-lg shadow-md h-fit">
            <ScienceExtentFilter
              searchScope={searchScope}
              handleLanguageFilterClick={handleLanguageFilterClick}
            />

            <div className="flex flex-col gap-4 pt-6">
              <h3 className="font-medium text-primary-dark">
                Publiceringsdatum
              </h3>
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
                    <label htmlFor={tab.value} className="text-dark">
                      {tab.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {searchScope === 'swedish' && (
              <>
                <div className="space-y-4 pt-6">
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
              <FilterGroup
                title="Kön"
                filters={SEX_FILTERS}
                selectedValues={[selectedSex]}
                onChange={(id) => handleSexChange(id)}
              />
              <FilterGroup
                title="Art"
                filters={SPECIES_FILTERS}
                selectedValues={[selectedSpecies]}
                onChange={(id) => handleSpeciesChange(id)}
              />
              <ScienceArticleTypeFilter
                activeFilters={activeFilters}
                handleFilterChange={handleFilterChange}
                setIsModalOpen={setIsModalOpen}
              />
              <ScienceAgesFilter
                activeFilters={activeFilters}
                handleFilterChange={handleFilterChange}
                setIsModalOpen={setIsAgesModalOpen}
              />
            </div>
          </aside>

          <main className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex flex-col w-full">
              <div className="w-full space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
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
                    removeFilter={removeFilter}
                  />
                )}

                <div className="relative min-h-[600px] w-full">
                  {!isLoading && articles.length === 0 ? (
                    <div className="w-full text-center py-8 text-gray-600">
                      Inga artiklar hittades som matchar dina sökkriterier.
                    </div>
                  ) : (
                    <div className="space-y-4 w-full">
                      {articles.map((article) => (
                        <ScienceArticleContainer
                          key={article.id}
                          article={article}
                        />
                      ))}
                    </div>
                  )}
                  {isLoading && (
                    <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                      <Spinner />
                    </div>
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
      </div>

      {isModalOpen && (
        <ScienceModal
          activeFilters={activeFilters}
          handleFilterChange={handleModalFilterChange}
          setIsModalOpen={setIsModalOpen}
          setIsMobileFiltersOpen={setIsMobileFiltersOpen}
          FILTERS={PUBLICATION_TYPE_FILTERS}
        />
      )}
      {isAgesModalOpen && (
        <ScienceModal
          activeFilters={activeFilters}
          handleFilterChange={handleModalFilterChange}
          setIsModalOpen={setIsAgesModalOpen}
          setIsMobileFiltersOpen={setIsMobileFiltersOpen}
          FILTERS={AGE_FILTERS}
        />
      )}
    </section>
  );
};

export default ScienceArticles;
