interface IAddMedicationButtonsProps {
  abortAddingMedication: () => void;
}

const AddMedicationButtons = ({
  abortAddingMedication,
}: IAddMedicationButtonsProps) => {
  return (
    <div className="flex gap-4">
      <button type="submit" className="primary-button py-1">
        Lägg till medicin
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
