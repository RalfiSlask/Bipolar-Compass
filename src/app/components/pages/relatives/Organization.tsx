import Image from 'next/image';

interface IOrganization {
  href: string;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface IOrganizationProps {
  organization: IOrganization;
}

const Organization = ({ organization }: IOrganizationProps) => {
  const { href, src, alt, title, description } = organization;

  return (
    <li className="group organization-container">
      <a href={href}>
        <div className="h-16 flex items-center">
          <Image
            src={src}
            alt={alt}
            width={160}
            height={40}
            className="object-contain max-w-[160px] w-full rounded-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h4 className="text-lg font-semibold text-primary-dark group-hover:text-primary-accent transition-colors duration-300">
          {title}
        </h4>
        <p className="flex-grow text-secondary-dark/90">{description}</p>
      </a>
    </li>
  );
};

export default Organization;
