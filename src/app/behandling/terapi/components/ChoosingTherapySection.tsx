const ChoosingTherapySection = () => {
  return (
    <div className="flex flex-col content-container">
      <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
        Terapival: Hur hittar du rätt?
      </h3>

      <div className="flex flex-col gap-6">
        <p>
          Att hitta rätt terapi är individuellt och kan ta tid. Här är några
          tips:
        </p>

        <div>
          <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
            Prata med din läkare eller psykiater:
          </h4>
          <p>De kan guida dig till rätt terapiform baserat på dina behov.</p>
        </div>

        <div>
          <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
            Utforska olika alternativ:
          </h4>
          <p>
            Testa flera terapiformer för att se vad som fungerar bäst för dig.
          </p>
        </div>

        <div>
          <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
            Fråga om specialisering:
          </h4>
          <p>
            Vissa terapeuter är specialiserade på bipolär sjukdom och kan
            erbjuda mer skräddarsydd hjälp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChoosingTherapySection;
