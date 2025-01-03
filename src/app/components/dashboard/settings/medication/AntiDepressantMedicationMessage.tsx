import Link from 'next/link';

const AntiDepressantMedicationMessage = () => {
  return (
    <p className="text-sm text-gray-500">
      Kom ihåg att om du enbart tar antidepressiva läkemedel att det kan trigga
      en manisk episod. Så var försiktig och konsultera din läkare så allt blir
      rätt.
      <span className="block mt-2">
        För mer information:
        <Link href="/behandling" className="text-blue-500 underline ml-2">
          Behandling
        </Link>
      </span>
    </p>
  );
};

export default AntiDepressantMedicationMessage;
