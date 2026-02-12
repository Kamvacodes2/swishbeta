// src/components/feature/TenantTable.tsx
import React from 'react';
import Button from '../ui/Button';

interface TenantTableProps {
  tenants: Organization[];
  onEdit: (tenantId: string) => void;
  onToggleStatus: (tenantId: string) => void; // New prop for toggling active/suspended
  onImpersonate: (tenantId: string) => void;
  onCreate: () => void;
  onDelete: (tenantId: string) => void; // New prop for deleting
}

const TenantTable: React.FC<TenantTableProps> = ({ tenants, onEdit, onToggleStatus, onImpersonate, onCreate, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Tenants</h3>
        <Button onClick={onCreate}>Create New Tenant</Button>
      </div>

      {tenants.length === 0 ? (
        <p className="text-gray-500">No tenants found. Click "Create New Tenant" to add one.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tenants.map((tenant) => (
                <tr key={tenant.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {tenant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {tenant.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(tenant.id)} className="text-green-600 hover:text-green-900 mr-2">Edit</Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleStatus(tenant.id)}
                      className={`${tenant.status === 'active' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'} mr-2`}
                    >
                      {tenant.status === 'active' ? 'Suspend' : 'Activate'}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onImpersonate(tenant.id)} className="text-blue-600 hover:text-blue-900 mr-2">Impersonate</Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(tenant.id)} className="text-red-600 hover:text-red-900">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TenantTable;
