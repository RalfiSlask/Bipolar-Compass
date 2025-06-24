import { ColorType } from '@/app/types/colorTypes';

interface IQuickGuideCardProps {
  title: string;
  description: string;
  contacts: string[];
  type: ColorType;
}

const QuickGuideCard = ({
  title,
  description,
  contacts,
  type,
}: IQuickGuideCardProps) => {
  return (
    <div
      className={`bg-${type}-light border text-${type}-dark border-${type}-dark rounded-lg p-4 sm:p-6 shadow-md`}
    >
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <p className={`mb-4 text-${type}-dark`}>{description}</p>
      <div className="text-sm">
        <p className={`font-semibold mb-2 text-${type}-dark`}>
          Kontakta: <span className="sr-only">{title}</span>
        </p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          {contacts.map((contact, index) => (
            <li key={index}>{contact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuickGuideCard;
