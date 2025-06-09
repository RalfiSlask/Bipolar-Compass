import { IScoringInfo } from '@/app/types/documents';
import { useEffect } from 'react';

const ToolsModal = ({
  info,
  onClose,
}: {
  info: IScoringInfo;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[140]"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="fixed bg-white p-6 rounded-lg max-w-md w-[95%] sm:w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h4
          id="modal-title"
          className="text-xl font-semibold text-primary-dark mb-4"
        >
          {info.title}
        </h4>
        <ul className="flex flex-col gap-3 mb-6">
          {info.content.map((item: string, index: number) => (
            <li
              key={index}
              className="text-primary-accent flex items-start gap-2"
            >
              <span className="text-primary-dark">•</span>
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="w-full bg-primary-accent hover:bg-primary-dark text-white py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2"
        >
          Stäng
        </button>
      </div>
    </div>
  );
};

export default ToolsModal;
