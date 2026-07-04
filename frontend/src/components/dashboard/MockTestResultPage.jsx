import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Award,
  Target,
  ChevronRight,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  Brain,
  BookOpen,
  Network,
  Zap,
  HelpCircle,
  ArrowRight,
  Gauge,
  TrendingUp,
  Compass
} from "lucide-react";
export function MockTestResultPage() {
  const navigate = useNavigate();
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState("All");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("All");
  const [reviewingQuestion, setReviewingQuestion] = useState(null);
  const testDetails = {
    name: "TCS NQT Advanced Mock Test 04",
    company: "Tata Consultancy Services (NQT Pattern)",
    duration: "120 minutes",
    submittedAt: "July 1, 2026 at 08:34 AM",
    totalTimeTaken: "1 hour 45 minutes",
    totalQuestions: 80,
    correctCount: 65,
    incorrectCount: 9,
    skippedCount: 6
  };
  const statCards = [
    { label: "Overall Score", value: "81%", subtext: "65 / 80 Marks", icon: Award, highlight: true },
    { label: "All-India Rank", value: "42", subtext: "Out of 1,500 candidates", icon: TrendingUp, highlight: false },
    { label: "Questions Attempted", value: "74/80", subtext: "6 skipped questions", icon: HelpCircle, highlight: false },
    { label: "Accuracy Rate", value: "87.8%", subtext: "Target: >85% for Tier-1", icon: Target, highlight: false },
    { label: "Time Taken", value: "1h 45m", subtext: "15m remaining", icon: Clock, highlight: false }
  ];
  const subjectPerformance = [
    { subject: "Aptitude & Reasoning", code: "aptitude", score: "18/20", percent: 90, accuracy: "95%", strength: true },
    { subject: "Operating Systems", code: "os", score: "8/10", percent: 80, accuracy: "80%", strength: true },
    { subject: "Database Management Systems", code: "dbms", score: "9/10", percent: 90, accuracy: "90%", strength: true },
    { subject: "SQL Querying", code: "sql", score: "5/5", percent: 100, accuracy: "100%", strength: true },
    { subject: "Computer Networks", code: "cn", score: "3/5", percent: 60, accuracy: "60%", strength: false },
    { subject: "Object-Oriented Programming", code: "oop", score: "0/5", percent: 0, accuracy: "0%", strength: false }
  ];
  const strengthsList = [
    { title: "Quantitative Aptitude", desc: "Exceptional speed and accuracy in Profit & Loss and Probability.", icon: CheckCircle2 },
    { title: "DBMS Joins & Normalization", desc: "No errors in 3NF decomposition or multi-table Joins.", icon: CheckCircle2 }
  ];
  const weaknessesList = [
    { topic: "Computer Networks Routing Protocols", desc: "Confused BGP with OSPF in two questions.", subjectId: "cn" },
    { topic: "OOP Inheritance & Polymorphism", desc: "Skipped multiple questions on virtual functions in C++.", subjectId: "oop" },
    { topic: "Aptitude Speed - Time & Work", desc: "Took an average of 2.5 minutes per question in this topic.", subjectId: "aptitude" }
  ];
  const aiInsights = [
    "Your Aptitude accuracy is excellent. Master Class results indicate readiness to focus on Core Subjects next.",
    "You lost most marks in Computer Networks and OOP due to basic theoretical misconceptions. Revise Routing Protocols & Polymorphism.",
    "Your speed in Quantitative Aptitude is amazing, but you spent excessive time (2.5m/q) on complex Time & Work scenarios.",
    "Your overall solving speed is 18% faster than the platform average, giving you a strong time advantage."
  ];
  const timeSpentBySubject = [
    { subject: "Aptitude", time: "42 mins", percent: 40, color: "bg-[#B5FF45]" },
    { subject: "OS & DBMS", time: "30 mins", percent: 30, color: "bg-blue-400" },
    { subject: "Networks & OOP", time: "30 mins", percent: 30, color: "bg-purple-400" }
  ];
  const questionAttempts = [
    {
      id: 1,
      number: 1,
      title: "Aptitude: Time and Work Calculation",
      difficulty: "Medium",
      subject: "Aptitude & Reasoning",
      status: "Correct",
      timeSpent: "2m 14s",
      correctAnswer: "Option B: 12 days",
      userAnswer: "Option B: 12 days",
      explanation: "Using the LCM method for total work makes it easy to find the combined efficiency and solve for the total days."
    },
    {
      id: 2,
      number: 2,
      title: "Database Normalization Definition (3NF)",
      difficulty: "Easy",
      subject: "Database Management Systems",
      status: "Correct",
      timeSpent: "45s",
      correctAnswer: "Option A: No transitive dependencies",
      userAnswer: "Option A: No transitive dependencies",
      explanation: "A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on any key."
    },
    {
      id: 3,
      number: 3,
      title: "Virtual Methods in Polymorphism",
      difficulty: "Medium",
      subject: "Object-Oriented Programming",
      status: "Skipped",
      timeSpent: "1m 10s",
      correctAnswer: "Option C: To prevent memory leaks",
      userAnswer: "Not Answered",
      explanation: "Declaring a destructor virtual in a base class ensures that when a derived class object is deleted through a pointer to the base class, the derived class destructor is called correctly."
    },
    {
      id: 4,
      number: 4,
      title: "OS Scheduling Policies - Shortest Remaining Time First",
      difficulty: "Hard",
      subject: "Operating Systems",
      status: "Correct",
      timeSpent: "3m 40s",
      correctAnswer: "Option D: Preemptive Shortest Job First",
      userAnswer: "Option D: Preemptive Shortest Job First",
      explanation: "SRTF is the preemptive version of SJF, scheduling the process with the shortest remaining execution time."
    },
    {
      id: 5,
      number: 5,
      title: "TCP Layer vs OSI Reference Model Layering",
      difficulty: "Medium",
      subject: "Computer Networks",
      status: "Incorrect",
      timeSpent: "1m 50s",
      correctAnswer: "Option B: Transport Layer manages congestion",
      userAnswer: "Option D: Session Layer manage encryption",
      explanation: "In TCP/IP, security, encryption, and session state are generally handled at the Application layer or TLS layer, not a dedicated Session layer as defined in OSI."
    },
    {
      id: 6,
      number: 6,
      title: "Profit and Loss: Multi-Tier Markup Calculation",
      difficulty: "Medium",
      subject: "Aptitude & Reasoning",
      status: "Correct",
      timeSpent: "1m 15s",
      correctAnswer: "Option A: 24.5% profit",
      userAnswer: "Option A: 24.5% profit",
      explanation: "Applying sequential markups yields a total markup of (1.15 * 1.08) - 1 = 24.2% or 24.5% depending on specific tax computations."
    },
    {
      id: 7,
      number: 7,
      title: "Time and Work: Circular Tracking Speed",
      difficulty: "Hard",
      subject: "Aptitude & Reasoning",
      status: "Incorrect",
      timeSpent: "3m 05s",
      correctAnswer: "Option C: 48 seconds",
      userAnswer: "Option A: 36 seconds",
      explanation: "The two runners meet when the distance separation equals the track circumference. Solving d/v_rel yields exactly 48 seconds."
    }
  ];
  const nextSteps = [
    { title: "Revise OOP & Virtual Functions", desc: "Review basic Object Oriented rules in C++ and Java.", time: "1.5 hours", icon: BookOpen, actionSubject: "oop" },
    { title: "Practice Networks IP Addressing", desc: "Learn routing table lookups and subnet masking.", time: "2 hours", icon: Network, actionSubject: "cn" },
    { title: "Speed Drills - Aptitude", desc: "Take a 15-minute quick sprint on Work & Time problems.", time: "45 mins", icon: Brain, actionSubject: "aptitude" }
  ];
  const achievements = [
    { title: "Accuracy MVP", desc: "Achieved over 85% total correctness", icon: Target, color: "from-lime-500/10 to-emerald-500/10 text-[#B5FF45]" },
    { title: "Speed Demon", desc: "Completed 15 minutes ahead of the clock", icon: Zap, color: "from-amber-500/10 to-orange-500/10 text-orange-400" },
    { title: "Aptitude Ace", desc: "Scored 90% on high-weightage Aptitude section", icon: Brain, color: "from-blue-500/10 to-indigo-500/10 text-blue-400" },
    { title: "Streak Builder", desc: "Maintained consistent placement activity", icon: Award, color: "from-purple-500/10 to-pink-500/10 text-purple-400" }
  ];
  const filteredQuestions = questionAttempts.filter((q) => {
    const statusMatch = selectedStatusFilter === "All" || q.status === selectedStatusFilter;
    const difficultyMatch = selectedDifficultyFilter === "All" || q.difficulty === selectedDifficultyFilter;
    const subjectMatch = selectedSubjectFilter === "All" || q.subject === selectedSubjectFilter;
    return statusMatch && difficultyMatch && subjectMatch;
  });
  return <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4 }}
    className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto text-white pb-24"
  >
      {
    /* Success Header Card */
  }
      <motion.div
    initial={{ scale: 0.98, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="relative bg-[#0A0E17]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl"
  >
        <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-[#B5FF45]/[0.03] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B5FF45] bg-[#B5FF45]/10 px-2.5 py-1 rounded-full border border-[#B5FF45]/20">
                Mock Completed 🎉
              </span>
              <span className="text-xs text-gray-400 font-medium bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                Submitted on {testDetails.submittedAt}
              </span>
            </div>
            <h1 className="text-2xl md:text-3.5xl font-bold font-heading text-white tracking-tight leading-tight">
              {testDetails.name}
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              Great job! Here is your detailed performance analysis. Keep practicing to boost your placement percentile.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-gray-500 font-medium">
              <span>Company Target: <span className="text-gray-300 font-semibold">{testDetails.company}</span></span>
              <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>Full Duration: <span className="text-gray-300 font-semibold">{testDetails.duration}</span></span>
              <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>Time Taken: <span className="text-gray-300 font-semibold text-[#B5FF45]">{testDetails.totalTimeTaken}</span></span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 pt-4 lg:pt-0">
            <button
    onClick={() => window.location.reload()}
    className="flex-1 lg:flex-none h-11 px-5 bg-[#B5FF45]/10 hover:bg-[#B5FF45]/20 text-[#B5FF45] border border-[#B5FF45]/30 hover:border-[#B5FF45]/50 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
  >
              <RefreshCw className="w-3.5 h-3.5" /> Retake Test
            </button>
            <button
    onClick={() => navigate("/dashboard")}
    className="flex-1 lg:flex-none h-11 px-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
  >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </button>
          </div>
        </div>
      </motion.div>

      {
    /* 5 Statistics Row */
  }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, idx) => {
    const Icon = stat.icon;
    return <motion.div
      key={idx}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className={`relative overflow-hidden bg-[#0A0E17]/80 backdrop-blur-xl border ${stat.highlight ? "border-[#B5FF45]/30" : "border-white/5"} rounded-2xl p-5 hover:border-white/10 transition-all duration-300 group`}
    >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#B5FF45]/[0.01] rounded-full blur-[30px]" />
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{stat.label}</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-extrabold tracking-tight ${stat.highlight ? "text-[#B5FF45]" : "text-white"}`}>
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 block font-medium">{stat.subtext}</span>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.highlight ? "bg-[#B5FF45]/10 text-[#B5FF45]" : "bg-white/5 text-gray-400"} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            </motion.div>;
  })}
      </div>

      {
    /* Main Grid: Left Wide Column & Right Sidebar Column */
  }
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {
    /* Left Column (Wider): Performance Breakdown & Question Analysis */
  }
        <div className="xl:col-span-2 space-y-8">
          
          {
    /* Performance Breakdown by Subject */
  }
          <section className="bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Subject-wise Performance</h3>
                <p className="text-xs text-gray-400">Click any subject to start a quick learning and revision module.</p>
              </div>
              <span className="text-[11px] bg-[#B5FF45]/10 border border-[#B5FF45]/20 text-[#B5FF45] px-2.5 py-1 rounded-lg font-semibold uppercase tracking-wide">
                Target: 80% Threshold
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectPerformance.map((sub, idx) => <div
    key={idx}
    onClick={() => navigate(`/subjects/${sub.code}`)}
    className="bg-white/[0.02] border border-white/5 hover:border-[#B5FF45]/30 hover:bg-white/[0.04] p-4 rounded-2xl cursor-pointer transition-all group flex flex-col justify-between"
  >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#B5FF45] transition-colors">
                        {sub.subject}
                      </h4>
                      <span className="text-[10px] text-gray-400 font-medium">Marks: {sub.score} • Accuracy: {sub.accuracy}</span>
                    </div>
                    <span className={`text-xs font-bold ${sub.strength ? "text-[#B5FF45]" : "text-rose-400"}`}>
                      {sub.percent}%
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
    initial={{ width: 0 }}
    animate={{ width: `${sub.percent}%` }}
    transition={{ duration: 1, ease: "easeOut", delay: idx * 0.05 }}
    className={`h-full rounded-full ${sub.strength ? "bg-gradient-to-r from-[#80E600] to-[#B5FF45]" : "bg-gradient-to-r from-rose-500 to-orange-400"}`}
  />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-medium">
                      <span>{sub.strength ? "Strong area" : "Needs revision"}</span>
                      <span className="group-hover:text-white transition-colors flex items-center gap-1">Revise <ChevronRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                </div>)}
            </div>
          </section>

          {
    /* Question Analysis */
  }
          <section className="bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-white/5 pb-5">
              <div>
                <h3 className="text-lg font-semibold text-white">Question Analysis & Solutions</h3>
                <p className="text-xs text-gray-400">Review correct answers, explanations, and time matrices.</p>
              </div>

              {
    /* Filtering Controls */
  }
              <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                <select
    value={selectedStatusFilter}
    onChange={(e) => setSelectedStatusFilter(e.target.value)}
    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 font-medium focus:outline-none cursor-pointer"
  >
                  <option value="All" className="bg-[#05080D]">All Statuses</option>
                  <option value="Correct" className="bg-[#05080D]">Correct</option>
                  <option value="Incorrect" className="bg-[#05080D]">Incorrect</option>
                  <option value="Skipped" className="bg-[#05080D]">Skipped</option>
                </select>

                <select
    value={selectedDifficultyFilter}
    onChange={(e) => setSelectedDifficultyFilter(e.target.value)}
    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 font-medium focus:outline-none cursor-pointer"
  >
                  <option value="All" className="bg-[#05080D]">All Difficulties</option>
                  <option value="Easy" className="bg-[#05080D]">Easy</option>
                  <option value="Medium" className="bg-[#05080D]">Medium</option>
                  <option value="Hard" className="bg-[#05080D]">Hard</option>
                </select>

                <select
    value={selectedSubjectFilter}
    onChange={(e) => setSelectedSubjectFilter(e.target.value)}
    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 font-medium focus:outline-none cursor-pointer"
  >
                  <option value="All" className="bg-[#05080D]">All Subjects</option>
                  <option value="Object-Oriented Programming" className="bg-[#05080D]">OOP</option>
                  <option value="Database Management Systems" className="bg-[#05080D]">DBMS</option>
                  <option value="Operating Systems" className="bg-[#05080D]">Operating Systems</option>
                  <option value="Computer Networks" className="bg-[#05080D]">Networks</option>
                  <option value="Aptitude & Reasoning" className="bg-[#05080D]">Aptitude</option>
                </select>
              </div>
            </div>

            {
    /* Questions List */
  }
            <div className="space-y-3">
              {filteredQuestions.length > 0 ? filteredQuestions.map((q) => {
    const statusColors = {
      Correct: { bg: "bg-[#B5FF45]/10 text-[#B5FF45] border-[#B5FF45]/20", icon: CheckCircle2 },
      Incorrect: { bg: "bg-rose-500/10 text-rose-400 border-rose-500/20", icon: XCircle },
      Skipped: { bg: "bg-white/5 text-gray-400 border-white/5", icon: AlertCircle }
    };
    const StatusIcon = statusColors[q.status].icon;
    return <div
      key={q.id}
      className="p-4 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 rounded-2xl transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gray-500">Q{q.number}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${statusColors[q.status].bg} border`}>
                            {q.status}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${q.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400" : q.difficulty === "Medium" ? "bg-orange-500/10 text-orange-400" : "bg-red-500/10 text-red-400"}`}>
                            {q.difficulty}
                          </span>
                          <span className="text-[11px] text-gray-500 font-medium">• {q.subject}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#B5FF45] transition-colors">
                          {q.title}
                        </h4>
                        <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Time Spent: {q.timeSpent}</span>
                        </div>
                      </div>

                      <div className="w-full md:w-auto shrink-0">
                        <button
      onClick={() => setReviewingQuestion(q)}
      className="w-full md:w-auto px-4 py-2 bg-white/5 hover:bg-[#B5FF45] border border-white/10 hover:border-[#B5FF45] text-white hover:text-[#05080D] rounded-xl text-xs font-semibold transition-all"
    >
                          Review Solution
                        </button>
                      </div>
                    </div>;
  }) : <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl">
                  <AlertCircle className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                  <h4 className="text-sm font-semibold text-white">No questions found</h4>
                  <p className="text-xs text-gray-500">Try loosening your filter metrics.</p>
                </div>}
            </div>
          </section>

        </div>

        {
    /* Right Column (Sidebar): AI Insights, Strengths/Weaknesses, Recommended Next Steps */
  }
        <div className="space-y-6">
          
          {
    /* AI Insights & Recommendations */
  }
          <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border-custom rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B5FF45]/10 rounded-full blur-[40px]" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-accent-custom/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent-custom dark:text-[#B5FF45]" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary">AI Performance Insights</h3>
            </div>
            
            <div className="space-y-4 relative z-10">
              {aiInsights.map((insight, idx) => <div key={idx} className="flex gap-3 text-xs leading-relaxed text-text-secondary">
                  <span className="text-accent-custom dark:text-[#B5FF45] font-semibold mt-0.5">•</span>
                  <p>{insight}</p>
                </div>)}
            </div>
          </div>

          {
    /* Strengths & Weaknesses Cards */
  }
          <div className="space-y-4">
            {
    /* Strengths */
  }
            <div className="bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-[#B5FF45] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Strongest Areas
              </h3>
              <div className="space-y-3">
                {strengthsList.map((strength, idx) => <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <h4 className="text-xs font-semibold text-white">{strength.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{strength.desc}</p>
                  </div>)}
              </div>
            </div>

            {
    /* Weaknesses */
  }
            <div className="bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Topics for Revision
              </h3>
              <div className="space-y-3">
                {weaknessesList.map((weakness, idx) => <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-white">{weakness.topic}</h4>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{weakness.desc}</p>
                    </div>
                    <button
    onClick={() => navigate(`/subjects/${weakness.subjectId}`)}
    className="w-full py-1.5 bg-white/5 hover:bg-[#B5FF45] text-white hover:text-[#05080D] rounded-lg text-[10px] font-bold transition-all"
  >
                      Start Revision
                    </button>
                  </div>)}
              </div>
            </div>
          </div>

          {
    /* Time Analysis Segment */
  }
          <div className="bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white">Time Allocation</h3>
            <div className="space-y-4">
              <div className="h-3 w-full bg-white/5 rounded-full flex overflow-hidden">
                {timeSpentBySubject.map((seg, idx) => <div
    key={idx}
    className={`${seg.color} h-full`}
    style={{ width: `${seg.percent}%` }}
    title={`${seg.subject}: ${seg.time}`}
  />)}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {timeSpentBySubject.map((seg, idx) => <div key={idx} className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${seg.color}`} />
                    <span className="text-[11px] text-gray-400">{seg.subject}: <strong className="text-white">{seg.time}</strong></span>
                  </div>)}
              </div>
              <div className="pt-4 border-t border-white/5 space-y-2.5 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Avg Time/Question:</span>
                  <strong className="text-white">1m 18s</strong>
                </div>
                <div className="flex justify-between">
                  <span>Fastest Correct Solution:</span>
                  <strong className="text-[#B5FF45]">32 seconds</strong>
                </div>
                <div className="flex justify-between">
                  <span>Slowest Correct Solution:</span>
                  <strong className="text-white">3m 40s</strong>
                </div>
              </div>
            </div>
          </div>

          {
    /* Recommended Next Steps */
  }
          <div className="bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#B5FF45]" /> Recommended Next Steps
            </h3>
            <div className="space-y-3">
              {nextSteps.map((step, idx) => <div
    key={idx}
    className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-colors flex flex-col justify-between gap-3 group cursor-pointer"
    onClick={() => navigate(`/subjects/${step.actionSubject}`)}
  >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      <step.icon className="w-3.5 h-3.5 text-[#B5FF45]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white group-hover:text-[#B5FF45] transition-all">{step.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-1">{step.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-gray-500 font-medium">Estimated: {step.time}</span>
                    <span className="text-[10px] font-bold text-[#B5FF45] flex items-center gap-0.5">Start <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>)}
            </div>
          </div>

          {
    /* Achievement Badges */
  }
          <div className="bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B5FF45]" /> Achievements Unlocked
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((ach, idx) => {
    const Icon = ach.icon;
    return <div
      key={idx}
      className={`p-3 bg-gradient-to-br ${ach.color} border border-white/5 rounded-xl flex flex-col items-center text-center gap-2 hover:scale-[1.03] transition-all`}
    >
                    <Icon className="w-5 h-5 shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-bold text-white line-clamp-1">{ach.title}</h4>
                      <p className="text-[8px] text-gray-400 leading-tight mt-0.5">{ach.desc}</p>
                    </div>
                  </div>;
  })}
            </div>
          </div>

          {
    /* Performance Comparison Indicator */
  }
          <div className="bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white">Score Comparison</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-gray-400">Previous Test:</span>
                <strong className="text-gray-300">74%</strong>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-gray-400">Current Test:</span>
                <strong className="text-[#B5FF45] font-bold">81%</strong>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-gray-400">Best Test Score:</span>
                <strong className="text-white">85%</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Percentile Growth:</span>
                <strong className="text-[#B5FF45] font-bold flex items-center gap-1">
                  +7% Increase <TrendingUp className="w-3.5 h-3.5" />
                </strong>
              </div>
            </div>
          </div>

        </div>
      </div>

      {
    /* Quick Actions Buttons Row */
  }
      <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
  >
        <button
    onClick={() => setSelectedStatusFilter("All")}
    className="p-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
  >
          <BookOpen className="w-4 h-4 text-[#B5FF45]" /> Review Solutions
        </button>
        <button
    onClick={() => window.location.reload()}
    className="p-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
  >
          <RefreshCw className="w-4 h-4 text-[#B5FF45]" /> Retake Mock Test
        </button>
        <button
    onClick={() => navigate("/subjects")}
    className="p-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
  >
          <BookOpen className="w-4 h-4 text-[#B5FF45]" /> Continue Preparing
        </button>
        <button
    onClick={() => navigate("/dashboard")}
    className="p-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
  >
          <Gauge className="w-4 h-4 text-[#B5FF45]" /> View Dashboard
        </button>
        <button
    onClick={() => navigate("/dashboard")}
    className="p-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
  >
          <Sparkles className="w-4 h-4 text-[#B5FF45]" /> Ask AI Mentor
        </button>
        <button
    onClick={() => navigate("/dashboard")}
    className="p-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
  >
          <ArrowLeft className="w-4 h-4 text-[#B5FF45]" /> Return
        </button>
      </motion.div>

      {
    /* Review Modal */
  }
      <AnimatePresence>
        {reviewingQuestion && <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
  >
            <motion.div
    initial={{ scale: 0.95, y: 20 }}
    animate={{ scale: 1, y: 0 }}
    exit={{ scale: 0.95, y: 20 }}
    className="bg-[#0A0E17] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl text-white"
  >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B5FF45]">Question {reviewingQuestion.number} Detail</span>
                  <h4 className="text-base font-bold mt-1 text-white">{reviewingQuestion.subject}</h4>
                </div>
                <button
    onClick={() => setReviewingQuestion(null)}
    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
  >
                  &times;
                </button>
              </div>

              <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  <span className="text-xs text-gray-400 font-semibold">Problem Statement:</span>
                  <p className="text-sm font-semibold text-white leading-relaxed">{reviewingQuestion.title}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Your Answer:</span>
                    <p className={`text-sm font-semibold ${reviewingQuestion.status === "Correct" ? "text-[#B5FF45]" : reviewingQuestion.status === "Skipped" ? "text-gray-400" : "text-rose-400"}`}>
                      {reviewingQuestion.userAnswer}
                    </p>
                  </div>
                  <div className="p-4 bg-white/[0.01] border border-[#B5FF45]/20 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-[#B5FF45] uppercase">Correct Answer:</span>
                    <p className="text-sm font-semibold text-[#B5FF45]">
                      {reviewingQuestion.correctAnswer}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#B5FF45]/5 border border-[#B5FF45]/10 rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#B5FF45] font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> AI Mentor Explanation:
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {reviewingQuestion.explanation}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-white/[0.01] flex justify-end gap-3">
                <button
    onClick={() => setReviewingQuestion(null)}
    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all"
  >
                  Close Review
                </button>
                <button
    onClick={() => {
      setReviewingQuestion(null);
      navigate("/dashboard");
    }}
    className="px-5 py-2.5 bg-[#B5FF45] hover:bg-[#80E600] text-[#05080D] text-xs font-bold rounded-xl transition-all"
  >
                  Ask AI Mentor More
                </button>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
}
