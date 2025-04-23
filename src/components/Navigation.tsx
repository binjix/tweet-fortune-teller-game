
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Twitter, LogIn, User, TrendingUp } from "lucide-react";

export function Navigation() {
  const { user, isLoading, login, logout } = useAuth();

  return (
    <header className="border-b shadow-sm bg-white">
      <div className="container mx-auto py-3 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="font-bold text-xl flex items-center">
            <span className="mr-2">🐂</span>
            <span className="text-primary">Bull</span>
            <span className="mx-1">or</span>
            <span className="text-destructive">Bear</span>
            <span className="ml-2">🐻</span>
          </Link>
        </div>

        <nav className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link to="/leaderboard">
              <TrendingUp className="h-4 w-4 mr-2" />
              Leaderboard
            </Link>
          </Button>
          
          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link to={`/profile/${user.id}`}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button 
              onClick={login} 
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-current"></span>
              ) : (
                <>
                  <Twitter className="h-5 w-5 mr-2" />
                  <span>Login with Twitter</span>
                </>
              )}
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
