import Link from 'next/link';

const MyPage = () => {
  return (
    <div>
      <h2>Välkommen till din sida</h2>
      <div className="bg-yellow-100 p-4 rounded mt-4">
        <p>
          För att få full åtkomst till alla funktioner, vänligen{' '}
          <Link href="/konto/verifiera" className="text-blue-500 underline">
            verifiera ditt konto
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MyPage;
