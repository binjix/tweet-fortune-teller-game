
import { User, Tweet, Prediction, LeaderboardEntry } from './types';

// Mock database storage
const storage = {
  users: [] as User[],
  tweets: [] as Tweet[],
  predictions: [] as Prediction[],
};

// Initialize with some mock data
const initializeData = () => {
  // Mock tweets
  const mockTweets: Tweet[] = [
    {
      id: '1',
      tweetId: '1234567890',
      content: 'The White House is committed to strengthening the economy and creating jobs for all Americans.',
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      spBefore: 4200.50,
      spAfter: 4220.75,
      outcome: 'bull',
    },
    {
      id: '2',
      tweetId: '0987654321',
      content: 'Today we are announcing new regulations on the financial sector to protect consumers.',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      spBefore: 4220.75,
      spAfter: 4210.25,
      outcome: 'bear',
    },
    {
      id: '3',
      tweetId: '1357908642',
      content: 'The President will be meeting with tech industry leaders next week.',
      publishedAt: new Date(), // Current time
      spBefore: 4210.25,
      spAfter: null,
      outcome: null,
    },
  ];

  // Mock users
  const mockUsers: User[] = [
    {
      id: '1',
      twitterHandle: '@investor123',
      xp: 250,
      currentStreak: 3,
      totalPredictions: 10,
      correctPredictions: 7,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      twitterHandle: '@marketwhiz',
      xp: 320,
      currentStreak: 0,
      totalPredictions: 12,
      correctPredictions: 8,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      twitterHandle: '@traderpro',
      xp: 180,
      currentStreak: 2,
      totalPredictions: 8,
      correctPredictions: 5,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  // Mock predictions
  const mockPredictions: Prediction[] = [
    {
      id: '1',
      userId: '1',
      tweetId: '1',
      guess: 'bull',
      correct: true,
      createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
    },
    {
      id: '2',
      userId: '1',
      tweetId: '2',
      guess: 'bull',
      correct: false,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      id: '3',
      userId: '2',
      tweetId: '1',
      guess: 'bear',
      correct: false,
      createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
    },
    {
      id: '4',
      userId: '2',
      tweetId: '2',
      guess: 'bear',
      correct: true,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      id: '5',
      userId: '3',
      tweetId: '3',
      guess: 'bull',
      correct: null,
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
    },
  ];

  storage.tweets = mockTweets;
  storage.users = mockUsers;
  storage.predictions = mockPredictions;
};

// Initialize mock data
initializeData();

/**
 * Mock User functions
 */
export const getUserById = (id: string): User | undefined => {
  return storage.users.find(user => user.id === id);
};

export const getUserByTwitterHandle = (twitterHandle: string): User | undefined => {
  return storage.users.find(user => user.twitterHandle === twitterHandle);
};

export const createUser = (twitterHandle: string): User => {
  const newUser: User = {
    id: `user_${Date.now()}`,
    twitterHandle,
    xp: 0,
    currentStreak: 0,
    totalPredictions: 0,
    correctPredictions: 0,
    createdAt: new Date(),
  };
  
  storage.users.push(newUser);
  return newUser;
};

export const updateUser = (userId: string, updates: Partial<User>): User | undefined => {
  const userIndex = storage.users.findIndex(user => user.id === userId);
  if (userIndex === -1) return undefined;
  
  storage.users[userIndex] = { ...storage.users[userIndex], ...updates };
  return storage.users[userIndex];
};

/**
 * Mock Tweet functions
 */
export const getLatestTweet = (): Tweet | undefined => {
  return [...storage.tweets].sort((a, b) => 
    b.publishedAt.getTime() - a.publishedAt.getTime()
  )[0];
};

export const getCurrentUnresolvedTweet = (): Tweet | undefined => {
  return storage.tweets.find(tweet => tweet.outcome === null);
};

export const createTweet = (tweetData: Omit<Tweet, 'id'>): Tweet => {
  const newTweet: Tweet = {
    id: `tweet_${Date.now()}`,
    ...tweetData,
  };
  
  storage.tweets.push(newTweet);
  return newTweet;
};

export const updateTweetOutcome = (tweetId: string, spAfter: number): Tweet | undefined => {
  const tweetIndex = storage.tweets.findIndex(tweet => tweet.id === tweetId);
  if (tweetIndex === -1) return undefined;
  
  const tweet = storage.tweets[tweetIndex];
  const outcome: 'bull' | 'bear' = spAfter > tweet.spBefore ? 'bull' : 'bear';
  
  storage.tweets[tweetIndex] = { ...tweet, spAfter, outcome };
  return storage.tweets[tweetIndex];
};

/**
 * Mock Prediction functions
 */
export const savePrediction = (prediction: Omit<Prediction, 'id' | 'correct' | 'createdAt'>): Prediction => {
  const newPrediction: Prediction = {
    id: `prediction_${Date.now()}`,
    ...prediction,
    correct: null,
    createdAt: new Date(),
  };
  
  storage.predictions.push(newPrediction);
  return newPrediction;
};

export const getUserPredictions = (userId: string): Prediction[] => {
  return storage.predictions.filter(prediction => prediction.userId === userId);
};

export const getPredictionsByTweetId = (tweetId: string): Prediction[] => {
  return storage.predictions.filter(prediction => prediction.tweetId === tweetId);
};

export const resolvePredictions = (tweetId: string): Prediction[] => {
  const tweet = storage.tweets.find(t => t.id === tweetId);
  if (!tweet || tweet.outcome === null) return [];
  
  const predictions = storage.predictions.filter(p => p.tweetId === tweetId && p.correct === null);
  
  predictions.forEach(prediction => {
    const predictionIndex = storage.predictions.findIndex(p => p.id === prediction.id);
    const isCorrect = prediction.guess === tweet.outcome;
    storage.predictions[predictionIndex].correct = isCorrect;
    
    // Update user stats
    const userIndex = storage.users.findIndex(user => user.id === prediction.userId);
    if (userIndex !== -1) {
      const user = storage.users[userIndex];
      const updatedUser = { 
        ...user,
        totalPredictions: user.totalPredictions + 1,
        correctPredictions: isCorrect ? user.correctPredictions + 1 : user.correctPredictions,
        xp: isCorrect ? user.xp + 10 * (user.currentStreak + 1) : user.xp,
        currentStreak: isCorrect ? user.currentStreak + 1 : 0,
      };
      storage.users[userIndex] = updatedUser;
    }
  });
  
  return predictions;
};

/**
 * Mock Leaderboard functions
 */
export const getLeaderboard = (): LeaderboardEntry[] => {
  return storage.users
    .map(user => ({
      id: user.id,
      twitterHandle: user.twitterHandle,
      xp: user.xp,
      currentStreak: user.currentStreak,
      accuracy: user.totalPredictions > 0 
        ? (user.correctPredictions / user.totalPredictions) * 100 
        : 0,
    }))
    .sort((a, b) => b.xp - a.xp);
};

// For demo purposes - simulate a logged in user
export let currentUser: User | null = storage.users[0];

export const loginUser = (id: string): User | null => {
  const user = getUserById(id);
  if (user) {
    currentUser = user;
    return user;
  }
  return null;
};

export const logoutUser = (): void => {
  currentUser = null;
};

export const getCurrentUser = (): User | null => {
  return currentUser;
};
