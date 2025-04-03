import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeIn } from '@/components/Animations';
import { useAuthStore, useTeamStore, useUserStore } from '@/lib/store';
import { MapPin, Globe, Github, Calendar } from 'lucide-react';
import TeamInvitations from '@/components/TeamInvitations';

const Profile = () => {
  const { id } = useParams();
  const { users, getUserById } = useUserStore();
  const { currentUser } = useAuthStore();
  const { teams } = useTeamStore();
  const [activeTab, setActiveTab] = useState('info');
  
  // Find the user either by ID or use current user
  const profileUser = id ? getUserById(id) : currentUser;
  
  // Check if viewing own profile
  const isOwnProfile = currentUser && (!id || id === currentUser.id);
  
  if (!profileUser) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Пользователь не найден</h1>
          <p className="text-muted-foreground">
            Запрашиваемый профиль не существует или был удален.
          </p>
        </div>
      </div>
    );
  }
  
  // Get teams for user
  const userTeams = teams.filter(team => 
    team.members.some(member => member.id === profileUser.id)
  );
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Profile Header */}
              <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                  <AvatarImage src={profileUser.photoUrl} alt={profileUser.name} />
                  <AvatarFallback>{profileUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                {isOwnProfile && (
                  <Button variant="outline" className="mt-4 w-full">
                    Редактировать профиль
                  </Button>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{profileUser.name}</h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {profileUser.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {profileUser.bio}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                  {profileUser.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{profileUser.location}</span>
                    </div>
                  )}
                  
                  {profileUser.website && (
                    <div className="flex items-center gap-1">
                      <Globe size={16} />
                      <a 
                        href={profileUser.website.startsWith('http') ? profileUser.website : `https://${profileUser.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {profileUser.website.replace(/https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                  )}
                  
                  {profileUser.github && (
                    <div className="flex items-center gap-1">
                      <Github size={16} />
                      <a 
                        href={`https://github.com/${profileUser.github}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {profileUser.github}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>На сайте с {formatDate(profileUser.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Show invitations on own profile */}
            {isOwnProfile && profileUser.invitations && profileUser.invitations.length > 0 && (
              <TeamInvitations 
                userId={profileUser.id} 
                invitations={profileUser.invitations.filter(inv => inv.status === 'pending')} 
              />
            )}
            
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
              <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
                <TabsTrigger value="info">
                  Информация
                </TabsTrigger>
                <TabsTrigger value="teams">
                  Команды {userTeams.length > 0 && `(${userTeams.length})`}
                </TabsTrigger>
              </TabsList>
              
              {/* Info Tab */}
              <TabsContent value="info" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Навыки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {profileUser.skills && profileUser.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {profileUser.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Не указаны навыки</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Teams Tab */}
              <TabsContent value="teams" className="mt-6">
                {userTeams.length > 0 ? (
                  <div className="space-y-4">
                    {userTeams.map(team => (
                      <Card key={team.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl">{team.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-3">
                            {team.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {team.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <span className="text-muted-foreground">
                              Участники: {team.members.length}/{team.maxMembers}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 flex flex-col items-center text-center">
                      <h3 className="text-lg font-medium mb-2">
                        {isOwnProfile ? "Вы не состоите ни в одной команде" : "Пользователь не состоит ни в одной команде"}
                      </h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        {isOwnProfile 
                          ? "Присоединитесь к команде или создайте свою, чтобы участвовать в хакатонах с единомышленниками."
                          : "Этот пользователь пока не вступил ни в одну команду."}
                      </p>
                      
                      {isOwnProfile && (
                        <Button className="mt-4">
                          Создать команду
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Profile;
