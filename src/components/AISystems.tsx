
import { useState } from 'react';
import { 
  FileText, BookOpen, Globe, BarChart, FileSearch, Code, GraduationCap, X, ChevronRight,
  Image, MessageSquare, Music, Brain, Shapes, Flower2, ShieldCheck, 
  Calculator, Line, Microscope, Map, Landmark, HeartPulse, Shirt, School,
  Award, Plane, Coffee, DollarSign, Film, Cpu, LineChart
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface AISystemProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSelectSystem: (system: string) => void;
}

const AISystems = ({ isOpen, setIsOpen, onSelectSystem }: AISystemProps) => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  const aiSystems = [
    {
      id: 'content-generator',
      name: 'AI Content Generator',
      description: 'Generate articles, ads, captions, emails and more',
      icon: <FileText size={isMobile ? 16 : 20} />
    },
    {
      id: 'text-summarization',
      name: 'AI Text Summarization',
      description: 'Automatic summaries for articles & documents',
      icon: <BookOpen size={isMobile ? 16 : 20} />
    },
    {
      id: 'translation',
      name: 'AI Translation',
      description: 'Translate text between languages',
      icon: <Globe size={isMobile ? 16 : 20} />
    },
    {
      id: 'data-analytics',
      name: 'AI for Data Analytics',
      description: 'Business intelligence & data analysis',
      icon: <BarChart size={isMobile ? 16 : 20} />
    },
    {
      id: 'document-analyzer',
      name: 'AI Document Analyzer',
      description: 'Extract data from PDF, Word, and other documents',
      icon: <FileSearch size={isMobile ? 16 : 20} />
    },
    {
      id: 'coding-assistant',
      name: 'AI Coding Assistant',
      description: 'Help developers with programming tasks',
      icon: <Code size={isMobile ? 16 : 20} />
    },
    {
      id: 'education',
      name: 'AI for Education',
      description: 'Educational content & e-learning assistance',
      icon: <GraduationCap size={isMobile ? 16 : 20} />
    },
    // New AI systems
    {
      id: 'image-description',
      name: 'AI Image Description',
      description: 'Generate detailed descriptions of images',
      icon: <Image size={isMobile ? 16 : 20} />
    },
    {
      id: 'creative-writing',
      name: 'AI Creative Writing',
      description: 'Generate stories, poems, scripts, and creative content',
      icon: <MessageSquare size={isMobile ? 16 : 20} />
    },
    {
      id: 'music-lyrics',
      name: 'AI Music Lyrics',
      description: 'Create song lyrics in various genres and styles',
      icon: <Music size={isMobile ? 16 : 20} />
    },
    {
      id: 'brainstorming',
      name: 'AI Brainstorming',
      description: 'Generate ideas for projects, businesses, and more',
      icon: <Brain size={isMobile ? 16 : 20} />
    },
    {
      id: 'pattern-recognition',
      name: 'AI Pattern Recognition',
      description: 'Identify patterns and insights in text data',
      icon: <Shapes size={isMobile ? 16 : 20} />
    },
    {
      id: 'nature-guide',
      name: 'AI Nature Guide',
      description: 'Information about plants, animals, and natural phenomena',
      icon: <Flower2 size={isMobile ? 16 : 20} />
    },
    {
      id: 'security-advisor',
      name: 'AI Security Advisor',
      description: 'Guidance on digital security best practices',
      icon: <ShieldCheck size={isMobile ? 16 : 20} />
    },
    // New AI systems
    {
      id: 'math-solver',
      name: 'AI Math Solver',
      description: 'Solve mathematical problems and equations',
      icon: <Calculator size={isMobile ? 16 : 20} />
    },
    {
      id: 'poem-generator',
      name: 'AI Poem Generator',
      description: 'Create poems in various styles and on any topic',
      icon: <Line size={isMobile ? 16 : 20} />
    },
    {
      id: 'science-tutor',
      name: 'AI Science Tutor',
      description: 'Learn about science concepts and experiments',
      icon: <Microscope size={isMobile ? 16 : 20} />
    },
    {
      id: 'travel-planner',
      name: 'AI Travel Planner',
      description: 'Get travel itineraries and destination recommendations',
      icon: <Map size={isMobile ? 16 : 20} />
    },
    {
      id: 'history-explorer',
      name: 'AI History Explorer',
      description: 'Discover historical events, people, and cultures',
      icon: <Landmark size={isMobile ? 16 : 20} />
    },
    {
      id: 'health-advisor',
      name: 'AI Health Advisor',
      description: 'General wellness and health information',
      icon: <HeartPulse size={isMobile ? 16 : 20} />
    },
    {
      id: 'fashion-consultant',
      name: 'AI Fashion Consultant',
      description: 'Style advice and fashion recommendations',
      icon: <Shirt size={isMobile ? 16 : 20} />
    },
    {
      id: 'language-tutor',
      name: 'AI Language Tutor',
      description: 'Learn vocabulary and practice conversations',
      icon: <School size={isMobile ? 16 : 20} />
    },
    {
      id: 'interview-coach',
      name: 'AI Interview Coach',
      description: 'Prepare for job interviews with practice questions',
      icon: <Award size={isMobile ? 16 : 20} />
    },
    {
      id: 'travel-translator',
      name: 'AI Travel Translator',
      description: 'Instant translation for travelers in any country',
      icon: <Plane size={isMobile ? 16 : 20} />
    },
    {
      id: 'recipe-creator',
      name: 'AI Recipe Creator',
      description: 'Generate recipes based on ingredients or cuisine',
      icon: <Coffee size={isMobile ? 16 : 20} />
    },
    {
      id: 'financial-advisor',
      name: 'AI Financial Advisor',
      description: 'Basic financial planning and budgeting tips',
      icon: <DollarSign size={isMobile ? 16 : 20} />
    },
    {
      id: 'movie-recommender',
      name: 'AI Movie Recommender',
      description: 'Get personalized film and TV show recommendations',
      icon: <Film size={isMobile ? 16 : 20} />
    },
    {
      id: 'tech-explainer',
      name: 'AI Tech Explainer',
      description: 'Explain technical concepts in simple terms',
      icon: <Cpu size={isMobile ? 16 : 20} />
    },
    {
      id: 'marketing-strategist',
      name: 'AI Marketing Strategist',
      description: 'Generate marketing ideas and campaign strategies',
      icon: <LineChart size={isMobile ? 16 : 20} />
    }
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSelectSystem = (systemId: string) => {
    onSelectSystem(systemId);
    setIsOpen(false);
    setIsExpanded(false);
  };

  return (
    <div className={`fixed z-40 ${isOpen ? 'bottom-32' : 'bottom-20'} right-6 transition-all duration-300`}>
      {isOpen && (
        <div className="relative">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute -top-2 -right-2 bg-purple rounded-full p-1 text-white shadow-md"
          >
            <X size={16} />
          </button>
          
          <div className={`bg-white rounded-lg shadow-glow-lg p-3 border border-border w-64 sm:w-72 max-h-80 overflow-y-auto
                        transform transition-all duration-300`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm">AI Systems</h3>
              <button 
                className="text-purple hover:text-purple-dark text-xs flex items-center"
                onClick={toggleExpanded}
              >
                {isExpanded ? 'Collapse' : 'Expand all'} 
                <ChevronRight size={14} className={`ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
            </div>
            
            <div className="space-y-2">
              {aiSystems.map((system) => (
                <button
                  key={system.id}
                  onClick={() => handleSelectSystem(system.id)}
                  className="w-full text-left p-2 rounded-lg hover:bg-purple/5 transition-colors flex items-start"
                >
                  <div className="bg-purple/10 text-purple rounded-md p-1.5 mr-2 flex-shrink-0">
                    {system.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{system.name}</h4>
                    {isExpanded && (
                      <p className="text-xs text-foreground/70 mt-1">{system.description}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white text-purple border border-purple hover:bg-purple/5 p-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          aria-label="View AI Systems"
        >
          <Code size={18} />
        </button>
      )}
    </div>
  );
};

export default AISystems;
