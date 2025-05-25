import useSettingsContext from '@/app/hooks/useSettingsContext';
import { signOut } from 'next-auth/react';

interface IEraseAccountModalProps {
  email: string;
  toggleModal: () => void;
}

const EraseAccountModal = ({ email, toggleModal }: IEraseAccountModalProps) => {
  const { deleteAccount } = useSettingsContext();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Utloggning misslyckades:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!email) return;

    try {
      await deleteAccount(email);
      await handleSignOut();
    } catch (err) {
      console.error('could not delete account: ', err);
    }
    toggleModal();
  };

  return (
    <div className="flex flex-col text-lg justify-center items-center gap-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-white p-8 rounded-lg">
      <div className="flex flex-col text-center">
        <h2 className="h-sm font-semibold">
          Är du säker du vill ta bort ditt konto?
        </h2>
        <p className="text-gray-600 text-sm">
          Detta är en permanent åtgärd och kan inte ångras.
        </p>
      </div>
      <div className="flex gap-4">
        <button onClick={handleDeleteAccount} className="primary-button">
          Ja
        </button>
        <button onClick={toggleModal} className="tertiary-button">
          Nej
        </button>
      </div>
    </div>
  );
};

export default EraseAccountModal;
