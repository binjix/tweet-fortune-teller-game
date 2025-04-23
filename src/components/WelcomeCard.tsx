
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function WelcomeCard() {
  const { login, isLoading } = useAuth();

  return (
    <Card className="w-full max-w-md border-2 border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">
          <span className="mr-2">🐂</span>
          <span className="text-primary">Bull</span>
          <span className="mx-1">or</span>
          <span className="text-destructive">Bear</span>
          <span className="ml-2">🐻</span>
        </CardTitle>
        <CardDescription className="text-lg">
          Predict how White House tweets affect the stock market
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-muted p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
              <span className="text-lg">1</span>
            </div>
            <p>Sign in with your Twitter account</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
              <span className="text-lg">2</span>
            </div>
            <p>Predict if the next White House tweet will make the market go up or down</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
              <span className="text-lg">3</span>
            </div>
            <p>Earn XP for correct predictions and climb the leaderboard</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md text-sm">
          <p className="font-medium">🔮 How it works:</p>
          <p>We track S&P 500 movement after White House tweets to determine if the market goes up (bull) or down (bear).</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button 
          onClick={login}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2"
          size="lg"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-current"></span>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.19 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
              </svg>
              <span>Sign in with Twitter</span>
            </>
          )}
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          <a href="/leaderboard" className="underline hover:text-primary">
            Check out the leaderboard
          </a>
          {" "}without signing in
        </div>
      </CardFooter>
    </Card>
  );
}
