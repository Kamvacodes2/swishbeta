// src/types/global.d.ts

interface User {
  id: string;
  name: string;
  email: string;
  role: 'participant' | 'tenant-admin' | 'platform-admin';
  organizationId?: string; // New property
  status?: 'active' | 'suspended'; // New property
}

interface Experience {
  id: string;
  title: string;
  description: string;
  duration: string;
  groupSize: string;
  deliveryType: 'in-person' | 'online';
  outcomes?: string[];
  agenda?: string[];
  requirements?: string[];
  pricing?: string;
  imageUrl?: string;
  published?: boolean;
}

interface Organization {
  id: string;
  name: string;
  status: 'active' | 'suspended'; // New property
}

interface BookingEnquiry {
  experienceId: string;
  organizationName: string;
  contactName: string;
  contactEmail: string;
  preferredDate: string;
  groupSize: number;
}

interface Group {
  id: string;
  name: string;
  members: User[];
  organizationId: string;
}

interface Session {
  id: string;
  experienceId: string;
  date: string;
  time: string;
  facilitatorId: string;
  groupId: string;
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

interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
}

// Add more types as needed for other entities like reports, feedback, etc.
