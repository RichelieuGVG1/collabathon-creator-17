
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Team } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserCircle, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeamCardProps {
  team: Team;
  hackathonName?: string;
  index?: number;
}

const TeamCard = ({ team, hackathonName, index = 0 }: TeamCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card 
      className={`h-full overflow-hidden transition-all duration-450 ${
        isHovered ? 'transform scale-[1.02] shadow-md' : 'shadow-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-5 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{team.name}</h3>
            <Badge variant="outline" className="text-xs">
              {team.members.length}/{team.maxMembers} участников
            </Badge>
          </div>
          
          {hackathonName && (
            <Link 
              to={`/hackathons/${team.hackathonId}`}
              className="text-sm text-primary hover:underline inline-flex items-center"
            >
              <span className="line-clamp-1">{hackathonName}</span>
            </Link>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {team.description}
        </p>
        
        <div className="flex flex-wrap gap-1 pt-1">
          {team.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
          {team.tags.length > 3 && (
            <Badge variant="outline" className="text-xs font-normal">
              +{team.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center -space-x-2">
          {team.members.slice(0, 5).map((member, i) => (
            <Avatar key={i} className="border-2 border-background w-8 h-8">
              <AvatarImage src={member.photoUrl} alt={member.name} />
              <AvatarFallback className="text-xs">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
          ))}
          
          {team.members.length > 5 && (
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background">
              <span className="text-xs font-medium">+{team.members.length - 5}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-4 bg-secondary/50 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Создана {formatDate(team.createdAt)}
        </div>
        
        <Link to={`/teams/${team.id}`}>
          <Button size="sm" variant="secondary">Просмотр команды</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
