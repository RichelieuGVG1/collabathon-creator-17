
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/lib/store';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { isAuthenticated, currentUser, logout } = useAuthStore();

  // Check if the user is at the current route
  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Get user initials
  const getUserInitials = () => {
    if (!currentUser || !currentUser.name) return '';
    
    return currentUser.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-primary font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          ХакХаб
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" label="Главная" isActive={isActive('/')} />
          <NavLink to="/hackathons" label="Хакатоны" isActive={isActive('/hackathons')} />
          {/* <NavLink to="/teams" label="Команды" isActive={isActive('/teams')} /> */}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <Search size={18} />
          </Button>
          
          {isAuthenticated && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.photoUrl} alt={currentUser.name} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Мой профиль</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="ghost" size="sm" className="font-medium">
                  Войти
                </Button>
              </Link>
              
              <Link to="/auth/register">
                <Button className="font-medium">
                  Регистрация
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md border-b border-border animate-slide-down">
          <div className="container px-4 py-4 flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`py-2 px-3 rounded-md transition-colors ${
                isActive('/') ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/hackathons" 
              className={`py-2 px-3 rounded-md transition-colors ${
                isActive('/hackathons') ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Хакатоны
            </Link>
            <Link 
              to="/teams" 
              className={`py-2 px-3 rounded-md transition-colors ${
                isActive('/teams') ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Команды
            </Link>
            
            {isAuthenticated && currentUser ? (
              <>
                <Link 
                  to="/profile" 
                  className={`py-2 px-3 rounded-md transition-colors ${
                    isActive('/profile') ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Мой профиль
                </Link>
                <Button 
                  variant="destructive" 
                  className="mt-2"
                  onClick={handleLogout}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <div className="pt-2 flex items-center space-x-2 border-t border-border">
                <Link to="/auth/login" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Войти</Button>
                </Link>
                <Link to="/auth/register" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Регистрация</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// NavLink component for desktop navigation
const NavLink = ({ to, label, isActive }: { to: string; label: string; isActive: boolean }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-md transition-all duration-250 ${
      isActive 
        ? 'bg-secondary font-medium scale-105' 
        : 'hover:bg-secondary/50'
    }`}
  >
    {label}
  </Link>
);

export default Navbar;
