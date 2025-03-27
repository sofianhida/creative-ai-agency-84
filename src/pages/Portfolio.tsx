
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, Briefcase, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set page title
    document.title = "Portfolio | WeVersAI";
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

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

  // Portfolio projects data
  const portfolioProjects = [
    {
      title: "EduVerseAI",
      description: "An AI-powered educational platform built for a school client.",
      url: "https://eduverse-ai--eight.vercel.app/",
      category: "Education"
    },
    {
      title: "Class Scheduler",
      description: "Intelligent scheduling system built for educational institutions.",
      url: "https://class-scheduler-ai-05-mszh4haau-sofian-hidayats-projects.vercel.app/",
      category: "Education"
    },
    {
      title: "N8N Chatbot WA AI",
      description: "AI customer service chatbot for WhatsApp built for yuanadam.com.",
      url: "https://www.yuanadam.com/",
      category: "Customer Service"
    },
    {
      title: "WebJob",
      description: "AI-powered job matching and recruitment platform for educational institutions.",
      url: "https://webjob-cyan.vercel.app/",
      category: "Recruitment"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-purple/5 pt-24 pb-20">
      {/* Back navigation */}
      <div className="container mx-auto px-4 absolute top-20 left-0">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeftIcon size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
      
      <div className="max-w-5xl mx-auto px-4">
        {isLoading ? (
          <div className="min-h-[60vh] flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-purple/30 border-t-purple rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple/10 flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-purple" />
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold font-display mb-6">
                Our Portfolio
              </h1>
              
              <div className="w-32 h-1 bg-gradient-to-r from-purple/30 to-purple mx-auto mb-8 rounded-full"></div>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Explore our portfolio showcasing successful AI projects we've developed for various industries.
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {portfolioProjects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{project.title}</CardTitle>
                        <span className="text-xs bg-purple/10 text-purple px-2 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <CardDescription className="mt-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40 bg-gradient-to-br from-purple/10 to-purple/30 rounded-md flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-purple/10 flex items-center justify-center">
                          <span className="text-purple font-medium">{project.title}</span>
                        </div>
                        <div className="absolute inset-0 bg-purple/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-medium">View Project</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="text-sm text-muted-foreground">AI Solution</span>
                      <a 
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple hover:text-purple/80 flex items-center gap-1"
                      >
                        Visit <ExternalLink size={14} />
                      </a>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="text-muted-foreground mb-6">
                Interested in our solutions? Get in touch with us today!
              </p>
              
              <Button asChild className="bg-purple hover:bg-purple/90">
                <Link to="/#contact">Contact Us</Link>
              </Button>
            </motion.div>
          </>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute left-10 top-1/3 w-32 h-32 rounded-full border border-purple/10 animate-slow-rotate opacity-50"></div>
      <div className="absolute right-20 bottom-40 w-24 h-24 rounded-full border border-purple/5 animate-slow-rotate opacity-30" style={{ animationDuration: '15s' }}></div>
    </div>
  );
};

export default Portfolio;
