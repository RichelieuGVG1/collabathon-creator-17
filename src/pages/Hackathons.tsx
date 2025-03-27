
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeIn, StaggerContainer } from '@/components/Animations';
import { Hackathon } from '@/types';
import HackathonCard from '@/components/HackathonCard';
import { Search, Filter, Calendar, MapPin, X } from 'lucide-react';

// Mock data (expanded from Index page)
const hackathons: Hackathon[] = [
  {
    id: '1',
    name: 'Глобальный хакатон инноваций в ИИ',
    description: 'Присоединяйтесь к крупнейшему хакатону по искусственному интеллекту и создавайте решения, которые будут формировать будущее ИИ.',
    startDate: '2023-09-15',
    endDate: '2023-09-18',
    location: 'Виртуально',
    tags: ['ИИ', 'Машинное обучение', 'Инновации'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Альянс ИИ',
    organizerLogo: 'https://via.placeholder.com/40',
    teamSize: {
      min: 2,
      max: 5
    }
  },
  {
    id: '2',
    name: 'Саммит технологий для климата',
    description: 'Разработка инновационных решений для борьбы с изменением климата и экологическими проблемами с помощью технологий.',
    startDate: '2023-10-05',
    endDate: '2023-10-07',
    location: 'Сан-Франциско, Калифорния',
    tags: ['ЭкоТехнологии', 'Устойчивое развитие', 'Экология'],
    imageUrl: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Альянс Климата',
    organizerLogo: 'https://via.placeholder.com/40',
    teamSize: {
      min: 3,
      max: 6
    }
  },
  {
    id: '3',
    name: 'Хакатон разработки Web3',
    description: 'Расширяйте границы блокчейн-технологий, создавая инновационные dApps и решения Web3.',
    startDate: '2023-11-12',
    endDate: '2023-11-14',
    location: 'Виртуально',
    tags: ['Блокчейн', 'Web3', 'Крипто'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Блокчейн Фонд',
    organizerLogo: 'https://via.placeholder.com/40',
    teamSize: {
      min: 2,
      max: 4
    }
  },
  {
    id: '4',
    name: 'Инновационный вызов в сфере здравоохранения',
    description: 'Создавайте решения, использующие технологии для улучшения предоставления медицинской помощи, результатов лечения пациентов и медицинских исследований.',
    startDate: '2023-09-25',
    endDate: '2023-09-27',
    location: 'Бостон, Массачусетс',
    tags: ['Здравоохранение', 'ИИ', 'IoT'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Инициатива МедТех',
    organizerLogo: 'https://via.placeholder.com/40',
    teamSize: {
      min: 2,
      max: 5
    }
  },
  {
    id: '5',
    name: 'Хакатон образовательных технологий',
    description: 'Переосмыслите будущее образования через инновационные технологические решения, которые улучшают процесс обучения.',
    startDate: '2023-10-15',
    endDate: '2023-10-17',
    location: 'Чикаго, Иллинойс',
    tags: ['ОбрТех', 'ИИ', 'UX Дизайн'],
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2332&q=80',
    organizerName: 'Альянс ОбрТех',
    organizerLogo: 'https://via.placeholder.com/40',
    teamSize: {
      min: 3,
      max: 5
    }
  },
  {
    id: '6',
    name: 'Финтех-вызов',
    description: 'Создавайте инновационные финансово-технологические решения, которые могут трансформировать банковское дело, платежи, инвестиции и многое другое.',
    startDate: '2023-11-05',
    endDate: '2023-11-07',
    location: 'Нью-Йорк, штат Нью-Йорк',
    tags: ['Финтех', 'Блокчейн', 'Безопасность'],
    imageUrl: 'https://images.unsplash.com/photo-1642543348745-755807f00628?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80',
    organizerName: 'Лаборатория финансовых инноваций',
    organizerLogo: 'https://via.placeholder.com/40',
    teamSize: {
      min: 2,
      max: 4
    }
  }
];

const Hackathons = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // Filter hackathons based on search query, filters, and active tab
  const filteredHackathons = hackathons.filter(hackathon => {
    // Search filter
    const matchesSearch = 
      searchQuery === '' ||
      hackathon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Tag filters
    const matchesFilters = 
      activeFilters.length === 0 ||
      hackathon.tags.some(tag => activeFilters.includes(tag));
    
    // Tab filter
    const today = new Date();
    const startDate = new Date(hackathon.startDate);
    
    if (activeTab === 'upcoming') {
      return matchesSearch && matchesFilters && startDate > today;
    } else if (activeTab === 'past') {
      return matchesSearch && matchesFilters && startDate < today;
    } else {
      return matchesSearch && matchesFilters;
    }
  });

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
              onClick={() => {
                const filtersEl = document.getElementById('filters');
                filtersEl?.classList.toggle('hidden');
              }}
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
          <div id="filters" className="hidden bg-secondary/50 rounded-lg p-4 mb-6 animate-fade-in">
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
