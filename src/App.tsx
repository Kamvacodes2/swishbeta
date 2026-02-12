import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/AuthContext';

// Public Pages
import HomePage from './pages/public/HomePage';
import ExperiencesPage from './pages/public/ExperiencesPage';
import ExperienceDetailPage from './pages/public/ExperienceDetailPage';
import AuthPage from './pages/public/AuthPage';
import ContactPage from './pages/public/ContactPage';
import AboutPage from './pages/public/AboutPage';
import SolutionsPage from './pages/public/SolutionsPage';
import PricingPage from './pages/public/PricingPage';

// Authenticated Pages
import UserDashboardPage from './pages/auth/UserDashboardPage';
import TenantAdminDashboardPage from './pages/auth/TenantAdminDashboardPage';
import PlatformAdminDashboardPage from './pages/auth/PlatformAdminDashboardPage';
import PublicLayout from './layouts/PublicLayout'; // For About, Contact, etc.
import NotFoundPage from './pages/public/NotFoundPage';
import Spinner from './components/ui/Spinner';


// A simple ProtectedRoute component to handle authentication and role checks
interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: User['role'][];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles, redirectTo = '/login' }) => {
  const { isLoggedIn, user, loading } = useAuth(); // Destructure loading

  if (loading) {
    return (
      <PublicLayout> {/* Use a simple layout for loading state */}
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="lg" />
          <p className="ml-4 text-lg text-gray-700">Loading user data...</p>
        </div>
      </PublicLayout>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) { // Check user also for safety
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Add ScrollToTop component here */}
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/experiences/:id" element={<ExperienceDetailPage />} />
          <Route path="/auth" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PublicLayout><div className="container mx-auto py-16 text-center">Privacy Policy</div></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><div className="container mx-auto py-16 text-center">Terms of Service</div></PublicLayout>} />


          {/* Protected Routes for Participants */}
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['participant']} />}>
            <Route index element={<UserDashboardPage />} />
            {/* Nested routes for participant dashboard */}
            <Route path="my-events" element={<UserDashboardPage />} /> {/* Example nested route */}
            <Route path="resources" element={<UserDashboardPage />} /> {/* Example nested route */}
            <Route path="profile" element={<UserDashboardPage />} /> {/* Example nested route */}
          </Route>

          {/* Protected Routes for Tenant Admin */}
          <Route path="/tenant-admin" element={<ProtectedRoute allowedRoles={['tenant-admin']} />}>
            <Route index element={<Navigate to="/tenant-admin/dashboard" replace />} />
            <Route path="dashboard" element={<TenantAdminDashboardPage />} />
            <Route path="team" element={<TenantAdminDashboardPage />} />
            <Route path="experiences" element={<TenantAdminDashboardPage />} />
            <Route path="bookings" element={<TenantAdminDashboardPage />} />
            <Route path="groups" element={<TenantAdminDashboardPage />} />
            <Route path="sessions" element={<TenantAdminDashboardPage />} />
            <Route path="reports" element={<TenantAdminDashboardPage />} />
          </Route>

          {/* Protected Routes for Platform Admin */}
          <Route path="/platform-admin" element={<ProtectedRoute allowedRoles={['platform-admin']} />}>
            <Route index element={<Navigate to="/platform-admin/dashboard" replace />} />
            <Route path="dashboard" element={<PlatformAdminDashboardPage />} />
            {/* Nested routes for platform admin */}
            <Route path="tenants" element={<PlatformAdminDashboardPage />} />
            <Route path="experiences" element={<PlatformAdminDashboardPage />} />
            <Route path="users" element={<PlatformAdminDashboardPage />} />
            <Route path="billing" element={<PlatformAdminDashboardPage />} />
          </Route>

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<PublicLayout><div className="container mx-auto py-16 text-center text-red-600">You are not authorized to view this page.</div></PublicLayout>} />

          {/* 404 Not Found Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;