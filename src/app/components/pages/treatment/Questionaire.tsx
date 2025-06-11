import { IToolForm } from '@/app/types/tools/tools';
import { HiDownload, HiEye, HiInformationCircle } from 'react-icons/hi';

interface IQuestionaireProps {
  form: IToolForm;
  setActiveModal: (id: string) => void;
}

const Questionaire = ({ form, setActiveModal }: IQuestionaireProps) => {
  return (
    <div
      key={form.scoringId}
      className="flex flex-col h-full p-4 rounded-lg border border-gray-100 hover:border-primary-border transition-colors duration-200"
    >
      <div className="flex flex-col lg:flex-row items-start justify-between mb-3 gap-3">
        <h3 className="text-primary-dark font-semibold">{form.title}</h3>
        {form.scoringId && (
          <button
            onClick={() => setActiveModal(form.scoringId)}
            className="flex items-center gap-2 text-primary-accent hover:text-primary-dark transition-colors px-3 py-1 rounded-full border border-primary-border hover:bg-primary-light"
            aria-label={`Visa poängsystem för ${form.title}`}
          >
            <HiInformationCircle className="text-xl" aria-hidden="true" />
            <span className="text-sm">Poängsystem</span>
          </button>
        )}
      </div>
      <p className="text-primary-accent text-sm mb-6 flex-grow">
        {form.description}
      </p>
      <div className="flex flex-col lg:flex-row gap-3 mt-auto">
        <a
          href={`${form.href}?download=true"`}
          download
          className="questionare-download-button"
          aria-label={form.ariaLabelDownload}
        >
          <HiDownload className="text-xl" aria-hidden="true" />
          <span className="text-sm md:text-base lg:text-lg">Ladda ner</span>
        </a>
        <a
          href={`${form.href}#view`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${form.ariaLabelOpen}`}
          className="questionare-view-button"
        >
          <HiEye className="text-xl" aria-hidden="true" />
          <span className="text-sm md:text-base lg:text-lg">Visa formulär</span>
        </a>
      </div>
    </div>
  );
};

export default Questionaire;
