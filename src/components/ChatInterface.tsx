import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { AvatarStyle } from '../types';

interface ChatInterfaceProps {
  avatarStyle: AvatarStyle;
  onRegenerateAvatar: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ avatarStyle, onRegenerateAvatar }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `I've created your avatar in ${avatarStyle} style! How would you like to modify it?`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsAiTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses: Record<string, string[]> = {
        pixar: [
          "I can make the eyes bigger for a more expressive look.",
          "How about a warmer color palette for that Pixar glow?",
          "I can adjust the facial proportions to be more stylized.",
        ],
        anime: [
          "I can make the eyes larger and more vibrant.",
          "Would you like a more dramatic hairstyle?",
          "I can add some anime-specific lighting effects.",
        ],
        simpsons: [
          "I can make the skin more yellow for that authentic Simpsons look.",
          "How about an overbite or a more prominent upper lip?",
          "I can simplify the features for that classic Simpsons style.",
        ],
        realistic: [
          "I can enhance the skin texture for more realism.",
          "Would you like more detailed lighting and shadows?",
          "I can adjust the facial proportions to be more photorealistic.",
        ],
        cartoon: [
          "I can exaggerate some features for a more cartoony look.",
          "How about a more vibrant color palette?",
          "I can simplify the shading for that classic cartoon style.",
        ],
        fantasy: [
          "I can add some fantasy elements like pointed ears or glowing eyes.",
          "Would you like a more ethereal appearance?",
          "I can add some magical effects or fantasy-themed accessories.",
        ],
      };

      const randomResponse = aiResponses[avatarStyle][Math.floor(Math.random() * aiResponses[avatarStyle].length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsAiTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-64 border rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {isAiTyping && (
          <div className="flex justify-start mb-3">
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-3 bg-white">
        <div className="flex items-center">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your instructions for the AI..."
            className="flex-1 border rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isAiTyping}
            className={`ml-2 p-2 rounded-full ${
              !inputText.trim() || isAiTyping
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Send size={18} />
          </button>
          
          <button
            onClick={onRegenerateAvatar}
            className="ml-2 p-2 rounded-full bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            title="Regenerate Avatar"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;