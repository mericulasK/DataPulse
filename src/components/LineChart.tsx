import React, { useRef, useState, useEffect } from 'react';
import { MonthlyData } from '../types';

interface LineChartProps {
  data: MonthlyData[];
  timeRange: '3M' | '6M' | '1Y';
}

export const LineChart: React.FC<LineChartProps> = ({ data, timeRange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number, y: number, month: string, revenue: number, target: number } | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const filteredData = React.useMemo(() => {
    if (timeRange === '3M') return data.slice(-3);
    if (timeRange === '6M') return data.slice(-6);
    return data;
  }, [data, timeRange]);

  const { width, height } = dimensions;
  const padding = { top: 20, right: 30, bottom: 30, left: 40 };
  
  if (width === 0 || height === 0) return <div ref={containerRef} className="w-full h-full" />;

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...filteredData.map(d => Math.max(d.revenue, d.target))) * 1.1;
  const minVal = 0;

  const getX = (index: number) => padding.left + (index / (filteredData.length - 1)) * innerWidth;
  const getY = (val: number) => padding.top + innerHeight - ((val - minVal) / (maxVal - minVal)) * innerHeight;

  const revenuePoints = filteredData.map((d, i) => `${getX(i)},${getY(d.revenue)}`).join(' ');
  const targetPoints = filteredData.map((d, i) => `${getX(i)},${getY(d.target)}`).join(' ');

  return (
    <div ref={containerRef} className="w-full h-full relative group">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding.top + innerHeight * ratio;
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
              <text x={padding.left - 10} y={y + 4} textAnchor="end" className="text-[10px] fill-current opacity-50 font-mono">
                {Math.round(maxVal * (1 - ratio))}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {filteredData.map((d, i) => (
          <text key={d.month} x={getX(i)} y={height - 10} textAnchor="middle" className="text-[10px] fill-current opacity-50 font-mono">
            {d.month}
          </text>
        ))}

        {/* Target Area and Line */}
        <polyline
          points={`${getX(0)},${getY(minVal)} ${targetPoints} ${getX(filteredData.length - 1)},${getY(minVal)}`}
          fill="url(#targetGradient)"
          className="transition-all duration-700 ease-out"
        />
        <polyline
          points={targetPoints}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="transition-all duration-700 ease-out"
        />

        {/* Revenue Area and Line */}
        <polyline
          points={`${getX(0)},${getY(minVal)} ${revenuePoints} ${getX(filteredData.length - 1)},${getY(minVal)}`}
          fill="url(#revenueGradient)"
          className="transition-all duration-700 ease-out"
        />
        <polyline
          points={revenuePoints}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          className="transition-all duration-700 ease-out"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: 0,
            animation: 'dash 1.5s ease-out forwards'
          }}
        />

        {/* Interaction points */}
        {filteredData.map((d, i) => (
          <g key={i} 
             onMouseEnter={() => setHoveredPoint({ x: getX(i), y: getY(d.revenue), month: d.month, revenue: d.revenue, target: d.target })}
             onMouseLeave={() => setHoveredPoint(null)}>
            <circle cx={getX(i)} cy={getY(d.target)} r="4" fill="#10b981" className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:r-[6px]" />
            <circle cx={getX(i)} cy={getY(d.revenue)} r="4" fill="#0a0a0f" stroke="#3b82f6" strokeWidth="2" className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:r-[6px]" />
            <rect x={getX(i) - 15} y={padding.top} width="30" height={innerHeight} fill="transparent" className="cursor-pointer" />
          </g>
        ))}
      </svg>

      {hoveredPoint && (
        <div 
          className="chart-tooltip"
          style={{ left: hoveredPoint.x, top: hoveredPoint.y }}
        >
          <div className="text-xs text-brand-emerald mb-1 font-bold">{hoveredPoint.month}</div>
          <div className="flex justify-between gap-4">
            <span className="text-brand-blue">Revenue:</span>
            <span className="font-mono">{hoveredPoint.revenue}k</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-brand-emerald">Target:</span>
            <span className="font-mono">{hoveredPoint.target}k</span>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          from { stroke-dashoffset: 2000; }
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </div>
  );
};
