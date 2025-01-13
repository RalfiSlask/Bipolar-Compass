import Image from 'next/image';
import Link from 'next/link';
import compassIcon from '../../assets/icons/compass.svg';

interface IBipolarLogoProps {
  footer?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const BipolarLogo = ({
  footer = false,
  size = 'medium',
}: IBipolarLogoProps) => {
  const logoSize = size === 'small' ? '12' : size === 'medium' ? '22' : '28';
  const logoTextSize =
    size === 'small' ? 'lg' : size === 'medium' ? 'xl' : '2xl';
  const logoWidth = size === 'small' ? 50 : size === 'medium' ? 80 : 90;
  const logoHeight = size === 'small' ? 50 : size === 'medium' ? 80 : 90;

  return (
    <div className="flex items-center cursor-pointer">
      <div
        className={`w-${logoSize} h-${logoSize} rounded-full flex items-center justify-center mb-2`}
      >
        <Image
          src={compassIcon}
          alt="Bipolar logo"
          width={logoWidth}
          height={logoHeight}
          className="object-cover"
        />
      </div>
      <Link href="/">
        <h1
          className={`text-${logoTextSize} flex ${
            size === 'large' ? 'flex-col' : ''
          } font-semibold`}
        >
          <span className={`${footer ? 'text-white' : 'text-secondary-dark'}`}>
            Bipolär
          </span>
          <span className={`${footer ? 'text-white' : 'text-secondary-dark'}`}>
            Kompassen
          </span>
        </h1>
      </Link>
    </div>
  );
};

export default BipolarLogo;
