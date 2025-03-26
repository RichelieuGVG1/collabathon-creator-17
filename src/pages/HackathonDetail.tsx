
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeIn, SlideUp, StaggerContainer } from '@/components/Animations';
import TeamCard from '@/components/TeamCard';
import { Calendar, MapPin, Users, Clock, Globe, Building, ChevronLeft, Plus } from 'lucide-react';

// Mock data - using the data from Hackathons page
const hackathons = [
  {
    id: '1',
    name: 'Global AI Innovation Hackathon',
    description: 'Join the world\'s largest AI hackathon and build solutions that will shape the future of artificial intelligence. Participants will tackle real-world challenges and develop cutting-edge AI applications that could potentially transform industries.\n\nThis hackathon is perfect for AI enthusiasts, machine learning engineers, data scientists, and anyone interested in pushing the boundaries of what AI can achieve. Whether you\'re a seasoned professional or just starting out in the field, this event offers valuable opportunities to learn, network, and showcase your talents.',
    startDate: '2023-09-15',
    endDate: '2023-09-18',
    location: 'Virtual',
    tags: ['AI', 'Machine Learning', 'Innovation'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'AI Alliance',
    organizerLogo: 'https://via.placeholder.com/40',
    teamSize: {
      min: 2,
      max: 5
    },
    website: 'https://example.com/hackathon',
    prizes: [
      {
        place: '1st',
        description: '$10,000 cash prize + AI computing credits',
      },
      {
        place: '2nd',
        description: '$5,000 cash prize + mentorship opportunities',
      },
      {
        place: '3rd',
        description: '$2,500 cash prize + product licenses',
      }
    ],
    schedule: [
      {
        date: '2023-09-15',
        time: '10:00 AM - 11:00 AM',
        title: 'Opening Ceremony',
        description: 'Welcome address and introduction to the hackathon challenges.'
      },
      {
        date: '2023-09-15',
        time: '11:30 AM - 12:30 PM',
        title: 'Team Formation',
        description: 'Networking session for participants to form teams.'
      },
      {
        date: '2023-09-15',
        time: '1:00 PM',
        title: 'Hacking Begins',
        description: 'Start building your projects!'
      },
      {
        date: '2023-09-17',
        time: '5:00 PM',
        title: 'Submissions Due',
        description: 'All project submissions must be completed by this time.'
      },
      {
        date: '2023-09-18',
        time: '10:00 AM - 1:00 PM',
        title: 'Project Presentations',
        description: 'Teams present their projects to judges and other participants.'
      },
      {
        date: '2023-09-18',
        time: '3:00 PM - 4:00 PM',
        title: 'Awards Ceremony',
        description: 'Announcement of winners and prize distribution.'
      }
    ]
  },
  // Additional hackathons...
];

// Mock teams for this hackathon
const teams = [
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
  },
  {
    id: '3',
    hackathonId: '1',
    name: 'AI Innovators',
    description: 'Focused on developing innovative AI solutions with practical applications in healthcare and education.',
    tags: ['AI', 'Healthcare', 'Education'],
    members: [
      {id: '6', name: 'Riley Chen', email: 'riley@example.com', bio: 'AI Specialist', tags: [], photoUrl: '', createdAt: '2023-02-05'},
      {id: '7', name: 'Jordan Lee', email: 'jordan@example.com', bio: 'Backend Developer', tags: [], photoUrl: '', createdAt: '2023-03-15'}
    ],
    maxMembers: 4,
    createdBy: '6',
    createdAt: '2023-08-10'
  }
];

const HackathonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('info');
  
  // Find the hackathon based on the URL param
  const hackathon = hackathons.find(h => h.id === id);
  
  // If hackathon not found
  if (!hackathon) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Hackathon not found</h1>
          <p className="text-muted-foreground mb-6">The hackathon you're looking for doesn't exist or has been removed.</p>
          <Link to="/hackathons">
            <Button>Back to Hackathons</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Filter teams for this hackathon
  const hackathonTeams = teams.filter(team => team.hackathonId === hackathon.id);
  
  // Format date range
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
  };
  
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div 
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${hackathon.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="container mx-auto px-4 h-full relative flex flex-col justify-end pb-8">
          <Link to="/hackathons" className="text-white hover:text-white/80 transition-colors mb-auto mt-6 flex items-center">
            <ChevronLeft size={16} className="mr-1" />
            <span>Back to Hackathons</span>
          </Link>
          
          <FadeIn>
            <div className="flex items-center mb-2">
              <div className="bg-white/90 backdrop-blur-sm p-1 rounded-md mr-3">
                <img 
                  src={hackathon.organizerLogo}
                  alt={hackathon.organizerName}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-white/80 text-sm">{hackathon.organizerName}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {hackathon.name}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {hackathon.tags.map((tag, index) => (
                <Badge key={index} className="bg-white/10 hover:bg-white/20 text-white border-none">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 text-white/80 text-sm">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{formatDateRange(hackathon.startDate, hackathon.endDate)}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>{hackathon.location}</span>
              </div>
              
              <div className="flex items-center">
                <Users size={16} className="mr-2" />
                <span>{hackathon.teamSize.min}-{hackathon.teamSize.max} members per team</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="info">Information</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-6 animate-fade-in">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">About this Hackathon</h2>
                    <div className="text-muted-foreground space-y-4">
                      {hackathon.description.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Prizes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {hackathon.prizes?.map((prize, index) => (
                        <Card key={index} className={index === 0 ? "border-primary/30 bg-primary/5" : ""}>
                          <CardContent className="p-5">
                            <h4 className="font-semibold text-lg mb-2">{prize.place}</h4>
                            <p className="text-sm text-muted-foreground">{prize.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="teams" className="mt-6 animate-fade-in">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Teams</h2>
                    <Link to="/teams/create">
                      <Button className="gap-1">
                        <Plus size={16} />
                        <span>Create Team</span>
                      </Button>
                    </Link>
                  </div>
                  
                  {hackathonTeams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <StaggerContainer initialDelay={200} staggerDelay={100}>
                        {hackathonTeams.map((team, index) => (
                          <TeamCard key={team.id} team={team} index={index} />
                        ))}
                      </StaggerContainer>
                    </div>
                  ) : (
                    <Card className="border border-dashed">
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="text-center space-y-3">
                          <h3 className="text-lg font-medium">No teams yet</h3>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            Be the first to create a team for this hackathon and start looking for teammates!
                          </p>
                          <Link to="/teams/create">
                            <Button>Create a Team</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6">Event Schedule</h2>
                
                <div className="space-y-6">
                  {hackathon.schedule?.map((item, index) => {
                    const date = new Date(item.date);
                    const formattedDate = date.toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'long', 
                      day: 'numeric' 
                    });
                    
                    return (
                      <div key={index} className="flex">
                        <div className="mr-4 relative">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock size={20} className="text-primary" />
                          </div>
                          {index < hackathon.schedule.length - 1 && (
                            <div className="absolute top-10 bottom-0 left-1/2 w-px -ml-px bg-border"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 pb-6">
                          <div className="font-medium">{formattedDate}</div>
                          <div className="text-sm text-muted-foreground mb-2">{item.time}</div>
                          <div className="bg-secondary/50 rounded-lg p-4">
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-6">
            <Card>
              <CardContent className="p-5 space-y-5">
                <h3 className="font-semibold">Quick Info</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar size={18} className="mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Date</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDateRange(hackathon.startDate, hackathon.endDate)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin size={18} className="mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Location</div>
                      <div className="text-sm text-muted-foreground">{hackathon.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users size={18} className="mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Team Size</div>
                      <div className="text-sm text-muted-foreground">
                        {hackathon.teamSize.min} to {hackathon.teamSize.max} members
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Building size={18} className="mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Organizer</div>
                      <div className="text-sm text-muted-foreground">{hackathon.organizerName}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Globe size={18} className="mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Website</div>
                      <a 
                        href={hackathon.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Visit Official Website
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Link to="/teams/create">
                    <Button className="w-full gap-1">
                      <Plus size={16} />
                      <span>Create a Team</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetail;
