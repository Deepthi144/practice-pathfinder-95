import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockLeaderboard } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';

const LeaderboardPage = () => {
  const { user } = useAuth();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-warning" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-muted-foreground" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-warning/70" />;
    return <span className="font-display text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  const top3 = mockLeaderboard.slice(0, 3);
  const rest = mockLeaderboard.slice(3);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground mt-1">See where you stand among peers</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-4">
          {[top3[1], top3[0], top3[2]].map((entry, i) => {
            if (!entry) return null;
            const isFirst = entry.rank === 1;
            return (
              <Card key={entry.userId} className={`border-0 shadow-md text-center ${isFirst ? 'md:-mt-4 shadow-lg' : ''} ${entry.userId === user?.id ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className={`p-6 ${isFirst ? 'pt-8' : 'pt-6'}`}>
                  <div className="mx-auto mb-3">{getRankIcon(entry.rank)}</div>
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold mb-3 ${isFirst ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {entry.name[0]}
                  </div>
                  <p className="font-display font-bold text-lg">{entry.name}</p>
                  <p className="font-display text-2xl font-bold text-gradient mt-2">{entry.totalScore}</p>
                  <p className="text-xs text-muted-foreground">Total Score</p>
                  <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span>{entry.testsCompleted} tests</span>
                    <span>{entry.avgAccuracy}% acc</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Trophy className="w-5 h-5 text-warning" /> Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockLeaderboard.map(entry => (
                <div
                  key={entry.userId}
                  className={`flex items-center gap-4 p-4 rounded-xl transition ${
                    entry.userId === user?.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="w-10 text-center">{getRankIcon(entry.rank)}</div>
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                    {entry.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold flex items-center gap-2">
                      {entry.name}
                      {entry.userId === user?.id && <Badge className="gradient-primary text-primary-foreground text-xs">You</Badge>}
                    </p>
                    <p className="text-sm text-muted-foreground">{entry.testsCompleted} tests completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-bold">{entry.totalScore}</p>
                    <div className="flex items-center gap-1 text-xs text-accent">
                      <TrendingUp className="w-3 h-3" /> {entry.avgAccuracy}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default LeaderboardPage;
