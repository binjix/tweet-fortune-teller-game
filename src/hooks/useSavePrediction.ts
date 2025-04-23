
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { savePrediction } from '@/lib/mockDatabase';
import { Prediction } from '@/lib/types';

interface SavePredictionParams {
  userId: string;
  tweetId: string;
  guess: 'bull' | 'bear';
}

/**
 * Hook to save a user's prediction
 * Records whether they think the market will go up (bull) or down (bear)
 */
export function useSavePrediction() {
  const queryClient = useQueryClient();
  
  return useMutation<Prediction, Error, SavePredictionParams>({
    mutationFn: async ({ userId, tweetId, guess }: SavePredictionParams) => {
      // In a real app, this would be an API call
      return savePrediction({
        userId,
        tweetId,
        guess,
      });
    },
    onSuccess: () => {
      // Invalidate relevant queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['userPredictions'] });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
}
