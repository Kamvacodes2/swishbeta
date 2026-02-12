// src/components/feature/GroupTable.tsx
import React from 'react';
import Button from '../ui/Button';

interface GroupTableProps {
  groups: Group[];
  onEdit: (groupId: string) => void;
  onDelete: (groupId: string) => void;
  onCreate: () => void;
}

const GroupTable: React.FC<GroupTableProps> = ({ groups, onEdit, onDelete, onCreate }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Groups</h3>
        <Button onClick={onCreate}>Create New Group</Button>
      </div>

      {groups.length === 0 ? (
        <p className="text-gray-500">No groups created yet. Click "Create New Group" to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groups.map((group) => (
                <tr key={group.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {group.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {group.members.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(group.id)} className="text-green-600 hover:text-green-900 mr-2">Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(group.id)} className="text-red-600 hover:text-red-900">Delete</Button>
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

export default GroupTable;
