import { ColorType } from '@/app/types/colorTypes';
import { IAuthority } from '@/app/types/help/authorities';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBuilding,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGlobe,
  FaPhone,
} from 'react-icons/fa';

interface IAuthorityCardProps {
  authority: IAuthority;
  type?: ColorType;
}

const AuthorityCard = ({
  authority,
  type = 'primary',
}: IAuthorityCardProps) => {
  const {
    name,
    description,
    website,
    phone,
    email,
    contact,
    services,
    image,
    logoAttribution,
  } = authority;

  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-md border-2 border-${type}-light/60`}
    >
      <div className="flex flex-col gap-6">
        {image ? (
          <div className="flex-shrink-0 w-full lg:w-48 h-32 relative rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={`${name} logotyp`}
              width={192}
              height={192}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallbackIcon = document.createElement('div');
                  fallbackIcon.className = `w-full h-full flex items-center justify-center bg-${type}-light/40 rounded-lg`;
                  fallbackIcon.innerHTML = `<svg class="w-16 h-16 text-${type}-dark" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/></svg>`;
                  parent.appendChild(fallbackIcon);
                }
              }}
            />
            {logoAttribution && (
              <div className="absolute bottom-1 right-1 bg-white/90 px-2 py-1 rounded text-xs text-gray-600">
                {logoAttribution}
              </div>
            )}
          </div>
        ) : (
          <div
            className={`flex-shrink-0 w-full lg:w-48 h-32 bg-${type}-light/40 rounded-lg flex items-center justify-center`}
          >
            <FaBuilding className={`w-16 h-16 text-${type}-dark`} />
          </div>
        )}

        <div className="flex-1">
          <h3 className={`text-xl font-bold text-${type}-dark mb-2`}>{name}</h3>

          <p className={`text-${type}-dark mb-4 leading-relaxed`}>
            {description}
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            {website && (
              <Link
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-${type}-dark hover:text-${type}-accent transition-colors duration-200`}
              >
                <FaGlobe className="w-4 h-4" />
                <span className="text-sm">Officiell webbplats</span>
                <FaExternalLinkAlt className="w-3 h-3" />
              </Link>
            )}

            {phone && (
              <a
                href={`tel:${phone}`}
                className={`flex items-center gap-2 text-${type}-dark hover:text-${type}-accent transition-colors duration-200`}
              >
                <FaPhone className="w-4 h-4" />
                <span className="text-sm">{phone}</span>
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className={`flex items-center gap-2 text-${type}-dark hover:text-${type}-accent transition-colors duration-200`}
              >
                <FaEnvelope className="w-4 h-4" />
                <span className="text-sm">{email}</span>
              </a>
            )}
            {contact && (
              <a
                href={contact}
                className={`flex items-center gap-2 text-${type}-dark hover:text-${type}-accent transition-colors duration-200`}
              >
                <FaGlobe className="w-4 h-4" />
                <span className="text-sm">{contact}</span>
              </a>
            )}
          </div>

          <div>
            <h4 className={`font-semibold text-${type}-dark mb-3`}>
              Vad kan de hjälpa dig med:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`bg-${type}-light/40 rounded-lg p-3 border border-${type}-light/60`}
                >
                  <h5 className={`font-medium text-${type}-dark text-sm mb-1`}>
                    {service.title}
                  </h5>
                  <p className={`text-${type}-dark text-xs leading-relaxed`}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityCard;
