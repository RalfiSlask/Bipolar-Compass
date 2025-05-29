interface IAddMedicationButtonsProps {
  abortAddingMedication: () => void;
  isEditing?: boolean;
}

const AddMedicationButtons = ({
  abortAddingMedication,
  isEditing = false,
}: IAddMedicationButtonsProps) => {
  return (
    <div className="flex justify-center md:justify-start gap-4 mb-16">
      <button type="submit" className="primary-button py-1">
        {isEditing ? 'Uppdatera medicin' : 'Lägg till medicin'}
      </button>
      <button
        type="button"
        className="tertiary-button w-40"
        onClick={abortAddingMedication}
      >
        Avbryt
      </button>
    </div>
  );
};

export default AddMedicationButtons;
