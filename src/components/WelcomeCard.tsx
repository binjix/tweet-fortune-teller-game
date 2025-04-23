import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Twitter } from "lucide-react";
import { usePrivyAuth } from "@/contexts/PrivyAuthContext"; // update import

export function WelcomeCard() {
  const { login, isLoading } = usePrivyAuth(); // update hooks

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
            <p>Predict if the next @WhiteHouse tweet will make the market go up or down</p>
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
          <p>We track S&P 500 movement 10 minutes after White House tweets to determine if the market goes up (bull) or down (bear).</p>
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
              <Twitter className="h-5 w-5 mr-2" />
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
