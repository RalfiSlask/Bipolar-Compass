import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface ITemplatePreviewButtonProps {
  showPreview: boolean;
  handleClick: () => void;
  title?: string;
}

const TemplatePreviewButton = ({
  showPreview,
  handleClick,
  title = 'Visa förhandsvisning',
}: ITemplatePreviewButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-56 gap-2 bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors"
    >
      {showPreview ? <FaEyeSlash /> : <FaEye />}
      {showPreview ? 'Dölj förhandsvisning' : title}
    </button>
  );
};

export default TemplatePreviewButton;
