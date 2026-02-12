// src/components/feature/SessionManager.tsx
import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';

// Mock data for experiences and facilitators for MVP
const mockExperiences: Experience[] = [
  { id: 'exp1', title: 'Team Communication Workshop', description: 'Enhance communication skills.', duration: '2 hours', groupSize: '5-15', deliveryType: 'online' },
  { id: 'exp2', title: 'Leadership Retreat', description: 'Develop leadership qualities.', duration: 'full day', groupSize: '10-20', deliveryType: 'in-person' },
];

const mockFacilitators: User[] = [
  { id: 'fac1', name: 'Alice Smith', email: 'alice@example.com', role: 'participant' },
  { id: 'fac2', name: 'Bob Johnson', email: 'bob@example.com', role: 'participant' },
];

interface SessionManagerProps {
  sessions: Session[];
  onCreateSession: (session: Omit<Session, 'id'>) => void;
  // @ts-ignore - TS6133: 'onTrackAttendance' is declared but its value is never read. This is a false positive as it's used within handleAttendanceClick.
  onTrackAttendance: (sessionId: string, participants: string[]) => void; // Simplified for MVP
}

const SessionManager: React.FC<SessionManagerProps> = ({ sessions, onCreateSession, // @ts-ignore - TS6133: 'onTrackAttendance' is declared but its value is never read. This is a false positive as it's used within handleAttendanceClick.
onTrackAttendance }) => {
  const [newSessionData, setNewSessionData] = useState<Omit<Session, 'id'>>({
    experienceId: mockExperiences[0]?.id || '',
    date: '',
    time: '',
    facilitatorId: mockFacilitators[0]?.id || '',
    groupId: '', // Assuming groupId will be selected or passed in context
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSessionData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!newSessionData.experienceId) newErrors.experienceId = 'Experience is required';
    if (!newSessionData.date) newErrors.date = 'Date is required';
    if (!newSessionData.time) newErrors.time = 'Time is required';
    if (!newSessionData.facilitatorId) newErrors.facilitatorId = 'Facilitator is required';
    // groupId is pending context, so not validated for now
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onCreateSession(newSessionData);
      setNewSessionData({ // Reset form
        experienceId: mockExperiences[0]?.id || '',
        date: '',
        time: '',
        facilitatorId: mockFacilitators[0]?.id || '',
        groupId: '',
      });
      alert('Session scheduled successfully!');
    }
  };

  // Simplified attendance tracking for MVP
  const handleAttendanceClick = (sessionId: string) => {
    console.log(`Tracking attendance for session: ${sessionId}`);
    // In a real app, this would open a modal/page to select participants
    alert(`Simulating attendance tracking for session ID: ${sessionId}`);
  };

  return (
    <div className="space-y-6">
      {/* Schedule New Session Form */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Schedule New Session</h3>
        <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="experienceId" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <select
              id="experienceId"
              name="experienceId"
              value={newSessionData.experienceId}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              {mockExperiences.map(exp => (
                <option key={exp.id} value={exp.id}>{exp.title}</option>
              ))}
            </select>
            {errors.experienceId && <p className="mt-1 text-sm text-red-600">{errors.experienceId}</p>}
          </div>
          <Input
            label="Date"
            name="date"
            type="date"
            value={newSessionData.date}
            onChange={handleInputChange}
            error={errors.date}
          />
          <Input
            label="Time"
            name="time"
            type="time"
            value={newSessionData.time}
            onChange={handleInputChange}
            error={errors.time}
          />
          <div>
            <label htmlFor="facilitatorId" className="block text-sm font-medium text-gray-700 mb-1">Facilitator</label>
            <select
              id="facilitatorId"
              name="facilitatorId"
              value={newSessionData.facilitatorId}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              {mockFacilitators.map(fac => (
                <option key={fac.id} value={fac.id}>{fac.name}</option>
              ))}
            </select>
            {errors.facilitatorId && <p className="mt-1 text-sm text-red-600">{errors.facilitatorId}</p>}
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit">Schedule Session</Button>
          </div>
        </form>
      </Card>

      {/* Existing Sessions Table */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Existing Sessions</h3>
        {sessions.length === 0 ? (
          <p className="text-gray-500">No sessions scheduled yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Facilitator
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sessions.map((session) => (
                  <tr key={session.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {mockExperiences.find(exp => exp.id === session.experienceId)?.title || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {mockFacilitators.find(fac => fac.id === session.facilitatorId)?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm" onClick={() => handleAttendanceClick(session.id)}>Track Attendance</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SessionManager;
