const ScienceAuthors = ({ authors }: { authors: string[] }) => {
  return <p className="text-sm text-gray-700">{authors.join(', ')}</p>;
};

export default ScienceAuthors;
