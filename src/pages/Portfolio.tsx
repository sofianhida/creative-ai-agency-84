
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  useEffect(() => {
    // Set page title
    document.title = "Portfolio | WeVersAI";
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20 pb-16 flex flex-col items-center justify-center">
      {/* Back navigation */}
      <div className="container mx-auto px-4 absolute top-20 left-0">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeftIcon size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
      
      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple/10 flex items-center justify-center">
          <Clock className="w-10 h-10 text-purple" />
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
          Our Portfolio
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-purple/30 to-purple mx-auto mb-8 rounded-full"></div>
        
        <p className="text-xl text-muted-foreground mb-8">
          We're currently working on something amazing. Our portfolio page will be available soon!
        </p>
        
        <div className="space-y-2">
          <p className="text-muted-foreground mb-6">
            In the meantime, feel free to contact us to learn more about our AI solutions
          </p>
          
          <Button asChild className="bg-purple">
            <Link to="/#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
