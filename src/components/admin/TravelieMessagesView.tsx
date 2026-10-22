import React, { useState } from 'react';
import {
  MessageSquare, Search, Send, Paperclip, MoreHorizontal,
  Check, CheckCheck, Phone, Mail, User, Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TravelieMessagesView: React.FC = () => {
  const { contactInquiries, updateContactStatus } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChatId, setActiveChatId] = useState<string>('msg-1');
  const [typedMessage, setTypedMessage] = useState('');

  // Sample chat threads mixed with real contact inquiries
  const [chatThreads, setChatThreads] = useState([
    {
      id: 'msg-1',
      name: 'Osman Farooq',
      avatar: '/images/hero_karakoram_k2_1790420138291.jpg',
      snippet: 'Got it, thank you! I will review the details and get back to you soon.',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { id: 1, sender: 'them', time: '10:15 AM', text: 'Hello, I had an amazing time on the Venice Dreams package! Could you please help me with booking a similar trip to Rome for next spring? Thanks!' },
        { id: 2, sender: 'me', time: '10:20 AM', text: 'Hi Osman! We\'re thrilled to hear that you enjoyed the Venice Dreams package. We would be happy to assist you in booking a similar trip to Rome for next spring. Do you have specific dates in mind?' },
        { id: 3, sender: 'them', time: '10:25 AM', text: 'Thank you! I\'m looking at the first two weeks of April. Is there a package available during that time?' },
        { id: 4, sender: 'me', time: '10:30 AM', text: 'Yes, we have a Rome Highlights package available from April 1 to April 14. It includes visits to historic sites, a guided tour of the Colosseum, and a day trip to Vatican City. Would you like more details?' },
        { id: 5, sender: 'them', time: '10:35 AM', text: 'That sounds perfect. Could you please send me the itinerary and pricing details?' },
        { id: 6, sender: 'me', time: '10:40 AM', text: 'Sure! I\'ll email you the full itinerary and pricing details for the Rome Highlights package. Please check your inbox shortly. If you have any other questions, feel free to ask.' },
        { id: 7, sender: 'them', time: '10:45 AM', text: 'Got it, thank you! I\'ll review the details and get back to you soon.' }
      ]
    },
    {
      id: 'msg-2',
      name: 'Lucas Murphy',
      avatar: '',
      snippet: 'I have some dietary restrictions and would like to know if the Parisian Romance...',
      time: '3:45 PM',
      unread: 1,
      messages: [
        { id: 1, sender: 'them', time: '3:45 PM', text: 'I have some dietary restrictions and would like to know if the Parisian Romance package offers vegan meal options?' }
      ]
    },
    {
      id: 'msg-3',
      name: 'Alexandria Green',
      avatar: '',
      snippet: 'Our company is interested in organizing a corporate retreat with Tr...',
      time: '09:15 AM',
      unread: 3,
      messages: [
        { id: 1, sender: 'them', time: '09:15 AM', text: 'Our company is interested in organizing an expedition retreat with Diran Peak Adventure.' }
      ]
    },
    {
      id: 'msg-4',
      name: 'David Hernandez',
      avatar: '',
      snippet: 'I would like to upgrade my current booking for the Alpine Escape packag...',
      time: '10:00 AM',
      unread: 9,
      messages: [
        { id: 1, sender: 'them', time: '10:00 AM', text: 'I would like to upgrade my current booking for the Alpine Escape package to private guide tier.' }
      ]
    },
    {
      id: 'msg-5',
      name: 'Global Travel Services',
      avatar: '',
      snippet: 'We have updated our commission rates for the upcoming quarter. Pleas...',
      time: '2 days ago',
      unread: 2,
      messages: [
        { id: 1, sender: 'them', time: 'Yesterday', text: 'We have updated our commission rates for the upcoming quarter. Please review our B2B schedule.' }
      ]
    }
  ]);

  const activeThread = chatThreads.find(c => c.id === activeChatId) || chatThreads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    setChatThreads(prev =>
      prev.map(t => {
        if (t.id === activeChatId) {
          return {
            ...t,
            snippet: typedMessage,
            time: 'Just now',
            messages: [
              ...t.messages,
              {
                id: Date.now(),
                sender: 'me',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: typedMessage
              }
            ]
          };
        }
        return t;
      })
    );
    setTypedMessage('');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col md:flex-row min-h-[640px]">
      {/* Left Column: Messages List */}
      <div className="w-full md:w-80 border-r border-slate-200/80 flex flex-col justify-between shrink-0 p-4">
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, chat, etc"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
            />
          </div>

          {/* Chat List */}
          <div className="space-y-1 overflow-y-auto max-h-[500px]">
            {chatThreads.map((thread) => {
              const isSelected = thread.id === activeChatId;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveChatId(thread.id)}
                  className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected ? 'bg-blue-50/70 border border-blue-100' : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1a2b48] to-[#5191fa] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {thread.name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="font-heading font-bold text-xs text-[#1a2b48] truncate">
                        {thread.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {thread.snippet}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-slate-400">{thread.time}</div>
                    {thread.unread > 0 && (
                      <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#5191fa] text-white">
                        {thread.unread}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* New Message Button matching image 3112805 */}
        <button
          type="button"
          onClick={() => alert('New message draft dialog opened.')}
          className="w-full py-2.5 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer mt-4"
        >
          New Message
        </button>
      </div>

      {/* Right Column: Chat Stream */}
      <div className="flex-1 flex flex-col justify-between bg-slate-50/50">
        {/* Chat Header */}
        <div className="p-4 px-6 bg-white border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a2b48] text-white flex items-center justify-center font-bold text-xs">
              {activeThread.name[0]}
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-sm text-[#1a2b48] leading-tight">
                {activeThread.name}
              </h3>
              <span className="text-[10px] text-slate-400 font-medium">last seen recently</span>
            </div>
          </div>

          <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[480px]">
          <div className="text-center my-2">
            <span className="text-[10px] font-semibold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">
              Yesterday
            </span>
          </div>

          {activeThread.messages.map((m) => {
            const isMe = m.sender === 'me';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#5191fa] text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                  <span>{m.time}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-[#5191fa]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input matching image 3112805 */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200/80 flex items-center gap-3">
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
          />
          <button
            type="submit"
            className="p-2.5 bg-[#5191fa] hover:bg-[#3875dc] text-white rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
