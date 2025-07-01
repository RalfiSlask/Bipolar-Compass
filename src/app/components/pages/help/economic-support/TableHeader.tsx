import { IRowItem } from '@/app/types/help/economic';

interface ITableHeaderProps {
  rowItems: IRowItem[];
  bgColor?: string;
  borderColor?: string;
}

const TableHeader = ({
  rowItems,
  bgColor = 'primary-light',
  borderColor = 'gray-300',
}: ITableHeaderProps) => {
  return (
    <thead>
      <tr className={`bg-${bgColor}`}>
        {rowItems.map((item) => (
          <th
            key={item.id}
            scope="col"
            className={`border border-${borderColor} p-3 text-left font-semibold`}
          >
            {item.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
