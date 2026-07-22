import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight,
  ArrowLeft,
  PlayCircle,
  FileText,
  CheckCircle2,
  Lock,
  Clock,
  ChevronDown,
  Sparkles,
  Filter,
  ExternalLink,
  Calendar,
  PlusCircle,
  ArrowRight,
  Loader2
} from "lucide-react";

const API_BASE_URL = 'http://localhost:5000/api';

const iconMap = {
  cn: Network,
  os: Cpu,
  dbms: Database,
  oop: Code,
  sql: Terminal,
  "computer-fundamentals": Monitor,
};

import {
  Network,
  Cpu,
  Database,
  Code,
  Terminal,
  Monitor,
} from "lucide-react";

function deriveSubjectData(apiSubject) {
  const chapters = (apiSubject.chapters || []).map((chapter) => {
    const topicList = chapter.topics || [];
    const completedTopics = topicList.filter((t) => t.status === "Completed").length;
    const totalTopics = topicList.length;
    const progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    const allCompleted = totalTopics > 0 && completedTopics === totalTopics;

    return {
      ...chapter,
      progress,
      totalTopics,
      completedTopics,
      isLocked: false,
      topics: topicList.map((t) => ({
        ...t,
        isLocked: t.status === "Locked",
      })),
    };
  });

  const totalChapters = chapters.length;
  const chaptersCompleted = chapters.filter((c) => c.progress === 100).length;
  const totalTopics = chapters.reduce((sum, c) => sum + c.totalTopics, 0);
  const completedTopics = chapters.reduce((sum, c) => sum + c.completedTopics, 0);

  return {
    id: apiSubject.id,
    name: apiSubject.name,
    description: apiSubject.description,
    progress: apiSubject.progress ?? 0,
    completedTopics,
    totalTopics,
    duration: `${totalTopics} topics`,
    chaptersCompleted,
    totalChapters,
    questionsSolved: apiSubject.questionsSolved ?? 0,
    accuracy: apiSubject.accuracy ?? 0,
    lastStudied: apiSubject.lastStudied ?? "Not started",
    chapters,
  };
}

export function SubjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [subject, setSubject] = useState(null);
  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('kramik_token');
        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const [subjectRes, questionsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/subjects/${id}`, { headers }),
          fetch(`${API_BASE_URL}/questions?subjectId=${id}`),
        ]);

        if (!subjectRes.ok) throw new Error("Subject not found");
        const subjectData = await subjectRes.json();
        setSubject(deriveSubjectData(subjectData));

        if (questionsRes.ok) {
          const questionsData = await questionsRes.json();
          setPracticeQuestions(questionsData.map((q) => ({
            id: q._id,
            title: q.title,
            difficulty: q.difficulty,
            companies: q.companies || [],
            platform: "Kramik",
            time: q.difficulty === "Hard" ? "45m" : q.difficulty === "Medium" ? "30m" : "15m",
          })));
        }
      } catch (err) {
        console.error("Failed to load subject:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const toggleChapter = (chapterId) => {
    setExpandedChapter((prev) => (prev === chapterId ? null : chapterId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#B5FF45] animate-spin" />
      </div>
    );
  }

  if (error || !subject) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-gray-400 text-sm">Failed to load subject data.</p>
        <button
          onClick={() => navigate("/subjects")}
          className="text-[#B5FF45] text-sm font-medium hover:underline"
        >
          Back to Subjects
        </button>
      </div>
    );
  }

  const resources = [
    { id: "r1", title: `${subject.name} Cheat Sheet`, type: "PDF", duration: "10m read", icon: FileText },
    { id: "r2", title: `Crash Course: ${subject.name}`, type: "Video", duration: "1h 20m", icon: PlayCircle },
  ];

  const chapters = subject.chapters || [];

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
      {/* Breadcrumb Navigation */}
      <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}>
        <button
          onClick={() => navigate("/subjects")}
          className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors mb-4 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Subjects
        </button>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <button onClick={() => navigate("/dashboard")} className="hover:text-white transition-colors">Dashboard</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigate("/subjects")} className="hover:text-white transition-colors">Subjects</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#B5FF45]">{subject.name}</span>
        </div>
      </motion.div>

      {/* Header Profile Card */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
        className="relative bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 lg:p-8 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#B5FF45]/[0.05] to-transparent rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center relative z-10">
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white">{subject.name}</h1>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">{subject.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-400 pt-2">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <Clock className="w-3.5 h-3.5 text-[#B5FF45]" />
                {subject.duration}
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B5FF45]" />
                {subject.completedTopics}/{subject.totalTopics} Topics
              </span>
            </div>
          </div>

          <div className="w-full lg:w-72 space-y-4 bg-black/40 p-5 rounded-2xl border border-white/5 shrink-0">
            <div className="flex justify-between items-end">
              <span className="text-xs text-gray-400 font-medium">Overall Progress</span>
              <span className="text-2xl font-bold text-white tracking-tight">{subject.progress}%</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${subject.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#80E600] to-[#B5FF45] rounded-full"
              />
            </div>
            <button className="w-full py-3 bg-[#B5FF45] hover:bg-[#80E600] text-[#05080D] font-bold rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(181,255,69,0.2)]">
              Continue Learning <PlayCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content Column (Topics & Practice) */}
        <div className="xl:col-span-2 space-y-10">

          {/* Topics & Chapters */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Topics & Chapters</h2>
              <span className="text-xs text-gray-400">{subject.chaptersCompleted} of {subject.totalChapters} Chapters</span>
            </div>

            <div className="space-y-3">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className={`bg-[#0A0E17]/80 backdrop-blur-xl border ${
                    expandedChapter === chapter.id
                      ? "border-[#B5FF45]/30 shadow-[0_10px_30px_-10px_rgba(181,255,69,0.05)]"
                      : "border-white/5"
                  } rounded-2xl overflow-hidden transition-all duration-300`}
                >
                  <button
                    onClick={() => !chapter.isLocked && toggleChapter(chapter.id)}
                    className={`w-full flex items-center justify-between p-5 text-left transition-colors ${
                      chapter.isLocked ? "cursor-not-allowed opacity-60" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                          chapter.isLocked
                            ? "bg-white/5 border-white/10 text-gray-500"
                            : chapter.progress === 100
                            ? "bg-[#B5FF45]/10 border-[#B5FF45]/30 text-[#B5FF45]"
                            : "bg-blue-400/10 border-blue-400/30 text-blue-400"
                        }`}
                      >
                        {chapter.isLocked ? <Lock className="w-4 h-4" /> : chapter.progress === 100 ? <CheckCircle2 className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{chapter.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{chapter.completedTopics}/{chapter.totalTopics} Topics • {chapter.progress}% Completed</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {!chapter.isLocked && (
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                            expandedChapter === chapter.id ? "rotate-180 text-white" : ""
                          }`}
                        />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedChapter === chapter.id && !chapter.isLocked && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-2 space-y-2 border-t border-white/5">
                          {chapter.topics.map((topic) => {
                            const isCompleted = topic.status === "Completed";
                            const isInProgress = topic.status === "In Progress";
                            const isLocked = topic.status === "Locked";
                            return (
                              <div
                                key={topic.id}
                                className={`flex items-center justify-between p-3 rounded-xl border ${
                                  isCompleted
                                    ? "bg-white/[0.02] border-transparent"
                                    : isInProgress
                                    ? "bg-[#B5FF45]/[0.05] border-[#B5FF45]/20"
                                    : "bg-transparent border-white/5"
                                } transition-all`}
                              >
                                <div className="flex items-center gap-3">
                                  <button
                                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                      isCompleted
                                        ? "bg-[#B5FF45] border-[#B5FF45] text-[#05080D]"
                                        : isLocked
                                        ? "bg-white/5 border-white/10 text-transparent cursor-not-allowed"
                                        : "border-gray-500 hover:border-[#B5FF45]"
                                    }`}
                                  >
                                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                                  </button>
                                  <span
                                    className={`text-sm ${
                                      isCompleted
                                        ? "text-gray-400 line-through decoration-gray-600"
                                        : isLocked
                                        ? "text-gray-500"
                                        : "text-gray-200 font-medium"
                                    }`}
                                  >
                                    {topic.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-[10px] text-gray-500 font-medium">{topic.duration}</span>
                                  <span
                                    className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                      topic.difficulty === "Easy"
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : topic.difficulty === "Medium"
                                        ? "bg-orange-500/10 text-orange-400"
                                        : "bg-red-500/10 text-red-400"
                                    }`}
                                  >
                                    {topic.difficulty}
                                  </span>
                                  {!isCompleted && !isLocked && (
                                    <button className="text-[10px] font-bold text-[#B5FF45] hover:text-white transition-colors bg-[#B5FF45]/10 px-2 py-1 rounded">
                                      {isInProgress ? "RESUME" : "START"}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* Practice Questions */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Practice Questions</h2>
              <button className="text-xs text-[#B5FF45] font-medium hover:text-white transition-colors flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filters
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {practiceQuestions.length === 0 ? (
                <div className="text-center py-10 bg-[#0A0E17]/60 border border-white/5 rounded-2xl">
                  <p className="text-xs text-gray-500">No questions available yet for this subject.</p>
                </div>
              ) : (
                practiceQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-4 bg-[#0A0E17]/60 border border-white/5 rounded-2xl hover:border-white/10 transition-colors group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#B5FF45] transition-colors">{q.title}</h4>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            q.difficulty === "Easy"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : q.difficulty === "Medium"
                              ? "bg-orange-500/10 text-orange-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> {q.platform}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {q.time}
                        </span>
                        {q.companies.length > 0 && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <div className="flex gap-1">
                              {q.companies.map((c) => (
                                <span key={c} className="bg-white/5 px-1.5 py-0.5 rounded">{c}</span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <button className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#B5FF45] hover:border-[#B5FF45] hover:text-[#05080D] transition-all duration-300">
                      <PlayCircle className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
            {practiceQuestions.length > 0 && (
              <button className="w-full py-3 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2">
                View All Questions <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </section>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">

          {/* Progress Summary Panel */}
          <div className="bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
            <h3 className="text-sm font-semibold text-white mb-6">Progress Summary</h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-xs text-gray-400">Chapters Completed</span>
                <span className="text-sm font-bold text-white">{subject.chaptersCompleted} / {subject.totalChapters}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-xs text-gray-400">Questions Attempted</span>
                <span className="text-sm font-bold text-white">{subject.questionsSolved}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-xs text-gray-400">Accuracy</span>
                <span className="text-sm font-bold text-[#B5FF45]">{subject.accuracy}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Last Studied</span>
                <span className="text-xs font-medium text-white">{subject.lastStudied}</span>
              </div>
            </div>
          </div>

          {/* AI Mentor Card */}
          <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border-custom rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B5FF45]/10 rounded-full blur-[40px]" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-accent-custom/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent-custom dark:text-[#B5FF45]" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary">Ask AI Mentor</h3>
            </div>
            <p className="text-xs text-text-secondary mb-4 relative z-10">
              Stuck on a concept? Ask for explanations, custom questions, or hints.
            </p>
            <div className="space-y-2 relative z-10">
              {["Explain Process Synchronization", "Generate 5 Aptitude Questions"].map((q, i) => (
                <button
                  key={i}
                  className="w-full text-left p-3 rounded-xl bg-item-hover hover:bg-bg-primary text-xs text-text-secondary hover:text-text-primary transition-colors border border-border-custom flex items-center justify-between"
                >
                  {q} <ChevronRight className="w-3 h-3 text-text-secondary/70" />
                </button>
              ))}
            </div>
          </div>

          {/* Curated Resources */}
          <div className="bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-semibold text-white">Resources</h3>
              <button className="text-[#B5FF45] hover:text-white transition-colors"><PlusCircle className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              {resources.map((res) => (
                <div key={res.id} className="flex gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <res.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors line-clamp-1">{res.title}</h4>
                    <span className="text-[10px] text-gray-500">{res.type} • {res.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revision Tracker */}
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-[30px]" />
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-orange-400" />
              Due for Revision
            </h3>
            <p className="text-xs text-gray-400 mb-4">Topics that need your attention to maintain retention.</p>
            <div className="space-y-2">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-200">{subject.name}</span>
                <button className="text-[10px] bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-1.5 rounded-lg transition-colors">Revise</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
