
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { adminLogin, isAdmin, logout } = useAuthStore();
  const { toast } = useToast();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await adminLogin(password);
      if (result.success) {
        toast({
          title: "Успех",
          description: "Вы вошли как администратор",
        });
        setIsOpen(false);
      } else {
        toast({
          title: "Ошибка",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла неизвестная ошибка",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogout = () => {
    logout();
    toast({
      title: "Выход из системы",
      description: "Вы вышли из учетной записи администратора",
    });
  };

  if (isAdmin) {
    return (
      <div className="flex justify-center mt-4" style={{ marginTop: '0' }}>
        <Button onClick={handleAdminLogout} variant="outline" size="sm" className="text-xs">
          Выйти из режима администратора
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-4"  style={{ margin-top: '0' }}>
      {isOpen ? (
        <Card className="w-full max-w-md">
          <form onSubmit={handleAdminLogin}>
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Lock size={16} /> Вход для администратора
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="password"
                placeholder="Пароль администратора"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Отмена
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Вход...' : 'Войти'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Button 
          variant="link" 
          size="sm" 
          onClick={() => setIsOpen(true)} 
          className="text-xs text-muted-foreground"
        >
          Вход для администраторов
        </Button>
      )}
    </div>
  );
};

export default AdminLogin;
