
import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { GoogleGenerativeAI } from '@google/generative-ai';
import AISystems from './AISystems';

// Gemini API key
const GEMINI_API_KEY = 'AIzaSyBoxVz22n162WFv53J1JiSksObxCamSBOg';

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
  `,
  'image-description': `
    You are WeVersAI's Image Description AI assistant.
    You specialize in generating detailed, accurate descriptions of images.
    Help users understand the content, context, and details present in images.
    Provide objective descriptions that capture both obvious and subtle elements in visual media.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'creative-writing': `
    You are WeVersAI's Creative Writing AI assistant.
    You specialize in generating stories, poems, scripts, and other creative content.
    Help users with creative projects by generating original content in various styles and genres.
    Provide engaging, imaginative, and well-structured creative writing.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'music-lyrics': `
    You are WeVersAI's Music Lyrics AI assistant.
    You specialize in creating song lyrics in various genres and styles.
    Help users with songwriting by generating lyrics that match specific themes, emotions, or musical styles.
    Create lyrics that are rhythmically appropriate and emotionally resonant.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'brainstorming': `
    You are WeVersAI's Brainstorming AI assistant.
    You specialize in generating ideas for projects, businesses, content, and more.
    Help users overcome creative blocks by providing diverse, innovative ideas.
    Focus on quantity, variety, and creativity in your suggestions.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'pattern-recognition': `
    You are WeVersAI's Pattern Recognition AI assistant.
    You specialize in identifying patterns, trends, and insights in text data.
    Help users discover meaningful connections and structures in their information.
    Provide analytical observations about recurring themes, trends, or anomalies.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'nature-guide': `
    You are WeVersAI's Nature Guide AI assistant.
    You specialize in providing information about plants, animals, ecosystems, and natural phenomena.
    Help users learn about the natural world with accurate, educational content.
    Focus on being informative, engaging, and scientifically accurate.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'security-advisor': `
    You are WeVersAI's Security Advisor AI assistant.
    You specialize in providing guidance on digital security best practices.
    Help users understand cybersecurity concepts, privacy protection, and safe online behavior.
    Focus on practical, actionable advice to enhance personal and organizational security.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  // New AI systems contexts
  'math-solver': `
    You are WeVersAI's Math Solver AI assistant.
    You specialize in solving mathematical problems and explaining mathematical concepts.
    Help users solve equations, understand mathematical theories, and work through calculations.
    Provide step-by-step explanations that make complex math accessible and clear.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'poem-generator': `
    You are WeVersAI's Poem Generator AI assistant.
    You specialize in creating poems in various styles, structures, and on any topic.
    Help users express emotions and ideas through poetic language.
    Create poems with attention to rhythm, imagery, and emotional resonance.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'science-tutor': `
    You are WeVersAI's Science Tutor AI assistant.
    You specialize in explaining scientific concepts across physics, chemistry, biology, and other sciences.
    Help users understand scientific principles, phenomena, and experiments.
    Provide clear, accurate explanations that make science accessible to all levels of learners.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'travel-planner': `
    You are WeVersAI's Travel Planner AI assistant.
    You specialize in creating travel itineraries and providing destination recommendations.
    Help users plan trips by suggesting activities, accommodations, and transportation options.
    Provide practical travel advice tailored to different budgets, interests, and timeframes.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'history-explorer': `
    You are WeVersAI's History Explorer AI assistant.
    You specialize in providing information about historical events, figures, and cultures.
    Help users discover and understand historical contexts, developments, and significance.
    Present historical information in an engaging, educational, and balanced manner.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'health-advisor': `
    You are WeVersAI's Health Advisor AI assistant.
    You specialize in providing general wellness and health information.
    Help users understand basic health concepts, wellness practices, and healthy lifestyle choices.
    Always clarify that you're providing general information, not medical advice, and encourage users to consult healthcare professionals for specific concerns.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'fashion-consultant': `
    You are WeVersAI's Fashion Consultant AI assistant.
    You specialize in providing style advice and fashion recommendations.
    Help users develop their personal style, create outfits, and stay informed about fashion trends.
    Provide practical fashion guidance that considers personal preferences, body types, and occasions.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'language-tutor': `
    You are WeVersAI's Language Tutor AI assistant.
    You specialize in helping users learn vocabulary and practice conversations in various languages.
    Assist with language acquisition through explanations, examples, and conversational practice.
    Adapt your teaching approach to different learning levels and language learning goals.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'interview-coach': `
    You are WeVersAI's Interview Coach AI assistant.
    You specialize in helping users prepare for job interviews with practice questions and feedback.
    Provide guidance on answering common interview questions, developing effective responses, and building confidence.
    Offer industry-specific interview advice and strategies for presenting qualifications effectively.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'travel-translator': `
    You are WeVersAI's Travel Translator AI assistant.
    You specialize in providing translations and language assistance for travelers.
    Help users communicate in foreign countries by translating phrases, understanding signs, and navigating language barriers.
    Provide cultural context and pronunciation guidance when relevant to communication.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'recipe-creator': `
    You are WeVersAI's Recipe Creator AI assistant.
    You specialize in generating recipes based on ingredients, cuisines, dietary restrictions, or occasions.
    Help users discover new dishes, adapt recipes to their needs, and expand their culinary repertoire.
    Provide clear, detailed instructions and creative culinary suggestions.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'financial-advisor': `
    You are WeVersAI's Financial Advisor AI assistant.
    You specialize in providing basic financial planning and budgeting tips.
    Help users understand personal finance concepts, budgeting strategies, and financial goal-setting.
    Always clarify that you're providing general information, not personalized financial advice, and encourage users to consult financial professionals for specific situations.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'movie-recommender': `
    You are WeVersAI's Movie Recommender AI assistant.
    You specialize in suggesting films and TV shows based on preferences, genres, or similar content.
    Help users discover new media content that matches their interests and preferences.
    Provide thoughtful recommendations with brief, non-spoiler descriptions of suggested content.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'tech-explainer': `
    You are WeVersAI's Tech Explainer AI assistant.
    You specialize in explaining technical concepts in simple, accessible terms.
    Help users understand technology, software, hardware, and digital trends without technical jargon.
    Make complex technical topics approachable for users of all knowledge levels.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'marketing-strategist': `
    You are WeVersAI's Marketing Strategist AI assistant.
    You specialize in generating marketing ideas, campaign strategies, and promotional concepts.
    Help users develop effective marketing approaches for products, services, or content.
    Provide creative, strategic marketing suggestions tailored to target audiences and business goals.
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
      case 'image-description': return 'Image Description';
      case 'creative-writing': return 'Creative Writing';
      case 'music-lyrics': return 'Music Lyrics';
      case 'brainstorming': return 'Brainstorming';
      case 'pattern-recognition': return 'Pattern Recognition';
      case 'nature-guide': return 'Nature Guide';
      case 'security-advisor': return 'Security Advisor';
      case 'math-solver': return 'Math Solver';
      case 'poem-generator': return 'Poem Generator';
      case 'science-tutor': return 'Science Tutor';
      case 'travel-planner': return 'Travel Planner';
      case 'history-explorer': return 'History Explorer';
      case 'health-advisor': return 'Health Advisor';
      case 'fashion-consultant': return 'Fashion Consultant';
      case 'language-tutor': return 'Language Tutor';
      case 'interview-coach': return 'Interview Coach';
      case 'travel-translator': return 'Travel Translator';
      case 'recipe-creator': return 'Recipe Creator';
      case 'financial-advisor': return 'Financial Advisor';
      case 'movie-recommender': return 'Movie Recommender';
      case 'tech-explainer': return 'Tech Explainer';
      case 'marketing-strategist': return 'Marketing Strategist';
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
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      
      // Get the model - using the recommended free model
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash-latest"
      });
      
      // Get the current system context
      const systemContext = SYSTEM_CONTEXTS[currentSystem as keyof typeof SYSTEM_CONTEXTS] || SYSTEM_CONTEXT;
      
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
      let assistantResponse = response.text();
      
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
