import Organizations from '../components/pages/relatives/Organizations';

const RelativePage = () => {
  return (
    <section className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="h-md text-primary-dark mb-12 text-center">
        För dig som är anhörig till någon med bipolär sjukdom
      </h2>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col bg-white backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/60">
          <p className="leading-relaxed text-lg">
            Att stå nära någon som lever med bipolär sjukdom kan vara en
            känslomässig berg- och dalbana. Många anhöriga känner en blandning
            av kärlek, frustration, oro och maktlöshet. Att förstå vad din
            närstående går igenom och vad du själv kan göra är avgörande både
            för deras välbefinnande och för ditt eget. Här har vi samlat
            kunskap, råd och resurser som kan hjälpa dig att navigera i en ofta
            komplex och utmanande situation. Kom ihåg: du är inte ensam.
          </p>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Vad innebär bipolär sjukdom?
          </h3>
          <p className="leading-relaxed">
            Bipolär sjukdom är en kronisk psykisk sjukdom som påverkar humöret.
            Det innebär att en person växlar mellan maniska eller hypomaniska
            faser (förhöjt humör och energi) och depressiva faser (nedstämdhet
            och låg energi). Mellan dessa episoder kan personen ofta ha långa
            perioder av stabilitet.
          </p>
          <p className="leading-relaxed mt-4">
            Som anhörig är det viktigt att förstå att dessa humörsvängningar
            inte är något din närstående kan kontrollera. Det handlar inte om
            att &quot;ta sig samman&quot; – det är en sjukdom som kräver
            professionell behandling och ett långsiktigt stöd från omgivningen.
          </p>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">Din roll som anhörig</h3>
          <p className="leading-relaxed mb-6">
            Din närstående behöver både kärlek och praktiskt stöd, men din roll
            som anhörig handlar också om att hitta en balans mellan att hjälpa
            andra och ta hand om dig själv. Här är några konkreta sätt du kan
            göra skillnad:
          </p>
          <div className="bg-primary-light/20 rounded-md p-4">
            <div className="flex flex-col gap-6">
              <div>
                <h4 className="font-semibold mb-2">
                  Informera dig om sjukdomen
                </h4>
                <p className="leading-relaxed">
                  Läs på om bipolär sjukdom. Genom att förstå diagnosen kan du
                  få en bättre bild av vad din närstående går igenom och hur du
                  kan stötta.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  Var en lyhörd samtalspartner
                </h4>
                <p className="leading-relaxed">
                  Lyssna utan att döma eller försöka &quot;fixa&quot;
                  situationen. Bara att få känna sig hörd kan vara en enorm
                  lättnad för den som mår dåligt.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  Hjälp till med struktur och rutiner
                </h4>
                <p className="leading-relaxed">
                  Personer med bipolär sjukdom kan ha svårt att hålla struktur i
                  vardagen, särskilt under sjukdomsperioder. Du kan hjälpa till
                  med att skapa och upprätthålla rutiner för sömn, mat och
                  aktiviteter.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  Lär dig känna igen tidiga varningstecken
                </h4>
                <p className="leading-relaxed">
                  Många anhöriga blir med tiden bra på att se tecken på att en
                  manisk eller depressiv period är på väg. Tidig intervention
                  kan hjälpa till att förhindra att episoden förvärras.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  Uppmuntra till behandling
                </h4>
                <p className="leading-relaxed">
                  Professionell vård är avgörande. Om din närstående tvekar,
                  försök att försiktigt motivera dem att söka hjälp eller följa
                  sin vårdplan.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  Sätt gränser för ditt eget välmående
                </h4>
                <p className="leading-relaxed">
                  Det är lätt att känna sig ansvarig för att &quot;rädda&quot;
                  någon annan, men du behöver också ta hand om dig själv. Sätt
                  annan, men du behöver också ta hand om dig själv. Sätt gränser
                  och se till att du får tid för återhämtning.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Vanliga utmaningar för anhöriga
          </h3>
          <p className="leading-relaxed mb-6">
            Som anhörig kan du möta olika svårigheter, till exempel:
          </p>
          <div className="bg-primary-light/20 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Känslomässig belastning:</h4>
                <p>
                  Du kan känna frustration eller maktlöshet när din närstående
                  inte mår bra. Det är viktigt att erkänna dessa känslor som
                  normala och söka stöd vid behov.
                </p>
              </li>
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Oro för framtiden:</h4>
                <p>
                  Det är naturligt att känna oro för hur sjukdomen kommer
                  påverka er relation, din närståendes arbete eller ekonomi.
                  Genom att skapa en stabil stödstruktur kan ni minska dessa
                  risker.
                </p>
              </li>
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Social isolering:</h4>
                <p>
                  Många anhöriga upplever att de själva blir isolerade när deras
                  närstående är sjuk. Det är viktigt att du hittar egna sociala
                  sammanhang där du kan få energi.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            När tvångsvård kan bli nödvändig
          </h3>
          <p className="leading-relaxed">
            I vissa situationer, särskilt när din närstående befinner sig i ett
            maniskt eller psykotiskt tillstånd, kan det bli nödvändigt att
            ansöka om tvångsvård. Detta är ofta en sista utväg när personen inte
            kan förstå sin egen situation eller är en fara för sig själv eller
            andra.
          </p>
          <p className="leading-relaxed mt-4">
            Tvångsvård regleras av Lagen om psykiatrisk tvångsvård (LPT) och kan
            bli aktuellt om följande kriterier är uppfyllda:
          </p>
          <div className="bg-primary-light/20 rounded-md p-4 mt-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                Personen lider av en allvarlig psykisk störning (som bipolär
                sjukdom i mani eller psykos).
              </li>
              <li>
                Personen behöver psykiatrisk vård som inte kan ges frivilligt.
              </li>
              <li>
                Personen utgör en fara för sig själv eller andra, eller riskerar
                att allvarligt försämras utan vård.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Hur går man tillväga för att ansöka om tvångsvård?
          </h3>
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="font-semibold mb-2">Kontakta sjukvården</h4>
              <p className="leading-relaxed">
                Om du misstänker att din närstående behöver tvångsvård ska du
                kontakta psykiatrin i din region. De flesta regioner har
                jourmottagningar för psykiatri som är öppna dygnet runt. Om
                situationen är akut kan du ringa 112 för att få hjälp.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Beskriv situationen</h4>
              <p className="leading-relaxed mb-4">
                Var tydlig när du pratar med vårdpersonal. Förklara varför du
                tror att din närstående behöver tvångsvård, till exempel om de:
              </p>
              <div className="bg-primary-light/20 rounded-md p-4">
                <ul className="flex flex-col gap-2 list-disc list-inside">
                  <li>Uppvisar farligt eller riskabelt beteende</li>
                  <li>Har hallucinationer eller vanföreställningar</li>
                  <li>Vägrar vård trots att de tydligt mår mycket dåligt</li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Läkarbedömning</h4>
              <p className="leading-relaxed">
                En läkare behöver göra en bedömning för att fastställa om
                tvångsvård är nödvändig. Om läkaren anser att kriterierna för
                tvångsvård är uppfyllda, skrivs ett vårdintyg som är grunden för
                att personen ska kunna bli inlagd.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Beslut om tvångsvård</h4>
              <p className="leading-relaxed">
                Efter att personen blivit inlagd måste en chefsöverläkare inom
                24 timmar besluta om tvångsvården ska fortsätta. Beslutet
                baseras på vårdintyget och en ny bedömning.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Att tänka på som anhörig vid tvångsvård
          </h3>
          <div className="bg-primary-light/20 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li className="flex gap-1 flex-col">
                <h4 className="font-semibold">Det är inte ditt fel</h4>
                <p>
                  Att behöva ta steget att ansöka om tvångsvård kan kännas svårt
                  och skuldbelagt. Kom ihåg att det handlar om att skydda din
                  närstående och ge dem möjlighet till vård som de annars inte
                  skulle ta emot.
                </p>
              </li>
              <li className="flex gap-1 flex-col">
                <h4 className="font-semibold">Var beredd på motstånd</h4>
                <p>
                  Många som är i mani eller psykos förstår inte sitt eget
                  tillstånd och kan reagera negativt på att bli inlagda. Försök
                  att behålla lugnet och låt vårdpersonalen hantera situationen.
                </p>
              </li>
              <li className="flex gap-1 flex-col">
                <h4 className="font-semibold">Ta hand om dig själv</h4>
                <p>
                  Processen kan vara känslomässigt krävande. Se till att du har
                  stöd från andra anhöriga, vänner eller professionella
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Mobila psykiatriska team och läkarbedömning på plats
          </h3>
          <p className="leading-relaxed">
            I många regioner i Sverige finns det mobila psykiatriska team som
            kan åka ut till personer i behov av akut psykiatrisk vård. Dessa
            team består vanligtvis av sjuksköterskor, läkare och annan
            psykiatrisk personal som kan göra en initial bedömning på plats och
            avgöra om personen behöver tvångsvård eller annan form av stöd.
          </p>

          <h4 className="font-semibold mt-6 mb-2">
            När kan detta bli aktuellt?
          </h4>
          <p className="leading-relaxed mb-4">
            Mobila psykiatriska team kan kallas in när:
          </p>
          <div className="bg-primary-light/20 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                Din närstående vägrar lämna hemmet eller en annan plats för att
                uppsöka vård.
              </li>
              <li>
                Situationen är akut, och du som anhörig bedömer att personen är
                en fara för sig själv eller andra.
              </li>
              <li>
                Du misstänker att personen befinner sig i ett maniskt,
                psykotiskt eller allvarligt depressivt tillstånd.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Hur kontaktar man ett mobilt psykiatriskt team?
          </h3>
          <div className="bg-primary-light/20 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li className="flex gap-1 flex-col">
                <h4 className="font-semibold">
                  Ring psykiatriska jourmottagningen eller 1177 Vårdguiden:
                </h4>
                <p>
                  Många regioner erbjuder direktkontakt med mobila team via
                  psykiatriska jourmottagningar. Ring 1177 för att få hjälp med
                  att hitta rätt kontaktväg i din region.
                </p>
              </li>
              <li className="flex gap-1 flex-col">
                <h4 className="font-semibold">Förklara situationen tydligt:</h4>
                <p>
                  När du kontaktar vården, var tydlig med att personen inte kan
                  ta sig till en vårdinrättning och att du tror att en akut
                  bedömning på plats är nödvändig. Beskriv beteenden, symtom och
                  eventuella risker.
                </p>
              </li>
              <li className="flex gap-1 flex-col">
                <h4 className="font-semibold">Vid omedelbar fara, ring 112:</h4>
                <p>
                  Om situationen är akut och det finns risk för skada, bör du
                  ringa 112 och förklara läget. Polisen kan också assistera och
                  samarbeta med vården vid behov.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Vad händer när läkaren kommer till platsen?
          </h3>
          <div className="bg-primary-light/20 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Initial bedömning:</h4>
                <p>
                  Läkaren pratar med personen och gör en medicinsk och
                  psykiatrisk bedömning.
                </p>
              </li>
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Beslut om vårdintyg:</h4>
                <p>
                  Om läkaren bedömer att kriterierna för tvångsvård är uppfyllda
                  enligt Lagen om psykiatrisk tvångsvård (LPT), kan de utfärda
                  ett vårdintyg direkt på plats.
                </p>
              </li>
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">
                  Transport till vårdinrättning:
                </h4>
                <p>
                  Om tvångsvård krävs, ansvarar vården för att personen
                  transporteras till en psykiatrisk enhet. I vissa fall
                  samarbetar vården med polisen eller ambulanssjukvården.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Vad kan du som anhörig göra under tiden?
          </h3>
          <div className="bg-primary-light/20 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Håll dig lugn:</h4>
                <p>
                  Försök att undvika att eskalera situationen. Förklara för din
                  närstående att det mobila teamet är där för att hjälpa.
                </p>
              </li>
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Förbered information:</h4>
                <p>
                  Ha detaljer om din närståendes medicinska historia, aktuella
                  symtom och eventuella tidigare vårdkontakter redo för att
                  underlätta bedömningen.
                </p>
              </li>
              <li className="flex gap-2 flex-col">
                <h4 className="font-semibold">Ta hand om dig själv:</h4>
                <p>
                  Att hantera sådana situationer kan vara känslomässigt
                  påfrestande. Sök stöd från andra anhöriga eller vänner om
                  möjligt.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Finns det mobila psykiatriska team i hela Sverige?
          </h3>
          <p className="leading-relaxed">
            Mobila psykiatriska team finns i de flesta regioner, men tillgången
            varierar. Vissa regioner har välutbyggda team som är tillgängliga
            dygnet runt, medan andra har mer begränsade resurser. Det är viktigt
            att kontakta psykiatrin i din region för att få information om vad
            som gäller där du bor.
          </p>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Kom ihåg: Du är inte ensam
          </h3>
          <p className="leading-relaxed">
            Att vara anhörig till någon med bipolär sjukdom kan vara tufft, men
            du är inte ensam i din situation. Genom att söka stöd, bygga kunskap
            och ta hand om dig själv kan du vara en värdefull resurs för din
            närstående samtidigt som du skyddar ditt eget välmående.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="h-xs text-primary-dark mb-4">
            Organisationer som kan hjälpa dig
          </h3>
          <Organizations />
        </div>
      </div>
    </section>
  );
};

export default RelativePage;
