import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface IProxyPreviewButtonProps {
  showPreview: boolean;
  handleClickOnPreviewButton: () => void;
}

const ProxyPreviewButton = ({
  showPreview,
  handleClickOnPreviewButton,
}: IProxyPreviewButtonProps) => {
  return (
    <button
      onClick={handleClickOnPreviewButton}
      className="primary-button flex items-center gap-2"
    >
      {showPreview ? (
        <>
          <FaEyeSlash className="text-lg" />
          Dölj förhandsvisning
        </>
      ) : (
        <>
          <FaEye className="text-lg" />
          Visa förhandsvisning
        </>
      )}
    </button>
  );
};

export default ProxyPreviewButton;
