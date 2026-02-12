// src/services/api.ts
// This file simulates API calls for the MVP with dummy data.



// --- Mock Data ---
const MOCK_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    title: 'Collaborative Problem Solving',
    description: 'A dynamic workshop focused on enhancing team problem-solving skills through interactive challenges. Ideal for boosting communication and strategic thinking.',
    duration: '2-3 hours',
    groupSize: '8-20 people',
    deliveryType: 'in-person',
    outcomes: ['Improved communication', 'Enhanced critical thinking', 'Stronger team cohesion'],
    agenda: ['Introduction', 'Team challenges', 'Debrief & learn'],
    requirements: ['Open space', 'Whiteboard'],
    pricing: 'From R27 000',
    imageUrl: '/images/pexels-rdne-7551431.jpg',
    published: true,
  },
  {
    id: 'exp-2',
    title: 'Virtual Escape Room: The Digital Heist',
    description: 'An online team-building adventure that tests logic, teamwork, and time management. Perfect for remote teams looking to connect and have fun.',
    duration: '1.5 hours',
    groupSize: '4-12 people',
    deliveryType: 'online',
    outcomes: ['Team bonding', 'Problem-solving under pressure', 'Digital collaboration skills'],
    agenda: ['Briefing', 'Escape room challenges', 'Post-game discussion'],
    requirements: ['Stable internet', 'Zoom/Teams access'],
    pricing: 'R900 per person',
    imageUrl: '/images/pexels-danny-sanz-163348835-10855590.jpg',
    published: true,
  },
  {
    id: 'exp-3',
    title: 'Leadership Development Simulation',
    description: 'An intensive simulation designed to develop and refine leadership qualities in a challenging yet supportive environment. Focuses on decision-making and delegation.',
    duration: 'Full Day',
    groupSize: '6-15 people',
    deliveryType: 'in-person',
    outcomes: ['Stronger leadership skills', 'Effective delegation', 'Strategic decision-making'],
    agenda: ['Leadership theory', 'Simulation rounds', 'Personalized feedback'],
    requirements: ['Meeting room', 'Projector'],
    pricing: 'Custom Quote',
    imageUrl: '/images/pexels-rdne-7551754.jpg',
    published: false,
  },
  {
    id: 'exp-4',
    title: 'Mindfulness & Wellbeing Workshop',
    description: 'A calming and restorative session focused on promoting mental wellbeing and stress reduction within the team. Helps build a supportive and empathetic work environment.',
    duration: '1 hour',
    groupSize: 'Any size',
    deliveryType: 'online',
    outcomes: ['Stress reduction', 'Improved focus', 'Enhanced empathy'],
    agenda: ['Guided meditation', 'Mindfulness exercises', 'Q&A'],
    requirements: ['Quiet space', 'Optional headphones'],
    pricing: 'R5 400 flat rate',
    imageUrl: '/images/pexels-gabby-k-9489091.jpg',
    published: true,
  },
];

const MOCK_USERS: User[] = [
  { id: 'usr-1', name: 'John Doe', email: 'john@example.com', role: 'participant' },
  { id: 'usr-2', name: 'Jane Smith', email: 'jane@example.com', role: 'tenant-admin' },
  { id: 'usr-3', name: 'Admin User', email: 'admin@swish.com', role: 'platform-admin' },
];

let MOCK_ORGANIZATIONS: Organization[] = [ // Changed to let
  { id: 'org-1', name: 'Tech Solutions Inc.', status: 'active' },
  { id: 'org-2', name: 'Community Church', status: 'active' },
  { id: 'org-3', name: 'Global Charity Foundation', status: 'suspended' },
];

const MOCK_GROUPS: Group[] = [
  { id: 'grp-1', name: 'Marketing Team', members: [MOCK_USERS[0]], organizationId: 'org-1' },
  { id: 'grp-2', name: 'Youth Group', members: [], organizationId: 'org-2' },
];

const MOCK_SESSIONS: Session[] = [
  { id: 'sess-1', experienceId: 'exp-1', date: '2026-03-15', time: '10:00 AM', facilitatorId: MOCK_USERS[0].id, groupId: 'grp-1' },
];

let MOCK_ALL_USERS: User[] = [ // Changed to let
  { id: 'usr-1', name: 'John Doe', email: 'john@example.com', role: 'participant', organizationId: 'org-1', status: 'active' }, // Add organizationId and status
  { id: 'usr-2', name: 'Jane Smith', email: 'jane@example.com', role: 'tenant-admin', organizationId: 'org-1', status: 'active' },
  { id: 'usr-3', name: 'Admin User', email: 'admin@swish.com', role: 'platform-admin', status: 'active' },
  { id: 'usr-4', name: 'Bob Admin', email: 'bob@example.com', role: 'tenant-admin', organizationId: 'org-2', status: 'active' },
  { id: 'usr-5', name: 'Charlie Participant', email: 'charlie@example.com', role: 'participant', organizationId: 'org-2', status: 'suspended' },
];

interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
}

const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'log-1', timestamp: '2026-02-15T10:00:00Z', userId: 'usr-3', userName: 'Admin User', action: 'Created tenant: Tech Solutions Inc.' },
  { id: 'log-2', timestamp: '2026-02-15T10:05:00Z', userId: 'usr-2', userName: 'Jane Smith', action: 'Scheduled session: Collaborative Problem Solving' },
  { id: 'log-3', timestamp: '2026-02-15T10:10:00Z', userId: 'usr-3', userName: 'Admin User', action: 'Updated experience: Virtual Escape Room' },
];

// --- API Functions ---

const simulateNetworkDelay = (ms = 500) => new Promise(res => setTimeout(res, ms));

export const api = {
  experiences: {
    getAll: async (): Promise<Experience[]> => {
      await simulateNetworkDelay();
      return MOCK_EXPERIENCES;
    },
    getById: async (id: string): Promise<Experience | undefined> => {
      await simulateNetworkDelay();
      return MOCK_EXPERIENCES.find(exp => exp.id === id);
    },
    save: async (experience: Experience): Promise<Experience> => {
      await simulateNetworkDelay();
      if (experience.id) {
        const index = MOCK_EXPERIENCES.findIndex(exp => exp.id === experience.id);
        if (index !== -1) {
          MOCK_EXPERIENCES[index] = { ...experience };
          return MOCK_EXPERIENCES[index];
        }
      }
      const newId = `exp-${MOCK_EXPERIENCES.length + 1}`;
      const newExperience = { ...experience, id: newId };
      MOCK_EXPERIENCES.push(newExperience);
      return newExperience;
    },
    remove: async (id: string): Promise<boolean> => {
      await simulateNetworkDelay();
      const initial = MOCK_EXPERIENCES.length;
      const idx = MOCK_EXPERIENCES.findIndex(exp => exp.id === id);
      if (idx !== -1) MOCK_EXPERIENCES.splice(idx, 1);
      return MOCK_EXPERIENCES.length < initial;
    },
  },
  auth: {
    login: async (email: string): Promise<User | undefined> => {
      await simulateNetworkDelay();
      // Prefer MOCK_ALL_USERS so tenant-admin/participant get organizationId for dashboards
      const fullUser = MOCK_ALL_USERS.find(u => u.email === email);
      if (fullUser) {
        localStorage.setItem('swish_user', JSON.stringify(fullUser));
        return fullUser;
      }
      const user = MOCK_USERS.find(u => u.email === email);
      if (user) {
        const withOrg = user.role === 'tenant-admin' ? { ...user, organizationId: 'org-1' as string } : user;
        localStorage.setItem('swish_user', JSON.stringify(withOrg));
        return withOrg as User;
      }
      return undefined;
    },
    register: async (email: string, name: string): Promise<User> => { // Simplified register
      await simulateNetworkDelay();
      const newUser: User = { id: `usr-${MOCK_USERS.length + 1}`, name, email, role: 'participant' };
      MOCK_USERS.push(newUser);
      localStorage.setItem('swish_user', JSON.stringify(newUser));
      return newUser;
    },
  },
  organizations: {
    getAll: async (): Promise<Organization[]> => {
      await simulateNetworkDelay();
      return MOCK_ORGANIZATIONS;
    },
    getById: async (id: string): Promise<Organization | undefined> => {
      await simulateNetworkDelay();
      return MOCK_ORGANIZATIONS.find(org => org.id === id);
    },
    create: async (name: string): Promise<Organization> => {
      await simulateNetworkDelay();
      const newOrg: Organization = { id: `org-${MOCK_ORGANIZATIONS.length + 1}`, name, status: 'active' };
      MOCK_ORGANIZATIONS.push(newOrg);
      return newOrg;
    },
    update: async (id: string, updates: Partial<Organization>): Promise<Organization | undefined> => {
      await simulateNetworkDelay();
      const index = MOCK_ORGANIZATIONS.findIndex(org => org.id === id);
      if (index !== -1) {
        MOCK_ORGANIZATIONS[index] = { ...MOCK_ORGANIZATIONS[index], ...updates };
        return MOCK_ORGANIZATIONS[index];
      }
      return undefined;
    },
    remove: async (id: string): Promise<boolean> => {
      await simulateNetworkDelay();
      const initialLength = MOCK_ORGANIZATIONS.length;
      MOCK_ORGANIZATIONS = MOCK_ORGANIZATIONS.filter(org => org.id !== id);
      return MOCK_ORGANIZATIONS.length < initialLength;
    },
  },
  groups: {
    getAll: async (orgId: string): Promise<Group[]> => {
      await simulateNetworkDelay();
      return MOCK_GROUPS.filter(g => g.organizationId === orgId);
    },
    create: async (groupName: string, orgId: string): Promise<Group> => {
      await simulateNetworkDelay();
      const newGroup: Group = {
        id: `grp-${MOCK_GROUPS.length + 1}`,
        name: groupName,
        members: [],
        organizationId: orgId,
      };
      MOCK_GROUPS.push(newGroup);
      return newGroup;
    }
  },
  sessions: {
    getAll: async (groupId?: string): Promise<Session[]> => {
      await simulateNetworkDelay();
      if (groupId) {
        return MOCK_SESSIONS.filter(s => s.groupId === groupId);
      }
      return MOCK_SESSIONS;
    },
    create: async (sessionData: Omit<Session, 'id'>): Promise<Session> => {
      await simulateNetworkDelay();
      const newSession: Session = { ...sessionData, id: `sess-${MOCK_SESSIONS.length + 1}` };
      MOCK_SESSIONS.push(newSession);
      return newSession;
    }
  },
  users: {
    getAll: async (): Promise<User[]> => {
      await simulateNetworkDelay();
      return MOCK_ALL_USERS;
    },
    getByOrganizationId: async (organizationId: string): Promise<User[]> => {
      await simulateNetworkDelay();
      return MOCK_ALL_USERS.filter(user => user.organizationId === organizationId);
    },
    getById: async (id: string): Promise<User | undefined> => {
      await simulateNetworkDelay();
      return MOCK_ALL_USERS.find(user => user.id === id);
    },
    create: async (userData: Omit<User, 'id' | 'status'>): Promise<User> => {
      await simulateNetworkDelay();
      const newUser: User = { ...userData, id: `usr-${MOCK_ALL_USERS.length + 1}`, status: 'active' };
      MOCK_ALL_USERS.push(newUser);
      return newUser;
    },
    update: async (id: string, updates: Partial<User>): Promise<User | undefined> => {
      await simulateNetworkDelay();
      const index = MOCK_ALL_USERS.findIndex(user => user.id === id);
      if (index !== -1) {
        MOCK_ALL_USERS[index] = { ...MOCK_ALL_USERS[index], ...updates };
        return MOCK_ALL_USERS[index];
      }
      return undefined;
    },
    remove: async (id: string): Promise<boolean> => {
      await simulateNetworkDelay();
      const initialLength = MOCK_ALL_USERS.length;
      MOCK_ALL_USERS = MOCK_ALL_USERS.filter(user => user.id !== id);
      return MOCK_ALL_USERS.length < initialLength;
    },
  },
  activityLogs: { // New activity logs API
    getAll: async (): Promise<ActivityLog[]> => {
      await simulateNetworkDelay();
      return MOCK_ACTIVITY_LOGS;
    },
  },
};