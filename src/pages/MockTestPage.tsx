import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockTests, mockQuestions, Question } from '@/data/mockData';
import { Clock, Play, AlertTriangle, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const MockTestPage = () => {
  const [activeTest, setActiveTest] = useState<typeof mockTests[0] | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const questions: Question[] = activeTest
    ? activeTest.questionIds.map(id => mockQuestions.find(q => q.id === id)!).filter(Boolean)
    : [];

  const submitTest = useCallback(() => {
    if (!activeTest) return;
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    const score = Math.round((correct / questions.length) * 100);
    const result = {
      testId: activeTest.id,
      testTitle: activeTest.title,
      score,
      totalQuestions: questions.length,
      correctAnswers: correct,
      timeTaken: activeTest.duration * 60 - timeLeft,
      answers,
    };
    localStorage.setItem('lastTestResult', JSON.stringify(result));
    toast({ title: 'Test Submitted!', description: `You scored ${score}%` });
    navigate('/results');
  }, [activeTest, answers, questions, timeLeft, toast, navigate]);

  useEffect(() => {
    if (!testStarted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [testStarted, timeLeft, submitTest]);

  const startTest = (test: typeof mockTests[0]) => {
    setActiveTest(test);
    setTestStarted(true);
    setCurrentQ(0);
    setAnswers({});
    setTimeLeft(test.duration * 60);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const diffColor = (d: string) => {
    if (d === 'Easy') return 'bg-accent/10 text-accent';
    if (d === 'Medium') return 'bg-warning/10 text-warning';
    return 'bg-destructive/10 text-destructive';
  };

  if (testStarted && activeTest && questions.length > 0) {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;
    const isLowTime = timeLeft < 60;

    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Timer Bar */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-card shadow-md border-0">
            <div>
              <p className="font-display font-bold">{activeTest.title}</p>
              <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-display text-lg font-bold ${isLowTime ? 'bg-destructive/10 text-destructive animate-pulse-glow' : 'bg-primary/10 text-primary'}`}>
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
          </div>

          <Progress value={progress} className="h-2" />

          {/* Question */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex gap-2 mb-2">
                <Badge variant="outline" className={diffColor(q.difficulty)}>{q.difficulty}</Badge>
                <Badge variant="outline">{q.topic}</Badge>
              </div>
              <CardTitle className="text-lg leading-relaxed">{q.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                    answers[q.id] === idx ? 'border-primary bg-primary/10 shadow-sm' : 'hover:bg-muted'
                  }`}
                  onClick={() => setAnswers(prev => ({ ...prev, [q.id]: idx }))}
                >
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold shrink-0 ${
                    answers[q.id] === idx ? 'border-primary bg-primary text-primary-foreground' : ''
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm">{opt}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <div className="flex gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
                    i === currentQ ? 'gradient-primary text-primary-foreground shadow-md' :
                    answers[questions[i].id] !== undefined ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                  onClick={() => setCurrentQ(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            {currentQ === questions.length - 1 ? (
              <Button className="gradient-primary text-primary-foreground" onClick={submitTest}>
                <Send className="w-4 h-4 mr-1" /> Submit
              </Button>
            ) : (
              <Button onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))}>
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </AppLayout>
    );
  }

  // Test Selection
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Mock Tests</h1>
          <p className="text-muted-foreground mt-1">Company-specific practice tests with timer</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTests.map(test => (
            <Card key={test.id} className="border-0 shadow-md hover:shadow-lg transition-all group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="gradient-primary text-primary-foreground">{test.company}</Badge>
                  <Badge variant="outline" className={diffColor(test.difficulty)}>{test.difficulty}</Badge>
                </div>
                <CardTitle className="font-display mt-3">{test.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {test.duration} min</span>
                  <span>{test.questionCount} Questions</span>
                </div>
                <Button className="w-full gradient-primary text-primary-foreground group-hover:shadow-lg transition-shadow" onClick={() => startTest(test)}>
                  <Play className="w-4 h-4 mr-2" /> Start Test
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-md bg-warning/5 border-warning/20">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Important Instructions</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>• Test auto-submits when timer runs out</li>
                <li>• You can navigate between questions freely</li>
                <li>• Results are shown immediately after submission</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default MockTestPage;
