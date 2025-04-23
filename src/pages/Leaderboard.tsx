
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

const Leaderboard = () => {
  const { data: leaderboard, isLoading, error } = useLeaderboard();
  const { user } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bull or Bear Leaderboard</h1>
        <div className="space-x-2">
          <Button variant="outline" asChild>
            <Link to="/">Make Prediction</Link>
          </Button>
          {user && (
            <Button variant="outline" asChild>
              <Link to={`/profile/${user.id}`}>My Profile</Link>
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Predictors</CardTitle>
          <CardDescription>
            See who has the best record predicting market moves from White House tweets
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Failed to load leaderboard data
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">XP</TableHead>
                  <TableHead className="text-right">Streak</TableHead>
                  <TableHead className="text-right">Accuracy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard?.map((entry, index) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">#{index + 1}</TableCell>
                    <TableCell>
                      <Link 
                        to={`/profile/${entry.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {entry.twitterHandle}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">{entry.xp}</TableCell>
                    <TableCell className="text-right">
                      {entry.currentStreak > 0 && (
                        <Badge variant="outline" className="ml-2">
                          {entry.currentStreak} streak
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {entry.accuracy.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}

                {leaderboard?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No data available yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
    </Layout>
  );
};

export default Leaderboard;
