import { useState } from 'react';
import { Lightbulb, X, Send, FileText, BookOpen, Globe, BarChart, FileSearch, Code, GraduationCap } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useIsMobile } from '@/hooks/use-mobile';

// Gemini API key
const GEMINI_API_KEY = 'AIzaSyBoxVz22n162WFv53J1JiSksObxCamSBOg';

// System contexts for different AI systems
const SYSTEM_CONTEXTS = {
  'content-generator': `
    You are WeVersAI's Content Generator AI assistant. 
    You specialize in creating high-quality content like articles, ads, social media captions, email copy, and marketing materials.
    Focus on being creative, engaging, and tailoring content to specific audiences and platforms.
    Always maintain the brand voice and address the user's specific content needs.
  `,
  'text-summarization': `
    You are WeVersAI's Text Summarization AI assistant.
    You specialize in creating concise, accurate summaries of articles, documents, reports, and other text content.
    Focus on extracting key points, maintaining the original meaning, and delivering clear summaries of various lengths.
    Help users understand the main ideas without reading the entire text.
  `,
  'translation': `
    You are WeVersAI's Translation AI assistant.
    You specialize in translating text between multiple languages while preserving meaning, context, and nuance.
    You can handle various content types from casual conversations to technical documents.
    Offer explanations about cultural nuances when relevant to ensure accurate communication.
  `,
  'data-analytics': `
    You are WeVersAI's Data Analytics AI assistant.
    You specialize in helping with data interpretation, business intelligence, trend analysis, and data-driven insights.
    Focus on helping users understand patterns in their data, generate reports, and make data-driven decisions.
    Offer guidance on data visualization and analytical approaches.
  `,
  'document-analyzer': `
    You are WeVersAI's Document Analyzer AI assistant.
    You specialize in extracting and analyzing information from documents like PDFs, Word files, images of documents, and spreadsheets.
    Help users extract specific data points, convert documents to structured formats, and analyze document content.
    Focus on accuracy and structure in document processing.
  `,
  'coding-assistant': `
    You are WeVersAI's Coding Assistant AI.
    You specialize in helping developers with programming tasks, debugging, code optimization, and learning new technologies.
    Provide code snippets, explain programming concepts, and help troubleshoot issues across various programming languages.
    Focus on clean, efficient, and maintainable code practices.
  `,
  'education': `
    You are WeVersAI's Education AI assistant.
    You specialize in creating educational content, lesson plans, study materials, and e-learning resources.
    Help educators and students with explanations of complex topics, quiz generation, and personalized learning materials.
    Focus on making learning engaging, accessible, and effective for various learning styles.
  `
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AISystemsAccessProps {
  showAIAccess: boolean;
  setShowAIAccess: (show: boolean) => void;
}

const AISystemsAccess = ({ showAIAccess, setShowAIAccess }: AISystemsAccessProps) => {
  const isMobile = useIsMobile();
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const aiSystems = [
    {
      id: 'content-generator',
      name: 'AI Content Generator',
      description: 'Generate articles, ads, captions, emails and more',
      icon: <FileText size={isMobile ? 20 : 24} />
    },
    {
      id: 'text-summarization',
      name: 'AI Text Summarization',
      description: 'Automatic summaries for articles & documents',
      icon: <BookOpen size={isMobile ? 20 : 24} />
    },
    {
      id: 'translation',
      name: 'AI Translation',
      description: 'Translate text between languages',
      icon: <Globe size={isMobile ? 20 : 24} />
    },
    {
      id: 'data-analytics',
      name: 'AI for Data Analytics',
      description: 'Business intelligence & data analysis',
      icon: <BarChart size={isMobile ? 20 : 24} />
    },
    {
      id: 'document-analyzer',
      name: 'AI Document Analyzer',
      description: 'Extract data from PDF, Word, and other documents',
      icon: <FileSearch size={isMobile ? 20 : 24} />
    },
    {
      id: 'coding-assistant',
      name: 'AI Coding Assistant',
      description: 'Help developers with programming tasks',
      icon: <Code size={isMobile ? 20 : 24} />
    },
    {
      id: 'education',
      name: 'AI for Education',
      description: 'Educational content & e-learning assistance',
      icon: <GraduationCap size={isMobile ? 20 : 24} />
    }
  ];

  const toggleAIAccess = () => {
    if (showAIAccess && selectedSystem) {
      // Close the system panel first, but keep the main panel open
      setSelectedSystem(null);
    } else {
      setShowAIAccess(!showAIAccess);
    }
  };

  const selectSystem = (systemId: string) => {
    setSelectedSystem(systemId);
    // Initialize messages with system context
    const systemContext = SYSTEM_CONTEXTS[systemId as keyof typeof SYSTEM_CONTEXTS];
    const systemName = getSystemName(systemId);
    
    setMessages([
      { role: 'system', content: systemContext },
      { role: 'assistant', content: `Hello! I'm the ${systemName} AI. How can I assist you today?` }
    ]);
    
    toast({
      title: `${getSystemName(systemId)} Selected`,
      description: "You can now interact with this AI system",
    });
  };

  const getSystemName = (systemId: string): string => {
    const system = aiSystems.find(sys => sys.id === systemId);
    return system ? system.name : 'AI System';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedSystem) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Initialize the Generative AI with the API key
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      
      // Get the model
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash-latest"
      });
      
      // Get the current system context
      const systemContext = SYSTEM_CONTEXTS[selectedSystem as keyof typeof SYSTEM_CONTEXTS];
      
      // Create a chat session
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemContext }],
          },
          {
            role: "model",
            parts: [{ text: "I understand. I'll act as the WeVersAI assistant with the guidelines you've provided." }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });
      
      console.log("Sending message to Gemini chat API");
      
      // Send the user message and get the response
      const result = await chat.sendMessage(input);
      const response = await result.response;
      const assistantResponse = response.text();
      
      console.log("Received response from Gemini:", assistantResponse);
      
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: assistantResponse }
      ]);
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      toast({
        title: "Error",
        description: "There was an error contacting the AI assistant. Please try again later.",
        variant: "destructive",
      });
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: "Sorry, there was an error. Please try again later or contact us via WhatsApp." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const backToSystems = () => {
    setSelectedSystem(null);
    setMessages([]);
  };

  return (
    <>
      {/* AI Access Button */}
      <button
        onClick={toggleAIAccess}
        className="fixed bottom-32 right-6 z-40 bg-white text-purple border-2 border-purple hover:bg-purple/5 p-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
        aria-label="Access AI Systems"
      >
        <Lightbulb size={24} />
      </button>
      
      {/* AI Systems Panel */}
      {showAIAccess && (
        <div className="fixed z-30 bottom-44 right-6 w-full max-w-[92vw] sm:max-w-[400px] bg-white rounded-lg shadow-glow-lg border border-gray-200 overflow-hidden transition-all duration-300">
          <div className="flex items-center justify-between p-3 bg-purple text-white">
            <div className="flex items-center gap-2">
              {selectedSystem ? (
                <>
                  <button 
                    onClick={backToSystems}
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <X size={18} />
                  </button>
                  <span className="font-medium">{getSystemName(selectedSystem)}</span>
                </>
              ) : (
                <span className="font-medium">AI Systems</span>
              )}
            </div>
            <button 
              onClick={toggleAIAccess}
              className="p-1 hover:bg-white/10 rounded"
            >
              <X size={18} />
            </button>
          </div>
          
          {!selectedSystem ? (
            // AI Systems Selection
            <div className="p-3 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-3">
                {aiSystems.map((system) => (
                  <button
                    key={system.id}
                    onClick={() => selectSystem(system.id)}
                    className="flex items-start gap-3 p-3 rounded-lg text-left hover:bg-purple/5 transition-colors"
                  >
                    <div className="bg-purple/10 text-purple rounded-md p-2 flex-shrink-0">
                      {system.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{system.name}</h3>
                      <p className="text-sm text-foreground/70 mt-1">{system.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // AI System Interaction
            <div className="flex flex-col h-[60vh]">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3">
                {messages.filter(msg => msg.role !== 'system').map((message, index) => (
                  <div 
                    key={index}
                    className={`mb-3 ${
                      message.role === 'assistant' 
                        ? 'flex justify-start' 
                        : 'flex justify-end'
                    }`}
                  >
                    <div 
                      className={`max-w-[85%] p-2.5 rounded-lg ${
                        message.role === 'assistant' 
                          ? 'bg-muted text-foreground' 
                          : 'bg-purple text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-3">
                    <div className="max-w-[85%] p-2.5 rounded-lg bg-muted text-foreground">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-purple/50 animate-pulse"></div>
                        <div className="h-2 w-2 rounded-full bg-purple/50 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 rounded-full bg-purple/50 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input Area */}
              <div className="p-2 border-t">
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={`Ask the ${getSystemName(selectedSystem)} AI...`}
                    className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple text-sm"
                    disabled={isLoading}
                  />
                  <button 
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className={`p-2 rounded-md bg-purple text-white ${isLoading || !input.trim() ? 'opacity-50' : 'hover:bg-purple-dark'}`}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AISystemsAccess;
