import React, { useState, useEffect } from 'react';
import { RegionData } from '../types';

interface DonutChartProps {
  data: RegionData[];
  selectedRegion: string | null;
  onSelectRegion: (id: string | null) => void;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, selectedRegion, onSelectRegion }) => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animatedData, setAnimatedData] = useState<RegionData[]>([]);

  useEffect(() => {
    // Simple load animation
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  const size = 200;
  const center = size / 2;
  const strokeWidth = 30;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  let currentOffset = 0;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const currentData = animatedData.length > 0 ? animatedData : data.map(d => ({ ...d, value: 0 }));

  return (
    <div className="relative flex justify-center items-center h-full" onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredRegion(null)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90 origin-center drop-shadow-xl">
        {currentData.map((item) => {
          const percentage = item.value / total;
          const strokeDasharray = `${percentage * circumference} ${circumference}`;
          const strokeDashoffset = -currentOffset * circumference;
          
          currentOffset += percentage;

          const isSelected = selectedRegion === item.id;
          const isFaded = selectedRegion && !isSelected;

          return (
            <circle
              key={item.id}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-700 ease-out cursor-pointer hover:stroke-[35px] ${isFaded ? 'opacity-30' : 'opacity-100'}`}
              onMouseEnter={() => setHoveredRegion(item)}
              onClick={() => onSelectRegion(isSelected ? null : item.id)}
            />
          );
        })}
      </svg>
      
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-sm opacity-60">Total</span>
        <span className="text-xl font-bold font-mono">100%</span>
      </div>

      {hoveredRegion && (
        <div 
          className="chart-tooltip"
          style={{ left: mousePos.x, top: mousePos.y }}
        >
          <div className="text-xs mb-1 font-bold" style={{ color: hoveredRegion.color }}>{hoveredRegion.name}</div>
          <div className="flex justify-between gap-4">
            <span className="opacity-80">Share:</span>
            <span className="font-mono">{hoveredRegion.value}%</span>
          </div>
        </div>
      )}
    </div>
  );
};
