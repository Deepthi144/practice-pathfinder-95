import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GraduationCap, Mail, Lock, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('rahul@example.com');
  const [password, setPassword] = useState('password');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast({ title: 'Welcome back!', description: 'Login successful.' });
      if (email === 'admin@example.com') navigate('/admin');
      else navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="absolute inset-0 gradient-primary opacity-5" />
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Sign in to your PrepPortal account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold h-11">
              Sign In <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
          <div className="mt-4 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Student: rahul@example.com</p>
            <p>Admin: admin@example.com</p>
            <p className="mt-1 italic">Any password works for demo</p>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Register</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
