import ECT from '@/app/components/pages/treatment/ECT';
import TMS from '@/app/components/pages/treatment/TMS';
import EncouragmentContainer from '@/app/components/shared/EncouragmentContainer';
import HighlightList from '@/app/components/shared/HighlightList';
import InfoSection from '@/app/components/shared/InfoSection';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedTreatmentContent from '@/app/components/shared/RelatedTreatmentContent';
import { MEDICINE_INTRO } from '@/app/data/pageIntros';
import { MdElectricBolt, MdWaves } from 'react-icons/md';

const MedicinePage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={MEDICINE_INTRO} />
      <div className="flex flex-col gap-4 sm:gap-10">
        <InfoSection
          title="Stämningsstabiliserande mediciner"
          description="Stämningsstabiliserare används för att balansera humöret hos personer med bipolär sjukdom. De är särskilt effektiva för att förebygga återfall i maniska och depressiva episoder. Genom att påverka signalsubstanser i hjärnan stabiliserar dessa läkemedel de kraftiga humörsvängningar som är typiska för sjukdomen."
        >
          <div className="lg:text-lg">
            <h4 className="font-semibold text-primary-dark mb-3">
              Varför används de?
            </h4>
            <p className="mb-4">
              Stämningsstabiliserare är ofta den första medicinen som ordineras
              vid bipolär sjukdom eftersom de är beprövade och effektiva för
              långsiktig stabilitet. De används också i kombination med andra
              läkemedel, till exempel antidepressiva eller antipsykotiska
              mediciner, för att behandla specifika symtom.
            </p>
          </div>
          <HighlightList
            title="Exempel:"
            list={[
              'Lithium har använts i flera decennier och är särskilt effektivt för att minska risken för självmord och återkommande episoder.',
              'Lamotrigin används främst för att förebygga depression och är ett alternativ för personer som inte tolererar lithium.',
            ]}
          />
        </InfoSection>

        <InfoSection
          title="Antipsykotiska mediciner"
          description="Antipsykotika verkar genom att reglera nivåerna av dopamin och serotonin i hjärnan. Dessa signalsubstanser spelar en viktig roll i humör, beteende och tänkande. Antipsykotiska mediciner kan snabbt lindra symtom vid akuta maniska episoder och används också som långtidsbehandling för att stabilisera humöret."
        >
          <div className="lg:text-lg">
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
          <HighlightList
            title="Exempel:"
            list={[
              'Olzanapin (Zyprexa) används för att snabbt lindra akuta symtom vid mani.',
              'Quetiapin (Seroquel) är ett mångsidigt läkemedel som kan behandla både mani och depression.',
            ]}
          />
        </InfoSection>

        <InfoSection
          title="Antidepressiva mediciner"
          description="Antidepressiva mediciner påverkar hjärnans serotoninnivåer och ibland även noradrenalin och dopamin, vilket hjälper till att lindra symtom vid depression. De används för att återställa balansen i hjärnans signalsubstanser och förbättra humöret."
        >
          <div className="lg:text-lg">
            <h4 className="font-semibold text-primary-dark mb-3">
              Varför används de?
            </h4>
            <p>
              Vid bipolär sjukdom används antidepressiva ofta tillsammans med
              stämningsstabiliserare för att undvika att de triggar en manisk
              episod. De är särskilt effektiva för att behandla långvariga eller
              återkommande depressioner som inte svarar på andra behandlingar.
            </p>
          </div>

          <HighlightList
            title="Exempel:"
            list={[
              'Sertralin (Zoloft) är ett SSRI som ofta är förstahandsval vid behandling av depression.',
              'Bupropion (Wellbutrin) är ett alternativ för personer som inte tolererar traditionella SSRI och kan också förbättra energinivåer.',
            ]}
          />
        </InfoSection>

        <div className="flex flex-col content-container">
          <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
            Kombination av mediciner
          </h3>
          <div className="flex flex-col gap-6 lg:text-lg">
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

        <div className="flex flex-col content-container">
          <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
            Kommer medicinen fungera för mig?
          </h3>
          <div className="flex flex-col gap-6">
            <p className="lg:text-lg">
              Det är naturligt att undra om medicinen kommer att fungera för
              just dig. Behandling av bipolär sjukdom är individuell, och det
              kan ta tid att hitta rätt medicin eller kombination av mediciner.
              För vissa kan förbättring märkas snabbt, medan andra behöver flera
              justeringar innan den optimala behandlingen hittas.
            </p>
            <p className="lg:text-lg">
              Din läkare eller psykiater tar hänsyn till din sjukdomshistoria,
              symtom och tidigare erfarenheter för att välja den bästa
              behandlingen. Det är viktigt att ha tålamod och att följa den plan
              som läggs upp, även om det känns som att resultaten dröjer.
            </p>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
            Biverkningar och trygghet vid medicinering
          </h3>

          <div className="flex flex-col gap-6">
            <p className="lg:text-lg">
              När du påbörjar en ny medicinering är det vanligt att känna viss
              oro för biverkningar. Det är dock viktigt att veta att de flesta
              mediciner är noggrant testade och att majoriteten av användare
              endast upplever milda eller övergående biverkningar.
            </p>
            <div className="lg:text-lg">
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

            <div className="lg:text-lg">
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

        <div className="flex flex-col content-container">
          <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
            ECT och TMS – Behandlingar vid bipolär sjukdom
          </h3>
          <div className="flex flex-col gap-6">
            <p className="lg:text-lg">
              Förutom mediciner finns det andra behandlingsmetoder som kan vara
              effektiva vid bipolär sjukdom, särskilt om mediciner inte ger
              tillräcklig effekt eller om symtomen är allvarliga. Två av dessa
              metoder är elektrokonvulsiv behandling (ECT) och transkraniell
              magnetstimulering (TMS).
            </p>
            <ECT />
            <TMS />
            <div className="rounded-xl mt-8">
              <h4 className="font-semibold h-xs lg:text-xl text-primary-dark mb-4">
                Jämförelse
              </h4>
              <p className="lg:text-lg">
                ECT är en mer intensiv behandling som ger snabbare resultat men
                kräver narkos och har fler biverkningar. TMS är ett mildare
                alternativ utan narkos, men behandlingen tar längre tid och
                effekten kommer mer gradvis. Båda metoderna är värdefulla
                verktyg i behandlingen av bipolär sjukdom, men används i olika
                situationer beroende på symtomens svårighetsgrad och patientens
                individuella behov.
              </p>
              <p className="font-semibold primary-dark mt-4 text-primary-dark">
                Om du överväger någon av dessa behandlingar, prata med din
                läkare eller psykiater för att få en noggrann utvärdering och
                planering. Målet är alltid att hitta en behandling som är säker,
                effektiv och passar dina behov.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6 border-b border-primary-dark/30 pb-6">
                  <div className="bg-primary-dark rounded-full p-2 text-white">
                    <MdElectricBolt size={24} />
                  </div>
                  <h4 className="text-2xl font-bold text-primary-dark">ECT</h4>
                </div>

                <div className="sm:flex flex-col gap-4">
                  <div className="flex gap-3 p-3 flex-col sm:flex-row bg-primary-light/10 rounded-lg">
                    <span className="font-semibold min-w-[120px]">
                      Invasivitet:
                    </span>
                    <span>
                      Kräver narkos och framkallar ett kontrollerat anfall
                    </span>
                  </div>

                  <div className="flex gap-3 p-3 flex-col sm:flex-row">
                    <span className="font-semibold min-w-[120px]">
                      Behandlingstid:
                    </span>
                    <span>6-12 sessioner under 2-4 veckor</span>
                  </div>

                  <div className="flex gap-3 p-3 flex-col sm:flex-row">
                    <span className="font-semibold min-w-[120px]">
                      Effektivitet:
                    </span>
                    <span>Mycket effektiv vid svåra fall, snabb effekt</span>
                  </div>

                  <div className="flex gap-3 p-3 flex-col sm:flex-row">
                    <span className="font-semibold min-w-[120px]">
                      Biverkningar:
                    </span>
                    <span>Övergående minnesproblem och huvudvärk</span>
                  </div>

                  <div className="mt-6 p-4 bg-primary-dark/10 rounded-lg">
                    <p className="font-medium">Rekommenderas särskilt vid:</p>
                    <ul className="list-disc list-inside mt-2 flex flex-col gap-1">
                      <li>Svår depression som inte svarar på mediciner</li>
                      <li>Akuta maniska episoder</li>
                      <li>När snabb behandlingseffekt krävs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6 border-b border-primary-dark/30 pb-6">
                  <div className="bg-primary-dark rounded-full p-2 text-white">
                    <MdWaves size={24} />
                  </div>
                  <h4 className="text-2xl font-bold text-primary-dark">TMS</h4>
                </div>

                <div className="sm:flex flex-col gap-4">
                  <div className="flex gap-3 p-3 flex-col sm:flex-row bg-primary-light/10 rounded-lg">
                    <span className="font-semibold min-w-[120px]">
                      Invasivitet:
                    </span>
                    <span>Icke-invasiv, ingen narkos krävs</span>
                  </div>

                  <div className="flex gap-3 p-3 flex-col sm:flex-row">
                    <span className="font-semibold min-w-[120px]">
                      Behandlingstid:
                    </span>
                    <span>20-30 sessioner under 4-6 veckor</span>
                  </div>

                  <div className="flex gap-3 p-3 flex-col sm:flex-row bg-primary-light/10 rounded-lg">
                    <span className="font-semibold min-w-[120px]">
                      Effektivitet:
                    </span>
                    <span>
                      Effektiv vid måttlig och svår depression, gradvis effekt
                    </span>
                  </div>

                  <div className="flex gap-3 p-3 flex-col sm:flex-row">
                    <span className="font-semibold min-w-[120px]">
                      Biverkningar:
                    </span>
                    <span>
                      Mild huvudvärk och övergående obehag vid skalpen
                    </span>
                  </div>

                  <div className="mt-6 p-4 bg-primary-dark/10 rounded-lg">
                    <p className="font-medium">Rekommenderas särskilt vid:</p>
                    <ul className="list-disc list-inside mt-2 flex flex-col gap-1">
                      <li>Måttlig depression som inte svarar på mediciner</li>
                      <li>När man vill undvika biverkningar från mediciner</li>
                      <li>För personer som inte kan få ECT</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <EncouragmentContainer text="Kom ihåg: Många med bipolär sjukdom hittar en medicinering som hjälper dem att leva ett stabilt och balanserat liv. Med rätt stöd och uppföljning finns det goda chanser att du också kommer att må bättre." />
      </div>
      <RelatedTreatmentContent currentPage="medicinska-behandlingar" />
    </section>
  );
};

export default MedicinePage;
