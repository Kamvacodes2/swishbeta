// src/layouts/PublicLayout.tsx
import React from 'react';
import PublicHeader from './PublicHeader';
import Footer from './Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
