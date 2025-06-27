import { FaFileAlt, FaFilePdf, FaFileWord } from 'react-icons/fa';

interface IProxyDownloadButtonsProps {
  handleProxyDownload: (format: 'txt' | 'pdf' | 'docx') => void;
}

const ProxyDownloadButtons = ({
  handleProxyDownload,
}: IProxyDownloadButtonsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-semibold text-lg">Ladda ner mallen:</h4>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleProxyDownload('txt')}
          className="flex items-center gap-2 bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors"
        >
          <FaFileAlt />
          TXT
        </button>
        <button
          onClick={() => handleProxyDownload('pdf')}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <FaFilePdf />
          PDF
        </button>
        <button
          onClick={() => handleProxyDownload('docx')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaFileWord />
          Word
        </button>
      </div>
    </div>
  );
};

export default ProxyDownloadButtons;
