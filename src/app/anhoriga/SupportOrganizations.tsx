import Organizations from "../components/pages/relatives/Organizations";

const SupportOrganizations = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <h3 className="h-md mt-8 sm:mt-0 text-primary-dark mb-2">
        Organisationer som kan hjälpa dig
      </h3>
      <Organizations />
    </div>
  );
};

export default SupportOrganizations;
