import { IContactCard } from '@/app/types/general';
import { shortenUrl } from '@/app/utils/textUtils';
import { FaGlobe } from 'react-icons/fa';

interface ContactCardProps {
  contact: IContactCard;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  const { icon, title, description, website } = contact;

  const websiteText = website ? shortenUrl(website) : null;

  const IconComponent = icon;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border-2 border-primary-light">
      <div className="flex items-start gap-4">
        <div className="bg-primary-dark text-white p-3 rounded-full">
          <IconComponent />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg text-primary-dark mb-2">{title}</h4>
          <p className="text-primary-dark mb-3">{description}</p>
          {website ? (
            <a
              href={website}
              className="inline-flex items-center gap-2 font-medium text-sm text-primary-dark hover:text-secondary-dark nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobe className="text-xs" />
              {websiteText}
            </a>
          ) : (
            <p className="text-primary-dark text-sm font-medium">
              Kontakta din kommun direkt
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
