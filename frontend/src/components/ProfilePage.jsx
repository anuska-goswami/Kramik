import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Lock,
  Check,
  LogOut,
  ArrowLeft,
  ChevronRight,
  Globe,
  Eye,
  EyeOff,
  Briefcase,
  Brain,
  Cpu,
  Database,
  Layers,
  Video,
  X,
  Upload
} from "lucide-react";
import { SubmissionActivity } from "./dashboard/SubmissionActivity";
export function ProfilePage({ onSignOut, onNavigateToDashboard }) {
  const [toast, setToast] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isConnectedGoogle, setIsConnectedGoogle] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Anuska Goswami",
    email: "anuskagoswami643@gmail.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    education: "IIT Kharagpur, B.Tech in CSE",
    skills: "Aptitude, System Design, Operating Systems, Computer Networks, DBMS",
    linkedin: "linkedin.com/in/anuska-goswami-demo",
    github: "github.com/anuska-goswami-demo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    tagline: "Aspiring Tech Professional. Building core computer science concepts & mastering aptitude skills."
  });
  const [tempProfileData, setTempProfileData] = useState({ ...profileData });
  const [skillInput, setSkillInput] = useState("");
  const [stats, setStats] = useState({
    subjectsCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    activeDays: 0
  });
  const [notifications, setNotifications] = useState({
    companyAlerts: true,
    weeklyProgress: true,
    aiRecommendations: true
  });
  const [privacy, setPrivacy] = useState({
    discoverable: true,
    shareMetrics: true
  });
  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3e3);
  };
  const fileInputRef = useRef(null);
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfileData((prev) => ({ ...prev, avatar: reader.result }));
        triggerToast("Profile image preview loaded!", "success");
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setStats({
        subjectsCompleted: Math.min(Math.floor(4 / steps * currentStep), 4),
        currentStreak: Math.min(Math.floor(18 / steps * currentStep), 18),
        longestStreak: Math.min(Math.floor(42 / steps * currentStep), 42),
        activeDays: Math.min(Math.floor(184 / steps * currentStep), 184)
      });
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, []);
  const preparationSubjects = [
    { name: "Aptitude & Logical Reasoning", percent: 85, icon: Brain, color: "bg-[#B5FF45]", details: "Quantitative, Verbal, Analytical" },
    { name: "Operating Systems (OS)", percent: 60, icon: Cpu, color: "bg-purple-400", details: "Concurrency, Memory, Schedulers" },
    { name: "Database Management Systems (DBMS)", percent: 72, icon: Database, color: "bg-blue-400", details: "SQL, Indexing, ACID Transactions" },
    { name: "Computer Networks (CN)", percent: 65, icon: Globe, color: "bg-amber-400", details: "TCP/IP, Routing, Security layers" },
    { name: "Object-Oriented Programming (OOP)", percent: 90, icon: Layers, color: "bg-rose-400", details: "Polymorphism, SOLID, Design Patterns" },
    { name: "HR Interview Preparation", percent: 50, icon: Video, color: "bg-emerald-400", details: "Behavioral, Communication, Resume" }
  ];
  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    setProfileData({ ...tempProfileData });
    setIsEditModalOpen(false);
    triggerToast("Profile updated successfully!", "success");
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      triggerToast("Passwords do not match", "error");
      return;
    }
    triggerToast("Password changed successfully!", "success");
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };
  return <div className="min-h-screen bg-[#05080D] text-white flex flex-col font-sans relative overflow-x-hidden antialiased select-none pb-20">
      
      {
    /* Low opacity subtle radial lime glow matching Vercel/Linear (under 8% opacity) */
  }
      <div className="absolute top-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-[#B5FF45]/[0.035] blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-5%] w-[450px] h-[450px] rounded-full bg-[#B5FF45]/[0.025] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#B5FF45]/[0.015] blur-[180px] pointer-events-none" />

      {
    /* Structured Dark Grid Texture */
  }
      <div
    className="absolute inset-0 opacity-[0.02] pointer-events-none"
    style={{
      backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }}
  />

      {
    /* Premium Navigation Header bar */
  }
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#05080D]/70 backdrop-blur-[24px] border-b border-white/[0.06] py-3.5 px-6 lg:px-12">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4">
          
          {
    /* Logo with clean lime indicator */
  }
          <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateToDashboard}>
            <span className="text-xl lg:text-2xl font-bold tracking-tight font-heading">
              <span className="text-[#B5FF45]">K</span>
              <span className="text-white">ramik</span>
            </span>
            <div className="px-2 py-0.5 rounded-full bg-[#B5FF45]/10 border border-[#B5FF45]/20 text-[10px] text-[#B5FF45] font-semibold tracking-wider ml-1.5 uppercase font-sans">
              Placement AI
            </div>
          </div>

          {
    /* Nav Controls */
  }
          <div className="flex items-center gap-3">
            <button
    onClick={onNavigateToDashboard}
    className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 text-gray-300 hover:text-white flex items-center gap-1.5 text-xs font-medium cursor-pointer"
  >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="h-8 w-8 rounded-full ring-2 ring-white/10 hover:ring-[#B5FF45]/50 transition-all duration-300 overflow-hidden shrink-0 bg-white/5 flex items-center justify-center">
              {profileData.avatar ? <img
    src={profileData.avatar}
    alt="Profile Avatar"
    className="w-full h-full object-cover"
  /> : <User className="w-4 h-4 text-gray-400" />}
            </div>
          </div>

        </div>
      </header>

      {
    /* Main Centered Container */
  }
      <main className="max-w-[1000px] mx-auto px-6 w-full mt-8 flex-grow flex flex-col gap-8 relative z-10">
        
        {
    /* Profile Card Header (Glassmorphic) */
  }
        <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="w-full bg-white/[0.02] backdrop-blur-[24px] border border-white/[0.06] rounded-[24px] p-6 lg:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative overflow-hidden"
  >
          {
    /* Internal premium vector light mask */
  }
          <div className="absolute top-0 left-0 w-32 h-full bg-[#B5FF45]/[0.012] blur-[40px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {
    /* Avatar image with glowing lime ring */
  }
            <div className="relative shrink-0">
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full p-[2.5px] bg-gradient-to-tr from-[#B5FF45] to-transparent shadow-[0_0_20px_rgba(181,255,69,0.1)] overflow-hidden">
                <div className="w-full h-full bg-white/5 rounded-full overflow-hidden flex items-center justify-center">
                  {profileData.avatar ? <img
    src={profileData.avatar}
    alt={profileData.fullName}
    className="w-full h-full object-cover rounded-full"
  /> : <User className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400" />}
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#05080D] rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B5FF45] shadow-[0_0_8px_rgba(181,255,69,0.8)]" />
              </div>
            </div>

            {
    /* Profile Meta Info */
  }
            <div className="space-y-2 max-w-xl">
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-heading">{profileData.fullName}</h1>
              <p className="text-xs text-gray-400 font-medium flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
                <span>{profileData.email}</span>
                <span className="text-gray-600">&bull;</span>
                <span className="text-white">{profileData.education}</span>
              </p>
              <p className="text-xs text-gray-400 leading-relaxed font-normal italic pt-1 text-gray-400 border-t border-white/5">
                "{profileData.tagline}"
              </p>
            </div>
          </div>

          {
    /* Premium Edit Profile button */
  }
          <div className="shrink-0">
            <button
    onClick={() => {
      setTempProfileData({ ...profileData });
      setIsEditModalOpen(true);
    }}
    className="px-5 py-2.5 text-xs font-bold text-[#05080D] bg-gradient-to-r from-[#B5FF45] to-[#9AE52B] rounded-xl shadow-[0_4px_15px_rgba(181,255,69,0.15)] hover:shadow-[0_4px_22px_rgba(181,255,69,0.35)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
  >
              Edit Profile
            </button>
          </div>
        </motion.div>

        {
    /* Learning & Prep Progress Section */
  }
        <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 }}
    className="bg-white/[0.02] border border-white/[0.06] rounded-[24px] p-6 lg:p-8 space-y-6"
  >
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/5">
            <Briefcase className="w-4.5 h-4.5 text-[#B5FF45]" />
            <div>
              <h2 className="font-semibold text-lg text-white font-heading tracking-tight">Placement Syllabus Progress</h2>
              <p className="text-xs text-gray-500">Real-time status tracking of interview key areas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {preparationSubjects.map((subject, index) => <div
    key={subject.name}
    className="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-4 hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300 group flex items-start gap-4"
  >
                <div className="p-2.5 rounded-xl bg-white/[0.03] text-gray-400 group-hover:text-white transition-colors duration-300">
                  <subject.icon className="w-4.5 h-4.5" />
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs font-semibold text-white tracking-tight">{subject.name}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{subject.details}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#B5FF45]">{subject.percent}%</span>
                  </div>

                  {
    /* Horizontal Progress Bar */
  }
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
    initial={{ width: 0 }}
    animate={{ width: `${subject.percent}%` }}
    transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
    className={`h-full rounded-full ${subject.color}`}
  />
                  </div>
                </div>
              </div>)}
          </div>
        </motion.div>

        {
    /* Submission Activity Section */
  }
        <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.2 }}
  >
          <SubmissionActivity limitMonths={4} />
        </motion.div>

        {
    /* Compact Account Settings */
  }
        <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.3 }}
    className="bg-white/[0.02] border border-white/[0.06] rounded-[24px] p-6 lg:p-8 space-y-4"
  >
          <div className="pb-2 border-b border-white/5">
            <h2 className="font-semibold text-lg text-white font-heading tracking-tight">Account & Security</h2>
            <p className="text-xs text-gray-500">Update password credentials and connected platform integrations</p>
          </div>

          <div className="divide-y divide-white/5">
            
            {
    /* Change Password */
  }
            <div
    onClick={() => setShowPasswordModal(true)}
    className="flex items-center justify-between py-3 px-1.5 hover:bg-white/[0.02] rounded-xl transition-all duration-300 cursor-pointer group"
  >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-[#B5FF45] transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white group-hover:text-[#B5FF45] transition-colors">Change Account Password</p>
                  <p className="text-[10px] text-gray-500">Update your current study login parameters</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
            </div>

            {
    /* Connected Google Account */
  }
            <div
    onClick={() => {
      setIsConnectedGoogle(!isConnectedGoogle);
      triggerToast(
        isConnectedGoogle ? "Google Account detached" : "Google Account connected successfully!",
        isConnectedGoogle ? "info" : "success"
      );
    }}
    className="flex items-center justify-between py-3 px-1.5 hover:bg-white/[0.02] rounded-xl transition-all duration-300 cursor-pointer group"
  >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-[#B5FF45] transition-colors">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Connected Google Account</p>
                  <p className="text-[10px] text-gray-500">
                    {isConnectedGoogle ? `Linked as ${profileData.email}` : "Not currently linked"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono ${isConnectedGoogle ? "bg-[#B5FF45]/10 text-[#B5FF45] border border-[#B5FF45]/20" : "bg-white/5 text-gray-500"}`}>
                  {isConnectedGoogle ? "Connected" : "Link Now"}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </div>
            </div>

            {
    /* Logout item */
  }
            <div
    onClick={() => {
      triggerToast("Logging out of Kramik Placement client...", "info");
      setTimeout(() => onSignOut(), 1e3);
    }}
    className="flex items-center justify-between py-3 px-1.5 hover:bg-white/[0.02] rounded-xl transition-all duration-300 cursor-pointer group"
  >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500/25 transition-all">
                  <LogOut className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white group-hover:text-red-400 transition-colors">Sign Out of Session</p>
                  <p className="text-[10px] text-gray-500">Securely sign out of your profile session</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-red-400 transition-colors" />
            </div>

          </div>
        </motion.div>

      </main>

      {
    /* Floating Toast Notification */
  }
      <AnimatePresence>
        {toast && <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.95 }}
    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#0B0F19]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-sm"
  >
            <div className={`p-1.5 rounded-lg shrink-0 ${toast.type === "success" ? "bg-[#B5FF45]/20 text-[#B5FF45]" : toast.type === "error" ? "bg-red-500/20 text-red-400" : "bg-cyan-500/20 text-cyan-400"}`}>
              <Check className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium text-white">{toast.message}</p>
          </motion.div>}
      </AnimatePresence>

      {
    /* Slide-over Panel for Edit Profile Form */
  }
      <AnimatePresence>
        {isEditModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-end">
            
            {
    /* Backdrop */
  }
            <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setIsEditModalOpen(false)}
    className="absolute inset-0 bg-[#05080D]/80 backdrop-blur-md"
  />

            {
    /* Slide-over panel content */
  }
            <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ type: "spring", damping: 25, stiffness: 200 }}
    className="relative w-full max-w-[500px] h-full bg-[#0B0F19]/95 border-l border-white/10 p-6 sm:p-8 overflow-y-auto custom-scrollbar shadow-2xl flex flex-col justify-between"
  >
              
              {
    /* Header */
  }
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading tracking-tight">Edit Profile</h3>
                    <p className="text-xs text-gray-500">Update your learning portfolio and platform credentials</p>
                  </div>
                  <button
    onClick={() => setIsEditModalOpen(false)}
    className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                {
    /* Form fields */
  }
                <form onSubmit={handleEditProfileSubmit} className="space-y-5">
                  
                  {
    /* Profile Picture Upload Section */
  }
                  <div className="flex items-center gap-4 bg-white/[0.01] border border-white/[0.04] p-4 rounded-2xl">
                    <div className="relative shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-white/5 ring-2 ring-[#B5FF45]/30 overflow-hidden">
                      {tempProfileData.avatar ? <img
    src={tempProfileData.avatar}
    alt="Avatar Preview"
    className="w-full h-full object-cover"
  /> : <User className="w-6 h-6 text-gray-400" />}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-white">Profile Photo</p>
                      <p className="text-[10px] text-gray-500">JPG, PNG or GIF. Max size of 2MB.</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-medium text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-1 cursor-pointer"
  >
                          <Upload className="w-3 h-3" />
                          Upload Photo
                        </button>
                        {tempProfileData.avatar && <button
    type="button"
    onClick={() => setTempProfileData((prev) => ({ ...prev, avatar: "" }))}
    className="px-3 py-1 rounded-lg bg-red-500/10 text-[10px] font-medium text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 transition-all flex items-center gap-1 cursor-pointer"
  >
                            <X className="w-3 h-3" />
                            Remove
                          </button>}
                        <input
    type="file"
    ref={fileInputRef}
    onChange={handleAvatarChange}
    accept="image/*"
    className="hidden"
  />
                      </div>
                    </div>
                  </div>

                  {
    /* Full Name */
  }
                  <div className="relative group">
                    <input
    type="text"
    id="editFullName"
    value={tempProfileData.fullName}
    onChange={(e) => setTempProfileData({ ...tempProfileData, fullName: e.target.value })}
    placeholder=" "
    className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
    required
  />
                    <label
    htmlFor="editFullName"
    className="absolute text-xs text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
  >
                      Full Name
                    </label>
                  </div>

                  {
    /* Email Address */
  }
                  <div className="relative group">
                    <input
    type="email"
    id="editEmail"
    value={tempProfileData.email}
    onChange={(e) => setTempProfileData({ ...tempProfileData, email: e.target.value })}
    placeholder=" "
    className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
    required
  />
                    <label
    htmlFor="editEmail"
    className="absolute text-xs text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
  >
                      Email Address
                    </label>
                  </div>

                  {
    /* Phone Number */
  }
                  <div className="relative group">
                    <input
    type="text"
    id="editPhone"
    value={tempProfileData.phone}
    onChange={(e) => setTempProfileData({ ...tempProfileData, phone: e.target.value })}
    placeholder=" "
    className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
  />
                    <label
    htmlFor="editPhone"
    className="absolute text-xs text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
  >
                      Mobile Number
                    </label>
                  </div>

                  {
    /* Location */
  }
                  <div className="relative group">
                    <input
    type="text"
    id="editLocation"
    value={tempProfileData.location}
    onChange={(e) => setTempProfileData({ ...tempProfileData, location: e.target.value })}
    placeholder=" "
    className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
  />
                    <label
    htmlFor="editLocation"
    className="absolute text-xs text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
  >
                      Location (City, Country)
                    </label>
                  </div>

                  {
    /* Education */
  }
                  <div className="relative group">
                    <input
    type="text"
    id="editEducation"
    value={tempProfileData.education}
    onChange={(e) => setTempProfileData({ ...tempProfileData, education: e.target.value })}
    placeholder=" "
    className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
  />
                    <label
    htmlFor="editEducation"
    className="absolute text-xs text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
  >
                      Education / College Branch
                    </label>
                  </div>

                  {
    /* Skills Tag Field */
  }
                  <div className="space-y-2">
                    <div className="relative group">
                      <input
    type="text"
    id="editSkills"
    value={tempProfileData.skills}
    onChange={(e) => setTempProfileData({ ...tempProfileData, skills: e.target.value })}
    placeholder=" "
    className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
  />
                      <label
    htmlFor="editSkills"
    className="absolute text-xs text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
  >
                        Skills (comma-separated)
                      </label>
                    </div>

                    {
    /* visual rendering of tags */
  }
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tempProfileData.skills.split(",").filter((s) => s.trim()).map((skill, index) => <span
    key={index}
    className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300 flex items-center gap-1"
  >
                          {skill.trim()}
                        </span>)}
                    </div>
                  </div>

                  {
    /* LinkedIn */
  }
                  <div className="relative group">
                    <input
    type="text"
    id="editLinkedin"
    value={tempProfileData.linkedin}
    onChange={(e) => setTempProfileData({ ...tempProfileData, linkedin: e.target.value })}
    placeholder=" "
    className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
  />
                    <label
    htmlFor="editLinkedin"
    className="absolute text-xs text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
  >
                      LinkedIn Profile Link
                    </label>
                  </div>

                  {
    /* GitHub */
  }
                  <div className="relative group">
                    <input
    type="text"
    id="editGithub"
    value={tempProfileData.github}
    onChange={(e) => setTempProfileData({ ...tempProfileData, github: e.target.value })}
    placeholder=" "
    className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
  />
                    <label
    htmlFor="editGithub"
    className="absolute text-xs text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
  >
                      GitHub Profile Link
                    </label>
                  </div>

                  {
    /* Tagline */
  }
                  <div className="relative group">
                    <input
    type="text"
    id="editTagline"
    value={tempProfileData.tagline}
    onChange={(e) => setTempProfileData({ ...tempProfileData, tagline: e.target.value })}
    placeholder=" "
    className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
  />
                    <label
    htmlFor="editTagline"
    className="absolute text-xs text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
  >
                      Career Tagline
                    </label>
                  </div>

                  {
    /* Save & Cancel buttons */
  }
                  <div className="flex items-center gap-3 pt-3">
                    <button
    type="button"
    onClick={() => setIsEditModalOpen(false)}
    className="flex-1 py-3 text-xs font-semibold rounded-xl border border-white/10 hover:bg-white/5 transition-all cursor-pointer text-gray-300"
  >
                      Cancel
                    </button>
                    <button
    type="submit"
    className="flex-1 py-3 text-xs font-bold text-[#05080D] bg-gradient-to-r from-[#B5FF45] to-[#9AE52B] rounded-xl shadow-[0_4px_15px_rgba(181,255,69,0.2)] hover:shadow-[0_4px_20px_rgba(181,255,69,0.35)] transition-all cursor-pointer"
  >
                      Save Changes
                    </button>
                  </div>

                </form>
              </div>

            </motion.div>
          </div>}
      </AnimatePresence>

      {
    /* Password Change Modal */
  }
      <AnimatePresence>
        {showPasswordModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            
            <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setShowPasswordModal(false)}
    className="absolute inset-0 bg-[#05080D]/85 backdrop-blur-md"
  />

            <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    className="relative w-full max-w-[420px] bg-[#0B0F19]/95 border border-white/10 p-6 sm:p-8 rounded-[24px] shadow-2xl z-10 space-y-6"
  >
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white font-heading">Change Password</h3>
                <p className="text-xs text-gray-500 font-sans">Ensure a secure credential combination to protect your placement data.</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                
                {
    /* Current Password */
  }
                <div className="relative group">
                  <input
    type={showCurrentPass ? "text" : "password"}
    value={passwordForm.currentPassword}
    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
    placeholder=" "
    className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
    required
  />
                  <label className="absolute text-xs text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]">
                    Current Password
                  </label>
                  <button
    type="button"
    onClick={() => setShowCurrentPass(!showCurrentPass)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors outline-none cursor-pointer"
  >
                    {showCurrentPass ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>

                {
    /* New Password */
  }
                <div className="relative group">
                  <input
    type={showNewPass ? "text" : "password"}
    value={passwordForm.newPassword}
    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
    placeholder=" "
    className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
    required
  />
                  <label className="absolute text-xs text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]">
                    New Password
                  </label>
                  <button
    type="button"
    onClick={() => setShowNewPass(!showNewPass)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors outline-none cursor-pointer"
  >
                    {showNewPass ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>

                {
    /* Confirm New Password */
  }
                <div className="relative group">
                  <input
    type="password"
    value={passwordForm.confirmPassword}
    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
    placeholder=" "
    className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
    required
  />
                  <label className="absolute text-xs text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]">
                    Confirm New Password
                  </label>
                </div>

                {
    /* Action Buttons */
  }
                <div className="flex items-center gap-3 pt-2">
                  <button
    type="button"
    onClick={() => setShowPasswordModal(false)}
    className="flex-1 py-3 text-xs font-semibold rounded-xl border border-white/10 hover:bg-white/5 transition-all cursor-pointer text-gray-300"
  >
                    Cancel
                  </button>
                  <button
    type="submit"
    className="flex-1 py-3 text-xs font-bold text-[#05080D] bg-gradient-to-r from-[#B5FF45] to-[#9AE52B] rounded-xl shadow-[0_4px_15px_rgba(181,255,69,0.2)] hover:shadow-[0_4px_20px_rgba(181,255,69,0.35)] transition-all cursor-pointer"
  >
                    Update Password
                  </button>
                </div>

              </form>
            </motion.div>
          </div>}
      </AnimatePresence>

      {
    /* Notification Preferences Modal */
  }
      <AnimatePresence>
        {showNotificationsModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setShowNotificationsModal(false)}
    className="absolute inset-0 bg-[#05080D]/85 backdrop-blur-md"
  />

            <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    className="relative w-full max-w-[440px] bg-[#0B0F19]/95 border border-white/10 p-6 sm:p-8 rounded-[24px] shadow-2xl z-10 space-y-5"
  >
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white font-heading">Notification Preferences</h3>
                <p className="text-xs text-gray-500 font-sans">Pick your preferred notification distribution targets</p>
              </div>

              <div className="space-y-4 pt-2">
                {[
    { key: "companyAlerts", name: "Recruitment & Company Alerts", desc: "Real-time alert when target companies announce hiring drives" },
    { key: "weeklyProgress", name: "Weekly Analytical Reports", desc: "Weekly progress reports sent directly to your email address" },
    { key: "aiRecommendations", name: "AI Recommendations Ready", desc: "Alert when placement recommendation patterns update" }
  ].map((item) => {
    const active = notifications[item.key];
    return <div key={item.key} className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                      <div className="max-w-[70%]">
                        <p className="text-xs font-semibold text-white">{item.name}</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                      <button
      onClick={() => {
        setNotifications((prev) => ({ ...prev, [item.key]: !active }));
        triggerToast("Preference state updated!", "success");
      }}
      className={`px-3 py-1 rounded-full text-[10px] font-mono hover:opacity-90 transition-all ${active ? "bg-[#B5FF45]/15 border border-[#B5FF45]/30 text-[#B5FF45]" : "bg-white/5 border border-white/10 text-gray-400"}`}
    >
                        {active ? "Active" : "Disabled"}
                      </button>
                    </div>;
  })}
              </div>

              <button
    onClick={() => setShowNotificationsModal(false)}
    className="w-full py-3 text-xs font-bold text-[#05080D] bg-gradient-to-r from-[#B5FF45] to-[#9AE52B] rounded-xl cursor-pointer shadow-md"
  >
                Save Preferences
              </button>
            </motion.div>
          </div>}
      </AnimatePresence>

      {
    /* Privacy Discovery Preferences Modal */
  }
      <AnimatePresence>
        {showPrivacyModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setShowPrivacyModal(false)}
    className="absolute inset-0 bg-[#05080D]/85 backdrop-blur-md"
  />

            <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    className="relative w-full max-w-[440px] bg-[#0B0F19]/95 border border-white/10 p-6 sm:p-8 rounded-[24px] shadow-2xl z-10 space-y-5"
  >
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white font-heading">Privacy & Discoverability</h3>
                <p className="text-xs text-gray-500 font-sans">Manage who can view your placement achievements</p>
              </div>

              <div className="space-y-4 pt-2">
                {[
    { key: "discoverable", name: "Open to Recruiters", desc: "Allow verified technology recruiters to search and view your placement credentials" },
    { key: "shareMetrics", name: "Share Progress Metrics", desc: "Allow study members to view and compare your public metrics on leaderboards" }
  ].map((item) => {
    const active = privacy[item.key];
    return <div key={item.key} className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                      <div className="max-w-[70%]">
                        <p className="text-xs font-semibold text-white">{item.name}</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                      <button
      onClick={() => {
        setPrivacy((prev) => ({ ...prev, [item.key]: !active }));
        triggerToast("Privacy toggle changed!", "success");
      }}
      className={`px-3 py-1 rounded-full text-[10px] font-mono hover:opacity-90 transition-all ${active ? "bg-[#B5FF45]/15 border border-[#B5FF45]/30 text-[#B5FF45]" : "bg-white/5 border border-white/10 text-gray-400"}`}
    >
                        {active ? "Allowed" : "Private"}
                      </button>
                    </div>;
  })}
              </div>

              <button
    onClick={() => setShowPrivacyModal(false)}
    className="w-full py-3 text-xs font-bold text-[#05080D] bg-gradient-to-r from-[#B5FF45] to-[#9AE52B] rounded-xl cursor-pointer shadow-md"
  >
                Close Settings
              </button>
            </motion.div>
          </div>}
      </AnimatePresence>

    </div>;
}
