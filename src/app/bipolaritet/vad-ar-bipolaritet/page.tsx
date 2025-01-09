'use client';

import BipolarPrevalence from '@/app/components/pages/bipolar/BipolarPrevalence';

const WhatIsBipolarityPage = () => {
  return (
    <section className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="h-md text-primary-dark mb-12 text-center">
        Vad är bipolaritet?
      </h2>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/60">
          <p className="mb-6 leading-relaxed">
            Bipolaritet, även kallad bipolär sjukdom, är en psykisk sjukdom som
            kännetecknas av extrema förändringar i humör, energi och
            aktivitetsnivå. Dessa förändringar går ofta mellan perioder av mani
            eller hypomani (förhöjt, euforiskt eller irritabelt humör) och
            perioder av depression (sänkt eller nedstämt humör). Bipolaritet
            påverkar inte bara den psykiska hälsan utan kan också ha stor
            inverkan på relationer, arbetsliv och det dagliga livet.
          </p>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            De olika typerna av bipolär sjukdom
          </h3>
          <p className="mb-6 leading-relaxed">
            Bipolär sjukdom är inte en enhetlig diagnos utan kan delas in i
            flera olika typer beroende på symptomens svårighetsgrad och mönster:
          </p>
          <div className="bg-primary-light/20 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                Bipolär sjukdom typ 1: Kännetecknas av minst en manisk episod
                som kan vara så allvarlig att sjukhusvård behövs. Episoder av
                depression är också vanliga, men inte nödvändiga för diagnos.
              </li>
              <li>
                Bipolär sjukdom typ 2: Innebär återkommande episoder av
                depression och hypomani, en mildare form av mani. Hypomani leder
                oftast inte till allvarliga funktionsnedsättningar.
              </li>
              <li>
                Cyklotymi: En mildare form av bipolär sjukdom där humöret växlar
                mellan hypomaniliknande och milda depressiva symptom under
                längre tid, ofta flera år.
              </li>
              <li>
                Ospecificerad bipolär sjukdom: Symptom som inte helt passar in i
                någon av ovanstående kategorier men som ändå orsakar betydande
                lidande.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">Vanliga kännetecken</h3>

          <div className="bg-primary-light/20 rounded-md p-4 mb-6">
            <h4 className="font-semibold text-primary-dark mb-3">
              Under maniska eller hypomaniska episoder kan personer känna sig:
            </h4>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>Överdrivet energiska eller självsäkra</li>
              <li>Pratsamma eller rastlösa</li>
              <li>Oförmögen att sova trots att de inte känner sig trötta</li>
              <li>Impulsiva, med riskfyllda beteenden som konsekvens</li>
            </ul>
          </div>

          <div className="bg-primary-light/20 rounded-md p-4">
            <h4 className="font-semibold text-primary-dark mb-3">
              Under depressiva episoder kan personer uppleva:
            </h4>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>Djup nedstämdhet eller hopplöshet</li>
              <li>
                Brist på energi och intresse för saker som tidigare varit roliga
              </li>
              <li>Problem med koncentration och beslutsfattande</li>
              <li>Tankar på döden eller självmord</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Vem drabbas av bipolaritet?
          </h3>
          <p className="mb-6 leading-relaxed">
            Bipolaritet kan drabba vem som helst, oavsett ålder, kön eller
            bakgrund. Sjukdomen debuterar ofta i sena tonåren eller tidig vuxen
            ålder och har en livslång karaktär. Den exakta orsaken är inte känd,
            men en kombination av genetiska, biologiska och miljömässiga
            faktorer tros spela en roll.
          </p>
        </div>
        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Genetiska och miljömässiga faktorer
          </h3>
          <p className="mb-6 leading-relaxed">
            Bipolär sjukdom är en komplex psykisk störning där både genetiska
            och miljömässiga faktorer bidrar till dess uppkomst.
          </p>

          <div className="bg-primary-light/20 rounded-md p-4 mb-6">
            <h4 className="font-semibold text-primary-dark mb-3">
              Genetiska faktorer:
            </h4>
            <p className="leading-relaxed">
              Forskning visar att bipolär sjukdom har en betydande ärftlig
              komponent. Personer med nära släktingar som har bipolär sjukdom
              löper en högre risk att själva utveckla sjukdomen. Studier har
              identifierat specifika genetiska varianter kopplade till
              sjukdomen, inklusive en variant associerad med psykotiska symtom
              och kognitiva svårigheter.
            </p>
          </div>

          <div className="bg-primary-light/20 rounded-md p-4 mb-6">
            <h4 className="font-semibold text-primary-dark mb-3">
              Miljömässiga faktorer:
            </h4>
            <p className="leading-relaxed">
              Utöver genetiken spelar miljöfaktorer en viktig roll. Stressiga
              livshändelser, trauma under barndomen och andra psykosociala
              påfrestningar kan öka risken för att utveckla bipolär sjukdom,
              särskilt hos individer med genetisk sårbarhet.
            </p>
          </div>

          <div className="bg-primary-light/20 rounded-md p-4 mb-6">
            <h4 className="font-semibold text-primary-dark mb-3">
              Neurologiska aspekter:
            </h4>
            <p className="leading-relaxed">
              Studier indikerar att återkommande maniska episoder kan leda till
              förändringar i hjärnans struktur, såsom minskad tjocklek i
              hjärnbarken. Detta tyder på att bipolär sjukdom kan vara en
              neuroprogressiv sjukdom, där hjärnans struktur förändras över tid.
            </p>
          </div>

          <div className="bg-primary-light/20 rounded-md p-4">
            <h4 className="font-semibold text-primary-dark mb-3">
              Evolutionära perspektiv:
            </h4>
            <p className="leading-relaxed">
              Vissa forskare spekulerar i att de extrema humörsvängningarna vid
              bipolär sjukdom kan ha haft evolutionära fördelar, exempelvis
              genom att perioder av mani främjade kreativitet och
              initiativförmåga, medan depressiva perioder ledde till
              energibesparing och reflektion. Dock är detta område fortfarande
              föremål för forskning och debatt.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">Behandling och stöd</h3>
          <p className="mb-6 leading-relaxed">
            Bipolär sjukdom är en kronisk sjukdom, men det finns effektiva
            behandlingar som kan hjälpa till att stabilisera humöret och
            förbättra livskvaliteten. Behandlingen inkluderar oftast:
          </p>
          <div className="bg-primary-light/20 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                Medicinering, såsom stämningsstabiliserare eller antidepressiva
              </li>
              <li>Psykoterapi, till exempel KBT eller familjeterapi</li>
              <li>Livsstilsförändringar som regelbundna sömn- och rutiner</li>
            </ul>
          </div>
          <p className="mt-6 leading-relaxed">
            Det är också viktigt att ha stöd från familj, vänner och
            vårdpersonal. Att förstå sjukdomen är ett viktigt steg för att
            hantera den.
          </p>
        </div>

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">
            Prevalens av bipolär sjukdom
          </h3>
          <p className="mb-6 leading-relaxed">
            Bipolär sjukdom är en relativt vanlig psykisk sjukdom som förekommer
            över hela världen, oavsett kulturella eller geografiska skillnader.
            Här är en sammanfattning av vad forskningen säger om prevalensen:
          </p>

          <div className="bg-primary-light/20 rounded-md p-4">
            <ul className="flex flex-col gap-4 list-disc list-inside">
              <li>
                <span className="font-semibold">Global prevalens:</span> Cirka
                1–2 % av den globala befolkningen diagnostiseras med bipolär
                sjukdom typ 1 eller typ 2. När mildare former som cyklotymi
                inkluderas, stiger prevalensen till cirka 4 % av befolkningen.
              </li>
              <li>
                <span className="font-semibold">Könsfördelning:</span> Bipolär
                sjukdom påverkar män och kvinnor i ungefär samma utsträckning,
                även om kvinnor oftare diagnostiseras med bipolär sjukdom typ 2
                och blandade episoder, medan män oftare diagnostiseras med
                bipolär sjukdom typ 1.
              </li>
              <li>
                <span className="font-semibold">Åldersgrupper:</span> Sjukdomen
                debuterar ofta i sena tonåren eller tidig vuxen ålder,
                vanligtvis mellan 15 och 30 år. Tidig debut under tonåren kan
                förknippas med svårare förlopp och högre risk för samsjuklighet.
              </li>
              <li>
                <span className="font-semibold">Samsjuklighet:</span> Personer
                med bipolär sjukdom har ofta andra psykiska hälsotillstånd, som
                ångeststörningar, missbruk eller ADHD. Detta kan göra diagnos
                och behandling mer komplex.
              </li>
              <li>
                <span className="font-semibold">Regionala skillnader:</span>{' '}
                Prevalensen varierar något mellan länder och regioner, vilket
                kan bero på kulturella faktorer, diagnostiska metoder och
                tillgång till vård. Forskning från Sverige visar en prevalens på
                cirka 2 % i den vuxna befolkningen.
              </li>
            </ul>
          </div>
        </div>

        <BipolarPrevalence />

        <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/20">
          <h3 className="h-xs text-primary-dark mb-4">Viktigt att notera</h3>
          <div className="flex flex-col">
            <p className="leading-relaxed">
              Eftersom många individer inte söker vård eller får korrekt
              diagnos, tros det finnas ett mörkertal av personer som lever med
              bipolär sjukdom utan att vara medvetna om det. Tidig diagnos och
              behandling är avgörande för att förbättra prognosen och
              livskvaliteten.
            </p>
            <p className="mt-6 leading-relaxed">
              Bipolaritet är inte en svaghet eller ett personlighetsdrag – det
              är en medicinsk sjukdom som kräver vård och behandling. Med rätt
              stöd kan personer med bipolär sjukdom leva ett meningsfullt och
              produktivt liv.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsBipolarityPage;
