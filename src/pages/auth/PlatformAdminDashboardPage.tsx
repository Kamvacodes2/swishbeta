// src/pages/auth/PlatformAdminDashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../store/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import TenantTable from '../../components/feature/TenantTable';
import GlobalExperienceEditor from '../../components/feature/GlobalExperienceEditor';
import Spinner from '../../components/ui/Spinner';
import TenantEditorDialog from '../../components/feature/TenantEditorDialog';
import Input from '../../components/ui/Input';
import UserTable from '../../components/feature/UserTable';
import UserEditorDialog from '../../components/feature/UserEditorDialog';
import Switch from '../../components/ui/Switch';
import { api } from '../../services/api';

const PlatformAdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  const isDashboard = pathname.endsWith('/dashboard') || pathname === '/platform-admin';
  const isTenants = pathname.includes('/tenants');
  const isExperiences = pathname.includes('/experiences');
  const isUsers = pathname.includes('/users');
  const isBilling = pathname.includes('/billing');

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-1.5 px-2 rounded ${isActive ? 'bg-green-600 text-white' : 'text-green-300 hover:text-white hover:bg-gray-700'}`;

  const [tenants, setTenants] = useState<Organization[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  const [loadingTenants, setLoadingTenants] = useState(true);
  const [loadingExperiences, setLoadingExperiences] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingActivityLogs, setLoadingActivityLogs] = useState(true);

  const [isExperienceEditorOpen, setIsExperienceEditorOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | undefined>(undefined);

  const [isTenantEditorOpen, setIsTenantEditorOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Organization | undefined>(undefined);
  const [tenantSearchTerm, setTenantSearchTerm] = useState('');

  const [isUserEditorOpen, setIsUserEditorOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // System Settings state
  const [featureFlagA, setFeatureFlagA] = useState(true);
  const [featureFlagB, setFeatureFlagB] = useState(false);
  const [logoUrl, setLogoUrl] = useState('/path/to/logo.png');
  const [primaryColor, setPrimaryColor] = useState('#4CAF50');
  const [emailTemplate, setEmailTemplate] = useState('Hello {{name}}, ...');

  const [logFilterUser, setLogFilterUser] = useState('');
  const [logFilterAction, setLogFilterAction] = useState('');
  const [logFilterDateFrom, setLogFilterDateFrom] = useState('');
  const [logFilterDateTo, setLogFilterDateTo] = useState('');

  // Fetch mock data
  useEffect(() => {
    const fetchAllData = async () => {
      setLoadingTenants(true);
      setLoadingExperiences(true);
      setLoadingUsers(true);
      setLoadingActivityLogs(true);
      const [fetchedTenants, fetchedExperiences, fetchedUsers, fetchedActivityLogs] = await Promise.all([
        api.organizations.getAll(),
        api.experiences.getAll(),
        api.users.getAll(),
        api.activityLogs.getAll(),
      ]);
      setTenants(fetchedTenants);
      setExperiences(fetchedExperiences);
      setUsers(fetchedUsers);
      setActivityLogs(fetchedActivityLogs);
      setLoadingTenants(false);
      setLoadingExperiences(false);
      setLoadingUsers(false);
      setLoadingActivityLogs(false);
    };
    fetchAllData();
  }, []);

  const handleCreateTenant = () => {
    setEditingTenant(undefined);
    setIsTenantEditorOpen(true);
  };

  const handleEditTenant = (tenantId: string) => {
    const tenantToEdit = tenants.find(t => t.id === tenantId);
    if (tenantToEdit) {
      setEditingTenant(tenantToEdit);
      setIsTenantEditorOpen(true);
    }
  };

  const handleToggleTenantStatus = async (tenantId: string) => {
    const tenantToToggle = tenants.find(t => t.id === tenantId);
    if (tenantToToggle) {
      const newStatus = tenantToToggle.status === 'active' ? 'suspended' : 'active';
      const updatedTenant = await api.organizations.update(tenantId, { status: newStatus });
      if (updatedTenant) {
        setTenants((prev) => prev.map(t => t.id === tenantId ? updatedTenant : t));
        alert(`Tenant ${updatedTenant.name} status updated to ${newStatus}.`);
      }
    }
  };

  const handleDeleteTenant = async (tenantId: string) => {
    if (confirm(`Are you sure you want to delete tenant ${tenantId}? This action cannot be undone.`)) {
      const success = await api.organizations.remove(tenantId);
      if (success) {
        setTenants((prev) => prev.filter(t => t.id !== tenantId));
        alert(`Tenant ${tenantId} deleted.`);
      } else {
        alert(`Failed to delete tenant ${tenantId}.`);
      }
    }
  };

  const handleSaveTenant = async (tenantData: Organization) => {
    if (tenantData.id) {
      const updatedTenant = await api.organizations.update(tenantData.id, tenantData);
      if (updatedTenant) {
        setTenants((prev) => prev.map(t => t.id === updatedTenant.id ? updatedTenant : t));
        alert(`Tenant ${updatedTenant.name} updated.`);
      }
    } else {
      const newTenant = await api.organizations.create(tenantData.name);
      setTenants((prev) => [...prev, newTenant]);
      alert(`Tenant ${newTenant.name} created.`);
    }
    setIsTenantEditorOpen(false);
    setEditingTenant(undefined);
  };

  const handleImpersonateTenant = (tenantId: string) => {
    alert(`Impersonating tenant with ID: ${tenantId} (mock)`);
  };

  // User Management Handlers
  const handleCreateUser = () => {
    setEditingUser(undefined);
    setIsUserEditorOpen(true);
  };

  const handleEditUser = (userId: string) => {
    const userToEdit = users.find(u => u.id === userId);
    if (userToEdit) {
      setEditingUser(userToEdit);
      setIsUserEditorOpen(true);
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    const userToToggle = users.find(u => u.id === userId);
    if (userToToggle) {
      const newStatus = userToToggle.status === 'active' ? 'suspended' : 'active';
      const updatedUser = await api.users.update(userId, { status: newStatus });
      if (updatedUser) {
        setUsers((prev) => prev.map(u => u.id === userId ? updatedUser : u));
        alert(`User ${updatedUser.name} status updated to ${newStatus}.`);
      }
    }
  };

  const handleChangeUserRole = async (userId: string, newRole: User['role']) => {
    const userToUpdate = users.find(u => u.id === userId);
    if (userToUpdate) {
      const updatedUser = await api.users.update(userId, { role: newRole });
      if (updatedUser) {
        setUsers((prev) => prev.map(u => u.id === userId ? updatedUser : u));
        alert(`User ${updatedUser.name} role changed to ${newRole}.`);
      }
    }
  };

  const handleAssignUserToTenant = async (userId: string) => {
    alert(`Assign user ${userId} to tenant (mock - would open a tenant selection modal)`);
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm(`Are you sure you want to delete user ${userId}? This action cannot be undone.`)) {
      const success = await api.users.remove(userId);
      if (success) {
        setUsers((prev) => prev.filter(u => u.id !== userId));
        alert(`User ${userId} deleted.`);
      } else {
        alert(`Failed to delete user ${userId}.`);
      }
    }
  };

  const handleSaveUser = async (userData: User) => {
    if (userData.id) {
      const updatedUser = await api.users.update(userData.id, userData);
      if (updatedUser) {
        setUsers((prev) => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        alert(`User ${updatedUser.name} updated.`);
      }
    } else {
      const newUser = await api.users.create(userData);
      setUsers((prev) => [...prev, newUser]);
      alert(`User ${newUser.name} created.`);
    }
    setIsUserEditorOpen(false);
    setEditingUser(undefined);
  };

  // Experience Management Handlers
  const handleCreateExperience = () => {
    setEditingExperience(undefined);
    setIsExperienceEditorOpen(true);
  };

  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience);
    setIsExperienceEditorOpen(true);
  };

  const handleSaveExperience = async (experienceData: Experience) => {
    const savedExperience = await api.experiences.save(experienceData);
    if (experienceData.id) {
      setExperiences((prev) => prev.map(exp => exp.id === savedExperience.id ? savedExperience : exp));
    } else {
      setExperiences((prev) => [...prev, savedExperience]);
    }
    setIsExperienceEditorOpen(false);
    setEditingExperience(undefined);
  };

  const handleCancelExperienceEditor = () => {
    setIsExperienceEditorOpen(false);
    setEditingExperience(undefined);
  };

  const handleDeleteExperience = async (expId: string) => {
    if (!confirm('Are you sure you want to delete this experience? This cannot be undone.')) return;
    const ok = await api.experiences.remove(expId);
    if (ok) setExperiences((prev) => prev.filter((e) => e.id !== expId));
  };

  const filteredActivityLogs = activityLogs.filter((log) => {
    if (logFilterUser && !log.userName.toLowerCase().includes(logFilterUser.toLowerCase())) return false;
    if (logFilterAction && !log.action.toLowerCase().includes(logFilterAction.toLowerCase())) return false;
    if (logFilterDateFrom && new Date(log.timestamp) < new Date(logFilterDateFrom)) return false;
    if (logFilterDateTo && new Date(log.timestamp) > new Date(logFilterDateTo + 'T23:59:59')) return false;
    return true;
  });

  // Filtered tenants for display
  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(tenantSearchTerm.toLowerCase())
  );

  // Filtered users for display
  const filteredUsers = users.filter(userItem =>
    userItem.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    userItem.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  // Sidebar content for Platform Admin
  const sidebarContent = (
    <nav className="space-y-1">
      <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 px-2">Platform Admin Menu</h3>
      <NavLink to="/platform-admin/dashboard" end className={navLinkClass}>Dashboard Overview</NavLink>
      <NavLink to="/platform-admin/tenants" className={navLinkClass}>Tenant Management</NavLink>
      <NavLink to="/platform-admin/experiences" className={navLinkClass}>Experience Management</NavLink>
      <NavLink to="/platform-admin/users" className={navLinkClass}>User Management</NavLink>
      <NavLink to="/platform-admin/billing" className={navLinkClass}>Billing & Plans</NavLink>
    </nav>
  );

  return (
    <DashboardLayout sidebarContent={sidebarContent}>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isDashboard && 'Dashboard Overview'}
        {isTenants && 'Tenant Management'}
        {isExperiences && 'Experience Management'}
        {isUsers && 'User Management'}
        {isBilling && 'Billing & Plans'}
        {!isDashboard && !isTenants && !isExperiences && !isUsers && !isBilling && `Welcome, ${user?.name || 'Platform Admin'}!`}
      </h1>

      {/* Dashboard Overview */}
      {isDashboard && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="text-center">
              <p className="text-5xl font-bold text-green-600 mb-2">
                {loadingTenants ? <Spinner size="sm" /> : tenants.length}
              </p>
              <p className="text-gray-600">Total Tenants</p>
            </Card>
            <Card className="text-center">
              <p className="text-5xl font-bold text-blue-600 mb-2">
                {loadingUsers ? <Spinner size="sm" /> : users.length}
              </p>
              <p className="text-gray-600">Total Users</p>
            </Card>
            <Card className="text-center">
              <p className="text-5xl font-bold text-purple-600 mb-2">
                {loadingExperiences ? <Spinner size="sm" /> : experiences.length}
              </p>
              <p className="text-gray-600">Total Experiences</p>
            </Card>
            <Card className="text-center">
              <p className="text-5xl font-bold text-red-600 mb-2">R22M</p>
              <p className="text-gray-600">Revenue Snapshot</p>
            </Card>
          </div>
          <Card className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Audit Logs</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Input placeholder="Filter by user..." value={logFilterUser} onChange={(e) => setLogFilterUser(e.target.value)} className="mb-0" />
              <Input placeholder="Filter by action..." value={logFilterAction} onChange={(e) => setLogFilterAction(e.target.value)} className="mb-0" />
              <Input type="date" placeholder="From date" value={logFilterDateFrom} onChange={(e) => setLogFilterDateFrom(e.target.value)} className="mb-0" />
              <Input type="date" placeholder="To date" value={logFilterDateTo} onChange={(e) => setLogFilterDateTo(e.target.value)} className="mb-0" />
            </div>
            {loadingActivityLogs ? (
              <div className="flex justify-center items-center h-24"><Spinner size="lg" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredActivityLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(log.timestamp).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.userName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
          <Card className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">System Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium text-gray-700 mb-3">Feature Flags</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="feature-a" className="font-medium text-gray-700">Enable New Experience Library</label>
                    <Switch id="feature-a" checked={featureFlagA} onCheckedChange={setFeatureFlagA} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="feature-b" className="font-medium text-gray-700">Enable Beta Analytics</label>
                    <Switch id="feature-b" checked={featureFlagB} onCheckedChange={setFeatureFlagB} />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-700 mb-3">Branding</h4>
                <div className="space-y-4">
                  <Input label="Logo URL" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
                  <Input label="Primary Color" type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-10" />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-medium text-gray-700 mb-3">Email Template Preview</h4>
              <textarea
                value={emailTemplate}
                onChange={(e) => setEmailTemplate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => alert('System settings saved (mock).')}>Save Settings</Button>
            </div>
          </Card>
          <p className="text-gray-600">Welcome, {user?.name || 'Platform Admin'}. Use the menu to manage tenants, users, experiences, and billing.</p>
        </>
      )}

      {/* Tenant Management */}
      {isTenants && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Tenants</h2>
            <Button onClick={handleCreateTenant}>Create New Tenant</Button>
          </div>
          <Input
            type="text"
            placeholder="Search tenants..."
            value={tenantSearchTerm}
            onChange={(e) => setTenantSearchTerm(e.target.value)}
            className="mb-4"
          />
          {loadingTenants ? (
            <div className="flex justify-center items-center h-48"><Spinner size="lg" /></div>
          ) : (
            <TenantTable
              tenants={filteredTenants}
              onEdit={handleEditTenant}
              onToggleStatus={handleToggleTenantStatus}
              onDelete={handleDeleteTenant}
              onImpersonate={handleImpersonateTenant}
              onCreate={handleCreateTenant}
            />
          )}
        </div>
      )}

      {/* User Management */}
      {isUsers && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Users</h2>
            <Button onClick={handleCreateUser}>Create New User</Button>
          </div>
          <Input
            type="text"
            placeholder="Search users..."
            value={userSearchTerm}
            onChange={(e) => setUserSearchTerm(e.target.value)}
            className="mb-4"
          />
          {loadingUsers ? (
            <div className="flex justify-center items-center h-48"><Spinner size="lg" /></div>
          ) : (
            <UserTable
              users={filteredUsers}
              onEdit={handleEditUser}
              onToggleStatus={handleToggleUserStatus}
              onChangeRole={handleChangeUserRole}
              onAssignTenant={handleAssignUserToTenant}
              onDelete={handleDeleteUser}
            />
          )}
        </div>
      )}

      {/* Experience Management */}
      {isExperiences && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Experiences</h2>
            <Button onClick={handleCreateExperience}>Create New Experience</Button>
          </div>
          {loadingExperiences ? (
            <div className="flex justify-center items-center h-48"><Spinner size="lg" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Size</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {experiences.map((exp) => (
                    <tr key={exp.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exp.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exp.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exp.groupSize}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm" onClick={() => handleEditExperience(exp)} className="text-green-600 hover:text-green-900 mr-2">Edit</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteExperience(exp.id)} className="text-red-600 hover:text-red-900">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Billing & Plans */}
      {isBilling && (
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Billing & Plans</h2>
          <p className="text-gray-600 mb-4">Manage platform billing and subscription plans.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Current plan</h3>
              <p className="text-2xl font-bold text-green-600 mb-2">R22M revenue (snapshot)</p>
              <p className="text-sm text-gray-500">Platform-wide revenue overview</p>
            </Card>
            <Card className="p-6 border-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tenant billing</h3>
              <p className="text-gray-600 text-sm">View and manage per-tenant billing (mock).</p>
            </Card>
          </div>
        </Card>
      )}

      {/* Experience Editor Dialog */}
      {isExperienceEditorOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <GlobalExperienceEditor
              experience={editingExperience}
              onSave={handleSaveExperience}
              onCancel={handleCancelExperienceEditor}
            />
          </div>
        </div>
      )}

      {/* Tenant Editor Dialog */}
      {isTenantEditorOpen && (
        <TenantEditorDialog
          open={isTenantEditorOpen}
          onOpenChange={setIsTenantEditorOpen}
          tenant={editingTenant}
          onSave={handleSaveTenant}
        />
      )}

      {/* User Editor Dialog */}
      {isUserEditorOpen && (
        <UserEditorDialog
          open={isUserEditorOpen}
          onOpenChange={setIsUserEditorOpen}
          user={editingUser}
          onSave={handleSaveUser}
          allTenants={tenants} // Pass tenants for assignment dropdown
        />
      )}
    </DashboardLayout>
  );
};

export default PlatformAdminDashboardPage;