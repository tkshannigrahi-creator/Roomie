import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('roomie@gmail.com');
  const [password, setPassword] = useState('Roomie@123');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Roomie</h1>
          <p className="mt-2 text-sm text-zinc-600">Find your perfect roommate or rental home</p>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="border-zinc-200 shadow-sm rounded-2xl mx-4 sm:mx-0 overflow-hidden">
          <CardHeader className="space-y-1 pb-6 pt-8 px-8">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-5 h-5 text-zinc-400" />}
                  className="rounded-lg border-zinc-200 h-12 pl-11 pr-4 shadow-sm"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-1">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="w-5 h-5 text-zinc-400" />}
                  className="rounded-lg border-zinc-200 h-12 pl-11 pr-4 shadow-sm"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm font-medium text-center">
                   {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 rounded-lg bg-black text-white hover:bg-zinc-800 text-base font-medium shadow-sm transition-all"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign in'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
