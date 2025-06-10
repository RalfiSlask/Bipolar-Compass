import { createContext, ReactNode } from 'react';

interface ISidebarContext {
  isSidebarOpen: boolean;
  handleStateOfSidebar: (open: boolean) => void;
}

interface ISidebarProviderProps {
  children: ReactNode;
  isSidebarOpen: boolean;
  handleStateOfSidebar: (open: boolean) => void;
}

export const SidebarContext = createContext<ISidebarContext | undefined>(
  undefined
);

export const SidebarProvider = ({
  children,
  isSidebarOpen,
  handleStateOfSidebar,
}: ISidebarProviderProps) => {
  const sidebarData: ISidebarContext = {
    isSidebarOpen,
    handleStateOfSidebar,
  };

  return (
    <SidebarContext.Provider value={sidebarData}>
      {children}
    </SidebarContext.Provider>
  );
};
