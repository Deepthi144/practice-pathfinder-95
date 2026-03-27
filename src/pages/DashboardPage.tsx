import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Trophy, TrendingUp, Target, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { performanceData, topicPerformance, mockResults } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Tests Completed', value: '10', icon: Clock, color: 'gradient-primary' },
    { label: 'Avg Score', value: '78%', icon: TrendingUp, color: 'gradient-success' },
    { label: 'Questions Solved', value: '156', icon: BookOpen, color: 'gradient-warm' },
    { label: 'Leaderboard Rank', value: '#3', icon: Trophy, color: 'gradient-primary' },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <div className="gradient-primary rounded-2xl p-8 text-primary-foreground">
          <h1 className="font-display text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="opacity-90 max-w-lg">Keep up the great work! You've been consistently improving. Try a mock test today.</p>
          <div className="flex gap-3 mt-4">
            <Link to="/practice"><Button variant="secondary" className="font-semibold">Practice Now</Button></Link>
            <Link to="/mock-test"><Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">Take Mock Test</Button></Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
            <Card key={stat.label} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="font-display text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Performance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="hsl(199 89% 48%)" strokeWidth={3} dot={{ fill: 'hsl(199 89% 48%)', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Target className="w-5 h-5 text-secondary" /> Topic-wise Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={topicPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="topic" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(250 60% 58%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Results */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" /> Recent Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockResults.map(result => (
                <div key={result.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div>
                    <p className="font-semibold">{result.testTitle}</p>
                    <p className="text-sm text-muted-foreground">{result.date} • {Math.round(result.timeTaken / 60)} min</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-display text-xl font-bold ${result.score >= 70 ? 'text-accent' : result.score >= 50 ? 'text-warning' : 'text-destructive'}`}>
                      {result.score}%
                    </p>
                    <p className="text-xs text-muted-foreground">{result.correctAnswers}/{result.totalQuestions} correct</p>
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

export default DashboardPage;
