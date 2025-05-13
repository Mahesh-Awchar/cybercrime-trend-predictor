import React, { useEffect, useRef } from 'react';
import { mockAttackData } from '../../data/mockData';

interface AttackDistributionProps {
  timeframe: string;
}

const AttackDistribution: React.FC<AttackDistributionProps> = ({ timeframe }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Get canvas dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
    ctx.fillRect(0, 0, width, height);

    // Calculate attack type distribution
    const distribution = calculateDistribution();
    
    // Colors for different attack types
    const colors = [
      '#3b82f6', // blue
      '#f97316', // orange
      '#a855f7', // purple
      '#10b981', // green
      '#ef4444', // red
      '#f59e0b', // amber
    ];
    
    // Draw pie chart
    const centerX = width / 2;
    const centerY = height / 2 - 20;
    const radius = Math.min(centerX, centerY) - 50;
    
    let startAngle = 0;
    let total = distribution.reduce((sum, item) => sum + item.count, 0);
    
    // Draw pie slices
    distribution.forEach((item, index) => {
      const sliceAngle = (item.count / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      
      // Add percentage label inside slice (if slice is big enough)
      if (sliceAngle > 0.3) {
        const labelAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${Math.round((item.count / total) * 100)}%`, labelX, labelY);
      }
      
      startAngle += sliceAngle;
    });
    
    // Draw legend
    const legendX = 50;
    let legendY = height - 100;
    const legendSpacing = 25;
    
    distribution.forEach((item, index) => {
      const color = colors[index % colors.length];
      
      // Draw legend box
      ctx.fillStyle = color;
      ctx.fillRect(legendX, legendY, 15, 15);
      
      // Draw legend text
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${item.type} (${item.count})`, legendX + 25, legendY + 7.5);
      
      legendY += legendSpacing;
    });

  }, [timeframe]);

  const calculateDistribution = () => {
    // Calculate attack type distribution from mock data
    const counts: Record<string, number> = {};
    
    mockAttackData.forEach(item => {
      counts[item.attackType] = (counts[item.attackType] || 0) + 1;
    });
    
    // Convert to array and sort by count
    return Object.entries(counts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 relative">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
          width={600}
          height={300}
        />
      </div>
    </div>
  );
};

export default AttackDistribution;