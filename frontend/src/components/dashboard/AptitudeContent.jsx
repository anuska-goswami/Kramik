import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Target,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  Clock,
  PlayCircle,
  Lock,
  Star,
  Calculator,
  PieChart,
  Zap,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Search,
  Filter,
  AlertCircle,
  Award,
  Check
} from "lucide-react";

export function AptitudeContent() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);

  // Scroll page to top when entering a category detail view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory]);

  // Overall statistics for the header
  const stats = [
    { label: "Overall Progress", value: "45%", icon: TrendingUp, color: "text-[#B5FF45]" },
    { label: "Questions Solved", value: "1,248", icon: Target, color: "text-blue-400" },
    { label: "Accuracy", value: "82%", icon: CheckCircle2, color: "text-green-400" }
  ];

  // Exactly six categories to form a perfectly balanced 3-col layout on desktop
  const categories = [
    {
      id: "quantitative",
      title: "Quantitative Aptitude",
      description: "Master numbers, arithmetic, and advanced mathematical concepts.",
      progress: 60,
      topicsCompleted: "12/18",
      timeEstimation: "45h",
      icon: Calculator,
      color: "text-blue-400",
      topics: [
        { name: "Number System", difficulty: "Medium", questions: 150, progress: 100, time: "3h", status: "Completed" },
        { name: "Percentage", difficulty: "Easy", questions: 120, progress: 100, time: "2h", status: "Completed" },
        { name: "Profit & Loss", difficulty: "Medium", questions: 180, progress: 40, time: "4h", status: "In Progress" },
        { name: "Simple & Compound Interest", difficulty: "Hard", questions: 140, progress: 0, time: "4h", status: "Not Started" },
        { name: "Ratio & Proportion", difficulty: "Easy", questions: 100, progress: 0, time: "2h", status: "Not Started" },
        { name: "Average", difficulty: "Easy", questions: 110, progress: 100, time: "2h", status: "Completed" },
        { name: "Time & Work", difficulty: "Medium", questions: 160, progress: 0, time: "3h", status: "Locked" },
        { name: "Time, Speed & Distance", difficulty: "Hard", questions: 170, progress: 0, time: "4h", status: "Locked" },
        { name: "Pipes & Cisterns", difficulty: "Medium", questions: 90, progress: 0, time: "2h", status: "Locked" },
        { name: "Permutation & Combination", difficulty: "Hard", questions: 120, progress: 0, time: "3h", status: "Locked" },
        { name: "Probability", difficulty: "Hard", questions: 130, progress: 0, time: "3h", status: "Locked" },
        { name: "Partnership", difficulty: "Easy", questions: 80, progress: 100, time: "1.5h", status: "Completed" },
        { name: "Mixture & Alligation", difficulty: "Medium", questions: 100, progress: 0, time: "2.5h", status: "Locked" },
        { name: "Boats & Streams", difficulty: "Medium", questions: 90, progress: 0, time: "2h", status: "Locked" },
        { name: "Ages", difficulty: "Easy", questions: 70, progress: 100, time: "1h", status: "Completed" },
        { name: "Simplification", difficulty: "Easy", questions: 200, progress: 100, time: "3h", status: "Completed" },
        { name: "HCF & LCM", difficulty: "Easy", questions: 100, progress: 100, time: "1.5h", status: "Completed" },
        { name: "Quadratic Equations", difficulty: "Medium", questions: 110, progress: 0, time: "2h", status: "Locked" }
      ]
    },
    {
      id: "logical",
      title: "Logical Reasoning",
      description: "Enhance your problem-solving and analytical thinking skills.",
      progress: 40,
      topicsCompleted: "6/14",
      timeEstimation: "30h",
      icon: Brain,
      color: "text-[#B5FF45]",
      topics: [
        { name: "Seating Arrangement", difficulty: "Hard", questions: 120, progress: 100, time: "4h", status: "Completed" },
        { name: "Blood Relations", difficulty: "Medium", questions: 90, progress: 50, time: "2h", status: "In Progress" },
        { name: "Coding-Decoding", difficulty: "Easy", questions: 150, progress: 100, time: "3h", status: "Completed" },
        { name: "Direction Sense", difficulty: "Easy", questions: 80, progress: 100, time: "2h", status: "Completed" },
        { name: "Syllogism", difficulty: "Hard", questions: 110, progress: 0, time: "3h", status: "Not Started" },
        { name: "Statement & Assumption", difficulty: "Medium", questions: 70, progress: 0, time: "2h", status: "Locked" },
        { name: "Statement & Conclusion", difficulty: "Medium", questions: 80, progress: 0, time: "2h", status: "Locked" },
        { name: "Cause & Effect", difficulty: "Easy", questions: 60, progress: 100, time: "1.5h", status: "Completed" },
        { name: "Series", difficulty: "Easy", questions: 140, progress: 100, time: "2h", status: "Completed" },
        { name: "Calendar", difficulty: "Hard", questions: 100, progress: 0, time: "3h", status: "Locked" },
        { name: "Clock", difficulty: "Hard", questions: 90, progress: 0, time: "3h", status: "Locked" },
        { name: "Ranking", difficulty: "Medium", questions: 80, progress: 0, time: "1.5h", status: "Locked" },
        { name: "Input Output", difficulty: "Hard", questions: 110, progress: 0, time: "4h", status: "Locked" },
        { name: "Puzzles", difficulty: "Hard", questions: 130, progress: 0, time: "4h", status: "Locked" }
      ]
    },
    {
      id: "verbal",
      title: "Verbal Ability",
      description: "Improve grammar, vocabulary, and reading comprehension.",
      progress: 25,
      topicsCompleted: "4/10",
      timeEstimation: "25h",
      icon: BookOpen,
      color: "text-purple-400",
      topics: [
        { name: "Reading Comprehension", difficulty: "Hard", questions: 200, progress: 80, time: "6h", status: "In Progress" },
        { name: "Synonyms & Antonyms", difficulty: "Medium", questions: 300, progress: 100, time: "5h", status: "Completed" },
        { name: "Sentence Correction", difficulty: "Medium", questions: 150, progress: 0, time: "4h", status: "Locked" },
        { name: "Para Jumbles", difficulty: "Hard", questions: 120, progress: 0, time: "3h", status: "Locked" },
        { name: "Fill in the Blanks", difficulty: "Easy", questions: 180, progress: 100, time: "2h", status: "Completed" },
        { name: "Error Detection", difficulty: "Medium", questions: 160, progress: 100, time: "3h", status: "Completed" },
        { name: "Vocabulary", difficulty: "Medium", questions: 250, progress: 100, time: "4h", status: "Completed" },
        { name: "Idioms & Phrases", difficulty: "Easy", questions: 140, progress: 0, time: "2h", status: "Locked" },
        { name: "Active & Passive Voice", difficulty: "Easy", questions: 100, progress: 0, time: "2h", status: "Locked" },
        { name: "Direct & Indirect Speech", difficulty: "Medium", questions: 110, progress: 0, time: "2.5h", status: "Locked" }
      ]
    },
    {
      id: "data",
      title: "Data Interpretation",
      description: "Analyze charts, graphs, and complex data structures.",
      progress: 10,
      topicsCompleted: "1/6",
      timeEstimation: "20h",
      icon: PieChart,
      color: "text-orange-400",
      topics: [
        { name: "Bar Graphs", difficulty: "Easy", questions: 80, progress: 100, time: "2h", status: "Completed" },
        { name: "Pie Charts", difficulty: "Medium", questions: 100, progress: 0, time: "3h", status: "Not Started" },
        { name: "Line Graphs", difficulty: "Medium", questions: 90, progress: 0, time: "2h", status: "Locked" },
        { name: "Tables", difficulty: "Medium", questions: 110, progress: 0, time: "3h", status: "Locked" },
        { name: "Mixed Charts", difficulty: "Hard", questions: 120, progress: 0, time: "4h", status: "Locked" },
        { name: "Caselets", difficulty: "Hard", questions: 100, progress: 0, time: "3h", status: "Locked" }
      ]
    },
    {
      id: "puzzle",
      title: "Puzzle Solving",
      description: "Solve brain teasers, floor puzzles, and grid configurations.",
      progress: 20,
      topicsCompleted: "1/5",
      timeEstimation: "18h",
      icon: Target,
      color: "text-yellow-400",
      topics: [
        { name: "Floor-Based Puzzles", difficulty: "Hard", questions: 60, progress: 100, time: "4h", status: "Completed" },
        { name: "Scheduling Puzzles", difficulty: "Medium", questions: 50, progress: 0, time: "3h", status: "Not Started" },
        { name: "Grid-Based Puzzles", difficulty: "Hard", questions: 70, progress: 0, time: "4h", status: "Locked" },
        { name: "Linear & Circular Arrangements", difficulty: "Medium", questions: 80, progress: 0, time: "3.5h", status: "Locked" },
        { name: "Box Puzzles", difficulty: "Medium", questions: 40, progress: 0, time: "2.5h", status: "Locked" }
      ]
    },
    {
      id: "mixed",
      title: "Mixed Practice",
      description: "High-yield combined assessment drills simulating placement tests.",
      progress: 40,
      topicsCompleted: "2/5",
      timeEstimation: "15h",
      icon: Zap,
      color: "text-pink-400",
      topics: [
        { name: "Speed Drills", difficulty: "Easy", questions: 100, progress: 100, time: "2h", status: "Completed" },
        { name: "Full Sectional Practice", difficulty: "Medium", questions: 120, progress: 0, time: "3.5h", status: "Not Started" },
        { name: "Easy Mode Warmups", difficulty: "Easy", questions: 80, progress: 100, time: "1.5h", status: "Completed" },
        { name: "Hard Core Challenges", difficulty: "Hard", questions: 90, progress: 0, time: "4h", status: "Locked" },
        { name: "Daily High Yield Set", difficulty: "Medium", questions: 50, progress: 0, time: "2h", status: "Locked" }
      ]
    }
  ];

  // Exactly 3 featured Practice Sets
  const featuredPracticeSets = [
    { name: "Percentage Practice Set 1", questions: 30, duration: "45 mins", difficulty: "Easy", completed: true },
    { name: "Profit & Loss Challenge", questions: 25, duration: "40 mins", difficulty: "Medium", completed: false },
    { name: "Logical Puzzle Set", questions: 15, duration: "30 mins", difficulty: "Hard", completed: false }
  ];

  // Exactly 3 featured Mock Tests
  const featuredMockTests = [
    { title: "TCS NQT Mock 1", type: "Company", duration: "90 mins", questions: 60, difficulty: "Medium" },
    { title: "Quant Sectional", type: "Sectional", duration: "45 mins", questions: 30, difficulty: "Easy" },
    { title: "Full Aptitude Test", type: "Comprehensive", duration: "120 mins", questions: 100, difficulty: "Hard" }
  ];

  // Animations config
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  if (activeCategory) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24 text-white">
        <CategoryLearningPage
          category={activeCategory}
          onBack={() => setActiveCategory(null)}
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-12 pb-24 text-white"
    >
      {/* 1. Header Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-[#1E293B]/30 border border-white/[0.08] p-6 md:p-8 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-md relative overflow-hidden"
      >
        {/* Decorative lime glow */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#B5FF45]/[0.05] rounded-full blur-[90px] pointer-events-none" />

        <div className="space-y-3 max-w-2xl relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-heading">
            Aptitude Preparation
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
            Master Quantitative Aptitude, Logical Reasoning, Verbal Ability, and other placement aptitude topics through structured learning and practice.
          </p>
        </div>

        {/* Header Statistics Grid (Only 3 Compact Cards) */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full lg:w-auto shrink-0 relative z-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3 md:p-4 text-center flex flex-col items-center justify-center min-w-[90px] md:min-w-[120px] shadow-sm"
              >
                <div className="p-2 rounded-xl bg-white/5 mb-2">
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color}`} />
                </div>
                <span className="text-[10px] text-gray-400 font-medium block leading-tight">
                  {stat.label}
                </span>
                <span className="text-sm md:text-lg font-bold text-white mt-1 font-mono">
                  {stat.value}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 2. Aptitude Categories Section */}
      <motion.div variants={itemVariants} className="space-y-5">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight font-heading flex items-center gap-2">
            <Target className="w-5 h-5 text-[#B5FF45]" />
            Aptitude Categories
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Pick a structured pathway to start preparing and mastering concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setActiveCategory(category)}
                className="bg-[#1E293B]/45 border border-white/[0.08] rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:border-white/15 hover:bg-[#1E293B]/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/5 text-gray-300 group-hover:text-[#B5FF45] group-hover:bg-[#B5FF45]/10 transition-all duration-300">
                      <Icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-300 bg-white/[0.02] border border-white/[0.08] px-2.5 py-1 rounded-md">
                      {category.topicsCompleted} Topics
                    </span>
                  </div>

                  <h3 className="font-semibold text-white group-hover:text-[#B5FF45] transition-colors duration-300 mb-2 text-base">
                    {category.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed mb-5">
                    {category.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono text-gray-400">
                      <span>Mastery Completion</span>
                      <span className="font-bold text-white">{category.progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#B5FF45] to-[#80E600] rounded-full"
                        style={{ width: `${category.progress}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCategory(category);
                    }}
                    className="w-full py-2 bg-white/5 group-hover:bg-[#B5FF45] group-hover:text-[#05080D] text-white text-xs font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Continue Study</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 3. Recommended Practice Sets Section */}
      <motion.div variants={itemVariants} className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight font-heading flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Recommended Practice Sets
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Curated sectional questions recommended specifically for you next.
            </p>
          </div>
        </div>

        {/* Exactly 3 Cards in Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPracticeSets.map((set, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-[#1E293B]/45 border border-white/[0.08] hover:border-white/15 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-white/5 text-gray-400 group-hover:text-yellow-400 transition-colors rounded-xl">
                    <Target className="w-4.5 h-4.5" />
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold font-mono tracking-wider px-2.5 py-0.5 rounded-full ${
                      set.difficulty === "Easy"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : set.difficulty === "Medium"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {set.difficulty}
                  </span>
                </div>

                <h3 className="font-semibold text-white mb-2 text-sm md:text-base leading-snug group-hover:text-[#B5FF45] transition-colors">
                  {set.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-400 font-mono mb-6">
                  <span>{set.questions} Questions</span>
                  <span>•</span>
                  <span>{set.duration}</span>
                </div>
              </div>

              <button className="w-full py-2.5 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] text-white text-xs font-semibold rounded-xl transition-all duration-300 cursor-pointer">
                {set.completed ? "Review Answers" : "Start Practice"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* View All Library Link */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => navigate("/subjects")}
            className="text-xs font-semibold text-gray-400 hover:text-[#B5FF45] flex items-center gap-1 transition-colors group cursor-pointer"
          >
            <span>View All Practice Sets</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* 4. Mock Tests Section */}
      <motion.div variants={itemVariants} className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight font-heading flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Mock Tests
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Simulate true placement screening rounds under timing constraints.
            </p>
          </div>
        </div>

        {/* Exactly 3 Cards in Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMockTests.map((test, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-[#1E293B]/45 border border-white/[0.08] hover:border-white/15 transition-colors duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded">
                    {test.type}
                  </span>
                  <span
                    className={`text-[9px] uppercase font-bold font-mono tracking-wider px-2 py-0.5 rounded-full ${
                      test.difficulty === "Easy"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : test.difficulty === "Medium"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {test.difficulty}
                  </span>
                </div>

                <h3 className="font-bold text-white mb-2 text-sm md:text-base leading-snug group-hover:text-[#B5FF45] transition-colors">
                  {test.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-400 font-mono mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-400" /> {test.duration}
                  </span>
                  <span>•</span>
                  <span>{test.questions} Questions</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/mock-tests")}
                className="w-full py-2.5 border border-white/5 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] text-white hover:border-[#B5FF45] rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer"
              >
                Start Test
              </button>
            </motion.div>
          ))}
        </div>

        {/* View All Mock Tests Link */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => navigate("/mock-tests")}
            className="text-xs font-semibold text-gray-400 hover:text-[#B5FF45] flex items-center gap-1 transition-colors group cursor-pointer"
          >
            <span>View All Mock Tests</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Dedicated Category Learning Sub-Page View
function CategoryLearningPage({ category, onBack }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const filteredTopics = category.topics.filter((topic) => {
    const matchesSearch = topic.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = difficultyFilter === "All" || topic.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Breadcrumb & Navigation */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors mb-4 group cursor-pointer bg-transparent border-none p-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Aptitude Categories
        </button>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <span>Aptitude</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#B5FF45] font-semibold">{category.title}</span>
        </div>
      </div>

      {/* Category Jumbotron Header */}
      <div className="relative overflow-hidden bg-[#1E293B]/40 border border-white/[0.08] rounded-3xl p-6 md:p-8 backdrop-blur-md">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#B5FF45]/[0.05] to-transparent rounded-full blur-[80px] pointer-events-none" />
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative z-10">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/5 text-[#B5FF45]">
                <category.icon className="w-6 h-6" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white font-heading">
                {category.title}
              </h1>
            </div>
            <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
              {category.description}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-400 pt-2">
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                <BookOpen className="w-3.5 h-3.5 text-[#B5FF45]" />
                {category.topicsCompleted} Topics Completed
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {category.timeEstimation} Est. Time
              </span>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-3 bg-black/30 p-4 rounded-2xl border border-white/5">
            <div className="flex justify-between items-end">
              <span className="text-xs text-gray-400 font-medium">Category Mastery</span>
              <span className="text-xl font-bold text-white font-mono">{category.progress}%</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#B5FF45] to-[#80E600] rounded-full shadow-[0_0_8px_rgba(181,255,69,0.2)]"
                style={{ width: `${category.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Topic Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-[#1E293B]/20 border border-white/[0.04] p-4 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 focus:border-[#B5FF45] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none transition-all font-sans"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-mono flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-gray-400" /> Filter:
          </span>
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {["All", "Easy", "Medium", "Hard"].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  difficultyFilter === diff
                    ? "bg-[#B5FF45] text-[#05080D]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic, i) => {
            const isCompleted = topic.status === "Completed";
            const isLocked = topic.status === "Locked";
            const isInProgress = topic.status === "In Progress";

            return (
              <motion.div
                key={topic.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-[#1E293B]/45 border border-white/[0.08] hover:border-white/15 hover:bg-[#1E293B]/60 transition-all gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl mt-0.5 shrink-0 ${
                      isCompleted
                        ? "bg-[#B5FF45]/10 text-[#B5FF45]"
                        : isInProgress
                        ? "bg-blue-400/10 text-blue-400"
                        : isLocked
                        ? "bg-white/5 text-gray-500 border border-white/5"
                        : "bg-white/5 text-white"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5" />
                    ) : (
                      <PlayCircle className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-[#B5FF45] transition-colors font-sans text-sm md:text-base">
                      {topic.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400 font-mono">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                          topic.difficulty === "Easy"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : topic.difficulty === "Medium"
                            ? "bg-yellow-500/15 text-yellow-400"
                            : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {topic.difficulty}
                      </span>
                      <span>•</span>
                      <span>{topic.questions} Questions</span>
                      <span>•</span>
                      <span>Est: {topic.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-white/5">
                  {!isLocked && !isCompleted && (
                    <div className="hidden md:flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#B5FF45] rounded-full" style={{ width: `${topic.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-400 font-mono w-8 text-right">
                        {topic.progress}%
                      </span>
                    </div>
                  )}
                  <button
                    disabled={isLocked}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all w-full sm:w-auto ${
                      isLocked
                        ? "bg-white/5 text-gray-500 cursor-not-allowed border border-white/5"
                        : isCompleted
                        ? "bg-white/5 hover:bg-white/10 text-white border border-white/10 cursor-pointer"
                        : "bg-[#B5FF45] text-[#05080D] hover:bg-[#80E600] cursor-pointer shadow-md"
                    }`}
                  >
                    {isCompleted ? "Review" : isLocked ? "Locked" : isInProgress ? "Resume" : "Start Study"}
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-white/10 rounded-2xl bg-[#1E293B]/10">
            <AlertCircle className="w-10 h-10 text-gray-500 mb-3" />
            <p className="text-sm font-medium text-gray-300">No topics found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("All");
              }}
              className="text-xs font-bold text-[#B5FF45] hover:underline mt-3 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
