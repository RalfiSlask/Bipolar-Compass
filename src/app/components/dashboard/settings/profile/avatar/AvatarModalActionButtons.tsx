import { FiCamera, FiTrash2 } from 'react-icons/fi';
import { HiPencil } from 'react-icons/hi2';

interface IAvatarModalActionButtons {
  handleEditImage: () => void;
  handleAddImage: () => void;
  handleDeleteImage: () => void;
  avatarUrl: string;
}

const AvatarModalActionButtons = ({
  handleEditImage,
  handleAddImage,
  handleDeleteImage,
  avatarUrl,
}: IAvatarModalActionButtons) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-4">
        {avatarUrl && (
          <button
            onClick={handleEditImage}
            className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
          >
            <HiPencil className="w-6 h-6 sm:w-7 sm:h-7 mb-1" />
            <span className="text-xs sm:text-sm">Redigera</span>
          </button>
        )}

        <button
          onClick={handleAddImage}
          className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
        >
          <FiCamera className="w-6 h-6 sm:w-7 sm:h-7 mb-1" />
          <span className="text-xs sm:text-sm">Lägg till bild</span>
        </button>
      </div>

      {avatarUrl && (
        <button
          onClick={handleDeleteImage}
          className="flex flex-col items-center text-red-400 hover:text-red-300 transition-colors"
        >
          <FiTrash2 className="w-6 h-6 sm:w-7 sm:h-7 mb-1" />
          <span className="text-xs sm:text-sm">Radera</span>
        </button>
      )}
    </div>
  );
};

export default AvatarModalActionButtons;
