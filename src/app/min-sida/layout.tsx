'use client';

import DashboardSidebar from '@/app/components/dashboard/DashboardSidebar';
import { SidebarProvider } from '@/app/context/SidebarContext';
import { ICustomSession } from '@/app/types/authoptions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession() as { data: ICustomSession | null };
  const email = session?.user?.email;
  const [isMobile, setIsMobile] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkInitialSize = () => {
      const width = window.innerWidth;
      setIsSidebarOpen(width > 640);
      setIsMobile(width < 640);
    };
    checkInitialSize();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClickOnSidebarLinksOnMobile = () => {
    setIsSidebarOpen(false);
  };

  const handleStateOfSidebar = (open: boolean) => {
    setIsSidebarOpen(open);
  };

  return (
    <SidebarProvider
      isSidebarOpen={isSidebarOpen}
      handleStateOfSidebar={handleStateOfSidebar}
    >
      <div className="flex min-h-screen h-full w-full">
        <DashboardSidebar
          email={email || ''}
          isMobile={isMobile}
          handleClickOnSidebarLinksOnMobile={handleClickOnSidebarLinksOnMobile}
        />
        <section
          className={`dashboard-content flex justify-center items-center ${
            isSidebarOpen ? 'content--open' : 'content--closed'
          } w-full`}
        >
          {children}
        </section>
        <Toaster position="bottom-right" />
      </div>
    </SidebarProvider>
  );
}
