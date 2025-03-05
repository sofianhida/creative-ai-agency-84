
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AISystemsAccess from '@/components/AISystemsAccess';
import AIChatbot from '@/components/AIChatbot';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [showAIAccess, setShowAIAccess] = useState(false);
  
  useEffect(() => {
    document.title = "WeVersAI | Best AI Solutions";
    
    // Add scroll reveal effect
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all sections except hero (which has its own animation)
    const sections = document.querySelectorAll('section:not(#home)');
    sections.forEach(section => {
      section.classList.add('opacity-0');
      observer.observe(section);
    });
    
    // Add particle effects for enhanced visual appeal
    const createParticles = () => {
      const particlesContainer = document.querySelector('.particles');
      if (particlesContainer) {
        for (let i = 0; i < 15; i++) {
          const size = Math.random() * 20 + 5;
          const particle = document.createElement('div');
          particle.classList.add('particle');
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.opacity = `${Math.random() * 0.3}`;
          particle.style.animationDelay = `${Math.random() * 10}s`;
          particlesContainer.appendChild(particle);
        }
      }
    };
    
    createParticles();
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar showAIAccess={showAIAccess} setShowAIAccess={setShowAIAccess} />
      
      <main className="pt-16 relative z-0">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
        
        {/* Enhanced AI Systems Section with ID for scrolling */}
        <section id="ai-systems-section" className="ai-dashboard-section">
          <div className="particles"></div>
          <div className="container mx-auto px-4 ai-dashboard-content">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="fancy-badge animate-float">AI POWERED</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                <span className="flex items-center justify-center gap-2">
                  WeVersAI Systems Dashboard
                  <Sparkles className="text-purple h-6 w-6 animate-pulse" />
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Access our powerful AI systems designed to solve complex problems and enhance your business operations
              </p>
              
              <div className="hidden sm:block w-24 h-1 bg-gradient-to-r from-purple/30 to-purple mx-auto mb-12 rounded-full"></div>
            </div>
            
            <AISystemsAccess showAIAccess={showAIAccess} setShowAIAccess={setShowAIAccess} />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute right-0 top-20 w-64 h-64 rounded-full bg-purple/5 animate-float"></div>
          <div className="absolute -left-32 bottom-32 w-64 h-64 rounded-full border border-purple/10 animate-slow-rotate"></div>
        </section>
      </main>
      
      <Footer />
      
      {/* AI components with fixed positioning */}
      <div className="fixed-ai-controls">
        <AIChatbot />
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default Index;
