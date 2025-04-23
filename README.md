
# Bull or Bear Prediction Game

A web application that allows users to predict how the next White House tweet will impact the stock market.

## Project Overview

"Bull or Bear" is a prediction game where players guess whether the next official White House tweet will make the stock market go up (bullish) or down (bearish). Predictions are tracked and users earn XP for correct guesses.

## Features

- **Authentication**: Login with Twitter (mocked for demo)
- **Prediction Flow**: Make binary choices (bull or bear) about market impact of tweets
- **User Profiles**: View your prediction history, stats, and current streak
- **Leaderboard**: Compete with other players based on prediction accuracy and XP
- **Streak System**: Build consecutive correct predictions for bonus XP

## Technical Implementation

This project is built with:

- **Frontend**: React with TypeScript and Tailwind CSS
- **UI Components**: shadcn/ui for a polished interface
- **State Management**: React Query for server state
- **Routing**: React Router for navigation
- **Mock Database**: Simulated data layer (could be replaced with actual database)

## Project Structure

- `/src/components`: UI components
- `/src/contexts`: React context providers (Auth)
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utilities and database interface
- `/src/pages`: Application pages

## Data Model

The application uses three main data types:

1. **Users**: Profile information, XP, and prediction stats
2. **Tweets**: White House tweets with S&P 500 measurements
3. **Predictions**: User predictions linked to tweets

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Mock Data

For demonstration purposes, this project uses mock data instead of connecting to external APIs. In a production environment, you would:

1. Integrate with Twitter API to fetch White House tweets
2. Connect to financial data provider for S&P 500 information
3. Use a real database instead of in-memory storage
4. Set up authentication with Twitter OAuth
5. Create server-side functions for processing predictions

## Automation

In a production environment, GitHub Actions would be configured to:

1. Fetch new White House tweets periodically
2. Measure market impact after a set time period
3. Resolve user predictions and award XP
4. Update leaderboards

## License

[MIT](LICENSE)
