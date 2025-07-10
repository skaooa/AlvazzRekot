import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Hash, 
  Volume2, 
  Users, 
  Settings, 
  Plus, 
  Search, 
  Crown, 
  Shield, 
  Mic, 
  Headphones,
  Phone,
  Video,
  UserPlus,
  Gift,
  Smile,
  Paperclip,
  Send,
  ChevronDown,
  Star,
  Zap,
  MessageSquare,
  Home,
  Bell,
  AtSign,
  Hashtag,
  Bookmark,
  Clock,
  MoreVertical,
  Edit,
  Copy,
  Reply,
  Trash,
  Pin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import ThreeBackground from "@/components/ThreeBackground";

const Messages = () => {
  const [, setLocation] = useLocation();
  const [selectedChannel, setSelectedChannel] = useState('boosts');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const channels = [
    { id: 'boosts', name: 'boosts', category: 'Channels & Roles', icon: '#', emoji: '🚀' },
    { id: 'rules', name: 'rules', category: 'Channels & Roles', icon: '📋', emoji: '📋' },
    { id: 'welcome', name: 'welcome', category: 'greeting', icon: '#', emoji: '😊' },
    { id: 'goodbye', name: 'goodbye', category: 'greeting', icon: '#', emoji: '😢' },
    { id: 'car-suggestion', name: 'car-suggestion', category: 'Suggestion', icon: '🏎️', emoji: '🚗' },
    { id: 'map-suggestion', name: 'map-suggestion', category: 'Suggestion', icon: '🗺️', emoji: '🗺️' },
    { id: 'server-announcements', name: 'server-announcements', category: 'Announcements', icon: '📢', emoji: '📢' },
    { id: 'sneak-peek', name: 'sneak-peek', category: 'Announcements', icon: '👀', emoji: '👀' },
    { id: 'game-news', name: 'game-news', category: 'Announcements', icon: '🎮', emoji: '🎮' },
    { id: 'moderator-application', name: 'moderator-application', category: 'Text Channels', icon: '#', emoji: '🛡️' },
    { id: 'applications', name: 'applications', category: 'Text Channels', icon: '#', emoji: '📝' }
  ];

  const channelsByCategory = channels.reduce((acc, channel) => {
    if (!acc[channel.category]) {
      acc[channel.category] = [];
    }
    acc[channel.category].push(channel);
    return acc;
  }, {} as Record<string, typeof channels>);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        username: 'You',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        role: 'Member',
        badges: []
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 text-white overflow-hidden">
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setLocation("/")}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌸</span>
            </div>
            <div>
              <h2 className="font-semibold text-white">Alvazz Rekot 🌸</h2>
              <p className="text-xs text-gray-400">16 Members • Community</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center">
              <Users size={16} className="text-gray-300" />
            </button>
            <button className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center">
              <Gift size={16} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-800 border-b border-gray-700 p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-700 border-none rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Channel List */}
        <div className="flex-1 overflow-y-auto bg-gray-800">
          {Object.entries(channelsByCategory).map(([category, channelList]) => (
            <div key={category} className="mb-4">
              <div className="flex items-center px-4 py-2">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-300">
                  <ChevronDown size={12} />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    {category === 'greeting' ? '😊 | greeting' : 
                     category === 'Suggestion' ? '💡 | Suggestion' :
                     category === 'Announcements' ? '📢 | Announcements' :
                     category === 'Text Channels' ? '💬 | Text Channels' :
                     category}
                  </span>
                </button>
              </div>
              {channelList.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`w-full flex items-center space-x-3 px-6 py-2 hover:bg-gray-700/50 transition-colors ${
                    selectedChannel === channel.id ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`}
                >
                  <span className="text-gray-400">{channel.icon}</span>
                  <span className="text-sm">{channel.emoji}</span>
                  <span className="text-sm flex-1 text-left">{channel.name}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-gray-900 border-t border-gray-700 p-3">
          <div className="flex items-center justify-between max-w-sm mx-auto">
            <button 
              onClick={() => setLocation("/")}
              className="flex flex-col items-center text-white hover:text-gray-300 transition-colors p-1"
            >
              <Home size={18} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-gray-300 transition-colors p-1">
              <div className="relative">
                <Bell size={18} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">1</span>
                </div>
              </div>
              <span className="text-xs mt-1">Notifications</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-gray-300 transition-colors p-1">
              <div className="relative">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <span className="text-xs mt-1 text-red-400">You</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;