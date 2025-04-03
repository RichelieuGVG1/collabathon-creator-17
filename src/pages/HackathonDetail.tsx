
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeIn, SlideUp, StaggerContainer } from '@/components/Animations';
import TeamCard from '@/components/TeamCard';
import { Calendar, MapPin, Users, Clock, Globe, Building, ChevronLeft, Plus } from 'lucide-react';
import { useHackathonStore, useTeamStore, useAuthStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

const HackathonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('info');
  
  const { getHackathonById } = useHackathonStore();
  const { teams, getTeamsByHackathonId } = useTeamStore();
  const { isAuthenticated } = useAuthStore();
  
  // Find the hackathon based on the URL param
  const hackathon = id ? getHackathonById(id) : undefined;
  
  // Filter teams for this hackathon
  const hackathonTeams = id ? getTeamsByHackathonId(id) : [];
  
  // If hackathon not found
  if (!hackathon) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Хакатон не найден</h1>
          <p className="text-muted-foreground mb-6">Хакатон, который вы ищете, не существует или был удален.</p>
          <Link to="/hackathons">
            <Button>Вернуться к хакатонам</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Format date range
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return `${startDate.toLocaleDateString('ru-RU', options)} - ${endDate.toLocaleDateString('ru-RU', options)}`;
  };

  const handleCreateTeam = () => {
    if (!isAuthenticated) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите в аккаунт, чтобы создать команду",
      });
      navigate('/auth/login');
      return;
    }
    
    navigate(`/teams/create?hackathon=${id}`);
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
            <span>Назад к хакатонам</span>
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
                <span>{hackathon.teamSize.min}-{hackathon.teamSize.max} участников в команде</span>
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
                <TabsTrigger value="info">Информация</TabsTrigger>
                <TabsTrigger value="teams">Команды</TabsTrigger>
                <TabsTrigger value="schedule">Расписание</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-6 animate-fade-in">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Об этом хакатоне</h2>
                    <div className="text-muted-foreground space-y-4">
                      {hackathon.description.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Призы</h3>
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
                    <h2 className="text-2xl font-semibold">Команды</h2>
                    <Button 
                      className="gap-1"
                      onClick={handleCreateTeam}
                    >
                      <Plus size={16} />
                      <span>Создать команду</span>
                    </Button>
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
                          <h3 className="text-lg font-medium">Пока нет команд</h3>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            Будьте первым, кто создаст команду для этого хакатона и начнет искать участников!
                          </p>
                          <Button 
                            onClick={handleCreateTeam}
                          >
                            Создать команду
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6">Расписание мероприятия</h2>
                
                <div className="space-y-6">
                  {hackathon.schedule?.map((item, index) => {
                    const date = new Date(item.date);
                    const formattedDate = date.toLocaleDateString('ru-RU', { 
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
                <h3 className="font-semibold">Краткая информация</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar size={18} className="mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Дата</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDateRange(hackathon.startDate, hackathon.endDate)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin size={18} className="mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Место проведения</div>
                      <div className="text-sm text-muted-foreground">{hackathon.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users size={18} className="mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Размер команды</div>
                      <div className="text-sm text-muted-foreground">
                        от {hackathon.teamSize.min} до {hackathon.teamSize.max} участников
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Building size={18} className="mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Организатор</div>
                      <div className="text-sm text-muted-foreground">{hackathon.organizerName}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Globe size={18} className="mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Сайт</div>
                      <a 
                        href={hackathon.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Посетить официальный сайт
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    className="w-full gap-1"
                    onClick={handleCreateTeam}
                  >
                    <Plus size={16} />
                    <span>Создать команду</span>
                  </Button>
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
