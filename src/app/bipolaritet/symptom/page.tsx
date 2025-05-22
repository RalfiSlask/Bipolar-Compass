'use client';

import EncouragmentContainer from '@/app/components/shared/EncouragmentContainer';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedContent from '@/app/components/shared/RelatedContent';
import { symptomsIntro } from '@/app/data/pageIntros';
import Link from 'next/link';

const SymptomsPage = () => {
  return (
    <section className="w-full space-y-12 max-w-[1440px] px-4 md:px-10 pt-10 pb-20">
      <PageIntroContainer intro={symptomsIntro} />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Symptom under maniska episoder
          </h3>
          <p className="mb-6 ">
            En manisk episod innebär ett förhöjt, expansivt eller irritabelt
            humör som varar i minst en vecka och påverkar vardagen betydligt.
            Typiska symptom är:
          </p>
          <div className="bg-primary-light/50 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                Överdrivet självförtroende: Personen kan känna sig grandios och
                osårbar
              </li>
              <li>
                Ökad energi och aktivitetsnivå: Man tar sig an flera projekt
                samtidigt, ofta utan att slutföra dem
              </li>
              <li>
                Minskat sömnbehov: Sömn upplevs som överflödigt; personen kan
                känna sig pigg efter bara ett par timmars sömn
              </li>
              <li>
                Snabbt och intensivt tal: Svårt för andra att avbryta eller
                hänga med
              </li>
              <li>
                Tankeflykt: Tankarna rusar, vilket kan leda till impulsiva
                beslut
              </li>
              <li>
                Riskfyllt beteende: Kan inkludera överdrivet spenderande,
                farliga situationer eller oansvarigt sexuellt beteende
              </li>
              <li>
                Irritabilitet: Personen kan snabbt bli frustrerad eller arg
              </li>
            </ul>
          </div>
          <p className="mt-6 ">
            Efter en manisk episod kan det vara känslomässigt tungt att inse
            vilka konsekvenser ens beteende har fått.
          </p>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Symptom under hypomaniska episoder
          </h3>
          <p className="mb-6 ">
            Hypomani är en lindrigare form av mani, som inte leder till samma
            grad av funktionsnedsättning. Symptomen liknar de vid mani men är
            mindre intensiva och kortvariga (minst fyra dagar). Vanliga symptom
            är:
          </p>
          <div className="bg-primary-light/50 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                Förhöjt humör: Personen känner sig positiv och entusiastisk
              </li>
              <li>
                Ökad energi och kreativitet: Produktiviteten ökar, ofta i arbete
                eller hobbyprojekt
              </li>
              <li>
                Minskat sömnbehov: Mindre sömn behövs utan att känna trötthet
              </li>
              <li>
                Social utåtriktning: Personen kan vara mer pratglad och
                sällskaplig än vanligt
              </li>
            </ul>
          </div>
          <p className="mt-6 ">
            Hypomaniska episoder kan ofta passera obemärkta av individen själv
            men kan ibland övergå i fullständig mani.
          </p>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Symptom under depressiva episoder
          </h3>
          <p className="mb-6 ">
            Depressiva episoder innebär en kraftig nedstämdhet och minskad
            energi som varar i minst två veckor. Dessa symptom inkluderar:
          </p>
          <div className="bg-primary-light/50 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                Ihållande nedstämdhet: Känslor av sorg, hopplöshet eller
                irritabilitet
              </li>
              <li>
                Förlorat intresse: Oförmåga att njuta av tidigare uppskattade
                aktiviteter
              </li>
              <li>
                Trötthet och energilöshet: Vardagsaktiviteter känns
                överväldigande
              </li>
              <li>
                Sömnstörningar: Svårigheter att somna, tidiga uppvaknanden eller
                överdriven sömn
              </li>
              <li>Ändrad aptit: Kan leda till viktförlust eller viktuppgång</li>
              <li>
                Koncentrationssvårigheter: Svårt att fatta beslut eller fokusera
              </li>
              <li>
                Tankar på döden: Återkommande tankar på döden eller självmord
              </li>
            </ul>
          </div>
          <p className="mt-6 ">
            Depression vid bipolär sjukdom är ofta djupare och mer långvarig än
            vid en &quot;vanlig&quot; depression.
          </p>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">Blandade episoder</h3>
          <p className="mb-6 ">
            En blandad episod innebär att symptom på mani och depression
            uppträder samtidigt. Till exempel kan personen känna sig rastlös och
            upprymd, men samtidigt uppleva en djup nedstämdhet och hopplöshet.
            Dessa episoder är särskilt svåra att hantera och kräver ofta
            omedelbar vård.
          </p>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">Psykotiska symptom</h3>
          <p className="mb-6 ">
            Vid allvarlig mani eller depression kan psykotiska symptom uppstå,
            såsom:
          </p>
          <div className="bg-primary-light/50 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                Vanföreställningar: Personen kan tro att de har övermänskliga
                förmågor (vid mani) eller att de är förföljda (vid depression)
              </li>
              <li>
                Hallucinationer: Kan inkludera röster eller syner som inte är
                verkliga
              </li>
            </ul>
          </div>
          <p className="mt-6 ">
            Dessa symptom försvinner vanligtvis med behandling.
          </p>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Tidiga tecken och varningstecken
          </h3>
          <p className="mb-6 ">
            Många med bipolär sjukdom upplever tidiga tecken innan en ny episod.
            Det är viktigt att känna igen dessa tecken för att söka vård i tid:
          </p>
          <div className="bg-primary-light/50 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>Sömnproblem (svårt att somna eller minskat sömnbehov)</li>
              <li>Förändrad aptit</li>
              <li>Ökad irritabilitet eller rastlöshet</li>
              <li>Ovanlig energinivå</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            När bör du söka hjälp?
          </h3>
          <p className="">
            Om du eller någon i din närhet upplever ovanstående symptom och de
            påverkar vardagen negativt, bör vård sökas så snart som möjligt. Vid
            akuta situationer, som tankar på att skada sig själv eller andra,
            ska du kontakta psykiatrisk akutmottagning eller ringa 112.
          </p>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Symptom hos barn och ungdomar
          </h3>
          <p className="mb-6 ">
            Bipolär sjukdom kan vara särskilt utmanande att identifiera hos barn
            och ungdomar. Det kan vara svårt att skilja mellan normala
            humörsvängningar under uppväxten och tecken på bipolär sjukdom.
          </p>
          <div className="bg-primary-light/50 rounded-md p-4">
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>Snabbare humörsvängningar än hos vuxna</li>
              <li>Mer frekventa episoder med kortare duration</li>
              <li>Svårare att uttrycka känslor och upplevelser verbalt</li>
              <li>
                Kan uppvisa irritabilitet snarare än klassisk mani eller
                depression
              </li>
              <li>Symptom kan förväxlas med andra tillstånd som ADHD</li>
            </ul>
          </div>
          <p className="mt-6 ">
            Det är viktigt att söka professionell hjälp för korrekt diagnos och
            behandling, då tidig intervention kan förbättra prognosen avsevärt.
          </p>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">
            Att känna igen när du behöver hjälp
          </h3>
          <p className="mb-6 ">
            Många personer med bipolär sjukdom kan ha svårt att inse hur mycket
            deras humörsvängningar påverkar dem själva och deras närstående.
            Särskilt under maniska perioder kan det vara svårt att se behovet av
            hjälp, då den ökade energin och kreativiteten kan upplevas som
            positiv.
          </p>
          <div className="bg-primary-light/50 rounded-md p-4">
            <h4 className="font-semibold text-primary-dark mb-3">
              Viktiga varningssignaler:
            </h4>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>När humörsvängningar börjar påverka relationer negativt</li>
              <li>
                Om du fattar impulsiva beslut som får allvarliga konsekvenser
              </li>
              <li>När vardagliga rutiner blir svåra att upprätthålla</li>
              <li>Om du upplever återkommande perioder av hopplöshet</li>
            </ul>
          </div>
          <p className="mt-6 ">
            Det är viktigt att komma ihåg att bipolär sjukdom är en
            behandlingsbar tillstånd, men det kräver professionell hjälp.
            Sjukdomen går inte över av sig själv.
          </p>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-4">Vid akuta situationer</h3>
          <p className="mb-6 ">
            Om du eller någon i din närhet har akuta självmordstankar eller
            planer på att skada sig själv är det viktigt att agera omedelbart.
            Du är inte ensam och det finns hjälp att få.
          </p>
          <div className="bg-primary-light/50 rounded-md p-4">
            <h4 className="font-semibold text-primary-dark mb-3">
              Här kan du få akut hjälp:
            </h4>
            <ul className="flex flex-col gap-2 list-disc list-inside mb-6">
              <li>Ring 112 vid akuta situationer</li>
              <li>Kontakta närmaste psykiatriska akutmottagning</li>
              <li>Ring Mind Självmordslinjen på 90101</li>
              <li>Prata med en närstående som kan hjälpa dig söka vård</li>
            </ul>
            <p>
              Om du inte hittar det du söker kan du gå in på vår hjälpsida:
              <Link
                href="/akut"
                aria-label="Akut hjälp"
                className="nav-link ml-2 text-primary-dark"
              >
                Akut hjälp
              </Link>
            </p>
          </div>

          <EncouragmentContainer text="Det är alltid bättre att söka hjälp en gång för mycket än en gång för lite. Vårdpersonal är van vid att möta personer i kris och finns där för att hjälpa utan att döma." />
          <RelatedContent currentPage="symptom" />
        </div>
      </div>
    </section>
  );
};

export default SymptomsPage;
