import { create } from 'zustand';
import { AuthResponse, Hackathon, RefreshResponse, Team, User, UserRole, SearchFilters } from '@/types';
import { hackathons as initialHackathons } from '@/data/hackathons';
import { teams as initialTeams } from '@/data/teams';
//import { users as initialUsers } from '@/data/users';
import { persist } from 'zustand/middleware';
import axios, { AxiosResponse } from 'axios';
import { apiClient, authClient, moderAuthClient } from './test';

// interface AuthState {
//   currentUser: User | null;
//   isAuthenticated: boolean;
//   isAdmin: boolean;
//   login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
//   register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
//   logout: () => void;
//   adminLogin: (password: string) => Promise<{ success: boolean; message: string }>;
// }

interface AuthState {
  currentUser: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  requiresTwoFa: boolean;
  requiresConfirmEmail: boolean;
  isAuthenticated: boolean;
  role: UserRole;
  error: string | null;
  isLoading: boolean;

  registerInitiate: (data: { userName: string; email: string; password: string; confirmPassword: string }) => Promise<void>;
  registerConfirm: (data: { email: string, registrationCode: string}) => Promise<AxiosResponse<AuthResponse>>;

  login: (data: {email: string, password: string}) => Promise<AxiosResponse<AuthResponse>>;
  register: (data: { 
    userName: string, 
    email: string, 
    password: string, 
    confirmPassword: string 
  }) => Promise<AxiosResponse<AuthResponse>>;
  logout: () => void;
  // refresh: () => Promise<AxiosResponse<RefreshResponse>>;
  // googleRegister: (data: {idToken: string}) =>  Promise<AuthResponse>;
  // googleLogin: (data: {idToken: string}) => Promise<AuthResponse>;
  // forgotPassword: (data: {email: string}) => Promise<string>;
  // resetPassword: (data: {token: string, password: string, confirmPassword: string}) => Promise<string>;
  // enableTwoFa: (data: {userId: string}) => Promise<string>;
  // disableTwoFa: (data: {userId: string}) => Promise<string>;
  // verifyTwoFaCode: (data: {id: string, code: string}) => Promise<AuthResponse>;
  // resendTwoFaCode: (data: {email: string}) => Promise<string>;
}

interface HackathonState {
  hackathons: Hackathon[];
  isLoading: boolean;
  error: string | null;
  fetchHackathons: (query?: string, filters?: string[], tab?: 'all' | 'upcoming' | 'past') => Promise<void>;
  getHackathonById: (id: string) => Promise<Hackathon | undefined>;
  searchHackathons: (query: string, filters: string[]) => Hackathon[];
  createHackathon: (hackathon: Omit<Hackathon, 'id'>) => Promise<Hackathon>;
  // updateHackathon: (id: string, hackathon: Omit<Hackathon, 'id'>) => Promise<void>;
  // deleteHackathon: (id: string) => Promise<void>;
}

interface TeamState {
  teams: Team[];
  isLoading: boolean;
  error: string | null;
  fetchTeams: () => Promise<void>;
  getTeamById: (id: string) => Promise<Team | undefined>;
  getTeamsByHackathonId: (hackathonId: string) => Promise<Team[]>;
  createTeam: (team: Omit<Team, 'id' | 'createdAt'>) => Promise<Team>;
  // updateTeam: (id: string, team: Omit<Team, 'id'>) => Promise<void>;
  // deleteTeam: (id: string) => Promise<void>;
  joinTeam: (teamId: string, userId: string) => Promise<boolean>;
  leaveTeam: (teamId: string, userId: string) => Promise<boolean>;
}

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  getUserById: (id: string) => Promise<User | undefined>;
  updateUser: (updatedUser: User) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      accessToken: null,
      refreshToken: null,
      requiresTwoFa: false,
      requiresConfirmEmail: false,
      isAuthenticated: false,
      role: UserRole.None,
      error: null,
      isLoading: false,
      success: false,

      login: async ({email, password}) => {
        set({isLoading: true, error: null})
        try {
          const response = await authClient.login({email, password});
          const data = response.data;
          set(
            {
              role: data.userRole, 
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              requiresTwoFa: data.requiresTwoFa,
              requiresConfirmEmail: data.requiresConfirmEmail,
              isAuthenticated: !data.requiresTwoFa && !data.requiresConfirmEmail
            }
          );

          if(!data.requiresTwoFa && !data.requiresConfirmEmail){
            const user = await apiClient.getUserById(data.userId);
            set({currentUser: user});
          }

          return response;
        } catch (error) {
          const message = axios.isAxiosError(error)
            ? error.response?.data?.description || 'Login failed'
            : 'Unknown error';
          set({error: message})
          throw new Error(message);
        }
        finally{
          set({isLoading: false})
        }
      },

      registerInitiate: async({userName, email, password, confirmPassword}) => {
        set({isLoading: true, error: null})
        try {
          await moderAuthClient.registerInitiate({userName, email, password, confirmPassword});
        } catch (error) {
          const message = axios.isAxiosError(error)
            ? error.response?.data?.description || 'Register failed'
            : 'Unknown error';
          set({error: message})
          throw new Error(message);
        }
        finally {
          set({isLoading: false})
        }
      },

      registerConfirm: async({email, registrationCode}) => {
        set({isLoading: true, error: null})
        try {
          const response = await moderAuthClient.registerConfirm({email, registrationCode});
          const data = response.data;
          set(
            {
              role: data.userRole,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              requiresTwoFa: data.requiresTwoFa,
              requiresConfirmEmail: data.requiresConfirmEmail,
              isAuthenticated: !data.requiresTwoFa && !data.requiresConfirmEmail
            }
          );
          
          if(!data.requiresTwoFa && !data.requiresConfirmEmail){
            console.log(`set currentUser for useAuthStore was called with id ${data.userId}`);
            const user = await apiClient.getUserById(data.userId);
            set({currentUser: user});
          }

          return response;

        } catch (error) {
          const message = axios.isAxiosError(error)
            ? error.response?.data?.description || 'Register failed'
            : 'Unknown error';
          set({error: message})
          throw new Error(message);
        }
        finally {
          set({isLoading: false})
        }
      },

      register: async ({userName, email, password, confirmPassword}) => {
        console.log(`register for useAuthStore was called`);
        set({isLoading: true, error: null})
        try {
          const response = await authClient.register({userName, email, password, confirmPassword});
          const data = response.data;
          set(
            {
              role: data.userRole,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              requiresTwoFa: data.requiresTwoFa,
              requiresConfirmEmail: data.requiresConfirmEmail,
              isAuthenticated: !data.requiresTwoFa && !data.requiresConfirmEmail
            }
          );
          
          if(!data.requiresTwoFa && !data.requiresConfirmEmail){
            console.log(`set currentUser for useAuthStore was called with id ${data.userId}`);
            const user = await apiClient.getUserById(data.userId);
            set({currentUser: user});
          }

          return response;

        } catch (error) {
          const message = axios.isAxiosError(error)
            ? error.response?.data?.description || 'Register failed'
            : 'Unknown error';
          set({error: message})
          throw new Error(message);
        }
        finally {
          set({isLoading: false})
        }
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({
          currentUser: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          role: UserRole.None,
          requiresTwoFa: false,
          requiresConfirmEmail: false
        });
      }

      // refresh: async () => {
      //   const accessToken = localStorage.getItem('accessToken');
      //   const refreshToken = localStorage.getItem('refreshToken');
      //   if (!refreshToken) throw new Error('No refresh token');
        
      //   try {
      //     const response = await authClient.refresh({ accessToken, refreshToken });
      //     caonst data = response.
      //     localStorage.setItem('accessToken', data.accessToken);
      //     localStorage.setItem('refreshToken', data.refreshToken);
      //     set({ 
      //       accessToken: data.accessToken,
      //       refreshToken: data.refreshToken
      //     });
      //     return data;
      //   } catch (error) {
      //     localStorage.removeItem('accessToken');
      //     localStorage.removeItem('refreshToken');
      //     throw error;
      //   }
      // },

    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        currentUser: state.currentUser
      })
    }
  )
);

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       currentUser: null,
//       isAuthenticated: false,
//       isAdmin: false,
//       login: async (email, password) => {
//         const user = initialUsers.find(u => u.email === email);
        
//         if (user) {
//           set({ currentUser: user, isAuthenticated: true });
//           return { success: true, message: 'Login successful' };
//         }
        
//         return { success: false, message: 'Invalid email or password' };
//       },
//       register: async (name, email, password) => {
//         const users = initialUsers;
//         const userExists = users.some(u => u.email === email);
        
//         if (userExists) {
//           return { success: false, message: 'User with this email already exists' };
//         }
        
//         const newUser: User = {
//           id: `user-${Date.now()}`,
//           name,
//           email,
//           bio: '',
//           tags: [],
//           photoUrl: '',
//           createdAt: new Date().toISOString(),
//           location: '',
//           github: '',
//           website: '',
//           skills: []
//         };
        
//         initialUsers.push(newUser);
//         set({ currentUser: newUser, isAuthenticated: true });
        
//         return { success: true, message: 'Registration successful' };
//       },
//       logout: () => {
//         set({ currentUser: null, isAuthenticated: false, isAdmin: false });
//       },
//       adminLogin: async (password) => {
//         if (password === 'admin') {
//           set({ isAdmin: true, isAuthenticated: true });
//           return { success: true, message: 'Вход администратора успешен' };
//         }
        
//         return { success: false, message: 'Неверный пароль администратора' };
//       }
//     }),
//     {
//       name: 'auth-storage'
//     }
//   )
// );

export const useHackathonStore = create<HackathonState>()((set, get) => ({
  hackathons: [],
  isLoading: false,
  error: null,
  fetchHackathons: async (query = '', filters = [], tab = 'all') => {
    set({ isLoading: true, error: null });
    try {
      const searchFilters: SearchFilters = {query:query, tags:filters, tab:tab}
      const hackathons = await apiClient.getHackathons(searchFilters);
      set({ hackathons, isLoading: false });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.message || 'Failed to fetch hackathons' 
      });
    }
  },
  getHackathonById: async (id) => {
    try {
      const hackathon = await apiClient.getHackathonById(id);
      return hackathon;
    } catch (error) {
      return undefined;
    }
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
  },
  createHackathon: async (hackathonData) => {
    set({ isLoading: true, error: null });
    try {
      const newHackathon = await apiClient.createHackathon(hackathonData);
      set(state => ({ 
        hackathons: [...state.hackathons, newHackathon],
        isLoading: false
      }));
      return newHackathon;
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.message || 'Failed to create hackathon' 
      });
      throw error;
    }
  },
  // updateHackathon: async (id, hackathonData) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     await apiClient.updateHackathon(id, hackathonData);
  //     const updatedHackathon = await apiClient.getHackathonById(id);
  //     set(state => ({
  //       hackathons: state.hackathons.map(h => 
  //         h.id === id ? updatedHackathon : h
  //       ),
  //       isLoading: false
  //     }));
  //   } catch (error: any) {
  //     set({ 
  //       isLoading: false, 
  //       error: error.message || 'Failed to update hackathon' 
  //     });
  //     throw error;
  //   }
  // },
  // deleteHackathon: async (id) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     await apiClient.deleteHackathon(id);
  //     set(state => ({
  //       hackathons: state.hackathons.filter(h => h.id !== id),
  //       isLoading: false
  //     }));
  //   } catch (error: any) {
  //     set({ 
  //       isLoading: false, 
  //       error: error.message || 'Failed to delete hackathon' 
  //     });
  //     throw error;
  //   }
  // }
}));

// Team Store
export const useTeamStore = create<TeamState>()((set, get) => ({
  teams: [],
  isLoading: false,
  error: null,
  fetchTeams: async () => {
    set({ isLoading: true, error: null });
    try {
      const teams = await apiClient.getTeams();
      set({ teams, isLoading: false });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.message || 'Failed to fetch teams' 
      });
    }
  },
  getTeamById: async (id) => {
    try {
      return await apiClient.getTeamById(id);
    } catch (error) {
      return undefined;
    }
  },
  getTeamsByHackathonId: async (hackathonId) => {
    set({ isLoading: true, error: null });
    try {
      const teams = await apiClient.getTeamsForHackathon(hackathonId);
      // Update the store with these teams
      set(state => {
        const existingTeams = state.teams.filter(t => t.hackathonId !== hackathonId);
        return { 
          teams: [...existingTeams, ...teams],
          isLoading: false
        };
      });
      return teams;
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.message || 'Failed to fetch teams' 
      });
      return [];
    }
  },
  createTeam: async (teamData) => {
    set({ isLoading: true, error: null });
    try {
      const newTeam = await apiClient.createTeam(teamData);
      set(state => ({ 
        teams: [...state.teams, newTeam],
        isLoading: false
      }));
      return newTeam;
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.message || 'Failed to create team' 
      });
      throw error;
    }
  },
  // updateTeam: async (id, teamData) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     await apiClient.updateTeam(id, teamData);
  //     const updatedTeam = await apiClient.getTeamById(id);
  //     set(state => ({
  //       teams: state.teams.map(t => 
  //         t.id === id ? updatedTeam : t
  //       ),
  //       isLoading: false
  //     }));
  //   } catch (error: any) {
  //     set({ 
  //       isLoading: false, 
  //       error: error.message || 'Failed to update team' 
  //     });
  //     throw error;
  //   }
  // },
  // deleteTeam: async (id) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     await apiClient.deleteTeam(id);
  //     set(state => ({
  //       teams: state.teams.filter(t => t.id !== id),
  //       isLoading: false
  //     }));
  //   } catch (error: any) {
  //     set({ 
  //       isLoading: false, 
  //       error: error.message || 'Failed to delete team' 
  //     });
  //     throw error;
  //   }
  // },
  joinTeam: async (teamId, userId) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.joinTeam(teamId, userId);
      // Refresh the team data
      const updatedTeam = await apiClient.getTeamById(teamId);
      
      set(state => ({
        teams: state.teams.map(t => 
          t.id === teamId ? updatedTeam : t
        ),
        isLoading: false
      }));
      
      return true;
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.message || 'Failed to join team' 
      });
      return false;
    }
  },
  leaveTeam: async (teamId, userId) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.leaveTeam(teamId, userId);
      // Refresh the team data
      const updatedTeam = await apiClient.getTeamById(teamId);
      
      set(state => ({
        teams: state.teams.map(t => 
          t.id === teamId ? updatedTeam : t
        ),
        isLoading: false
      }));
      
      return true;
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.message || 'Failed to leave team' 
      });
      return false;
    }
  }
}));

// User Store
export const useUserStore = create<UserState>()((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  getUserById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const user = await apiClient.getUserById(id);
      
      // Update the user in our local state if we have it
      set(state => {
        const userIndex = state.users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
          const updatedUsers = [...state.users];
          updatedUsers[userIndex] = user;
          return { users: updatedUsers, isLoading: false };
        }
        return { users: [...state.users, user], isLoading: false };
      });
      
      return user;
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.message || 'Failed to fetch user' 
      });
      return undefined;
    }
  },
  updateUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.updateUser(userData);
      const updatedUser = await apiClient.getUserById(userData.id);
      
      set(state => ({
        users: state.users.map(u => 
          u.id === userData.id ? updatedUser : u
        ),
        isLoading: false
      }));
      
      // Update the currentUser in auth store if it's the same user
      const currentUser = useAuthStore.getState().currentUser;
      if (currentUser && currentUser.id === userData.id) {
        useAuthStore.setState({ currentUser: updatedUser });
      }
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.message || 'Failed to update user' 
      });
      throw error;
    }
  }
}));