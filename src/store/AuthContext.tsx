// src/store/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean; // Add loading state
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Initialize loading to true

  useEffect(() => {
    // Simulate checking local storage for a logged-in user
    const storedUser = localStorage.getItem('swish_user');
    if (storedUser) {
      const userData: User = JSON.parse(storedUser);
      setUser(userData);
      setIsLoggedIn(true);
    }
    setLoading(false); // Set loading to false after check
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('swish_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('swish_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
