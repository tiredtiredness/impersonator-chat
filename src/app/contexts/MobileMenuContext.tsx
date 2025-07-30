'use client';

import {ReactNode, createContext, useEffect, useState} from 'react';

type TMobileMenuContext = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const MobileMenuContext = createContext<TMobileMenuContext | null>(null);

export const MobileMenuProvider = ({children}: {children: ReactNode}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleResize = () => {
      if (mediaQuery.matches) {
        setIsOpen(false);
      }
    };

    handleResize();

    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <MobileMenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};

export {MobileMenuContext};
