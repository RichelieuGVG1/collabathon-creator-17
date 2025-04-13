
import { create } from 'zustand';
import { Hackathon, Team, User } from '@/types';
import { hackathons as initialHackathons } from '@/data/hackathons';
import { teams as initialTeams } from '@/data/teams';
import { users as initialUsers } from '@/data/users';
import { persist } from 'zustand/middleware';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

interface HackathonState {
  hackathons: Hackathon[];
  getHackathonById: (id: string) => Hackathon | undefined;
  searchHackathons: (query: string, filters: string[]) => Hackathon[];
}

interface TeamState {
  teams: Team[];
  getTeamById: (id: string) => Team | undefined;
  getTeamsByHackathonId: (hackathonId: string) => Team[];
  createTeam: (team: Omit<Team, 'id' | 'createdAt'>) => Team;
  joinTeam: (teamId: string, userId: string) => boolean;
  leaveTeam: (teamId: string, userId: string) => boolean;
}

interface UserState {
  users: User[];
  getUserById: (id: string) => User | undefined;
  updateUser: (updatedUser: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      login: async (email, password) => {
        // Simple mock login, would connect to a backend in a real app
        const user = initialUsers.find(u => u.email === email);
        
        if (user) {
          // In a real app, you would verify the password with a hash
          set({ currentUser: user, isAuthenticated: true });
          return { success: true, message: 'Login successful' };
        }
        
        return { success: false, message: 'Invalid email or password' };
      },
      register: async (name, email, password) => {
        const users = initialUsers;
        const userExists = users.some(u => u.email === email);
        
        if (userExists) {
          return { success: false, message: 'User with this email already exists' };
        }
        
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          bio: '',
          tags: [],
          photoUrl: '',
          createdAt: new Date().toISOString(),
          location: '',
          github: '',
          website: '',
          skills: []
        };
        
        initialUsers.push(newUser);
        set({ currentUser: newUser, isAuthenticated: true });
        
        return { success: true, message: 'Registration successful' };
      },
      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);

export const useHackathonStore = create<HackathonState>()((set, get) => ({
  hackathons: initialHackathons,
  getHackathonById: (id) => {
    return get().hackathons.find(h => h.id === id);
  },
  searchHackathons: (query, filters) => {
    const { hackathons } = get();
    return hackathons.filter(hackathon => {
      const matchesQuery = 
        query === '' ||
        hackathon.name.toLowerCase().includes(query.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(query.toLowerCase()) ||
        hackathon.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      
      const matchesFilters = 
        filters.length === 0 ||
        hackathon.tags.some(tag => filters.includes(tag));
      
      return matchesQuery && matchesFilters;
    });
  }
}));

export const useTeamStore = create<TeamState>()((set, get) => ({
  teams: initialTeams,
  getTeamById: (id) => {
    return get().teams.find(t => t.id === id);
  },
  getTeamsByHackathonId: (hackathonId) => {
    return get().teams.filter(t => t.hackathonId === hackathonId);
  },
  createTeam: (teamData) => {
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      ...teamData,
      createdAt: new Date().toISOString()
    };
    
    set(state => ({ teams: [...state.teams, newTeam] }));
    return newTeam;
  },
  joinTeam: (teamId, userId) => {
    const teams = get().teams;
    const teamIndex = teams.findIndex(t => t.id === teamId);
    
    if (teamIndex === -1) return false;
    
    const team = teams[teamIndex];
    
    // Check if team is full
    if (team.members.length >= team.maxMembers) return false;
    
    // Check if user is already a member
    if (team.members.some(m => m.id === userId)) return false;
    
    // Find user from users store
    const user = useUserStore.getState().getUserById(userId);
    if (!user) return false;
    
    // Add user to team
    const updatedTeam = {
      ...team,
      members: [...team.members, user]
    };
    
    const updatedTeams = [...teams];
    updatedTeams[teamIndex] = updatedTeam;
    
    set({ teams: updatedTeams });
    return true;
  },
  leaveTeam: (teamId, userId) => {
    const teams = get().teams;
    const teamIndex = teams.findIndex(t => t.id === teamId);
    
    if (teamIndex === -1) return false;
    
    const team = teams[teamIndex];
    
    // Check if user is a member
    if (!team.members.some(m => m.id !== userId)) return false;
    
    // Remove user from team
    const updatedTeam = {
      ...team,
      members: team.members.filter(m => m.id !== userId)
    };
    
    const updatedTeams = [...teams];
    updatedTeams[teamIndex] = updatedTeam;
    
    set({ teams: updatedTeams });
    return true;
  },
}));

export const useUserStore = create<UserState>()((set, get) => ({
  users: initialUsers,
  getUserById: (id) => {
    return get().users.find(u => u.id === id);
  },
  updateUser: (updatedUser) => {
    const { users } = get();
    const userIndex = users.findIndex(u => u.id === updatedUser.id);
    
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = updatedUser;
      set({ users: updatedUsers });
      
      // Also update the current user in auth store if it's the same user
      const currentUser = useAuthStore.getState().currentUser;
      if (currentUser && currentUser.id === updatedUser.id) {
        useAuthStore.setState({ currentUser: updatedUser });
      }
    }
  }
}));
