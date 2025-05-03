import { create } from 'zustand';
import { AuthResponse, Hackathon, RefreshResponse, Team, User, UserRole } from '@/types';
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
  getHackathonById: (id: string) => Hackathon | undefined;
  searchHackathons: (query: string, filters: string[]) => Hackathon[];
  createHackathon: (hackathon: Omit<Hackathon, 'id'>) => Hackathon;
}

interface TeamState {
  teams: Team[];
  getTeamById: (id: string) => Team | undefined;
  getTeamsByHackathonId: (hackathonId: string) => Team[];
  createTeam: (team: Omit<Team, 'id' | 'createdAt'>) => Team;
  joinTeam: (teamId: string, userId: string) => Promise<boolean>;
  leaveTeam: (teamId: string, userId: string) => boolean;
}

interface UserState {
  // users: User[];
  getUserById: (id: string) => Promise<User> | undefined;
  updateUser: (updatedUser: User) => void;
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
  },
  createHackathon: (hackathonData) => {
    const newHackathon: Hackathon = {
      id: `hackathon-${Date.now()}`,
      ...hackathonData
    };
    
    set(state => ({ hackathons: [...state.hackathons, newHackathon] }));
    return newHackathon;
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
  joinTeam: async (teamId, userId) => {
    const teams = get().teams;
    const teamIndex = teams.findIndex(t => t.id === teamId);
    
    if (teamIndex === -1) return false;
    
    const team = teams[teamIndex];
    
    if (team.members.length >= team.maxMembers) return false;
    
    const user = await useUserStore.getState().getUserById(userId);
    if (!user) return false;
    
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
    
    if (!team.members.some(m => m.id !== userId)) return false;
    
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

export const useUserStore = create<UserState>()(() => ({
  getUserById: async (id) => {
    console.log(`Guid for useUserStore (getUserById): ${id}`);
    return await apiClient.getUserById(id);
  },
  updateUser: async (updatedUser) => {
    await apiClient.updateUser(updatedUser);

    const currentUser = useAuthStore.getState().currentUser;
    if (currentUser && currentUser.id === updatedUser.id) {
      useAuthStore.setState({ currentUser: updatedUser });
    }
  }
}));
