interface ISearchButtonProps {
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
  title?: string;
}

const SearchButton = ({
  buttonType = 'submit',
  title = 'Sök',
}: ISearchButtonProps) => {
  return (
    <button
      type={buttonType}
      className="px-8 py-3 bg-primary-dark hover:bg-secondary-dark text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {title}
    </button>
  );
};

export default SearchButton;
