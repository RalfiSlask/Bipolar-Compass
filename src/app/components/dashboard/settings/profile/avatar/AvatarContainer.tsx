import Lightbox from '@/app/components/header/Lightbox';
import useSettingsContext from '@/app/hooks/useSettingsContext';
import useSidebarContext from '@/app/hooks/useSidebarContext';
import { getCroppedImg } from '@/app/utils/cropImage';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Cropper, { Area } from 'react-easy-crop';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import AvatarImage from './AvatarImage';
import AvatarModalActionButtons from './AvatarModalActionButtons';
import AvatarModalDisplay from './AvatarModalDisplay';
import CropModalActionButtons from './CropModalActionButtons';
import CropModalZoomControl from './CropModalZoomControl';

const AvatarContainer = () => {
  const context = useSettingsContext();
  const { isSidebarOpen } = useSidebarContext();
  const { user, saveProfileAvatar, deleteProfileAvatar } = context;
  const [tempImage, setTempImage] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // Create blob URL only when needed and clean it up properly
  const tempImageUrl = useMemo(() => {
    if (tempImage) {
      return URL.createObjectURL(tempImage);
    }
    return null;
  }, [tempImage]);

  // Cleanup blob URL when component unmounts or tempImage changes
  useEffect(() => {
    return () => {
      if (tempImageUrl) {
        URL.revokeObjectURL(tempImageUrl);
      }
    };
  }, [tempImageUrl]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTempImage(file);
      setShowModal(false);
      setShowCropModal(true);
    }
    event.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setTempImage(file);
      setShowModal(true);
    }
  };

  const handleAvatarClick = () => {
    setShowModal(true);
  };

  const handleDeleteImage = async () => {
    try {
      await deleteProfileAvatar();
      setShowModal(false);
      setTempImage(null);
      toast.success('Profilbild borttagen');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Ett fel uppstod vid borttagning av profilbilden');
    }
  };

  const handleEditImage = async () => {
    if (user?.profile?.avatarUrl) {
      try {
        const response = await fetch(user.profile.avatarUrl, {
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'Accept': 'image/*',
          },
          referrerPolicy: 'no-referrer',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const file = new File([blob], 'avatar.jpg', {
          type: blob.type || 'image/jpeg',
        });
        setTempImage(file);
        setShowModal(false);
        setShowCropModal(true);
      } catch (error) {
        console.error('Error fetching image:', error);
        toast.error('Kunde inte ladda bilden för redigering');
      }
    }
  };

  const handleAddImage = () => {
    document.getElementById('avatar-upload')?.click();
  };

  const handleCropCancel = () => {
    setTempImage(null);
    setShowCropModal(false);
    setShowModal(true);
  };

  const handleCropComplete = async () => {
    if (tempImage && croppedAreaPixels && tempImageUrl) {
      try {
        const croppedFile = await getCroppedImg(
          tempImageUrl,
          croppedAreaPixels
        );

        const formData = new FormData();
        formData.append('avatar', croppedFile);
        formData.append('email', user?.email || '');

        const uploadResponse = await fetch('/api/settings/upload/avatar', {
          method: 'POST',
          body: formData,
        });

        const { avatarUrl } = await uploadResponse.json();

        setTempImage(null);
        setShowCropModal(false);
        await saveProfileAvatar(avatarUrl);
        toast.success('Profilbild uppdaterad');
      } catch (error) {
        console.error('Error cropping image:', error);
        toast.error('Ett fel uppstod vid uppdatering av profilbilden');
      }
    }
  };

  const handleChangeOnZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(Number(e.target.value));
  };

  const handleCloseLightbox = () => {
    if (showCropModal) {
      handleCropCancel();
    } else {
      setShowModal(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-3">
        <div
          className={`relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full border-2 transition-all duration-300 cursor-pointer group ${
            dragOver
              ? 'border-primary-accent border-dashed bg-primary-light shadow-lg scale-105'
              : 'border-primary-border hover:border-primary-medium hover:shadow-md'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleAvatarClick}
        >
          <AvatarImage avatarUrl={user?.profile?.avatarUrl || ''} />
        </div>
        <input
          id="avatar-upload"
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {(showModal || showCropModal) && (
        <Lightbox onClose={handleCloseLightbox} />
      )}

      {showModal &&
        createPortal(
          <div className="avatar-modal fixed inset-0 flex items-start z-50 justify-center pt-32 pointer-events-none">
            <div className="bg-dark rounded-lg p-6 max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl w-full mx-4 pointer-events-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-medium">
                  Profilbild
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <IoClose className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              </div>
              <AvatarModalDisplay avatarUrl={user?.profile?.avatarUrl || ''} />
              <div className="border-t border-gray-600 pt-4 sm:pt-6">
                <AvatarModalActionButtons
                  handleDeleteImage={handleDeleteImage}
                  handleEditImage={handleEditImage}
                  handleAddImage={handleAddImage}
                  avatarUrl={user?.profile?.avatarUrl || ''}
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      {showCropModal &&
        tempImage &&
        tempImageUrl &&
        createPortal(
          <div className="crop-modal fixed inset-0 z-50 flex items-start pt-20 justify-center pointer-events-none">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto pointer-events-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-primary-dark text-lg font-medium">
                  Redigera bild
                </h3>
                <button
                  onClick={handleCropCancel}
                  className="text-primary-dark"
                >
                  <IoClose className="w-6 h-6" />
                </button>
              </div>
              <div className="relative h-96 mb-6">
                <Cropper
                  image={tempImageUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, croppedAreaPixels) => {
                    setCroppedAreaPixels(croppedAreaPixels);
                  }}
                />
              </div>
              <CropModalZoomControl
                zoom={zoom}
                handleChangeOnZoom={handleChangeOnZoom}
              />
              <CropModalActionButtons
                handleCropCancel={handleCropCancel}
                handleCropComplete={handleCropComplete}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default AvatarContainer;
