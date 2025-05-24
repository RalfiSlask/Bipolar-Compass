'use client';

import { usePathname } from 'next/navigation';
import Chat from './Chat';

const ChatWrapper = () => {
  const pathName = usePathname();
  const shouldShowChat =
    pathName && !pathName.includes('/min-sida') && !pathName.includes('/konto');

  if (!shouldShowChat) return null;

  return <Chat />;
};

export default ChatWrapper;
