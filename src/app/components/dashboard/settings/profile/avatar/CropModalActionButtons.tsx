interface ICropModalActionButtons {
  handleCropCancel: () => void;
  handleCropComplete: () => void;
}

const CropModalActionButtons = ({
  handleCropCancel,
  handleCropComplete,
}: ICropModalActionButtons) => {
  return (
    <div className="flex justify-end space-x-3">
      <button onClick={handleCropCancel} className="abort-button">
        Avbryt
      </button>
      <button onClick={handleCropComplete} className="primary-button">
        Spara
      </button>
    </div>
  );
};

export default CropModalActionButtons;
