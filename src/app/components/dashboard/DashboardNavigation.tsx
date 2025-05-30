import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardNavigationLinks } from '../../data/dashboardLinks';

interface IDashboardNavigationProps {
  isMobile: boolean;
  handleClickOnSidebarLinksOnMobile: () => void;
}

const DashboardNavigation = ({
  isMobile,
  handleClickOnSidebarLinksOnMobile,
}: IDashboardNavigationProps) => {
  const path = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Utloggning misslyckades:', error);
    }
  };

  return (
    <nav
      className="flex flex-col gap-2 mt-6 sm:mt-8 w-full px-6 list-none"
      role="navigation"
    >
      {dashboardNavigationLinks.map((link) => (
        <li
          key={link.href}
          className={`w-full rounded-lg transition-all duration-200 hover:bg-primary-medium/20 cursor-pointer 
            ${
              path === link.href
                ? 'bg-primary-dark font-semibold text-white [&_svg]:text-white'
                : 'text-primary-dark/80 hover:text-primary-dark [&_svg]:text-primary-dark/80 hover:[&_svg]:text-primary-dark'
            }`}
        >
          <Link
            href={link.href}
            onClick={
              link.title === 'Logga ut'
                ? handleSignOut
                : isMobile
                ? handleClickOnSidebarLinksOnMobile
                : undefined
            }
            className="flex items-center w-full gap-3 px-4 py-3"
          >
            <span className="transition-transform duration-200 group-hover:scale-110">
              {link.icon}
            </span>
            <span className="text-base font-medium">{link.title}</span>
          </Link>
        </li>
      ))}
    </nav>
  );
};

export default DashboardNavigation;
