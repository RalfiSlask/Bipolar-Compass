import Link from 'next/link';

interface ISourceItem {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface IOfficialSourcesListProps {
  title: string;
  items: ISourceItem[];
}

const OfficialSourcesList = ({ title, items }: IOfficialSourcesListProps) => {
  return (
    <div className="bg-primary-light rounded-lg p-4 shadow-md">
      <h4 className="text-lg mb-2 text-primary-dark font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.name}>
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark hover:text-primary-accent flex items-center gap-2"
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfficialSourcesList;
