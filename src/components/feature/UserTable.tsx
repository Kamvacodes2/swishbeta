// src/components/feature/UserTable.tsx
import React from 'react';
import Button from '../ui/Button';
import DropdownMenu from '../ui/DropdownMenu';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

interface UserTableProps {
  users: User[];
  onEdit: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  onChangeRole: (userId: string, newRole: User['role']) => void;
  onAssignTenant: (userId: string) => void;
  onDelete: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onToggleStatus,
  onChangeRole,
  onAssignTenant,
  onDelete,
}) => {
  const userRoles: User['role'][] = ['participant', 'tenant-admin', 'platform-admin'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Global Users</h3>
        {/* Placeholder for 'Add User' button, if needed */}
        {/* <Button onClick={() => alert('Add User functionality')}>Add User</Button> */}
      </div>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((userItem) => (
                <tr key={userItem.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {userItem.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {userItem.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {userItem.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {userItem.status || 'active'} {/* Default to active if not set */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {userItem.organizationId || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu
                      trigger={
                        <Button variant="ghost" size="sm" className="p-1">
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </Button>
                      }
                      items={[
                        { key: 'edit', label: 'Edit User', onSelect: () => onEdit(userItem.id) },
                        {
                          key: 'toggleStatus',
                          label: userItem.status === 'active' ? 'Disable Account' : 'Enable Account',
                          onSelect: () => onToggleStatus(userItem.id),
                          withDivider: true,
                        },
                        {
                          key: 'changeRole',
                          label: 'Change Role',
                          onSelect: () => alert('Change Role clicked - needs sub-menu or modal'), // Placeholder
                        },
                        ...userRoles.map(role => ({
                            key: `role-${role}`,
                            label: ` - ${role.replace('-', ' ')}`,
                            onSelect: () => onChangeRole(userItem.id, role),
                            // Disabled if already current role
                            disabled: userItem.role === role,
                            className: userItem.role === role ? 'bg-gray-100 text-gray-500' : ''
                        })),
                        {
                          key: 'assignTenant',
                          label: 'Assign to Tenant',
                          onSelect: () => onAssignTenant(userItem.id),
                          withDivider: true,
                        },
                        { key: 'delete', label: 'Delete User', onSelect: () => onDelete(userItem.id) },
                      ]}
                    />
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

export default UserTable;
