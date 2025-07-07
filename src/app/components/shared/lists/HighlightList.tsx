interface IHighlightBoxProps {
  title?: string;
  list: string[];
}

const HighlightList = ({ title, list }: IHighlightBoxProps) => {
  return (
    <div className="lightest-list-container">
      {title && (
        <h4 className="font-semibold text-primary-dark mb-3">{title}</h4>
      )}
      <ul className="flex flex-col gap-2 list-disc list-inside">
        {list.map((item) => {
          const colonIndex = item.indexOf(':');
          if (colonIndex !== -1) {
            const beforeColon = item.substring(0, colonIndex + 1);
            const afterColon = item.substring(colonIndex + 1);
            return (
              <li key={item}>
                <span className="font-semibold">{beforeColon}</span>
                {afterColon}
              </li>
            );
          }
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default HighlightList;
