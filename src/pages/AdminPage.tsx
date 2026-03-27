import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockQuestions, mockTests, mockUsers, Question } from '@/data/mockData';
import { Plus, Pencil, Trash2, Users, BookOpen, Clock, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const AdminPage = () => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([...mockQuestions]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQ, setNewQ] = useState({
    question: '', topic: 'Quantitative Aptitude', difficulty: 'Easy' as const,
    type: 'aptitude' as const, options: ['', '', '', ''], correctAnswer: 0, explanation: '',
  });

  const addQuestion = () => {
    if (!newQ.question || newQ.options.some(o => !o)) {
      toast({ title: 'Error', description: 'Fill all fields', variant: 'destructive' });
      return;
    }
    const q: Question = {
      id: `q${Date.now()}`, ...newQ, company: undefined,
    };
    setQuestions(prev => [...prev, q]);
    toast({ title: 'Question Added!', description: 'New question added successfully.' });
    setShowAddForm(false);
    setNewQ({ question: '', topic: 'Quantitative Aptitude', difficulty: 'Easy', type: 'aptitude', options: ['', '', '', ''], correctAnswer: 0, explanation: '' });
  };

  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    toast({ title: 'Deleted', description: 'Question removed.' });
  };

  const stats = [
    { label: 'Total Users', value: mockUsers.length, icon: Users, color: 'gradient-primary' },
    { label: 'Questions', value: questions.length, icon: BookOpen, color: 'gradient-success' },
    { label: 'Mock Tests', value: mockTests.length, icon: Clock, color: 'gradient-warm' },
    { label: 'Admins', value: 1, icon: Shield, color: 'gradient-primary' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">Manage questions, tests, and users</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <Card key={s.label} className="border-0 shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="font-display text-3xl font-bold mt-1">{s.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                    <s.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="questions">
          <TabsList className="mb-4">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{questions.length} questions</p>
              <Button className="gradient-primary text-primary-foreground" onClick={() => setShowAddForm(!showAddForm)}>
                <Plus className="w-4 h-4 mr-2" /> Add Question
              </Button>
            </div>

            {showAddForm && (
              <Card className="border-0 shadow-md border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Add New Question</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea placeholder="Question text" value={newQ.question} onChange={e => setNewQ(p => ({ ...p, question: e.target.value }))} />
                  <div className="grid md:grid-cols-3 gap-4">
                    <Select value={newQ.topic} onValueChange={v => setNewQ(p => ({ ...p, topic: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Structures', 'Algorithms'].map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={newQ.difficulty} onValueChange={v => setNewQ(p => ({ ...p, difficulty: v as any }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={newQ.type} onValueChange={v => setNewQ(p => ({ ...p, type: v as any }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aptitude">Aptitude</SelectItem>
                        <SelectItem value="coding">Coding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {newQ.options.map((o, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input type="radio" name="correct" checked={newQ.correctAnswer === i} onChange={() => setNewQ(p => ({ ...p, correctAnswer: i }))} />
                        <Input placeholder={`Option ${String.fromCharCode(65 + i)}`} value={o} onChange={e => {
                          const opts = [...newQ.options];
                          opts[i] = e.target.value;
                          setNewQ(p => ({ ...p, options: opts }));
                        }} />
                      </div>
                    ))}
                  </div>
                  <Input placeholder="Explanation" value={newQ.explanation} onChange={e => setNewQ(p => ({ ...p, explanation: e.target.value }))} />
                  <div className="flex gap-2">
                    <Button className="gradient-primary text-primary-foreground" onClick={addQuestion}>Save Question</Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              {questions.map((q, i) => (
                <Card key={q.id} className="border-0 shadow-sm">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">{q.difficulty}</Badge>
                        <Badge variant="outline" className="text-xs">{q.topic}</Badge>
                        <Badge variant="outline" className="text-xs">{q.type}</Badge>
                      </div>
                      <p className="text-sm truncate">Q{i + 1}: {q.question}</p>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => deleteQuestion(q.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tests" className="space-y-4">
            {mockTests.map(test => (
              <Card key={test.id} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex gap-2 mb-1">
                      <Badge className="gradient-primary text-primary-foreground text-xs">{test.company}</Badge>
                      <Badge variant="outline" className="text-xs">{test.difficulty}</Badge>
                    </div>
                    <p className="font-semibold">{test.title}</p>
                    <p className="text-sm text-muted-foreground">{test.questionCount} questions • {test.duration} min</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            {mockUsers.map(u => (
              <Card key={u.id} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                    {u.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-sm text-muted-foreground">{u.email}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">{u.role}</Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AdminPage;
