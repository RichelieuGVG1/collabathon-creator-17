
export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  tags: string[];
  photoUrl: string;
  createdAt: string;
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
