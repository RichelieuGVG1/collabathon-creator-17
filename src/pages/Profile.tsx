import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeIn, StaggerContainer } from '@/components/Animations';
import TeamCard from '@/components/TeamCard';
import { Calendar, MapPin, Mail, User, Users, Clock, Pencil } from 'lucide-react';

// Mock data for users
const users = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    bio: 'Machine Learning Engineer with a passion for AI and data science. Experienced in Python, TensorFlow, and building scalable ML systems.',
    tags: ['Python', 'ML', 'TensorFlow', 'Data Science', 'Cloud Computing'],
    photoUrl: '',
    createdAt: '2023-01-15',
    location: 'San Francisco, CA',
    github: 'alexj',
    website: 'https://alexj.dev',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Science', 'SQL', 'Cloud Computing', 'Docker', 'Git']
  },
  // other users...
];

// Mock data for a user's teams
const userTeams = [
  {
    id: '1',
    hackathonId: '1',
    name: 'Data Wizards',
    description: 'A team of data scientists and machine learning engineers building the next generation of AI tools.',
    tags: ['Python', 'TensorFlow', 'NLP'],
    members: [
      {id: '1', name: 'Alex Johnson', email: 'alex@example.com', bio: 'ML Engineer', tags: [], photoUrl: '', createdAt: '2023-01-15'},
      {id: '2', name: 'Sam Wilson', email: 'sam@example.com', bio: 'Data Scientist', tags: [], photoUrl: '', createdAt: '2023-02-10'},
      {id: '3', name: 'Taylor Kim', email: 'taylor@example.com', bio: 'AI Researcher', tags: [], photoUrl: '', createdAt: '2023-01-05'}
    ],
    maxMembers: 5,
    createdBy: '1',
    createdAt: '2023-08-01'
  }
];

// Mock data for hackathons (simplified)
const hackathons = [
  {
    id: '1',
    name: 'Global AI Innovation Hackathon'
  },
  {
    id: '2',
    name: 'Climate Tech Summit Challenge'
  },
  {
    id: '3',
    name: 'Web3 Development Hackathon'
  }
];

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('teams');
  
  // Find the user based on the URL param
  // If no ID provided, use the first user (as if it's the current user)
  const user = id ? users.find(u => u.id === id) : users[0];
  
  // If user not found
  if (!user) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <p className="text-muted-foreground mb-6">The user you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long'
    });
  };
  
  // Get hackathon name by ID
  const getHackathonName = (id: string) => {
    const hackathon = hackathons.find(h => h.id === id);
    return hackathon ? hackathon.name : 'Unknown Hackathon';
  };
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <FadeIn delay={100}>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <Avatar className="w-24 h-24 border border-border">
                <AvatarImage src={user.photoUrl} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground">
                      Member since {formatDate(user.createdAt)}
                    </p>
                  </div>
                  
                  {!id && (
                    <Button variant="outline" className="sm:w-auto gap-1">
                      <Pencil size={16} />
                      <span>Edit Profile</span>
                    </Button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {user.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="teams" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="teams" className="gap-1">
                  <Users size={16} />
                  <span>Teams</span>
                </TabsTrigger>
                <TabsTrigger value="about" className="gap-1">
                  <User size={16} />
                  <span>About</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="teams" className="animate-fade-in mt-6">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Teams</h2>
                  
                  {userTeams.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      <StaggerContainer initialDelay={200} staggerDelay={100}>
                        {userTeams.map((team, index) => (
                          <TeamCard 
                            key={team.id} 
                            team={team} 
                            index={index}
                            hackathonName={getHackathonName(team.hackathonId)} 
                          />
                        ))}
                      </StaggerContainer>
                    </div>
                  ) : (
                    <Card className="border border-dashed">
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="text-center space-y-3">
                          <h3 className="text-lg font-medium">No teams yet</h3>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            {id ? 
                              "This user hasn't joined any teams yet." : 
                              "You haven't joined any teams yet. Browse hackathons and join or create a team."}
                          </p>
                          {!id && (
                            <Link to="/hackathons">
                              <Button>Browse Hackathons</Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="about" className="animate-fade-in mt-6">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">About</h2>
                    <p className="text-muted-foreground">{user.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skills?.map((skill, index) => (
                        <Badge key={index} className="font-normal">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-80">
            <Card>
              <CardContent className="p-5 space-y-5">
                <h3 className="font-semibold">Contact Info</h3>
                
                <div className="space-y-4">
                  {user.location && (
                    <div className="flex items-start">
                      <MapPin size={18} className="mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Location</div>
                        <div className="text-sm text-muted-foreground">{user.location}</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <Mail size={18} className="mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Email</div>
                      <a href={`mailto:${user.email}`} className="text-sm text-primary hover:underline">
                        {user.email}
                      </a>
                    </div>
                  </div>
                  
                  {user.github && (
                    <div className="flex items-start">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="mr-3 text-muted-foreground mt-0.5 h-[18px] w-[18px]"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      <div>
                        <div className="font-medium text-sm">GitHub</div>
                        <a 
                          href={`https://github.com/${user.github}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          @{user.github}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {user.website && (
                    <div className="flex items-start">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="mr-3 text-muted-foreground mt-0.5 h-[18px] w-[18px]"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" x2="22" y1="12" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      <div>
                        <div className="font-medium text-sm">Website</div>
                        <a 
                          href={user.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {user.website.replace(/(^\w+:|^)\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                
                {id && (
                  <div className="pt-2">
                    <Button className="w-full">Invite to Team</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
