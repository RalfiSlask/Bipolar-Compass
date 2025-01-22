interface IDeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  medicineName: string;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  medicineName,
}: IDeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 mx-4">
          <h2
            id="modal-title"
            className="text-xl font-semibold text-gray-900 mb-4"
          >
            Ta bort medicin
          </h2>
          <p className="text-gray-600 mb-6">
            Är du säker på att du vill ta bort {medicineName || 'denna medicin'}
            ? Detta går inte att ångra.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Avbryt
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              autoFocus
            >
              Ta bort
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;
