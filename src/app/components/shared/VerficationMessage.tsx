import Link from 'next/link';

const VerficationMessage = () => {
  return (
    <div className="bg-yellow-100 p-4 rounded mt-4">
      <p>
        För att få full åtkomst till alla funktioner, vänligen{' '}
        <Link href="/konto/verifiera" className="text-blue-500 underline">
          verifiera ditt konto
        </Link>
      </p>
    </div>
  );
};

export default VerficationMessage;
