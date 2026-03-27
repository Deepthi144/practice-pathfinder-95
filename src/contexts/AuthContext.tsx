import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string) => {
    if (email === 'admin@example.com') {
      setUser(mockUsers[2]);
      return true;
    }
    const found = mockUsers.find(u => u.email === email && u.role === 'student');
    if (found) {
      setUser(found);
      return true;
    }
    // Auto-login for demo
    setUser(mockUsers[0]);
    return true;
  };

  const register = (name: string, email: string, _password: string) => {
    const newUser: User = { id: Date.now().toString(), name, email, role: 'student' };
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
