// src/components/feature/UserEditorDialog.tsx
import React, { useState, useEffect } from 'react';
import Dialog from '../ui/Dialog';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface UserEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User; // Optional: for editing an existing user
  onSave: (userData: User) => void;
  allTenants: Organization[]; // For assigning user to a tenant
}

const emptyUser: User = {
  id: '',
  name: '',
  email: '',
  role: 'participant',
  status: 'active',
  organizationId: undefined,
};

const UserEditorDialog: React.FC<UserEditorDialogProps> = ({ open, onOpenChange, user, onSave, allTenants }) => {
  const [formData, setFormData] = useState<User>(user || emptyUser);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(user || emptyUser);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'User name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
    onOpenChange(false); // Close dialog on save
  };

  const userRoles: User['role'][] = ['participant', 'tenant-admin', 'platform-admin'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={user ? "Edit User" : "Create New User"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isSaving}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isSaving}
        />
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            disabled={isSaving}
          >
            {userRoles.map((role) => (
              <option key={role} value={role}>{role.replace('-', ' ')}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            disabled={isSaving}
          >
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div>
          <label htmlFor="organizationId" className="block text-sm font-medium text-gray-700 mb-1">Assign to Tenant (Optional)</label>
          <select
            id="organizationId"
            name="organizationId"
            value={formData.organizationId || ''}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            disabled={isSaving}
          >
            <option value="">None</option>
            {allTenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save User'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default UserEditorDialog;
