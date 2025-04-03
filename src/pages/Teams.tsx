
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerContainer } from '@/components/Animations';
import { useTeamStore, useHackathonStore } from '@/lib/store';
import TeamCard from '@/components/TeamCard';
import { Search, Filter, Plus, X } from 'lucide-react';

const Teams = () => {
  const { teams } = useTeamStore();
  const { hackathons, getHackathonById } = useHackathonStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get hackathon names by their IDs
  const getHackathonName = (hackathonId: string): string => {
    const hackathon = getHackathonById(hackathonId);
    return hackathon ? hackathon.name : 'Неизвестный хакатон';
  };
  
  // Get all available tags from teams
  const allTags = Array.from(
    new Set(teams.flatMap(team => team.tags))
  ).sort();
  
  // Filter teams based on search query and filters
  const filteredTeams = teams.filter(team => {
    // Search filter
    const matchesSearch = 
      searchQuery === '' ||
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      getHackathonName(team.hackathonId).toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tag filters
    const matchesFilters = 
      activeFilters.length === 0 ||
      team.tags.some(tag => activeFilters.includes(tag));
    
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
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Команды</h1>
              <p className="text-muted-foreground">
                Найдите или создайте команду для участия в хакатонах
              </p>
            </div>
            
            <Link to="/teams/create">
              <Button className="sm:w-auto gap-1">
                <Plus size={16} />
                <span>Создать команду</span>
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
                placeholder="Поиск команд..."
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
                <h3 className="text-lg font-medium">Команды не найдены</h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить параметры поиска или фильтры, чтобы найти то, что вы ищете.
                </p>
                {activeFilters.length > 0 || searchQuery ? (
                  <Button variant="outline" onClick={clearFilters}>
                    Очистить все фильтры
                  </Button>
                ) : (
                  <Link to="/teams/create">
                    <Button>Создать команду</Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Teams;
