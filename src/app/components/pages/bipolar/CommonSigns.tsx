import { MdPsychology } from "react-icons/md"

const CommonSigns = () => {
  return (
    <div className="flex flex-col content-container ">
    <div className="flex items-center gap-4 mb-6">
      <MdPsychology className="text-4xl text-primary-dark" />
      <h3 className="h-xs text-primary-dark">Vanliga kännetecken</h3>
    </div>

    <div className="bg-primary-light/50 rounded-md p-4 mb-6">
      <h4 className="font-semibold text-primary-dark mb-3">
        Under maniska eller hypomaniska episoder kan personer känna sig:
      </h4>
      <ul className="flex flex-col gap-2 list-disc list-inside">
        <li>Överdrivet energiska eller självsäkra</li>
        <li>Pratsamma eller rastlösa</li>
        <li>Oförmögen att sova</li>
        <li>Impulsiva, med riskfyllda beteenden som konsekvens</li>
      </ul>
    </div>

    <div className="bg-primary-light/50 rounded-md p-4">
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
  )
}

export default CommonSigns