
import { useState } from 'react';
import { TeamInvitation } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTeamStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { Check, X } from 'lucide-react';

interface TeamInvitationsProps {
  userId: string;
  invitations: TeamInvitation[];
}

const TeamInvitations = ({ userId, invitations }: TeamInvitationsProps) => {
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const { respondToInvitation, getTeamById } = useTeamStore();
  const { toast } = useToast();
  
  if (!invitations || invitations.length === 0) {
    return null;
  }
  
  const handleResponse = (teamId: string, accept: boolean) => {
    setRespondingTo(teamId);
    
    // Process response
    setTimeout(() => {
      const team = getTeamById(teamId);
      const success = respondToInvitation(userId, teamId, accept);
      
      if (success) {
        toast({
          title: accept ? "Приглашение принято" : "Приглашение отклонено",
          description: accept
            ? `Вы присоединились к команде "${team?.name}"`
            : `Вы отклонили приглашение в команду "${team?.name}"`,
        });
      } else {
        toast({
          title: "Ошибка",
          description: "Произошла ошибка при обработке вашего ответа. Пожалуйста, попробуйте позже.",
          variant: "destructive",
        });
      }
      
      setRespondingTo(null);
    }, 500);
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Приглашения в команды</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invitations.map((invitation) => {
            const team = getTeamById(invitation.teamId);
            if (!team) return null;
            
            const isResponding = respondingTo === invitation.teamId;
            
            return (
              <div key={invitation.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-medium">{team.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-1">{team.description}</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    onClick={() => handleResponse(invitation.teamId, false)}
                    disabled={isResponding}
                  >
                    <X size={16} />
                    <span>Отклонить</span>
                  </Button>
                  
                  <Button
                    size="sm"
                    className="gap-1"
                    onClick={() => handleResponse(invitation.teamId, true)}
                    disabled={isResponding}
                  >
                    <Check size={16} />
                    <span>{isResponding ? "Принятие..." : "Принять"}</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamInvitations;
