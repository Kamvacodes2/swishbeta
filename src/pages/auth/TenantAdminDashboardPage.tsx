// src/pages/auth/TenantAdminDashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../store/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import UserTable from '../../components/feature/UserTable';
import UserEditorDialog from '../../components/feature/UserEditorDialog';
import GlobalExperienceEditor from '../../components/feature/GlobalExperienceEditor';
import BookingTable from '../../components/feature/BookingTable';
import Switch from '../../components/ui/Switch';
import { api } from '../../services/api';

const TenantAdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  const isDashboard = pathname.endsWith('/dashboard') || pathname === '/tenant-admin';
  const isTeam = pathname.includes('/team');
  const isExperiences = pathname.includes('/experiences');
  const isBookings = pathname.includes('/bookings');

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-1.5 px-2 rounded ${isActive ? 'bg-green-600 text-white' : 'text-green-300 hover:text-white hover:bg-gray-700'}`;
  
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const [isUserEditorOpen, setIsUserEditorOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [isExperienceEditorOpen, setIsExperienceEditorOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | undefined>(undefined);
  const [bookings, setBookings] = useState<Array<{ id: string; experienceName: string; date: string; time: string; status: 'confirmed' | 'pending' | 'cancelled' | 'completed'; groupName: string }>>([
    { id: 'book-1', experienceName: 'Collaborative Problem Solving', date: '2026-03-15', time: '10:00 AM', status: 'confirmed', groupName: 'Marketing Team' },
    { id: 'book-2', experienceName: 'Virtual Escape Room', date: '2026-04-01', time: '2:00 PM', status: 'pending', groupName: 'Youth Group' },
    { id: 'book-3', experienceName: 'Mindfulness & Wellbeing Workshop', date: '2026-04-10', time: '11:00 AM', status: 'confirmed', groupName: 'Marketing Team' },
  ]);

  // Use org from user, or fallback for tenant-admin so dashboard always has data
  const organizationId = user?.organizationId || (user?.role === 'tenant-admin' ? 'org-1' : '');

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const [fetchedUsers, fetchedExperiences] = await Promise.all([
        organizationId ? api.users.getByOrganizationId(organizationId) : Promise.resolve([]),
        api.experiences.getAll(),
      ]);
      setTeamMembers(fetchedUsers);
      setExperiences(fetchedExperiences);
      setLoading(false);
    };
    fetchAllData();
  }, [organizationId]);

  // User Management
  const handleCreateUser = () => {
    setEditingUser(undefined);
    setIsUserEditorOpen(true);
  };
  const handleEditUser = (userId: string) => {
    setEditingUser(teamMembers.find(u => u.id === userId));
    setIsUserEditorOpen(true);
  };
  const handleToggleUserStatus = async (userId: string) => {
    const userToToggle = teamMembers.find(u => u.id === userId);
    if (userToToggle) {
      const newStatus = userToToggle.status === 'active' ? 'suspended' : 'active';
      const updatedUser = await api.users.update(userId, { status: newStatus });
      if (updatedUser) {
        setTeamMembers(prev => prev.map(u => u.id === userId ? updatedUser : u));
        alert(`User status updated.`);
      }
    }
  };
  const handleChangeUserRole = async (userId: string, newRole: User['role']) => {
    const updatedUser = await api.users.update(userId, { role: newRole });
    if (updatedUser) {
      setTeamMembers(prev => prev.map(u => u.id === userId ? updatedUser : u));
      alert(`User role updated.`);
    }
  };
  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure?')) {
      await api.users.remove(userId);
      setTeamMembers(prev => prev.filter(u => u.id !== userId));
      alert('User deleted.');
    }
  };
  const handleSaveUser = async (userData: User) => {
    if (userData.id) {
      const updatedUser = await api.users.update(userData.id, {...userData, organizationId});
      if (updatedUser) {
        setTeamMembers(prev => prev.map(u => u.id === userData.id ? updatedUser : u));
      }
    } else {
      const newUser = await api.users.create({...userData, organizationId});
      setTeamMembers(prev => [...prev, newUser]);
    }
    setIsUserEditorOpen(false);
  };

  // Experience Management
  const handleCreateExperience = () => {
    setEditingExperience(undefined);
    setIsExperienceEditorOpen(true);
  };
  const handleEditExperience = (exp: Experience) => {
    setEditingExperience(exp);
    setIsExperienceEditorOpen(true);
  };
  const handleSaveExperience = async (expData: Experience) => {
    const saved = await api.experiences.save(expData);
    setExperiences((prev) => {
      const idx = prev.findIndex((e) => e.id === saved.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = saved;
        return next;
      }
      return [...prev, saved];
    });
    setIsExperienceEditorOpen(false);
    setEditingExperience(undefined);
  };

  const handleToggleExperiencePublished = async (exp: Experience) => {
    const updated = await api.experiences.save({ ...exp, published: !exp.published });
    setExperiences((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const handleDeleteExperience = async (expId: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    const ok = await api.experiences.remove(expId);
    if (ok) setExperiences((prev) => prev.filter((e) => e.id !== expId));
  };

  const handleBookingStatusChange = (bookingId: string, newStatus: 'confirmed' | 'pending' | 'cancelled' | 'completed') => {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)));
  };

  const handleBookingCancel = (bookingId: string) => {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b)));
  };

  const sidebarContent = (
    <nav className="space-y-1">
      <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 px-2">Tenant Admin Menu</h3>
      <NavLink to="/tenant-admin/dashboard" end className={navLinkClass}>Dashboard Overview</NavLink>
      <NavLink to="/tenant-admin/team" className={navLinkClass}>Team Management</NavLink>
      <NavLink to="/tenant-admin/experiences" className={navLinkClass}>Experience Management</NavLink>
      <NavLink to="/tenant-admin/bookings" className={navLinkClass}>Booking Management</NavLink>
    </nav>
  );

  if (loading) {
    return (
      <DashboardLayout sidebarContent={sidebarContent}>
        <div className="flex justify-center items-center h-full"><Spinner size="lg" /></div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebarContent={sidebarContent}>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isDashboard && 'Dashboard Overview'}
        {isTeam && 'Team Management'}
        {isExperiences && 'Experience Management'}
        {isBookings && 'Booking Management'}
        {!isDashboard && !isTeam && !isExperiences && !isBookings && `Welcome, ${user?.name || 'Tenant Admin'}!`}
      </h1>

      {/* Dashboard Overview */}
      {isDashboard && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="text-center">
              <p className="text-5xl font-bold text-green-600 mb-2">{teamMembers.length}</p>
              <p className="text-gray-600">Total Team Members</p>
            </Card>
            <Card className="text-center">
              <p className="text-5xl font-bold text-blue-600 mb-2">{experiences.length}</p>
              <p className="text-gray-600">Active Experiences</p>
            </Card>
            <Card className="text-center">
              <p className="text-5xl font-bold text-purple-600 mb-2">{bookings.filter(b => b.status !== 'cancelled').length}</p>
              <p className="text-gray-600">Upcoming Bookings</p>
            </Card>
            <Card className="text-center">
              <p className="text-5xl font-bold text-red-600 mb-2">3</p>
              <p className="text-gray-600">Recent Activities</p>
            </Card>
          </div>
          <p className="text-gray-600">Welcome, {user?.name || 'Tenant Admin'}. Use the menu to manage your team, experiences, and bookings.</p>
        </>
      )}

      {/* Team Management */}
      {isTeam && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
            <Button onClick={handleCreateUser}>Add Team Member</Button>
          </div>
          <UserTable
            users={teamMembers}
            onEdit={handleEditUser}
            onToggleStatus={handleToggleUserStatus}
            onChangeRole={handleChangeUserRole}
            onDelete={handleDeleteUser}
            onAssignTenant={() => {}}
          />
        </div>
      )}

      {/* Experience Management */}
      {isExperiences && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Experiences</h2>
            <Button onClick={handleCreateExperience}>Create New Experience</Button>
          </div>
          <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Size</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {experiences.map((exp) => (
                  <tr key={exp.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exp.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exp.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exp.groupSize}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Switch checked={!!exp.published} onCheckedChange={() => handleToggleExperiencePublished(exp)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditExperience(exp)} className="text-green-600 hover:text-green-900">Edit</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteExperience(exp.id)} className="text-red-600 hover:text-red-900">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Booking Management */}
      {isBookings && (
        <div className="mb-8">
          <BookingTable
            bookings={bookings}
            onChangeStatus={handleBookingStatusChange}
            onCancel={handleBookingCancel}
          />
        </div>
      )}

      {isUserEditorOpen && (
        <UserEditorDialog
          open={isUserEditorOpen}
          onOpenChange={setIsUserEditorOpen}
          user={editingUser}
          onSave={handleSaveUser}
          allTenants={[]} // Not needed for tenant admin
        />
      )}

      {isExperienceEditorOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <GlobalExperienceEditor
              experience={editingExperience}
              onSave={handleSaveExperience}
              onCancel={() => setIsExperienceEditorOpen(false)}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TenantAdminDashboardPage;