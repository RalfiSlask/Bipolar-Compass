const MedicinePage = () => {
  return (
    <section className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="h-md text-primary-dark mb-12 text-center">
        Medicinska behandlingar
      </h2>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/60">
          <h3 className="h-xs text-primary-dark mb-4">
            Stämningsstabiliserande mediciner
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-primary-dark mb-3">
                Vad gör de?
              </h4>
              <p>
                Stämningsstabiliserare används för att balansera humöret hos
                personer med bipolär sjukdom. De är särskilt effektiva för att
                förebygga återfall i maniska och depressiva episoder. Genom att
                påverka signalsubstanser i hjärnan stabiliserar dessa läkemedel
                de kraftiga humörsvängningar som är typiska för sjukdomen.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary-dark mb-3">
                Varför används de?
              </h4>
              <p className="leading-relaxed mb-4">
                Stämningsstabiliserare är ofta den första medicinen som
                ordineras vid bipolär sjukdom eftersom de är beprövade och
                effektiva för långsiktig stabilitet. De används också i
                kombination med andra läkemedel, till exempel antidepressiva
                eller antipsykotiska mediciner, för att behandla specifika
                symtom.
              </p>
            </div>

            <div className="bg-primary-light/20 rounded-md p-4">
              <h4 className="font-semibold text-primary-dark mb-3">Exempel:</h4>
              <ul className="flex flex-col gap-2 list-disc list-inside">
                <li>
                  Lithium har använts i flera decennier och är särskilt
                  effektivt för att minska risken för självmord och återkommande
                  episoder.
                </li>
                <li>
                  Lamotrigin används främst för att förebygga depression och är
                  ett alternativ för personer som inte tolererar lithium.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/60">
          <h3 className="h-xs text-primary-dark mb-4">
            Antipsykotiska mediciner
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-primary-dark mb-3">
                Vad gör de?
              </h4>
              <p>
                Antipsykotika verkar genom att reglera nivåerna av dopamin och
                serotonin i hjärnan. Dessa signalsubstanser spelar en viktig
                roll i humör, beteende och tänkande. Antipsykotiska mediciner
                kan snabbt lindra symtom vid akuta maniska episoder och används
                också som långtidsbehandling för att stabilisera humöret.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary-dark mb-3">
                Varför används de?
              </h4>
              <p>
                De används för att hantera både maniska episoder och blandade
                episoder (en kombination av mani och depression). Vissa
                antipsykotika kan också vara effektiva vid behandling av bipolär
                depression, särskilt när andra läkemedel inte räcker till.
              </p>
            </div>

            <div className="bg-primary-light/20 rounded-md p-4">
              <h4 className="font-semibold text-primary-dark mb-3">Exempel:</h4>
              <ul className="flex flex-col gap-2 list-disc list-inside">
                <li>
                  Olanzapin (Zyprexa) används för att snabbt lindra akuta symtom
                  vid mani.
                </li>
                <li>
                  Quetiapin (Seroquel) är ett mångsidigt läkemedel som kan
                  behandla både mani och depression.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/60">
          <h3 className="h-xs text-primary-dark mb-4">
            Antidepressiva mediciner
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-primary-dark mb-3">
                Vad gör de?
              </h4>
              <p>
                Antidepressiva mediciner påverkar hjärnans serotoninnivåer och
                ibland även noradrenalin och dopamin, vilket hjälper till att
                lindra symtom vid depression. De används för att återställa
                balansen i hjärnans signalsubstanser och förbättra humöret.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary-dark mb-3">
                Varför används de?
              </h4>
              <p>
                Vid bipolär sjukdom används antidepressiva ofta tillsammans med
                stämningsstabiliserare för att undvika att de triggar en manisk
                episod. De är särskilt effektiva för att behandla långvariga
                eller återkommande depressioner som inte svarar på andra
                behandlingar.
              </p>
            </div>

            <div className="bg-primary-light/20 rounded-md p-4">
              <h4 className="font-semibold text-primary-dark mb-3">Exempel:</h4>
              <ul className="flex flex-col gap-2 list-disc list-inside">
                <li>
                  Sertralin (Zoloft) är ett SSRI som ofta är förstahandsval vid
                  behandling av depression.
                </li>
                <li>
                  Bupropion (Wellbutrin) är ett alternativ för personer som inte
                  tolererar traditionella SSRI och kan också förbättra
                  energinivåer.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/60">
          <h3 className="h-xs text-primary-dark mb-4">
            Kombination av mediciner
          </h3>

          <div className="space-y-6">
            <p>
              I många fall används en kombination av mediciner från olika
              grupper för att uppnå bästa möjliga effekt. Till exempel kan en
              person med återkommande depressioner och maniska episoder använda
              både en stämningsstabiliserare och ett antipsykotikum. Den
              individuella behandlingen anpassas efter symtomens svårighetsgrad,
              tidigare erfarenheter av medicinering och eventuella andra
              medicinska tillstånd.
            </p>

            <p>
              Behandlingen syftar inte bara till att minska akuta symtom utan
              också till att förebygga framtida episoder och förbättra
              livskvaliteten över tid.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/60">
          <h3 className="h-xs text-primary-dark mb-4">
            Kommer medicinen fungera för mig?
          </h3>

          <div className="space-y-6">
            <p>
              Det är naturligt att undra om medicinen kommer att fungera för
              just dig. Behandling av bipolär sjukdom är individuell, och det
              kan ta tid att hitta rätt medicin eller kombination av mediciner.
              För vissa kan förbättring märkas snabbt, medan andra behöver flera
              justeringar innan den optimala behandlingen hittas.
            </p>

            <p>
              Din läkare eller psykiater tar hänsyn till din sjukdomshistoria,
              symtom och tidigare erfarenheter för att välja den bästa
              behandlingen. Det är viktigt att ha tålamod och att följa den plan
              som läggs upp, även om det känns som att resultaten dröjer.
            </p>

            <div className="bg-primary-light/20 rounded-md p-4">
              <p className="font-semibold text-primary-dark">
                Kom ihåg: Många med bipolär sjukdom hittar en medicinering som
                hjälper dem att leva ett stabilt och balanserat liv. Med rätt
                stöd och uppföljning finns det goda chanser att du också kommer
                att må bättre.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/60">
          <h3 className="h-xs text-primary-dark mb-4">
            Biverkningar och trygghet vid medicinering
          </h3>

          <div className="space-y-6">
            <p>
              När du påbörjar en ny medicinering är det vanligt att känna viss
              oro för biverkningar. Det är dock viktigt att veta att de flesta
              mediciner är noggrant testade och att majoriteten av användare
              endast upplever milda eller övergående biverkningar.
            </p>

            <div>
              <h4 className="font-semibold text-primary-dark mb-3">
                Vanligheten av milda biverkningar
              </h4>
              <p>
                Många upplever tillfällig trötthet, illamående eller yrsel i
                början av en behandling. Dessa symtom brukar minska efter några
                veckor när kroppen vänjer sig vid medicinen. Om du ändå skulle
                uppleva besvär, finns det oftast möjlighet att justera dosen
                eller byta medicin tillsammans med din läkare.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary-dark mb-3">
                Trygghet i behandlingen
              </h4>
              <ul className="flex flex-col gap-2 list-disc list-inside">
                <li>
                  Ha en öppen dialog med din läkare: Dela dina funderingar,
                  frågor och upplevelser.
                </li>
                <li>
                  Ge det tid: Mediciner tar ofta några veckor innan full effekt
                  uppnås.
                </li>
                <li>Följ behandlingsplanen: Ta medicinen enligt ordination.</li>
                <li>
                  Individuell behandling: Alla är unika, och det kan krävas
                  justeringar.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/60">
          <h3 className="h-xs text-primary-dark mb-4">
            ECT och TMS – Behandlingar vid bipolär sjukdom
          </h3>

          <div className="space-y-6">
            <p>
              Förutom mediciner finns det andra behandlingsmetoder som kan vara
              effektiva vid bipolär sjukdom, särskilt om mediciner inte ger
              tillräcklig effekt eller om symtomen är allvarliga. Två av dessa
              metoder är elektrokonvulsiv behandling (ECT) och transkraniell
              magnetstimulering (TMS).
            </p>

            <div>
              <h4 className="font-semibold text-primary-dark mb-3">
                Elektrokonvulsiv behandling (ECT)
              </h4>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-primary-dark mb-2">
                    Vad är ECT?
                  </h5>
                  <p>
                    ECT är en behandling där en kontrollerad elektrisk
                    stimulering av hjärnan framkallar ett kortvarigt epileptiskt
                    anfall. Behandlingen utförs under narkos och används främst
                    vid svåra depressioner, mani eller katatoni som inte svarat
                    på mediciner.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-primary-dark mb-2">
                    Hur fungerar det?
                  </h5>
                  <p>
                    Den exakta mekanismen bakom ECT är inte helt förstådd, men
                    det tros påverka hjärnans signalsubstanser och öka
                    plasticiteten i hjärnan. Detta kan hjälpa till att
                    återställa normal hjärnfunktion och förbättra symtomen.
                  </p>
                </div>

                <div className="bg-primary-light/20 rounded-md p-4">
                  <h5 className="font-semibold text-primary-dark mb-2">
                    När används det?
                  </h5>
                  <ul className="flex flex-col gap-2 list-disc list-inside">
                    <li>
                      Vid svåra depressioner som inte svarat på mediciner.
                    </li>
                    <li>
                      Vid livshotande tillstånd, som djupa självmordstankar.
                    </li>
                    <li>Vid allvarlig mani eller psykos.</li>
                    <li>
                      När andra behandlingar inte kan användas, exempelvis under
                      graviditet.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-primary-dark mb-3">
                Transkraniell magnetstimulering (TMS)
              </h4>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-primary-dark mb-2">
                    Vad är TMS?
                  </h5>
                  <p>
                    TMS är en icke-invasiv behandling där en magnetisk spole
                    placeras mot skalpen för att stimulera specifika områden i
                    hjärnan med hjälp av magnetiska pulser. Det är en mildare
                    behandling än ECT och kräver ingen narkos.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-primary-dark mb-2">
                    Hur fungerar det?
                  </h5>
                  <p>
                    TMS riktar sig mot specifika områden i hjärnan som är
                    involverade i humörreglering. Genom att stimulera dessa
                    områden med magnetiska pulser kan aktiviteten öka och bidra
                    till att lindra symtomen.
                  </p>
                </div>

                <div className="bg-primary-light/20 rounded-md p-4">
                  <h5 className="font-semibold text-primary-dark mb-2">
                    När används det?
                  </h5>
                  <ul className="flex flex-col gap-2 list-disc list-inside">
                    <li>
                      Vid måttlig till svår depression, särskilt om mediciner
                      inte haft effekt.
                    </li>
                    <li>
                      Vid bipolär depression, som ett alternativ till mediciner
                      eller i kombination med dem.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-primary-light/20 rounded-md p-4">
              <h4 className="font-semibold text-primary-dark mb-3">
                Jämförelse mellan ECT och TMS
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="font-semibold">Egenskap</div>
                <div className="font-semibold">ECT</div>
                <div className="font-semibold">TMS</div>

                <div>Invasivitet</div>
                <div>Kräver narkos och framkallar ett anfall</div>
                <div>Icke-invasiv, kräver ingen narkos</div>

                <div>Behandlingstid</div>
                <div>Kortare behandlingar, oftast 6–12 sessioner</div>
                <div>Längre behandlingar, ofta 20–30 sessioner</div>

                <div>Effektivitet</div>
                <div>Mycket effektiv vid svåra fall</div>
                <div>Effektiv vid måttlig depression</div>

                <div>Biverkningar</div>
                <div>Övergående minnesproblem och huvudvärk</div>
                <div>Mild huvudvärk och obehag vid skalpen</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-primary-dark mb-3">
                Att välja rätt behandling
              </h4>
              <p>
                Valet mellan ECT, TMS och mediciner beror på flera faktorer, som
                symtomens svårighetsgrad, tidigare behandlingserfarenheter och
                individuella preferenser. ECT används oftast vid mycket
                allvarliga tillstånd, medan TMS kan vara ett alternativ för
                personer som inte svarat på mediciner men inte behöver så
                intensiva insatser som ECT.
              </p>
              <p className="leading-relaxed mt-4">
                Om du överväger någon av dessa behandlingar, prata med din
                läkare eller psykiater för att få en noggrann utvärdering och
                planering. Målet är alltid att hitta en behandling som är säker,
                effektiv och passar dina behov.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicinePage;
