import React, { useState } from 'react';
import { FUNNEL_DATA, PERFORMANCE_HOURLY } from '../data';
import { Activity, Cpu, Server, ShieldCheck, TrendingUp } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';

export const AnalyticsView: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  // Custom SVG path drawing for performance chart
  const padding = 40;
  const chartHeight = 180;
  const chartWidth = 600;
  
  const points = PERFORMANCE_HOURLY.map((node, idx) => {
    const x = padding + (idx / (PERFORMANCE_HOURLY.length - 1)) * (chartWidth - padding * 2);
    // scale loadTime between 0.5s and 2.0s
    const y = chartHeight - padding - ((node.loadTime - 0.5) / 1.5) * (chartHeight - padding * 2);
    return { x, y, data: node };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="space-y-6">
      {/* Analytics Main Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-1">Analytics Studio</h2>
        <p className="opacity-60 text-sm">Deep-dive performance monitoring and funnel tracking.</p>
      </div>

      {/* Analytics stat grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Server Load time", value: "120ms", rawStrValue: "120", change: "2%", isPositive: false, icon: Cpu },
          { title: "Cache Hit Rate", value: "89.4%", rawStrValue: "89.4", change: "4.5%", isPositive: true, icon: Server },
          { title: "Error Rate", value: "0.04%", rawStrValue: "0.04", change: "0.1%", isPositive: true, icon: ShieldCheck },
          { title: "Optimized Speed", value: "98/100", rawStrValue: "98", change: "1%", isPositive: true, icon: TrendingUp },
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
            <div className={`flex items-center gap-1 text-[12px] font-medium mt-1 ${item.isPositive ? 'text-[#10b981]' : 'text-[#f59e0b]'}`}>
              <span>{item.isPositive ? '▲' : '▼'}</span>
              <span>{item.change} vs LW</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Performance graph */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-[16px] flex flex-col h-[380px]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 font-medium">Hourly Response Performance</h3>
              <p className="text-xs opacity-60">Avg. API processing speed across key timestamps</p>
            </div>
            <div className="flex gap-2">
              <span className="text-xs font-mono text-brand-blue">Metric: Response (sec)</span>
            </div>
          </div>

          <div className="flex-1 w-full min-h-0 flex items-center justify-center relative">
            <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible w-full h-full max-h-[220px]">
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = padding + (chartHeight - padding * 2) * ratio;
                const val = (2.0 - ratio * 1.5).toFixed(1);
                return (
                  <g key={i}>
                    <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
                    <text x={padding - 10} y={y + 4} textAnchor="end" className="text-[9px] fill-current opacity-40 font-mono">{val}s</text>
                  </g>
                );
              })}

              {/* Path line */}
              <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2.5" className="transition-all duration-700 ease-out" />

              {/* Area map gradient */}
              <path 
                d={`${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`}
                fill="url(#performanceGrad)"
                className="opacity-20"
              />

              <defs>
                <linearGradient id="performanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Interactive nodes */}
              {points.map((p, i) => (
                <g key={i} className="cursor-pointer" onClick={() => setSelectedPoint(i)}>
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r={selectedPoint === i ? "6" : "4"} 
                    fill={selectedPoint === i ? "#3b82f6" : "#0a0a0f"} 
                    stroke="#3b82f6" 
                    strokeWidth="2" 
                    className="hover:r-[7px] transition-all duration-200"
                  />
                  <text x={p.x} y={chartHeight - 10} textAnchor="middle" className="text-[9px] fill-current opacity-50 font-mono">{p.data.time}</text>
                </g>
              ))}
            </svg>

            {/* Float Tooltip Box */}
            <div className="absolute top-2 right-4 text-right">
              {selectedPoint !== null ? (
                <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs">
                  <p className="font-bold text-brand-blue">{PERFORMANCE_HOURLY[selectedPoint].time}</p>
                  <p className="opacity-80">Latency: <span className="font-mono font-bold text-white">{PERFORMANCE_HOURLY[selectedPoint].loadTime}s</span></p>
                  <p className="opacity-80">Err Rate: <span className="font-mono font-bold text-brand-amber">{PERFORMANCE_HOURLY[selectedPoint].errorRate}%</span></p>
                </div>
              ) : (
                <div className="text-[10px] opacity-40 italic">Click any chart node for granular logs</div>
              )}
            </div>
          </div>
        </div>

        {/* Funnel Dropoff Chart */}
        <div className="glass-panel p-6 rounded-[16px] flex flex-col h-[380px]">
          <h3 className="text-[11px] uppercase tracking-[1px] text-white/40 font-medium mb-1">Conversion Funnel Dropoff</h3>
          <p className="text-xs opacity-60 mb-4">Percentage retention of user interaction counts</p>

          <div className="flex-1 flex flex-col justify-around py-1">
            {FUNNEL_DATA.map((step, idx) => {
              const isHovered = hoveredStep === idx;
              return (
                <div 
                  key={idx} 
                  className={`w-full transition-all duration-200 rounded-lg p-2 relative ${isHovered ? 'bg-white/5' : ''}`}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-medium truncate max-w-[180px]">{step.stage}</span>
                    <span className="font-mono font-bold">{step.pct}%</span>
                  </div>
                  {/* Outer progress */}
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${step.pct}%`, 
                        backgroundColor: step.color 
                      }}
                    />
                  </div>
                  {/* Subtle info pill on hover */}
                  {isHovered && (
                    <div className="absolute right-2 top-0 bg-black/90 text-[10px] px-1.5 py-0.5 rounded border border-white/10 font-mono text-brand-blue">
                      {(step.count / 1000).toFixed(1)}k Users
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
