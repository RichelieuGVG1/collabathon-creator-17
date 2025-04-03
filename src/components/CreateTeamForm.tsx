
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useTeamStore, useHackathonStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { X, Plus } from 'lucide-react';

interface CreateTeamFormProps {
  hackathonId?: string;
}

const CreateTeamForm = ({ hackathonId }: CreateTeamFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { isAuthenticated, currentUser } = useAuthStore();
  const { hackathons, getHackathonById } = useHackathonStore();
  const { createTeam } = useTeamStore();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedHackathonId, setSelectedHackathonId] = useState(hackathonId || '');
  const [maxMembers, setMaxMembers] = useState(4);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  // Validate user is logged in
  if (!isAuthenticated || !currentUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Создание команды</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-10">
          <p className="mb-4">Для создания команды необходимо авторизоваться</p>
          <Button onClick={() => navigate('/auth/login')}>Войти</Button>
        </CardContent>
      </Card>
    );
  }
  
  // If hackathonId is provided, validate it exists
  if (hackathonId) {
    const hackathon = getHackathonById(hackathonId);
    if (!hackathon) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Ошибка</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Хакатон не найден</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/hackathons')}>К списку хакатонов</Button>
          </CardFooter>
        </Card>
      );
    }
  }
  
  const addTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !selectedHackathonId) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все необходимые поля",
        variant: "destructive"
      });
      return;
    }
    
    if (tags.length === 0) {
      toast({
        title: "Ошибка",
        description: "Добавьте хотя бы один тег",
        variant: "destructive"
      });
      return;
    }
    
    const hackathon = getHackathonById(selectedHackathonId);
    if (!hackathon) {
      toast({
        title: "Ошибка",
        description: "Выбранный хакатон не найден",
        variant: "destructive"
      });
      return;
    }
    
    // Validate max members is within hackathon limits
    if (maxMembers < hackathon.teamSize.min || maxMembers > hackathon.teamSize.max) {
      toast({
        title: "Ошибка",
        description: `Количество участников должно быть от ${hackathon.teamSize.min} до ${hackathon.teamSize.max}`,
        variant: "destructive"
      });
      return;
    }
    
    // Create new team
    const newTeam = createTeam({
      hackathonId: selectedHackathonId,
      name,
      description,
      tags,
      members: [currentUser],
      maxMembers,
      createdBy: currentUser.id
    });
    
    toast({
      title: "Успех!",
      description: "Команда успешно создана",
    });
    
    // Navigate to team page
    navigate(`/teams/${newTeam.id}`);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Создание новой команды</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hackathon">Хакатон</Label>
            <Select 
              value={selectedHackathonId} 
              onValueChange={setSelectedHackathonId}
              disabled={!!hackathonId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите хакатон" />
              </SelectTrigger>
              <SelectContent>
                {hackathons.map(hackathon => (
                  <SelectItem key={hackathon.id} value={hackathon.id}>
                    {hackathon.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Название команды</Label>
            <Input 
              id="name" 
              placeholder="Введите название команды" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Описание команды</Label>
            <Textarea 
              id="description" 
              placeholder="Опишите вашу команду, цели и какие навыки вы ищете" 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maxMembers">Максимальное количество участников</Label>
            <Select 
              value={maxMembers.toString()} 
              onValueChange={(value) => setMaxMembers(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите количество" />
              </SelectTrigger>
              <SelectContent>
                {selectedHackathonId && getHackathonById(selectedHackathonId) ? (
                  Array.from(
                    { length: getHackathonById(selectedHackathonId)!.teamSize.max - getHackathonById(selectedHackathonId)!.teamSize.min + 1 },
                    (_, i) => getHackathonById(selectedHackathonId)!.teamSize.min + i
                  ).map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))
                ) : (
                  [2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Теги</Label>
            <div className="flex">
              <Input 
                id="tags" 
                placeholder="Добавьте навыки и технологии" 
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button 
                type="button" 
                variant="secondary" 
                className="ml-2"
                onClick={addTag}
              >
                <Plus size={16} />
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((t, i) => (
                  <Badge key={i} variant="secondary" className="flex items-center gap-1">
                    {t}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeTag(t)}
                    >
                      <X size={12} />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            Отмена
          </Button>
          <Button type="submit">Создать команду</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateTeamForm;
