
import { ReactNode, createContext, useContext } from "react";
import { usePrivy, PrivyProvider } from "@privy-io/react-auth";

interface PrivyAuthContextType {
  user: any | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const PrivyAuthContext = createContext<PrivyAuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

// Make sure to wrap your App in <PrivyProvider> in src/main.tsx

export function PrivyAuthProvider({ children }: { children: ReactNode }) {
  const { ready, authenticated, login, logout, user } = usePrivy();

  return (
    <PrivyAuthContext.Provider
      value={{
        user: authenticated ? user : null,
        isLoading: !ready,
        login: async () => login({ provider: "twitter" }),
        logout,
      }}
    >
      {children}
    </PrivyAuthContext.Provider>
  );
}

export function usePrivyAuth() {
  return useContext(PrivyAuthContext);
}
