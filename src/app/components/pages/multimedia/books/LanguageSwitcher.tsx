import { Language } from '@/app/types/api/googleBookTypes';

interface ILanguageSwitcherProps {
  language: Language;
  handleLanguageChange: (language: Language) => void;
  isInitialLoading: boolean;
}

const LanguageSwitcher = ({
  language,
  handleLanguageChange,
  isInitialLoading,
}: ILanguageSwitcherProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Språk:
      </label>
      <div className="flex gap-4">
        <button
          onClick={() => handleLanguageChange('all')}
          disabled={isInitialLoading}
          className={`px-4 py-2 rounded transition-colors ${
            language === 'all'
              ? 'bg-primary-dark text-white'
              : 'bg-white border border-primary-border text-primary-dark hover:bg-primary-light'
          } ${isInitialLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Alla
        </button>
        <button
          onClick={() => handleLanguageChange('en')}
          disabled={isInitialLoading}
          className={`px-4 py-2 rounded transition-colors ${
            language === 'en'
              ? 'bg-primary-dark text-white'
              : 'bg-white border border-primary-border text-primary-dark hover:bg-primary-light'
          } ${isInitialLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Engelska
        </button>
        <button
          onClick={() => handleLanguageChange('sv')}
          disabled={isInitialLoading}
          className={`px-4 py-2 rounded transition-colors ${
            language === 'sv'
              ? 'bg-primary-dark text-white'
              : 'bg-white border border-primary-border text-primary-dark hover:bg-primary-light'
          } ${isInitialLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Svenska
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
