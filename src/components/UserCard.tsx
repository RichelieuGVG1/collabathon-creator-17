
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserCardProps {
  user: User;
  index?: number;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

const UserCard = ({ user, index = 0, showAddButton = false, onAddClick }: UserCardProps) => {
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
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
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
      <CardContent className="p-5">
        <div className="flex items-start space-x-4">
          <Avatar className="w-14 h-14 border border-border">
            <AvatarImage src={user.photoUrl} alt={user.name} />
            <AvatarFallback className="text-lg">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div>
              <Link 
                to={`/profile/${user.id}`}
                className="font-semibold hover:underline"
              >
                {user.name}
              </Link>
              <div className="text-xs text-muted-foreground">
                Member since {formatDate(user.createdAt)}
              </div>
            </div>
            
            <p className="text-sm line-clamp-2">{user.bio}</p>
            
            <div className="flex flex-wrap gap-1 pt-1">
              {user.tags.slice(0, 4).map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
              {user.tags.length > 4 && (
                <Badge variant="outline" className="text-xs font-normal">
                  +{user.tags.length - 4}
                </Badge>
              )}
            </div>
            
            {showAddButton && (
              <Button 
                size="sm" 
                variant="outline" 
                className="mt-2"
                onClick={onAddClick}
              >
                Invite to Team
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
