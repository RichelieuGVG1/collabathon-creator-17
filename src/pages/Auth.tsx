/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { FadeIn, ScaleIn } from '@/components/Animations';
import { ArrowLeft, Check, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import * as yup from "yup";
import { useForm } from 'react-hook-form';

type AuthFormValues = {
  email?: string;
  password?: string;
  userName?: string;
  confirmPassword?: string;
  verificationCode?: string;
};

// 2. Создаем отдельные схемы валидации
const loginSchema = yup.object().shape({
  email: yup.string()
    .email("Некорректный email")
    .required("Email обязателен"),
  password: yup.string()
    .required("Пароль обязателен"),
}) as yup.ObjectSchema<AuthFormValues>;

const registerSchema = yup.object().shape({
  userName: yup.string()
    .min(3, "Слишком короткий username")
    .max(20, "Слишком длинный username")
    .matches(/^[A-Za-z0-9]{3,20}$/, "Username может содержать только буквы и цифры")
    .required("Имя пользователя обязательно"),
  email: yup.string()
    .email("Некорректный email")
    .required("Email обязателен"),
  password: yup.string()
    .min(8, "Пароль должен быть не менее 8 символов")
    .matches(
      /^(?=[^А-Яа-я]*$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      "Пароль должен содержать строчные, заглавные буквы, цифру и спецсимвол"
    )
    .required("Пароль обязателен"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
    .required("Подтверждение пароля обязательно"),
}) as yup.ObjectSchema<AuthFormValues>;

const confirmSchema = yup.object().shape({
  verificationCode: yup.string()
    .length(6, 'Код должен содержать 6 цифр')
    .matches(/^\d+$/, 'Код должен содержать только цифры')
    .required('Код подтверждения обязателен'),
}) as yup.ObjectSchema<AuthFormValues>;

// 3. Компонент Auth
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const { login, registerInitiate, registerConfirm } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname.includes('/login');

  const [registrationStep, setRegistrationStep] = useState<'login' | 'register' | 'confirm'>(() => {
    return location.pathname.includes('/login') ? 'login' : 'register';
  });

  const pageTitle = registrationStep === 'confirm' 
  ? 'Подтверждение кода' 
  : isLogin 
    ? 'Вход' 
    : 'Создание аккаунта';

  useEffect(() => {
    if (location.pathname.includes('/login')) {
      setRegistrationStep('login');
    } else if (location.pathname.includes('/register')) {
      setRegistrationStep('register');
    }
  }, [location.pathname]);

  const getCurrentSchema = () => {
    switch (registrationStep) {
      case 'login': return loginSchema;
      case 'register': return registerSchema;
      case 'confirm': return confirmSchema;
      default: return loginSchema;
    }
  };

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthFormValues>({
    resolver: yupResolver(getCurrentSchema()),
    defaultValues: registrationStep === 'confirm' 
      ? { verificationCode: '' }
      : registrationStep === 'register'
        ? { email: '', password: '', userName: '', confirmPassword: '' }
        : { email: '', password: '' },
  });

  const onSubmit = async (data: any) => {
    try {
      if (registrationStep === 'login') {
        await login({ email: data.email, password: data.password });
        toast({ title: 'Успешный вход', description: 'Вы успешно вошли в систему' });
        navigate('/profile');
      } else if (registrationStep === 'register') {
        await registerInitiate({
          userName: data.userName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });
        setPendingEmail(data.email);
        setRegistrationStep('confirm');
        toast({ 
          title: 'Код подтверждения отправлен', 
          description: `Мы отправили 6-значный код на ${data.email}` 
        });
        reset({ verificationCode: '' });
      } else if (registrationStep === 'confirm') {
        await registerConfirm({ 
          email: pendingEmail, 
          registrationCode: data.verificationCode
        });
        toast({ 
          title: 'Регистрация завершена', 
          description: 'Ваш аккаунт успешно создан!' 
        });
        navigate('/profile');
      }
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.response?.data?.message || 'Произошла ошибка',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-20 relative`}>
      {registrationStep === 'confirm' && (
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm -z-10"></div>
      )}
      
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(45%_40%_at_50%_30%,rgba(220,230,255,0.8),rgba(255,255,255,0))]"></div>

      <div className="w-full max-w-md relative">
        <div className={registrationStep === 'confirm' ? 'pointer-events-none' : ''}>
        <FadeIn delay={100}>
          <div className="text-center mb-8">
            {/* <Link to="/" className="inline-block mb-8 text-muted-foreground hover:text-foreground transition-colors">
              <div className="flex items-center">
                <ArrowLeft size={16} className="mr-1" />
                <span>Вернуться на главную</span>
              </div>
            </Link> */}

            <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
            <p className="text-muted-foreground">
              {registrationStep === 'confirm'
                ? `Введите 6-значный код, отправленный на ${pendingEmail}`
                : isLogin
                  ? 'С возвращением! Войдите в свой аккаунт, чтобы продолжить.'
                  : 'Присоединяйтесь к сообществу, чтобы участвовать в хакатонах и находить команды.'}
            </p>
          </div>
        </FadeIn>
        </div>

        <ScaleIn delay={300}>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="p-6 space-y-4">
                {registrationStep === 'register' && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Username</Label>
                    <Input 
                      id="name" 
                      placeholder="Введите ваш username" 
                      {...formRegister("userName")} 
                    />
                    {errors.userName && (
                      <p className="text-sm text-red-500">{errors.userName.message}</p>
                    )}
                  </div>
                )}

                {registrationStep !== 'confirm' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="вы@пример.com"
                        {...formRegister("email")}
                        //disabled={registrationStep === 'confirm'}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Пароль</Label>
                        {registrationStep === 'login' && (
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
                          placeholder={
                            registrationStep === 'login' 
                              ? "Введите ваш пароль" 
                              : "Создайте пароль"
                          }
                          className="pr-10"
                          {...formRegister("password")}
                          //disabled={registrationStep === 'confirm'}
                        />
                        {errors.password && (
                          <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {registrationStep === 'register' && (
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

                {registrationStep === 'confirm' && (
                  <div className="space-y-2">
                    <Label htmlFor="code">Код подтверждения</Label>
                    <Input
                      id="code"
                      placeholder="Введите 6-значный код"
                      {...formRegister("verificationCode")}
                    />
                    {errors.verificationCode && (
                      <p className="text-sm text-red-500">{errors.verificationCode.message}</p>
                    )}
                  </div>
                )}

                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {registrationStep === 'login' ? (
                    <>
                      <LogIn size={16} /> Войти
                    </>
                  ) : registrationStep === 'confirm' ? (
                    <>
                      <Check size={16} /> Подтвердить
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} /> Создать аккаунт
                    </>
                  )}
                </Button>

                {/* {registrationStep === 'confirm' && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-muted-foreground"
                    onClick={() => setRegistrationStep('register')}
                  >
                    Изменить email
                  </Button>
                )} */}
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <div className="text-center w-full text-sm">
                  {registrationStep === 'login' ? (
                    <div>
                      Нет аккаунта?{' '}
                      <Link 
                        to="/auth/register" 
                        className="text-primary hover:underline font-medium"
                        onClick={() => {
                          setRegistrationStep('register');
                        }}
                      >
                        Зарегистрироваться
                      </Link>
                    </div>
                  ) : registrationStep === 'register' ? (
                    <div>
                      Уже есть аккаунт?{' '}
                      <Link 
                        to="/auth/login" 
                        className="text-primary hover:underline font-medium"
                        onClick={() => setRegistrationStep('login')}
                      >
                        Войти
                      </Link>
                    </div>
                  ) : null}
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

