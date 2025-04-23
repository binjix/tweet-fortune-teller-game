
/**
 * Type definitions for the Bull or Bear prediction game
 */

// User profile with Twitter handle
export interface User {
  id: string;
  twitterHandle: string; // Twitter handle including @
  xp: number;
  currentStreak: number;
  totalPredictions: number;
  correctPredictions: number;
  createdAt: Date;
}

// Tweet from White House with market data
export interface Tweet {
  id: string;
  tweetId: string;
  content: string | null; // null for pending tweets that haven't been posted yet
  publishedAt: Date | null; // null for pending tweets
  spBefore: number; // S&P 500 index at the time of prediction
  spAfter: number | null; // S&P 500 index 10 minutes after tweet
  outcome: 'bull' | 'bear' | null; // Market direction after tweet
}

// User prediction on a tweet
export interface Prediction {
  id: string;
  userId: string;
  tweetId: string;
  guess: 'bull' | 'bear'; // User guess - market going up or down
  correct: boolean | null; // Result once the market impact is measured
  createdAt: Date;
}

// Leaderboard entry
export interface LeaderboardEntry {
  id: string;
  twitterHandle: string;
  xp: number;
  currentStreak: number;
  accuracy: number;
}

// Context type for authentication
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

// Form for prediction submission
export interface PredictionFormData {
  guess: 'bull' | 'bear';
}
