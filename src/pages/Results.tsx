
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCurrentTweet } from "@/hooks/useCurrentTweet";
import { getUserPredictions } from "@/lib/mockDatabase";
import { Layout } from "@/components/Layout";

const Results = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: currentTweet } = useCurrentTweet();
  
  // If no user is logged in, redirect to the home page
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Get the user's prediction for the current tweet
  const userPrediction = user 
    ? getUserPredictions(user.id).find(p => p.tweetId === currentTweet?.id)
    : null;
  
  if (!user || !currentTweet || !userPrediction) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  // Determine the result state
  const hasResult = currentTweet.outcome !== null;
  const isCorrect = userPrediction.correct === true;
  const isPending = userPrediction.correct === null;

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Prediction Result</CardTitle>
          <CardDescription>
            {isPending 
              ? "Waiting for the market to react to the tweet..." 
              : "Your prediction has been resolved!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="rounded-lg bg-muted p-4">
            <p className="italic text-muted-foreground text-sm mb-2">White House Tweet:</p>
            <p className="font-medium">{currentTweet.content}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Your prediction:</p>
            <div className={`text-xl font-bold ${
              userPrediction.guess === 'bull' ? 'text-green-500' : 'text-red-500'
            }`}>
              {userPrediction.guess === 'bull' ? '📈 Bull (Market Up)' : '📉 Bear (Market Down)'}
            </div>
          </div>

          {hasResult ? (
            <div className="space-y-4">
              <div className="p-4 rounded-full mx-auto w-24 h-24 flex items-center justify-center border-4 border-dashed border-primary/30">
                {isCorrect ? (
                  <span className="text-3xl">🏆</span>
                ) : (
                  <span className="text-3xl">😢</span>
                )}
              </div>
              
              <div className={`py-2 px-4 rounded-full font-semibold mx-auto inline-block ${
                isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
              
              <div className="space-y-1 text-sm">
                <p>S&P 500 before: {currentTweet.spBefore.toFixed(2)}</p>
                <p>S&P 500 after: {currentTweet.spAfter?.toFixed(2)}</p>
                <p className="font-medium">
                  Market went {currentTweet.outcome === 'bull' ? 'UP 📈' : 'DOWN 📉'}
                </p>
                
                {isCorrect && (
                  <p className="mt-2 font-semibold text-green-600">
                    +{user.currentStreak * 10} XP earned!
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-full mx-auto w-24 h-24 flex items-center justify-center border-4 border-dashed border-primary/30">
                <span className="text-3xl animate-bounce">⏳</span>
              </div>
              <p className="text-muted-foreground">
                Waiting for the market to react to this tweet...
              </p>
              <p className="text-sm">
                Check back soon to see if your prediction was correct!
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/">
              {hasResult ? 'New Prediction' : 'Back Home'}
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to={`/profile/${user.id}`}>My Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
    </Layout>
  );
};

export default Results;
