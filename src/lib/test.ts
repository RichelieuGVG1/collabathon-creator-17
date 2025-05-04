  // api/client.ts
  import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
  import { Hackathon, Team, User, SearchFilters, AuthResponse, RefreshResponse } from '../types';
  
  type TokenRefreshCallback = (data: { accessToken: string, refreshToken: string }) => Promise<void>;

  abstract class BaseApiClient {
    protected api: AxiosInstance;
    private isRefreshing = false;
    private refreshSubscribers: ((token: string) => void)[] = [];
  
    constructor(baseURL: string, private refreshTokenRequest: TokenRefreshCallback) {
      this.api = axios.create({
        baseURL,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });
  
      this.setupInterceptors();
    }
  
    private setupInterceptors() {
      this.api.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          const token = localStorage.getItem('accessToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        error => Promise.reject(error)
      );
  
      this.api.interceptors.response.use(
        response => response,
        async (error: AxiosError) => {
          const originalRequest = error.config!;
          const is401 = error.response?.status === 401;
          const isNotRefresh = !originalRequest.url?.includes('/auth/refresh');
  
          if (is401 && isNotRefresh) {
            if (!this.isRefreshing) {
              this.isRefreshing = true;
  
              try {
                const refreshToken = localStorage.getItem('refreshToken')!;
                const accessToken = localStorage.getItem('accessToken')!;
  
                await this.refreshTokenRequest({ accessToken, refreshToken });
                this.onRefreshed(localStorage.getItem('accessToken')!);
              } catch (err) {
                this.clearTokens();
                window.location.href = '/login';
                return Promise.reject(err);
              } finally {
                this.isRefreshing = false;
              }
            }
  
            return new Promise((resolve) => {
              this.subscribeTokenRefresh((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.api(originalRequest));
              });
            });
          }
  
          return Promise.reject(error);
        }
      );
    }
  
    private subscribeTokenRefresh(callback: (token: string) => void) {
      this.refreshSubscribers.push(callback);
    }
  
    private onRefreshed(token: string) {
      this.refreshSubscribers.forEach(cb => cb(token));
      this.refreshSubscribers = [];
    }
  
    protected saveTokens(accessToken: string, refreshToken: string) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  
    protected clearTokens() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }
  
  class ModernAuthApiClient extends BaseApiClient{
    constructor(baseURL: string = 'http://localhost:80/api/v2/') {
      super(baseURL, async ({ accessToken, refreshToken }) => {
        const response = await authClient.refresh({ accessToken, refreshToken });
        this.saveTokens(response.data.accessToken, response.data.refreshToken);
      });
    }

    async registerInitiate(data: { userName: string; email: string; password: string; confirmPassword: string }): Promise<void> {
      await this.api.post('/auth/registerInitiate', data);
    }

    async registerConfirm(data: { email: string, registrationCode: string}) : Promise<AxiosResponse<AuthResponse>>{
      const response = await this.api.post<AuthResponse>('/auth/registerConfirm', data);
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      return response;
    }
  }

  class AuthApiClient extends BaseApiClient {
    constructor(baseURL: string = 'http://localhost:80/api/v1/') {
      super(baseURL, async ({ accessToken, refreshToken }) => {
        const response = await this.refresh({ accessToken, refreshToken });
        this.saveTokens(response.data.accessToken, response.data.refreshToken);
      });
    }
    
    async register(data: { userName: string; email: string; password: string; confirmPassword: string }): Promise<AxiosResponse<AuthResponse>> {
      const response = await this.api.post<AuthResponse>('/auth/register', data);
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      return response;
    }
  
    async login(data: { email: string; password: string }): Promise<AxiosResponse<AuthResponse>> {
      const response = await this.api.post<AuthResponse>('/auth/login', data);
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      return response;
    }
  
    async refresh(data: { accessToken: string; refreshToken: string }): Promise<AxiosResponse<RefreshResponse>> {
      return this.api.post<RefreshResponse>('/auth/refresh', data);
    }
  
    async googleRegister(data: { idToken: string }): Promise<AxiosResponse<AuthResponse>> {
      const response = await this.api.post<AuthResponse>('/auth/googleRegister', data);
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      return response;
    }
  
    async googleLogin(data: { idToken: string }): Promise<AxiosResponse<AuthResponse>> {
      const response = await this.api.post<AuthResponse>('/auth/googleLogin', data);
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      return response;
    }
  
    async forgotPassword(data: { email: string }): Promise<AxiosResponse<string>> {
      return this.api.post<string>('/auth/forgot-password', data);
    }
  
    async resetPassword(data: { token: string; password: string; confirmPassword: string }): Promise<AxiosResponse<string>> {
      return this.api.post<string>('/auth/reset-password', data);
    }
  
    async enableTwoFa(data: { userId: string }): Promise<AxiosResponse<string>> {
      return this.api.patch<string>(`/auth/enable-2fa/${data.userId}`);
    }
  
    async disableTwoFa(data: { userId: string }): Promise<AxiosResponse<string>> {
      return this.api.patch<string>(`/auth/disable-2fa/${data.userId}`);
    }
  
    async verifyTwoFaCode(data: { id: string; code: string }): Promise<AxiosResponse<AuthResponse>> {
      const response = await this.api.post<AuthResponse>('/auth/verify-2fa', data);
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      return response;
    }
  
    async resendTwoFaCode(data: { email: string }): Promise<AxiosResponse<string>> {
      return this.api.post<string>('/auth/resend-2fa', data);
    }
  }
  
  
    

  class MainApiClient extends BaseApiClient{
    constructor(baseURL: string = 'http://localhost:5002/api/main'){
        super(baseURL, async ({ accessToken, refreshToken }) => {
            const response = await authClient.refresh({ accessToken, refreshToken });
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
          });
    }
        // Hackathon endpoints
        async getHackathons(filters: SearchFilters): Promise<Hackathon[]> {
            const params = new URLSearchParams();
            
            if (filters.query) {
              params.append('query', filters.query);
            }
            
            if (filters.tags && filters.tags.length > 0) {
              filters.tags.forEach(tag => params.append('tags', tag));
            }
            
            if (filters.tab) {
              params.append('tab', filters.tab);
            }
            
            const response = await this.api.get<Hackathon[]>(`/Hackathon?${params.toString()}`);
            return response.data;
        }
        
        async getHackathonById(id: string): Promise<Hackathon> {
            const response = await this.api.get<Hackathon>(`/Hackathon/${id}`);
            return response.data;
        }
    
        async createHackathon(hackathon: Omit<Hackathon, 'id'>): Promise<Hackathon> {
            const response = await this.api.post<Hackathon>('/Hackathon', hackathon);
            return response.data;
        }
    
        // async updateHackathon(id: string, hackathon: Omit<Hackathon, 'id'>): Promise<void> {
        //     await this.api.put(`/hackathons/${id}`, hackathon);
        // }
    
        // async deleteHackathon(id: string): Promise<void> {
        //     await this.api.delete(`/hackathons/${id}`);
        // }
    
        // Team endpoints
        async getTeams(): Promise<Team[]> {
          const response = await this.api.get<Team[]>(`/main/Team/`);
          return response.data;
      }
        async getTeamsForHackathon(hackathonId: string): Promise<Team[]> {
            const response = await this.api.get<Team[]>(`/main/Team/hackathon/${hackathonId}`);
            return response.data;
        }
    
        async getTeamById(id: string): Promise<Team> {
            const response = await this.api.get<Team>(`/main/Team/${id}`);
            return response.data;
        }
    
        async createTeam(team: Omit<Team, 'id' | 'createdAt'>): Promise<Team> {
            const response = await this.api.post<Team>('/main/Team', team);
            return response.data;
        }
    
        // async updateTeam(id: string, team: Omit<Team, 'id'>): Promise<void> {
        //     await this.api.put(`/teams/${id}`, team);
        // }
    
        // async deleteTeam(id: string): Promise<void> {
        //     await this.api.delete(`/teams/${id}`);
        // }
    
        async joinTeam(teamId: string, userId: string): Promise<boolean> {
            const response = await this.api.post<Team>(`/main/Team/${teamId}/users/${userId}`);
            return response.status == 200;
        }
    
        async leaveTeam(teamId: string, userId: string): Promise<boolean> {
            const response = await this.api.delete<Team>(`/main/Team/${teamId}/users/${userId}`);
            return response.status == 200;
        }
    
        // User endpoints
        async getUsers() : Promise<User[]>{
          const response = await this.api.get<User[]>('/main/User');
          return response.data;
        }


        async getUserById(id: string): Promise<User> {
            console.log(`Guid for axios (getUserById): ${id}`);
            const response = await this.api.get<User>(`/main/User/${id}`);
            return response.data;
        }
    
        async createUser(user: User): Promise<User> {
            const response = await this.api.post<User>('/main/User', user);
            return response.data;
        }
    
        async updateUser(user: User): Promise<void> {
            await this.api.put(`/main/User`, user);
        }
        
  }

    // Export a singleton instance
    export const apiClient = new MainApiClient();
    export const authClient = new AuthApiClient();
    export const moderAuthClient = new ModernAuthApiClient();
    // Example usage:
    // import { apiClient } from './api/client';
    // 
    // async function fetchHackathons() {
    //   try {
    //     const hackathons = await apiClient.getHackathons({ 
    //       query: '', 
    //       tags: [], 
    //       tab: 'upcoming' 
    //     });
    //     console.log(hackathons);
    //   } catch (error) {
    //     console.error('Error fetching hackathons:', error);
    //   }
    // }