import { IRowItem } from '@/app/types/help/economic';

interface ITableRowProps {
  cells: IRowItem[];
  bodyColor?: string;
  borderColor?: string;
}

const TableRow = ({
  cells,
  bodyColor = 'white',
  borderColor = 'gray-300',
}: ITableRowProps) => {
  return (
    <tr className={`bg-${bodyColor}`}>
      {cells.map((cell, index) => (
        <td
          key={cell.id}
          className={`border border-${borderColor} p-3 ${
            index === 0 ? 'font-semibold' : ''
          }`}
        >
          {cell.title}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
