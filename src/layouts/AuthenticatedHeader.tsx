// src/layouts/AuthenticatedHeader.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { twMerge } from 'tailwind-merge'; // Import twMerge
import { useAuth } from '../store/AuthContext';
import { UserCircleIcon } from '@heroicons/react/24/outline';

// Define the interface for user menu items
interface UserMenuItem {
  key: string;
  label: string;
  onSelect: () => void;
  icon?: React.ReactNode;
  withDivider?: boolean; // Add optional withDivider property
}

const AuthenticatedHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Add state for dropdown

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  const userMenuItems: UserMenuItem[] = [ // Use the new interface
    { key: 'profile', label: 'My Profile', onSelect: () => navigate('/dashboard/profile') },
    { key: 'settings', label: 'Settings', onSelect: () => navigate('/dashboard/settings') },
    { key: 'logout', label: 'Logout', onSelect: handleLogout, withDivider: true },
  ];

  let dashboardPath = '/dashboard';
  if (user?.role === 'participant') {
    dashboardPath = '/dashboard';
  } else if (user?.role === 'tenant-admin') {
    dashboardPath = '/tenant-admin/dashboard';
  } else if (user?.role === 'platform-admin') {
    dashboardPath = '/platform-admin/dashboard';
  }

  return (
    <header className="bg-green-700 text-white shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Dashboard Link */}
        <Link to={dashboardPath} className="text-2xl font-bold">
          SWISH Dashboard
        </Link>

        {/* User Menu */}
        <div className="flex items-center space-x-2">
          <DropdownMenuPrimitive.Root open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuPrimitive.Trigger asChild>
              <button
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors"
                aria-label="User menu"
              >
                <UserCircleIcon className="h-8 w-8 text-white" />
                <span className="hidden md:inline-block text-lg font-medium">{user?.name || 'Profile'}</span>
              </button>
            </DropdownMenuPrimitive.Trigger>

            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                className={twMerge(
                  'block min-w-[200px] rounded-md bg-white p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] z-50'
                )}
                sideOffset={5}
              >
                {userMenuItems.map((item) => {
                  const itemClassName = twMerge(
                    "group relative flex h-[25px] select-none items-center rounded-[3px] px-[10px] pl-4 text-sm font-medium text-gray-700 outline-none",
                    "data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[highlighted]:text-white data-[disabled]:text-gray-400",
                    (item.label === 'Dashboard' || item.label === 'Logout') ? 'font-bold' : ''
                  );
                  return (
                    <React.Fragment key={item.key}>
                      <DropdownMenuPrimitive.Item
                        className={itemClassName}
                        onSelect={item.onSelect}
                      >
                        {item.label}
                      </DropdownMenuPrimitive.Item>
                      {item.withDivider && <DropdownMenuPrimitive.Separator className="h-[1px] bg-gray-200 m-[5px]" />}
                    </React.Fragment>
                  );
                })}
                <DropdownMenuPrimitive.Arrow className="fill-white" />
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
        </div>
      </nav>
    </header>
  );
};

export default AuthenticatedHeader;