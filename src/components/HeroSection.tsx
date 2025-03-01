
import { useEffect, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient opacity-10 -z-10"></div>
      
      {/* Abstract Shapes */}
      <div className="absolute top-20 right-10 h-64 w-64 rounded-full bg-purple/10 filter blur-3xl"></div>
      <div className="absolute bottom-20 left-10 h-72 w-72 rounded-full bg-purple/10 filter blur-3xl"></div>
      
      <div className="section">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-purple/10 rounded-full px-4 py-2 text-sm text-purple-dark">
              <Sparkles size={16} className="text-purple" />
              <span>Solusi AI Terbaik untuk Bisnis Anda</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
              Transformasi Digital <br />
              <span className="text-purple">dengan Kecerdasan Buatan</span>
            </h1>
            
            <p className="text-lg text-foreground/80 max-w-lg">
              Kami membantu bisnis Anda berkembang dengan teknologi AI terdepan, 
              memberikan solusi pintar yang mengoptimalkan proses dan meningkatkan produktivitas.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <a href="#services" className="btn-primary flex items-center justify-center gap-2">
                Jelajahi Layanan
              </a>
              <a href="#contact" className="btn-outline flex items-center justify-center gap-2">
                Konsultasi Gratis
              </a>
            </div>
          </div>
          
          <div className={`relative ${isLoaded ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
            <div className="relative bg-gradient-to-br from-purple-light to-purple rounded-2xl aspect-square max-w-md mx-auto overflow-hidden shadow-glow-lg">
              <img 
                src="/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png" 
                alt="Neko AI Logo" 
                className="absolute inset-0 h-full w-full object-contain p-12 animate-float"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-purple/20 rounded-full filter blur-xl"></div>
            <div className="absolute -top-6 -left-6 h-24 w-24 bg-purple/20 rounded-full filter blur-xl"></div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <a href="#services" className="flex flex-col items-center text-foreground/50 hover:text-foreground">
            <span className="text-sm mb-2">Gulir ke bawah</span>
            <ArrowDown size={20} className="arrow-down" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
