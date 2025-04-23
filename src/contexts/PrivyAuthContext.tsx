
// Removed all logic for Privy Auth and replaced with a placeholder
import { ReactNode, createContext, useContext } from "react";

// Minimal placeholder, not active
interface DemoAuthContextType {
  user: null;
  isLoading: false;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const DemoAuthContext = createContext<DemoAuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  logout: async () => {},
});

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  // This just passes children through with no real authentication
  return (
    <DemoAuthContext.Provider
      value={{
        user: null,
        isLoading: false,
        login: async () => {},
        logout: async () => {},
      }}
    >
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  return useContext(DemoAuthContext);
}

// Export the useDemoAuth function as usePrivyAuth for backward compatibility
export const usePrivyAuth = useDemoAuth;
