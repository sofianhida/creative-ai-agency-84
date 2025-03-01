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
      className={`feature-card ${delay}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 
                      ${isHovered ? 'bg-purple text-white' : 'bg-purple/10 text-purple'}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "AI Chatbot",
      description: "Chatbot pintar untuk meningkatkan layanan pelanggan dan mengotomatisasi komunikasi.",
      icon: <Bot size={32} />,
      delay: "animate-delay-100"
    },
    {
      title: "Machine Learning",
      description: "Solusi prediktif dan analisis data untuk membantu pengambilan keputusan bisnis.",
      icon: <BrainCircuit size={32} />,
      delay: "animate-delay-200"
    },
    {
      title: "Analisis Data",
      description: "Transformasi data mentah menjadi wawasan bisnis yang dapat ditindaklanjuti.",
      icon: <LineChart size={32} />,
      delay: "animate-delay-300"
    },
    {
      title: "Big Data Solution",
      description: "Pengelolaan dan pengolahan data dalam skala besar untuk kebutuhan bisnis.",
      icon: <Database size={32} />,
      delay: "animate-delay-100"
    },
    {
      title: "Computer Vision",
      description: "Pengenalan gambar dan video untuk otomatisasi pengawasan dan QC.",
      icon: <Search size={32} />,
      delay: "animate-delay-200"
    },
    {
      title: "NLP & Text Analytics",
      description: "Pemahaman dan analisis bahasa alami untuk insight dari teks tidak terstruktur.",
      icon: <Globe size={32} />,
      delay: "animate-delay-300"
    },
    {
      title: "Custom AI Solutions",
      description: "Pengembangan solusi AI yang disesuaikan dengan kebutuhan spesifik bisnis Anda.",
      icon: <Code size={32} />,
      delay: "animate-delay-100"
    },
    {
      title: "AI Consultation",
      description: "Konsultasi strategi implementasi AI untuk transformasi digital perusahaan.",
      icon: <Lightbulb size={32} />,
      delay: "animate-delay-200"
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-purple/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-purple/5 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="section">
        <h2 className="section-title">Layanan <span className="text-purple">Kami</span></h2>
        <p className="section-subtitle">
          Kami menyediakan berbagai solusi AI dan machine learning yang dapat disesuaikan 
          dengan kebutuhan bisnis Anda.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
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
