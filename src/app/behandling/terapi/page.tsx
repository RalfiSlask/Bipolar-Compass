import EncouragmentContainer from '@/app/components/shared/EncouragmentContainer';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedTreatmentContent from '@/app/components/shared/RelatedTreatmentContent';
import { therapyIntro } from '@/app/data/pageIntros';
import Image from 'next/image';

const TherapyPage = () => {
  return (
    <section className="w-full space-y-12 max-w-[1440px] px-4 md:px-10 pt-10 pb-20">
      <PageIntroContainer intro={therapyIntro} />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col content-container">
          <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
            Psykoterapi: Samtalsterapi som verktyg
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Kognitiv beteendeterapi (KBT)
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-primary-dark mb-2">
                    Vad är KBT?
                  </h5>
                  <p>
                    KBT är en vanlig terapiform vid bipolär sjukdom i Sverige.
                    Den fokuserar på att identifiera och förändra negativa
                    tankemönster och beteenden. Behandlingen kan ges
                    individuellt eller i grupp, oftast en gång i veckan, och
                    längden på behandlingen varierar beroende på individuella
                    behov.
                  </p>
                </div>

                <div className="bg-primary-light/20 rounded-md p-4">
                  <h5 className="font-semibold text-primary-dark mb-2">
                    Hur kan det hjälpa?
                  </h5>
                  <ul className="flex flex-col gap-2 list-disc list-inside">
                    <li>
                      Förstå och hantera triggers som kan orsaka episoder.
                    </li>
                    <li>
                      Lära sig strategier för att minska stress och förbättra
                      relationer.
                    </li>
                    <li>
                      Bygga hälsosamma rutiner för att stabilisera humöret.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Interpersonell och social rytmterapi (IPSRT)
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-primary-dark mb-2">
                    Vad är IPSRT?
                  </h5>
                  <p>
                    En terapi som kombinerar interpersonella strategier med en
                    fokusering på dagliga rutiner.
                  </p>
                </div>

                <div className="bg-primary-light/20 rounded-md p-4">
                  <h5 className="font-semibold text-primary-dark mb-2">
                    Hur kan det hjälpa?
                  </h5>
                  <ul className="flex flex-col gap-2 list-disc list-inside">
                    <li>Förbättra relationer och minska konflikter.</li>
                    <li>
                      Skapa regelbundna rutiner för sömn, mat och aktiviteter.
                    </li>
                    <li>
                      Förebygga humörsvängningar genom att hantera livshändelser
                      och stress.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Psykoedukation
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-primary-dark mb-2">
                    Vad är psykoedukation?
                  </h5>
                  <p>
                    Psykoedukation, även kallad patient- och
                    närståendeutbildning, är en viktig del av behandlingen vid
                    bipolär sjukdom i Sverige. Den syftar till att öka
                    förståelsen för sjukdomen, hur läkemedel fungerar och vad
                    man själv kan göra för att minska risken för nya
                    sjukdomsskov.
                  </p>
                </div>

                <div className="bg-primary-light/20 rounded-md p-4">
                  <h5 className="font-semibold text-primary-dark mb-2">
                    Hur kan det hjälpa?
                  </h5>
                  <ul className="flex flex-col gap-2 list-disc list-inside">
                    <li>Öka insikten om bipolär sjukdom.</li>
                    <li>
                      Förbättra samarbetet med vårdpersonal och närstående.
                    </li>
                    <li>
                      Förbättra behandlingsföljsamhet, exempelvis medicinering.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
            Medicinsk behandling i kombination med terapi
          </h3>

          <div className="space-y-6">
            <p>
              Terapier kombineras ofta med medicinsk behandling för att ge bästa
              möjliga resultat.
            </p>

            <div className="space-y-4">
              <ul className="flex flex-col gap-2 list-disc list-inside">
                <li>
                  Stämningsstabiliserande mediciner: Hjälper till att minska
                  svängningar mellan mani och depression.
                </li>
                <li>Antidepressiva: Används vid behov i samråd med läkare.</li>
              </ul>
            </div>

            <div className="bg-primary-light/20 rounded-md p-4">
              <p>
                Att kombinera terapi med medicinering kan ge långsiktiga
                resultat och minska risken för återfall.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
            Gruppterapi och stödgrupper
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Gruppterapi:
              </h4>
              <p>
                Fungerar som ett sätt att dela erfarenheter och lära av andra
                med bipolär sjukdom. En terapeut leder gruppen och skapar en
                trygg miljö för att diskutera utmaningar och strategier.
              </p>
            </div>

            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Stödgrupper:
              </h4>
              <p>
                Informella möten med andra som har liknande erfarenheter. De
                erbjuder känslomässigt stöd och gemenskap.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
            Digital terapi och online-stöd
          </h3>

          <div className="space-y-6">
            <p>
              I en digital värld finns allt fler alternativ för terapi online.
            </p>

            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Appar och digitala program:
              </h4>
              <ul className="flex flex-col gap-2 list-disc list-inside">
                <li>Verktyg för mindfulness och humörspårning.</li>
                <li>Interaktiva terapiprogram baserade på KBT.</li>
              </ul>
            </div>

            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Online-terapi:
              </h4>
              <p>
                Möjlighet att prata med en terapeut via videosamtal, vilket kan
                vara särskilt användbart om du har svårt att ta dig till en
                mottagning.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
            Terapival: Hur hittar du rätt?
          </h3>

          <div className="space-y-6">
            <p>
              Att hitta rätt terapi är individuellt och kan ta tid. Här är några
              tips:
            </p>

            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Prata med din läkare eller psykiater:
              </h4>
              <p>
                De kan guida dig till rätt terapiform baserat på dina behov.
              </p>
            </div>

            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Utforska olika alternativ:
              </h4>
              <p>
                Testa flera terapiformer för att se vad som fungerar bäst för
                dig.
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

        <div className="flex flex-col content-container">
          <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
            Självhjälp som komplement till terapi
          </h3>

          <div className="space-y-6">
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
                Be dina närstående att stötta dig i din behandling och hjälpa
                dig följa din plan.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs lg:text-xl text-primary-dark mb-4">
            Psykologisk behandling som komplement till läkemedel
          </h3>

          <div className="space-y-6">
            <p>
              I Sverige rekommenderas ofta en kombination av läkemedel och
              psykologisk behandling för att effektivt hantera bipolär sjukdom.
              Psykologisk behandling kan både minska symtomen och förebygga nya
              sjukdomsperioder. Det är vanligt att påbörja terapi när
              stämningsläget har stabiliserats.
            </p>

            <div className="bg-primary-light/20 rounded-md p-4">
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Tillgång till terapi i Sverige
              </h4>
              <p>
                I Sverige kan du få tillgång till psykologisk behandling genom
                den offentliga hälso- och sjukvården eller via privata
                mottagningar. Många vårdcentraler erbjuder samtalsstöd eller
                korttidsbehandlingar, och vid behov kan du remitteras till en
                psykiatrisk mottagning för mer specialiserad vård.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary-light w-full flex lg:flex-row  shadow-primary-dark/20 flex-col items-center shadow-sm rounded-lg justify-end gap-10 px-4 md:px-10 py-10">
          <div className="flex-1 h-full flex flex-col gap-4 items-center">
            <h3 className="font-bold text-xl md:text-2xl text-primary-dark mb-3">
              Resurser och hjälp att börja
            </h3>
            <div className="w-full rounded-lg overflow-hidden">
              <Image
                src="/images/treatments/therapy.jpg"
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
                {' '}
                Hitta legitimerad psykolog eller psykoterapeut:
              </h5>
              <p className="text-primary-dark">
                För att hitta en legitimerad psykolog eller psykoterapeut i
                Sverige kan du använda dig av olika söktjänster som
                tillhandahålls av yrkesföreningar eller regioner. Det är viktigt
                att säkerställa att terapeuten har rätt kompetens och erfarenhet
                av att behandla bipolär sjukdom.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-primary-dark mb-2 lg:text-lg">
                Online-resurser:
              </h5>
              <p className="text-primary-dark">
                Webbplatser som erbjuder information om terapi och behandling.
                Om du söker på{' '}
                <a
                  href="https://www.1177.se/"
                  className="nav-link"
                  target="_blank"
                  aria-label="1177:s hemsida, allmän sida för vård"
                >
                  1177:s hemsida
                </a>{' '}
                så kan du läsa mer om terapi och behandling. Om du är ung
                rekommenderas att du läser mer på{' '}
                <a
                  href="https://www.umo.se/att-ta-hjalp/att-prata-med-nagon/att-ga-i-terapi"
                  className="nav-link"
                  target="_blank"
                  aria-label="UMO:s hemsida, tips för unga att söka hjälp"
                >
                  UMO:s hemsida.
                </a>
              </p>
            </div>
          </div>
        </div>
        <EncouragmentContainer text="Terapier är ett värdefullt verktyg för att hantera bipolär sjukdom. Oavsett vilken terapiform du väljer är det viktigaste att du tar första steget mot att söka hjälp. Vi är här för att stödja dig på din resa mot bättre hälsa och balans i livet." />
        <RelatedTreatmentContent currentPage="terapi" />
      </div>
    </section>
  );
};

export default TherapyPage;
