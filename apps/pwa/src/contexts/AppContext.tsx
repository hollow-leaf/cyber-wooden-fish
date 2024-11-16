import { createContext, PropsWithChildren, useContext } from "react";

interface AppContext {}

const defaultContextValue: AppContext = {};

const AppContext = createContext<AppContext>(defaultContextValue);

export function AppContextProvider({ children }: PropsWithChildren) {
  const contextValue = {};
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
