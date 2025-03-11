
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Gamepad } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl font-display mb-4">
              <img 
                src="/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png" 
                alt="WeVersAI Logo" 
                className="h-8"
              />
              <span className="text-foreground">WeVersAI</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Empowering businesses with advanced AI solutions and cutting-edge technology to drive growth and innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/weversai/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-foreground/70 hover:text-purple transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-foreground/70 hover:text-purple transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/game" className="text-foreground/70 hover:text-purple transition-colors flex items-center gap-1">
                  AI Game <Gamepad className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-foreground/70">
                <span className="font-medium text-foreground">Email:</span> hello@weversai.com
              </li>
              <li className="text-foreground/70">
                <span className="font-medium text-foreground">Phone:</span> +62 812 3456 7890
              </li>
              <li className="text-foreground/70">
                <span className="font-medium text-foreground">Address:</span> Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} WeVersAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
