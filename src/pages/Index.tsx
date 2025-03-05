
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
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main className="pt-16 relative z-0">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      
      {/* AI components positioned on sides */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-6">
        <AISystemsAccess showAIAccess={showAIAccess} setShowAIAccess={setShowAIAccess} />
      </div>
      
      <div className="fixed right-6 bottom-6 z-50">
        <AIChatbot />
      </div>

      {/* WhatsApp button is handled by its own fixed positioning */}
    </div>
  );
};

export default Index;
