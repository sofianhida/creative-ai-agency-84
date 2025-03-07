
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  FileText, 
  BookOpen, 
  Globe, 
  BarChart, 
  FileSearch, 
  Code, 
  GraduationCap,
  Image,
  MessageSquare,
  Music,
  Shapes,
  Flower2,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  ThumbsUp
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIChatbot from '@/components/AIChatbot';

interface AIProduct {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  benefits: string[];
  caseStudies?: {
    title: string;
    description: string;
  }[];
}

const Portfolio = () => {
  const [showAIAccess, setShowAIAccess] = useState(false);
  const { toast } = useToast();

  const handleContactUsClick = () => {
    toast({
      title: "Contact Us",
      description: "You will be redirected to WhatsApp",
    });
    window.open(`https://wa.me/6285183978011`, '_blank');
  };

  const aiProducts: AIProduct[] = [
    {
      id: 'content-generator',
      name: 'AI Content Generator',
      description: 'Generate high-quality articles, marketing copy, social media posts, and more with our advanced AI content generation system.',
      icon: <FileText size={24} />,
      benefits: [
        'Save time on content creation',
        'Generate SEO-friendly content',
        'Create content in multiple languages',
        'Maintain consistent brand voice'
      ],
      caseStudies: [
        {
          title: 'E-commerce Blog',
          description: 'Helped an e-commerce store create 200+ product descriptions and blog posts, increasing organic traffic by 45%.'
        }
      ]
    },
    {
      id: 'text-summarization',
      name: 'AI Text Summarization',
      description: 'Condense long articles, reports, and documents into concise, accurate summaries that capture the key points.',
      icon: <BookOpen size={24} />,
      benefits: [
        'Quick information extraction',
        'Process large volumes of text',
        'Create executive summaries',
        'Review documents efficiently'
      ]
    },
    {
      id: 'translation',
      name: 'AI Translation',
      description: 'Translate content between multiple languages while preserving context, tone, and meaning with our neural translation engine.',
      icon: <Globe size={24} />,
      benefits: [
        'Support for 100+ languages',
        'Context-aware translations',
        'Industry-specific terminology',
        'Batch translation processing'
      ],
      caseStudies: [
        {
          title: 'Global Marketing Campaign',
          description: 'Helped a startup localize their marketing materials into 12 languages, reaching 45 new markets.'
        }
      ]
    },
    {
      id: 'data-analytics',
      name: 'AI for Data Analytics',
      description: 'Extract insights, identify trends, and visualize data with our AI-powered analytics solution.',
      icon: <BarChart size={24} />,
      benefits: [
        'Automated trend detection',
        'Predictive analytics',
        'Custom data visualizations',
        'Natural language queries'
      ]
    },
    {
      id: 'document-analyzer',
      name: 'AI Document Analyzer',
      description: 'Extract and organize information from PDFs, images, and documents with our intelligent document processing.',
      icon: <FileSearch size={24} />,
      benefits: [
        'OCR for scanned documents',
        'Data extraction to structured formats',
        'Automated form processing',
        'Contract analysis'
      ]
    },
    {
      id: 'coding-assistant',
      name: 'AI Coding Assistant',
      description: 'Accelerate development with AI-powered code generation, debugging, and optimization tools.',
      icon: <Code size={24} />,
      benefits: [
        'Code generation in multiple languages',
        'Bug detection and fixing',
        'Code documentation',
        'Refactoring suggestions'
      ],
      caseStudies: [
        {
          title: 'Software Development Firm',
          description: 'Reduced development time by 30% for a web application by utilizing our AI coding assistant.'
        }
      ]
    },
    {
      id: 'idea-generator',
      name: 'AI Idea Generator',
      description: 'Spark creativity and innovation with our AI-powered brainstorming and idea generation tool.',
      icon: <Brain size={24} />,
      benefits: [
        'Overcome creative blocks',
        'Generate project concepts',
        'Business idea validation',
        'Innovation workshops'
      ]
    },
    {
      id: 'creative-writing',
      name: 'AI Creative Writing',
      description: 'Create engaging stories, poems, scripts, and creative content with our AI writing assistant.',
      icon: <MessageSquare size={24} />,
      benefits: [
        'Generate fiction and non-fiction',
        'Character and plot development',
        'Style and tone customization',
        'Content expansion'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar showAIAccess={showAIAccess} setShowAIAccess={setShowAIAccess} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-purple/10 z-0"></div>
          <div className="absolute right-0 top-20 w-64 h-64 rounded-full bg-purple/5 animate-float"></div>
          <div className="absolute -left-32 bottom-32 w-64 h-64 rounded-full border border-purple/10 animate-slow-rotate"></div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center mb-12">
              <span className="fancy-badge animate-float mb-4 inline-block">OUR PORTFOLIO</span>
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
                AI Solutions That <span className="text-purple">Transform</span> Businesses
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Explore our AI products and see how we've helped organizations automate processes, 
                gain insights, and accelerate growth with cutting-edge technology.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={handleContactUsClick}
                  className="btn-primary text-white px-6 py-3 rounded-full flex items-center gap-2"
                >
                  <span>Contact us about solutions</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Products Grid */}
        <section className="py-16 px-4 bg-gray-50/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Our AI <span className="text-purple">Products</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our full range of AI solutions designed to solve complex problems 
                and create new opportunities for businesses of all sizes.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple/30 to-purple mx-auto mt-8 rounded-full"></div>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {aiProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-purple/10 text-purple flex items-center justify-center mb-4">
                      {product.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    
                    <div className="mt-4">
                      <h4 className="font-medium text-sm mb-2">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {product.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <ThumbsUp className="h-4 w-4 text-purple mt-1 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {product.caseStudies && product.caseStudies.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <h4 className="font-medium text-sm mb-2">Case Study:</h4>
                        {product.caseStudies.map((study, index) => (
                          <div key={index} className="bg-purple/5 p-3 rounded-lg">
                            <h5 className="font-medium text-sm">{study.title}</h5>
                            <p className="text-xs text-muted-foreground mt-1">{study.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 border-t border-gray-100">
                    <button 
                      onClick={handleContactUsClick}
                      className="w-full text-purple hover:text-purple-dark text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <span>Learn more</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-purple/80 to-purple text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our team of AI experts is ready to help you implement the perfect solution 
              for your specific business needs.
            </p>
            <button 
              onClick={handleContactUsClick}
              className="bg-white text-purple hover:bg-gray-50 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <div className="fixed-ai-controls">
        <AIChatbot />
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default Portfolio;
