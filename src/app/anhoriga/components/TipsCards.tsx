import {
  FaExclamationTriangle,
  FaRegHeart,
  FaUserShield,
} from 'react-icons/fa';
import TipCard from './TipCard';

const TipsCards = () => {
  return (
    <div className="flex flex-col items-center content-container gap-6">
      <h3 className="h-xs text-tertiary-dark font-bold">
        Att tänka på som anhörig vid tvångsvård
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <TipCard
          icon={<FaRegHeart />}
          title="Det är inte ditt fel"
          text="Att ansöka om tvångsvård kan vara svårt och skuldbelagt. Kom ihåg att detta handlar om att skydda din närstående och ge dem nödvändig vård."
        />
        <TipCard
          icon={<FaExclamationTriangle />}
          title="Var beredd på motstånd"
          text="Många i mani eller psykos förstår inte sitt tillstånd. Det är viktigt att behålla lugnet och låta vårdpersonalen hantera situationen."
        />
        <TipCard
          icon={<FaUserShield />}
          title="Ta hand om dig själv"
          text="Processen kan vara känslomässigt krävande. Se till att du har stöd från andra anhöriga, vänner eller professionella."
        />
      </div>
    </div>
  );
};

export default TipsCards;
