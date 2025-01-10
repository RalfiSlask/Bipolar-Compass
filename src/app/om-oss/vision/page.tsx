const VisionPage = () => {
  return (
    <section className="container mx-auto max-w-4xl w-full flex flex-col gap-12 py-8 px-4">
      <div className="flex flex-col gap-4">
        <h2 className="h-md text-primary-dark">Vår Vision</h2>
        <p className="text-lg">
          Välkommen till Bipolärkompassen – en plats skapad för att ge stöd,
          kunskap och inspiration till alla som på något sätt påverkas av
          bipolär sjukdom. Oavsett om du är diagnostiserad, anhörig, eller
          vårdpersonal, är vår vision att erbjuda en trygg plattform där du kan
          lära, reflektera och växa.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">
          Kunskap och Förståelse
        </h3>
        <p>
          Vi tror att kunskap är grunden till förändring. Med tillgång till
          forskningsartiklar, pedagogiska resurser och en AI-assistent som
          svarar på dina frågor, vill vi göra information om bipolär sjukdom
          tillgänglig och enkel att förstå. Genom att dela den senaste
          forskningen och insikterna hoppas vi minska stigma och öka
          medvetenheten.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">
          Verktyg för Självinsikt och Välmående
        </h3>
        <p>
          Vi erbjuder en rad verktyg för att hjälpa dig förstå och följa ditt
          mående:
        </p>
        <ul className="flex flex-col gap-2 pl-6 list-disc">
          <li>
            Mood-tracker: En daglig funktion där du kan logga ditt humör och
            följa förändringar över tid.
          </li>
          <li>
            Dagbok: Ett privat utrymme för reflektion, där du kan skriva om dina
            tankar, känslor och upplevelser.
          </li>
          <li>
            Historik över mående: En visuell och interaktiv sammanställning av
            ditt humör över tid, som kan hjälpa dig identifiera mönster och
            förstå dina känslomässiga cykler.
          </li>
          <li>
            Multimediaval: Utforska musik, bilder och AI-genererat innehåll för
            att hitta inspiration och lugn i vardagen.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">
          Stöd för Anhöriga och Vårdpersonal
        </h3>
        <p>
          För anhöriga och vårdpersonal erbjuder vi resurser och insikter som
          hjälper till att förstå och stötta personer med bipolär sjukdom. Med
          en kombination av praktisk information och inspirerande multimedia
          hoppas vi kunna bidra till att stärka banden mellan individer och
          deras stödjande nätverk.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-dark">
          En Framtid utan Stigma
        </h3>
        <p>
          Genom att tillhandahålla verktyg och kunskap vill vi skapa en värld
          där bipolär sjukdom inte definieras av fördomar utan av öppenhet och
          förståelse. Tillsammans kan vi bygga en framtid där psykisk hälsa är
          lika naturligt att prata om som fysisk hälsa.
        </p>
      </div>
    </section>
  );
};

export default VisionPage;
