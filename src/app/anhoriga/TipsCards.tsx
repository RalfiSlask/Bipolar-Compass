import {
  FaExclamationTriangle,
  FaRegHeart,
  FaUserShield,
} from "react-icons/fa";

const TipsCards = () => {
  return (
    <div className="flex flex-col items-center content-container gap-6 p-6 rounded-xl shadow-lg">
      <h3 className="h-xs text-tertiary-dark font-bold">
        Att tänka på som anhörig vid tvångsvård
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-tertiary-light  rounded-lg p-6 flex flex-col items-center text-center shadow-md">
          <FaRegHeart className="text-tertiary-dark text-3xl mb-4" />
          <h4 className="font-bold text-lg mb-2 text-tertiary-dark ">
            Det är inte ditt fel
          </h4>
          <p className="text-tertiary-dark  text-base">
            Att ansöka om tvångsvård kan vara svårt och skuldbelagt. Kom ihåg
            att detta handlar om att skydda din närstående och ge dem nödvändig
            vård.
          </p>
        </div>
        <div className="bg-tertiary-light rounded-lg p-6 flex flex-col items-center text-center shadow-md">
          <FaExclamationTriangle className="text-tertiary-dark text-3xl mb-4" />
          <h4 className="font-semibold text-tertiary-dark text-lg mb-2">
            Var beredd på motstånd
          </h4>
          <p className="text-tertiary-dark  text-base">
            Många i mani eller psykos förstår inte sitt tillstånd. Det är
            viktigt att behålla lugnet och låta vårdpersonalen hantera
            situationen.
          </p>
        </div>
        <div className="bg-tertiary-light  rounded-lg p-6 flex flex-col items-center text-center shadow-md">
          <FaUserShield className="text-tertiary-dark text-3xl mb-4" />
          <h4 className="font-semibold text-lg text-tertiary-dark mb-2">
            Ta hand om dig själv
          </h4>
          <p className="text-tertiary-dark  text-base">
            Processen kan vara känslomässigt krävande. Se till att du har stöd
            från andra anhöriga, vänner eller professionella.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipsCards;
