import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Gamepad } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  showAIAccess?: boolean;
  setShowAIAccess?: (show: boolean) => void;
}

const Navbar = ({ showAIAccess = false, setShowAIAccess }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Check initial scroll position on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
      isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm py-3" : "py-5"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl font-display">
          <img 
            src="/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png" 
            alt="WeVersAI Logo" 
            className="h-8 md:h-10"
          />
          <span className={cn(
            "text-foreground transition-all",
            isScrolled ? "text-lg" : "text-xl"
          )}>
            WeVersAI
          </span>
        </Link>
        
        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={cn(
            "nav-link", 
            location.pathname === "/" && "after:scale-x-100"
          )}>
            Home
          </Link>
          <Link to="/products" className={cn(
            "nav-link", 
            location.pathname === "/products" && "after:scale-x-100"
          )}>
            Products
          </Link>
          <Link to="/portfolio" className={cn(
            "nav-link", 
            location.pathname === "/portfolio" && "after:scale-x-100"
          )}>
            Portfolio
          </Link>
          <Link to="/game" className={cn(
            "nav-link", 
            location.pathname === "/game" && "after:scale-x-100"
          )}>
            <span className="flex items-center gap-1">
              Game <Gamepad className="h-4 w-4" />
            </span>
          </Link>
          
          <Button
            variant="ghost"
            className="navbar-ai-button focus:ring-0"
            onClick={() => setShowAIAccess && setShowAIAccess(!showAIAccess)}
          >
            <Zap className="h-4 w-4" />
            AI Access
          </Button>
        </nav>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "mobile-menu-container bg-white/95 backdrop-blur-md md:hidden transition-transform duration-300",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="container mx-auto px-4 py-8 flex flex-col items-center gap-6">
          <Link 
            to="/" 
            className="text-xl font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-xl font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link 
            to="/portfolio" 
            className="text-xl font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link 
            to="/game" 
            className="text-xl font-medium flex items-center gap-1"
            onClick={() => setIsMenuOpen(false)}
          >
            Game <Gamepad className="h-4 w-4" />
          </Link>
          
          <Button
            variant="default"
            className="bg-purple text-white w-full max-w-xs mt-4"
            onClick={() => {
              setShowAIAccess && setShowAIAccess(!showAIAccess);
              setIsMenuOpen(false);
            }}
          >
            <Zap className="h-4 w-4 mr-2" />
            AI Access
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
