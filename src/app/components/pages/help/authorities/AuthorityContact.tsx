import { ColorType } from '@/app/types/colorTypes';
import { IAuthority } from '@/app/types/help/authorities';
import {
  FaEnvelope,
  FaExternalLinkAlt,
  FaGlobe,
  FaPhone,
} from 'react-icons/fa';

interface IAuthorityContactProps {
  authority: IAuthority;
  type: ColorType;
}

const AuthorityContact = ({ authority, type }: IAuthorityContactProps) => {
  const { title, website, phone, email, contact } = authority;

  return (
    <div className="flex flex-col gap-4 mb-6">
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
              Officiell webbplats
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
          className={`authority-link text-${type}-dark hover:text-${type}-accent break-words`}
        >
          <FaGlobe className="w-4 h-4" />
          <span>{contact}</span>
        </a>
      )}
    </div>
  );
};

export default AuthorityContact;
