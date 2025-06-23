import LinkWithArrow from '@/app/components/shared/links/LinkWithArrow';

interface LawFirmProps {
  name: string;
  description: string;
  link: string;
}

const LawFirm = ({ name, description, link }: LawFirmProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h5 className="font-semibold mb-2">{name}</h5>
      <p className="text-sm mb-2">{description}</p>
      <LinkWithArrow
        link={link}
        text={<>Besök {name}</>}
        color="primary"
        size="sm"
      />
    </div>
  );
};

export default LawFirm;
