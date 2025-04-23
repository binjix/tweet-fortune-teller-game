
import { useQuery } from '@tanstack/react-query';
import { getPendingPredictionTweet } from '@/lib/mockDatabase';
import { Tweet } from '@/lib/types';

/**
 * Hook to fetch the pending tweet for prediction
 * In a real application, this would check the latest @WhiteHouse tweets
 * Users predict if this upcoming tweet will be bullish or bearish
 */
export function useCurrentTweet() {
  return useQuery<Tweet | undefined, Error>({
    queryKey: ['pendingTweet'],
    queryFn: async () => {
      // In a real app, this would be an API call to check for pending tweets
      return getPendingPredictionTweet();
    },
    refetchInterval: 30000, // Refetch every 30 seconds to check for updates
  });
}
