import React, { useEffect, useRef } from 'react';

const ThreatMap: React.FC = () => {
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

    // Draw simplified world map outline
    drawWorldMap(ctx, width, height);
    
    // Draw threat points
    drawThreatPoints(ctx, width, height);

  }, []);

  const drawWorldMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // This is a very simplified world map outline
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    
    // Define map regions as simplified shapes
    const regions = [
      // North America
      [
        [0.1, 0.2], [0.3, 0.2], [0.35, 0.4], [0.2, 0.45], [0.1, 0.35]
      ],
      // South America
      [
        [0.25, 0.45], [0.35, 0.45], [0.3, 0.7], [0.2, 0.7], [0.25, 0.45]
      ],
      // Europe
      [
        [0.45, 0.2], [0.55, 0.2], [0.6, 0.35], [0.45, 0.35]
      ],
      // Africa
      [
        [0.45, 0.35], [0.6, 0.35], [0.55, 0.6], [0.4, 0.6], [0.45, 0.35]
      ],
      // Asia
      [
        [0.6, 0.2], [0.85, 0.2], [0.85, 0.45], [0.6, 0.45], [0.6, 0.2]
      ],
      // Australia
      [
        [0.75, 0.55], [0.85, 0.55], [0.85, 0.65], [0.75, 0.65], [0.75, 0.55]
      ]
    ];
    
    // Draw each region
    regions.forEach(region => {
      ctx.beginPath();
      ctx.moveTo(region[0][0] * width, region[0][1] * height);
      
      for (let i = 1; i < region.length; i++) {
        ctx.lineTo(region[i][0] * width, region[i][1] * height);
      }
      
      ctx.closePath();
      ctx.stroke();
      
      // Fill with a very subtle color
      ctx.fillStyle = 'rgba(71, 85, 105, 0.3)';
      ctx.fill();
    });
  };

  const drawThreatPoints = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Generate random threat points
    const points = [
      // Format: [x, y, intensity]
      [0.2, 0.3, 0.7], // North America
      [0.15, 0.25, 0.5],
      [0.3, 0.35, 0.3],
      
      [0.25, 0.55, 0.4], // South America
      [0.3, 0.6, 0.2],
      
      [0.5, 0.25, 0.9], // Europe
      [0.55, 0.3, 0.8],
      [0.45, 0.28, 0.6],
      
      [0.5, 0.45, 0.5], // Africa
      [0.45, 0.5, 0.3],
      
      [0.7, 0.3, 1.0], // Asia
      [0.75, 0.35, 0.7],
      [0.65, 0.4, 0.6],
      [0.8, 0.25, 0.4],
      
      [0.8, 0.6, 0.3], // Australia
    ];
    
    // Draw each point as a glowing circle
    points.forEach(([x, y, intensity]) => {
      const radius = 5 + intensity * 10;
      const centerX = x * width;
      const centerY = y * height;
      
      // Create radial gradient
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      
      // Set gradient colors based on intensity
      let color;
      if (intensity > 0.7) {
        color = '#ef4444'; // Red for high intensity
      } else if (intensity > 0.4) {
        color = '#f97316'; // Orange for medium intensity
      } else {
        color = '#3b82f6'; // Blue for low intensity
      }
      
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add a small dot in the center
      ctx.beginPath();
      ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    });
    
    // Add connecting lines between some points
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.lineWidth = 1;
    
    // Draw connecting lines
    ctx.beginPath();
    ctx.moveTo(points[0][0] * width, points[0][1] * height);
    ctx.lineTo(points[6][0] * width, points[6][1] * height);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(points[6][0] * width, points[6][1] * height);
    ctx.lineTo(points[10][0] * width, points[10][1] * height);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(points[0][0] * width, points[0][1] * height);
    ctx.lineTo(points[10][0] * width, points[10][1] * height);
    ctx.stroke();
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

export default ThreatMap;