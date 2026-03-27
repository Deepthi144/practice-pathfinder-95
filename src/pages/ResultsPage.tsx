import { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockResults } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Award, CheckCircle2, XCircle, Clock, Target } from 'lucide-react';

const COLORS = ['hsl(160, 84%, 39%)', 'hsl(0, 84%, 60%)', 'hsl(210, 20%, 90%)'];

const ResultsPage = () => {
  const [latestResult, setLatestResult] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('lastTestResult');
    if (stored) setLatestResult(JSON.parse(stored));
  }, []);

  const displayResult = latestResult || {
    testTitle: 'TCS NQT Mock Test',
    score: 80,
    totalQuestions: 5,
    correctAnswers: 4,
    timeTaken: 420,
  };

  const pieData = [
    { name: 'Correct', value: displayResult.correctAnswers },
    { name: 'Incorrect', value: displayResult.totalQuestions - displayResult.correctAnswers },
  ];

  const allResults = latestResult ? [
    { ...displayResult, date: new Date().toISOString().split('T')[0], id: 'latest' },
    ...mockResults
  ] : mockResults;

  const chartData = allResults.slice(0, 6).reverse().map(r => ({
    test: r.testTitle?.replace(/ Mock| Test| Challenge/g, '').substring(0, 12),
    score: r.score,
  }));

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Results & Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your progress and performance</p>
        </div>

        {/* Latest Result Highlight */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="gradient-primary p-6 text-primary-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">{latestResult ? 'Latest Result' : 'Sample Result'}</span>
            </div>
            <h2 className="font-display text-2xl font-bold">{displayResult.testTitle}</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} dataKey="value" stroke="none">
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="ml-4">
                  <p className="font-display text-5xl font-bold text-gradient">{displayResult.score}%</p>
                  <p className="text-sm text-muted-foreground mt-1">Overall Score</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-accent/10 text-center">
                  <CheckCircle2 className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold">{displayResult.correctAnswers}</p>
                  <p className="text-xs text-muted-foreground">Correct</p>
                </div>
                <div className="p-4 rounded-xl bg-destructive/10 text-center">
                  <XCircle className="w-6 h-6 text-destructive mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold">{displayResult.totalQuestions - displayResult.correctAnswers}</p>
                  <p className="text-xs text-muted-foreground">Incorrect</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/10 text-center">
                  <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold">{Math.round(displayResult.timeTaken / 60)}m</p>
                  <p className="text-xs text-muted-foreground">Time Taken</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/10 text-center">
                  <Target className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold">{displayResult.totalQuestions}</p>
                  <p className="text-xs text-muted-foreground">Total Questions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score History Chart */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="font-display">Score History</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="test" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="score" fill="hsl(199 89% 48%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* All Results */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="font-display">All Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allResults.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition">
                  <div>
                    <p className="font-semibold">{r.testTitle}</p>
                    <p className="text-sm text-muted-foreground">{r.date}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <Badge className={r.score >= 70 ? 'bg-accent/10 text-accent' : r.score >= 50 ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'}>
                      {r.score}%
                    </Badge>
                    <span className="text-sm text-muted-foreground">{r.correctAnswers}/{r.totalQuestions}</span>
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

export default ResultsPage;
