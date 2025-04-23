
import { useQuery } from '@tanstack/react-query';
import { getUserById, getUserPredictions } from '@/lib/mockDatabase';
import { User, Prediction } from '@/lib/types';

interface UserProfileData {
  user: User | undefined;
  predictions: Prediction[];
}

/**
 * Hook to fetch a user's profile data including their prediction history
 */
export function useUserProfile(userId: string) {
  return useQuery<UserProfileData, Error>({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      // In a real app, these would be API calls
      const user = getUserById(userId);
      const predictions = getUserPredictions(userId);
      
      return {
        user,
        predictions,
      };
    },
    enabled: !!userId, // Only run query if userId is provided
  });
}
