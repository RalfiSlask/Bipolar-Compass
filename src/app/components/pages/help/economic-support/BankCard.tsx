import { ColorType } from '@/app/types/colorTypes';
import { IBank } from '@/app/types/help/economic';
import BankContact from './BankContact';
import BankLogo from './BankLogo';

interface IBankCardProps {
  bank: IBank;
  type: ColorType;
}

const BankCard = ({ bank, type }: IBankCardProps) => {
  return (
    <div
      className={`bg-white rounded-lg p-4 sm:p-6 shadow-md border-2 border-${type}-light/50`}
    >
      <div className="flex flex-col gap-2">
        <BankLogo bank={bank} type={type} />
        <div className="flex-1">
          <h3
            className={`text-xl font-bold text-${type}-dark mb-2 break-words`}
          >
            {bank.title}
          </h3>
          <BankContact bank={bank} type={type} />
        </div>
      </div>
    </div>
  );
};

export default BankCard;
