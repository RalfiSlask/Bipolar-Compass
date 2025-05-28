import Link from 'next/link';

const VerficationMessage = () => {
  return (
    <div className="bg-yellow-100 p-4 rounded mt-4 text-center w-fit mb-4 sm:mb-6">
      <p>
        För att få full åtkomst till alla funktioner, vänligen{' '}
        <Link href="/konto/verifiera/skicka" className="text-blue-500 underline">
          verifiera ditt konto
        </Link>
      </p>
    </div>
  );
};

export default VerficationMessage;
