interface IEmailChangeButtonProps {
  isEmailChangable: boolean;
  changeEmailChangable: () => void;
}

const EmailChangeButton = ({
  isEmailChangable,
  changeEmailChangable,
}: IEmailChangeButtonProps) => {
  const emailChangableColors = isEmailChangable
    ? 'bg-primary-light hover:bg-primary-medium text-gray-900 hover:text-white'
    : 'bg-white hover:bg-gray-50 text-dark';

  return (
    <button
      type="button"
      className={`whitespace-nowrap h-[44px] px-4 text-sm font-medium rounded-md border shadow-sm min-w-[130px]
      ${emailChangableColors}`}
      onClick={changeEmailChangable}
    >
      {isEmailChangable ? 'Spara' : 'Ändra e-post'}
    </button>
  );
};

export default EmailChangeButton;
