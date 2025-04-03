
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FadeIn, StaggerContainer } from '@/components/Animations';
import { useAuthStore, useTeamStore, useUserStore } from '@/lib/store';
import UserCard from '@/components/UserCard';
import { Search, Filter, ArrowLeft, X, Check } from 'lucide-react';

const UsersWithoutTeam = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isInviteMode = Boolean(teamId);
  const { currentUser } = useAuthStore();
  const { users, getUserById } = useUserStore();
  const { teams, getTeamById, inviteUserToTeam } = useTeamStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [invitingSent, setInvitingSent] = useState<Record<string, boolean>>({});
  
  const team = isInviteMode && teamId ? getTeamById(teamId) : null;
  
  // If in invite mode but team not found, redirect back
  useState(() => {
    if (isInviteMode && !team) {
      navigate('/teams');
    }
  });
  
  // Filter users who don't have a team
  const usersWithoutTeam = users.filter(user => {
    // Exclude current user
    if (currentUser && user.id === currentUser.id) return false;
    
    // Check if user is not in any team
    const userHasTeam = teams.some(team => 
      team.members.some(member => member.id === user.id)
    );
    
    // If in invite mode, exclude users who are already in this team
    if (isInviteMode && team) {
      const alreadyInTeam = team.members.some(member => member.id === user.id);
      if (alreadyInTeam) return false;
      
      // Check if user already has a pending invitation to this team
      const hasPendingInvitation = user.invitations?.some(
        inv => inv.teamId === team.id && inv.status === 'pending'
      );
      if (hasPendingInvitation) return false;
    }
    
    return !userHasTeam;
  });
  
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
      user.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
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
  
  // Handle sending invitations
  const handleInvite = (userId: string) => {
    if (!isInviteMode || !team || !teamId) return;
    
    // Send invitation
    const success = inviteUserToTeam(teamId, userId);
    
    if (success) {
      // Mark as invited for UI feedback
      setInvitingSent(prev => ({ ...prev, [userId]: true }));
      
      toast({
        title: "Приглашение отправлено",
        description: "Пользователь получит уведомление о вашем приглашении.",
      });
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить приглашение. Попробуйте еще раз.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate(isInviteMode && teamId ? `/teams/${teamId}` : '/teams')}
                >
                  <ArrowLeft size={20} />
                </Button>
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {isInviteMode ? "Пригласить участников" : "Участники без команды"}
                </h1>
              </div>
              
              <p className="text-muted-foreground">
                {isInviteMode && team
                  ? `Найдите участников для команды «${team.name}»`
                  : "Найдите участников, которые еще не присоединились к командам"}
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
                <h3 className="font-medium">Фильтр по навыкам</h3>
                {activeFilters.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                    Очистить все
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag, index) => (
                  <Badge
                    key={index}
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
              {activeFilters.map((filter, index) => (
                <Badge
                  key={index}
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
        
        {/* Users Listing */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggerContainer initialDelay={200} staggerDelay={100}>
              {filteredUsers.map((user, index) => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  index={index}
                  action={
                    isInviteMode ? {
                      label: invitingSent[user.id] ? "Приглашение отправлено" : "Пригласить в команду",
                      icon: invitingSent[user.id] ? Check : null,
                      onClick: () => handleInvite(user.id),
                      disabled: invitingSent[user.id]
                    } : undefined
                  }
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
                ) : null}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UsersWithoutTeam;
