interface IHighlightBoxProps {
  title?: string;
  list: string[];
}

const HighlightList = ({ title, list }: IHighlightBoxProps) => {
  return (
    <div className="rounded-md p-4 bg-primary-light/50">
      {title && (
        <h4 className="font-semibold text-primary-dark mb-3">{title}</h4>
      )}
      <ul className="flex flex-col gap-2 list-disc list-inside">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default HighlightList;
