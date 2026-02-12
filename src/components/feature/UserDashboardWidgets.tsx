// src/components/feature/UserDashboardWidgets.tsx
import React from 'react';
import Card from '../ui/Card';
import { Link } from 'react-router-dom';

interface UserDashboardWidgetsProps {
  upcomingEvents: EventItem[];
  assignedActivities: ActivityItem[];
}

interface EventItem {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
}

interface ActivityItem {
  id: string;
  name: string;
  status: string; // e.g., 'completed', 'in-progress', 'pending'
}

const UserDashboardWidgets: React.FC<UserDashboardWidgetsProps> = ({ upcomingEvents, assignedActivities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Upcoming Events Widget */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h3>
        {upcomingEvents.length > 0 ? (
          <ul className="space-y-3">
            {upcomingEvents.map((event) => (
              <li key={event.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                <p className="font-medium text-gray-700">{event.name}</p>
                <p className="text-sm text-gray-500">{event.date} at {event.time} - {event.location}</p>
                <Link to={`/events/${event.id}`} className="text-green-600 hover:underline text-sm mt-1 inline-block">
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No upcoming events.</p>
        )}
      </Card>

      {/* Assigned Activities Widget */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Assigned Activities</h3>
        {assignedActivities.length > 0 ? (
          <ul className="space-y-3">
            {assignedActivities.map((activity) => (
              <li key={activity.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                <p className="font-medium text-gray-700">{activity.name}</p>
                <p className="text-sm text-gray-500">Status: <span className="capitalize">{activity.status}</span></p>
                <Link to={`/activities/${activity.id}`} className="text-green-600 hover:underline text-sm mt-1 inline-block">
                  View Activity
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No assigned activities.</p>
        )}
      </Card>
    </div>
  );
};

export default UserDashboardWidgets;
