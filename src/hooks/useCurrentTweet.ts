
import { useQuery } from '@tanstack/react-query';
import { getCurrentUnresolvedTweet } from '@/lib/mockDatabase';
import { Tweet } from '@/lib/types';

/**
 * Hook to fetch the current unresolved tweet
 * Allows users to predict the market impact of this tweet
 */
export function useCurrentTweet() {
  return useQuery<Tweet | undefined, Error>({
    queryKey: ['currentTweet'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return getCurrentUnresolvedTweet();
    },
    refetchInterval: 30000, // Refetch every 30 seconds to check for updates
  });
}
