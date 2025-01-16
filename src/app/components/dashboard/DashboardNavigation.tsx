import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardNavigationLinks } from '../../data/dashboardLinks';

const DashboardNavigation = () => {
  const path = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Utloggning misslyckades:', error);
    }
  };

  return (
    <nav className="flex flex-col gap-2 mt-16 w-full px-6" role="navigation">
      {dashboardNavigationLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={link.title === 'Logga ut' ? handleSignOut : undefined}
          className={`flex items-center w-full text-base gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-primary-medium/20 
            ${
              path === link.href
                ? 'bg-primary-dark font-semibold text-white [&_svg]:text-white'
                : 'text-primary-dark/80 hover:text-primary-dark [&_svg]:text-primary-dark/80 hover:[&_svg]:text-primary-dark'
            }`}
        >
          <span className="transition-transform duration-200 group-hover:scale-110">
            {link.icon}
          </span>
          <span className="text-base font-medium">{link.title}</span>
        </Link>
      ))}
    </nav>
  );
};

export default DashboardNavigation;
