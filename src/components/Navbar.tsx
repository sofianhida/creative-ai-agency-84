
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const contactUs = () => {
    toast({
      title: "Hubungi Kami",
      description: "Anda akan diarahkan ke WhatsApp",
    });
    window.open(`https://wa.me/6285183978011`, '_blank');
  };

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Layanan', href: '#services' },
    { name: 'Tentang', href: '#about' },
    { name: 'Testimoni', href: '#testimonials' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 
                 ${scrolled ? 'glass py-3' : 'py-5 bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-purple flex items-center justify-center">
              <img 
                src="/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png" 
                alt="WeVersAI Logo" 
                className="h-8 w-8"
              />
            </div>
            <span className="font-display font-bold text-xl">WeVersAI</span>
          </a>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="nav-link font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          )}
          
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-foreground" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <button 
              onClick={contactUs}
              className="hidden md:block btn-primary"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden glass-dark animate-slide-down">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 font-medium text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={contactUs}
              className="btn-primary w-full mt-4"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
