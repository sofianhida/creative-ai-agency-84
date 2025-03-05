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
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('english');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [contentType, setContentType] = useState('article');
  const [visualizationType, setVisualizationType] = useState('chart');
  const [educationFormat, setEducationFormat] = useState('lesson');

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

  const closePanel = () => {
    if (selectedSystem) {
      setSelectedSystem(null);
      resetSystemStates();
    } else {
      setShowAIAccess(false);
    }
  };
  
  const resetSystemStates = () => {
    setUploadedFile(null);
    setCodeLanguage('javascript');
    setSourceLang('auto');
    setTargetLang('english');
    setSummaryLength('medium');
    setContentType('article');
    setVisualizationType('chart');
    setEducationFormat('lesson');
    setMessages([]);
    setInput('');
  };

  const selectSystem = (systemId: string) => {
    setSelectedSystem(systemId);
    resetSystemStates();
    
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      toast({
        title: "File Uploaded",
        description: `${e.target.files[0].name} is ready for analysis`,
      });
    }
  };

  const sendMessage = async () => {
    if ((!input.trim() && !uploadedFile) || !selectedSystem) return;
    
    let messageContent = input;
    
    switch (selectedSystem) {
      case 'text-summarization':
        messageContent = `Please provide a ${summaryLength} length summary of the following text: ${input}`;
        break;
      case 'translation':
        messageContent = `Translate the following text from ${sourceLang} to ${targetLang}: ${input}`;
        break;
      case 'content-generator':
        messageContent = `Generate a ${contentType} about: ${input}`;
        break;
      case 'data-analytics':
        messageContent = `Analyze this data and provide insights with ${visualizationType} visualization recommendations: ${input}`;
        break;
      case 'document-analyzer':
        messageContent = uploadedFile 
          ? `I've uploaded a file named ${uploadedFile.name}. Please analyze it and ${input}`
          : `Analyze this text as if it were a document: ${input}`;
        break;
      case 'coding-assistant':
        messageContent = `Using ${codeLanguage}, ${input}`;
        break;
      case 'education':
        messageContent = `Create a ${educationFormat} about: ${input}`;
        break;
    }
    
    const userMessage = { role: 'user' as const, content: messageContent };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash-latest"
      });
      
      const systemContext = SYSTEM_CONTEXTS[selectedSystem as keyof typeof SYSTEM_CONTEXTS];
      
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
      
      const result = await chat.sendMessage(messageContent);
      const response = await result.response;
      let assistantResponse = response.text();
      
      assistantResponse = assistantResponse.replace(/\*\*(.*?)\*\*/g, '$1');
      assistantResponse = assistantResponse.replace(/\*(.*?)\*/g, '$1');
      
      console.log("Received response from Gemini:", assistantResponse);
      
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: assistantResponse }
      ]);
      
      if (selectedSystem === 'document-analyzer' && uploadedFile) {
        setUploadedFile(null);
      }
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
    resetSystemStates();
  };
  
  const renderSystemSpecificControls = () => {
    if (!selectedSystem) return null;
    
    switch (selectedSystem) {
      case 'document-analyzer':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Upload a document for analysis</p>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
              onChange={handleFileUpload}
              className="w-full text-xs"
            />
            {uploadedFile && (
              <div className="mt-2 text-xs bg-muted p-1 rounded flex justify-between items-center">
                <span>{uploadedFile.name}</span>
                <button 
                  onClick={() => setUploadedFile(null)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        );
        
      case 'coding-assistant':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Select programming language</p>
            <select
              value={codeLanguage}
              onChange={(e) => setCodeLanguage(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="cpp">C++</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="swift">Swift</option>
              <option value="kotlin">Kotlin</option>
              <option value="typescript">TypeScript</option>
              <option value="sql">SQL</option>
              <option value="html">HTML/CSS</option>
            </select>
          </div>
        );
        
      case 'translation':
        return (
          <div className="mb-2 p-2 border-t">
            <div className="flex justify-between gap-2">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Source Language</p>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full p-1 text-xs border rounded"
                >
                  <option value="auto">Auto-detect</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="italian">Italian</option>
                  <option value="portuguese">Portuguese</option>
                  <option value="russian">Russian</option>
                  <option value="japanese">Japanese</option>
                  <option value="korean">Korean</option>
                  <option value="chinese">Chinese</option>
                  <option value="arabic">Arabic</option>
                  <option value="hindi">Hindi</option>
                  <option value="indonesian">Indonesian</option>
                </select>
              </div>
              
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Target Language</p>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full p-1 text-xs border rounded"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="italian">Italian</option>
                  <option value="portuguese">Portuguese</option>
                  <option value="russian">Russian</option>
                  <option value="japanese">Japanese</option>
                  <option value="korean">Korean</option>
                  <option value="chinese">Chinese</option>
                  <option value="arabic">Arabic</option>
                  <option value="hindi">Hindi</option>
                  <option value="indonesian">Indonesian</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 'text-summarization':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Summary Length</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSummaryLength('short')}
                className={`text-xs px-2 py-1 rounded flex-1 ${summaryLength === 'short' 
                  ? 'bg-purple text-white' 
                  : 'bg-muted hover:bg-muted/80'}`}
              >
                Short
              </button>
              <button
                onClick={() => setSummaryLength('medium')}
                className={`text-xs px-2 py-1 rounded flex-1 ${summaryLength === 'medium' 
                  ? 'bg-purple text-white' 
                  : 'bg-muted hover:bg-muted/80'}`}
              >
                Medium
              </button>
              <button
                onClick={() => setSummaryLength('long')}
                className={`text-xs px-2 py-1 rounded flex-1 ${summaryLength === 'long' 
                  ? 'bg-purple text-white' 
                  : 'bg-muted hover:bg-muted/80'}`}
              >
                Long
              </button>
            </div>
          </div>
        );
        
      case 'content-generator':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Content Type</p>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="article">Article</option>
              <option value="ad copy">Ad Copy</option>
              <option value="social media post">Social Media Post</option>
              <option value="email">Email</option>
              <option value="product description">Product Description</option>
              <option value="blog post">Blog Post</option>
              <option value="press release">Press Release</option>
            </select>
          </div>
        );
        
      case 'data-analytics':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Visualization Type</p>
            <select
              value={visualizationType}
              onChange={(e) => setVisualizationType(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="chart">Chart</option>
              <option value="table">Table</option>
              <option value="dashboard">Dashboard</option>
              <option value="report">Report</option>
              <option value="infographic">Infographic</option>
            </select>
          </div>
        );
        
      case 'education':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Education Format</p>
            <select
              value={educationFormat}
              onChange={(e) => setEducationFormat(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="lesson">Lesson Plan</option>
              <option value="quiz">Quiz</option>
              <option value="flashcards">Flashcards</option>
              <option value="study guide">Study Guide</option>
              <option value="presentation">Presentation</option>
              <option value="interactive activity">Interactive Activity</option>
            </select>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <>
      {showAIAccess && (
        <div className="ai-systems-panel glass border border-purple/30 shadow-glow-lg overflow-hidden transition-all duration-300">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple to-purple-dark text-white">
            <div className="flex items-center gap-2">
              {selectedSystem ? (
                <>
                  <button 
                    onClick={backToSystems}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>
                  <span className="font-medium">{getSystemName(selectedSystem)}</span>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Lightbulb size={20} />
                  <span className="font-medium text-lg">WeVersAI Systems</span>
                </div>
              )}
            </div>
            <button 
              onClick={closePanel}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          {!selectedSystem ? (
            <div className="p-4 max-h-[70vh] overflow-y-auto bg-gradient-to-b from-white to-gray-50">
              <div className="grid grid-cols-1 gap-3">
                {aiSystems.map((system) => (
                  <button
                    key={system.id}
                    onClick={() => selectSystem(system.id)}
                    className="flex items-start gap-3 p-3.5 rounded-xl text-left hover:bg-purple/5 transition-colors border border-gray-100 hover:border-purple/20 hover:shadow-sm bg-white"
                  >
                    <div className="bg-purple/10 text-purple rounded-lg p-2.5 flex-shrink-0">
                      {system.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{system.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{system.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-[70vh] bg-gradient-to-b from-white to-gray-50">
              <div className="flex-1 overflow-y-auto p-4">
                {messages.filter(msg => msg.role !== 'system').map((message, index) => (
                  <div 
                    key={index}
                    className={`mb-4 ${
                      message.role === 'assistant' 
                        ? 'flex justify-start' 
                        : 'flex justify-end'
                    }`}
                  >
                    <div 
                      className={`max-w-[85%] p-3 rounded-xl ${
                        message.role === 'assistant' 
                          ? 'bg-gray-100 text-gray-800 shadow-sm' 
                          : 'bg-purple text-white shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="max-w-[85%] p-3 rounded-xl bg-gray-100 text-gray-800 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-purple/50 animate-pulse"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-purple/50 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-purple/50 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {renderSystemSpecificControls()}
              
              <div className="p-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  {selectedSystem === 'text-summarization' || selectedSystem === 'content-generator' ? (
                    <textarea 
                      value={input}
                      onChange={handleInputChange}
                      placeholder={`Ask the ${getSystemName(selectedSystem)} AI...`}
                      className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple/30 text-sm resize-y min-h-[80px] shadow-sm"
                      disabled={isLoading}
                    />
                  ) : (
                    <input 
                      type="text" 
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder={`Ask the ${getSystemName(selectedSystem)} AI...`}
                      className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple/30 text-sm shadow-sm"
                      disabled={isLoading}
                    />
                  )}
                  <button 
                    onClick={sendMessage}
                    disabled={isLoading || (!input.trim() && !uploadedFile)}
                    className={`p-3 rounded-xl bg-purple text-white ${isLoading || (!input.trim() && !uploadedFile) ? 'opacity-50' : 'hover:bg-purple-dark shadow-sm'}`}
                  >
                    <Send size={18} />
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
