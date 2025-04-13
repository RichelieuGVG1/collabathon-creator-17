
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeIn, StaggerContainer } from '@/components/Animations';
import TeamCard from '@/components/TeamCard';
import { Calendar, MapPin, Mail, User, Users, Pencil } from 'lucide-react';
import { useUserStore, useAuthStore, useTeamStore, useHackathonStore } from '@/lib/store';
import EditProfileDialog from '@/components/EditProfileDialog';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('teams');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  const { getUserById } = useUserStore();
  const { currentUser, isAuthenticated, logout } = useAuthStore();
  const { teams } = useTeamStore();
  const { getHackathonById } = useHackathonStore();
  
  // Find the user based on the URL param or use the current user
  const isOwnProfile = !id; 
  const profileUserId = id || (currentUser ? currentUser.id : '');
  const user = getUserById(profileUserId);
  
  // Redirect to login if viewing own profile and not authenticated
  useEffect(() => {
    if (isOwnProfile && !isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isOwnProfile, isAuthenticated, navigate]);
  
  // If user not found
  if (!user) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Пользователь не найден</h1>
          <p className="text-muted-foreground mb-6">Пользователь, которого вы ищете, не существует или был удален.</p>
          <Link to="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Filter teams for this user
  const userTeams = teams.filter(team => team.members.some(member => member.id === user.id));
  
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
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric',
      month: 'long'
    });
  };
  
  // Get hackathon name by ID
  const getHackathonName = (id: string) => {
    const hackathon = getHackathonById(id);
    return hackathon ? hackathon.name : 'Неизвестный хакатон';
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
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
                      Участник с {formatDate(user.createdAt)}
                    </p>
                  </div>
                  
                  {isOwnProfile && (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="sm:w-auto gap-1"
                        onClick={() => setIsEditProfileOpen(true)}
                      >
                        <Pencil size={16} />
                        <span>Редактировать профиль</span>
                      </Button>
                      <Button variant="destructive" className="sm:w-auto" onClick={handleLogout}>
                        Выйти
                      </Button>
                    </div>
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
                  <span>Команды</span>
                </TabsTrigger>
                <TabsTrigger value="about" className="gap-1">
                  <User size={16} />
                  <span>О пользователе</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="teams" className="animate-fade-in mt-6">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Команды</h2>
                  
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
                          <h3 className="text-lg font-medium">Нет команд</h3>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            {isOwnProfile ? 
                              "Вы еще не присоединились ни к одной команде. Просмотрите хакатоны и присоединитесь или создайте команду." : 
                              "Этот пользователь еще не присоединился ни к одной команде."}
                          </p>
                          {isOwnProfile && (
                            <Link to="/hackathons">
                              <Button>Просмотреть хакатоны</Button>
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
                    <h2 className="text-2xl font-semibold mb-4">О пользователе</h2>
                    <p className="text-muted-foreground">{user.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Навыки и экспертиза</h3>
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
                <h3 className="font-semibold">Контактная информация</h3>
                
                <div className="space-y-4">
                  {user.location && (
                    <div className="flex items-start">
                      <MapPin size={18} className="mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Местоположение</div>
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
                        <div className="font-medium text-sm">Веб-сайт</div>
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
                
                {!isOwnProfile && (
                  <div className="pt-2">
                    <Button className="w-full">Пригласить в команду</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Edit Profile Dialog */}
      {isOwnProfile && user && (
        <EditProfileDialog 
          user={user} 
          open={isEditProfileOpen} 
          onOpenChange={setIsEditProfileOpen}
        />
      )}
    </div>
  );
};

export default Profile;
