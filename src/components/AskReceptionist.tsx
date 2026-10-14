import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, ExternalLink, Calendar, Clock, User, ShieldAlert } from 'lucide-react';
import { ChatMessage } from '../types';
import { OFFICIAL_ZOCDOC_URL } from '../data/clinicData';

interface AskReceptionistProps {
  onNavigate: (path: string) => void;
}

export const AskReceptionist: React.FC<AskReceptionistProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: "Welcome to this Island Family Dental concept demo! I am your AI receptionist, grounded in verified practice facts. I can help you explore treatments, check our Richmond Avenue hours, learn about Dr. Stan, or guide you through a simulated appointment request.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    { label: "Office Hours", query: "What are your office hours on Staten Island?" },
    { label: "Meet Dr. Stan", query: "Tell me about Dr. Stanislav Golyand's credentials and experience." },
    { label: "Explore Services", query: "What dental services and treatments do you provide?" },
    { label: "Try Demo Booking", query: "How does the simulated demo booking engine work?", action: () => onNavigate('/book-demo') },
    { label: "Real Zocdoc Booking", query: "How can I book a real appointment on Zocdoc?", isZocdoc: true }
  ];

  const handleSend = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const historyForApi = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/receptionist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText, history: historyForApi })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: data.reply || "I'm here to assist with any questions regarding Island Family Dental.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      // Local fallback logic
      const fallbackReply = getClientFallback(queryText);
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const getClientFallback = (text: string) => {
    const q = text.toLowerCase();
    if (q.includes('hour') || q.includes('time') || q.includes('open')) {
      return "Island Family Dental is open Mon & Wed (9:00 AM–5:00 PM), Tue & Thu (12:30 PM–8:00 PM), and Fri (9:00 AM–3:00 PM). Closed on Saturday & Sunday.";
    }
    if (q.includes('stan') || q.includes('doctor') || q.includes('dentist')) {
      return "Dr. Stanislav Golyand, DDS ('Dr. Stan') trained in Moscow, completed his dental degree at NYU College of Dentistry, did his residency at Downstate Medical Center, and has owned Island Family Dental since 2006.";
    }
    if (q.includes('book') || q.includes('demo') || q.includes('appointment')) {
      return "You can try our simulated scheduling engine right now on the 'Try Demo Booking' page, or book a real clinical appointment through Dr. Stan's official Zocdoc profile or by phone at +1 (718) 948-6500.";
    }
    return "Island Family Dental has proudly served Staten Island families at 4032 Richmond Avenue since 2006. Feel free to explore our services or try our synthetic booking demo!";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#162C54] hover:bg-[#204270] text-white rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer border border-[#7DAED6]/40"
          aria-label="Open AI Receptionist"
        >
          <div className="w-8 h-8 rounded-full bg-[#7DAED6]/20 flex items-center justify-center text-[#7DAED6] group-hover:text-white transition-colors">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold leading-tight">Ask Island Family Dental</div>
            <div className="text-[10px] text-[#7DAED6] leading-tight">Gemini AI Receptionist</div>
          </div>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] max-h-[620px] h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-[#162C54] text-white p-4 flex items-center justify-between border-b border-[#204270]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#204270] flex items-center justify-center p-2 border border-[#7DAED6]/40">
                <Sparkles className="w-4 h-4 text-[#7DAED6]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Ask Island Family Dental</h3>
                <p className="text-[11px] text-[#7DAED6]">Grounded in Verified Practice Information</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-[#204270] transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Clinical Guardrail Disclaimer */}
          <div className="bg-[#FAF8F4] px-4 py-2 border-b border-slate-200 flex items-center gap-2 text-[11px] text-slate-600">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Educational assistant only. Never for emergency care or medical diagnosis.</span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#162C54] text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-xs rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
                <div className="w-2 h-2 rounded-full bg-[#7DAED6] animate-pulse" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Buttons */}
          <div className="px-3 py-2 bg-white border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (q.isZocdoc) {
                    window.open(OFFICIAL_ZOCDOC_URL, '_blank');
                  } else if (q.action) {
                    q.action();
                    setIsOpen(false);
                  } else {
                    handleSend(q.query);
                  }
                }}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] font-medium rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>{q.label}</span>
                {q.isZocdoc && <ExternalLink className="w-2.5 h-2.5 text-slate-400" />}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about hours, Dr. Stan, services..."
              className="flex-1 bg-slate-100 text-slate-800 text-xs rounded-xl px-3.5 py-2.5 border border-transparent focus:border-[#7DAED6] focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-[#162C54] hover:bg-[#204270] disabled:bg-slate-300 text-white rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
