import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Menu, X } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ModelSelector } from './components/ModelSelector';
import { Header } from './components/Header';
import { callModel } from './api';
import { Message, ChatSession } from './types';
import { MODELS } from './config';

function App() {
  const [sessions, setSessions] = useState<ChatSession[]>([{
    id: '1',
    messages: [],
    selectedModel: MODELS[0].model
  }]);
  const [currentSession, setCurrentSession] = useState<string>('1');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const session = sessions.find(s => s.id === currentSession)!;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [session.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now()
    };

    setSessions(prev => prev.map(s => 
      s.id === currentSession 
        ? { ...s, messages: [...s.messages, userMessage] }
        : s
    ));
    setInput('');
    setIsLoading(true);

    try {
      const modelMessages = [...session.messages, userMessage].map(({ role, content }) => ({ 
        role, 
        content 
      }));

      const response = await callModel(session.selectedModel, modelMessages);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        model: MODELS.find(m => m.model === session.selectedModel)?.title,
        timestamp: Date.now()
      };

      setSessions(prev => prev.map(s => 
        s.id === currentSession 
          ? { ...s, messages: [...s.messages.slice(0, -1), userMessage, assistantMessage] }
          : s
      ));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      // Remove the user message if there was an error
      setSessions(prev => prev.map(s => 
        s.id === currentSession 
          ? { ...s, messages: s.messages.slice(0, -1) }
          : s
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelSelect = (model: string) => {
    setSessions(prev => prev.map(s => 
      s.id === currentSession 
        ? { ...s, selectedModel: model }
        : s
    ));
    setError(null);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
          <div className="relative grid md:grid-cols-[1fr_320px] divide-x divide-purple-100">
            <div className="flex flex-col h-[calc(100vh-8rem)]">
              {session.messages.length === 0 && (
                <div className="flex-1 flex items-center justify-center p-8 text-center">
                  <div className="max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Multi LLM's</h2>
                    <p className="text-gray-600">
                      Start a conversation with any of our AI models. Each has unique capabilities to assist you.
                    </p>
                  </div>
                </div>
              )}
              <div className="flex-1 overflow-y-auto" style={{ display: session.messages.length ? 'block' : 'none' }}>
                {session.messages.map((message, i) => (
                  <ChatMessage key={i} message={message} />
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 p-4 text-purple-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing your request...
                  </div>
                )}
                {error && (
                  <div className="p-4 mx-4 my-2 bg-red-50 text-red-600 rounded-lg border border-red-100">
                    {error}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 border-t border-purple-100">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
            
            <div className="hidden md:block h-[calc(100vh-8rem)] overflow-y-auto bg-gradient-to-b from-purple-50/50">
              <ModelSelector
                selectedModel={session.selectedModel}
                onModelSelect={handleModelSelect}
              />
            </div>

            {/* Mobile model selector */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden fixed bottom-6 right-6 p-4 bg-purple-600 text-white rounded-full shadow-lg z-50"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {isSidebarOpen && (
              <div className="md:hidden fixed inset-0 bg-black/50 z-40">
                <div className="absolute right-0 top-0 h-full w-80 bg-white">
                  <ModelSelector
                    selectedModel={session.selectedModel}
                    onModelSelect={handleModelSelect}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;