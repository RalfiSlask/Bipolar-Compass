import { getSwedishCategoryLabel } from '@/app/utils/bookUtils';

interface IBookInfoCategoriesProps {
  categories: string[];
}

const BookInfoCategories = ({ categories }: IBookInfoCategoriesProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-primary-dark">Kategorier</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <span
            key={index}
            className="bg-primary-light text-primary-dark px-3 py-1 rounded-lg text-sm font-medium"
          >
            {getSwedishCategoryLabel(category)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BookInfoCategories;
