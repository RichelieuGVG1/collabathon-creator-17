
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FadeIn, SlideUp, ScaleIn } from '@/components/Animations';
import { ArrowLeft, Eye, EyeOff, Github, LogIn, UserPlus } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  
  // Determine if we're on the login or register page
  const isLogin = location.pathname.includes('/login');
  const pageTitle = isLogin ? 'Sign In' : 'Create an Account';
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would handle authentication
    console.log('Auth form submitted with:', { email, password, name });
    
    // For demo purposes, we'll just redirect to the profile page
    navigate('/profile');
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
                <span>Back to Home</span>
              </div>
            </Link>
            
            <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Welcome back! Sign in to your account to continue.'
                : 'Join the community to participate in hackathons and find teams.'}
            </p>
          </div>
        </FadeIn>
        
        <ScaleIn delay={300}>
          <Card>
            <form onSubmit={handleSubmit}>
              <CardContent className="p-6 space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your name" 
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
                    placeholder="you@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {isLogin && (
                      <Link 
                        to="/auth/reset-password" 
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder={isLogin ? "Enter your password" : "Create a password"}
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
                
                <Button type="submit" className="w-full gap-2">
                  {isLogin 
                    ? <><LogIn size={16} /> Sign In</>
                    : <><UserPlus size={16} /> Create Account</>
                  }
                </Button>
                
                <div className="relative flex items-center justify-center mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative px-4 bg-card text-xs uppercase text-muted-foreground">
                    Or continue with
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" type="button">
                  <Github size={16} className="mr-2" />
                  <span>{isLogin ? 'Sign in' : 'Sign up'} with GitHub</span>
                </Button>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <div className="text-center w-full text-sm">
                  {isLogin ? (
                    <div>
                      Don't have an account?{' '}
                      <Link to="/auth/register" className="text-primary hover:underline font-medium">
                        Sign up
                      </Link>
                    </div>
                  ) : (
                    <div>
                      Already have an account?{' '}
                      <Link to="/auth/login" className="text-primary hover:underline font-medium">
                        Sign in
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
