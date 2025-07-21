const SearchNoResults = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Inga böcker hittades</h2>
      <p className="text-gray-600">
        Din sökning gav inga resultat. Kontrollera din stavning eller försök med
        en annan sökterm.
      </p>
    </div>
  );
};

export default SearchNoResults;
