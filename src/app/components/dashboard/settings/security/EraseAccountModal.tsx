import useSettingsContext from '@/app/hooks/useSettingsContext';
import useSidebarContext from '@/app/hooks/useSidebarContext';
import { signOut } from 'next-auth/react';

interface IEraseAccountModalProps {
  email: string;
  toggleModal: () => void;
}

const EraseAccountModal = ({ email, toggleModal }: IEraseAccountModalProps) => {
  const { deleteAccount } = useSettingsContext();
  const { isSidebarOpen } = useSidebarContext();

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
    <div
      className={`flex flex-col text-lg justify-center items-center ${
        isSidebarOpen ? 'translate-x-[calc(-50%+130px)]' : '-translate-x-1/2'
      } gap-6 absolute top-1/2 left-1/2 transform -translate-y-1/2 z-30 bg-white p-8 rounded-lg transition-transform duration-300 ease-in-out`}
    >
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
