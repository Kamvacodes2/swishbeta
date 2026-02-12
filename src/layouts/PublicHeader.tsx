// src/layouts/PublicHeader.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Bars3Icon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
import DropdownMenu from '../components/ui/DropdownMenu';
import { useAuth } from '../store/AuthContext';

const PublicHeader: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getDashboardPath = (role: User['role']) => {
    if (role === 'participant') return '/dashboard';
    if (role === 'tenant-admin') return '/tenant-admin/dashboard';
    if (role === 'platform-admin') return '/platform-admin/dashboard';
    return '/'; // Fallback
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  const authMenuItems = [
    { key: 'dashboard', label: 'Dashboard', onSelect: () => {
        if (user) navigate(getDashboardPath(user.role));
      }
    },
    { key: 'logout', label: 'Logout', onSelect: handleLogout },
  ];

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About SWISH', path: '/about' },
    { label: 'Experiences', path: '/experiences' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ];

  const mobileNavItems = navItems.map(item => ({
    key: item.path,
    label: item.label,
    onSelect: () => {
      setIsMobileMenuOpen(false);
      navigate(item.path);
    }
  }));

  const mobileAuthItems = isLoggedIn ? authMenuItems : [
    { key: 'login', label: 'Login', onSelect: () => {
      setIsMobileMenuOpen(false);
      navigate('/login');
    }},
    { key: 'register', label: 'Register', onSelect: () => {
      setIsMobileMenuOpen(false);
      navigate('/register');
    }},
  ];

  const mobileMenuItems = [...mobileNavItems, ...mobileAuthItems];



  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          SWISH
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className="text-gray-700 hover:text-green-600 font-medium">
              {item.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <DropdownMenu trigger={
              <Button variant="ghost" size="sm">
                Hello, {user?.name || 'User'}
              </Button>
            } items={authMenuItems} />
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <DropdownMenu
            trigger={
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Bars3Icon className="h-6 w-6" />
              </Button>
            }
            items={mobileMenuItems}
          />
        </div>
      </nav>
    </header>
  );
};

export default PublicHeader;
