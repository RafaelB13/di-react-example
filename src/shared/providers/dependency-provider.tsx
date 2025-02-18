import React from 'react';
import { AwilixContainer } from 'awilix';
import { createContext } from 'react';

const DependencyContext = createContext<AwilixContainer | null>(null);

type DependencyProviderProps = {
  container: AwilixContainer;
  children: React.ReactNode;
};

export const DependencyProvider: React.FC<DependencyProviderProps> = ({ container, children }) => {
  return (
    <DependencyContext.Provider value={container}>
      {children}
    </DependencyContext.Provider>
  );
};

export { DependencyContext };