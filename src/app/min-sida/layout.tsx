'use client';

import DashboardSidebar from '@/app/components/dashboard/DashboardSidebar';
import { ICustomSession } from '@/app/types/authoptions';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession() as { data: ICustomSession | null };
  const email = session?.user?.email;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-full w-full">
      <DashboardSidebar
        email={email || ''}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div
        className={`dashboard-content ${
          isSidebarOpen ? 'content--open' : 'content--closed'
        } w-full`}
      >
        {children}
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}
