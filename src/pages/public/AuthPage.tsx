// src/pages/public/AuthPage.tsx
import React, { useState, useEffect } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useAuth } from '../../store/AuthContext';
import { api } from '../../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const location = useLocation();
  const isRegisterRoute = location.pathname === '/register';
  const [isLogin, setIsLogin] = useState(!isRegisterRoute);
  const [name, setName] = useState('');

  useEffect(() => {
    setIsLogin(!isRegisterRoute);
  }, [isRegisterRoute]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Not used in mock API, but kept for UI
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const getDashboardPath = (role: User['role']) => {
    if (role === 'participant') return '/dashboard';
    if (role === 'tenant-admin') return '/tenant-admin/dashboard';
    if (role === 'platform-admin') return '/platform-admin/dashboard';
    return '/'; // Fallback
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      // Simulate login
      const user = await api.auth.login(email);
      if (user) {
        authLogin(user);
        navigate(getDashboardPath(user.role)); // Redirect to appropriate dashboard after login
      } else {
        setError('Login failed. Please check your email and password.');
      }
    } else {
      // Simulate registration
      if (!name) {
        setError('Name is required for registration.');
        setLoading(false);
        return;
      }
      const newUser = await api.auth.register(email, name);
      if (newUser) {
        authLogin(newUser);
        navigate(getDashboardPath(newUser.role)); // Redirect to appropriate dashboard after registration
      } else {
        setError('Registration failed. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <PublicLayout>
      <div className="flex justify-center items-center py-16 px-4">
        <Card className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {isLogin ? 'Login' : 'Register'}
          </h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            )}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
            </Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <Button
                variant="ghost"
                type="button"
                onClick={() => navigate(isLogin ? '/register' : '/login')}
                className="text-green-600"
              >
                {isLogin ? 'Register' : 'Login'}
              </Button>
            </p>
          </div>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default AuthPage;
