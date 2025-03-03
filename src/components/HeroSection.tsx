
import { useEffect, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden flex items-center min-h-[calc(100vh-4rem)] py-8 md:py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-background/80 -z-10"></div>
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-purple/5 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="section py-10 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className={`space-y-5 md:space-y-6 text-center md:text-left ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-purple/10 rounded-full px-4 py-2 text-sm text-purple-dark">
              <Sparkles size={16} className="text-purple" />
              <span>Leading AI Solutions Provider</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
              Transform Your Business
              <span className="text-purple block mt-1">with Advanced AI</span>
            </h1>
            
            <p className="text-base md:text-lg text-foreground/70 max-w-lg mx-auto md:mx-0">
              We help businesses leverage cutting-edge artificial intelligence to optimize processes,
              improve decision-making, and drive innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 justify-center md:justify-start">
              <a href="#services" className="btn-primary py-3 px-6">
                Explore Services
              </a>
              <a href="#contact" className="btn-outline py-3 px-6">
                Get Free Consultation
              </a>
            </div>
          </div>
          
          <div className={`relative mt-10 md:mt-0 ${isLoaded ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
            <div className="relative mx-auto max-w-md">
              {/* Main image/graphic */}
              <div className="relative z-10 bg-gradient-to-br from-purple-light/90 to-purple/80 rounded-2xl overflow-hidden shadow-glow-lg aspect-square max-w-xs sm:max-w-sm mx-auto">
                <img 
                  src="/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png" 
                  alt="WeVersAI Logo" 
                  className="absolute inset-0 h-full w-full object-contain p-12 animate-float"
                />
                
                {/* Floating elements */}
                <div className="absolute -top-8 -left-8 h-16 w-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-1/4 -right-5 h-10 w-10 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-1/3 -left-3 h-6 w-6 bg-white/30 rounded-full"></div>
              </div>
              
              {/* Backdrop blurs */}
              <div className="absolute -bottom-8 -right-8 h-40 w-40 bg-purple/20 rounded-full filter blur-2xl -z-10"></div>
              <div className="absolute -top-10 -left-10 h-40 w-40 bg-purple/10 rounded-full filter blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
          <a href="#services" className="flex flex-col items-center text-foreground/50 hover:text-foreground transition-colors">
            <span className="text-sm mb-2">Scroll down</span>
            <ArrowDown size={20} className="arrow-down" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
