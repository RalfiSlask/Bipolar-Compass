import { FaChartLine } from 'react-icons/fa';

const MoodScoreScale = () => {
  return (
    <div className="max-w-4xl bg-white rounded-2xl shadow-md p-6 my-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="flex items-center gap-2">
          <FaChartLine className="text-primary-dark text-2xl" />
          <h2 className="text-xl font-semibold text-primary-dark">
            Moodscore Guide
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-0">
        <div className="flex flex-col sm:h-[130px] sm:flex-row gap-4 pr-4 bg-primary-light/20">
          <div className="sm:min-w-[130px] h-full">
            <div className="h-full bg-red-500 sm:bg-gradient-to-b from-red-500 to-orange-500 text-white px-4 py-2 rounded-tl-md text-center font-semibold flex items-center justify-center">
              Mani
            </div>
          </div>
          <div className="flex-1 space-y-3 h-full flex-grow flex flex-col justify-center">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-gray-700">
                Fullständig brist på omdöme, extrema ekonomiska beslut,
                vanföreställningar och ibland hallucinationer.
              </p>
              <span className="text-sm font-semibold text-red-900 min-w-[30px] text-right">
                100
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-gray-700">
                Verklighetsuppfattningen är kraftigt rubbad, ologiskt beteende,
                ingen sömn och riskfyllt agerande.
              </p>
              <span className="text-sm font-semibold text-red-800 min-w-[30px] text-right">
                90
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:h-[130px] sm:flex-row gap-4 pr-4 bg-primary-light/20">
          <div className="sm:min-w-[130px] h-full">
            <div className="h-full bg-orange-500 sm:bg-gradient-to-b from-orange-500 to-yellow-500 text-white px-4 py-2  text-center font-semibold flex items-center justify-center">
              Hypomani
            </div>
          </div>
          <div className="flex-1 space-y-3 h-full flex-grow flex flex-col justify-center">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-gray-700">
                Överdriven självsäkerhet, snabba tankar och högt tempo, startar
                flera projekt samtidigt utan att avsluta.
              </p>
              <span className="text-sm font-semibold text-orange-700 min-w-[30px] text-right">
                80
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-gray-700">
                Ökad energi, starkt driv, intensivt social och har svårt att
                bromsa sitt engagemang.
              </p>
              <span className="text-sm font-semibold text-yellow-700 min-w-[30px] text-right">
                70
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:h-[130px] sm:flex-row gap-4 pr-4 bg-primary-light/20">
          <div className="sm:min-w-[130px] h-full">
            <div className="h-full bg-green-500 sm:bg-gradient-to-b from-yellow-500 via-green-400 to-green-600 text-white px-4 py-2  text-center font-semibold flex items-center justify-center">
              Balanserat
            </div>
          </div>
          <div className="flex-1 space-y-3 h-full flex-grow flex flex-col justify-center">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-gray-700">
                Känner sig stabil, har god självkänsla och är effektiv i sitt
                arbete, med mindre behov av sömn än vanligt.
              </p>
              <span className="text-sm font-semibold text-green-900 min-w-[30px] text-right">
                60
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-gray-700">
                Harmoniskt tillstånd utan tecken på vare sig mani eller
                depression, allt känns balanserat.
              </p>
              <span className="text-sm font-semibold text-green-800 min-w-[30px] text-right">
                50
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-gray-700">
                Börjar dra sig undan från omgivningen, tappar fokus och känner
                sig lätt irriterad eller otålig.
              </p>
              <span className="text-sm font-semibold text-green-700 min-w-[30px] text-right">
                40
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:h-[130px] sm:flex-row gap-4 pr-4 bg-primary-light/20">
          <div className="sm:min-w-[130px] h-full">
            <div className="h-full bg-gray-700 mild text-white px-4 py-2  text-center font-semibold flex items-center justify-center">
              Mild/Måttlig
            </div>
          </div>
          <div className="flex-1 space-y-3 h-full flex-grow flex flex-col justify-center">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-gray-700">
                Ångest och rastlöshet dominerar, svårt att koncentrera sig, men
                vissa rutiner kan kännas trygga.
              </p>
              <span className="text-sm font-semibold text-gray-500 min-w-[30px] text-right">
                30
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-gray-700">
                Tankarna går långsamt, energin är nästan obefintlig, och
                vardagliga uppgifter känns oöverkomliga.
              </p>
              <span className="text-sm font-semibold text-gray-600 min-w-[30px] text-right">
                20
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:h-[130px] sm:flex-row gap-4 pr-4 bg-primary-light/20">
          <div className="sm:min-w-[130px] h-full">
            <div className="h-full bg-black sm:bg-gradient-to-b from-gray-700 via-gray-900 to-gray-950 text-white px-4 py-2 rounded-bl-md text-center font-semibold flex items-center justify-center">
              Svår
            </div>
          </div>
          <div className="flex-1 space-y-3 h-full flex-grow flex flex-col justify-center">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-gray-700">
                Djupa känslor av hopplöshet och skuld, svårt att röra sig eller
                ta beslut, allt känns meningslöst.
              </p>
              <span className="text-sm font-semibold text-gray-800 min-w-[30px] text-right">
                10
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-gray-700">
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
