import { ColorType } from '@/app/types/colorTypes';
import { IBank } from '@/app/types/help/economic';
import { FaExternalLinkAlt, FaGlobe, FaPhone } from 'react-icons/fa';

interface IBankContactProps {
  bank: IBank;
  type: ColorType;
}

const BankContact = ({ bank, type }: IBankContactProps) => {
  const { title, website, phone } = bank;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-center">
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className={`logo-website-link text-${type}-dark hover:text-${type}-accent`}
          >
            <FaGlobe className="w-4 h-4" />
            <span className="text-sm">
              Fullmakter
              <>
                <span className="sr-only">för {title}</span>
              </>
            </span>
            <FaExternalLinkAlt className="w-4 h-4" />
          </a>
        )}

        {phone && (
          <a
            href={`tel:${phone}`}
            className={`logo-website-link text-${type}-dark hover:text-${type}-accent `}
          >
            <FaPhone className="w-4 h-4" />
            <span>{phone}</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default BankContact;
