'use client';

import ScienceActiveFilters from '@/app/components/pages/science/ScienceActiveFilters';
import ScienceArticleContainer from '@/app/components/pages/science/ScienceArticleContainer';
import ScienceArticleTypeFilter from '@/app/components/pages/science/ScienceArticleTypeFilter';
import ScienceArticleTypesModal from '@/app/components/pages/science/ScienceArticleTypesModal';
import ScienceExtentFilter from '@/app/components/pages/science/ScienceExtentFilter';
import FilterGroup from '@/app/components/pages/science/ScienceFilterGroup';
import ScienceInstituteFilterGroup from '@/app/components/pages/science/ScienceInstituteFilterGroup';
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

      let searchQuery = `bipolar disorder[Title/Abstract]${affiliationQuery}${dateFilter}`;

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
        searchQuery += ` AND ${filter.value}`;
      });

      // Add attribute filters
      attributeFilters.forEach((filter) => {
        searchQuery += ` AND ${filter.value}`;
      });

      // Add type filters
      if (typeFilters.length > 0) {
        searchQuery += ` AND (${typeFilters.map((f) => f.value).join(' OR ')})`;
      }

      // Add language filter
      if (selectedLanguage) {
        const languageFilter = LANGUAGE_FILTERS.find(
          (l) => l.id === selectedLanguage
        );
        if (languageFilter) {
          searchQuery += ` AND ${languageFilter.value}`;
        }
      }

      try {
        // Add sort parameter to the search URL
        const sortParam = sortOrder
          ? `&sort=${sortOrder === 'newest' ? 'date_desc' : 'date_asc'}`
          : '';

        const searchUrl = `${BASE_URL}/esearch.fcgi?db=pubmed&term=${searchQuery}&retmode=json&retmax=${ARTICLES_PER_PAGE}&retstart=${
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
    <div className="flex gap-8 w-full">
      <aside className="w-64 flex flex-col gap-4">
        <ScienceExtentFilter
          searchScope={searchScope}
          handleLanguageFilterClick={handleLanguageFilterClick}
        />
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-gray-700">Publiceringsdatum</h3>
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
              />
              <label htmlFor={tab.value}>{tab.label}</label>
            </div>
          ))}
        </div>
        {searchScope === 'swedish' && (
          <>
            <ScienceInstituteFilterGroup
              label="Universitet"
              options={SWEDISH_UNIVERSITIES_FILTERS}
              value={selectedUniversity}
              onChange={handleInstituteChange}
              type="university"
            />

            <ScienceInstituteFilterGroup
              label="Sjukhus"
              options={SWEDISH_HOSPITALS_FILTERS}
              value={selectedHospital}
              onChange={handleInstituteChange}
              type="hospital"
            />
          </>
        )}
        <div className="flex flex-col gap-4">
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
          {isModalOpen && (
            <ScienceArticleTypesModal
              activeFilters={activeFilters}
              handleFilterChange={handleModalFilterChange}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </div>
      </aside>

      <section className="flex-1">
        <div className="flex flex-col items-center gap-4">
          <h2 className="h-md text-primary-dark">
            {searchScope === 'international'
              ? 'Internationella forskningsartiklar'
              : 'Svenska forskningsartiklar'}
          </h2>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500">
              {totalResults} artiklar hittade
            </div>

            {scienceActiveFilters.length > 0 && (
              <ScienceActiveFilters
                ScienceActiveFilters={scienceActiveFilters}
                clearAllFilters={clearAllFilters}
              />
            )}
          </div>
          <ScienceSortFilter
            handleSortChange={handleSortChange}
            sortOrder={sortOrder || 'newest'}
          />
          <div className="max-w-[600px] relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/40 flex items-start justify-center pt-8 z-10">
                <Spinner />
              </div>
            )}

            {articles.map((article) => (
              <ScienceArticleContainer key={article.id} article={article} />
            ))}
          </div>
        </div>

        {!isLoading && articles.length > 0 && (
          <SciencePagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  );
};

export default ScienceArticles;
