
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

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
            <Link to="/leaderboard">Leaderboard</Link>
          </Button>
          
          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link to={`/profile/${user.id}`}>Profile</Link>
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
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.19 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                  </svg>
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
