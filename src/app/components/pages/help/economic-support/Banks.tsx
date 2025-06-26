import { ColorType } from '@/app/types/colorTypes';
import { IBank } from '@/app/types/help/economic';
import BankCard from './BankCard';

interface IBanksProps {
  banks: IBank[];
  type: ColorType;
}

const Banks = ({ banks, type }: IBanksProps) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {banks.map((bank) => (
        <BankCard key={bank.id} bank={bank} type={type} />
      ))}
    </ul>
  );
};

export default Banks;
