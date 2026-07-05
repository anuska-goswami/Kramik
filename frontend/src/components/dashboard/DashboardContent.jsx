import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Target,
  BookOpen,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Brain,
  FileText,
  Briefcase,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ListTodo,
  Play,
  Activity,
  FileEdit,
  TrendingUp,
  Building,
  Check,
  Calendar,
  X,
  AlertCircle
} from "lucide-react";

export function DashboardContent() {
  const navigate = useNavigate();

  // Carousel scrolling controls
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      updateScrollButtons();

      const handleWheel = (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      };

      el.addEventListener("wheel", handleWheel, { passive: false });
      el.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);

      return () => {
        el.removeEventListener("wheel", handleWheel);
        el.removeEventListener("scroll", updateScrollButtons);
        window.removeEventListener("resize", updateScrollButtons);
      };
    }
  }, []);

  // Animations configuration
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

  // State for Today's Goals
  const [goals, setGoals] = useState([
    { id: 1, text: "Complete Percentage chapter in Aptitude", completed: true, duration: "45 mins" },
    { id: 2, text: "Revise DBMS (Indexing & Transactions)", completed: false, duration: "30 mins" },
    { id: 3, text: "Attempt one Mock Test (TCS Prep)", completed: false, duration: "90 mins" }
  ]);

  // Toggle dynamic goals
  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const completedGoalsCount = goals.filter(g => g.completed).length;
  const goalProgressPercent = Math.round((completedGoalsCount / goals.length) * 100);

  // State for upcoming mock test scheduling
  const [upcomingTest, setUpcomingTest] = useState({
    name: "TCS National Qualifier Test (NQT) Mock",
    date: "July 10, 2026 at 10:00 AM",
    duration: "90 Mins",
    category: "Full Length Mock"
  });

  // State for current preparing company selector
  const companiesList = [
    { name: "TCS", progress: 75, status: "High Chance", logoColor: "text-blue-400" },
    { name: "Infosys", progress: 60, status: "Ready", logoColor: "text-emerald-400" },
    { name: "Accenture", progress: 45, status: "Keep Going", logoColor: "text-purple-400" },
    { name: "Wipro", progress: 30, status: "Needs Practice", logoColor: "text-orange-400" },
    { name: "Cognizant", progress: 20, status: "Needs Practice", logoColor: "text-pink-400" }
  ];
  const [activeCompanyIndex, setActiveCompanyIndex] = useState(0);
  const currentCompany = companiesList[activeCompanyIndex];

  // Subject progress data array
  const subjectsData = [
    { name: "Aptitude", icon: Brain, completed: "12/15", total: 15, percentage: 80, tab: "aptitude" },
    { name: "Operating Systems", icon: BookOpen, completed: "8/12", total: 12, percentage: 66, tab: "subjects" },
    { name: "DBMS", icon: BookOpen, completed: "9/11", total: 11, percentage: 81, tab: "subjects" },
    { name: "Computer Networks", icon: BookOpen, completed: "5/10", total: 10, percentage: 50, tab: "subjects" },
    { name: "OOP", icon: BookOpen, completed: "6/8", total: 8, percentage: 75, tab: "subjects" },
    { name: "SQL", icon: BookOpen, completed: "4/6", total: 6, percentage: 66, tab: "subjects" },
    { name: "Software Engineering", icon: BookOpen, completed: "3/5", total: 5, percentage: 60, tab: "subjects" },
    { name: "Interview Preparation", icon: MessageSquare, completed: "18/30", total: 30, percentage: 60, tab: "interview-prep" },
    { name: "Company Preparation", icon: Briefcase, completed: "6/10", total: 10, percentage: 60, tab: "company-prep" }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-12 pb-24"
    >
      {/* 1. Welcome Section */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#1E293B]/45 border border-white/[0.08] p-6 md:p-8 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-md"
      >
        {/* Subtle radial lime-green glow behind the welcome text */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#B5FF45]/[0.07] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-mono text-[#B5FF45] bg-[#B5FF45]/10 px-3 py-1 rounded-full font-bold">
            PLATFORM ACTIVE
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mt-3 font-heading">
            Welcome back, Srijita 👋
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-light">
            Let's continue your placement preparation today.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] py-2.5 px-4.5 rounded-2xl shrink-0 self-start md:self-auto shadow-inner">
          <Calendar className="w-4 h-4 text-[#B5FF45]" />
          <span className="text-sm font-semibold text-gray-200 font-mono">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </span>
        </div>
      </motion.div>

      {/* 2. Summary Statistics Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Card 1: Overall Prep Progress */}
        <div className="bg-[#1E293B]/45 border border-white/[0.08] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative overflow-hidden group hover:border-[#B5FF45]/20 hover:shadow-[0_12px_35px_rgba(0,0,0,0.22)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#B5FF45]/[0.01] rounded-full blur-xl pointer-events-none group-hover:bg-[#B5FF45]/[0.03] transition-all" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">Overall Progress</span>
            <div className="p-2 rounded-xl bg-[#B5FF45]/10 text-[#B5FF45]">
              <Target className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-white tracking-tight">72%</span>
            <span className="text-xs text-[#B5FF45] flex items-center font-bold font-mono">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +5%
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#B5FF45] rounded-full shadow-[0_0_8px_rgba(181,255,69,0.2)]"
            />
          </div>
        </div>

        {/* Card 2: Subjects Completed */}
        <div className="bg-[#1E293B]/45 border border-white/[0.08] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative overflow-hidden group hover:border-[#B5FF45]/20 hover:shadow-[0_12px_35px_rgba(0,0,0,0.22)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/[0.01] rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">Subjects Completed</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-white tracking-tight">5/8</span>
            <span className="text-xs text-gray-400 font-mono">Completed</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "62.5%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-blue-500 rounded-full"
            />
          </div>
        </div>

        {/* Card 3: Mock Tests Attempted */}
        <div className="bg-[#1E293B]/45 border border-white/[0.08] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative overflow-hidden group hover:border-[#B5FF45]/20 hover:shadow-[0_12px_35px_rgba(0,0,0,0.22)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/[0.01] rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">Mock Tests</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <FileEdit className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-white tracking-tight">12</span>
            <span className="text-xs text-purple-400 font-semibold font-mono bg-purple-500/10 px-2 py-0.5 rounded-full">
              3 Pending Review
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-purple-500 rounded-full"
            />
          </div>
        </div>

        {/* Card 4: Overall Accuracy */}
        <div className="bg-[#1E293B]/45 border border-white/[0.08] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative overflow-hidden group hover:border-[#B5FF45]/20 hover:shadow-[0_12px_35px_rgba(0,0,0,0.22)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.01] rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider font-mono">Overall Accuracy</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-white tracking-tight">78%</span>
            <span className="text-xs text-emerald-400 font-bold font-mono flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +4%
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "78%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* 3. Continue Learning Featured Section */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-br from-[#1E293B]/80 via-[#1E293B]/50 to-[#0F172A]/70 border border-white/[0.08] rounded-3xl p-6 md:p-8 overflow-hidden group hover:border-[#B5FF45]/15 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.2)] backdrop-blur-md"
      >
        {/* Ambient background decoration */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#B5FF45]/[0.02] rounded-full blur-[60px] pointer-events-none group-hover:bg-[#B5FF45]/[0.04] transition-all duration-500" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-block py-1 px-3 bg-[#B5FF45]/10 text-[#B5FF45] text-[10px] font-bold font-mono tracking-widest rounded-full uppercase">
                Last Studied Subject
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" /> studied 2 hours ago
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-[#B5FF45] transition-colors duration-300 font-heading">
                Operating Systems
              </h2>
              <p className="text-gray-300 text-sm md:text-base font-light">
                Current Topic: <span className="font-semibold text-white">Process Scheduling Algorithms (Round Robin, SRTF)</span>
              </p>
            </div>

            <div className="space-y-2 max-w-lg">
              <div className="flex justify-between text-xs text-gray-400 font-mono">
                <span>Progress in this Chapter</span>
                <span className="font-bold text-white">65%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#B5FF45] to-[#80E600] rounded-full shadow-[0_0_8px_rgba(181,255,69,0.3)]"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/subjects")}
            className="flex items-center justify-center gap-2.5 px-6 py-4 bg-[#B5FF45] text-[#05080D] font-bold rounded-2xl hover:bg-[#80E600] transition-all duration-300 shadow-[0_4px_20px_rgba(181,255,69,0.15)] hover:shadow-[0_4px_25px_rgba(181,255,69,0.3)] shrink-0 self-start md:self-auto hover:translate-x-1 cursor-pointer"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </button>
        </div>
      </motion.div>

      {/* 4. Subject Progress Section */}
      <motion.div variants={itemVariants} className="space-y-5">
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight font-heading">Subject Progress</h2>
            <p className="text-xs text-gray-400 mt-1">Placement specific core subjects and preparation tracks</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/subjects")}
              className="text-xs font-semibold text-gray-400 hover:text-[#B5FF45] flex items-center gap-1 transition-colors mr-1 md:mr-3"
            >
              Explore All Subjects <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1 rounded-xl">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative group/carousel px-1">
          {/* Floating Left Arrow for Desktop */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="hidden md:flex absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-[#1E293B]/90 border border-white/10 text-white hover:text-[#B5FF45] hover:border-[#B5FF45]/40 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:scale-105 disabled:opacity-0 disabled:pointer-events-none cursor-pointer backdrop-blur-md"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Floating Right Arrow for Desktop */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="hidden md:flex absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-[#1E293B]/90 border border-white/10 text-white hover:text-[#B5FF45] hover:border-[#B5FF45]/40 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:scale-105 disabled:opacity-0 disabled:pointer-events-none cursor-pointer backdrop-blur-md"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            onScroll={updateScrollButtons}
            className="flex overflow-x-auto scroll-smooth gap-6 pb-4 no-scrollbar snap-x snap-mandatory touch-pan-x items-stretch"
          >
            {subjectsData.map((subject, index) => {
              const IconComponent = subject.icon;
              return (
                <div
                  key={index}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] shrink-0 snap-start bg-[#1E293B]/45 border border-white/[0.08] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-white/15 hover:bg-[#1E293B]/60 hover:shadow-[0_12px_35px_rgba(0,0,0,0.2)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div className="p-2.5 rounded-xl bg-white/5 text-gray-300 group-hover:text-[#B5FF45] group-hover:bg-[#B5FF45]/10 transition-all duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-gray-300 bg-white/[0.02] border border-white/[0.08] px-2.5 py-1 rounded-md">
                        {subject.completed} completed
                      </span>
                    </div>

                    <h3 className="font-semibold text-white group-hover:text-[#B5FF45] transition-colors duration-300 mb-1">
                      {subject.name}
                    </h3>
                    <div className="text-xs text-gray-400 mb-5">
                      {subject.total} Chapters total
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono text-gray-400">
                        <span>Overall Mastery</span>
                        <span className="font-bold text-white">{subject.percentage}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${subject.percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.04 }}
                          className="h-full bg-gradient-to-r from-[#B5FF45] to-[#80E600] rounded-full"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/${subject.tab}`)}
                      className="w-full py-2.5 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] text-white text-xs font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* 5. Two-Column Layout: Today's Goal & Upcoming Mock Test */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card 5A: Today's Goal */}
        <div className="bg-[#1E293B]/45 border border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-md relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#B5FF45]/10 text-[#B5FF45]">
                  <ListTodo className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white font-heading">Today's Goal</h3>
                  <p className="text-[11px] text-gray-400">Stay on track with daily objectives</p>
                </div>
              </div>
              <div className="text-xs font-mono font-bold text-[#B5FF45] bg-[#B5FF45]/10 px-3 py-1 rounded-full">
                {completedGoalsCount}/{goals.length} Completed
              </div>
            </div>

            {/* Checklists */}
            <div className="space-y-4 mb-6">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    goal.completed
                      ? "bg-white/[0.01] border-white/5 opacity-50"
                      : "bg-[#1E293B]/20 border-white/[0.08] hover:border-white/15"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                      goal.completed
                        ? "bg-[#B5FF45] border-[#B5FF45] text-[#05080D]"
                        : "border-gray-500 hover:border-[#B5FF45]"
                    }`}
                  >
                    {goal.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs md:text-sm font-medium ${goal.completed ? "text-gray-400 line-through" : "text-gray-100"}`}>
                      {goal.text}
                    </p>
                    <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-1.5 font-mono">
                      <Clock className="w-3 h-3 text-[#B5FF45]" /> {goal.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-5 border-t border-white/[0.08]">
            <div className="flex justify-between text-xs text-gray-400 font-mono">
              <span>Goal Completion Progress</span>
              <span className="font-semibold text-[#B5FF45]">{goalProgressPercent}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${goalProgressPercent}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full bg-[#B5FF45]"
              />
            </div>
          </div>
        </div>

        {/* Card 5B: Upcoming Mock Test */}
        <div className="bg-[#1E293B]/45 border border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-md relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white font-heading">Upcoming Mock Test</h3>
                  <p className="text-[11px] text-gray-400">Next scheduled evaluation</p>
                </div>
              </div>
              {upcomingTest && (
                <button
                  onClick={() => setUpcomingTest(null)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Remove test"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {upcomingTest ? (
              <div className="p-5 bg-gradient-to-br from-purple-500/[0.06] to-transparent border border-purple-500/20 rounded-2xl space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 tracking-wider uppercase bg-purple-500/15 px-2.5 py-1 rounded-md">
                      {upcomingTest.category}
                    </span>
                    <h4 className="text-base font-semibold text-white mt-3 group-hover:text-[#B5FF45] transition-colors">
                      {upcomingTest.name}
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 font-mono block uppercase">DATE & TIME</span>
                    <span className="text-xs text-gray-200 font-semibold">{upcomingTest.date}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 font-mono block uppercase">DURATION</span>
                    <span className="text-xs text-gray-200 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-400" /> {upcomingTest.duration}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-14 px-4 text-center border border-dashed border-white/10 rounded-2xl">
                <AlertCircle className="w-10 h-10 text-gray-500 mb-3" />
                <p className="text-sm font-medium text-gray-300">No upcoming mock tests scheduled.</p>
                <button
                  onClick={() =>
                    setUpcomingTest({
                      name: "TCS National Qualifier Test (NQT) Mock",
                      date: "July 10, 2026 at 10:00 AM",
                      duration: "90 Mins",
                      category: "Full Length Mock"
                    })
                  }
                  className="text-xs font-bold text-[#B5FF45] hover:underline mt-3 cursor-pointer"
                >
                  Schedule NQT Mock Test
                </button>
              </div>
            )}
          </div>

          {upcomingTest && (
            <button
              onClick={() => navigate("/mock-tests")}
              className="w-full mt-6 py-3.5 bg-purple-600 hover:bg-[#B5FF45] hover:text-[#05080D] text-white text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Test</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* 6. Another Two-Column Layout: Company Preparation & Interview Preparation */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Company Preparation Card */}
        <div className="bg-[#1E293B]/45 border border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-[0_12_40_rgba(0,0,0,0.15)] backdrop-blur-md relative overflow-hidden">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white font-heading">Company Preparation</h3>
                  <p className="text-[11px] text-gray-400">Tailored materials for top recruiters</p>
                </div>
              </div>
            </div>

            {/* Quick selector tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl overflow-x-auto scrollbar-none border border-white/5">
              {companiesList.map((comp, idx) => (
                <button
                  key={comp.name}
                  onClick={() => setActiveCompanyIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    idx === activeCompanyIndex
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  {comp.name}
                </button>
              ))}
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/[0.08] rounded-2xl space-y-4 shadow-inner">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 font-mono block uppercase">TARGET COMPANY</span>
                  <span className={`text-lg font-bold text-white flex items-center gap-1.5 ${currentCompany.logoColor}`}>
                    {currentCompany.name}
                  </span>
                </div>
                <span className="text-xs bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full font-mono font-semibold">
                  {currentCompany.status}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-400 font-mono">
                  <span>Preparation Completed</span>
                  <span className="font-bold text-white">{currentCompany.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    key={currentCompany.name}
                    initial={{ width: 0 }}
                    animate={{ width: `${currentCompany.progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/company-prep")}
            className="w-full mt-6 py-3 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] text-white text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Continue Preparation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Column 2: Interview Preparation Card */}
        <div className="bg-[#1E293B]/45 border border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-[0_12_40_rgba(0,0,0,0.15)] backdrop-blur-md relative overflow-hidden">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#B5FF45]/10 text-[#B5FF45]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white font-heading">Interview Preparation</h3>
                <p className="text-[11px] text-gray-400">Master behaviorals and mock sessions</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Stat Row 1 */}
              <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/[0.08] rounded-xl hover:bg-white/[0.03] transition-colors">
                <span className="text-xs text-gray-200 font-medium">HR Questions Completed</span>
                <span className="text-xs font-mono font-bold text-[#B5FF45] bg-[#B5FF45]/10 px-2.5 py-1 rounded-md">
                  12 / 20 Completed
                </span>
              </div>

              {/* Stat Row 2 */}
              <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/[0.08] rounded-xl hover:bg-white/[0.03] transition-colors">
                <span className="text-xs text-gray-200 font-medium">Technical Topics Mastered</span>
                <span className="text-xs font-mono font-bold text-[#B5FF45] bg-[#B5FF45]/10 px-2.5 py-1 rounded-md">
                  8 / 15 Topics
                </span>
              </div>

              {/* Stat Row 3 */}
              <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/[0.08] rounded-xl hover:bg-white/[0.03] transition-colors">
                <span className="text-xs text-gray-200 font-medium">Mock Interviews Attempted</span>
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md">
                  2 / 5 Sessions
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/interview-prep")}
            className="w-full mt-6 py-3 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] text-white text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Continue Interview Prep</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* 7. Recent Activity Section */}
      <motion.div
        variants={itemVariants}
        className="bg-[#1E293B]/45 border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-[0_12_40_rgba(0,0,0,0.15)] backdrop-blur-md"
      >
        <div className="flex items-center gap-2.5 mb-8">
          <div className="p-2.5 rounded-xl bg-[#B5FF45]/10 text-[#B5FF45]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg font-heading">Recent Activity</h3>
            <p className="text-xs text-gray-400">A chronological record of your placement prep actions</p>
          </div>
        </div>

        <div className="relative border-l border-white/10 pl-6 ml-3 space-y-8">
          {/* Activity 1 */}
          <div className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-[35px] top-1.5 p-1 rounded-full bg-[#111827] border border-[#B5FF45] text-[#B5FF45] group-hover:scale-110 transition-transform shadow-md">
              <FileEdit className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-4 mb-1">
                <h4 className="text-sm font-semibold text-white group-hover:text-[#B5FF45] transition-colors">
                  Completed Aptitude Mock Test
                </h4>
                <span className="text-[10px] font-mono text-gray-400 shrink-0">2 hours ago</span>
              </div>
              <p className="text-xs text-gray-300">Scored 85% on Percentage and Ratio tracks with top correctness rating.</p>
            </div>
          </div>

          {/* Activity 2 */}
          <div className="relative group">
            <div className="absolute -left-[35px] top-1.5 p-1 rounded-full bg-[#111827] border border-[#B5FF45] text-[#B5FF45] group-hover:scale-110 transition-transform shadow-md">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-4 mb-1">
                <h4 className="text-sm font-semibold text-white group-hover:text-[#B5FF45] transition-colors">
                  Finished Operating Systems - Process Scheduling
                </h4>
                <span className="text-[10px] font-mono text-gray-400 shrink-0">Yesterday</span>
              </div>
              <p className="text-xs text-gray-300">Mastered Preemptive Round Robin, Shortest Remaining Time First scheduling logic.</p>
            </div>
          </div>

          {/* Activity 3 */}
          <div className="relative group">
            <div className="absolute -left-[35px] top-1.5 p-1 rounded-full bg-[#111827] border border-blue-400 text-blue-400 group-hover:scale-110 transition-transform shadow-md">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-4 mb-1">
                <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Updated Resume
                </h4>
                <span className="text-[10px] font-mono text-gray-400 shrink-0">2 days ago</span>
              </div>
              <p className="text-xs text-gray-300">Enhanced experience, skills taxonomy and updated the ATS layout template.</p>
            </div>
          </div>

          {/* Activity 4 */}
          <div className="relative group">
            <div className="absolute -left-[35px] top-1.5 p-1 rounded-full bg-[#111827] border border-[#B5FF45] text-[#B5FF45] group-hover:scale-110 transition-transform shadow-md">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-4 mb-1">
                <h4 className="text-sm font-semibold text-white group-hover:text-[#B5FF45] transition-colors">
                  Completed Company Preparation for TCS
                </h4>
                <span className="text-[10px] font-mono text-gray-400 shrink-0">3 days ago</span>
              </div>
              <p className="text-xs text-gray-300">Went through previous years national recruiter question archives.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
