
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { FadeIn, ScaleIn } from '@/components/Animations';
import { ArrowLeft, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { AuthFormData } from '@/types';

const schema = yup.object().shape({
  userName: yup.string()
    .when('$isLogin', {
      is: false,
      then: (schema) => schema
        .min(3, "Слишком короткий username")
        .max(20, "Слишком длинный username")
        .matches(/^[A-Za-z0-9]{3,20}$/, "Username может содержать только буквы и цифры")
        .required("Имя пользователя обязательно"),
      otherwise: (schema) => schema.strip()
    }),
  email: yup.string()
    .email("Некорректный email")
    .min(3, "Слишком короткий email")
    .max(30, "Слишком длинный email")
    .required("Email обязателен"),
  password: yup.string()
    .min(8, "Пароль должен быть не менее 8 символов")
    .max(20, "Пароль должен быть не более 20 символов")
    .matches(
      /^(?=[^А-Яа-я]*$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      "Пароль должен содержать строчные, заглавные буквы, цифру и спецсимвол"
    )
    .required("Пароль обязателен"),
  confirmPassword: yup.string()
    .when('$isLogin', {
      is: false,
      then: (schema) =>
        schema
          .oneOf([yup.ref("password")], "Пароли должны совпадать")
          .required("Подтверждение пароля обязательно"),
      otherwise: (schema) => schema.strip()
    }),
});



const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { login, register } = useAuthStore();

  const isLogin = location.pathname.includes('/login');
  const pageTitle = isLogin ? 'Вход' : 'Создание аккаунта';

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema, { context: { isLogin } }),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
    },
  });

  const onSubmit = async (data: AuthFormData) => {
    console.log("Форма отправлена", data);
    try {
      if (isLogin) {
        await login({ email: data.email, password: data.password });
        toast({ title: "Успешный вход", description: "Вы успешно вошли в систему" });
        navigate('/profile');
      } else {
        await register({
          userName: data.userName, 
          email: data.email, 
          password: data.password, 
          confirmPassword: data.confirmPassword
        });
        toast({ title: "Успешная регистрация", description: "Аккаунт успешно создан" });
        navigate('/profile');
      }
    } catch (error) {
      const message = axios.isAxiosError(error) && error.response?.data?.description
        ? error.response.data.description
        : 'Неизвестная ошибка';
        
      toast({ 
        title: isLogin ? "Ошибка входа" : "Ошибка регистрации",
        description: message, 
        variant: "destructive" 
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_30%,rgba(220,230,255,0.8),rgba(255,255,255,0))]"></div>

      <div className="w-full max-w-md">
        <FadeIn delay={100}>
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-8 text-muted-foreground hover:text-foreground transition-colors">
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="p-6 space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Полное имя</Label>
                    <Input id="name" placeholder="Введите ваше имя" {...formRegister("userName")} />
                    {errors.userName && <p className="text-sm text-red-500">{errors.userName.message}</p>}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="вы@пример.com" {...formRegister("email")} />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Пароль</Label>
                    {isLogin && (
                      <Link to="/auth/reset-password" className="text-xs text-primary hover:underline">
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
                      {...formRegister("password")}
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Подтвердите пароль"
                      {...formRegister("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                )}

                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {isLogin ? (
                    <>
                      <LogIn size={16} /> Войти
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} /> Создать аккаунт
                    </>
                  )}
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

