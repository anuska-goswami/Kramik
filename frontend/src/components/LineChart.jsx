import { motion } from "motion/react";
export function LineChart() {
  const points = "0,90 60,75 120,80 180,50 240,60 300,20 360,30 420,10";
  const dataPoints = [
    { x: 0, y: 90 },
    { x: 60, y: 75 },
    { x: 120, y: 80 },
    { x: 180, y: 50 },
    { x: 240, y: 60 },
    { x: 300, y: 20 },
    { x: 360, y: 30 },
    { x: 420, y: 10 }
  ];
  return <div className="absolute inset-0 w-full h-full pt-4">
      <svg viewBox="0 0 420 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        {
    /* Grid lines */
  }
        {[0, 25, 50, 75, 100].map((y) => <line
    key={y}
    x1="0"
    y1={y}
    x2="420"
    y2={y}
    stroke="currentColor"
    className="text-border-custom"
    strokeWidth="1"
  />)}
        
        {
    /* Gradient Definition */
  }
        <defs>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B5FF45" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B5FF45" stopOpacity="1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {
    /* Animated Line */
  }
        <motion.polyline
    points={points}
    fill="none"
    stroke="url(#line-gradient)"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    filter="url(#glow)"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
  />

        {
    /* Data Points */
  }
        {dataPoints.map((point, i) => <motion.circle
    key={i}
    cx={point.x}
    cy={point.y}
    r="4"
    fill="currentColor"
    className="text-bg-primary"
    stroke="#B5FF45"
    strokeWidth="2"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.5 + i * 0.15 }}
  />)}
      </svg>
    </div>;
}
