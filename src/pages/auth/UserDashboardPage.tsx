// src/pages/auth/UserDashboardPage.tsx
import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import UserDashboardWidgets from '../../components/feature/UserDashboardWidgets';
import { useAuth } from '../../store/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const UserDashboardPage: React.FC = () => {
  const { user, login } = useAuth();
  const location = useLocation();
  const isMyEvents = location.pathname.includes('my-events');
  const isProfile = location.pathname.includes('profile');

  const [profileName, setProfileName] = useState(user?.name ?? '');
  const [profileEmail, setProfileEmail] = useState(user?.email ?? '');
  const [profileSaved, setProfileSaved] = useState(false);

  // Mock data for widgets and My Events - in a real app, this would be fetched from API
  const upcomingEvents: EventItem[] = [
    { id: 'evt-1', name: 'Team Alignment Workshop', date: '2026-03-20', time: '10:00 AM', location: 'Online' },
    { id: 'evt-2', name: 'Innovation Challenge Kick-off', date: '2026-04-05', time: '09:00 AM', location: 'Office' },
  ];

  const assignedActivities: ActivityItem[] = [
    { id: 'act-1', name: 'Pre-workshop Survey', status: 'pending' },
    { id: 'act-2', name: 'Team Charter Creation', status: 'in-progress' },
  ];

  const allMyEvents: EventItem[] = [
    ...upcomingEvents,
    { id: 'evt-3', name: 'Leadership Simulation', date: '2026-02-28', time: '2:00 PM', location: 'HQ' },
  ];

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      login({ ...user, name: profileName, email: profileEmail });
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    }
  };

  const sidebarContent = (
    <nav className="space-y-2">
      <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Participant Menu</h3>
      <Link to="/dashboard" className="block text-green-300 hover:text-white">Dashboard Overview</Link>
      <Link to="/dashboard/my-events" className="block text-green-300 hover:text-white">My Events</Link>
      <Link to="/dashboard/resources" className="block text-green-300 hover:text-white">Resources</Link>
      <Link to="/dashboard/profile" className="block text-green-300 hover:text-white">Profile Settings</Link>
    </nav>
  );

  if (isMyEvents) {
    return (
      <DashboardLayout sidebarContent={sidebarContent}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Events</h1>
        <p className="text-gray-600 mb-6">All events and sessions you are registered for.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allMyEvents.map((evt) => (
            <Card key={evt.id} className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{evt.name}</h3>
              <p className="text-gray-600 text-sm"><span className="font-medium">Date:</span> {evt.date} at {evt.time}</p>
              <p className="text-gray-600 text-sm"><span className="font-medium">Location:</span> {evt.location}</p>
            </Card>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  if (isProfile) {
    return (
      <DashboardLayout sidebarContent={sidebarContent}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile Settings</h1>
        <p className="text-gray-600 mb-6">Update your profile information.</p>
        <Card className="p-6 max-w-md">
          {profileSaved && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-sm">Profile updated successfully.</div>
          )}
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <Input label="Name" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
            <Input label="Email" type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />
            <Button type="submit">Save changes</Button>
          </form>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebarContent={sidebarContent}>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {user?.name || 'Participant'}!</h1>
      <UserDashboardWidgets
        upcomingEvents={upcomingEvents}
        assignedActivities={assignedActivities}
      />
    </DashboardLayout>
  );
};

export default UserDashboardPage;
