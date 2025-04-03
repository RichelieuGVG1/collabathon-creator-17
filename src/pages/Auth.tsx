
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FadeIn, SlideUp, ScaleIn } from '@/components/Animations';
import { ArrowLeft, Eye, EyeOff, Github, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  // Get auth functions from store
  const { login, register } = useAuthStore();
  
  // Determine if we're on the login or register page
  const isLogin = location.pathname.includes('/login');
  const pageTitle = isLogin ? 'Вход' : 'Создание аккаунта';
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        // Handle login
        const result = await login(email, password);
        
        if (result.success) {
          toast({
            title: "Успешный вход",
            description: "Вы успешно вошли в систему"
          });
          navigate('/profile');
        } else {
          toast({
            title: "Ошибка входа",
            description: result.message,
            variant: "destructive"
          });
        }
      } else {
        // Handle registration
        if (!name || !email || !password) {
          toast({
            title: "Ошибка регистрации",
            description: "Пожалуйста, заполните все поля",
            variant: "destructive"
          });
          return;
        }
        
        const result = await register(name, email, password);
        
        if (result.success) {
          toast({
            title: "Успешная регистрация",
            description: "Ваш аккаунт успешно создан"
          });
          navigate('/profile');
        } else {
          toast({
            title: "Ошибка регистрации",
            description: result.message,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла неизвестная ошибка",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_30%,rgba(220,230,255,0.8),rgba(255,255,255,0))]"></div>
      
      <div className="w-full max-w-md">
        <FadeIn delay={100}>
          <div className="text-center mb-8">
            <Link 
              to="/" 
              className="inline-block mb-8 text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="flex items-center">
                <ArrowLeft size={16} className="mr-1" />
                <span>Вернуться на главную</span>
              </div>
            </Link>
            
            <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'С возвращением! Войдите в свой аккаунт, чтобы продолжить.'
                : 'Присоединяйтесь к сообществу, чтобы участвовать в хакатонах и находить команды.'}
            </p>
          </div>
        </FadeIn>
        
        <ScaleIn delay={300}>
          <Card>
            <form onSubmit={handleSubmit}>
              <CardContent className="p-6 space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Полное имя</Label>
                    <Input 
                      id="name" 
                      placeholder="Введите ваше имя" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required={!isLogin}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="вы@пример.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Пароль</Label>
                    {isLogin && (
                      <Link 
                        to="/auth/reset-password" 
                        className="text-xs text-primary hover:underline"
                      >
                        Забыли пароль?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder={isLogin ? "Введите ваш пароль" : "Создайте пароль"}
                      className="pr-10"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {isLogin 
                    ? <><LogIn size={16} /> Войти</>
                    : <><UserPlus size={16} /> Создать аккаунт</>
                  }
                </Button>
                
                <div className="relative flex items-center justify-center mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative px-4 bg-card text-xs uppercase text-muted-foreground">
                    Или продолжить с
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" type="button">
                  <Github size={16} className="mr-2" />
                  <span>{isLogin ? 'Войти' : 'Зарегистрироваться'} через GitHub</span>
                </Button>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <div className="text-center w-full text-sm">
                  {isLogin ? (
                    <div>
                      Нет аккаунта?{' '}
                      <Link to="/auth/register" className="text-primary hover:underline font-medium">
                        Зарегистрироваться
                      </Link>
                    </div>
                  ) : (
                    <div>
                      Уже есть аккаунт?{' '}
                      <Link to="/auth/login" className="text-primary hover:underline font-medium">
                        Войти
                      </Link>
                    </div>
                  )}
                </div>
              </CardFooter>
            </form>
          </Card>
        </ScaleIn>
      </div>
    </div>
  );
};

export default Auth;
