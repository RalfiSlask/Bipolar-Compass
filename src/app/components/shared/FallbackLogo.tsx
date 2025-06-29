import { ColorType } from '@/app/types/colorTypes';

interface IFallbackLogoProps {
  type: ColorType;
  icon: React.ReactNode;
}

const FallbackLogo = ({ type, icon }: IFallbackLogoProps) => {
  return (
    <div
      className={`w-full h-20 bg-${type}-light rounded-lg flex items-center justify-center`}
    >
      {icon}
    </div>
  );
};

export default FallbackLogo;
