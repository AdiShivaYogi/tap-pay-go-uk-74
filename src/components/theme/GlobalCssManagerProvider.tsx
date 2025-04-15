
import React, { createContext, useContext, useState } from 'react';
import { GlobalCssManager } from './GlobalCssManager';

interface GlobalCssManagerContextType {
  isOpen: boolean;
  toggleManager: () => void;
}

const GlobalCssManagerContext = createContext<GlobalCssManagerContextType>({
  isOpen: false,
  toggleManager: () => {},
});

export const useGlobalCssManager = () => useContext(GlobalCssManagerContext);

export const GlobalCssManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleManager = () => {
    setIsOpen(!isOpen);
  };

  return (
    <GlobalCssManagerContext.Provider value={{ isOpen, toggleManager }}>
      {children}
      {isOpen && <GlobalCssManager isSheet={true} />}
    </GlobalCssManagerContext.Provider>
  );
};
