import { FaFileAlt, FaFilePdf, FaFileWord } from 'react-icons/fa';

interface ITemplateDownloadButtonsProps {
  handleDownload: (format: 'txt' | 'pdf' | 'docx') => void;
  title?: string;
}

const TemplateDownloadButtons = ({
  handleDownload,
  title = 'Ladda ner mallen:',
}: ITemplateDownloadButtonsProps) => {
  return (
    <div className="flex flex-col md:items-center gap-3">
      <h4 className="font-semibold text-primary-dark text-lg">{title}</h4>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleDownload('txt')}
          className="flex items-center gap-2 bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors"
        >
          <FaFileAlt />
          TXT
        </button>
        <button
          onClick={() => handleDownload('pdf')}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <FaFilePdf />
          PDF
        </button>
        <button
          onClick={() => handleDownload('docx')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaFileWord />
          Word
        </button>
      </div>
    </div>
  );
};

export default TemplateDownloadButtons;
