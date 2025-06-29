import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import {
  ECONOMIC_SUPPORT_TABLE_BODY_ROWS,
  ECONOMIC_SUPPORT_TABLE_HEADER_DATA,
} from '@/app/data/help/economic';
import { FaTable } from 'react-icons/fa';
import Recommendations from './Recommendations';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const ComparisonTable = () => {
  return (
    <div className="content-container">
      <SectionTitle icon={<FaTable />}>
        Jämförelse av ekonomiska skyddsåtgärder
      </SectionTitle>
      <p className="text-primary-dark mb-4">
        Det finns flera olika sätt att skydda din ekonomi vid bipolär sjukdom.
        Från enkla fullmakter till mer omfattande arrangemang som god man eller
        förvaltare. Välj det som passar din situation bäst.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <TableHeader rowItems={ECONOMIC_SUPPORT_TABLE_HEADER_DATA} />
          <tbody>
            {ECONOMIC_SUPPORT_TABLE_BODY_ROWS.map((row) => (
              <TableRow
                key={row.id}
                cells={row.cells}
                bodyColor={row.bodyColor}
                borderColor={row.borderColor}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Recommendations />
      <p className="text-primary-dark mt-4">
        Börja alltid med den{' '}
        <span className="font-semibold">
          minst ingripande åtgärden (fullmakt)
        </span>{' '}
        och uppgradera endast om det behövs. Du kan alltid gå från en mindre
        till en mer omfattande skyddsåtgärd, men det är svårare att gå tillbaka.
      </p>
    </div>
  );
};

export default ComparisonTable;
