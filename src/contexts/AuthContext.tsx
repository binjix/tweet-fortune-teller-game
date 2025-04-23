
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '@/lib/types';
import { getCurrentUser, loginUser, logoutUser } from '@/lib/mockDatabase';
import { toast } from "@/hooks/use-toast";

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component that wraps the application and provides authentication context
 * In a production app, this would use Twitter OAuth via Supabase or a similar auth provider
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on component mount
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would check for an existing Twitter session
        const currentUser = getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login function - in a real app, this would authenticate with Twitter
   * For now, we simulate login with the first user in our mock database
   */
  const login = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate Twitter OAuth (would redirect to Twitter in real app)
      // For now, just use first mock user
      const loggedInUser = loginUser('1');
      
      if (loggedInUser) {
        setUser(loggedInUser);
        toast({
          title: "Successfully logged in",
          description: `Welcome ${loggedInUser.twitterHandle}!`,
        });
      } else {
        toast({
          title: "Login failed",
          description: "Could not authenticate with Twitter",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login failed",
        description: "Could not authenticate with Twitter",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function to clear user session
   */
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      logoutUser();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: "Logout failed",
        description: "Could not log out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Provide the auth context to children components
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
