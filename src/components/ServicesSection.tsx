
import { 
  BrainCircuit, Bot, LineChart, Database, Search, Globe, Code, Lightbulb 
} from 'lucide-react';
import { useState } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const ServiceCard = ({ title, description, icon, delay }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`group p-6 rounded-xl bg-white border border-border shadow-sm
                hover:shadow-md transition-all duration-300 ${delay}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 
                      ${isHovered ? 'bg-purple text-white' : 'bg-purple/10 text-purple'}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-purple transition-colors">{title}</h3>
      <p className="text-foreground/70 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "AI Chatbot",
      description: "Smart conversational agents that enhance customer service and automate communications.",
      icon: <Bot size={24} />,
      delay: "animate-delay-100"
    },
    {
      title: "Machine Learning",
      description: "Custom ML models and predictive analytics that drive better business decisions.",
      icon: <BrainCircuit size={24} />,
      delay: "animate-delay-200"
    },
    {
      title: "Data Analysis",
      description: "Transform raw data into actionable business insights with advanced analytics.",
      icon: <LineChart size={24} />,
      delay: "animate-delay-300"
    },
    {
      title: "Big Data Solution",
      description: "Scalable infrastructure for processing and analyzing large datasets efficiently.",
      icon: <Database size={24} />,
      delay: "animate-delay-100"
    },
    {
      title: "Computer Vision",
      description: "AI-powered image and video recognition for automation and quality control.",
      icon: <Search size={24} />,
      delay: "animate-delay-200"
    },
    {
      title: "NLP & Text Analytics",
      description: "Extract meaning and insights from unstructured text with natural language processing.",
      icon: <Globe size={24} />,
      delay: "animate-delay-300"
    },
    {
      title: "Custom AI Solutions",
      description: "Bespoke AI development tailored to your specific business challenges and goals.",
      icon: <Code size={24} />,
      delay: "animate-delay-100"
    },
    {
      title: "AI Consultation",
      description: "Expert guidance on AI implementation strategy and digital transformation.",
      icon: <Lightbulb size={24} />,
      delay: "animate-delay-200"
    }
  ];

  return (
    <section id="services" className="py-20 md:py-24 relative overflow-hidden bg-gray-50/50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-background to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent -z-10"></div>
      <div className="absolute top-40 left-0 w-72 h-72 bg-purple/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-purple/5 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="section">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Our <span className="text-purple">Services</span></h2>
          <p className="text-lg text-foreground/70">
            We provide comprehensive AI and machine learning solutions 
            that can be customized to your unique business needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
