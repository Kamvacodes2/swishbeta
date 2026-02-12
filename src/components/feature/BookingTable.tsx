// src/components/feature/BookingTable.tsx
import React from 'react';
import Button from '../ui/Button';

export interface Booking {
  id: string;
  experienceName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  groupName: string;
}

interface BookingTableProps {
  bookings: Booking[];
  onChangeStatus: (bookingId: string, newStatus: Booking['status']) => void;
  onCancel: (bookingId: string) => void;
}

const MOCK_BOOKINGS: Booking[] = [
  { id: 'book-1', experienceName: 'Collaborative Problem Solving', date: '2026-03-15', time: '10:00 AM', status: 'confirmed', groupName: 'Marketing Team' },
  { id: 'book-2', experienceName: 'Virtual Escape Room', date: '2026-04-01', time: '2:00 PM', status: 'pending', groupName: 'Youth Group' },
  { id: 'book-3', experienceName: 'Mindfulness & Wellbeing Workshop', date: '2026-04-10', time: '11:00 AM', status: 'confirmed', groupName: 'Marketing Team' },
];

const BookingTable: React.FC<BookingTableProps> = ({ bookings = MOCK_BOOKINGS, onChangeStatus, onCancel }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Management</h3>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.experienceName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.date} at {booking.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.groupName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {booking.status === 'pending' && (
                      <Button variant="ghost" size="sm" onClick={() => onChangeStatus(booking.id, 'confirmed')} className="text-green-600 hover:text-green-900 mr-2">Confirm</Button>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button variant="ghost" size="sm" onClick={() => onChangeStatus(booking.id, 'completed')} className="text-blue-600 hover:text-blue-900 mr-2">Mark Completed</Button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <Button variant="ghost" size="sm" onClick={() => onCancel(booking.id)} className="text-red-600 hover:text-red-900">Cancel</Button>
                    )}
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

export default BookingTable;
