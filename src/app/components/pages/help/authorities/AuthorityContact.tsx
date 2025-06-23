import { ColorType } from '@/app/types/colorTypes';
import Link from 'next/link';
import {
  FaEnvelope,
  FaExternalLinkAlt,
  FaGlobe,
  FaPhone,
} from 'react-icons/fa';

interface IAuthorityContactProps {
  title: string;
  website: string;
  phone: string;
  email: string;
  contact: string;
  type: ColorType;
}

const AuthorityContact = ({
  title,
  website,
  phone,
  email,
  contact,
  type,
}: IAuthorityContactProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-center">
        {website && (
          <Link
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className={`authority-link text-${type}-dark hover:text-${type}-accent`}
          >
            <FaGlobe className="w-4 h-4" />
            <span className="text-sm">
              Officiell webbplats
              <>
                <span className="sr-only">för {title}</span>
              </>
            </span>
            <FaExternalLinkAlt className="w-4 h-4" />
          </Link>
        )}

        {phone && (
          <a
            href={`tel:${phone}`}
            className={`authority-link text-${type}-dark hover:text-${type}-accent `}
          >
            <FaPhone className="w-4 h-4" />
            <span>{phone}</span>
          </a>
        )}
      </div>

      {email && (
        <a
          href={`mailto:${email}`}
          className={`authority-link text-${type}-dark hover:text-${type}-accent`}
        >
          <FaEnvelope className="w-4 h-4" />
          <span>{email}</span>
        </a>
      )}
      {contact && (
        <a
          href={contact}
          className={`authority-link text-${type}-dark hover:text-${type}-accent`}
        >
          <FaGlobe className="w-4 h-4" />
          <span>{contact}</span>
        </a>
      )}
    </div>
  );
};

export default AuthorityContact;
