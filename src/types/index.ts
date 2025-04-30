export interface AuthFormData {
  userName: string | undefined;
  email: string;
  password: string;
  confirmPassword: string | undefined;
}

export interface AuthResponse{
  userId: string;
  accessToken: string;
  refreshToken: string;
  requiresTwoFa: boolean;
  requiresConfirmEmail: boolean;
  userRole: UserRole;
}

export interface RefreshResponse{
  accessToken: string;
  refreshToken: string;
}

export enum UserRole{
  Admin = "Admin",
  User = "User",
  None = "None"
}


export interface Hackathon {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  tags: string[];
  imageUrl: string;
  organizerName: string;
  organizerLogo: string;
  teamSize: {
    min: number;
    max: number;
  };
  website?: string;
  prizes?: Prize[];
  schedule?: ScheduleItem[];
}

export interface Prize {
  place: string;
  description: string;
}

export interface ScheduleItem {
  date: string;
  time: string;
  title: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  tags: string[];
  photoUrl: string;
  createdAt: string;
  location?: string;
  github?: string;
  website?: string;
  skills?: string[];
}

export interface Team {
  id: string;
  hackathonId: string;
  name: string;
  description: string;
  tags: string[];
  members: User[];
  maxMembers: number;
  createdBy: string;
  createdAt: string;
}

export interface SearchFilters {
  query: string;
  tags: string[];
  tab: 'all' | 'upcoming' | 'past';
}
