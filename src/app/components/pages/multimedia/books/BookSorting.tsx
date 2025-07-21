import CustomSelect from '@/app/components/shared/CustomSelectDropdown';
import { SORT_OPTIONS } from '@/app/data/multimedia/books';
import { SortOption } from '@/app/types/multimedia/books/sort';

interface IBookSortingProps {
  sortBy: SortOption;
  handleSortChange: (sortBy: SortOption) => void;
}

const BookSorting = ({ sortBy, handleSortChange }: IBookSortingProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Sortera efter:
      </label>
      <CustomSelect
        options={SORT_OPTIONS}
        value={sortBy}
        onChange={(value) => handleSortChange(value as SortOption)}
        name="sort"
        size="large"
      />
    </div>
  );
};

export default BookSorting;
