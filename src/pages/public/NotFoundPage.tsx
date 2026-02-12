// src/pages/public/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';
import Button from '../../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.20)-theme(spacing.20))] text-center px-4">
        <h1 className="text-9xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-8">Page Not Found</p>
        <p className="text-lg text-gray-500 mb-12">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg">Go to Homepage</Button>
        </Link>
      </div>
    </PublicLayout>
  );
};

export default NotFoundPage;
