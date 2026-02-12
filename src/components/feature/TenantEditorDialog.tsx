// src/components/feature/TenantEditorDialog.tsx
import React, { useState, useEffect } from 'react';
import Dialog from '../ui/Dialog';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface TenantEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenant?: Organization; // Optional: for editing an existing tenant
  onSave: (tenantData: Organization) => void;
}

const emptyTenant: Organization = {
  id: '',
  name: '',
  status: 'active',
};

const TenantEditorDialog: React.FC<TenantEditorDialogProps> = ({ open, onOpenChange, tenant, onSave }) => {
  const [formData, setFormData] = useState<Organization>(tenant || emptyTenant);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(tenant || emptyTenant);
  }, [tenant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Tenant name is required';
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={tenant ? "Edit Tenant" : "Create New Tenant"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Tenant Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isSaving}
        />
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
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Tenant'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default TenantEditorDialog;