import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockQuestions, Question } from '@/data/mockData';
import { BookOpen, CheckCircle2, XCircle, ChevronRight, Filter } from 'lucide-react';

const topics = ['All', 'Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Structures', 'Algorithms'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

const PracticePage = () => {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const filtered = mockQuestions.filter(q => {
    if (selectedTopic !== 'All' && q.topic !== selectedTopic) return false;
    if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const handleAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    setShowResult(true);
  };

  const diffColor = (d: string) => {
    if (d === 'Easy') return 'bg-accent/10 text-accent border-accent/20';
    if (d === 'Medium') return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-destructive/10 text-destructive border-destructive/20';
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Practice Questions</h1>
          <p className="text-muted-foreground mt-1">Sharpen your skills topic by topic</p>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Topics</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {topics.map(t => (
                <Button
                  key={t}
                  variant={selectedTopic === t ? 'default' : 'outline'}
                  size="sm"
                  className={selectedTopic === t ? 'gradient-primary text-primary-foreground' : ''}
                  onClick={() => { setSelectedTopic(t); setActiveQuestion(null); setShowResult(false); }}
                >
                  {t}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold">Difficulty</span>
            </div>
            <div className="flex gap-2">
              {difficulties.map(d => (
                <Button
                  key={d}
                  variant={selectedDifficulty === d ? 'default' : 'outline'}
                  size="sm"
                  className={selectedDifficulty === d ? 'gradient-primary text-primary-foreground' : ''}
                  onClick={() => { setSelectedDifficulty(d); setActiveQuestion(null); setShowResult(false); }}
                >
                  {d}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Question List */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-muted-foreground">{filtered.length} questions found</p>
            {filtered.map((q, i) => (
              <Card
                key={q.id}
                className={`border-0 shadow-sm cursor-pointer transition-all hover:shadow-md ${activeQuestion?.id === q.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => { setActiveQuestion(q); setSelectedAnswer(null); setShowResult(false); }}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={`text-xs ${diffColor(q.difficulty)}`}>{q.difficulty}</Badge>
                      <Badge variant="outline" className="text-xs">{q.type}</Badge>
                    </div>
                    <p className="text-sm font-medium truncate">Q{i + 1}: {q.question}</p>
                    <p className="text-xs text-muted-foreground mt-1">{q.topic}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Active Question */}
          <div className="lg:col-span-2">
            {activeQuestion ? (
              <Card className="border-0 shadow-md sticky top-24">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={diffColor(activeQuestion.difficulty)}>{activeQuestion.difficulty}</Badge>
                    <Badge variant="outline">{activeQuestion.topic}</Badge>
                    {activeQuestion.company && <Badge className="gradient-primary text-primary-foreground text-xs">{activeQuestion.company}</Badge>}
                  </div>
                  <CardTitle className="text-lg">{activeQuestion.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeQuestion.options.map((opt, idx) => {
                    let optClass = 'border bg-card hover:bg-muted cursor-pointer';
                    if (showResult) {
                      if (idx === activeQuestion.correctAnswer) optClass = 'border-accent bg-accent/10';
                      else if (idx === selectedAnswer) optClass = 'border-destructive bg-destructive/10';
                    } else if (idx === selectedAnswer) {
                      optClass = 'border-primary bg-primary/10';
                    }
                    return (
                      <button
                        key={idx}
                        className={`w-full text-left p-4 rounded-xl transition-all flex items-center gap-3 ${optClass}`}
                        onClick={() => !showResult && handleAnswer(idx)}
                        disabled={showResult}
                      >
                        <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm">{opt}</span>
                        {showResult && idx === activeQuestion.correctAnswer && <CheckCircle2 className="w-5 h-5 text-accent ml-auto" />}
                        {showResult && idx === selectedAnswer && idx !== activeQuestion.correctAnswer && <XCircle className="w-5 h-5 text-destructive ml-auto" />}
                      </button>
                    );
                  })}
                  {showResult && (
                    <div className="mt-4 p-4 rounded-xl bg-muted/50 border">
                      <p className="text-sm font-semibold mb-1">
                        {selectedAnswer === activeQuestion.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
                      </p>
                      <p className="text-sm text-muted-foreground">{activeQuestion.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-md flex items-center justify-center h-64">
                <div className="text-center text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Select a question to begin</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PracticePage;
