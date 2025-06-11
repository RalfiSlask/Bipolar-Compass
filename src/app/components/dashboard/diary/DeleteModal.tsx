import useSidebarContext from '@/app/hooks/useSidebarContext';
import { createPortal } from 'react-dom';

interface IDeleteModalProps {
  deleteDiaryEntry: () => void;
  closeDeleteModal: () => void;
}

const DeleteModal = ({
  deleteDiaryEntry,
  closeDeleteModal,
}: IDeleteModalProps) => {
  const { isSidebarOpen } = useSidebarContext();

  return (
    <>
      {createPortal(
        <div
          className={`flex flex-col z-50 text-lg justify-center items-center gap-6 absolute top-1/3 left-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out bg-white p-8 rounded-lg shadow-lg ${
            isSidebarOpen
              ? 'translate-x-[calc(-50%+130px)]'
              : '-translate-x-1/2'
          }`}
        >
          <div className="flex flex-col text-center">
            <h2 className="h-sm font-semibold">
              Är du säker på att du vill ta bort detta dagboksinlägg?
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Detta är en permanent åtgärd och kan inte ångras.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                deleteDiaryEntry();
                closeDeleteModal();
              }}
              className="primary-button py-1"
            >
              Ja
            </button>
            <button
              onClick={closeDeleteModal}
              className="secondary-button py-1"
            >
              Nej
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default DeleteModal;
