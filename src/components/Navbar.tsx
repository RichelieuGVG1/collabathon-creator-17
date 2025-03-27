
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
          <NavLink to="/teams" label="Команды" isActive={isActive('/teams')} />
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <Search size={18} />
          </Button>
          
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
            <div className="pt-2 flex items-center space-x-2 border-t border-border">
              <Link to="/auth/login" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">Войти</Button>
              </Link>
              <Link to="/auth/register" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">Регистрация</Button>
              </Link>
            </div>
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
