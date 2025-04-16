
import React, { createContext, useState, useEffect } from 'react';
import { GlobalCssManager } from './GlobalCssManager';

interface GlobalCssContextType {
  css: string;
  updateCss: (css: string) => void;
}

export const GlobalCssContext = createContext<GlobalCssContextType>({
  css: '',
  updateCss: () => {},
});

interface GlobalCssManagerProviderProps {
  children: React.ReactNode;
}

export const GlobalCssManagerProvider: React.FC<GlobalCssManagerProviderProps> = ({ 
  children 
}) => {
  const [css, setCss] = useState<string>('');

  // Încarcă CSS-ul din localStorage la montarea componentei
  useEffect(() => {
    const savedCss = localStorage.getItem('global-css');
    if (savedCss) {
      setCss(savedCss);
    }
  }, []);

  // Actualizează CSS-ul și îl salvează în localStorage
  const updateCss = (newCss: string) => {
    setCss(newCss);
    localStorage.setItem('global-css', newCss);
  };

  return (
    <GlobalCssContext.Provider value={{ css, updateCss }}>
      <GlobalCssManager css={css} />
      {children}
    </GlobalCssContext.Provider>
  );
};
