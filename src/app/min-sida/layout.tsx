'use client';

import DashboardSidebar from '@/app/components/dashboard/DashboardSidebar';
import { useSession } from 'next-auth/react';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  const email = session?.user?.email;

  return (
    <div className="flex h-screen">
      <DashboardSidebar email={email || ''} />
      <div className="dashboard-content w-full">
        {children}
      </div>
    </div>
  );
}
