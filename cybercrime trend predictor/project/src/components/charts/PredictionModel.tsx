import React, { useEffect, useRef } from 'react';

interface PredictionModelProps {
  timeframe: string;
}

const PredictionModel: React.FC<PredictionModelProps> = ({ timeframe }) => {
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

    // Generate prediction data
    const { historicalData, predictionData } = generatePredictionData();
    
    // Draw axes
    ctx.strokeStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, height - 30);
    ctx.lineTo(width - 20, height - 30);
    ctx.stroke();
    
    // Find max value for scaling
    const allValues = [...historicalData.map(d => d.value), ...predictionData.map(d => d.value)];
    const maxValue = Math.max(...allValues) * 1.1; // Add 10% padding
    
    // Calculate scales
    const scaleY = (height - 50) / maxValue;
    const totalPoints = historicalData.length + predictionData.length;
    const stepX = (width - 60) / (totalPoints - 1);
    
    // Draw historical data
    ctx.strokeStyle = '#3b82f6'; // Blue
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    historicalData.forEach((point, i) => {
      const x = 40 + i * stepX;
      const y = height - 30 - (point.value * scaleY);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw prediction separator
    const separatorX = 40 + historicalData.length * stepX;
    
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)'; // Red with opacity
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(separatorX, 20);
    ctx.lineTo(separatorX, height - 30);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw prediction data
    ctx.strokeStyle = '#f43f5e'; // Red
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Start from the last point of historical data
    const lastHistorical = historicalData[historicalData.length - 1];
    const lastHistoricalX = 40 + (historicalData.length - 1) * stepX;
    const lastHistoricalY = height - 30 - (lastHistorical.value * scaleY);
    
    ctx.moveTo(lastHistoricalX, lastHistoricalY);
    
    predictionData.forEach((point, i) => {
      const x = 40 + (historicalData.length + i) * stepX;
      const y = height - 30 - (point.value * scaleY);
      ctx.lineTo(x, y);
    });
    
    ctx.stroke();
    
    // Draw confidence interval
    ctx.fillStyle = 'rgba(244, 63, 94, 0.1)'; // Light red
    
    const confidencePoints: [number, number][] = [];
    
    // Upper bound
    predictionData.forEach((point, i) => {
      const x = 40 + (historicalData.length + i) * stepX;
      const y = height - 30 - ((point.value + point.confidence) * scaleY);
      confidencePoints.push([x, y]);
    });
    
    // Lower bound (in reverse)
    for (let i = predictionData.length - 1; i >= 0; i--) {
      const point = predictionData[i];
      const x = 40 + (historicalData.length + i) * stepX;
      const y = height - 30 - ((point.value - point.confidence) * scaleY);
      confidencePoints.push([x, y]);
    }
    
    // Draw confidence area
    if (confidencePoints.length > 0) {
      ctx.beginPath();
      ctx.moveTo(confidencePoints[0][0], confidencePoints[0][1]);
      
      confidencePoints.forEach(([x, y]) => {
        ctx.lineTo(x, y);
      });
      
      ctx.closePath();
      ctx.fill();
    }
    
    // Draw prediction label
    ctx.fillStyle = 'rgba(244, 63, 94, 0.8)';
    ctx.font = '10px sans-serif';
    ctx.fillText('Prediction', separatorX + 5, 35);
    
    // Draw confidence interval label
    ctx.fillStyle = 'rgba(244, 63, 94, 0.8)';
    ctx.font = '10px sans-serif';
    ctx.fillText('Confidence Interval', width - 120, height - 50);
    
    // Draw axis labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    
    // X-axis labels
    const labelStep = Math.max(1, Math.floor(totalPoints / 5));
    const allPoints = [...historicalData, ...predictionData];
    
    for (let i = 0; i < totalPoints; i += labelStep) {
      const x = 40 + i * stepX;
      if (allPoints[i]) {
        ctx.fillText(allPoints[i].label, x, height - 15);
      }
    }
    
    // Y-axis labels
    ctx.textAlign = 'right';
    const valueStep = maxValue / 4;
    
    for (let i = 0; i <= 4; i++) {
      const value = i * valueStep;
      const y = height - 30 - (value * scaleY);
      ctx.fillText(Math.round(value).toString(), 35, y + 4);
    }

  }, [timeframe]);

  const generatePredictionData = () => {
    // Generate mock historical data
    const historicalData = Array.from({ length: 15 }, (_, i) => {
      // Simulate a trend with some randomness
      const baseValue = 20 + i * 2 + Math.random() * 10;
      return {
        label: `${i+1}`, // Just numbers for simplicity
        value: baseValue
      };
    });
    
    // Generate mock prediction data
    const lastValue = historicalData[historicalData.length - 1].value;
    const trend = (historicalData[historicalData.length - 1].value - historicalData[0].value) / historicalData.length;
    
    const predictionData = Array.from({ length: 8 }, (_, i) => {
      // Continue the trend with increasing uncertainty
      const value = lastValue + trend * (i + 1) * 1.2; // Slight acceleration
      return {
        label: `P${i+1}`,
        value: value,
        confidence: 5 + i * 2 // Increasing confidence interval
      };
    });
    
    return { historicalData, predictionData };
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
      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <div>Model: LSTM Sequence Prediction</div>
        <div>Accuracy: 87.2%</div>
      </div>
    </div>
  );
};

export default PredictionModel;