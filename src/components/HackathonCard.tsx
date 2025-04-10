
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hackathon } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Code, Users, MapPin } from 'lucide-react';

interface HackathonCardProps {
  hackathon: Hackathon;
  index?: number;
}

const HackathonCard = ({ hackathon, index = 0 }: HackathonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format date range
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const startMonth = startDate.toLocaleString('ru-RU', { month: 'short' });
    const endMonth = endDate.toLocaleString('ru-RU', { month: 'short' });
    
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}-${endDay}`;
    }
    
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  };

  return (
    <Link 
      to={`/hackathons/${hackathon.id}`}
      className="block h-full outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className={`h-full overflow-hidden transition-all duration-450 ${
        isHovered ? 'transform scale-[1.02] shadow-md' : 'shadow-sm'
      }`}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={hackathon.imageUrl || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'} 
            alt={hackathon.name}
            className={`w-full h-full object-cover transition-transform duration-450 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Organization logo */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1 rounded-md">
            <img 
              src={hackathon.organizerLogo || 'https://via.placeholder.com/40'}
              alt={hackathon.organizerName}
              className="w-7 h-7 object-contain"
            />
          </div>
          
          {/* Date badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs font-medium">
              <Calendar size={12} className="mr-1" />
              {formatDateRange(hackathon.startDate, hackathon.endDate)}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg line-clamp-1">{hackathon.name}</h3>
            
            <div className="flex items-center text-xs text-muted-foreground space-x-3">
              <div className="flex items-center">
                <MapPin size={12} className="mr-1" />
                <span>{hackathon.location}</span>
              </div>
              
              <div className="flex items-center">
                <Users size={12} className="mr-1" />
                <span>{hackathon.teamSize.min}-{hackathon.teamSize.max} участников</span>
              </div>
              
              <div className="flex items-center">
                <Code size={12} className="mr-1" />
                <span>Хакатон</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {hackathon.description}
            </p>
            
            <div className="flex flex-wrap gap-1 pt-1">
              {hackathon.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
              {hackathon.tags.length > 3 && (
                <Badge variant="outline" className="text-xs font-normal">
                  +{hackathon.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HackathonCard;
