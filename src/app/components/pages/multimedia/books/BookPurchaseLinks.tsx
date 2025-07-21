'use client';

import { IBook } from '@/app/types/api/googleBookTypes';
import { generateBookLinkFromISBN } from '@/app/utils/bookUtils';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

const AKADEMI_BOKHANDLEN_SEARCH_URL =
  'https://www.akademibokhandeln.se/sok?sokfraga=';
const ADLIBRIS_SEARCH_URL = 'https://www.adlibris.com/se/sok?q=';
const BOKUS_SEARCH_URL =
  'https://www.bokus.com/cgi-bin/product_search.cgi?search_word=';

interface IBookPurchaseLinksProps {
  book: IBook;
  isbn: string;
}

const BookPurchaseLinks = ({ book, isbn }: IBookPurchaseLinksProps) => {
  const links = {
    googleBooks: book.volumeInfo.infoLink || book.volumeInfo.previewLink,
    adlibris: generateBookLinkFromISBN(isbn, ADLIBRIS_SEARCH_URL),
    bokus: generateBookLinkFromISBN(isbn, BOKUS_SEARCH_URL),
    akademibokhandeln: generateBookLinkFromISBN(
      isbn,
      AKADEMI_BOKHANDLEN_SEARCH_URL
    ),
  };

  const canYouBuyOnGoogle =
    links.googleBooks && book.saleInfo?.saleability !== 'NOT_FOR_SALE';

  return (
    <div>
      <h3 className="font-semibold mb-2 text-primary-dark">Köp boken</h3>
      <ul className="flex flex-wrap gap-3">
        {canYouBuyOnGoogle && (
          <li className="flex justify-center items-center gap-1 px-4 py-1 rounded-lg border border-dark hover:bg-primary-light transition-colors">
            <a
              href={links.googleBooks}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              <FcGoogle /> Google Books
            </a>
          </li>
        )}
        <li className="flex justify-center items-center gap-1 px-4 py-1 text-white border border-[#D60D0D] rounded-lg bg-[#D60D0D] hover:bg-[#D60D0D]/80 transition-colors">
          <a
            href={links.adlibris}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Adlibris"
            className="inline-flex items-center gap-1"
          >
            <div className="w-20 h-8">
              <svg
                className="adlibris-logo-svg"
                width="100%"
                height="100%"
                viewBox="0 0 136 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="a"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="1"
                  width="136"
                  height="33"
                  style={{ maskType: 'luminance' }}
                >
                  <path d="M0 1.527h136v28.475H0V1.527Z" fill="#fff"></path>
                </mask>
                <g mask="url(#a)">
                  <path
                    d="M68.114 21.495c0 2.702-.991 4.085-2.908 4.085-.925 0-1.52-.263-2.247-.988V13.524c.66-.626 1.388-.922 2.313-.922 1.85 0 2.842 1.35 2.842 3.92v4.974Zm-.628-12.978c-2.115 0-3.668 1.055-4.461 2.932V3.774h-5.552v25.364h2.446l2.148-3.393c.562 2.57 2.28 3.92 4.957 3.92 4.262 0 6.576-3.723 6.576-10.607 0-7.016-2.05-10.54-6.114-10.54ZM54.83 4.663c0 1.845-1.19 2.866-3.305 2.866-2.148 0-3.338-1.02-3.338-2.866 0-1.778 1.223-2.8 3.338-2.8s3.305 1.022 3.305 2.8ZM85.199 8.55c.43 0 .892.033 1.255.132v5.699c-.495-.198-1.19-.33-1.883-.33-1.421 0-2.644.56-3.206 1.417v13.67H75.88V8.946h2.61l2.644 4.051v-.066c0-2.865 1.421-4.38 4.065-4.38Zm9.285-3.887c0 1.845-1.156 2.866-3.271 2.866-2.148 0-3.338-1.02-3.338-2.866 0-1.778 1.223-2.8 3.338-2.8 2.082 0 3.272 1.022 3.272 2.8Zm-6.047 4.283h5.486v20.191h-5.486V8.946ZM31.268 24.592c-.727.725-1.322.988-2.247.988-1.917 0-2.908-1.383-2.908-4.084v-4.974c0-2.57.991-3.92 2.842-3.92.925 0 1.652.296 2.313.922v11.068Zm-.066-13.143c-.793-1.877-2.346-2.932-4.461-2.932-4.065 0-6.114 3.525-6.114 10.541 0 6.884 2.314 10.607 6.576 10.607 2.677 0 4.395-1.35 4.957-3.92l2.148 3.393h2.446V3.774h-5.552v7.675Zm79.739 11.825c0 3.887-2.809 6.358-7.237 6.358-4.46 0-7.468-2.076-7.865-5.435l4.99-.89c.232 1.417 1.289 2.273 2.743 2.273 1.355 0 2.247-.823 2.247-2.075 0-1.416-1.09-2.306-3.337-2.734-4.428-.758-6.345-2.57-6.345-5.995 0-3.69 3.007-6.259 7.369-6.259 4.197 0 7.039 2.142 7.303 5.501l-4.99.89c-.033-1.384-.958-2.339-2.28-2.339-1.388 0-2.214.692-2.214 1.877 0 1.153.859 1.746 3.503 2.405 4.362 1.054 6.113 2.899 6.113 6.423Zm-70.916-19.5h5.519v25.364h-5.519V3.774ZM7.74 20.376l1.62-6.588.595-3.294.594 3.294 1.454 6.588H7.74ZM6.814 6.08.205 29.138h5.287l1.19-4.48h6.345l1.09 4.48h6.015L13.985 6.08h-7.17ZM48.75 8.946h5.486v20.191h-5.486V8.946Zm83.679 9.284a8.404 8.404 0 0 0-5.891 2.398 8.404 8.404 0 0 0-5.891-2.398V5.65c2.293 0 4.373.914 5.891 2.398a8.403 8.403 0 0 1 5.891-2.398V18.23ZM117.279 2.292v18.456l8.416 8.39h1.684l8.416-8.39V2.292h-18.516Z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
          </a>
        </li>
        <li className="flex justify-center items-center gap-1 px-4 py-1 bg-[#EB5D0C] text-white rounded-lg border border-orange-700 hover:bg-orange-700 hover:text-white transition-colors">
          <a
            href={links.bokus}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1"
          >
            <Image
              src="/images/multimedia/books/bokus.png"
              alt=""
              width={20}
              height={20}
              className="rounded-full"
            />
            Bokus
          </a>
        </li>
        <li className="px-4 py-1 text-dark rounded-lg border border-dark hover:bg-primary-light transition-colors flex justify-center items-center">
          <a
            href={links.akademibokhandeln}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1"
          >
            <Image
              src="/images/multimedia/books/akademi-bokhandeln.png"
              alt=""
              width={30}
              height={30}
              className="rounded-full"
            />
            Akademibokhandeln
          </a>
        </li>
      </ul>
    </div>
  );
};

export default BookPurchaseLinks;
