'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalLoginContextType {
  showModalLogin: boolean;
  setShowModalLogin: (value: boolean) => void;
}

const ModalLoginContext = createContext<ModalLoginContextType | undefined>(
  undefined
);

export const ModalLoginProvider = ({ children }: { children: ReactNode }) => {
  const [showModalLogin, setShowModalLogin] = useState(false);

  return (
    <ModalLoginContext.Provider value={{ showModalLogin, setShowModalLogin }}>
      {children}
    </ModalLoginContext.Provider>
  );
};

export const useModalLogin = () => {
  const context = useContext(ModalLoginContext);
  if (!context) {
    throw new Error('useModalLogin must be used within an ModalLoginProvider');
  }
  return context;
};
