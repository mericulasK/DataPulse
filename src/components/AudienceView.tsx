import React, { useState } from 'react';
import { DEMOGRAPHICS_AGE, DEMOGRAPHICS_DEVICE, COUNTRY_DISTRIBUTION } from '../data';
import { Globe, Users, Smartphone, MapPin } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';

export const AudienceView: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // SVG representation for interactive map scatter nodes mapping to actual data
  const mapNodes = [
    { code: 'US', x: 120, y: 70, size: 28, label: 'US: 42%' },
    { code: 'DE', x: 280, y: 55, size: 18, label: 'DE: 18%' },
    { code: 'UK', x: 260, y: 50, size: 14, label: 'UK: 12%' },
    { code: 'JP', x: 420, y: 80, size: 12, label: 'JP: 10%' },
    { code: 'CA', x: 110, y: 50, size: 10, label: 'CA: 8%' },
  ];

  return (
    <div className="space-y-6">
      {/* Audience Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-1">Audience Intelligence</h2>
        <p className="opacity-60 text-sm">Geographical distribution, demographic patterns, and technology metrics.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Total Reach", value: "342.5K", rawStrValue: "342500", label: "+12.1% growth", icon: Users },
          { title: "Active Regions", value: "48 Countries", rawStrValue: "48", label: "Global expansion", icon: Globe },
          { title: "Mobile Ingress", value: "48%", rawStrValue: "48", label: "+5% vs desktop", icon: Smartphone },
        ].map((item, idx) => (
          <div key={idx} className="glass-panel px-4 py-4 rounded-[16px] relative overflow-hidden group h-[100px] flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 font-medium">{item.title}</h3>
              <item.icon size={16} className="text-brand-blue opacity-60" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[24px] font-bold">
                <AnimatedNumber valueStr={item.value} rawValue={item.rawStrValue} />
              </span>
            </div>
            <p className="text-[12px] opacity-50 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Geographical distribution mapping */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-[16px] h-[380px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 font-medium">Interactive Geographical Clusters</h3>
              <p className="text-xs opacity-60">Click node or table rows to highlight relative demographic patterns</p>
            </div>
            {selectedCountry && (
              <button onClick={() => setSelectedCountry(null)} className="text-[10px] uppercase tracking-[0.5px] text-brand-blue hover:underline">
                Clear filter
              </button>
            )}
          </div>

          <div className="flex-1 w-full relative flex items-center justify-center bg-black/10 rounded-xl overflow-hidden border border-white/5">
            {/* Outline grid representing world coordinates abstractly */}
            <div className="absolute inset-0 bg-grid-pattern-dark opacity-10" />

            {/* Simulated abstract geographical nodes on coordinate grid */}
            <svg width="100%" height="100%" viewBox="0 0 500 160" className="w-full h-full">
              {/* Draw connections lines between key continental centers */}
              <path d="M 120 70 L 260 50 M 260 50 L 280 55 M 280 55 L 420 80" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />

              {mapNodes.map((node) => {
                const isActive = selectedCountry === node.code;
                const isFaded = selectedCountry && !isActive;
                return (
                  <g 
                    key={node.code} 
                    className="cursor-pointer group" 
                    onClick={() => setSelectedCountry(isActive ? null : node.code)}
                  >
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={node.size} 
                      fill="url(#nodeGrad)" 
                      stroke="#3b82f6" 
                      strokeWidth={isActive ? "2" : "1"}
                      className={`transition-all duration-300 ${isFaded ? 'opacity-20' : 'opacity-80 group-hover:opacity-100'}`}
                    />
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={node.size - 4} 
                      fill="#0a0a0f" 
                      className={`transition-opacity duration-300 ${isFaded ? 'opacity-20' : 'opacity-80'}`}
                    />
                    <text 
                      x={node.x} 
                      y={node.y + 3} 
                      textAnchor="middle" 
                      className={`text-[8px] font-mono fill-white transition-opacity ${isFaded ? 'opacity-20' : 'opacity-100 font-bold'}`}
                    >
                      {node.code}
                    </text>
                    {/* Hover label */}
                    <rect 
                      x={node.x - 30} 
                      y={node.y - node.size - 14} 
                      width="60" 
                      height="12" 
                      rx="3" 
                      fill="#1e1e24" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                    />
                    <text 
                      x={node.x} 
                      y={node.y - node.size - 5} 
                      textAnchor="middle" 
                      className="text-[7px] fill-brand-blue opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-bold"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}

              <defs>
                <linearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Demographics columns / detail bars */}
        <div className="glass-panel p-6 rounded-[16px] h-[380px] flex flex-col justify-between">
          <div>
            <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 font-medium mb-1">Regional Split Analytics</h3>
            <p className="text-xs opacity-60">Global user acquisition share by country</p>
          </div>

          <div className="space-y-3 flex-1 mt-6">
            {COUNTRY_DISTRIBUTION.map((country) => {
              const isActive = selectedCountry === country.code;
              const isFaded = selectedCountry && !isActive;
              return (
                <div 
                  key={country.code} 
                  onClick={() => setSelectedCountry(isActive ? null : country.code)}
                  className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition-all ${isActive ? 'bg-white/10 border-l-4 border-l-brand-blue' : 'hover:bg-white/5'} ${isFaded ? 'opacity-30' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-brand-blue opacity-75" />
                    <span className="text-xs font-semibold">{country.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                      <div className="h-full bg-brand-blue rounded-full" style={{ width: `${country.share}%` }} />
                    </div>
                    <span className="text-xs font-mono font-bold opacity-85">{country.share}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech and Age demographics layout section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age demography graph */}
        <div className="glass-panel p-6 rounded-[16px]">
          <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 font-medium mb-1">User Demographics (Age)</h3>
          <p className="text-xs opacity-60 mb-4">Core cohort breakdown profile</p>

          <div className="space-y-4">
            {DEMOGRAPHICS_AGE.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{item.category}</span>
                  <span className="font-mono">{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device platforms */}
        <div className="glass-panel p-6 rounded-[16px]">
          <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 font-medium mb-1">Interactive Technology Split</h3>
          <p className="text-xs opacity-60 mb-4">Core visitor platforms and ingress avenues</p>

          <div className="space-y-4">
            {DEMOGRAPHICS_DEVICE.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{item.category}</span>
                  <span className="font-mono">{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
