import { IBook } from '@/app/types/api/googleBookTypes';
import { getLanguageName } from '@/app/utils/localeUtils';

interface IBookInfoProps {
  volumeInfo: IBook['volumeInfo'];
  isbn: string;
}

const BookInfo = ({ volumeInfo, isbn }: IBookInfoProps) => {
  return (
    <div className="flex flex-col lg:flex-row max-w-2xl lg:justify-between border border-primary-dark/30 p-4">
      <div>
        <div className="book-info-container">
          <div>
            <div>ISBN</div>
            <p className="font-medium">{isbn}</p>
          </div>
          <div>
            <div>Sidor</div>
            <p>{volumeInfo.pageCount}</p>
          </div>
          <div>
            <div>Publicerad</div>
            <p>{volumeInfo.publishedDate}</p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block border-l border-primary-dark/30 w-[1px] h-full"></div>
      <div className="book-info-container">
        <div>
          <div>Förlag</div>
          <p>{volumeInfo.publisher}</p>
        </div>
        <div>
          <div>Språk</div>
          <p>{getLanguageName(volumeInfo.language || '')}</p>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
