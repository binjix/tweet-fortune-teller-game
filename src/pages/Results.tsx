
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getUserPredictions, getMostRecentResolvedTweet, getPendingPredictionTweet } from "@/lib/mockDatabase";
import { Layout } from "@/components/Layout";
import { Tweet, Prediction } from "@/lib/types";

const Results = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pendingTweet, setPendingTweet] = useState<Tweet | undefined>();
  const [latestResolvedTweet, setLatestResolvedTweet] = useState<Tweet | undefined>();
  const [userPrediction, setUserPrediction] = useState<Prediction | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  
  // If no user is logged in, redirect to the home page
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // Load data
    const loadData = () => {
      setIsLoading(true);
      
      // Get the current pending tweet
      const pending = getPendingPredictionTweet();
      setPendingTweet(pending);
      
      // Get the latest resolved tweet
      const resolved = getMostRecentResolvedTweet();
      setLatestResolvedTweet(resolved);
      
      // Get user's predictions
      if (user) {
        const predictions = getUserPredictions(user.id);
        
        // First check for pending prediction
        if (pending) {
          const pendingPrediction = predictions.find(p => p.tweetId === pending.id);
          if (pendingPrediction) {
            setUserPrediction(pendingPrediction);
            setIsLoading(false);
            return;
          }
        }
        
        // Then check for most recent resolved prediction
        if (resolved) {
          const resolvedPrediction = predictions.find(p => p.tweetId === resolved.id);
          if (resolvedPrediction) {
            setUserPrediction(resolvedPrediction);
            setIsLoading(false);
            return;
          }
        }
      }
      
      setIsLoading(false);
    };
    
    loadData();
    
    // Set up polling to check for updates
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [user, navigate]);
  
  if (isLoading || !user) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  // If no prediction found, redirect to home
  if (!userPrediction) {
    navigate("/");
    return null;
  }

  // Determine which tweet to show
  const tweet = userPrediction.correct === null 
    ? pendingTweet // Pending prediction
    : latestResolvedTweet; // Resolved prediction

  if (!tweet) {
    navigate("/");
    return null;
  }

  // Determine the result state
  const isPending = userPrediction.correct === null;
  const isCorrect = userPrediction.correct === true;

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Prediction Result</CardTitle>
          <CardDescription>
            {isPending 
              ? "Waiting for the next White House tweet..." 
              : "Your prediction has been resolved!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {!isPending && tweet.content && (
            <div className="rounded-lg bg-muted p-4">
              <p className="italic text-muted-foreground text-sm mb-2">White House Tweet:</p>
              <p className="font-medium">{tweet.content}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Posted on {tweet.publishedAt ? new Date(tweet.publishedAt).toLocaleString() : 'soon'}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Your prediction:</p>
            <div className={`text-xl font-bold ${
              userPrediction.guess === 'bull' ? 'text-green-500' : 'text-red-500'
            }`}>
              {userPrediction.guess === 'bull' ? '📈 Bull (Market Up)' : '📉 Bear (Market Down)'}
            </div>
          </div>

          {isPending ? (
            <div className="space-y-4">
              <div className="p-4 rounded-full mx-auto w-24 h-24 flex items-center justify-center border-4 border-dashed border-primary/30">
                <span className="text-3xl animate-bounce">⏳</span>
              </div>
              <p className="text-muted-foreground">
                Waiting for the next White House tweet...
              </p>
              <p className="text-sm">
                We'll evaluate your prediction 10 minutes after the tweet is posted.
              </p>
            </div>
          ) : (
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
                <p>S&P 500 before: {tweet.spBefore.toFixed(2)}</p>
                <p>S&P 500 after: {tweet.spAfter?.toFixed(2)}</p>
                <p className="font-medium">
                  Market went {tweet.outcome === 'bull' ? 'UP 📈' : 'DOWN 📉'}
                </p>
                
                {isCorrect && (
                  <p className="mt-2 font-semibold text-green-600">
                    +{user.currentStreak * 10} XP earned!
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/">
              {!isPending ? 'New Prediction' : 'Back Home'}
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
