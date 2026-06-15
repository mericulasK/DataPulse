import React, { useState, useMemo } from 'react';
import { SEO_KEYWORDS, SeoKeyword } from '../data';
import { Search, Globe, Award, TrendingUp, Compass, Key, ExternalLink, ArrowUpRight, HelpCircle, AlertCircle, LayoutGrid, CheckCircle } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';

export const SeoSearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIntent, setActiveIntent] = useState<string>('All');
  const [selectedKeywordStr, setSelectedKeywordStr] = useState<string>(SEO_KEYWORDS[0].keyword);

  // Filter existing keywords
  const filteredKeywords = useMemo(() => {
    return SEO_KEYWORDS.filter(k => {
      const matchQuery = k.keyword.toLowerCase().includes(searchQuery.toLowerCase());
      const matchIntent = activeIntent === 'All' || k.searchIntent === activeIntent;
      return matchQuery && matchIntent;
    });
  }, [searchQuery, activeIntent]);

  // Find selected active keyword or generate simulated analysis data for brand new custom searches
  const activeKeywordData = useMemo((): SeoKeyword => {
    const existing = SEO_KEYWORDS.find(k => k.keyword.toLowerCase() === selectedKeywordStr.toLowerCase());
    if (existing) return existing;

    // Simulate analysis parameters on custom organic terms
    const hash = searchQuery.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const simulatedVol = Math.round((hash * 17) % 25000 + 1200);
    const simulatedDiff = (hash * 3) % 85 + 15;
    const simulatedCpc = parseFloat(((hash * 0.45) % 15 + 0.5).toFixed(2));
    const simulatedClickRate = (hash * 7) % 40 + 50;
    const simulatedIntent: SeoKeyword['searchIntent'] = 
      hash % 4 === 0 ? 'Informational' : hash % 4 === 1 ? 'Commercial' : hash % 4 === 2 ? 'Transactional' : 'Navigational';

    const simulatedTrend = Array.from({ length: 6 }, (_, i) => {
      const base = Math.round(simulatedVol * 0.7);
      return Math.round(base + (hash * (i + 1) * 350) % (simulatedVol * 0.4));
    });

    return {
      keyword: searchQuery || 'custom workspace diagnostics',
      searchVolume: simulatedVol,
      difficulty: simulatedDiff,
      cpc: simulatedCpc,
      clickRate: simulatedClickRate,
      monthlyTrend: simulatedTrend,
      searchIntent: simulatedIntent,
      competitors: [
        { url: `https://competitor-domain-${hash % 5}.com/blog`, rank: 1, relevance: Math.round(98 - (hash % 10)) },
        { url: `https://industrynews.org/search/${searchQuery ? encodeURIComponent(searchQuery) : 'seo'}`, rank: 2, relevance: Math.round(85 - (hash % 10)) },
        { url: 'https://datapulse.dev/seo-performance-engine', rank: 3, relevance: 92 }
      ]
    };
  }, [selectedKeywordStr, searchQuery]);

  // SVG dimensions for trend chart
  const padding = 35;
  const chartHeight = 120;
  const chartWidth = 440;
  
  const trendPoints = useMemo(() => {
    const trend = activeKeywordData.monthlyTrend;
    const maxVal = Math.max(...trend) || 1000;
    const minVal = Math.min(...trend) || 0;
    const diff = maxVal - minVal || 1;

    return trend.map((val, idx) => {
      const x = padding + (idx / (trend.length - 1)) * (chartWidth - padding * 2);
      // scale value within SVG height bounds
      const y = chartHeight - padding - ((val - minVal) / diff) * (chartHeight - padding * 2);
      return { x, y, val };
    });
  }, [activeKeywordData]);

  const trendPathD = useMemo(() => {
    return trendPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }, [trendPoints]);

  // Handle click on existing list or input search submit
  const handleKeywordSelect = (kw: string) => {
    setSelectedKeywordStr(kw);
  };

  const handleCustomFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedKeywordStr(searchQuery);
    }
  };

  // Color mappings for difficulty index levels
  const getDifficultyColor = (diff: number) => {
    if (diff < 30) return '#10b981'; // Green / Easy
    if (diff < 65) return '#f59e0b'; // Amber / Medium
    return '#ef4444'; // Red / Hard
  };

  const getDifficultyLabel = (diff: number) => {
    if (diff < 30) return 'Easy Competition';
    if (diff < 65) return 'Medium Competition';
    return 'High Competition';
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-1">SEO Search &amp; Keyword Intel</h2>
        <p className="opacity-60 text-sm">Discover organic search volumes, intent vectors, and competitor link signals.</p>
      </div>

      {/* Control Filter Bar */}
      <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleCustomFormSubmit} className="relative w-full md:max-w-md">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords or analyze a new custom phrase..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-blue"
          />
          <Search size={14} className="absolute left-3.5 top-3 text-white/40" />
          {searchQuery && (
            <button 
              type="submit" 
              className="absolute right-2 top-1.5 px-2 py-1 bg-brand-blue/30 text-[9px] hover:bg-brand-blue text-white rounded font-mono uppercase font-bold"
            >
              Analyze
            </button>
          )}
        </form>

        <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10 w-full md:w-auto overflow-x-auto">
          {['All', 'Informational', 'Commercial', 'Transactional'].map((intent) => (
            <button
              key={intent}
              onClick={() => setActiveIntent(intent)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-semibold whitespace-nowrap transition-all ${activeIntent === intent ? 'bg-white/10 text-white' : 'opacity-60 hover:opacity-100'}`}
            >
              {intent}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout Divided View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: List of matching keywords */}
        <div className="glass-panel p-4 rounded-[16px] h-fit md:h-[500px] flex flex-col">
          <div className="mb-3 px-1.5">
            <h3 className="text-[10px] uppercase tracking-[1px] text-white/40 font-bold mb-1">Matching Keyword Index</h3>
            <p className="text-[11px] opacity-60">Select keywords to load interactive analysis reports</p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filteredKeywords.map((item) => {
              const isSelected = selectedKeywordStr.toLowerCase() === item.keyword.toLowerCase();
              return (
                <div
                  key={item.keyword}
                  onClick={() => handleKeywordSelect(item.keyword)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col gap-1 text-left ${isSelected ? 'bg-brand-blue/15 border-brand-blue/30 text-white' : 'bg-transparent border-white/5 hover:bg-white/5 text-white/70'}`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold truncate max-w-[150px] sm:max-w-none">{item.keyword}</span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      item.searchIntent === 'Informational' ? 'bg-blue-500/10 text-blue-400' :
                      item.searchIntent === 'Commercial' ? 'bg-purple-500/10 text-purple-400' :
                      item.searchIntent === 'Transactional' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      {item.searchIntent}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-[10px] opacity-50 mt-1">
                    <span>Vol: <strong className="font-mono">{item.searchVolume.toLocaleString()}</strong></span>
                    <span>Diff: <strong className="font-mono text-white">{item.difficulty}%</strong></span>
                  </div>
                </div>
              );
            })}

            {filteredKeywords.length === 0 && searchQuery && (
              <div 
                onClick={() => setSelectedKeywordStr(searchQuery)}
                className="p-4 rounded-xl border border-dashed border-white/10 text-center cursor-pointer hover:bg-white/5"
              >
                <Compass className="mx-auto mb-2 text-brand-blue animate-pulse" size={20} />
                <p className="text-xs font-semibold">Generate simulated reports for &quot;{searchQuery}&quot;?</p>
                <p className="text-[10px] opacity-40 mt-1">Click here to model instant real-time SEO coefficients.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Granular Analysis dashboard panel */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-panel p-6 rounded-[16px] space-y-6">
            
            {/* Intel Panel Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/15 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[1px] text-brand-blue font-bold">SEO Core Audit Metrics</span>
                <h3 className="text-xl font-extrabold text-white mt-1 break-words">{activeKeywordData.keyword}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-60">Intent Category:</span>
                <span className="text-xs font-bold px-2.5 py-1 bg-white/5 rounded-full border border-white/10">
                  {activeKeywordData.searchIntent}
                </span>
              </div>
            </div>

            {/* Metrics Dashboard Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-[0.5px] text-white/40 font-semibold mb-0.5">Monthly Searches</span>
                <span className="text-lg font-mono font-bold text-white">
                  {activeKeywordData.searchVolume.toLocaleString()}
                </span>
                <div className="text-[9px] text-[#10b981] mt-1">▲ Stable Trend</div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex flex-col justify-center relative overflow-hidden">
                <span className="text-[10px] uppercase tracking-[0.5px] text-white/40 font-semibold mb-0.5">Average CPC</span>
                <span className="text-lg font-mono font-bold text-white">
                  ${activeKeywordData.cpc.toFixed(2)}
                </span>
                <div className="text-[9px] text-white/40 mt-1">Commercial value</div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-[0.5px] text-white/40 font-semibold mb-0.5">Organic CTR</span>
                <span className="text-lg font-mono font-bold text-[#10b981]">
                  {activeKeywordData.clickRate}%
                </span>
                <div className="text-[9px] text-white/40 mt-1">Clicks on SERP docs</div>
              </div>

              {/* Competitive ring */}
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="transparent" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="3" />
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="16" 
                      fill="transparent" 
                      stroke={getDifficultyColor(activeKeywordData.difficulty)} 
                      strokeWidth="3" 
                      strokeDasharray="100" 
                      strokeDashoffset={100 - activeKeywordData.difficulty} 
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold">
                    {activeKeywordData.difficulty}%
                  </div>
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.5px] text-white/40 font-semibold">SEO Difficulty</h4>
                  <p className="text-[10.5px] font-bold text-white leading-tight mt-0.5">
                    {getDifficultyLabel(activeKeywordData.difficulty)}
                  </p>
                </div>
              </div>
            </div>

            {/* SVG Trend Graph */}
            <div className="bg-[#111119] border border-white/5 rounded-xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-xs font-semibold text-white">Monthly Organic Volume Projection</h4>
                  <p className="text-[10px] opacity-40">Simulated demand trends across the preceding 6 months</p>
                </div>
                <div className="text-[10px] font-mono opacity-50">Scale: 0 - {Math.max(...activeKeywordData.monthlyTrend).toLocaleString()}</div>
              </div>

              <div className="flex-1 flex justify-center items-center min-h-[140px] relative">
                <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible w-full h-full max-h-[120px]">
                  {/* Grid Lines */}
                  {[0, 0.5, 1].map((ratio, i) => {
                    const y = padding + (chartHeight - padding * 2) * ratio;
                    return (
                      <line key={i} x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="currentColor" strokeOpacity="0.05" strokeDasharray="3 3" />
                    );
                  })}

                  {/* Polyline Path */}
                  <path d={trendPathD} fill="none" stroke="#2563eb" strokeWidth="2" className="transition-all duration-500" />
                  
                  {/* Gradient Area */}
                  <path 
                    d={`${trendPathD} L ${trendPoints[trendPoints.length - 1].x} ${chartHeight - padding} L ${trendPoints[0].x} ${chartHeight - padding} Z`}
                    fill="url(#seoTrendGrad)"
                    className="opacity-15"
                  />

                  <defs>
                    <linearGradient id="seoTrendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Markers & Tooltips */}
                  {trendPoints.map((p, idx) => (
                    <g key={idx} className="group/node">
                      <circle cx={p.x} cy={p.y} r="3" fill="#0c0d12" stroke="#2563eb" strokeWidth="1.5" className="hover:r-[5px] transition-all" />
                      <text x={p.x} y={chartHeight - 8} textAnchor="middle" className="text-[8px] fill-current opacity-40 font-mono">
                        M{idx + 1}
                      </text>
                      
                      {/* Interactive metadata display block */}
                      <g className="opacity-0 group-hover/node:opacity-100 transition-opacity duration-200">
                        <rect x={p.x - 22} y={p.y - 18} width="44" height="12" rx="2" fill="#000" />
                        <text x={p.x} y={p.y - 10} textAnchor="middle" className="text-[7.5px] fill-white font-mono font-semibold">
                          {p.val}
                        </text>
                      </g>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* SEC: SERP Competitors list table */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-semibold text-white">Organic Search Competitor Analysis</h4>
                  <p className="text-[10px] opacity-40">Primary domains capturing bulk of current search intents</p>
                </div>
                <div className="text-[9px] uppercase tracking-[1px] text-brand-blue font-bold flex items-center gap-1">
                  <Globe size={11} /> Live Ranking Signals
                </div>
              </div>

              <div className="border border-white/5 rounded-xl overflow-hidden bg-black/10">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 opacity-50 border-b border-white/5 text-[9px] uppercase tracking-[0.5px]">
                      <th className="p-3">Rank Position</th>
                      <th className="p-3">Top URL Source</th>
                      <th className="p-3 text-right">Relevance Indicator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {activeKeywordData.competitors.map((comp) => (
                      <tr key={comp.url} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-mono font-bold text-white/70">
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded font-bold ${
                            comp.rank === 1 ? 'bg-amber-500/10 text-amber-400' :
                            comp.rank === 2 ? 'bg-slate-400/10 text-slate-300' :
                            'bg-amber-700/10 text-amber-600'
                          }`}>
                            #{comp.rank}
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-white/90 truncate max-w-[220px] sm:max-w-none">
                          <a href={comp.url} target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors flex items-center gap-1.5 cursor-pointer">
                            {comp.url} <ArrowUpRight size={10} className="opacity-40" />
                          </a>
                        </td>
                        <td className="p-3 text-right">
                          <span className="font-mono text-xs font-bold text-brand-emerald">
                            {comp.relevance}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Simple Audit panel simulator below */}
          <div className="glass-panel p-6 rounded-[16px]">
            <h4 className="text-xs uppercase tracking-[1px] text-white/40 font-bold mb-1">On-Page SEO Diagnostics Simulator</h4>
            <p className="text-[11px] opacity-65 mb-4">Validate target URL compliance structure with Google search crawlers</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Meta Titles Schema", score: "96%", desc: "Perfect character layout count (58 chars)", ok: true },
                { title: "Canonical Index Targets", score: "Match", desc: "No duplicate tags parsed on server", ok: true },
                { title: "Sitemap Config XML", score: "Active", desc: "Correct sitemap ping responses verified", ok: true },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/5 flex gap-3 items-start">
                  <CheckCircle size={15} className="text-brand-emerald flex-shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h5 className="text-[11px] font-bold text-white/95">{item.title}</h5>
                    <p className="text-[9px] opacity-40 leading-relaxed mt-0.5">{item.desc}</p>
                    <span className="inline-block text-[10px] font-mono text-brand-emerald mt-1 font-semibold">{item.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
