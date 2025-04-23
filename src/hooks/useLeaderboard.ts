
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '@/lib/mockDatabase';
import { LeaderboardEntry } from '@/lib/types';

/**
 * Hook to fetch the leaderboard data
 * Shows top users ranked by XP with their stats
 */
export function useLeaderboard() {
  return useQuery<LeaderboardEntry[], Error>({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return getLeaderboard();
    },
    refetchInterval: 60000, // Refetch every minute
  });
}
