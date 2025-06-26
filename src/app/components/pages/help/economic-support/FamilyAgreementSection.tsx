import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import { FaHandshake } from 'react-icons/fa';

const FamilyAgreementSection = () => {
  return (
    <div className="content-container">
      <SectionTitle icon={<FaHandshake />}>
        Familjeavtal och planering
      </SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-primary-dark">
            Informella avtal inom familjen
          </h3>
          <p className="">
            Även om informella avtal inte är juridiskt bindande kan de vara en
            viktig del av planeringen för att hantera ekonomiska utmaningar vid
            bipolär sjukdom. De skapar tydlighet och trygghet för alla
            inblandade.
          </p>

          <h4 className="text-lg font-semibold text-primary-dark mt-6">
            Vad kan ingå i ett familjeavtal?
          </h4>
          <ul className="list-disc list-inside space-y-2 ">
            <li>
              Överenskommelse om att gå igenom utgifter vid tidiga tecken på
              skov
            </li>
            <li>Plan för att pausa onödiga köp under maniska perioder</li>
            <li>Användning av budgetappar eller system</li>
            <li>Kontakt med vård eller socialtjänst vid behov</li>
            <li>Övervägande av god man om situationen förvärras</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-primary-dark">
            Praktiska verktyg för ekonomi
          </h3>
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <h4 className="text-lg font-semibold text-green-800 mb-2">
              Rekommenderade appar och verktyg:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-green-800 text-sm">
              <li>Koll på pengarna (Konsumentverket) - gratis budgetverktyg</li>
              <li>Zlantar - för att spåra utgifter</li>
              <li>Din banks egna app - för överblick över ekonomi</li>
              <li>Automatiska överföringar till sparkonto</li>
              <li>Budgetmallar från Konsumentverket</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h4 className="text-lg font-semibold text-yellow-800 mb-2">
              Strategier för att undvika impulsiva köp:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-yellow-800 text-sm">
              <li>Sätt upp köpgränser på kort</li>
              <li>Använd separata konton för olika ändamål</li>
              <li>Skapa en &quot;kylperiod&quot; för större köp</li>
              <li>Planera inköp i förväg</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-primary-dark mb-4">
          Mall för familjeplan
        </h3>
        <div className="bg-white p-4 rounded border">
          <p className="mb-4">
            <strong>FAMILJEVIS PLAN FÖR EKONOMISKT STÖD VID SKOV</strong>
          </p>
          <p className="mb-4">
            Jag, [ditt namn], har bipolär sjukdom. Under perioder då jag
            upplever maniska eller hypomana symtom kan jag fatta beslut som
            påverkar min ekonomi negativt.
          </p>
          <p className="mb-4">
            Därför har jag tillsammans med [namn på anhörig] kommit överens om
            följande:
          </p>
          <ul className="list-disc list-inside space-y-1  mb-4">
            <li>
              Vid tidiga tecken på skov ska vi tillsammans gå igenom mina
              utgifter
            </li>
            <li>
              [Namn] får påminna mig om att pausa onödiga köp eller ta bort
              kreditkortstillgång
            </li>
            <li>Vi använder [app/budgetsystem] för att följa min ekonomi</li>
            <li>
              Om jag själv inte kan ta ansvar, kommer vi kontakta vård eller
              socialtjänst
            </li>
            <li>
              Vi har övervägt att ansöka om god man om situationen förvärras
            </li>
          </ul>
          <p className="text-sm">
            Datum: ______________________
            <br />
            Underskrift: ______________________ (du själv)
            <br />
            Underskrift: ______________________ (anhörig)
            <br />
            <em>Denna plan revideras vid behov.</em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilyAgreementSection;
