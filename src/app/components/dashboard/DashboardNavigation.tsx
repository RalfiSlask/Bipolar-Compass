import useSidebarContext from '@/app/hooks/useSidebarContext';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DASHBOARD_NAVIGATION_LINKS } from '../../data/dashboard';

interface IDashboardNavigationProps {
  isMobile: boolean;
}

const DashboardNavigation = ({ isMobile }: IDashboardNavigationProps) => {
  const path = usePathname();
  const { handleStateOfSidebar } = useSidebarContext();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Utloggning misslyckades:', error);
    }
  };

  const handleClickOnLink = (link: string) => {
    if (link === 'Logga ut') {
      handleSignOut();
    } else {
      if (isMobile) {
        handleStateOfSidebar(false);
      }
    }
  };

  return (
    <nav
      className="flex flex-col gap-2 mt-6 sm:mt-8 w-full px-6 list-none"
      role="navigation"
    >
      {DASHBOARD_NAVIGATION_LINKS.map((link) => (
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
            onClick={() => handleClickOnLink(link.title)}
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
