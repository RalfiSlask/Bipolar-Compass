import { BoltIcon } from '@/app/components/shared/icons/BoltIcon';
import { BulbIcon } from '@/app/components/shared/icons/BulbIcon';
import { SpinningArrowsIcon } from '@/app/components/shared/icons/SpinningArrowsIcon';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedContent from '@/app/components/shared/RelatedContent';
import { diagnosisIntro } from '@/app/data/pageIntros';
import Image from 'next/image';

const DiagnosesPage = () => {
  return (
    <section className="w-full space-y-12 max-w-[1440px] px-4 md:px-10 pt-10 pb-20">
      <PageIntroContainer intro={diagnosisIntro} />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Bipolär typ 1 (Bipolar I disorder)
          </h3>
          <p className="mb-6 ">
            Bipolär typ 1 kännetecknas av minst en episod av mani som varar i
            minst sju dagar eller kräver sjukhusvård på grund av
            svårighetsgraden. Maniska episoder är ofta intensiva och kan leda
            till impulsiva och riskfyllda beslut. Depression kan också förekomma
            mellan episoder av mani, men det är inte ett krav för diagnos.
          </p>

          <div className="bg-primary-light/50 rounded-md p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-2">
                <BoltIcon className="w-6 h-6 text-primary-dark" />
                <h4 className="font-semibold text-primary-dark">
                  Karaktäristiska drag för mani:
                </h4>
              </div>
            </div>
            <ul className="flex flex-col gap-2 list-disc list-inside ">
              <li>Extremt förhöjt humör, överdriven energi eller agitation.</li>
              <li>Ökad självkänsla, ibland till storhetsvansinne.</li>
              <li>
                Snabba tankar och impulsivt beteende, som överdrivet spenderande
                eller farliga risker.
              </li>
              <li>Minskad sömnbehov, utan känsla av trötthet.</li>
              <li>
                Ökad pratsamhet, ofta med ett snabbt och pressat talmönster.
              </li>
              <li>Förlorad verklighetsuppfattning (psykos) i vissa fall.</li>
              <li>
                Maniska episoder påverkar ofta individens förmåga att fungera
                normalt i vardagen och kan leda till betydande sociala,
                juridiska och ekonomiska problem.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Bipolär typ 2 (Bipolar II disorder)
          </h3>
          <p className="mb-6">
            Denna form kännetecknas av minst en episod av hypomani och minst en
            episod av djup depression. Hypomani är en mildare form av mani som
            inte leder till allvarliga funktionsnedsättningar eller kräver
            sjukhusvård, men som fortfarande påverkar individens liv.
          </p>

          <div className="bg-primary-light/50 rounded-md p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-2">
                <BulbIcon className="w-6 h-6 text-primary-dark" />
                <h4 className="font-semibold text-primary-dark">
                  Karaktäristiska drag för hypomani:
                </h4>
              </div>
            </div>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                Förhöjt humör och ökad energi, men mindre intensivt än mani.
              </li>
              <li>Minskad sömnbehov, men inte lika extrem som vid mani.</li>
              <li>
                Impulsivt beteende, som att ta onödiga risker, dock mindre
                skadligt än vid mani.
              </li>
              <li>
                Ökad produktivitet och kreativitet, vilket kan uppfattas som
                positivt av individen själv.
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-primary-light w-full flex lg:flex-row  shadow-primary-dark/20 flex-col items-center shadow-md rounded-lg justify-end gap-6 md:gap-10 px-4 md:px-10 py-10">
          <div className="flex-1 h-full flex flex-col gap-4 items-center">
            <h3 className="font-bold text-xl md:text-2xl text-primary-dark mb-3">
              Depression vid bipolär sjukdom
            </h3>
            <div className="w-full rounded-lg overflow-hidden">
              <Image
                src="/images/bipolar/depression.webp"
                alt="terapi session"
                aria-label="terapi session mellan en psykoterapeut och en patient"
                width={1200}
                height={800}
                quality={80}
                className="object-cover rounded-sm lg:rounded-full"
                priority
              />
            </div>
          </div>
          <div className="flex-1 space-y-6 text-primary-dark">
            <div>
              <h5 className="font-semibold text-primary-dark mb-2 lg:text-lg">
                Hur bipolär depression skiljer sig från vanlig depression
              </h5>
              <p className="lg:text-base xl:text-lg text-primary-dark">
                Depression vid bipolär sjukdom kan vara djup och långvarig, ofta
                svår att skilja från egentlig depression. Skillnaden är att den
                bipolära depressionen förekommer i skov och är en del av
                sjukdomens cykliska natur, vilket innebär att perioder av
                nedstämdhet kan följas av hypomani eller mani.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-primary-dark mb-2 lg:text-lg">
                Verktyg för att hantera bipolär depression
              </h5>
              <p className="lg:text-base xl:text-lg text-primary-dark">
                För att hantera bipolär depression är det viktigt att skapa
                rutiner och använda strategier som kan mildra symtomen.
                Regelbunden sömn, en stabil dygnsrytm och att undvika stress kan
                göra stor skillnad. Att vara medveten om tidiga varningssignaler
                och ha en plan för att hantera nedstämdhet kan också hjälpa till
                att minska intensiteten och varaktigheten av en depressiv
                episod.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Cyklotymi (Cyclothymic disorder)
          </h3>
          <p className=" mb-6 ">
            Cyklotymi innebär att en person har regelbundna episoder av
            hypomaniliknande symtom och mildare depressiva episoder under minst
            två års tid (ett år för barn och ungdomar). Symtomen är inte
            tillräckligt allvarliga för att uppfylla kriterierna för bipolär typ
            1 eller 2, men tillståndet kan vara störande och påverka
            livskvaliteten.
          </p>

          <div className="bg-primary-light/50 rounded-md p-4">
            <div className="flex items-center gap-2 mb-3 text-primary-dark">
              <SpinningArrowsIcon className="w-6 h-6" />
              <h4 className="font-semibold ">
                Karaktäristiska drag för cyklotymi:
              </h4>
            </div>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                Upprepade humörsvängningar, men utan att nå fullständig mani,
                hypomani eller djup depression.
              </li>
              <li>Episoderna kan vara korta men återkomma regelbundet.</li>
              <li>
                Svårigheter att upprätthålla stabila relationer och prestationer
                i arbete eller skola.
              </li>
              <li>
                Cyklotymi kan utvecklas till bipolär typ 1 eller 2 om den inte
                behandlas.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Bipolär sjukdom med blandade drag (Mixed features)
          </h3>
          <p className=" mb-6 ">
            En blandad episod innebär att symtom på både mani (eller hypomani)
            och depression upplevs samtidigt. Detta kan vara särskilt
            förvirrande och påfrestande eftersom individen kan känna sig både
            extremt energisk och djupt hopplös på samma gång.
          </p>

          <div className="bg-primary-light/50 rounded-md p-4">
            <h4 className="font-semibold text-primary-dark mb-3">
              Exempel på symtom vid blandade drag:
            </h4>
            <ul className="flex flex-col gap-2 list-disc list-inside ">
              <li>
                Höga energinivåer och rastlöshet, kombinerat med en känsla av
                hopplöshet eller sorg.
              </li>
              <li>
                Snabba tankar och impulsivitet, tillsammans med tankar på
                självmord.
              </li>
              <li>
                Sömnproblem, med svårigheter att somna eller vakna tidigt.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Bipolär sjukdom med snabb cykling (Rapid cycling)
          </h3>
          <p className=" mb-6 ">
            Snabb cykling innebär att individen har minst fyra episoder av mani,
            hypomani, depression eller blandade tillstånd inom ett år. Denna
            variant kan vara särskilt svår att hantera eftersom
            humörsvängningarna sker i snabb följd.
          </p>

          <div className="bg-primary-light/50 rounded-md p-4">
            <h4 className="font-semibold text-primary-dark mb-3">
              Fakta om snabb cykling:
            </h4>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                Episoderna kan vara korta (flera dagar) eller långa (veckor till
                månader).
              </li>
              <li>
                Kvinnor är mer benägna att drabbas av snabb cykling än män.
              </li>
            </ul>
            <p className="mb-3">
              Tillståndet kan vara tillfälligt och utlösas av stress, hormonella
              förändringar eller medicinavbrott.
            </p>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Bipolär sjukdom med säsongsrelaterade drag (Seasonal pattern)
          </h3>
          <p className=" mb-6 ">
            Denna form av bipolär sjukdom innebär att humöret påverkas av
            årstiderna. Vanligtvis inträffar depression under höst och vinter,
            medan mani eller hypomani uppstår under våren och sommaren.
          </p>

          <div className="bg-primary-light/50 rounded-md p-4">
            <h4 className="font-semibold text-primary-dark mb-3">
              Typiska mönster:
            </h4>
            <ul className="flex flex-col gap-2 list-disc list-inside ">
              <li>
                Depression under mörkare månader, med symptom som trötthet,
                hopplöshet och minskat intresse för aktiviteter.
              </li>
              <li>
                Mani eller hypomani under ljusare månader, med symptom som ökad
                energi, förhöjt humör och minskat sömnbehov.
              </li>
              <li>
                Denna typ av bipolär sjukdom kan förväxlas med säsongsbunden
                depression (SAD), men bipolär sjukdom med säsongsdrag kan också
                inkludera maniska eller hypomaniska episoder.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Ospecificerad bipolär sjukdom (Unspecified bipolar disorder)
          </h3>
          <p className=" mb-6 ">
            Denna kategori används när symtomen inte helt passar in i någon av
            de andra typerna, men ändå orsakar betydande problem för individen.
            Exempelvis kan symtomen vara mindre tydliga, ha en ovanlig
            presentation eller utlösas av en specifik medicinsk eller
            substansrelaterad orsak.
          </p>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Schizoaffektivt syndrom
          </h3>
          <p className=" mb-6 ">
            Schizoaffektivt syndrom är ett psykiskt tillstånd som kombinerar
            symtom från schizofreni (som psykos, hallucinationer eller
            vanföreställningar) med symtom på en humörstörning, antingen
            depression eller mani. Det kan ibland förväxlas med bipolär sjukdom,
            särskilt om de psykotiska symtomen bara uppträder under
            humörepisoner.
          </p>
          <p className=" mb-6 ">
            Schizoaffektivt syndrom kan vara svårt att diagnosticera, eftersom
            det delar likheter med både schizofreni och bipolär sjukdom. Det är
            viktigt att en erfaren psykiatriker gör en noggrann bedömning
            baserad på tidslinjen för symtom och deras samband.
          </p>

          <div className="bg-primary-light/50 rounded-md p-4 flex flex-col gap-4">
            <h5 className="font-semibold text-primary-dark">
              Typer av schizoaffektivt syndrom:
            </h5>
            <ul className="flex flex-col gap-2 list-disc list-inside ">
              <li>
                Bipolär typ: Symtomen inkluderar maniska eller blandade
                episoder, med eller utan depression.
              </li>
              <li>
                Depressiv typ: Symtomen inkluderar endast depression tillsammans
                med psykos.
              </li>
            </ul>

            <h5 className="font-semibold text-primary-dark">
              Skillnad mot bipolär sjukdom:
            </h5>
            <ul className="flex flex-col gap-2 list-disc list-inside ">
              <li>
                Vid bipolär sjukdom uppträder psykotiska symtom (som
                hallucinationer eller vanföreställningar) endast under mani
                eller djup depression.
              </li>
              <li>
                Vid schizoaffektivt syndrom förekommer psykotiska symtom även
                utanför humörepisoner.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <RelatedContent currentPage="diagnoser" />
    </section>
  );
};

export default DiagnosesPage;
