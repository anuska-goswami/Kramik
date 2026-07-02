import { 
  LayoutDashboard, BookOpen, Brain, FileEdit, 
  Map as MapIcon, BarChart3, Bookmark, Settings, 
  Flame, TrendingUp, CheckCircle, Target 
} from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart } from './LineChart';

export function DashboardPreview() {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: BookOpen, label: 'Core Subjects' },
    { icon: Brain, label: 'Aptitude' },
    { icon: FileEdit, label: 'Mock Tests' },
    { icon: MapIcon, label: 'Roadmap' },
    { icon: BarChart3, label: 'Performance' },
    { icon: Bookmark, label: 'Bookmarks' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[1100px] mx-auto xl:mx-0 xl:ml-auto aspect-[4/3] sm:aspect-auto"
    >
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full sm:h-[600px] rounded-2xl border border-white/10 bg-[#0B101A]/80 backdrop-blur-2xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col sm:flex-row text-left relative z-10"
      >
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col w-64 border-r border-white/5 bg-white/[0.01] p-4 lg:p-5">
          <div className="flex items-center mb-8 px-2 mt-2">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#B5FF45]">K</span>
              <span className="text-white">ramik</span>
            </span>
          </div>
          
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ${
                  item.active 
                    ? 'bg-[#B5FF45]/10 text-[#B5FF45] font-medium' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-[18px] h-[18px] ${item.active ? 'text-[#B5FF45]' : 'text-gray-400'}`} />
                {item.label}
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="sm:hidden flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.01]">
           <div className="flex items-center">
            <span className="text-lg font-bold tracking-tight">
              <span className="text-[#B5FF45]">K</span>
              <span className="text-white">ramik</span>
            </span>
          </div>
          <LayoutDashboard className="w-5 h-5 text-[#B5FF45]" />
        </div>

        {/* Main Area */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-1">Welcome back 👋</h2>
            <p className="text-sm text-gray-400">Let's continue your preparation today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={BookOpen} label="Subjects Completed" value="8" />
            <StatCard icon={Target} label="Mock Test Score" value="85%" />
            <StatCard icon={Flame} label="Current Streak" value="12" />
            <StatCard icon={TrendingUp} label="Overall Progress" value="68%" />
          </div>

          {/* Chart & Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl border border-white/5 bg-white/[0.02] p-5 flex flex-col relative group">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-gray-200">Preparation Progress</span>
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">This Week</span>
              </div>
              <div className="flex-1 min-h-[140px] relative">
                <LineChart />
              </div>
            </div>
            
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 flex flex-col justify-between">
              <span className="text-sm font-medium text-gray-200 mb-4 block">Subject Progress</span>
              <div className="flex flex-col gap-4">
                <ProgressBar label="Aptitude" progress={75} />
                <ProgressBar label="Operating Systems" progress={60} />
                <ProgressBar label="DBMS" progress={85} />
                <ProgressBar label="Computer Networks" progress={45} />
                <ProgressBar label="OOP" progress={30} />
                <ProgressBar label="Interview Prep" progress={90} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-6 -right-4 sm:-top-8 sm:-right-8 z-20 flex items-center gap-3 p-3 sm:px-4 sm:py-3 rounded-xl border border-white/10 bg-[#121822]/90 backdrop-blur-xl shadow-xl shadow-black/50"
      >
        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
          <Flame className="w-5 h-5 text-orange-500" fill="currentColor" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">12 Day Streak</p>
          <p className="text-xs text-gray-400 mt-0.5">You're on fire! 🔥</p>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-12 z-20 flex items-center gap-2.5 p-2 sm:px-4 sm:py-3 rounded-xl border border-[#B5FF45]/20 bg-[#B5FF45]/10 backdrop-blur-xl shadow-xl shadow-[#B5FF45]/5"
      >
        <div className="w-8 h-8 rounded-full bg-[#B5FF45]/20 flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-[#B5FF45]" />
        </div>
        <span className="text-sm font-medium text-[#B5FF45] pr-1">Mock Test +15%</span>
      </motion.div>

    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 flex flex-col justify-between min-h-[100px]">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-gray-500 group-hover:text-[#B5FF45] transition-colors" />
        <span className="text-xs text-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
      </div>
      <p className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{value}</p>
    </div>
  );
}

function ProgressBar({ label, progress }: { label: string, progress: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-gray-300 truncate pr-2">{label}</span>
        <span className="text-gray-500">{progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#B5FF45] to-[#45FF9E] rounded-full"
        />
      </div>
    </div>
  );
}
