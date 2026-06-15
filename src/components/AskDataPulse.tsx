import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, CornerDownLeft, X, ArrowRight, LayoutDashboard, Cpu, Globe, Key, PieChart, HelpCircle } from 'lucide-react';

interface AskDataPulseProps {
  onNavigate: (section: 'dashboard' | 'analytics' | 'audience' | 'reports' | 'seo') => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  navHint?: {
    label: string;
    section: 'dashboard' | 'analytics' | 'audience' | 'reports' | 'seo';
  };
}

export const AskDataPulse: React.FC<AskDataPulseProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Hello! I am **DataPulse Assistant**, your native intelligence agent. Ask me anything about your current revenue, server latency, audience demographics, or SEO keyword traffic!',
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const preconfiguredQuestions = [
    { q: 'How is our business revenue performing?', text: 'Check the real-time overview metrics' },
    { q: 'What is our current server latency?', text: 'Analyze infrastructure loads' },
    { q: 'Which country has the highest acquisition?', text: 'Map global customer clusters' },
    { q: 'Suggest easy keywords to optimize SEO.', text: 'Extract keyword traffic scores' },
    { q: 'Show ready reports from the directory.', text: 'Verify files compiled in cabinet' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    executeResponse(query);
  };

  const handleSuggestionClick = (qStr: string) => {
    executeResponse(qStr);
  };

  const executeResponse = (usrQuery: string) => {
    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: usrQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    // Simulate snappy AI response
    setTimeout(() => {
      let responseText = '';
      let sectionTarget: Message['navHint'] = undefined;

      const norm = usrQuery.toLowerCase();

      if (norm.includes('revenue') || norm.includes('sales') || norm.includes('target') || norm.includes('perform') || norm.includes('business')) {
        responseText = 'Our business performance metrics are solid. **Total Revenue** has touched **$2.4M** with a robust **+12.5%** increase vs last week. The top regional slice is **North America** driving 42% of overall product traffic. You can interact with the dynamic charts directly.';
        sectionTarget = { label: 'Go to Operations Dashboard', section: 'dashboard' };
      } 
      else if (norm.includes('latency') || norm.includes('server') || norm.includes('speed') || norm.includes('error') || norm.includes('cache')) {
        responseText = 'Current server diagnostics are running beautifully: **Server Load time is 120ms** with a cache hit rate of **89.4%** and a negligible error coefficient of only **0.04%**. The peak load spikes correspond with high transactional intent afternoon cohorts.';
        sectionTarget = { label: 'Explore Analytics Studio', section: 'analytics' };
      }
      else if (norm.includes('country') || norm.includes('countries') || norm.includes('visitor') || norm.includes('demographic') || norm.includes('map') || norm.includes('mobile')) {
        responseText = 'Geographical segments report high density across top continental hubs. **United States** claims the lead share at **42%**, followed by **Germany at 18%** and the **United Kingdom at 12%**. Technology ingress channels show standard mobile browser traffic taking a major **48%** slice.';
        sectionTarget = { label: 'Open Audience Intelligence', section: 'audience' };
      }
      else if (norm.includes('seo') || norm.includes('keyword') || norm.includes('search') || norm.includes('cpc') || norm.includes('click')) {
        responseText = 'Top semantic optimization keywords have been indexed: \n\n1. `realtime dashboard with svg charting` (Clicks: **78%**, low difficulty of 48%)\n2. `analytics platform for cloud developers` (Volume: **18,500/mo**, CPC: $8.45)\n3. `professional dark theme components tailwind` (Volume: **12,400/mo**, CPC: $3.80).';
        sectionTarget = { label: 'Access SEO Keyword Intel', section: 'seo' };
      }
      else if (norm.includes('report') || norm.includes('reports') || norm.includes('export') || norm.includes('download') || norm.includes('file')) {
        responseText = 'We have found 3 preassembled download packages prepared inside the Export records directory:\n- **Q2 2024 Revenue Audit** (3.4 MB PDF)\n- **Device Demographics Audit** (142 KB CSV)\n- **Network Performance Diagnostics** (1.2 MB Excel sheet). Use the Report Builder form to compile custom criteria targets.';
        sectionTarget = { label: 'Open Reports Cabinet', section: 'reports' };
      }
      else {
        responseText = `I processed your search: "${usrQuery}". Calculated index signals indicate positive data telemetry. For fine-grained reports or optimization strategies, select our main sections below or run specific questions about revenue, latencies, maps, or SEO data.`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          navHint: sectionTarget
        }
      ]);
      setIsTyping(false);
    }, 850);
  };

  const handleNavClick = (section: 'dashboard' | 'analytics' | 'audience' | 'reports' | 'seo') => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Target input trigger */}
      <div className="relative group">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity text-white" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Ask DataPulse AI..." 
          className="pl-11 pr-24 py-2 rounded-full bg-white/5 border border-white/10 focus:border-brand-blue/60 focus:outline-none focus:ring-1 focus:ring-brand-blue/30 transition-all font-mono text-xs w-64 focus:w-80 text-white"
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full pointer-events-none text-[9px] uppercase font-mono tracking-wider font-semibold opacity-60">
          <Sparkles size={8} className="text-brand-blue animate-pulse" /> Ask AI
        </div>
      </div>

      {/* Answer Floating Dialog Card */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-[420px] bg-[#0c0c12]/95 border border-white/10 rounded-2xl shadow-2xl p-4 z-50 flex flex-col gap-3 glass-panel max-h-[500px] overflow-hidden">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-brand-blue/20 flex items-center justify-center border border-brand-blue/20">
                <Sparkles size={12} className="text-brand-blue animate-pulse" />
              </div>
              <span className="text-[11px] uppercase tracking-[1px] font-bold text-white">Ask DataPulse Intelligence</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-white/5 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X size={14} className="text-white" />
            </button>
          </div>

          {/* Conversations Log */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-[160px] max-h-[260px] text-left custom-scrollbar text-xs">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col gap-1 max-w-[90%] ${m.sender === 'user' ? 'ml-auto items-end bg-brand-blue/10 border border-brand-blue/15 p-2 rounded-xl rounded-tr-none' : 'mr-auto items-start bg-white/5 border border-white/5 p-2.5 rounded-xl rounded-tl-none'}`}
              >
                <p className="text-white/95 leading-relaxed break-words whitespace-pre-wrap">
                  {/* Super simple bold markdown replacer */}
                  {m.text.split('**').map((chunk, i) => i % 2 === 1 ? <strong key={i} className="text-brand-blue font-bold">{chunk}</strong> : chunk)}
                </p>
                
                {/* Navigation target recommendation banner */}
                {m.navHint && (
                  <button 
                    onClick={() => handleNavClick(m.navHint!.section)}
                    className="mt-2.5 flex items-center justify-between gap-2 px-3 py-1.5 bg-brand-blue font-bold text-white text-[9px] uppercase tracking-wider rounded-lg hover:bg-brand-blue/80 transition-all w-full text-center"
                  >
                    <span>{m.navHint.label}</span>
                    <ArrowRight size={10} />
                  </button>
                )}

                <span className="text-[8px] opacity-40 font-mono mt-0.5">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="mr-auto items-start bg-white/5 border border-white/5 p-2.5 rounded-xl rounded-tl-none max-w-[150px] flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-[9px] opacity-40 font-mono">Assimilating...</span>
              </div>
            )}
          </div>

          {/* Quick Click Search Recommendations Prompt */}
          <div className="border-t border-white/10 pt-2 text-left">
            <span className="text-[9px] uppercase tracking-[0.5px] text-white/40 font-bold block mb-1.5">Suggested Query Channels</span>
            <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto pr-1">
              {preconfiguredQuestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(s.q)}
                  className="px-2.5 py-1 text-[9px] bg-[#111119] hover:bg-brand-blue/20 hover:text-white border border-white/5 hover:border-brand-blue/30 rounded-full text-white/70 transition-all font-mono truncate max-w-full text-left"
                >
                  ❓ {s.q}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Entry Form footer */}
          <form onSubmit={handleSearchSubmit} className="relative mt-1">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type custom query (e.g. 'how is revenue')..."
              className="w-full pl-3 pr-10 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[11px] text-white focus:outline-none focus:border-brand-blue"
            />
            <button 
              type="submit"
              className="absolute right-1.5 top-1.5 p-1 bg-brand-blue hover:bg-brand-blue/80 text-white rounded cursor-pointer"
            >
              <CornerDownLeft size={10} />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
