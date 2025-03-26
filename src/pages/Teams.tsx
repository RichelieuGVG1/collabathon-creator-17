
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerContainer } from '@/components/Animations';
import { Team, Hackathon } from '@/types';
import TeamCard from '@/components/TeamCard';
import { Search, Filter, Plus, X } from 'lucide-react';

// Mock data for teams
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
    id: '2',
    hackathonId: '2',
    name: 'EcoSolutions',
    description: 'Passionate about creating technology that helps combat climate change and promote sustainability.',
    tags: ['CleanTech', 'IoT', 'React'],
    members: [
      {id: '4', name: 'Jamie Smith', email: 'jamie@example.com', bio: 'Full-stack Developer', tags: [], photoUrl: '', createdAt: '2023-01-15'},
      {id: '5', name: 'Casey Brown', email: 'casey@example.com', bio: 'UX Designer', tags: [], photoUrl: '', createdAt: '2023-03-20'}
    ],
    maxMembers: 4,
    createdBy: '4',
    createdAt: '2023-08-15'
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
  },
  {
    id: '4',
    hackathonId: '3',
    name: 'Blockchain Pioneers',
    description: 'Building the future of decentralized applications and Web3 technologies.',
    tags: ['Blockchain', 'Smart Contracts', 'Web3'],
    members: [
      {id: '8', name: 'Morgan Lewis', email: 'morgan@example.com', bio: 'Blockchain Developer', tags: [], photoUrl: '', createdAt: '2023-04-10'},
      {id: '9', name: 'Dana Park', email: 'dana@example.com', bio: 'Product Manager', tags: [], photoUrl: '', createdAt: '2023-05-15'},
      {id: '10', name: 'Avery Roberts', email: 'avery@example.com', bio: 'Smart Contract Developer', tags: [], photoUrl: '', createdAt: '2023-06-20'}
    ],
    maxMembers: 5,
    createdBy: '8',
    createdAt: '2023-08-20'
  }
];

// Mock data for hackathons (simplified)
const hackathons: Hackathon[] = [
  {
    id: '1',
    name: 'Global AI Innovation Hackathon',
    description: '',
    startDate: '2023-09-15',
    endDate: '2023-09-18',
    location: 'Virtual',
    tags: [],
    imageUrl: '',
    organizerName: '',
    organizerLogo: '',
    teamSize: { min: 0, max: 0 }
  },
  {
    id: '2',
    name: 'Climate Tech Summit Challenge',
    description: '',
    startDate: '2023-10-05',
    endDate: '2023-10-07',
    location: '',
    tags: [],
    imageUrl: '',
    organizerName: '',
    organizerLogo: '',
    teamSize: { min: 0, max: 0 }
  },
  {
    id: '3',
    name: 'Web3 Development Hackathon',
    description: '',
    startDate: '2023-11-12',
    endDate: '2023-11-14',
    location: '',
    tags: [],
    imageUrl: '',
    organizerName: '',
    organizerLogo: '',
    teamSize: { min: 0, max: 0 }
  }
];

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [hackathonFilter, setHackathonFilter] = useState<string>('');

  // Filter teams based on search query and filters
  const filteredTeams = teams.filter(team => {
    // Search filter
    const matchesSearch = 
      searchQuery === '' ||
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Tag filters
    const matchesFilters = 
      activeFilters.length === 0 ||
      team.tags.some(tag => activeFilters.includes(tag));
    
    // Hackathon filter
    const matchesHackathon =
      hackathonFilter === '' ||
      team.hackathonId === hackathonFilter;
    
    return matchesSearch && matchesFilters && matchesHackathon;
  });

  // All available tags from teams
  const allTags = Array.from(
    new Set(teams.flatMap(team => team.tags))
  ).sort();

  // Toggle filter
  const toggleFilter = (tag: string) => {
    if (activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter(t => t !== tag));
    } else {
      setActiveFilters([...activeFilters, tag]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
    setHackathonFilter('');
  };

  // Get hackathon name by ID
  const getHackathonName = (id: string) => {
    const hackathon = hackathons.find(h => h.id === id);
    return hackathon ? hackathon.name : 'Unknown Hackathon';
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Teams</h1>
              <p className="text-muted-foreground">
                Find a team to join or create your own
              </p>
            </div>
            <Link to="/teams/create" className="mt-4 sm:mt-0">
              <Button className="gap-1">
                <Plus size={16} />
                <span>Create Team</span>
              </Button>
            </Link>
          </div>
        </FadeIn>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search teams..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                const filtersEl = document.getElementById('team-filters');
                filtersEl?.classList.toggle('hidden');
              }}
            >
              <Filter size={16} />
              <span>Filters</span>
              {(activeFilters.length > 0 || hackathonFilter) && (
                <Badge className="ml-1 bg-primary text-primary-foreground">
                  {activeFilters.length + (hackathonFilter ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filters */}
          <div id="team-filters" className="hidden bg-secondary/50 rounded-lg p-4 mb-6 animate-fade-in">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Filter by hackathon</h3>
                {hackathonFilter && (
                  <Button variant="ghost" size="sm" onClick={() => setHackathonFilter('')} className="h-7 text-xs">
                    Clear
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {hackathons.map(hackathon => (
                  <Badge
                    key={hackathon.id}
                    variant={hackathonFilter === hackathon.id ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setHackathonFilter(prevFilter => 
                      prevFilter === hackathon.id ? '' : hackathon.id
                    )}
                  >
                    {hackathon.name}
                    {hackathonFilter === hackathon.id && (
                      <X size={14} className="ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Filter by skills/technologies</h3>
                {activeFilters.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])} className="h-7 text-xs">
                    Clear
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={activeFilters.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(tag)}
                  >
                    {tag}
                    {activeFilters.includes(tag) && (
                      <X size={14} className="ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
            
            {(activeFilters.length > 0 || hackathonFilter) && (
              <div className="mt-4 text-right">
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {(activeFilters.length > 0 || hackathonFilter) && (
            <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              
              {hackathonFilter && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 pl-2 pr-1"
                >
                  {getHackathonName(hackathonFilter)}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-secondary"
                    onClick={() => setHackathonFilter('')}
                  >
                    <X size={12} />
                  </Button>
                </Badge>
              )}
              
              {activeFilters.map(filter => (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="flex items-center gap-1 pl-2 pr-1"
                >
                  {filter}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-secondary"
                    onClick={() => toggleFilter(filter)}
                  >
                    <X size={12} />
                  </Button>
                </Badge>
              ))}
              
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Team Listing */}
        {filteredTeams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggerContainer initialDelay={200} staggerDelay={100}>
              {filteredTeams.map((team, index) => (
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
            <CardContent className="flex flex-col items-center justify-center p-12">
              <div className="text-center space-y-3">
                <h3 className="text-lg font-medium">No teams found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for, or create a new team.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                  <Link to="/teams/create">
                    <Button>Create a Team</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Teams;
