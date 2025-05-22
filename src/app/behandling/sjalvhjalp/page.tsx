import Stress from '@/app/components/pages/treatment/Stress';
import EncouragmentContainer from '@/app/components/shared/EncouragmentContainer';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedTreatmentContent from '@/app/components/shared/RelatedTreatmentContent';
import { selfHelpIntro } from '@/app/data/pageIntros';
import Image from 'next/image';

const SelfHelpPage = () => {
  return (
    <section className="w-full space-y-12 max-w-[1440px] px-4 md:px-10 pt-10 pb-20">
      <PageIntroContainer intro={selfHelpIntro} />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col content-container">
          <h3 className="h-xs md:text-2xl text-primary-dark mb-4">
            Förstå din sjukdom
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="lg:text-lg text-lg font-semibold text-primary-dark mb-3">
                Vad är bipolär sjukdom?
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Bipolär sjukdom är ett komplext psykiskt hälsotillstånd som
                  påverkar ditt humör, energi och aktivitetsnivå på ett
                  betydande sätt. Sjukdomen karakteriseras av distinkta perioder
                  av mani eller hypomani som växlar med perioder av depression.
                  Dessa humörsvängningar kan vara mer intensiva än vanliga upp-
                  och nedgångar som alla människor upplever och kan påverka både
                  vardagligt liv och relationer.
                </p>
              </div>
            </div>

            <div>
              <h4 className="lg:text-lg text-lg font-semibold text-primary-dark mb-3">
                Vanliga symtom:
              </h4>
              <ul className="flex flex-col gap-2 list-disc list-inside">
                <li>
                  <span className="font-semibold text-secondary-dark">
                    Mani/hypomani:
                  </span>{' '}
                  Ökad energi, impulsivitet, överdrivet självförtroende.
                </li>
                <li>
                  <span className="font-semibold text-secondary-dark">
                    Depression:
                  </span>{' '}
                  Låg energi, hopplöshet, minskat intresse för aktiviteter.
                </li>
              </ul>
            </div>

            <div className="bg-primary-light/50 rounded-md p-4">
              <h4 className="lg:text-lg text-lg font-semibold text-primary-dark mb-3">
                Vikten av kunskap:
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Att förstå din diagnos är ett kraftfullt verktyg i din
                  återhämtningsresa. Genom att lära dig mer om bipolär sjukdom
                  kan du inte bara känna igen tidiga varningstecken, utan också
                  utveckla effektiva strategier för att hantera dem. Kunskap ger
                  dig makten att ta kontroll över din hälsa och fatta
                  välgrundade beslut om din behandling.
                </p>
                <p>
                  Det hjälper dig också att kommunicera bättre med vårdpersonal
                  och närstående om dina upplevelser och behov. Genom ökad
                  förståelse kan du bli en mer aktiv deltagare i din egen
                  vårdprocess och bättre förutse och hantera utmaningar som kan
                  uppstå längs vägen.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 content-container">
          <h3 className="h-xs md:text-2xl text-primary-dark mb-4">
            Dagliga rutiner
          </h3>

          <div className="space-y-10">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 lg:min-h-fit">
                <h4 className="lg:text-xl text-lg font-semibold text-primary-dark mb-3">
                  Skapa struktur
                </h4>
                <div className="flex flex-col space-y-3">
                  <p className="text-base xl:text-lg">
                    En välplanerad daglig rutin är grundläggande för att hantera
                    bipolär sjukdom. Genom att etablera fasta tider för sömn,
                    måltider och aktiviteter skapar du en förutsägbar rytm som
                    hjälper till att stabilisera ditt humör. Börja med att sätta
                    upp en enkel morgon- och kvällsrutin. Planera dina måltider
                    vid ungefär samma tider varje dag och försök att hålla samma
                    aktivitetsnivå.
                  </p>
                  <p className="text-base xl:text-lg">
                    Det kan vara hjälpsamt att använda en kalender eller app för
                    att hålla koll på dina rutiner. Var dock inte för hård mot
                    dig själv om du ibland avviker från rutinen - flexibilitet
                    är också viktigt.
                  </p>
                </div>
              </div>
              <div className="flex-1 max-h-[350px] lg:h-full">
                <Image
                  src="/images/treatments/routine.webp"
                  alt="Sleep"
                  aria-label="kvinna som sover"
                  width={1200}
                  height={800}
                  quality={80}
                  className="rounded-lg object-cover max-h-[350px] lg:h-full"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse lg:flex-row gap-10">
              <div className="flex-1 max-h-[350px] lg:h-full">
                <Image
                  src="/images/treatments/sleep.webp"
                  alt="Sleep"
                  aria-label="kvinna som sover"
                  width={1200}
                  height={800}
                  quality={80}
                  className="rounded-lg object-cover max-h-[350px] lg:h-full"
                />
              </div>
              <div className="flex-1 lg:min-h-fit">
                <h4 className="lg:text-xl text-lg font-semibold text-primary-dark mb-3">
                  Sömn
                </h4>
                <div className="flex flex-col space-y-3">
                  <p className="text-base xl:text-lg">
                    God sömn är en av de viktigaste faktorerna för att hantera
                    bipolär sjukdom. Sikta på att gå och lägga dig samt vakna
                    vid samma tid varje dag, även på helger. Skapa en lugnande
                    kvällsrutin som börjar 1-2 timmar före läggdags: dämpa
                    belysningen, undvik skärmar eller använd blåljusfilter, och
                    ägna dig åt avslappnande aktiviteter som läsning eller
                    meditation.
                  </p>
                  <p className="text-base xl:text-lg">
                    Undvik koffein efter lunch och större måltider sent på
                    kvällen. Se till att ditt sovrum är svalt, tyst och mörkt.
                    Om du har svårt att somna, stig upp och gör något lugnande
                    tills du känner dig sömnig igen, istället för att ligga och
                    vrida dig i sängen.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 lg:min-h-fit">
                <h4 className="lg:text-xl text-lg font-semibold text-primary-dark mb-3">
                  Motion
                </h4>
                <div className="flex flex-col space-y-3">
                  <p className="text-base xl:text-lg">
                    Regelbunden fysisk aktivitet är en kraftfull naturlig
                    stämningsstabilisator. Det behöver inte vara intensiv
                    träning - även måttlig motion som promenader, simning eller
                    yoga kan ha stora fördelar för både ditt fysiska och
                    psykiska välbefinnande. Försök att röra på dig minst 30
                    minuter de flesta dagar i veckan.
                  </p>
                  <p className="text-base xl:text-lg">
                    Välj aktiviteter som du tycker om och som passar din
                    energinivå. Under perioder av depression kan det vara extra
                    utmanande att komma igång - börja då med små, hanterbara mål
                    som en kort promenad runt kvarteret. Under maniska perioder
                    kan det vara bra att fokusera på lugnare aktiviteter som
                    stretching eller tai chi för att inte överanstränga sig.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <Image
                  src="/images/treatments/gym.webp"
                  alt="Motion"
                  aria-label="Motion"
                  width={1200}
                  height={800}
                  quality={80}
                  className="rounded-lg w-full h-[300px] lg:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <Stress />
        <div className="flex flex-col content-container">
          <h3 className="h-xs md:text-2xl text-primary-dark mb-4">
            Relationsstöd
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="lg:text-lg text-lg font-semibold text-primary-dark mb-3">
                Prata med andra
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Att öppna upp sig för andra om din bipolära sjukdom kan kännas
                  utmanande, men ärlig kommunikation är nyckeln till starka och
                  stödjande relationer. Börja med att dela med dig till personer
                  du litar på och känner dig trygg med.
                </p>
                <p>
                  När du berättar om din diagnos, var tydlig med vilken typ av
                  stöd du behöver. Det kan handla om praktisk hjälp, någon som
                  lyssnar utan att döma, eller någon som kan hjälpa dig att
                  upptäcka tidiga varningstecken på en episod.
                </p>
                <p>
                  Kom ihåg att dina närstående också kan behöva tid att förstå
                  och lära sig om sjukdomen. Ge dem resurser och information som
                  kan hjälpa dem att bättre förstå vad du går igenom. Uppmuntra
                  dem att ställa frågor och var öppen för dialog.
                </p>
              </div>
            </div>

            <div>
              <h4 className="lg:text-lg text-lg font-semibold text-primary-dark mb-3">
                Sök stödgrupper
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Stödgrupper erbjuder en unik möjlighet att dela erfarenheter
                  med andra som verkligen förstår vad du går igenom. I dessa
                  grupper kan du både ge och få stöd, dela praktiska tips och
                  strategier, och bygga värdefulla kontakter.
                </p>
                <p>
                  Det finns olika typer av stödgrupper tillgängliga - vissa möts
                  fysiskt, andra online. Online-grupper kan vara särskilt
                  värdefulla när du inte har möjlighet att delta i fysiska möten
                  eller föredrar anonymiteten som internet erbjuder.
                </p>
                <p>
                  När du väljer en stödgrupp, ta dig tid att hitta en som känns
                  rätt för dig. Det är viktigt att gruppen har en positiv och
                  stödjande atmosfär där du känner dig bekväm att dela dina
                  upplevelser.
                </p>
              </div>
            </div>

            <div>
              <h4 className="lg:text-lg text-lg font-semibold text-primary-dark mb-3">
                Sätt gränser
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Att sätta hälsosamma gränser är avgörande för ditt välmående.
                  Detta innebär att lära sig känna igen när sociala situationer,
                  arbete eller andra åtaganden blir överväldigande och att kunna
                  säga nej när det behövs.
                </p>
                <p>
                  Var tydlig med dina behov och begränsningar, både på jobbet
                  och i privata relationer. Det är inte själviskt att prioritera
                  din hälsa - tvärtom är det nödvändigt för att du ska kunna
                  vara ditt bästa jag i relation till andra.
                </p>
                <p>
                  Utveckla strategier för att hantera situationer där dina
                  gränser utmanas. Detta kan innebära att ha förberedda fraser
                  för att tacka nej till inbjudningar, eller att planera in
                  återhämtningstid efter sociala aktiviteter.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs md:text-2xl text-primary-dark mb-4">
            Hantera humörsvängningar
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="lg:text-lg text-lg font-semibold text-primary-dark mb-3">
                Spåra ditt humör
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Att regelbundet spåra ditt humör är ett av de mest effektiva
                  sätten att hantera bipolär sjukdom. Genom vår inbyggda
                  humör-tracker kan du enkelt dokumentera dina dagliga känslor,
                  energinivåer och aktiviteter. Detta hjälper dig att
                  identifiera mönster i dina humörsvängningar och upptäcka
                  tidiga varningstecken på kommande episoder.
                </p>
                <p>
                  När du spårar ditt humör, notera även faktorer som sömn,
                  medicinering, stress, och sociala interaktioner. Denna
                  information kan hjälpa dig och din vårdgivare att bättre
                  förstå vad som påverkar ditt mående och anpassa din behandling
                  därefter. Det kan också ge dig en känsla av kontroll och
                  hjälpa dig att fatta mer informerade beslut om din dagliga
                  rutin.
                </p>
              </div>
            </div>

            <div>
              <h4 className="lg:text-lg text-lg font-semibold text-primary-dark mb-3">
                Förebyggande åtgärder
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Att känna igen och agera på tidiga varningstecken är avgörande
                  för att förebygga allvarliga episoder. Var uppmärksam på
                  subtila förändringar i ditt beteende, som förändrade
                  sömnmönster, ökad irritabilitet, eller förändringar i aptit
                  och energinivå. Skapa en personlig handlingsplan för vad du
                  ska göra när du märker dessa tecken, och dela den med personer
                  du litar på.
                </p>
                <p>
                  Det är också viktigt att upprätthålla en balanserad livsstil
                  även när du mår bra. Detta inkluderar regelbunden motion,
                  hälsosam kost, tillräcklig sömn och stresshantering. Genom att
                  bibehålla dessa rutiner minskar du risken för återfall och
                  bygger upp din motståndskraft mot framtida episoder.
                </p>
              </div>
            </div>

            <div>
              <h4 className="lg:text-lg text-lg font-semibold text-primary-dark mb-3">
                Följ din behandlingsplan
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  En konsekvent behandlingsplan är grundläggande för att hantera
                  bipolär sjukdom effektivt. Detta inkluderar att ta ordinerad
                  medicin enligt schema, även när du känner dig stabil. Många
                  upplever perioder då de överväger att sluta med sin medicin,
                  särskilt under stabila perioder, men detta kan öka risken för
                  återfall betydligt.
                </p>
                <p>
                  Regelbundna besök hos din vårdgivare är också en viktig del av
                  behandlingen. Dessa möten ger möjlighet att justera din
                  behandling efter behov, diskutera eventuella biverkningar och
                  få professionellt stöd i din hantering av sjukdomen. Var öppen
                  med din vårdgivare om dina upplevelser och eventuella
                  utmaningar du möter - detta hjälper dem att ge dig bästa
                  möjliga vård.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs md:text-2xl text-primary-dark mb-4">
            När söka hjälp
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="lg:text-lg text-lg font-semibold text-primary-dark mb-3">
                Varningstecken
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Det är viktigt att kunna identifiera när dina symtom blir
                  allvarliga nog att kräva professionell hjälp. Var särskilt
                  uppmärksam på tecken som kraftigt förhöjt eller sänkt
                  stämningsläge, sömnlöshet som varar flera dagar, oförmåga att
                  sköta dagliga rutiner, eller tankar på att skada dig själv
                  eller andra.
                </p>
                <p>
                  Andra viktiga varningstecken kan vara överdriven
                  irritabilitet, impulsivt beteende som riskerar att skada dig
                  ekonomiskt eller socialt, isolering från omvärlden, eller en
                  känsla av hopplöshet som inte går över. Kom ihåg att det är
                  bättre att söka hjälp tidigt än att vänta tills situationen
                  blir kritisk.
                </p>
              </div>
            </div>

            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Professionell hjälp
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Det finns många olika typer av professionell hjälp
                  tillgänglig. En psykiater kan hjälpa dig med medicinsk
                  behandling och övervakning av din sjukdom, medan en psykolog
                  eller terapeut kan erbjuda samtalsterapi och verktyg för att
                  hantera dina symtom. Många finner att en kombination av både
                  medicinsk behandling och terapi ger bäst resultat.
                </p>
                <p>
                  Din vårdcentral kan vara en bra första kontakt för att få
                  remiss till rätt specialist. De kan också hjälpa dig att
                  navigera i vårdsystemet och hitta rätt typ av stöd för dina
                  specifika behov. Var inte rädd för att be om en second opinion
                  om du känner att din nuvarande behandling inte fungerar
                  optimalt.
                </p>
              </div>
            </div>

            <div className="bg-primary-light/50 rounded-md p-4">
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Nödkontakter
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Det är viktigt att ha en lista med relevanta nödkontakter
                  lättillgänglig, särskilt under perioder när du känner dig
                  instabil. Detta inkluderar kontaktuppgifter till din
                  vårdcentral, psykiatriska akutmottagningar och jourhavande
                  medmänniska. Spara dessa nummer både i din telefon och på ett
                  papper som du förvarar på en synlig plats.
                </p>
                <p>
                  Överväg att dela denna information med en betrodd vän eller
                  familjemedlem som kan hjälpa dig att söka vård om du själv har
                  svårt att göra det. Det kan också vara bra att i förväg
                  diskutera med dina närstående vilka tecken de ska vara
                  uppmärksamma på och hur de bäst kan stötta dig i en
                  krissituation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <div className="flex flex-col lg:flex-row gap-10 mb-3">
            <div className="flex-1 lg:min-h-fit">
              <h4 className="text-lg font-semibold text-primary-dark mb-3">
                Artiklar och böcker
              </h4>
              <div className="flex flex-col space-y-3">
                <p className="text-base xl:text-lg">
                  Att fördjupa din kunskap om bipolär sjukdom genom
                  kvalitetsgranskad litteratur kan ge dig värdefulla insikter
                  och verktyg. Vetenskapliga artiklar och böcker skrivna av
                  experter inom området kan hjälpa dig förstå de senaste
                  forskningsrönen och behandlingsmetoderna. Var särskilt
                  uppmärksam på material som är granskat av medicinska experter
                  och publicerat av erkända institutioner.
                </p>
                <p className="text-base xl:text-lg">
                  Personliga berättelser och memoarer från andra som lever med
                  bipolär sjukdom kan också vara mycket värdefulla. Dessa kan ge
                  praktiska tips och strategier som andra har funnit hjälpsamma,
                  samtidigt som de påminner dig om att du inte är ensam i din
                  upplevelse. Din lokala vårdgivare eller patientförening kan
                  ofta rekommendera lämplig litteratur.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <Image
                src="/images/treatments/books.webp"
                alt="Motion"
                aria-label="Motion"
                width={1200}
                height={800}
                quality={80}
                className="rounded-lg w-full h-[300px] lg:h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Appar
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Det finns många användbara appar som kan stödja dig i din
                  hantering av bipolär sjukdom. Förutom vår egen
                  humörspårningsfunktion finns det appar för meditation,
                  sömnövervakning, och stresshantering. Leta efter appar som har
                  vetenskapligt stöd och positiva användarrecensioner. Många
                  appar erbjuder också påminnelser för medicinering och
                  möjlighet att exportera data som du kan dela med din
                  vårdgivare.
                </p>
                <p>
                  Var dock medveten om att appar ska ses som ett komplement
                  till, inte en ersättning för, professionell vård. Välj ett
                  fåtal appar som verkligen hjälper dig och undvik att bli
                  överväldigad av för många olika verktyg. Det är bättre att
                  använda några få appar konsekvent än att hoppa mellan många
                  olika.
                </p>
              </div>
            </div>

            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Online-stöd
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Internet erbjuder många värdefulla resurser för personer med
                  bipolär sjukdom. Förutom Bipolärkompassen finns det flera
                  pålitliga webbplatser som tillhandahåller aktuell information,
                  forskningsnyheter och praktiska råd. Online-forum och
                  stödgrupper kan erbjuda gemenskap och möjlighet att dela
                  erfarenheter med andra i liknande situation.
                </p>
                <p>
                  När du använder online-resurser, var noga med att välja
                  trovärdiga källor. Fokusera på webbplatser från erkända
                  organisationer, sjukvårdsinstitutioner och patientföreningar.
                  Var försiktig med råd om behandling eller medicinering som du
                  hittar online - diskutera alltid sådana frågor med din
                  vårdgivare innan du gör några förändringar.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs md:text-2xl text-primary-dark mb-4">
            Självmedkänsla och långsiktig hälsa
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Acceptera dig själv
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Att leva med bipolär sjukdom kan ibland kännas överväldigande,
                  men kom ihåg att din diagnos inte definierar dig som person.
                  Du är mycket mer än din sjukdom - du har unika styrkor,
                  talanger och möjligheter. Att utveckla självmedkänsla innebär
                  att behandla dig själv med samma vänlighet och förståelse som
                  du skulle visa en god vän.
                </p>
                <p>
                  Lär dig att identifiera och utmana negativa tankemönster och
                  självkritik. Fokusera istället på dina framsteg och styrkor.
                  Det är naturligt att ha både bättre och sämre dagar -
                  acceptera att återhämtning är en process och att varje litet
                  steg framåt är en seger värd att uppmärksamma.
                </p>
              </div>
            </div>

            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Sätt realistiska mål
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Att sätta realistiska mål är viktigt för din långsiktiga hälsa
                  och välbefinnande. Börja med små, uppnåbara mål och bygg
                  gradvis vidare på dina framgångar. Detta kan handla om allt
                  från att etablera en regelbunden sömnrutin till att återuppta
                  en hobby eller förbättra dina relationer.
                </p>
                <p>
                  Var flexibel med dina mål och anpassa dem efter din aktuella
                  energinivå och mående. Det är helt okej att justera eller
                  skjuta upp mål när du går igenom en svårare period. Det
                  viktiga är att du fortsätter röra dig framåt, även om det
                  ibland sker i ett långsammare tempo än du skulle önska.
                </p>
              </div>
            </div>

            <div>
              <h4 className="lg:text-lg font-semibold text-primary-dark mb-3">
                Fira framgångar
              </h4>
              <div className="flex flex-col space-y-3">
                <p>
                  Att uppmärksamma och fira dina framsteg är en viktig del av
                  återhämtningsprocessen. Varje steg framåt, oavsett hur litet
                  det kan verka, är värt att fira. Det kan handla om att du
                  följt din medicinering konsekvent, använt dina
                  copingstrategier framgångsrikt, eller vågat vara öppen om din
                  sjukdom med en vän.
                </p>
                <p>
                  Skapa ett system för att dokumentera dina framsteg, till
                  exempel genom att föra dagbok eller dela dina framgångar med
                  en stödperson. Att se tillbaka på dessa noteringar kan ge dig
                  styrka och motivation under svårare perioder, och påminna dig
                  om hur långt du har kommit i din resa mot bättre hälsa.
                </p>
              </div>
            </div>
          </div>
        </div>
        <EncouragmentContainer text="Kom ihåg, du är inte ensam. Denna sida är här för att ge dig stöd och inspiration. Ta det ett steg i taget, och tveka inte att söka hjälp när du behöver det." />
      </div>
      <RelatedTreatmentContent currentPage="sjalvhjalp" />
    </section>
  );
};

export default SelfHelpPage;
