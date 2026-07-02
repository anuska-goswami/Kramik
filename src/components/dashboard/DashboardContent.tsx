import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, Flame, Target, Target as TargetIcon, BrainCircuit, Code,
  BookOpen, CheckCircle, ChevronRight, PlayCircle, Trophy, Book,
  Calendar, FileEdit, Sparkles, LayoutDashboard, Brain, FileText, Briefcase, Map, BarChart3, Bot, Bookmark, Settings, User, MessageSquare
} from 'lucide-react';
import { SubmissionActivity } from './SubmissionActivity';

export function DashboardContent() {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-24"
    >
      {/* Greeting Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-semibold tracking-tight text-white mb-2">
            Welcome back, Anuska 👋
          </h1>
          <p className="text-gray-400 text-sm">
            Let's continue your placement preparation today.
          </p>
        </div>
        <div className="text-right text-sm text-gray-500 font-medium">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Target} label="Placement Readiness" value="78%" trend="+5% this week" />
        <StatCard icon={FileEdit} label="Mock Tests Attempted" value="14" trend="2 pending review" />
        <StatCard icon={BookOpen} label="Subjects Completed" value="4/8" trend="Top 15% in class" highlight />
        <StatCard icon={CheckCircle} label="Overall Accuracy" value="82%" trend="+4% from last week" />
      </motion.div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Subject Preparation */}
          <motion.div variants={itemVariants} className="bg-[#0A0E17] border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Subject Preparation</h3>
              <button className="text-sm text-gray-400 hover:text-[#B5FF45] flex items-center gap-1 transition-colors">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <SubjectProgressCard 
                icon={Brain} name="Aptitude & Reasoning" progress={78} chapters="12/15" status="In Progress" color="bg-[#B5FF45]" text="text-[#B5FF45]" />
              <SubjectProgressCard 
                icon={LayoutDashboard} name="Operating Systems" progress={45} chapters="8/18" status="In Progress" color="bg-orange-400" text="text-orange-400" />
              <SubjectProgressCard 
                icon={Book} name="Database Management" progress={90} chapters="10/11" status="Revision Pending" color="bg-blue-400" text="text-blue-400" />
              <SubjectProgressCard 
                icon={TargetIcon} name="Computer Networks" progress={100} chapters="12/12" status="Completed" color="bg-emerald-400" text="text-emerald-400" />
              <SubjectProgressCard 
                icon={FileText} name="Resume Preparation" progress={30} chapters="4/14" status="In Progress" color="bg-purple-400" text="text-purple-400" />
              <SubjectProgressCard 
                icon={MessageSquare} name="HR Interview Prep" progress={0} chapters="0/8" status="Not Started" color="bg-gray-500" text="text-gray-400" />
            </div>
          </motion.div>

          {/* Continue Preparing */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-white px-1">Continue Preparing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <ContinueCard icon={Brain} title="Practice Aptitude" subtitle="Quant & Logical" onClick={() => navigate('/subjects/aptitude')} />
              <ContinueCard icon={BookOpen} title="Revise Core Subjects" subtitle="Topic-wise revision" onClick={() => navigate('/subjects/os')} />
              <ContinueCard icon={FileEdit} title="Attempt Mock Test" subtitle="Company specifics" onClick={() => navigate('/mock-tests')} />
              <ContinueCard icon={Briefcase} title="Company Preparation" subtitle="Previous years" onClick={() => navigate('/subjects')} />
              <ContinueCard icon={FileText} title="Resume Builder" subtitle="ATS-friendly templates" onClick={() => navigate('/profile')} />
              <ContinueCard icon={MessageSquare} title="Interview Prep" subtitle="HR & Technical" onClick={() => navigate('/dashboard')} />
              <ContinueCard icon={Map} title="Roadmap" subtitle="Your journey" onClick={() => navigate('/subjects')} />
              <ContinueCard icon={Sparkles} title="AI Mentor" subtitle="Get guidance" onClick={() => navigate('/dashboard')} />
            </div>
          </motion.div>

          {/* Recent Activity Timeline */}
          <motion.div variants={itemVariants} className="bg-[#0A0E17] border border-white/5 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border-hover before:via-border-hover before:to-transparent">
               <TimelineItem time="2 hours ago" title="Completed Mock Test: TCS NQT" score="85%" icon={Trophy} />
               <TimelineItem time="5 hours ago" title="Completed OS Process Scheduling" subject="Operating Systems" icon={BookOpen} />
               <TimelineItem time="Yesterday" title="Completed DBMS Subject" duration="3h 20m" icon={CheckCircle} />
               <TimelineItem time="Yesterday" title="AI Recommendation applied" detail="Revised DBMS Normalization" icon={Sparkles} isAI />
            </div>
          </motion.div>

          {/* Company Preparation */}
          <motion.div variants={itemVariants} className="bg-[#0A0E17] border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Company Preparation</h3>
              <button className="text-sm text-gray-400 hover:text-[#B5FF45] flex items-center gap-1 transition-colors">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {['Amazon', 'Microsoft', 'Google', 'Adobe', 'Goldman Sachs', 'Flipkart', 'TCS', 'Infosys', 'Accenture', 'Cognizant'].map((company) => (
                <div key={company} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-white/[0.05] hover:border-[#B5FF45]/30 hover:shadow-[0_0_15px_rgba(181,255,69,0.05)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg font-bold text-gray-300 group-hover:text-[#B5FF45] group-hover:border-[#B5FF45]/30 transition-colors">
                    {company.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors text-center">{company}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Daily Streak Widget */}
          <motion.div variants={itemVariants} className="bg-[#0A0E17] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/10 rounded-full blur-[40px] group-hover:bg-orange-500/20 transition-colors duration-500" />
            <div className="flex items-center justify-between mb-5 relative z-10">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                Daily Streak
              </h3>
              <span className="text-xs font-bold text-white bg-white/5 px-2 py-1 rounded border border-white/10">12 Days</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-semibold">Longest Streak</div>
                <div className="text-sm font-bold text-white">28 Days</div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-semibold">Activities Today</div>
                <div className="text-sm font-bold text-white">4 Completed</div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 col-span-2">
                <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-semibold">Study Hours Today</div>
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold text-[#B5FF45]">4.5h</div>
                  <div className="text-xs text-gray-500 mb-1 font-medium">/ 6h target</div>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full mt-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#B5FF45] to-[#80E600] rounded-full shadow-[0_0_10px_rgba(181,255,69,0.5)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Today's Focus */}
          <motion.div variants={itemVariants} className="bg-[#0A0E17] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#B5FF45]/[0.02] rounded-full blur-[60px]" />
             <div className="flex items-center justify-between mb-5 relative z-10">
               <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-[#B5FF45]" />
                 Today's Focus
               </h3>
               <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded">AI Generated</span>
             </div>
             
             <div className="space-y-3 relative z-10">
                <TaskItem title="Complete OS Process Scheduling" duration="45m" priority="high" />
                <TaskItem title="Revise DBMS Transactions" duration="30m" priority="medium" />
                <TaskItem title="Solve 2 Aptitude Sets" duration="1h" priority="high" />
                <TaskItem title="Attempt Mock Test 12" duration="1h 30m" priority="high" />
                <TaskItem title="Review Yesterday's Mistakes" duration="20m" priority="low" />
             </div>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-accent-custom/20 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 p-4 opacity-10">
              <BrainCircuit className="w-40 h-40 text-accent-custom dark:text-[#B5FF45]" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2 relative z-10">
              <Sparkles className="w-4 h-4 text-accent-custom dark:text-[#B5FF45]" />
              AI Recommendations
            </h3>
            <div className="space-y-3 relative z-10">
              <RecommendationItem text="Your DBMS progress has reached 78%. Start Transactions next." />
              <RecommendationItem text="You haven't practiced Aptitude for three days." alert />
              <RecommendationItem text="Your DBMS accuracy has improved by 12%." positive />
              <RecommendationItem text="You are ready for Amazon OA Mock Test." />
              <RecommendationItem text="Revise Operating Systems before your upcoming mock interview." />
            </div>
          </motion.div>

          {/* Upcoming Mock Tests */}
          <motion.div variants={itemVariants} className="bg-[#0A0E17] border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Upcoming Mock Tests</h3>
              <button className="text-xs text-[#B5FF45] hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              <MockTestCard company="TCS" name="TCS NQT Advanced" duration="90m" difficulty="Medium" qCount={65} date="Tomorrow, 10 AM" />
              <MockTestCard company="Amazon" name="Amazon Aptitude OA" duration="120m" difficulty="Hard" qCount={40} date="Aug 15, 2 PM" />
            </div>
          </motion.div>

          {/* Placement Readiness Widget */}
          <motion.div variants={itemVariants} className="bg-[#0A0E17] border border-white/5 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Placement Readiness</h3>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-24 h-24 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-white/10 fill-none" strokeWidth="8" />
                  <motion.circle 
                    initial={{ strokeDasharray: "0 251.2" }}
                    animate={{ strokeDasharray: "196 251.2" }} // 78% of 251.2
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="50" cy="50" r="40" 
                    className="stroke-[#B5FF45] fill-none" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">78%</span>
                </div>
              </div>
              <div>
                <h4 className="text-base font-semibold text-white mb-1">Overall Score</h4>
                <p className="text-xs text-gray-400">You are in the top 20% of candidates. Keep pushing!</p>
              </div>
            </div>

            <div className="space-y-4">
              <ReadinessBar label="Aptitude Readiness" value={85} color="bg-blue-400" />
              <ReadinessBar label="Core Subjects Readiness" value={65} color="bg-purple-400" />
              <ReadinessBar label="Resume Readiness" value={75} color="bg-orange-400" />
              <ReadinessBar label="Interview Readiness" value={60} color="bg-emerald-400" />
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="bg-[#0A0E17] border border-white/5 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <QuickActionButton icon={Sparkles} label="Ask AI Mentor" />
              <QuickActionButton icon={FileText} label="Generate Resume" />
              <QuickActionButton icon={Map} label="Continue Roadmap" />
              <QuickActionButton icon={BookOpen} label="Revise Subjects" />
              <QuickActionButton icon={Brain} label="Solve Aptitude" />
              <QuickActionButton icon={FileEdit} label="Start Mock Test" />
              <QuickActionButton icon={BarChart3} label="View Performance" />
              <QuickActionButton icon={User} label="Edit Profile" />
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

function QuickActionButton({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#B5FF45]/30 transition-all duration-300 group hover:-translate-y-0.5">
      <Icon className="w-4 h-4 text-gray-400 group-hover:text-[#B5FF45] transition-colors" />
      <span className="text-[10px] font-medium text-gray-300 group-hover:text-white transition-colors text-center">{label}</span>
    </button>
  );
}

function StatCard({ icon: Icon, label, value, trend, highlight }: { icon: any, label: string, value: string, trend: string, highlight?: boolean }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-32 group
      ${highlight 
        ? 'bg-accent-custom/5 dark:bg-[#B5FF45]/5 border-accent-custom/20 dark:border-[#B5FF45]/20 hover:shadow-accent-custom/10' 
        : 'bg-bg-secondary border-border-custom hover:border-border-hover hover:shadow-black/5'
      }
    `}>
      <div className="flex justify-between items-start">
        <span className="text-xs font-medium text-text-secondary transition-colors">{label}</span>
        <div className={`p-2 rounded-xl ${highlight ? 'bg-accent-custom/10 dark:bg-[#B5FF45]/10' : 'bg-item-hover'} transition-colors`}>
          <Icon className={`w-4 h-4 ${highlight ? 'text-accent-custom dark:text-[#B5FF45]' : 'text-text-secondary group-hover:text-text-primary'} transition-colors`} />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold tracking-tight mb-1 text-text-primary">{value}</div>
        <div className={`text-[10px] font-medium ${highlight ? 'text-accent-custom dark:text-[#B5FF45]' : 'text-text-secondary/70'}`}>{trend}</div>
      </div>
    </div>
  );
}

function SubjectProgressCard({ icon: Icon, name, progress, chapters, status, color, text }: any) {
  const statusColors: any = {
    'Not Started': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    'In Progress': 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    'Revision Pending': 'bg-orange-400/10 text-orange-400 border-orange-400/20',
    'Completed': 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  };

  return (
    <div className="group bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-5 h-5 ${text}`} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white group-hover:text-[#B5FF45] transition-colors">{name}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{chapters} Chapters Completed</p>
          </div>
        </div>
        <div className={`text-[10px] font-semibold px-2 py-1 rounded border ${statusColors[status]}`}>
          {status}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            className={`h-full ${color} rounded-full shadow-[0_0_10px_currentColor]`}
          />
        </div>
        <span className={`text-xs font-bold ${text} w-8 text-right`}>{progress}%</span>
      </div>
    </div>
  );
}

function ContinueCard({ icon: Icon, title, subtitle, onClick }: { icon: any, title: string, subtitle: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="group bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:bg-[#B5FF45]/5 hover:border-[#B5FF45]/20 transition-all duration-300 cursor-pointer flex flex-col items-center text-center hover:-translate-y-1">
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:bg-[#B5FF45]/10 group-hover:border-[#B5FF45]/30 transition-colors">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#B5FF45] transition-colors" />
      </div>
      <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
      <p className="text-[10px] text-gray-500">{subtitle}</p>
    </div>
  );
}

function TaskItem({ title, duration, priority }: { title: string, duration: string, priority: 'high' | 'medium' | 'low' }) {
  const [completed, setCompleted] = useState(false);
  
  const pColors = {
    high: 'text-red-400 border-red-400/20 bg-red-400/10',
    medium: 'text-orange-400 border-orange-400/20 bg-orange-400/10',
    low: 'text-[#B5FF45] border-[#B5FF45]/20 bg-[#B5FF45]/10'
  };
  
  return (
    <motion.div 
      animate={completed ? { opacity: 0.5, scale: 0.98 } : { opacity: 1, scale: 1 }}
      className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 border ${completed ? 'bg-white/[0.01] border-white/5' : 'bg-white/[0.03] border-white/10 hover:border-white/20'} cursor-pointer`}
      onClick={() => setCompleted(!completed)}
    >
      <div className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${completed ? 'bg-[#B5FF45] border-[#B5FF45]' : 'border-gray-500 hover:border-[#B5FF45]'}`}>
        <CheckCircle className={`w-3.5 h-3.5 transition-colors ${completed ? 'text-[#05080D]' : 'text-transparent'}`} />
      </div>
      <div className="flex-1">
        <p className={`text-sm font-medium transition-colors ${completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{title}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
            <Clock className="w-3 h-3" /> {duration}
          </span>
          {!completed && (
            <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider border ${pColors[priority]}`}>
              {priority}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function RecommendationItem({ text, alert, positive }: { text: string, alert?: boolean, positive?: boolean }) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl border ${
      alert 
        ? 'bg-orange-500/5 dark:bg-orange-500/10 border-orange-500/15 dark:border-orange-500/20 text-orange-800 dark:text-orange-200' 
        : positive 
          ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/15 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-200' 
          : 'bg-item-hover border-border-custom text-text-secondary'
    }`}>
      <div className="mt-0.5 shrink-0">
        <Sparkles className={`w-4 h-4 ${alert ? 'text-orange-500 dark:text-orange-400' : positive ? 'text-emerald-500 dark:text-emerald-400' : 'text-accent-custom dark:text-[#B5FF45]'}`} />
      </div>
      <p className="text-xs leading-relaxed">{text}</p>
    </div>
  );
}

function MockTestCard({ company, name, duration, difficulty, qCount, date }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.04] transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">{company}</div>
          <h4 className="text-sm font-semibold text-white group-hover:text-[#B5FF45] transition-colors">{name}</h4>
        </div>
        <div className="text-xs font-medium bg-white/5 px-2 py-1 rounded text-gray-300">
          {date}
        </div>
      </div>
      <div className="flex items-center gap-4 text-[11px] text-gray-400">
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {duration}</span>
        <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5" /> {difficulty}</span>
        <span className="flex items-center gap-1"><FileEdit className="w-3.5 h-3.5" /> {qCount} Qs</span>
      </div>
      <button className="w-full mt-4 py-2 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] text-white text-xs font-semibold rounded-xl transition-all duration-300">
        Start Test
      </button>
    </div>
  );
}

function ReadinessBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-400 font-medium">{label}</span>
        <span className="text-white font-bold">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}

function TimelineItem({ time, title, detail, score, subject, duration, icon: Icon, isAI }: any) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg-primary bg-item-hover text-text-secondary group-hover:text-text-primary group-hover:bg-bg-tertiary transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-sm relative left-[-24px] md:left-auto">
        <Icon className={`w-4 h-4 ${isAI ? 'text-accent-custom dark:text-[#B5FF45]' : ''}`} />
      </div>
      
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-bg-secondary/40 border border-border-custom p-4 rounded-2xl hover:border-border-hover transition-colors group-hover:-translate-y-0.5">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[10px] font-bold tracking-wider uppercase ${isAI ? 'text-accent-custom dark:text-[#B5FF45]' : 'text-text-secondary/70'}`}>{time}</span>
          {score && <span className="text-[10px] font-semibold text-accent-custom dark:text-[#B5FF45] bg-accent-custom/10 px-2 py-0.5 rounded">{score}</span>}
          {duration && <span className="text-[10px] text-text-secondary bg-item-hover px-2 py-0.5 rounded flex items-center gap-1"><Clock className="w-3 h-3"/> {duration}</span>}
        </div>
        <h4 className="text-sm font-medium text-text-primary mb-1">{title}</h4>
        {detail && <p className="text-xs text-text-secondary">{detail}</p>}
        {subject && <span className="inline-block mt-2 text-[10px] bg-item-hover text-text-secondary px-2 py-1 rounded-md">{subject}</span>}
      </div>
    </div>
  )
}

