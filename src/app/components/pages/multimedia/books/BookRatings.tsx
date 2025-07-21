import { IBook } from '@/app/types/api/googleBookTypes';
import { renderStarsFromRating } from '@/app/utils/bookUtils';

interface IBookRatingsProps {
  volumeInfo: IBook['volumeInfo'];
}

const BookRatings = ({ volumeInfo }: IBookRatingsProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {renderStarsFromRating(volumeInfo?.averageRating || 0)}
      </div>
      {volumeInfo?.averageRating ? (
        <span>
          {volumeInfo.averageRating.toFixed(1)}
          {volumeInfo.ratingsCount && (
            <span className="ml-1">({volumeInfo.ratingsCount} betyg)</span>
          )}
        </span>
      ) : (
        <span className="text-sm">(Inga betyg ännu)</span>
      )}
    </div>
  );
};

export default BookRatings;
