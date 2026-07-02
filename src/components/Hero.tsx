import { motion } from 'motion/react';
import { ArrowRight, Target } from 'lucide-react';
import { DashboardPreview } from './DashboardPreview';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 lg:py-32">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#B5FF45]/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-[#B5FF45]/[0.02] blur-[140px] pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-[1536px]">
        <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-16">
          
          {/* Left Column: Marketing Content */}
          <div className="w-full xl:w-[35%] flex flex-col items-center text-center xl:items-start xl:text-left max-w-2xl xl:max-w-none mx-auto">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#B5FF45]/20 bg-item-hover backdrop-blur-md mb-8"
            >
              <Target className="w-4 h-4 text-[#B5FF45]" />
              <span className="text-sm font-medium text-text-secondary">One Step Ahead</span>
            </motion.div>
 
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[84px] font-bold tracking-tight leading-[1.05] mb-6 text-text-primary"
            >
              One <br className="hidden xl:block" />
              <span className="bg-gradient-to-r from-[#B5FF45] to-[#45FF9E] bg-clip-text text-transparent">Step</span> <br className="hidden xl:block" />
              Ahead.
            </motion.h1>
 
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-text-secondary mb-10 max-w-2xl xl:max-w-md leading-relaxed font-normal"
            >
              Kramik helps students prepare for placements through structured learning, aptitude preparation, core computer science subjects, mock tests, interview preparation, AI-powered guidance, and progress tracking.
            </motion.p>
 
            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
            >
              <button className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[#B5FF45] text-black font-semibold rounded-xl shadow-[0_0_30px_rgba(181,255,69,0.15)] transition-all duration-300 hover:bg-[#c3ff5c] hover:shadow-[0_0_40px_rgba(181,255,69,0.25)] hover:-translate-y-1">
                Start Preparing
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-transparent text-text-primary font-medium rounded-xl border border-border-custom transition-all duration-300 hover:bg-item-hover hover:border-border-hover">
                Explore Platform
              </button>
            </motion.div>
 
            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-11 h-11 rounded-full border-[3px] border-bg-primary overflow-hidden bg-item-hover relative z-[${4-i}]`}>
                    <img src={`https://i.pravatar.cc/100?img=${i * 12 + 5}`} alt={`Student ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-text-secondary font-medium max-w-[200px] sm:max-w-none text-center sm:text-left">
                <span className="text-accent-custom dark:text-[#B5FF45] font-semibold">10,000+</span> students already<br className="hidden sm:block xl:hidden" /> preparing with Kramik
              </p>
            </motion.div>
 
          </div>
 
          {/* Right Column: Dashboard Preview */}
          <div className="w-full xl:w-[65%] relative xl:pl-4 mt-10 xl:mt-0">
            <DashboardPreview />
          </div>
 
        </div>
      </div>
    </section>
  );
}
