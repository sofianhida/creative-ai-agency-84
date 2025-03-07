
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftIcon, Brain, FileText, Image, CheckCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = "Portfolio & Products | WeVersAI";
  }, []);

  const aiProducts = [
    {
      id: 1,
      title: "AI Content Generator",
      icon: <FileText className="h-10 w-10 text-purple" />,
      description: "Generate high-quality content for your blog, social media, or website with our advanced AI.",
      benefits: ["SEO-optimized content", "Multiple tones and styles", "Multilingual support"],
      caseStudy: "Helped a marketing agency increase content production by 300% while reducing costs by 60%."
    },
    {
      id: 2,
      title: "Image Analysis System",
      icon: <Image className="h-10 w-10 text-purple" />,
      description: "Extract valuable insights from images with our powerful computer vision system.",
      benefits: ["Object recognition", "Text extraction from images", "Visual sentiment analysis"],
      caseStudy: "Enabled a retail chain to analyze customer behavior patterns from store cameras, increasing sales by 25%."
    },
    {
      id: 3,
      title: "AI Brainstorming Assistant",
      icon: <Brain className="h-10 w-10 text-purple" />,
      description: "Generate creative ideas and solutions for any business challenge.",
      benefits: ["Custom industry knowledge", "Idea evaluation", "Implementation roadmaps"],
      caseStudy: "Helped a startup develop their product roadmap, securing $2M in venture funding."
    },
    {
      id: 4,
      title: "Document Analyzer",
      icon: <FileText className="h-10 w-10 text-purple" />,
      description: "Extract key information from documents, contracts, and forms automatically.",
      benefits: ["Legal document analysis", "Key information extraction", "Contract comparison"],
      caseStudy: "Reduced document processing time by 80% for a legal firm handling thousands of contracts monthly."
    },
    {
      id: 5,
      title: "Predictive Analytics Suite",
      icon: <Brain className="h-10 w-10 text-purple" />,
      description: "Forecast trends and make data-driven decisions with our predictive AI models.",
      benefits: ["Sales forecasting", "Customer behavior prediction", "Market trend analysis"],
      caseStudy: "Improved inventory management efficiency by 40% for an e-commerce business."
    },
    {
      id: 6,
      title: "Multilingual Translation System",
      icon: <FileText className="h-10 w-10 text-purple" />,
      description: "Translate content across 50+ languages while preserving context and meaning.",
      benefits: ["Context-aware translation", "Industry-specific terminology", "Real-time translation"],
      caseStudy: "Enabled a global education platform to expand to 15 new markets in just 3 months."
    }
  ];

  const clientProjects = [
    {
      id: 1,
      clientName: "TechNova Industries",
      industry: "Manufacturing",
      description: "Implemented an AI-powered predictive maintenance system that reduced equipment downtime by 45%.",
      results: ["$1.2M annual savings", "Increased operational efficiency", "Improved safety metrics"],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      clientName: "GlobalHealth Network",
      industry: "Healthcare",
      description: "Developed a patient diagnosis assistant that helps doctors identify rare conditions with 96% accuracy.",
      results: ["30% faster diagnoses", "Reduced misdiagnosis rate", "Improved patient outcomes"],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      clientName: "EduLearn Platform",
      industry: "Education",
      description: "Created a personalized learning algorithm that adapts to individual student progress and learning styles.",
      results: ["25% improvement in test scores", "Increased student engagement", "Positive teacher feedback"],
      image: "/placeholder.svg"
    },
    {
      id: 4,
      clientName: "RetailPlus Chain",
      industry: "Retail",
      description: "Implemented customer behavior analysis system using computer vision and purchase history.",
      results: ["18% increase in average purchase value", "Optimized store layouts", "Enhanced customer satisfaction"],
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      {/* Back navigation */}
      <div className="container mx-auto px-4 mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeftIcon size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
      
      {/* Header */}
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Our Portfolio & Products
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover our cutting-edge AI solutions and successful client projects
          </p>
        </div>
        
        <Tabs defaultValue="products" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 w-[400px] mx-auto mb-8">
            <TabsTrigger value="products">AI Products</TabsTrigger>
            <TabsTrigger value="portfolio">Client Projects</TabsTrigger>
          </TabsList>
          
          {/* AI Products Tab */}
          <TabsContent value="products" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiProducts.map((product) => (
                <Card key={product.id} className="border border-border/40 hover:border-purple/30 transition-all hover:shadow-glow">
                  <CardHeader>
                    <div className="mb-3">{product.icon}</div>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="text-sm font-semibold mb-2">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-purple mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t border-border/40">
                      <h4 className="text-sm font-semibold mb-2">Case Study:</h4>
                      <p className="text-sm text-muted-foreground">{product.caseStudy}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <span>Learn More</span>
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button className="bg-purple">
                Contact Us for Custom Solutions
              </Button>
            </div>
          </TabsContent>
          
          {/* Client Projects Tab */}
          <TabsContent value="portfolio" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clientProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-glow transition-all">
                  <div className="h-40 overflow-hidden bg-muted">
                    <img 
                      src={project.image} 
                      alt={project.clientName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{project.clientName}</CardTitle>
                        <CardDescription>Industry: {project.industry}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{project.description}</p>
                    <h4 className="text-sm font-semibold mb-2">Results:</h4>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-purple mt-0.5 flex-shrink-0" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Case Study
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Want to see how our AI solutions can transform your business?
              </p>
              <Button className="bg-purple">
                Schedule a Consultation
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Portfolio;
