'use client';

import Link from 'next/link';

interface ISubmenuItemProps {
  title: string;
  route: string;
  isMobile?: boolean;
  onNavigate?: () => void;
}

const SubmenuItem = ({
  title,
  route,
  isMobile,
  onNavigate,
}: ISubmenuItemProps) => {
  return (
    <li
      className={`
        transition-colors block w-full cursor-pointer
        ${
          isMobile
            ? 'text-secondary-dark hover:bg-primary-light hover:text-primary-dark border-l-2 border-primary-light'
            : 'hover:bg-primary-light rounded-md hover:text-primary-dark'
        }
      `}
    >
      <Link
        className="block py-3 px-4 "
        role="menuitem"
        href={route}
        onClick={onNavigate}
      >
        {title}
      </Link>
    </li>
  );
};

export default SubmenuItem;
