
import { useParams, Link } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Layout } from "@/components/Layout";

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, isLoading, error } = useUserProfile(userId || "");
  const { user } = useAuth();
  
  const isOwnProfile = user && user.id === userId;

  // Format prediction result
  const formatPredictionResult = (correct: boolean | null) => {
    if (correct === null) return <Badge variant="outline">Pending</Badge>;
    return correct ? (
      <Badge className="bg-green-500 text-white">Correct</Badge>
    ) : (
      <Badge variant="destructive">Incorrect</Badge>
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (error || !data || !data.user) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <p className="mb-6">The requested profile could not be loaded.</p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const { user: profileUser, predictions } = data;
  
  // Calculate stats
  const accuracy = profileUser.totalPredictions > 0
    ? (profileUser.correctPredictions / profileUser.totalPredictions) * 100
    : 0;

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <div className="space-x-2">
          <Button variant="outline" asChild>
            <Link to="/">Predict</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/leaderboard">Leaderboard</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>{profileUser.twitterHandle}</CardTitle>
            <CardDescription>
              {isOwnProfile ? "Your Profile" : "User Profile"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">XP</span>
                <span className="font-semibold text-xl">{profileUser.xp}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Current Streak</span>
                <span className="font-semibold">
                  {profileUser.currentStreak > 0 ? (
                    <Badge className="ml-2">
                      {profileUser.currentStreak} 🔥
                    </Badge>
                  ) : (
                    '0'
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-semibold">{accuracy.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Predictions</span>
                <span className="font-semibold">
                  {profileUser.correctPredictions} / {profileUser.totalPredictions}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Playing since {new Date(profileUser.createdAt).toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Prediction History</CardTitle>
            <CardDescription>
              Previous market predictions and results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Prediction</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {predictions.length > 0 ? (
                  predictions.map((prediction) => (
                    <TableRow key={prediction.id}>
                      <TableCell>
                        {new Date(prediction.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={prediction.guess === 'bull' ? 'default' : 'destructive'}>
                          {prediction.guess === 'bull' ? 'Bull (Up) 📈' : 'Bear (Down) 📉'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatPredictionResult(prediction.correct)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                      No predictions made yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
    </Layout>
  );
};

export default Profile;
