// src/layouts/DashboardLayout.tsx
import React from 'react';
import AuthenticatedHeader from './AuthenticatedHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
  // This could be made more dynamic based on user role for sidebar content
  sidebarContent?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, sidebarContent }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthenticatedHeader />
      <div className="flex flex-grow">
        {/* Sidebar */}
        {sidebarContent && (
          <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
            {sidebarContent}
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-grow p-4 bg-gray-100">
          {children}
        </main>
      </div>
      {/* Footer can be added here if needed for dashboards */}
    </div>
  );
};

export default DashboardLayout;
