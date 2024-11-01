export interface Message {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: number;
}

export interface Model {
  title: string;
  model: string;
  description: string;
  icon: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  selectedModel: string;
}