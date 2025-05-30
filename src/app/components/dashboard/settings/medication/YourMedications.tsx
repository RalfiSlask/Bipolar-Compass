import { MEDICATION_OPTIONS } from '@/app/data/medications';
import { IMedication } from '@/app/types/medication';
import { useState } from 'react';
import { FiEdit, FiInfo } from 'react-icons/fi';
import DeleteConfirmationModal from './DeleteConfirmModal';

interface YourMedicationsProps {
  medications: IMedication[];
  handleDeleteMedicine: (index: number) => void;
  handleEditMedicine: (index: number) => void;
}

const YourMedications = ({
  medications,
  handleDeleteMedicine,
  handleEditMedicine,
}: YourMedicationsProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState<{
    index: number;
    name: string;
  } | null>(null);

  const handleDeleteClick = (index: number, name: string) => {
    setMedicineToDelete({ index, name });
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (medicineToDelete !== null) {
      handleDeleteMedicine(medicineToDelete.index);
      setDeleteModalOpen(false);
      setMedicineToDelete(null);
    }
  };

  const getMedicationInfo = (medication: IMedication) => {
    // Find the medication info from MEDICATION_OPTIONS
    const categoryOptions: {
      value: string;
      label: string;
      href: string;
    }[] =
      MEDICATION_OPTIONS[
        medication.category as keyof typeof MEDICATION_OPTIONS
      ];
    return categoryOptions?.find((opt) => opt.value === medication.name);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-primary-dark">
        Dina Mediciner
      </h3>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {medications.map((medication, index) => {
          const medicationInfo = getMedicationInfo(medication);

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-4 border border-gray-200 px-4 pb-4 pt-3 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 my-2">
                    <h4 className="text-lg font-medium text-dark">
                      {medication.name || 'Namnlös medicin'}
                    </h4>
                    {medicationInfo?.href && (
                      <a
                        href={medicationInfo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-medium hover:text-primary-dark transition-colors"
                        title="Läs mer på FASS"
                      >
                        <FiInfo className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {medication.category === 'moodStabilizers' &&
                      'Stämningsstabiliserande'}
                    {medication.category === 'antipsychotics' &&
                      'Antipsykotiska'}
                    {medication.category === 'antidepressants' &&
                      'Antidepressiva'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditMedicine(index)}
                    className="text-primary-dark hover:text-primary-medium transition-colors p-2"
                    aria-label={`Redigera ${medication.name || 'medicin'}`}
                  >
                    <FiEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(index, medication.name)}
                    className="text-red-500 hover:text-red-800 transition-colors p-2"
                    aria-label={`Ta bort ${medication.name || 'medicin'}`}
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
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-primary-dark">Dosering</p>
                  <p className="font-medium text-base">
                    {medication.dosage} {medication.doseUnit}
                  </p>
                </div>
                <div>
                  <p className="text-primary-dark">Frekvens</p>
                  <p className="font-medium text-base">
                    {medication.frequency === '1_daily' && '1 gång om dagen'}
                    {medication.frequency === '2_daily' && '2 gånger om dagen'}
                    {medication.frequency === '3_daily' && '3 gånger om dagen'}
                    {medication.frequency === '4_daily' && '4 gånger om dagen'}
                    {medication.frequency === 'as_needed' && 'Vid behov'}
                  </p>
                </div>
                {medication.times && medication.times.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-primary-dark">Tider</p>
                    <p className="font-medium text-base">
                      {medication.times.join(', ')}
                    </p>
                  </div>
                )}
                {medication.notes && (
                  <div className="col-span-2">
                    <p className="text-primary-dark">Anteckningar</p>
                    <p className="font-medium">{medication.notes}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-primary-dark">Påminnelser</p>
                  <p className="font-medium text-base">
                    {medication.reminder.enabled ? (
                      <span className="text-green-700">Aktiverad</span>
                    ) : (
                      <span className="text-gray-500">Inaktiverad</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setMedicineToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        medicineName={medicineToDelete?.name || ''}
      />
    </div>
  );
};

export default YourMedications;
