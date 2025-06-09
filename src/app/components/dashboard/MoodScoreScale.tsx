import { FaChartLine } from 'react-icons/fa';

interface IMoodScoreScaleProps {
  scaleType?: 'percentage' | 'decimal';
  description?: string;
  title: string;
}

const MoodScoreScale = ({
  scaleType = 'percentage',
  title = 'Moodscore Guide',
  description = '',
}: IMoodScoreScaleProps) => {
  const getDisplayScore = (score: number) => {
    return scaleType === 'decimal' ? score / 10 : score;
  };

  return (
    <div className="mood-score-scale-container">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-2">
          <FaChartLine className="text-primary-dark text-2xl" />
          <h2 className="text-xl font-semibold text-primary-dark">{title}</h2>
        </div>
        <p className="text-dark">{description}</p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-0">
        <div className="mood-score-scale-container__item">
          <div className="sm:min-w-[130px] h-full">
            <h3 className="bg-red-500 sm:bg-gradient-to-b from-red-500 to-orange-500 sm:rounded-t-md">
              Mani
            </h3>
          </div>
          <div className="flex-1 flex flex-col gap-3 h-full flex-grow justify-center">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-dark">
                Fullständig brist på omdöme, extrema ekonomiska beslut,
                vanföreställningar och ibland hallucinationer.
              </p>
              <span className="text-sm font-semibold text-red-900 min-w-[30px] text-right">
                {getDisplayScore(100)}
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-dark">
                Verklighetsuppfattningen är kraftigt rubbad, ologiskt beteende,
                ingen sömn och riskfyllt agerande.
              </p>
              <span className="text-sm font-semibold text-red-800 min-w-[30px] text-right">
                {getDisplayScore(90)}
              </span>
            </div>
          </div>
        </div>

        <div className="mood-score-scale-container__item">
          <div className="sm:min-w-[130px] h-full">
            <h3 className="bg-orange-500 sm:bg-gradient-to-b from-orange-500 to-yellow-500">
              Hypomani
            </h3>
          </div>
          <div className="flex-1 flex flex-col gap-3 h-full flex-grow justify-center">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-dark">
                Överdriven självsäkerhet, snabba tankar och högt tempo, startar
                flera projekt samtidigt utan att avsluta.
              </p>
              <span className="text-sm font-semibold text-orange-700 min-w-[30px] text-right">
                {getDisplayScore(80)}
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-dark">
                Ökad energi, starkt driv, intensivt social och har svårt att
                bromsa sitt engagemang.
              </p>
              <span className="text-sm font-semibold text-yellow-700 min-w-[30px] text-right">
                {getDisplayScore(70)}
              </span>
            </div>
          </div>
        </div>

        <div className="mood-score-scale-container__item sm:h-[160px]">
          <div className="sm:min-w-[130px] h-full">
            <h3 className="bg-green-500 sm:bg-gradient-to-b from-yellow-500 via-green-400 to-green-600">
              Balanserat
            </h3>
          </div>
          <div className="flex-1 flex flex-col gap-3 h-full flex-grow justify-center">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-dark">
                Känner sig stabil, har god självkänsla och är effektiv i sitt
                arbete, med mindre behov av sömn än vanligt.
              </p>
              <span className="text-sm font-semibold text-green-900 min-w-[30px] text-right">
                {getDisplayScore(60)}
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-dark">
                Harmoniskt tillstånd utan tecken på vare sig mani eller
                depression, allt känns balanserat.
              </p>
              <span className="text-sm font-semibold text-green-800 min-w-[30px] text-right">
                {getDisplayScore(50)}
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-dark">
                Börjar dra sig undan från omgivningen, tappar fokus och känner
                sig lätt irriterad eller otålig.
              </p>
              <span className="text-sm font-semibold text-green-700 min-w-[30px] text-right">
                {getDisplayScore(40)}
              </span>
            </div>
          </div>
        </div>

        <div className="mood-score-scale-container__item">
          <div className="sm:min-w-[130px] h-full">
            <h3 className="bg-gray-700 mild text-white px-4 py-2 text-center font-semibold flex items-center justify-center">
              Mild/Måttlig
            </h3>
          </div>
          <div className="flex-1 flex flex-col gap-3 h-full flex-grow justify-center">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-dark">
                Ångest och rastlöshet dominerar, svårt att koncentrera sig, men
                vissa rutiner kan kännas trygga.
              </p>
              <span className="text-sm font-semibold text-gray-500 min-w-[30px] text-right">
                {getDisplayScore(30)}
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-dark">
                Tankarna går långsamt, energin är nästan obefintlig, och
                vardagliga uppgifter känns oöverkomliga.
              </p>
              <span className="text-sm font-semibold text-gray-600 min-w-[30px] text-right">
                {getDisplayScore(20)}
              </span>
            </div>
          </div>
        </div>

        <div className="mood-score-scale-container__item">
          <div className="sm:min-w-[130px] h-full">
            <h3 className="bg-black sm:bg-gradient-to-b from-gray-700 via-gray-900 to-gray-950 sm:rounded-b-md">
              Svår
            </h3>
          </div>
          <div className="flex-1 flex flex-col gap-3 h-full flex-grow justify-center">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-dark">
                Djupa känslor av hopplöshet och skuld, svårt att röra sig eller
                ta beslut, allt känns meningslöst.
              </p>
              <span className="text-sm font-semibold text-gray-800 min-w-[30px] text-right">
                {getDisplayScore(10)}
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-dark">
                Självmordstankar tar över, ingen motivation eller hopp om
                förbättring, en känsla av total mörker.
              </p>
              <span className="text-sm font-semibold text-gray-900 min-w-[30px] text-right">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodScoreScale;
