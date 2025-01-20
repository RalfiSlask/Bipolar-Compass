import Image from 'next/image';
import Anhoriga from '../../../assets/images/organizations/anhoriga-riksforbund.png';
import BalansRiks from '../../../assets/images/organizations/balans.png';
import Bris from '../../../assets/images/organizations/bris.png';
import Mind from '../../../assets/images/organizations/mind.png';
import NKA from '../../../assets/images/organizations/nka.png';
import NSPH from '../../../assets/images/organizations/nsph.png';
import SPES from '../../../assets/images/organizations/spes.png';
import SuicideZero from '../../../assets/images/organizations/suicide-zero.png';

const Organizations = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        href="https://balansriks.se/balans-foreningar/"
        className="organization-link"
      >
        <div className="h-16 flex items-center">
          <Image
            src={BalansRiks}
            alt="balans riks"
            width={160}
            height={40}
            className="object-contain max-w-[160px] w-full rounded-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h4 className="text-lg font-semibold text-primary-dark group-hover:text-primary-accent transition-colors duration-300">
          Balans Riks
        </h4>
        <p className="flex-grow text-secondary-dark/90">
          Balans är en rikstäckande ideell patient- och anhörigorganisation för
          personer med bipolär sjukdom, depression och andra psykiska
          ohälsotillstånd. De erbjuder stöd, information och gemenskap för både
          drabbade och anhöriga.
        </p>
      </a>

      <a href="https://anhorigasriksforbund.se/" className="organization-link">
        <div className="h-16 flex items-center justify-center">
          <Image
            src={Anhoriga}
            alt="anhoriga riksforbund"
            width={160}
            height={40}
            className="object-contain max-w-[160px] w-full rounded-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h4 className="text-lg font-semibold text-primary-dark group-hover:text-primary-accent transition-colors duration-300">
          Anhörigas Riksförbund
        </h4>
        <p className="flex-grow text-secondary-dark/90">
          Anhörigas Riksförbund är en partipolitiskt och religiöst obunden
          organisation som stödjer anhöriga och anhörigvårdare oavsett ålder,
          kön eller diagnos. De arbetar för att förbättra anhörigas situation
          genom opinionsbildning och erfarenhetsutbyte.
        </p>
      </a>

      <a
        href="https://mind.se/stod-kunskap/prata-eller-chatta-med-volontar/foraldralinjen/"
        className="organization-link"
      >
        <div className="h-16 flex items-center justify-center">
          <Image
            src={Mind}
            alt="mind"
            width={160}
            height={40}
            className="object-contain max-w-[160px] w-full rounded-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h4 className="text-lg font-semibold text-primary-dark group-hover:text-primary-accent transition-colors duration-300">
          Mind
        </h4>
        <p className="flex-grow text-secondary-dark/90">
          Mind driver Föräldralinjen, en stödlinje för föräldrar och andra vuxna
          som är oroliga för barn eller ungdomar. De erbjuder anonymt och
          kostnadsfritt stöd via telefon och chatt, och arbetar för psykisk
          hälsa och att förebygga psykisk ohälsa och självmord.
        </p>
      </a>

      <a href="https://nsph.se/" className="organization-link">
        <div className="h-16 flex items-center justify-center">
          <Image
            src={NSPH}
            alt="nationell samverkan för psykisk hälsa"
            width={160}
            height={40}
            className="object-contain max-w-[160px] w-full rounded-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h4 className="text-lg font-semibold text-primary-dark group-hover:text-primary-accent transition-colors duration-300">
          Nationell Samverkan för Psykisk Hälsa
        </h4>
        <p className="flex-grow text-secondary-dark/90">
          NSPH är ett nätverk av patient-, brukar- och anhörigorganisationer
          inom psykisk hälsa. De arbetar för att människor med psykisk ohälsa
          ska ges möjlighet till återhämtning och delaktighet i samhället på
          jämlika villkor.
        </p>
      </a>

      <a href="https://spes.se/" className="organization-link">
        <div className="h-16 flex items-center justify-center">
          <Image
            src={SPES}
            alt="SPES"
            width={160}
            height={40}
            className="object-contain max-w-[160px] w-full rounded-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h4 className="text-lg font-semibold text-primary-dark group-hover:text-primary-accent transition-colors duration-300">
          SPES
        </h4>
        <p className="flex-grow text-secondary-dark/90">
          SPES (Riksförbundet för SuicidPrevention och Efterlevandes Stöd) är en
          rikstäckande organisation som stödjer efterlevande vid självmord och
          arbetar för att förebygga suicid. De erbjuder samtalsstöd, träffar och
          olika aktiviteter för efterlevande.
        </p>
      </a>

      <a href="https://www.bris.se/" className="organization-link">
        <div className="h-16 flex items-center justify-center">
          <Image
            src={Bris}
            alt="barnens rätt i samhället"
            width={160}
            height={40}
            className="object-contain max-w-[160px] w-full rounded-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h4 className="text-lg font-semibold text-primary-dark group-hover:text-primary-accent transition-colors duration-300">
          Barnens Rätt i Samhället
        </h4>
        <p className="flex-grow text-secondary-dark/90">
          BRIS är en barnrättsorganisation som stöttar barn och unga,
          mobiliserar samhället och påverkar beslutsfattare för ett bättre
          samhälle för barn. De erbjuder professionellt samtalsstöd via telefon,
          chatt och mail för barn upp till 18 år.
        </p>
      </a>

      <a href="https://suicidezero.se/" className="organization-link">
        <div className="h-16 flex items-center justify-center">
          <Image
            src={SuicideZero}
            alt="suicide zero"
            width={160}
            height={40}
            className="object-contain max-w-[160px] w-full rounded-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h4 className="text-lg font-semibold text-primary-dark group-hover:text-primary-accent transition-colors duration-300">
          Suicide Zero
        </h4>
        <p className="flex-grow text-secondary-dark/90">
          Suicide Zero är en ideell organisation som arbetar för att radikalt
          minska självmorden i Sverige. De sprider kunskap, bedriver
          opinionsbildning och stödjer forskning för att förebygga psykisk
          ohälsa och självmord.
        </p>
      </a>

      <a href="https://anhoriga.se/" className="organization-link">
        <div className="h-16 flex items-center justify-center">
          <Image
            src={NKA}
            alt="nka"
            width={160}
            height={40}
            className="object-contain max-w-[160px] w-full rounded-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h4 className="text-lg font-semibold text-primary-dark group-hover:text-primary-accent transition-colors duration-300">
          Nationellt Kompetenscentrum Anhöriga
        </h4>
        <p className="flex-grow text-secondary-dark/90">
          NKA är ett expertcentrum som arbetar för att utveckla framtidens
          anhörigstöd. De samlar och sprider kunskap om anhörigfrågor, utvecklar
          metoder och verktyg för anhörigstöd, samt erbjuder utbildningar och
          konferenser.
        </p>
      </a>
    </div>
  );
};

export default Organizations;
