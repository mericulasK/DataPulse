import React, { useState, useEffect } from 'react';
import { ProductData } from '../types';

interface BarChartProps {
  data: ProductData[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [data]);

  const maxValue = Math.max(...data.map(d => d.value)) * 1.1;

  return (
    <div className="w-full h-full flex flex-col justify-around py-2">
      {data.map((item, index) => {
        const width = animated ? `${(item.value / maxValue) * 100}%` : '0%';
        return (
          <div key={item.id} className="w-full flex flex-col gap-1 group">
            <div className="flex justify-between text-xs">
              <span className="font-medium group-hover:text-brand-blue transition-colors">{item.name}</span>
              <span className="font-mono opacity-70">{item.value}k</span>
            </div>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-brand-blue to-brand-emerald rounded-full transition-all duration-1000 ease-out absolute left-0 top-0"
                style={{ width }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
