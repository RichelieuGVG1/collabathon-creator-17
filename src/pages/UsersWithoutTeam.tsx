
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerContainer } from '@/components/Animations';
import { useUserStore, useTeamStore, useAuthStore } from '@/lib/store';
import UserCard from '@/components/UserCard';
import { Search, Filter, Plus, X, ArrowLeft } from 'lucide-react';

const UsersWithoutTeam = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { users, getUsersWithoutTeam } = useUserStore();
  const { getTeamById } = useTeamStore();
  const { currentUser } = useAuthStore();
  const team = teamId ? getTeamById(teamId) : null;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get all users without team
  const usersWithoutTeam = getUsersWithoutTeam();
  
  // Get all available tags from users
  const allTags = Array.from(
    new Set(usersWithoutTeam.flatMap(user => user.tags))
  ).sort();
  
  // Filter users based on search query and filters
  const filteredUsers = usersWithoutTeam.filter(user => {
    // Search filter
    const matchesSearch = 
      searchQuery === '' ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.location && user.location.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Tag filters
    const matchesFilters = 
      activeFilters.length === 0 ||
      user.tags.some(tag => activeFilters.includes(tag));
    
    return matchesSearch && matchesFilters;
  });
  
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
  };
  
  // Check if user can invite
  const canInvite = teamId && team && currentUser && (team.createdBy === currentUser.id || team.members.some(m => m.id === currentUser.id));
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              {teamId && (
                <div className="mb-4">
                  <Link to={`/teams/${teamId}`} className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4">
                    <ArrowLeft size={16} className="mr-1" />
                    <span>Вернуться к команде</span>
                  </Link>
                </div>
              )}
              
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                {teamId 
                  ? `Пригласить участников в "${team?.name}"` 
                  : "Участники без команды"}
              </h1>
              <p className="text-muted-foreground">
                {teamId 
                  ? "Пригласите талантливых участников присоединиться к вашей команде"
                  : "Найдите участников, которые еще не состоят в команде"}
              </p>
            </div>
          </div>
        </FadeIn>
        
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Поиск участников..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>Фильтры</span>
              {activeFilters.length > 0 && (
                <Badge className="ml-1 bg-primary text-primary-foreground">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="bg-secondary/50 rounded-lg p-4 mb-6 animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Фильтр по тегам</h3>
                {activeFilters.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                    Очистить все
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
          )}
          
          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
              <span className="text-sm text-muted-foreground">Активные фильтры:</span>
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
                Очистить все
              </Button>
            </div>
          )}
        </div>
        
        {/* User Listing */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggerContainer initialDelay={200} staggerDelay={100}>
              {filteredUsers.map((user, index) => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  index={index}
                  showAddButton={canInvite}
                  teamId={teamId}
                />
              ))}
            </StaggerContainer>
          </div>
        ) : (
          <Card className="border border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-12">
              <div className="text-center space-y-3">
                <h3 className="text-lg font-medium">Участники не найдены</h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить параметры поиска или фильтры, чтобы найти то, что вы ищете.
                </p>
                {activeFilters.length > 0 || searchQuery ? (
                  <Button variant="outline" onClick={clearFilters}>
                    Очистить все фильтры
                  </Button>
                ) : (
                  <p className="text-muted-foreground">
                    Похоже, все участники уже состоят в командах.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UsersWithoutTeam;
