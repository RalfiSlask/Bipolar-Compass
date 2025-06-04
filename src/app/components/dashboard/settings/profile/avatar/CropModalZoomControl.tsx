interface ICropModalZoomControl {
  zoom: number;
  handleChangeOnZoom: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CropModalZoomControl = ({
  zoom,
  handleChangeOnZoom,
}: ICropModalZoomControl) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-primary-dark mb-2">
        Zoom
      </label>
      <input
        type="range"
        min={1}
        max={3}
        step={0.1}
        value={zoom}
        onChange={handleChangeOnZoom}
        className="w-full"
      />
    </div>
  );
};

export default CropModalZoomControl;
