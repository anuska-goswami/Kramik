import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Terminal,
  MessageSquare,
  FileText,
  Target,
  Mic,
  Briefcase,
  BookOpen,
  Clock,
  PlayCircle,
  TrendingUp,
  Sparkles,
  Building2,
  Map
} from "lucide-react";
import { interviewCategories, mockInterviewsData, interviewExperiencesData, resourcesData } from "../../data/interviewData";
const iconMap = {
  Users,
  Terminal,
  MessageSquare,
  FileText,
  Target,
  Mic,
  Briefcase,
  UsersRound: Users
};
const resourceIconMap = {
  FileText,
  Terminal,
  PlayCircle,
  Users
};
export function InterviewPrepContent({ onCategorySelect }) {
  const navigate = useNavigate();
  const handleCategoryClick = (id) => {
    navigate(`/interview-prep/${id}`);
    if (onCategorySelect) onCategorySelect();
  };
  const stats = [
    { label: "Interview Readiness", value: "72%", icon: TrendingUp, highlight: true },
    { label: "Mock Interviews", value: "14", icon: Target },
    { label: "HR Questions Practiced", value: "45", icon: MessageSquare },
    { label: "Communication Score", value: "8.5/10", icon: Mic }
  ];
  return <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }}
    className="p-6 lg:p-8 space-y-10 max-w-[1600px] mx-auto text-white"
  >
      {
    /* Hero Section */
  }
      <motion.div
    variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
  >
        <div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold tracking-tight text-white mb-3">
            Interview Preparation
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
            Prepare confidently for technical interviews, HR interviews, communication rounds, and behavioral assessments with AI-powered guidance.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#B5FF45] text-[#05080D] rounded-xl font-semibold hover:bg-[#a0e63b] transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(181,255,69,0.3)] shrink-0">
          Continue Preparation <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {
    /* Stats Row */
  }
      <motion.div
    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
  >
        {stats.map((stat, idx) => <div
    key={idx}
    className={`relative overflow-hidden bg-[#0A0E17]/60 border ${stat.highlight ? "border-[#B5FF45]/30" : "border-white/5"} rounded-2xl p-5 hover:border-white/20 transition-all duration-300 group`}
  >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#B5FF45]/[0.02] rounded-full blur-[30px]" />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                </div>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.highlight ? "bg-[#B5FF45]/10 text-[#B5FF45]" : "bg-white/5 text-gray-400 group-hover:text-[#B5FF45] group-hover:bg-[#B5FF45]/10"} transition-colors`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>)}
      </motion.div>

      {
    /* Interview Categories Grid */
  }
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Interview Categories</h2>
          <p className="text-xs text-gray-400">Select a category to start practicing</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {interviewCategories.map((category) => {
    const Icon = iconMap[category.iconName] || BookOpen;
    return <motion.div
      key={category.id}
      onClick={() => handleCategoryClick(category.id)}
      className="group relative bg-[#0A0E17]/60 border border-white/5 rounded-2xl overflow-hidden hover:border-[#B5FF45]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full hover:shadow-[0_10px_30px_-10px_rgba(181,255,69,0.1)]"
    >
                <div className="p-5 flex flex-col flex-grow relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#B5FF45]/10 group-hover:text-[#B5FF45] transition-colors text-gray-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#B5FF45] transition-colors">{category.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-2">{category.description}</p>
                  
                  <div className="mt-auto space-y-4">
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{category.estimatedTime}</span>
                      <span>{category.progress}% Complete</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#B5FF45] rounded-full" style={{ width: `${category.progress}%` }} />
                    </div>
                    <button className="w-full py-2.5 bg-white/[0.02] border border-white/5 group-hover:bg-[#B5FF45] group-hover:text-[#05080D] group-hover:border-[#B5FF45] text-white text-xs font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5">
                      Continue <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>;
  })}
        </div>
      </motion.div>

      {
    /* AI Interview Coach */
  }
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 border-t border-border-custom">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#B5FF45]" />
          AI Interview Coach Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
    "Practice your self-introduction.",
    "Improve your communication confidence.",
    "Revise DBMS before your Oracle interview."
  ].map((rec, idx) => <div key={idx} className="bg-gradient-to-br from-[#B5FF45]/10 to-transparent border border-[#B5FF45]/30 rounded-2xl p-5 flex flex-col justify-between hover:border-[#B5FF45]/50 transition-colors group">
              <div className="flex items-start gap-3 mb-4">
                <Sparkles className="w-4 h-4 text-[#B5FF45] shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-white">{rec}</p>
              </div>
              <button className="mt-auto self-start px-4 py-2 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] rounded-lg text-xs font-semibold transition-colors">
                Practice Now
              </button>
            </div>)}
        </div>
      </motion.div>

      {
    /* Mock Interviews */
  }
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 border-t border-border-custom">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Mock Interviews</h2>
            <p className="text-xs text-gray-400">Simulate real interview conditions</p>
          </div>
          <button className="text-sm text-[#B5FF45] hover:underline font-medium">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockInterviewsData.map((mock) => <div key={mock.id} className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-colors group flex flex-col">
              <div className="p-3 bg-white/5 rounded-xl w-fit mb-4 group-hover:bg-[#B5FF45]/10 group-hover:text-[#B5FF45] transition-colors">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">{mock.title}</h4>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-6">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {mock.duration}</span>
                <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {mock.questions} Qs</span>
                <span className={`flex items-center gap-1 font-medium ${mock.difficulty === "Hard" ? "text-red-400" : mock.difficulty === "Medium" ? "text-yellow-400" : "text-[#B5FF45]"}`}>{mock.difficulty}</span>
              </div>
              <button className="mt-auto w-full py-2.5 bg-[#B5FF45]/10 text-[#B5FF45] border border-[#B5FF45]/20 hover:bg-[#B5FF45] hover:text-[#05080D] font-bold text-xs rounded-xl transition-all duration-300">
                Start Mock Interview
              </button>
            </div>)}
        </div>
      </motion.div>

      {
    /* Interview Experiences */
  }
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 border-t border-border-custom">
        <h2 className="text-xl font-bold text-white mb-6">Interview Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewExperiencesData.map((exp) => <div key={exp.id} className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-colors flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-[#B5FF45] transition-colors">{exp.company}</h4>
                  <p className="text-xs text-[#B5FF45]">{exp.role}</p>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-semibold ${exp.difficulty === "Hard" ? "bg-red-500/10 text-red-400" : exp.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400" : "bg-[#B5FF45]/10 text-[#B5FF45]"}`}>
                  {exp.difficulty}
                </span>
              </div>
              <div className="text-xs text-gray-400 mb-3 flex items-center gap-3">
                <span>Year: {exp.year}</span>
                <span>Rounds: {exp.rounds}</span>
              </div>
              <p className="text-sm text-gray-300 mb-6 line-clamp-3">{exp.summary}</p>
              <button className="mt-auto text-xs font-semibold text-[#B5FF45] hover:underline self-start">
                Read Full Experience
              </button>
            </div>)}
        </div>
      </motion.div>

      {
    /* Frequently Asked Questions by Company */
  }
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 border-t border-border-custom">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Frequently Asked Questions by Company</h2>
            <p className="text-xs text-gray-400">Frequently asked questions by top recruiters</p>
          </div>
          <button className="text-sm text-[#B5FF45] hover:underline font-medium">View All</button>
        </div>
        <div className="flex flex-wrap gap-3">
          {["TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "Capgemini", "Deloitte", "Amazon", "Microsoft", "Google", "Adobe", "Oracle"].map((company, idx) => <button key={idx} className="px-5 py-3 bg-[#0A0E17]/60 border border-white/5 hover:border-[#B5FF45]/50 hover:bg-[#B5FF45]/5 rounded-xl text-sm font-semibold text-white transition-all group flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-500 group-hover:text-[#B5FF45]" />
              {company}
            </button>)}
        </div>
      </motion.div>

      {
    /* Interview Readiness Tracker */
  }
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 border-t border-border-custom">
        <h2 className="text-xl font-bold text-white mb-6">Readiness Tracker</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-center">
             <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" className="stroke-white/10" strokeWidth="12" fill="none" />
                  <circle cx="64" cy="64" r="56" className="stroke-[#B5FF45]" strokeWidth="12" fill="none" strokeDasharray="351.8" strokeDashoffset={351.8 - 351.8 * 72 / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold text-white">72%</span>
                </div>
              </div>
              <h3 className="text-base font-bold text-white">Overall Readiness</h3>
          </div>
          <div className="lg:col-span-2 bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-6 space-y-6">
            {[
    { label: "HR Readiness", value: 85 },
    { label: "Technical Readiness", value: 60 },
    { label: "Communication Skills", value: 75 },
    { label: "Resume Readiness", value: 90 }
  ].map((metric, idx) => <div key={idx}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300 font-medium">{metric.label}</span>
                  <span className="text-white font-bold">{metric.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#B5FF45] rounded-full transition-all duration-1000" style={{ width: `${metric.value}%` }} />
                </div>
              </div>)}
          </div>
        </div>
      </motion.div>

      {
    /* Resources */
  }
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 border-t border-border-custom">
        <h2 className="text-xl font-bold text-white mb-6">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {resourcesData.map((res, idx) => {
    const Icon = resourceIconMap[res.iconName] || BookOpen;
    return <div key={idx} className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white/5 rounded-lg group-hover:text-[#B5FF45] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-[#B5FF45] transition-colors">{res.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{res.type} • {res.time} read</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#B5FF45] transition-colors shrink-0" />
              </div>;
  })}
        </div>
      </motion.div>

      {
    /* Continue Preparation */
  }
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 border-t border-border-custom">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          Continue Preparation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:border-white/20 transition-colors cursor-pointer group" onClick={() => handleCategoryClick("hr-interview")}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#B5FF45]/10 group-hover:text-[#B5FF45] transition-colors text-gray-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white group-hover:text-[#B5FF45] transition-colors">HR Interview Preparation</h3>
                <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                  <span>Last accessed: Today</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[#B5FF45]">45% Complete</span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] rounded-lg text-sm font-semibold transition-colors">
              Resume
            </button>
          </div>
        </div>
      </motion.div>

      {
    /* Quick Actions */
  }
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 border-t border-border-custom pb-4">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
    { label: "Start Mock Interview", icon: Target },
    { label: "Practice HR Questions", icon: MessageSquare },
    { label: "Practice Technical Questions", icon: Terminal },
    { label: "AI Mentor", icon: Sparkles },
    { label: "Company Preparation", icon: Building2 },
    { label: "Placement Roadmap", icon: Map }
  ].map((action, idx) => <button key={idx} className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border border-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold text-gray-300 hover:text-white transition-all group">
              <action.icon className="w-4 h-4 text-gray-500 group-hover:text-[#B5FF45] transition-colors" />
              {action.label}
            </button>)}
        </div>
      </motion.div>

    </motion.div>;
}
