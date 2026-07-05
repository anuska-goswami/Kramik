import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileEdit,
  BookOpen,
  Brain,
  Settings,
  Bell,
  MessageSquare,
  Search,
  Menu,
  X,
  Moon,
  Sun,
  Sparkles,
  Briefcase,
  FileText
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { DashboardContent } from "./DashboardContent";
import { SubjectsContent } from "./SubjectsContent";
import { SubjectDetailPage } from "./SubjectDetailPage";
import { MockTestsContent } from "./MockTestsContent";
import { MockTestResultPage } from "./MockTestResultPage";
import { AIMentorChat } from "./AIMentorChat";
import { SettingsContent } from "./SettingsContent";
import { AptitudeContent } from "./AptitudeContent";
import { CompanyPrepContent } from "./CompanyPrepContent";
import { CompanyDetailPage } from "./CompanyDetailPage";
import { InterviewPrepContent } from "./InterviewPrepContent";
import { InterviewDetailPage } from "./InterviewDetailPage";
import { ResumeBuilderContent } from "./resume/ResumeBuilderContent";
export function DashboardLayout({ onSignOut, onNavigateToProfile, initialTab = "dashboard" }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isAIMentorOpen, setIsAIMentorOpen] = useState(false);
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "subjects", label: "Core Subjects", icon: BookOpen },
    { id: "aptitude", label: "Aptitude", icon: Brain },
    { id: "mock-tests", label: "Mock Tests", icon: FileEdit },
    { id: "company-prep", label: "Company Preparation", icon: Briefcase },
    { id: "interview-prep", label: "Interview Preparation", icon: MessageSquare },
    { id: "resume-builder", label: "Resume Builder", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings }
  ];
  return <div className="min-h-screen bg-bg-primary text-text-primary flex overflow-hidden font-sans selection:bg-[#B5FF45]/30 dark:bg-gradient-to-b dark:from-[#111827] dark:via-[#0F172A] dark:to-[#1E293B]">
      {
    /* Background patterns and glows */
  }
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Faint dots background pattern */}
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] bg-[radial-gradient(rgba(255,255,255,0.15)_1.2px,transparent_1.2px)] bg-[size:24px_24px]" />
        {/* Subtle radial lime-green glow behind the welcome/top section */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#B5FF45]/[0.05] dark:bg-[#B5FF45]/[0.07] rounded-full blur-[130px]" />
        <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-[#B5FF45]/[0.01] rounded-full blur-[140px] dark:opacity-100 opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#B5FF45]/[0.01] rounded-full blur-[120px] dark:opacity-100 opacity-30" />
      </div>

      {
    /* Mobile Sidebar Overlay */
  }
      <AnimatePresence>
        {isMobileSidebarOpen && <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setIsMobileSidebarOpen(false)}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
  />}
      </AnimatePresence>

      {
    /* Sidebar */
  }
      <aside
    className={`fixed lg:relative z-50 h-screen w-[280px] flex flex-col bg-bg-secondary/80 backdrop-blur-2xl border-r border-border-custom transition-transform duration-300 overflow-hidden ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
  >
        {
    /* Logo Area */
  }
        <div className="h-20 flex items-center shrink-0 border-b border-border-custom px-6">
          <span className="text-2xl font-bold font-heading tracking-tight flex items-center">
            <span className="bg-gradient-to-br from-[#B5FF45] to-[#80E600] text-transparent bg-clip-text">K</span>
            <span className="text-text-primary ml-0.5">ramik</span>
          </span>
          <button
    onClick={() => setIsMobileSidebarOpen(false)}
    className="lg:hidden ml-auto p-2 text-text-secondary hover:text-text-primary"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* Nav Items */
  }
        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar flex flex-col gap-1 w-full px-3">
          {navItems.map((item) => {
    const isActive = activeTab === item.id || item.id === "subjects" && activeTab === "subject-detail" || item.id === "mock-tests" && activeTab === "mock-test-result" || item.id === "company-prep" && activeTab === "company-detail" || item.id === "interview-prep" && activeTab === "interview-detail";
    return <button
      key={item.id}
      onClick={() => {
        setActiveTab(item.id);
        if (item.id === "dashboard") {
          navigate("/dashboard");
        } else if (item.id === "subjects") {
          navigate("/subjects");
        } else if (item.id === "settings") {
          navigate("/settings");
        } else if (item.id === "mock-tests") {
          navigate("/mock-tests");
        } else if (item.id === "aptitude") {
          navigate("/aptitude");
        } else if (item.id === "company-prep") {
          navigate("/company-prep");
        } else if (item.id === "interview-prep") {
          navigate("/interview-prep");
        } else if (item.id === "resume-builder") {
          navigate("/resume-builder");
        }
        if (window.innerWidth < 1024) setIsMobileSidebarOpen(false);
      }}
      className={`flex items-center gap-3 rounded-xl transition-all duration-300 relative group px-4 py-3
                  ${isActive ? "bg-gradient-to-r from-[#B5FF45]/10 to-transparent text-text-primary" : "text-text-secondary hover:text-text-primary hover:bg-item-hover"}
                `}
    >
                {isActive && <motion.div
      layoutId="activeTabIndicator"
      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-[#B5FF45] rounded-r-full shadow-[0_0_10px_rgba(181,255,69,0.5)]"
    />}
                <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? "text-[#B5FF45]" : "group-hover:text-text-primary"}`} />
                <span className={`text-sm font-medium whitespace-nowrap transition-colors ${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              </button>;
  })}
        </div>

        {
    /* Sidebar Footer with 2x2 grid */
  }
        <div className="p-4 border-t border-border-custom shrink-0 w-full flex flex-col gap-4">
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-text-secondary/80 uppercase tracking-wider px-1">Continue Learning</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
    onClick={() => {
      setActiveTab("aptitude");
      navigate("/aptitude");
      if (window.innerWidth < 1024) setIsMobileSidebarOpen(false);
    }}
    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-item-hover border border-border-custom hover:bg-bg-primary hover:border-border-hover transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
  >
                <Brain className="w-4 h-4 text-text-secondary group-hover:text-orange-400 transition-colors" />
                <div className="text-center">
                  <div className="text-[10px] font-semibold text-text-primary leading-tight">Aptitude</div>
                  <div className="text-[8px] text-text-secondary/70">Practice</div>
                </div>
              </button>
              <button
    onClick={() => {
      setActiveTab("mock-tests");
      navigate("/mock-tests");
      if (window.innerWidth < 1024) setIsMobileSidebarOpen(false);
    }}
    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-item-hover border border-border-custom hover:bg-bg-primary hover:border-border-hover transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
  >
                <FileEdit className="w-4 h-4 text-text-secondary group-hover:text-blue-400 transition-colors" />
                <div className="text-center">
                  <div className="text-[10px] font-semibold text-text-primary leading-tight">Mock Test</div>
                  <div className="text-[8px] text-text-secondary/70">Attempt</div>
                </div>
              </button>
              <button
    onClick={() => {
      setActiveTab("company-prep");
      navigate("/company-prep");
      if (window.innerWidth < 1024) setIsMobileSidebarOpen(false);
    }}
    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-item-hover border border-border-custom hover:bg-bg-primary hover:border-border-hover transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
  >
                <Briefcase className="w-4 h-4 text-text-secondary group-hover:text-[#B5FF45] transition-colors" />
                <div className="text-center">
                  <div className="text-[10px] font-semibold text-text-primary leading-tight">Company</div>
                  <div className="text-[8px] text-text-secondary/70">Prepare</div>
                </div>
              </button>
              <button
    onClick={() => {
      setActiveTab("subjects");
      navigate("/subjects");
      if (window.innerWidth < 1024) setIsMobileSidebarOpen(false);
    }}
    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-item-hover border border-border-custom hover:bg-bg-primary hover:border-border-hover transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
  >
                <BookOpen className="w-4 h-4 text-text-secondary group-hover:text-purple-400 transition-colors" />
                <div className="text-center">
                  <div className="text-[10px] font-semibold text-text-primary leading-tight">Subjects</div>
                  <div className="text-[8px] text-text-secondary/70">Study</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {
    /* Main Content Area */
  }
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {
    /* Topbar */
  }
        <header className="h-20 shrink-0 border-b border-border-custom bg-bg-primary/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button
    onClick={() => setIsMobileSidebarOpen(true)}
    className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
  >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center relative group">
              <Search className="w-4 h-4 text-text-secondary absolute left-4 group-focus-within:text-[#B5FF45] transition-colors" />
              <input
    type="text"
    placeholder="Search topics, mock tests, company preparation..."
    className="w-64 lg:w-96 h-10 pl-11 pr-4 bg-item-hover border border-border-custom rounded-full text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-bg-secondary transition-all duration-300"
  />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative flex items-center justify-center w-10 h-10 rounded-full text-text-secondary hover:text-text-primary hover:bg-item-hover transition-colors group">
              <Bell className="w-4 h-4 group-hover:text-text-primary transition-colors" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#B5FF45] rounded-full shadow-[0_0_5px_#B5FF45]" />
            </button>
            <div className="h-6 w-px bg-border-custom mx-2" />
            <button
    onClick={onNavigateToProfile}
    className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-[#B5FF45]/50 transition-all duration-300 cursor-pointer"
  >
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
            </button>
          </div>
        </header>

        {
    /* Scrollable Content Area */
  }
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {activeTab === "subjects" ? <SubjectsContent /> : activeTab === "aptitude" ? <AptitudeContent /> : activeTab === "subject-detail" ? <SubjectDetailPage /> : activeTab === "mock-tests" ? <MockTestsContent onShowResult={() => setActiveTab("mock-test-result")} /> : activeTab === "mock-test-result" ? <MockTestResultPage /> : activeTab === "settings" ? <SettingsContent onSignOut={onSignOut} /> : activeTab === "company-prep" ? <CompanyPrepContent onCompanySelect={() => setActiveTab("company-detail")} /> : activeTab === "company-detail" ? <CompanyDetailPage onBack={() => setActiveTab("company-prep")} /> : activeTab === "interview-prep" ? <InterviewPrepContent onCategorySelect={() => setActiveTab("interview-detail")} /> : activeTab === "interview-detail" ? <InterviewDetailPage onBack={() => setActiveTab("interview-prep")} /> : activeTab === "resume-builder" ? <ResumeBuilderContent /> : <DashboardContent />}
        </main>
      </div>

      {
    /* Floating AI Mentor Button */
  }
      <AnimatePresence>
        {!isAIMentorOpen && <motion.button
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    onClick={() => setIsAIMentorOpen(true)}
    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[#B5FF45] to-[#80E600] rounded-full shadow-[0_10px_30px_rgba(181,255,69,0.3)] flex items-center justify-center text-[#05080D] hover:scale-110 transition-transform duration-300 z-40 group"
  >
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </motion.button>}
      </AnimatePresence>

      {
    /* AI Mentor Chat Panel */
  }
      <AnimatePresence>
        {isAIMentorOpen && <AIMentorChat onClose={() => setIsAIMentorOpen(false)} />}
      </AnimatePresence>
    </div>;
}
