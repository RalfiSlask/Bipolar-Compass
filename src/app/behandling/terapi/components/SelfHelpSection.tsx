const SelfHelpSection = () => {
  return (
    <div className="flex flex-col content-container">
      <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
        Självhjälp som komplement till terapi
      </h3>

      <div className="flex flex-col gap-6">
        <div>
          <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
            Mindfulness:
          </h4>
          <p>Träna dig i att vara närvarande och hantera stress.</p>
        </div>

        <div>
          <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
            Dagböcker:
          </h4>
          <p>Följ dina humörsvängningar och upptäck mönster.</p>
        </div>

        <div>
          <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
            Stöd från närstående:
          </h4>
          <p>
            Be dina närstående att stötta dig i din behandling och hjälpa dig
            följa din plan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelfHelpSection;
