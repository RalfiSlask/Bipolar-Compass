const ScienceAuthors = ({ authors }: { authors: string[] }) => {
  return <p className="text-sm text-dark">{authors.join(', ')}</p>;
};

export default ScienceAuthors;
