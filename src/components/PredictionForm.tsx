
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSavePrediction } from "@/hooks/useSavePrediction";
import { useNavigate } from "react-router-dom";
import { Tweet } from "@/lib/types";

interface PredictionFormProps {
  pendingTweet: Tweet;
  userId: string;
}

export function PredictionForm({ pendingTweet, userId }: PredictionFormProps) {
  const [selectedGuess, setSelectedGuess] = useState<'bull' | 'bear' | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const savePrediction = useSavePrediction();

  const handleSubmitPrediction = async () => {
    if (!selectedGuess) {
      toast({
        title: "No prediction selected",
        description: "Please select either Bull or Bear before submitting",
        variant: "destructive",
      });
      return;
    }

    try {
      await savePrediction.mutateAsync({
        userId,
        tweetId: pendingTweet.id,
        guess: selectedGuess,
      });

      toast({
        title: "Prediction submitted!",
        description: `You predicted the market will go ${selectedGuess === 'bull' ? 'up' : 'down'} after the next White House tweet.`,
      });

      // Navigate to results page
      navigate("/results");
    } catch (error) {
      toast({
        title: "Failed to submit prediction",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Make Your Prediction</CardTitle>
        <CardDescription className="text-center">
          Will the next White House tweet make the market go up or down?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-muted p-4">
          <p className="font-medium text-center">Predict how the S&P 500 will react to the next @WhiteHouse tweet</p>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            The result will be determined by the S&P 500 movement 10 minutes after the tweet is posted
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => setSelectedGuess('bull')}
            className={`flex-1 h-24 text-xl flex flex-col items-center space-y-2 ${
              selectedGuess === 'bull' ? 'border-green-500 ring-2 ring-green-500' : ''
            }`}
            variant="outline"
          >
            <span className="text-2xl">📈</span>
            <span className="text-green-600 font-semibold">Bull</span>
            <span className="text-xs text-muted-foreground">Market Up</span>
          </Button>
          
          <Button
            onClick={() => setSelectedGuess('bear')}
            className={`flex-1 h-24 text-xl flex flex-col items-center space-y-2 ${
              selectedGuess === 'bear' ? 'border-red-500 ring-2 ring-red-500' : ''
            }`}
            variant="outline"
          >
            <span className="text-2xl">📉</span>
            <span className="text-red-600 font-semibold">Bear</span>
            <span className="text-xs text-muted-foreground">Market Down</span>
          </Button>
        </div>

        <div className="text-sm text-center text-muted-foreground bg-blue-50 p-3 rounded-md">
          <p>Current S&P 500: {pendingTweet.spBefore.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmitPrediction}
          disabled={!selectedGuess || savePrediction.isPending}
          className="w-full"
          size="lg"
        >
          {savePrediction.isPending ? (
            <>
              <span className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-current"></span>
              Submitting...
            </>
          ) : (
            <>Submit Prediction</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
