import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  BookOpen,
  Brain,
  Database,
  Network,
  Cpu,
  Terminal,
  Laptop,
  Shield,
  MessageSquare,
  Compass,
  Sparkles,
  Target,
  CheckCircle,
  Award,
  ArrowRight,
  HelpCircle,
  Loader2,
  Code,
  Monitor,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = 'http://localhost:5000/api';

const iconMap = {
  cn: Network,
  os: Cpu,
  dbms: Database,
  oop: Code,
  sql: Terminal,
  "computer-fundamentals": Monitor,
};

function getSubjectMeta(id) {
  const meta = {
    cn: { difficulty: "Intermediate", category: "Core Subjects", duration: "20 hours" },
    os: { difficulty: "Intermediate", category: "Core Subjects", duration: "15 hours" },
    dbms: { difficulty: "Intermediate", category: "Core Subjects", duration: "18 hours" },
    oop: { difficulty: "Beginner", category: "Core Subjects", duration: "10 hours" },
    sql: { difficulty: "Beginner", category: "Core Subjects", duration: "12 hours" },
    "computer-fundamentals": { difficulty: "Beginner", category: "Core Subjects", duration: "10 hours" },
  };
  return meta[id] || { difficulty: "Beginner", category: "Core Subjects", duration: "10 hours" };
}

function getStatus(progress) {
  if (progress === 0) return "Not Started";
  if (progress >= 100) return "Completed";
  return "In Progress";
}

export function SubjectsContent() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProgress, setSelectedProgress] = useState("All");
  const [subjectsData, setSubjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem('kramik_token');
        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_BASE_URL}/subjects`, { headers });
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map((s) => {
            const meta = getSubjectMeta(s.id);
            const IconComponent = iconMap[s.id] || BookOpen;
            return {
              id: s.id,
              name: s.name,
              description: s.description,
              icon: IconComponent,
              progress: s.progress ?? 0,
              completedTopics: s.completedTopics ?? 0,
              totalTopics: s.totalTopics ?? 0,
              duration: meta.duration,
              difficulty: meta.difficulty,
              category: meta.category,
              status: getStatus(s.progress ?? 0),
            };
          });
          setSubjectsData(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const stats = [
    { label: "Total Subjects", value: subjectsData.length, icon: BookOpen, highlight: false },
    { label: "Completed Subjects", value: subjectsData.filter((s) => s.status === "Completed").length, icon: Award, highlight: true },
    { label: "Overall Progress", value: `${subjectsData.length > 0 ? Math.round(subjectsData.reduce((sum, s) => sum + s.progress, 0) / subjectsData.length) : 0}%`, icon: Target, highlight: false },
    { label: "Questions in DB", value: subjectsData.reduce((sum, s) => sum + (s.totalTopics || 0), 0), icon: CheckCircle, highlight: false },
  ];

  const recommendations = [
    { title: "Revise Operating Systems", reason: "Focus on OS concepts like scheduling and memory management.", icon: Sparkles, subjectId: "os" },
    { title: "Practice SQL Joins", reason: "Strengthen your SQL queries with JOINs and subqueries.", icon: Sparkles, subjectId: "sql" },
    { title: "Learn OOP Fundamentals", reason: "Master encapsulation, inheritance, and polymorphism.", icon: Sparkles, subjectId: "oop" },
  ];

  const categories = ["All", "Core Subjects", "Aptitude", "Interview Preparation"];

  const filteredSubjects = subjectsData.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || subject.category === activeCategory;
    const matchesProgress = selectedProgress === "All" || subject.status === selectedProgress;
    return matchesSearch && matchesCategory && matchesProgress;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#B5FF45] animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      className="p-6 lg:p-8 space-y-10 max-w-[1600px] mx-auto text-white"
    >
      {/* Header Section */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold tracking-tight text-white mb-2">
            Subjects
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl">
            Choose a subject and continue your placement preparation.
          </p>
        </div>
      </motion.div>

      {/* Summary Stats Rows */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={idx}
              className={`relative overflow-hidden bg-bg-secondary border ${
                stat.highlight ? "border-accent-custom/30 dark:border-[#B5FF45]/30" : "border-border-custom"
              } rounded-2xl p-5 hover:border-border-hover transition-all duration-300 group`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#B5FF45]/[0.01] rounded-full blur-[30px]" />
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-text-secondary">{stat.label}</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-bold tracking-tight text-text-primary">{stat.value}</span>
                  </div>
                </div>
                <div
                  className={`p-2 rounded-xl ${
                    stat.highlight
                      ? "bg-accent-custom/10 text-accent-custom dark:bg-[#B5FF45]/10 dark:text-[#B5FF45]"
                      : "bg-item-hover text-text-secondary"
                  } group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Filter and Search Bar Section */}
      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        className="space-y-4 bg-[#0A0E17]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative flex-1 group max-w-md">
            <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#B5FF45] transition-colors" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 transition-all duration-300"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedProgress}
              onChange={(e) => setSelectedProgress(e.target.value)}
              className="h-11 px-4 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-gray-300 font-medium focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 transition-all cursor-pointer"
            >
              <option value="All" className="bg-[#05080D]">All Progress</option>
              <option value="Not Started" className="bg-[#05080D]">Not Started</option>
              <option value="In Progress" className="bg-[#05080D]">In Progress</option>
              <option value="Completed" className="bg-[#05080D]">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 custom-scrollbar scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-medium border whitespace-nowrap transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#B5FF45] text-[#05080D] border-[#B5FF45] font-semibold"
                  : "bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Subjects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Curriculum</h3>
          <span className="text-xs text-gray-400 font-medium">{filteredSubjects.length} subjects found</span>
        </div>

        {filteredSubjects.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSubjects.map((sub) => {
                const IconComponent = sub.icon;
                const statusColors = {
                  "Not Started": "bg-gray-500/10 text-gray-400 border-gray-500/20",
                  "In Progress": "bg-blue-400/10 text-blue-400 border-blue-400/20",
                  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20",
                };
                const difficultyColors = {
                  Beginner: "text-emerald-400",
                  Intermediate: "text-orange-400",
                  Advanced: "text-red-400",
                };
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    key={sub.id}
                    onClick={() => navigate(`/subjects/${sub.id}`)}
                    className="group relative bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-5 lg:p-6 hover:border-[#B5FF45]/30 hover:shadow-[0_10px_40px_-10px_rgba(181,255,69,0.1)] cursor-pointer flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:scale-110 group-hover:text-white group-hover:border-white/20 transition-all">
                          <IconComponent className="w-6 h-6 text-[#B5FF45]" />
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${statusColors[sub.status]}`}>
                            {sub.status}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-base font-semibold text-white group-hover:text-[#B5FF45] transition-colors mb-2">{sub.name}</h4>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-6">{sub.description}</p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-gray-400">{sub.completedTopics} / {sub.totalTopics} Topics</span>
                          <span className="text-white font-bold">{sub.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${sub.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-[#B5FF45] rounded-full"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-gray-500">
                        <span>Est: {sub.duration}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className={difficultyColors[sub.difficulty]}>{sub.difficulty}</span>
                      </div>

                      <button
                        onClick={() => navigate(`/subjects/${sub.id}`)}
                        className="w-full py-2.5 bg-white/[0.02] border border-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] hover:border-[#B5FF45] text-white text-xs font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 group-hover:shadow-[0_0_20px_rgba(181,255,69,0.15)]"
                      >
                        Continue Preparing <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-[#0A0E17]/60 border border-white/5 rounded-3xl">
            <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-white mb-1">No Subjects Found</h4>
            <p className="text-xs text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* AI Recommendations */}
      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        className="space-y-6 pt-4 border-t border-border-custom"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-custom dark:text-[#B5FF45]" />
            AI Recommended Next Subjects
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-bg-secondary to-bg-secondary/40 border border-border-custom rounded-2xl p-5 hover:border-[#B5FF45]/30 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-accent-custom/10 flex items-center justify-center">
                    <rec.icon className="w-3.5 h-3.5 text-accent-custom dark:text-[#B5FF45]" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-accent-custom dark:text-[#B5FF45]">Suggestion</span>
                </div>
                <h4 className="text-sm font-semibold text-text-primary group-hover:text-[#B5FF45] transition-colors mb-2">{rec.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed mb-6">{rec.reason}</p>
              </div>

              <button
                onClick={() => navigate(`/subjects/${rec.subjectId}`)}
                className="w-full py-2 bg-item-hover hover:bg-[#B5FF45] text-text-primary hover:text-[#05080D] hover:scale-[1.02] rounded-xl text-xs font-bold transition-all border border-border-custom hover:border-transparent"
              >
                Start Preparing
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
