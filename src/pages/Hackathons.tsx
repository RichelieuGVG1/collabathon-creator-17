
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeIn, StaggerContainer } from '@/components/Animations';
import { Hackathon } from '@/types';
import HackathonCard from '@/components/HackathonCard';
import { Search, Filter, Calendar, MapPin, X } from 'lucide-react';
import { useHackathonStore } from '@/lib/store';

const Hackathons = () => {
  const { hackathons, searchHackathons } = useHackathonStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [filteredHackathons, setFilteredHackathons] = useState<Hackathon[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Update filtered hackathons when query, filters, or tab changes
  useEffect(() => {
    // Filter hackathons based on search query and filters
    const filtered = searchHackathons(searchQuery, activeFilters);
    
    // Apply tab filter
    const today = new Date();
    
    const tabFiltered = filtered.filter(hackathon => {
      const startDate = new Date(hackathon.startDate);
      
      if (activeTab === 'upcoming') {
        return startDate > today;
      } else if (activeTab === 'past') {
        return startDate < today;
      } else {
        return true;
      }
    });
    
    setFilteredHackathons(tabFiltered);
  }, [searchQuery, activeFilters, activeTab, hackathons, searchHackathons]);

  // All available tags from hackathons
  const allTags = Array.from(
    new Set(hackathons.flatMap(hackathon => hackathon.tags))
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
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <FadeIn delay={100}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Хакатоны</h1>
          <p className="text-muted-foreground mb-8">
            Откройте для себя и присоединяйтесь к хакатонам со всего мира
          </p>
        </FadeIn>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Поиск хакатонов..."
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

        {/* Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">Все хакатоны</TabsTrigger>
            <TabsTrigger value="upcoming">Предстоящие</TabsTrigger>
            <TabsTrigger value="past">Прошедшие</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Hackathon Listing */}
        {filteredHackathons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StaggerContainer initialDelay={200} staggerDelay={100}>
              {filteredHackathons.map((hackathon, index) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} index={index} />
              ))}
            </StaggerContainer>
          </div>
        ) : (
          <Card className="border border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-12">
              <div className="text-center space-y-3">
                <h3 className="text-lg font-medium">Хакатоны не найдены</h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить параметры поиска или фильтры, чтобы найти то, что вы ищете.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Очистить все фильтры
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Hackathons;
