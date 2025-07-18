import Link from 'next/link';
import { useState } from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import EraseAccountModal from './EraseAccountModal';

const SecuritySettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className="max-w-2xl p-4 sm:p-6 pb-16 flex flex-col items-center gap-10"
      aria-labelledby="security-heading"
    >
      {isModalOpen && <EraseAccountModal toggleModal={toggleModal} />}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-50"></div>
      )}
      <div className="flex flex-col gap-3 text-center">
        <h2
          id="security-heading"
          className="text-3xl font-semibold text-primary-dark"
        >
          Säkerhet
        </h2>
        <p className="text-sm text-gray-600">
          Inställningar för att hålla din information säker.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col shadow-sm border rounded-lg">
          <ChangePasswordForm />
          <p className="text-center text-sm mt-4 hover:text-primary-dark duration-200 transition-colors my-4">
            <Link href="/konto/glomt-losenord" className="font-medium ">
              Har du glömt ditt lösenord?
            </Link>
          </p>
        </div>
        <div className="p-6 border bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Ta bort konto</h3>
          <div className="flex flex-col gap-4">
            <p className="text-gray-600">
              Enligt GDPR har du rätt att ta bort ditt konto och all tillhörande
              data. Detta är en permanent åtgärd och kan inte ångras. All din
              personliga information och dina sparade inställningar kommer att
              raderas från våra system.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              aria-label="Öppna dialog för att ta bort konto"
            >
              Ta bort mitt konto
            </button>
          </div>
          {isModalOpen && <EraseAccountModal toggleModal={toggleModal} />}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
