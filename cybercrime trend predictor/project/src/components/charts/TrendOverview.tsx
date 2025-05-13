import React, { useEffect, useRef } from 'react';
import { mockAttackData } from '../../data/mockData';

interface TrendOverviewProps {
  timeframe: string;
}

const TrendOverview: React.FC<TrendOverviewProps> = ({ timeframe }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Mock data visualization - in a real app, this would use a charting library
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
    ctx.fillRect(0, 0, width, height);

    // Calculate data points for line chart
    const dataWindow = getDataForTimeframe(timeframe);
    const dataPoints = processDataPoints(dataWindow);
    
    // Draw axes
    ctx.strokeStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, height - 30);
    ctx.lineTo(width - 20, height - 30);
    ctx.stroke();

    // Draw trend line
    if (dataPoints.length > 0) {
      // Draw main trend line
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const stepX = (width - 60) / (dataPoints.length - 1);
      const maxValue = Math.max(...dataPoints.map(d => d.value));
      const scaleY = (height - 50) / maxValue;
      
      dataPoints.forEach((point, i) => {
        const x = 40 + i * stepX;
        const y = height - 30 - (point.value * scaleY);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Draw area under the line
      ctx.lineTo(40 + (dataPoints.length - 1) * stepX, height - 30);
      ctx.lineTo(40, height - 30);
      ctx.closePath();
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.fill();
      
      // Draw data points
      dataPoints.forEach((point, i) => {
        const x = 40 + i * stepX;
        const y = height - 30 - (point.value * scaleY);
        
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Add prediction zone
      if (dataPoints.length > 10) {
        const predictionStart = 40 + (dataPoints.length - 5) * stepX;
        
        // Draw prediction background
        ctx.fillStyle = 'rgba(244, 63, 94, 0.1)';
        ctx.fillRect(predictionStart, 20, width - predictionStart - 20, height - 50);
        
        // Draw dashed vertical line at prediction start
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(predictionStart, 20);
        ctx.lineTo(predictionStart, height - 30);
        ctx.stroke();
        
        // Draw "Prediction" label
        ctx.fillStyle = 'rgba(244, 63, 94, 0.8)';
        ctx.font = '10px sans-serif';
        ctx.fillText('Prediction', predictionStart + 5, 35);
        
        // Reset line dash
        ctx.setLineDash([]);
      }
      
      // Draw axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      
      // X-axis labels
      const labelStep = Math.max(1, Math.floor(dataPoints.length / 5));
      for (let i = 0; i < dataPoints.length; i += labelStep) {
        const x = 40 + i * stepX;
        ctx.fillText(dataPoints[i].label, x, height - 15);
      }
      
      // Y-axis labels
      ctx.textAlign = 'right';
      const valueStep = maxValue / 4;
      for (let i = 0; i <= 4; i++) {
        const value = i * valueStep;
        const y = height - 30 - (value * scaleY);
        ctx.fillText(Math.round(value).toString(), 35, y + 4);
      }
    }

  }, [timeframe]);

  const getDataForTimeframe = (timeframe: string) => {
    // In a real app, this would filter data based on timeframe
    return mockAttackData.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  };

  const processDataPoints = (data: typeof mockAttackData) => {
    // Group data by day and count attacks
    const counts: Record<string, number> = {};
    
    data.forEach(item => {
      const date = new Date(item.timestamp).toLocaleDateString();
      counts[date] = (counts[date] || 0) + 1;
    });
    
    // Convert to array of data points
    return Object.entries(counts).map(([date, count]) => ({
      label: date.split('/')[1], // Just the day for display
      value: count
    }));
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
        <div className="absolute bottom-2 right-2 text-xs text-slate-400">
          Data shown for {timeframe === '7d' ? '7 days' : 
                         timeframe === '30d' ? '30 days' : 
                         timeframe === '90d' ? '90 days' : '1 year'}
        </div>
      </div>
    </div>
  );
};

export default TrendOverview;