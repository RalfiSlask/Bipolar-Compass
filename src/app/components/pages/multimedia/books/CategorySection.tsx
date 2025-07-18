'use client';

import Spinner from '@/app/components/shared/Spinner';
import {
  IBook,
  ICategoryBooks,
  Language,
} from '@/app/types/api/googleBookTypes';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { memo, useCallback } from 'react';
import BookCard from './BookCard';
import CarouselChevrons from './CarouselChevrons';

interface ICategorySectionProps {
  categoryData: ICategoryBooks;
  isLoadingCategory: boolean;
  categoryIndex: number;
  language?: Language;
}

const CategorySection = memo(
  ({
    categoryData,
    isLoadingCategory,
    categoryIndex,
  }: ICategorySectionProps) => {
    const { category } = categoryData;
    const [emblaRef, emblaApi] = useEmblaCarousel({
      align: 'start',
      containScroll: 'trimSnaps',
      slidesToScroll: 1,
    });

    const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
      <div
        key={categoryIndex}
        className="bg-primary-light/50 rounded-lg p-6 relative border shadow-md border-primary-light"
      >
        {isLoadingCategory && <Spinner />}

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-center justify-between mb-4 border-b border-primary-dark/30 pb-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <h2 className="text-2xl font-semibold text-primary-dark">
              {category.label}
            </h2>
            <Link
              className="nav-link font-normal text-primary-dark"
              href={`/multimedia/bocker/kategori/${category.slug}`}
            >
              Se alla
            </Link>
          </div>
          <CarouselChevrons scrollPrev={scrollPrev} scrollNext={scrollNext} />
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {categoryData.books.map((book: IBook, bookIndex: number) => (
              <div
                key={`${category.id}-${book.id || bookIndex}`}
                className="flex-[0_0_200px] min-w-0"
              >
                <BookCard
                  book={book}
                  categoryId={category.id}
                  categoryName={category.name}
                  bookIndex={bookIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

// When we use memo, we give it a name so that we can see it in the React Dev Tools
CategorySection.displayName = 'CategorySection';

export default CategorySection;
