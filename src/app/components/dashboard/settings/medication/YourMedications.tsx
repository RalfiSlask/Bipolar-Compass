import { IMedication } from '@/app/types/medication';

interface YourMedicationsProps {
  medications: IMedication[];
  handleDeleteMedicine: (index: number) => void;
}

const YourMedications = ({
  medications,
  handleDeleteMedicine,
}: YourMedicationsProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Dina Mediciner</h3>
      <div className="grid gap-4">
        {medications.map((medicine, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  {medicine.name || 'Namnlös medicin'}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {medicine.category === 'moodStabilizers' &&
                    'Stämningsstabiliserande'}
                  {medicine.category === 'antipsychotics' && 'Antipsykotiska'}
                  {medicine.category === 'antidepressants' && 'Antidepressiva'}
                </p>
              </div>
              <button
                onClick={() => handleDeleteMedicine(index)}
                className="text-red-600 hover:text-red-800 transition-colors"
                aria-label="Ta bort medicin"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Dosering</p>
                <p className="font-medium">
                  {medicine.dosage} {medicine.doseUnit}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Frekvens</p>
                <p className="font-medium">
                  {medicine.frequency === '1_daily' && '1 gång om dagen'}
                  {medicine.frequency === '2_daily' && '2 gånger om dagen'}
                  {medicine.frequency === '3_daily' && '3 gånger om dagen'}
                  {medicine.frequency === '4_daily' && '4 gånger om dagen'}
                  {medicine.frequency === 'weekly' && '1 gång i veckan'}
                  {medicine.frequency === 'as_needed' && 'Vid behov'}
                </p>
              </div>
              {medicine.times && medicine.times.length > 0 && (
                <div className="col-span-2">
                  <p className="text-gray-500">Tider</p>
                  <p className="font-medium">{medicine.times.join(', ')}</p>
                </div>
              )}
              {medicine.notes && (
                <div className="col-span-2">
                  <p className="text-gray-500">Anteckningar</p>
                  <p className="font-medium">{medicine.notes}</p>
                </div>
              )}
              <div className="col-span-2">
                <p className="text-gray-500">Påminnelser</p>
                <p className="font-medium">
                  {medicine.reminder.enabled ? (
                    <span className="text-green-600">Aktiverad</span>
                  ) : (
                    <span className="text-gray-400">Inaktiverad</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourMedications;
