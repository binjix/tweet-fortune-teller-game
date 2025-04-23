import { Layout } from "@/components/Layout";
import { WelcomeCard } from "@/components/WelcomeCard";
import { PredictionForm } from "@/components/PredictionForm";
import { useAuth } from "@/contexts/AuthContext";
import { useCurrentTweet } from "@/hooks/useCurrentTweet";
import { getUserPredictions } from "@/lib/mockDatabase";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { data: currentTweet, isLoading: tweetLoading, error } = useCurrentTweet();
  const navigate = useNavigate();

  // Check if user already has a prediction for the current tweet
  const hasExistingPrediction = user && currentTweet && 
    getUserPredictions(user.id).some(
      p => p.tweetId === currentTweet.id
    );

  // If user has already made a prediction, redirect to results
  useEffect(() => {
    if (user && currentTweet && hasExistingPrediction) {
      navigate("/results");
    }
  }, [user, currentTweet, hasExistingPrediction, navigate]);

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center">
        {authLoading || tweetLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-destructive mb-4">
              Error loading prediction data
            </h2>
            <p className="mb-8 text-muted-foreground">
              We're having trouble connecting to our prediction service.
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : !user ? (
          // Show welcome card for unauthenticated users
          <WelcomeCard />
        ) : !currentTweet ? (
          // No tweet available for prediction
          <div className="text-center max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">No Predictions Available</h2>
            <p className="mb-6 text-muted-foreground">
              There are no White House tweets available for prediction at the moment.
              Please check back soon!
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline">
                <a href="/leaderboard">View Leaderboard</a>
              </Button>
              <Button asChild>
                <a href={`/profile/${user.id}`}>My Profile</a>
              </Button>
            </div>
          </div>
        ) : hasExistingPrediction ? (
          // User already has a prediction for this tweet
          <div className="flex justify-center items-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          // Show prediction form for authenticated users with available tweet
          <PredictionForm tweet={currentTweet} userId={user.id} />
        )}
        
        {/* Stats Section */}
        <div className="mt-20 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-center">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto mb-4 bg-blue-100 text-blue-800 w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold">1</div>
              <h3 className="font-semibold mb-2">Make a Prediction</h3>
              <p className="text-sm text-muted-foreground">
                Choose if the next White House tweet will make the S&P 500 go up (bull) or down (bear).
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto mb-4 bg-blue-100 text-blue-800 w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold">2</div>
              <h3 className="font-semibold mb-2">Wait for Results</h3>
              <p className="text-sm text-muted-foreground">
                We track the S&P 500 before and after White House tweets to determine market impact.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto mb-4 bg-blue-100 text-blue-800 w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold">3</div>
              <h3 className="font-semibold mb-2">Earn XP & Streaks</h3>
              <p className="text-sm text-muted-foreground">
                Correct predictions earn XP and build your streak. Compete on the leaderboard!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
