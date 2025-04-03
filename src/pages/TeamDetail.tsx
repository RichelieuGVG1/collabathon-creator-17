
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeIn, SlideUp, StaggerContainer } from '@/components/Animations';
import UserCard from '@/components/UserCard';
import { ArrowLeft, Users, Calendar, Copy, ChevronLeft } from 'lucide-react';
import { useTeamStore, useHackathonStore, useAuthStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

const TeamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('about');
  
  const { getTeamById, joinTeam, leaveTeam } = useTeamStore();
  const { getHackathonById } = useHackathonStore();
  const { isAuthenticated, currentUser } = useAuthStore();
  
  // Find the team based on the URL param
  const team = id ? getTeamById(id) : undefined;
  
  // If team not found
  if (!team) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Команда не найдена</h1>
          <p className="text-muted-foreground mb-6">Команда, которую вы ищете, не существует или была удалена.</p>
          <Link to="/teams">
            <Button>Вернуться к командам</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Get hackathon details
  const hackathon = getHackathonById(team.hackathonId);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Check if user is a member of the team
  const isMember = isAuthenticated && currentUser 
    ? team.members.some(member => member.id === currentUser.id)
    : false;
  
  // Check if user is the team creator
  const isCreator = isAuthenticated && currentUser 
    ? team.createdBy === currentUser.id
    : false;
  
  // Check if team is full
  const isTeamFull = team.members.length >= team.maxMembers;
  
  // Handle join team
  const handleJoinTeam = () => {
    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите в аккаунт, чтобы присоединиться к команде",
        variant: "destructive",
      });
      navigate('/auth/login');
      return;
    }
    
    if (isTeamFull) {
      toast({
        title: "Команда заполнена",
        description: "В этой команде уже максимальное количество участников",
        variant: "destructive",
      });
      return;
    }
    
    const success = joinTeam(team.id, currentUser.id);
    
    if (success) {
      toast({
        title: "Успешно!",
        description: "Вы присоединились к команде",
      });
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось присоединиться к команде",
        variant: "destructive",
      });
    }
  };
  
  // Handle leave team
  const handleLeaveTeam = () => {
    if (!isAuthenticated || !currentUser) return;
    
    // Creator can't leave their team
    if (isCreator) {
      toast({
        title: "Действие недоступно",
        description: "Создатель не может покинуть команду",
        variant: "destructive",
      });
      return;
    }
    
    const success = leaveTeam(team.id, currentUser.id);
    
    if (success) {
      toast({
        title: "Успешно!",
        description: "Вы вышли из команды",
      });
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось выйти из команды",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link to="/teams" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ChevronLeft size={16} className="mr-1" />
          <span>Вернуться к списку команд</span>
        </Link>
        
        {/* Team Header */}
        <FadeIn delay={100}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{team.name}</h1>
              
              {hackathon && (
                <Link 
                  to={`/hackathons/${hackathon.id}`}
                  className="text-primary hover:underline inline-flex items-center mb-2"
                >
                  <span>{hackathon.name}</span>
                </Link>
              )}
              
              <div className="flex flex-wrap gap-1 mb-3">
                {team.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              {!isMember && !isTeamFull && (
                <Button
                  onClick={handleJoinTeam}
                  className="gap-1"
                >
                  <Users size={16} />
                  <span>Присоединиться</span>
                </Button>
              )}
              
              {isMember && !isCreator && (
                <Button
                  variant="outline"
                  onClick={handleLeaveTeam}
                >
                  Покинуть команду
                </Button>
              )}
              
              {isCreator && (
                <Button
                  variant="outline"
                >
                  Редактировать команду
                </Button>
              )}
            </div>
          </div>
        </FadeIn>
        
        {/* Team Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="about">О команде</TabsTrigger>
                <TabsTrigger value="members">Участники ({team.members.length}/{team.maxMembers})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6 animate-fade-in">
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Описание команды</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{team.description}</p>
                    </CardContent>
                  </Card>
                  
                  {hackathon && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">О хакатоне</h3>
                        <p className="text-muted-foreground mb-4">{hackathon.description}</p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                          <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-muted-foreground" />
                            <span>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Users size={18} className="text-muted-foreground" />
                            <span>{hackathon.teamSize.min}-{hackathon.teamSize.max} участников в команде</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Link to={`/hackathons/${hackathon.id}`}>
                            <Button variant="outline">Подробнее о хакатоне</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="members" className="mt-6 animate-fade-in">
                <div className="space-y-6">
                  <StaggerContainer initialDelay={100} staggerDelay={100}>
                    {team.members.map((member, index) => (
                      <UserCard key={member.id} user={member} index={index} />
                    ))}
                  </StaggerContainer>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div>
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Статус команды</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={isTeamFull ? "destructive" : "success"} className="font-normal">
                      {isTeamFull ? "Команда заполнена" : "Набор открыт"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {team.members.length}/{team.maxMembers}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Участники</h3>
                  <div className="space-y-3">
                    {team.members.map((member, index) => (
                      <Link
                        key={member.id}
                        to={`/profile/${member.id}`}
                        className="flex items-center p-2 rounded-md hover:bg-secondary/50 transition-colors"
                      >
                        <Avatar className="mr-3 h-8 w-8">
                          <AvatarImage src={member.photoUrl} alt={member.name} />
                          <AvatarFallback className="text-xs">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{member.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {index === 0 ? "Создатель команды" : "Участник"}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Информация</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span>Создана {formatDate(team.createdAt)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Copy size={16} className="text-muted-foreground" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast({
                            title: "Ссылка скопирована",
                            description: "Ссылка на команду скопирована в буфер обмена"
                          });
                        }}
                      >
                        Скопировать ссылку
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
