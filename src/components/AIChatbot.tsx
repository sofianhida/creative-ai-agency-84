
import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { GoogleGenAI } from '@google/genai';
import AISystems from './AISystems';

// Gemini API key
const GEMINI_API_KEY = 'AIzaSyC6ZfX-4O8dV1eocXwnMfXIB3mT0J_YW-0';

const WELCOME_MESSAGE = "Hello! I'm an AI Assistant from WeVersAI. How can I help you with our AI services?";
const SYSTEM_CONTEXT = `
You are an assistant for WeVersAI, a leading AI agency providing cutting-edge artificial intelligence solutions.
Our services include: AI Chatbot, Machine Learning, Data Analysis, Big Data Solution, Computer Vision, NLP & Text Analytics, Custom AI Solutions, and AI Consultation.
You are very helpful, professional, and always aim to provide the best answers about WeVersAI services.
If there are questions outside the context of WeVersAI services, direct the user to contact our team via WhatsApp at 085183978011.
Do not use markdown formatting like asterisks (*) in your responses.
`;

// System-specific contexts
const SYSTEM_CONTEXTS = {
  'general': SYSTEM_CONTEXT,
  'content-generator': `
    You are WeVersAI's Content Generator AI assistant. 
    You specialize in creating high-quality content like articles, ads, social media captions, email copy, and marketing materials.
    Focus on being creative, engaging, and tailoring content to specific audiences and platforms.
    Always maintain the brand voice and address the user's specific content needs.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'text-summarization': `
    You are WeVersAI's Text Summarization AI assistant.
    You specialize in creating concise, accurate summaries of articles, documents, reports, and other text content.
    Focus on extracting key points, maintaining the original meaning, and delivering clear summaries of various lengths.
    Help users understand the main ideas without reading the entire text.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'translation': `
    You are WeVersAI's Translation AI assistant.
    You specialize in translating text between multiple languages while preserving meaning, context, and nuance.
    You can handle various content types from casual conversations to technical documents.
    Offer explanations about cultural nuances when relevant to ensure accurate communication.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'data-analytics': `
    You are WeVersAI's Data Analytics AI assistant.
    You specialize in helping with data interpretation, business intelligence, trend analysis, and data-driven insights.
    Focus on helping users understand patterns in their data, generate reports, and make data-driven decisions.
    Offer guidance on data visualization and analytical approaches.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'document-analyzer': `
    You are WeVersAI's Document Analyzer AI assistant.
    You specialize in extracting and analyzing information from documents like PDFs, Word files, images of documents, and spreadsheets.
    Help users extract specific data points, convert documents to structured formats, and analyze document content.
    Focus on accuracy and structure in document processing.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'coding-assistant': `
    You are WeVersAI's Coding Assistant AI.
    You specialize in helping developers with programming tasks, debugging, code optimization, and learning new technologies.
    Provide code snippets, explain programming concepts, and help troubleshoot issues across various programming languages.
    Focus on clean, efficient, and maintainable code practices.
    When providing code examples, do not use markdown formatting with asterisks, just provide the code directly.
  `,
  'education': `
    You are WeVersAI's Education AI assistant.
    You specialize in creating educational content, lesson plans, study materials, and e-learning resources.
    Help educators and students with explanations of complex topics, quiz generation, and personalized learning materials.
    Focus on making learning engaging, accessible, and effective for various learning styles.
    Do not use markdown formatting like asterisks (*) in your responses.
  `
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: SYSTEM_CONTEXT },
    { role: 'assistant', content: WELCOME_MESSAGE }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentSystem, setCurrentSystem] = useState('general');
  const [aiSystemsOpen, setAiSystemsOpen] = useState(false);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // When system changes, update the context and welcome message
    if (currentSystem !== 'general') {
      const systemContext = SYSTEM_CONTEXTS[currentSystem as keyof typeof SYSTEM_CONTEXTS] || SYSTEM_CONTEXT;
      const systemName = getSystemName(currentSystem);
      
      setMessages([
        { role: 'system', content: systemContext },
        { role: 'assistant', content: `Hello! I'm the ${systemName} AI. How can I assist you today?` }
      ]);
    }
  }, [currentSystem]);

  const getSystemName = (systemId: string): string => {
    switch(systemId) {
      case 'content-generator': return 'Content Generator';
      case 'text-summarization': return 'Text Summarization';
      case 'translation': return 'Translation';
      case 'data-analytics': return 'Data Analytics';
      case 'document-analyzer': return 'Document Analyzer';
      case 'coding-assistant': return 'Coding Assistant';
      case 'education': return 'Education';
      default: return 'WeVersAI Assistant';
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSystemSelect = (systemId: string) => {
    setCurrentSystem(systemId);
    toast({
      title: "AI System Changed",
      description: `Switched to ${getSystemName(systemId)} AI`,
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Initialize the Generative AI with the API key
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      
      // Get the current system context
      const systemContext = SYSTEM_CONTEXTS[currentSystem as keyof typeof SYSTEM_CONTEXTS] || SYSTEM_CONTEXT;
      
      // Build conversation history for context
      const conversationHistory = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
      
      const fullPrompt = `${systemContext}\n\nConversation history:\n${conversationHistory}\n\nUser: ${input}\n\nAssistant:`;
      
      console.log("Sending message to Gemini API");
      
      // Generate response using the new API
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
        config: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      });
      
      let assistantResponse = response.text;
      
      // Clean markdown formatting (remove asterisks for bold/italic)
      assistantResponse = assistantResponse.replace(/\*\*(.*?)\*\*/g, '$1');
      assistantResponse = assistantResponse.replace(/\*(.*?)\*/g, '$1');
      
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* AI Systems selector button */}
      <AISystems 
        isOpen={aiSystemsOpen}
        setIsOpen={setAiSystemsOpen}
        onSelectSystem={handleSystemSelect}
      />
      
      {/* Chat button - repositioned for better spacing */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-20 right-6 z-40 bg-purple text-white p-3 rounded-full shadow-glow transition-all duration-300 hover:bg-purple-dark hover:scale-105`}
        aria-label="Chat with AI Assistant"
      >
        <Bot size={24} />
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div 
          className={`fixed z-40 shadow-glow-lg transition-all duration-300 ease-in-out ${
            isMinimized 
              ? 'bottom-20 right-6 w-72 h-14' 
              : 'bottom-20 right-6 w-full max-w-[92vw] sm:max-w-[400px] h-[500px] sm:h-[450px] max-h-[70vh]'
          }`}
        >
          <div className="flex flex-col h-full rounded-lg overflow-hidden border bg-background">
            {/* Chat header */}
            <div className="flex items-center justify-between p-3 bg-purple text-white">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                {!isMinimized && (
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">WeVersAI Assistant</span>
                    <span className="text-xs text-white/80">{getSystemName(currentSystem)}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={toggleMinimize} className="p-1 hover:bg-white/10 rounded" aria-label={isMinimized ? "Maximize" : "Minimize"}>
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button onClick={toggleChat} className="p-1 hover:bg-white/10 rounded" aria-label="Close">
                  <X size={18} />
                </button>
              </div>
            </div>
            
            {/* Chat messages */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-3 bg-background">
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
                <div ref={messagesEndRef} />
              </div>
            )}
            
            {/* Chat input */}
            {!isMinimized && (
              <div className="p-2 border-t">
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask something..." 
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
