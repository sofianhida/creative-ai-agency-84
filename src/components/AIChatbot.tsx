
import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Gemini API key
const GEMINI_API_KEY = 'AIzaSyBoxVz22n162WFv53J1JiSksObxCamSBOg';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const WELCOME_MESSAGE = "Halo! Saya adalah AI Assistant dari Neko AI. Apa yang bisa saya bantu tentang layanan AI kami?";
const SYSTEM_CONTEXT = `
Kamu adalah asisten AI dari Neko AI, sebuah agensi AI yang menyediakan solusi kecerdasan buatan terdepan.
Layanan kami meliputi: AI Chatbot, Machine Learning, Analisis Data, Big Data Solution, Computer Vision, NLP & Text Analytics, Custom AI Solutions, dan AI Consultation.
Kamu sangat membantu, profesional, dan selalu berusaha memberikan jawaban terbaik tentang layanan Neko AI.
Jika ada pertanyaan di luar konteks layanan Neko AI, arahkan pengguna untuk menghubungi tim kami melalui WhatsApp di nomor 085183978011.
`;

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
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare message history for Gemini API
      const history = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }));

      // Add the new user message
      history.push({
        role: 'user',
        parts: [{ text: input }]
      });

      // Prepare request for Gemini API
      const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: SYSTEM_CONTEXT }]
            },
            ...history
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const assistantResponse = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: assistantResponse }
      ]);
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menghubungi AI assistant. Silakan coba lagi nanti.",
        variant: "destructive",
      });
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: "Maaf, terjadi kesalahan. Silakan coba lagi nanti atau hubungi kami melalui WhatsApp." }
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
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-20 right-6 z-40 bg-purple text-white p-4 rounded-full shadow-glow transition-all duration-300 hover:bg-purple-dark hover:scale-105`}
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
              : 'bottom-20 right-6 sm:right-6 w-full sm:w-96 h-[500px] max-h-[calc(100vh-150px)]'
          }`}
        >
          <div className="flex flex-col h-full rounded-lg overflow-hidden border bg-background">
            {/* Chat header */}
            <div className="flex items-center justify-between p-3 bg-purple text-white">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                {!isMinimized && <span className="font-medium">Neko AI Assistant</span>}
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
              <div className="flex-1 overflow-y-auto p-4 bg-background">
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
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'assistant' 
                          ? 'bg-muted text-foreground' 
                          : 'bg-purple text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="max-w-[80%] p-3 rounded-lg bg-muted text-foreground">
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
              <div className="p-3 border-t">
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Tanyakan sesuatu..." 
                    className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple"
                    disabled={isLoading}
                  />
                  <button 
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className={`p-2 rounded-md bg-purple text-white ${isLoading || !input.trim() ? 'opacity-50' : 'hover:bg-purple-dark'}`}
                  >
                    <Send size={18} />
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
