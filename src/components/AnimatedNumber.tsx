import React, { useState, useEffect } from 'react';

function useCountUp(endValue: number, duration: number = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * endValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [endValue, duration]);

  return count;
}

export const AnimatedNumber = ({ valueStr, rawValue, isCurrency }: { valueStr: string, rawValue: string, isCurrency?: boolean }) => {
  const numValue = parseFloat(rawValue);
  const animatedValue = useCountUp(numValue, 1500);
  
  let displayValue = "";
  if (valueStr.includes("M")) {
      displayValue = (animatedValue / 1000000).toFixed(1) + "M";
  } else if (valueStr.includes("K")) {
      displayValue = (animatedValue / 1000).toFixed(1) + "K";
  } else if (valueStr.includes("%")) {
      displayValue = animatedValue.toFixed(1) + "%";
  } else {
      displayValue = Math.round(animatedValue).toString();
  }

  if (valueStr.startsWith("$")) {
      displayValue = "$" + displayValue;
  }

  return <span>{displayValue}</span>;
}
