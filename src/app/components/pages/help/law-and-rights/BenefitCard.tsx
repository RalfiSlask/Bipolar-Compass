import LinkWithArrow from '@/app/components/shared/links/LinkWithArrow';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText?: string;
}

const BenefitCard = ({
  icon,
  title,
  description,
  link,
  linkText = 'Läs mer',
}: BenefitCardProps) => (
  <div className="bg-tertiary-light rounded-lg p-6 flex flex-col items-center text-center shadow-md justify-between">
    {icon}
    <h4 className="font-semibold text-lg text-tertiary-dark mb-2">{title}</h4>
    <p className="text-tertiary-dark text-base mb-4">{description}</p>
    <LinkWithArrow link={link} text={linkText} color="tertiary" />
  </div>
);

export default BenefitCard;
