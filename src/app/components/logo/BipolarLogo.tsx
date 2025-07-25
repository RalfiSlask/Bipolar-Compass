import Link from 'next/link';

interface IBipolarLogoProps {
  footer?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const BipolarLogo = ({
  footer = false,
  size = 'medium',
}: IBipolarLogoProps) => {
  const logoSize = size === 'small' ? '12' : size === 'medium' ? '14' : '28';
  const logoTextSize =
    size === 'small' ? 'lg' : size === 'medium' ? 'xl' : '2xl';
  const logoWidth = size === 'small' ? 50 : size === 'medium' ? 70 : 90;
  const logoHeight = size === 'small' ? 50 : size === 'medium' ? 70 : 90;

  return (
    <Link href="/">
      <div className="flex items-center cursor-pointer">
        <div
          className={`w-${logoSize} h-${logoSize} ${
            footer ? 'text-tertiary-light' : 'text-primary-dark'
          } rounded-full flex items-center justify-center mb-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={logoWidth}
            height={logoHeight}
            viewBox="0 0 2501 2772"
            className="object-cover"
          >
            <path
              fillRule="evenodd"
              fill="currentColor"
              fillOpacity="1"
              d="M 1210.128906 834.179688 C 862.015625 854.46875 583.316406 1133.160156 563.027344 1481.28125 L 679.484375 1468.691406 C 704.761719 1194.308594 923.171875 975.910156 1197.539062 950.628906 Z M 563.027344 1562.699219 C 583.316406 1910.808594 862.015625 2189.511719 1210.128906 2209.796875 L 1197.539062 2093.34375 C 923.164062 2068.066406 704.761719 1849.65625 679.484375 1575.28125 Z M 1291.550781 2209.796875 C 1639.660156 2189.507812 1918.359375 1910.8125 1938.648438 1562.699219 L 1822.191406 1575.28125 C 1796.921875 1849.660156 1578.511719 2068.066406 1304.140625 2093.34375 Z M 1938.648438 1481.28125 C 1918.359375 1133.160156 1639.671875 854.460938 1291.550781 834.179688 L 1304.140625 950.628906 C 1578.511719 975.910156 1796.921875 1194.320312 1822.191406 1468.691406 L 1938.648438 1481.28125 "
            />
            <path
              fillRule="evenodd"
              fill="currentColor"
              fillOpacity="1"
              d="M 451.640625 1521.988281 L 851.238281 1478.789062 L 1118.421875 1449.898438 L 1039.589844 1351.949219 L 869.554688 1140.699219 L 1080.808594 1310.730469 L 1178.761719 1389.570312 L 1207.640625 1122.390625 L 1250.839844 722.789062 L 1294.039062 1122.390625 L 1337.238281 1521.988281 L 1294.039062 1921.585938 L 1250.839844 2321.1875 L 1207.640625 1921.585938 L 1172.871094 1599.960938 L 851.238281 1565.191406 L 451.640625 1521.988281 "
            />
            <path
              fillRule="evenodd"
              fill="currentColor"
              fillOpacity="1"
              d="M 2050.039062 1521.988281 L 1650.441406 1478.789062 L 1250.839844 1435.589844 L 1250.839844 1608.390625 L 1650.441406 1565.191406 L 2050.039062 1521.988281 "
            />
            <path
              fillRule="evenodd"
              fill="currentColor"
              fillOpacity="1"
              d="M 869.554688 1903.273438 L 1039.589844 1692.019531 L 1209.621094 1480.769531 L 1250.839844 1521.988281 L 1292.058594 1563.210938 L 1080.808594 1733.238281 L 869.554688 1903.273438 "
            />
            <path
              fillRule="evenodd"
              fill="currentColor"
              fillOpacity="1"
              d="M 1632.121094 1140.699219 L 1420.871094 1310.730469 L 1209.621094 1480.769531 L 1250.839844 1521.988281 L 1292.058594 1563.210938 L 1462.089844 1351.949219 L 1632.121094 1140.699219 "
            />
            <path
              fillRule="evenodd"
              fill="currentColor"
              fillOpacity="1"
              d="M 1632.121094 1903.273438 L 1462.089844 1692.019531 L 1292.058594 1480.769531 L 1250.839844 1521.988281 L 1209.621094 1563.210938 L 1420.871094 1733.238281 L 1632.121094 1903.273438 "
            />
            <path
              fillRule="evenodd"
              fill="currentColor"
              fillOpacity=""
              d="M 1250.839844 1444.019531 C 1207.78125 1444.019531 1172.871094 1478.929688 1172.871094 1521.988281 C 1172.871094 1565.050781 1207.78125 1599.960938 1250.839844 1599.960938 C 1293.898438 1599.960938 1328.808594 1565.050781 1328.808594 1521.988281 C 1328.808594 1478.929688 1293.898438 1444.019531 1250.839844 1444.019531 "
            />
          </svg>
        </div>
        <h1
          className={`text-${logoTextSize} flex ${
            size === 'large' ? 'flex-col' : ''
          } font-semibold`}
        >
          <span
            className={`${
              footer ? 'text-tertiary-light' : 'text-secondary-dark'
            }`}
          >
            Bipolär
          </span>
          <span
            className={`${
              footer ? 'text-tertiary-light' : 'text-secondary-dark'
            }`}
          >
            kompassen
          </span>
        </h1>
      </div>
    </Link>
  );
};

export default BipolarLogo;
