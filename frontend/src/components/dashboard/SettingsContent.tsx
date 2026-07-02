import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Lock, Bell, Check, LogOut, ChevronRight, Globe, 
  Briefcase, Award, Linkedin, Github, Sparkles, Shield, BookOpen, Brain, 
  Database, Network, X, Upload, HelpCircle, Trash2, Settings, FileText, 
  Download, RefreshCw, AlertTriangle, Star, Key, Share2, Eye, EyeOff, 
  MapPin, CheckCircle2, ShieldAlert, Laptop, EyeOff as EyeOffIcon, Info, HelpCircle as HelpIcon, Flame, Youtube, Instagram
} from 'lucide-react';

interface SettingsContentProps {
  onSignOut: () => void;
}

export function SettingsContent({ onSignOut }: SettingsContentProps) {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // States for interactive items
  const [isPremium, setIsPremium] = useState(true);
  const [showManagePlanModal, setShowManagePlanModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  
  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Section 1 - Account Details State
  const [accountInfo, setAccountInfo] = useState({
    fullName: 'Anuska Goswami',
    email: 'anuskagoswami643@gmail.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    memberSince: 'January 12, 2026',
    lastLogin: 'Today, 11:14 AM (from Bangalore, India)'
  });

  // Section 2 - Notifications Preferences State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    placementAlerts: true,
    mockTestReminders: true,
    dailyStudyReminders: true,
    aiRecommendations: true,
    companyRecruitment: true,
    weeklyProgress: true,
    productUpdates: false
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      triggerToast(
        `${(key as string).replace(/([A-Z])/g, ' $1').trim()} updated!`,
        'success'
      );
      return updated;
    });
  };

  // Section 3 - Study Preferences State
  const [studyGoalHours, setStudyGoalHours] = useState(4);
  const [preferredStudyTime, setPreferredStudyTime] = useState('evening');
  const [preferredLanguage, setPreferredLanguage] = useState('english');
  const [reminderFrequency, setReminderFrequency] = useState('daily');
  const [targetMonth, setTargetMonth] = useState('August 2026');
  const [preferredCompanyCategories, setPreferredCompanyCategories] = useState<string[]>(['MAANG', 'FinTech']);
  const [preferredJobRole, setPreferredJobRole] = useState('SDE');
  const [aiIntensity, setAiIntensity] = useState('standard');

  const toggleCompanyCategory = (cat: string) => {
    setPreferredCompanyCategories(prev => {
      const exists = prev.includes(cat);
      const updated = exists ? prev.filter(c => c !== cat) : [...prev, cat];
      triggerToast(`Company categories updated.`, 'info');
      return updated;
    });
  };

  // Section 4 - Appearance State (Affects Live Preview Card)
  const [fontStyle, setFontStyle] = useState<'small' | 'medium' | 'large'>('medium');
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Section 5 - Privacy & Security State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  
  const [activeDevices, setActiveDevices] = useState([
    { id: '1', name: 'MacBook Pro 16"', browser: 'Chrome 124', os: 'macOS Sonoma', lastActive: 'Active now (Bangalore, India)', current: true },
    { id: '2', name: 'iPhone 15 Pro Max', browser: 'Safari Mobile', os: 'iOS 17.4', lastActive: '2 hours ago', current: false },
    { id: '3', name: 'Dell XPS Desktop', browser: 'Firefox 125', os: 'Windows 11', lastActive: 'Yesterday, 4:25 PM', current: false }
  ]);

  const handleLogoutDevice = (id: string) => {
    setActiveDevices(prev => prev.filter(d => d.id !== id));
    triggerToast('Logged out of device successfully.', 'success');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      triggerToast('Please enter your current password.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      triggerToast('New password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      triggerToast('Passwords do not match.', 'error');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    triggerToast('Password changed successfully!', 'success');
  };

  // Section 6 - Connected Accounts State
  const [connectedGoogle, setConnectedGoogle] = useState(true);
  const [connectedLinkedIn, setConnectedLinkedIn] = useState(false);

  // Section 7 - Resume & Career State
  const [careerPrefs, setCareerPrefs] = useState({
    jobRole: 'Software Development Engineer (SDE)',
    industry: 'Technology / Software',
    location: 'Bangalore, Hyderabad, Remote',
    visibility: 'partners', // public, private, partners
    openToOpp: true,
    lastUpdated: 'June 18, 2026',
    completion: 85
  });

  const [resumeFile, setResumeFile] = useState<{ name: string; size: string } | null>({
    name: 'Anuska_Goswami_Resume_SDE.pdf',
    size: '1.4 MB'
  });
  const [isDraggingResume, setIsDraggingResume] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingResume(true);
  };

  const handleDragLeave = () => {
    setIsDraggingResume(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingResume(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setResumeFile({ name: file.name, size: (file.size / (1024 * 1024)).toFixed(1) + ' MB' });
      setCareerPrefs(prev => ({ ...prev, completion: 100, lastUpdated: 'Today' }));
      triggerToast('Resume uploaded and parsed successfully!', 'success');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile({ name: file.name, size: (file.size / (1024 * 1024)).toFixed(1) + ' MB' });
      setCareerPrefs(prev => ({ ...prev, completion: 100, lastUpdated: 'Today' }));
      triggerToast('Resume uploaded and parsed successfully!', 'success');
    }
  };

  // Section 8 - Data & Storage State
  const [cacheSize, setCacheSize] = useState('4.2 MB');
  const [isClearingCache, setIsClearingCache] = useState(false);

  const handleClearCache = () => {
    setIsClearingCache(true);
    setTimeout(() => {
      setCacheSize('0.0 KB');
      setIsClearingCache(false);
      triggerToast('Local cache cleared completely.', 'success');
    }, 1500);
  };

  // Section 10 - Rate Kramik State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Section 11 - Danger Zone Actions
  const handleDeleteAccount = () => {
    if (deleteConfirmationText !== 'DELETE MY ACCOUNT') {
      triggerToast('Please type DELETE MY ACCOUNT to confirm.', 'error');
      return;
    }
    triggerToast('Account deletion scheduled. Logging out...', 'info');
    setTimeout(() => {
      onSignOut();
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 relative z-10 max-w-7xl mx-auto pb-24">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg font-sans text-xs ${
              toast.type === 'success' 
                ? 'bg-[#B5FF45]/10 border-[#B5FF45]/30 text-white' 
                : toast.type === 'error'
                  ? 'bg-red-500/10 border-red-500/20 text-red-200'
                  : 'bg-[#00D8F6]/10 border-[#00D8F6]/20 text-white'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#B5FF45]" />}
            {toast.type === 'error' && <ShieldAlert className="w-4 h-4 text-red-400" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight text-white flex items-center gap-2.5">
            Settings
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-xl font-sans">
            Manage your account, preferences, notifications, privacy, and application settings.
          </p>
        </div>

        {/* Account Status Card / Manage Plan */}
        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-2xl sm:self-center">
          <div className="text-left shrink-0">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Account Type</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${isPremium ? 'bg-[#B5FF45] animate-pulse shadow-[0_0_8px_#B5FF45]' : 'bg-gray-400'}`} />
              <span className="text-xs font-bold text-white">{isPremium ? 'Kramik Premium' : 'Free Account'}</span>
            </div>
          </div>
          <button 
            onClick={() => setShowManagePlanModal(true)}
            className="px-3.5 py-2 bg-[#B5FF45] hover:bg-[#a1e63d] text-[#05080D] rounded-xl text-xs font-bold transition-all duration-300 hover:shadow-[0_0_15px_rgba(181,255,69,0.3)] shrink-0"
          >
            Manage Plan
          </button>
        </div>
      </div>

      {/* Main Grid: Left is forms/settings, Right is helper panels like live preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column - Core Forms (Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1 - Account Information */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl space-y-6 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <div className="p-2 bg-[#B5FF45]/10 rounded-xl">
                <User className="w-4 h-4 text-[#B5FF45]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Account Information</h3>
                <p className="text-[11px] text-gray-500">Your core account identity and access details</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
              <div className="relative group self-center sm:self-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#B5FF45]/40 group-hover:border-[#B5FF45] transition-colors">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" alt="Profile avatar" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 space-y-1.5 text-center sm:text-left">
                <h4 className="text-sm font-semibold text-white">{accountInfo.fullName}</h4>
                <p className="text-xs text-gray-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3 h-3 text-gray-500" /> {accountInfo.email}
                </p>
                <p className="text-xs text-gray-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <Phone className="w-3 h-3 text-gray-500" /> {accountInfo.phone}
                </p>
              </div>
              <button 
                onClick={() => navigate('/profile')}
                className="w-full sm:w-auto px-4 py-2 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] text-white rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                Edit Profile <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                <span className="text-gray-500 font-medium">Account Status</span>
                <p className="text-white font-bold">{isPremium ? 'Premium Plan (Active)' : 'Free Tier'}</p>
              </div>
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                <span className="text-gray-500 font-medium">Member Since</span>
                <p className="text-white font-bold">{accountInfo.memberSince}</p>
              </div>
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl sm:col-span-2 space-y-1">
                <span className="text-gray-500 font-medium">Last Authenticated Login</span>
                <p className="text-white font-mono text-[11px]">{accountInfo.lastLogin}</p>
              </div>
            </div>
          </motion.div>

          {/* Section 2 - Notification Preferences */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl space-y-6 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <div className="p-2 bg-[#B5FF45]/10 rounded-xl">
                <Bell className="w-4 h-4 text-[#B5FF45]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Notification Preferences</h3>
                <p className="text-[11px] text-gray-500">Configure how and when you want to receive alerts</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { key: 'emailNotifications', name: 'Email Notifications', desc: 'Receive critical placement digests, invitations, and reports via your inbox' },
                { key: 'pushNotifications', name: 'Push Notifications', desc: 'Instant visual browser updates on mock tests and study milestones' },
                { key: 'placementAlerts', name: 'Placement Alerts', desc: 'Get notified immediately when partner companies open placement opportunities matching your criteria' },
                { key: 'mockTestReminders', name: 'Mock Test Reminders', desc: 'Receive custom schedules and warnings before assigned mock tests begin' },
                { key: 'dailyStudyReminders', name: 'Daily Study Reminders', desc: 'Stay on track with customized reminder intervals to maintain your preparation streak' },
                { key: 'aiRecommendations', name: 'AI Recommendations', desc: 'Get dynamic alerts when the AI Mentor identifies high-priority weakness revisions' },
                { key: 'companyRecruitment', name: 'Company Recruitment Alerts', desc: 'Direct recruiter shortlists, interview scheduling requests, and assessment flags' },
                { key: 'weeklyProgress', name: 'Weekly Progress Reports', desc: 'Comprehensive analytics report containing structured scoring and subject completions' },
                { key: 'productUpdates', name: 'Product Updates', desc: 'Feature announcements, platform version updates, and core curriculum additions' }
              ].map((item) => {
                const isActive = notifications[item.key as keyof typeof notifications];
                return (
                  <div key={item.key} className="flex items-center justify-between p-3.5 bg-white/[0.01] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                    <div className="max-w-[75%] pr-4">
                      <span className="text-xs font-semibold text-white block">{item.name}</span>
                      <span className="text-[10px] text-gray-500 leading-relaxed block mt-0.5">{item.desc}</span>
                    </div>
                    
                    {/* Premium Animated Switch Toggle */}
                    <button
                      onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                      className={`relative w-11 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
                        isActive ? 'bg-[#B5FF45]' : 'bg-white/10'
                      }`}
                    >
                      <motion.div 
                        layout
                        className={`w-5 h-5 rounded-full shadow-md transition-all ${
                          isActive ? 'bg-[#05080D]' : 'bg-gray-400'
                        }`}
                        animate={{ x: isActive ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Section 3 - Study Preferences */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl space-y-6 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <div className="p-2 bg-[#B5FF45]/10 rounded-xl">
                <Brain className="w-4 h-4 text-[#B5FF45]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Study Preferences</h3>
                <p className="text-[11px] text-gray-500">Personalize your learning targets and recommendation model settings</p>
              </div>
            </div>

            <div className="space-y-5">
              
              {/* Slider: Daily Study Goal */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-white">Daily Study Goal (Hours)</label>
                  <span className="font-mono text-[#B5FF45] bg-[#B5FF45]/10 px-2 py-0.5 rounded-lg text-[11px] font-bold">
                    {studyGoalHours} Hours / day
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="12" 
                  value={studyGoalHours}
                  onChange={(e) => setStudyGoalHours(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#B5FF45]"
                />
                <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                  <span>1 Hour (Casual)</span>
                  <span>4 Hours (Recommended)</span>
                  <span>12 Hours (Intense)</span>
                </div>
              </div>

              {/* Grid dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Preferred Study Time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white block">Preferred Study Time</label>
                  <select 
                    value={preferredStudyTime}
                    onChange={(e) => setPreferredStudyTime(e.target.value)}
                    className="w-full h-10 px-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all"
                  >
                    <option value="morning" className="bg-[#05080D]">Morning (6 AM - 12 PM)</option>
                    <option value="afternoon" className="bg-[#05080D]">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening" className="bg-[#05080D]">Evening (5 PM - 9 PM)</option>
                    <option value="night" className="bg-[#05080D]">Night (9 PM - 2 AM)</option>
                  </select>
                </div>

                {/* Preferred Language */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white block">Preferred Study Language</label>
                  <select 
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full h-10 px-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all"
                  >
                    <option value="english" className="bg-[#05080D]">English</option>
                    <option value="hindi" className="bg-[#05080D]">Hindi</option>
                    <option value="hinglish" className="bg-[#05080D]">Hinglish</option>
                  </select>
                </div>

                {/* Reminder Frequency */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white block">Study Reminders Frequency</label>
                  <select 
                    value={reminderFrequency}
                    onChange={(e) => setReminderFrequency(e.target.value)}
                    className="w-full h-10 px-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all"
                  >
                    <option value="daily" className="bg-[#05080D]">Once a Day</option>
                    <option value="twice_daily" className="bg-[#05080D]">Twice a Day</option>
                    <option value="weekly" className="bg-[#05080D]">Weekly Digest Only</option>
                  </select>
                </div>

                {/* Target Placement Month */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white block">Target Placement Month</label>
                  <select 
                    value={targetMonth}
                    onChange={(e) => setTargetMonth(e.target.value)}
                    className="w-full h-10 px-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all"
                  >
                    <option value="July 2026" className="bg-[#05080D]">July 2026 (Urgent)</option>
                    <option value="August 2026" className="bg-[#05080D]">August 2026</option>
                    <option value="September 2026" className="bg-[#05080D]">September 2026</option>
                    <option value="October 2026" className="bg-[#05080D]">October 2026</option>
                    <option value="December 2026" className="bg-[#05080D]">December 2026</option>
                  </select>
                </div>

              </div>

              {/* Preferred Job Role Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">Preferred Placement Role</label>
                <input 
                  type="text" 
                  value={preferredJobRole} 
                  onChange={(e) => setPreferredJobRole(e.target.value)}
                  placeholder="e.g. SDE, Associate Engineer, Consultant"
                  className="w-full h-10 px-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all"
                />
              </div>

              {/* Company Categories (Chips selection) */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-white block">Target Company Categories</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['MAANG', 'Tier-2 Product', 'FinTech', 'Service-based', 'Early-stage Startups', 'Consulting'].map((cat) => {
                    const isSelected = preferredCompanyCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleCompanyCategory(cat)}
                        className={`p-2.5 rounded-xl border text-[11px] font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
                          isSelected 
                            ? 'bg-[#B5FF45]/10 border-[#B5FF45]/40 text-[#B5FF45]' 
                            : 'bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI Recommendation Intensity Tabs */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold text-white block">AI Recommendation Intensity</span>
                <div className="flex bg-white/[0.03] border border-white/10 p-1 rounded-xl">
                  {[
                    { id: 'basic', label: 'Basic' },
                    { id: 'standard', label: 'Standard (Recommended)' },
                    { id: 'advanced', label: 'Advanced AI Deep Analysis' }
                  ].map((tab) => {
                    const isActive = aiIntensity === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setAiIntensity(tab.id);
                          triggerToast(`Recommendation set to ${tab.label}`, 'info');
                        }}
                        className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all text-center ${
                          isActive 
                            ? 'bg-[#B5FF45] text-[#05080D] shadow-sm' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>

          {/* Section 5 - Privacy & Security */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl space-y-6 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <div className="p-2 bg-[#B5FF45]/10 rounded-xl">
                <Key className="w-4 h-4 text-[#B5FF45]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Privacy & Security</h3>
                <p className="text-[11px] text-gray-500">Manage credentials, two-factor authorization, and authenticated access points</p>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Form: Change Password */}
              <form onSubmit={handlePasswordChange} className="space-y-4 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                <span className="text-xs font-bold text-white block">Change Password</span>
                
                <div className="space-y-3">
                  <div className="relative">
                    <input 
                      type={showCurrentPass ? 'text' : 'password'} 
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full h-10 pl-3 pr-10 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    >
                      {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <input 
                        type={showNewPass ? 'text' : 'password'} 
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-10 pl-3 pr-10 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <input 
                      type="password" 
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-10 px-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Update Password
                  </button>
                </div>
              </form>

              {/* 2FA Toggle */}
              <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-white block">Two-Factor Authentication (2FA)</span>
                  <p className="text-[10px] text-gray-500 mt-0.5 max-w-sm">Secure your account with an authentication app like Google Authenticator or Duo Security.</p>
                </div>
                <button
                  onClick={() => {
                    setIs2FAEnabled(!is2FAEnabled);
                    triggerToast(`Two-factor authentication ${!is2FAEnabled ? 'enabled' : 'disabled'}!`, 'success');
                  }}
                  className={`relative w-11 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
                    is2FAEnabled ? 'bg-[#B5FF45]' : 'bg-white/10'
                  }`}
                >
                  <motion.div 
                    layout
                    className={`w-5 h-5 rounded-full shadow-md transition-all ${
                      is2FAEnabled ? 'bg-[#05080D]' : 'bg-gray-400'
                    }`}
                    animate={{ x: is2FAEnabled ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Active Devices Logins */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">Active Authenticated Devices</span>
                  <span className="text-[10px] text-[#B5FF45] font-mono font-bold bg-[#B5FF45]/10 px-2 py-0.5 rounded-md">
                    {activeDevices.length} Connected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <AnimatePresence>
                    {activeDevices.map((device) => (
                      <motion.div 
                        key={device.id}
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Laptop className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs font-semibold text-white">{device.name}</span>
                            {device.current && (
                              <span className="text-[8px] bg-[#B5FF45]/15 text-[#B5FF45] font-bold px-1.5 py-0.5 rounded font-mono">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500 font-sans">{device.browser} • {device.os}</p>
                          <p className="text-[9px] text-[#B5FF45]/80 font-mono">{device.lastActive}</p>
                        </div>

                        {!device.current && (
                          <button 
                            onClick={() => handleLogoutDevice(device.id)}
                            className="w-full py-1.5 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-300 text-[10px] font-bold rounded-lg transition-colors text-center"
                          >
                            Revoke Access
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Section 6 - Connected Accounts */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl space-y-6 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <div className="p-2 bg-[#B5FF45]/10 rounded-xl">
                <Share2 className="w-4 h-4 text-[#B5FF45]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Connected Accounts</h3>
                <p className="text-[11px] text-gray-500">Manage third-party authentication integrations and profiles</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Google Connection */}
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white text-xs font-bold font-mono">
                    G
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Google Account</span>
                    <span className={`text-[9px] font-mono ${connectedGoogle ? 'text-[#B5FF45]' : 'text-gray-500'}`}>
                      {connectedGoogle ? 'Connected as anuskagoswami...' : 'Disconnected'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setConnectedGoogle(!connectedGoogle);
                    triggerToast(`Google Account ${!connectedGoogle ? 'connected' : 'disconnected'}!`, 'info');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    connectedGoogle 
                      ? 'bg-white/5 text-gray-400 hover:text-red-400' 
                      : 'bg-[#B5FF45] text-[#05080D]'
                  }`}
                >
                  {connectedGoogle ? 'Disconnect' : 'Connect'}
                </button>
              </div>

              {/* LinkedIn Connection */}
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0077B5]/10 flex items-center justify-center text-[#0077B5]">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">LinkedIn Profile</span>
                    <span className={`text-[9px] font-mono ${connectedLinkedIn ? 'text-[#B5FF45]' : 'text-gray-500'}`}>
                      {connectedLinkedIn ? 'Connected Profile' : 'Not Connected'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setConnectedLinkedIn(!connectedLinkedIn);
                    triggerToast(`LinkedIn Account ${!connectedLinkedIn ? 'connected' : 'disconnected'}!`, 'info');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    connectedLinkedIn 
                      ? 'bg-white/5 text-gray-400 hover:text-red-400' 
                      : 'bg-[#B5FF45] text-[#05080D]'
                  }`}
                >
                  {connectedLinkedIn ? 'Disconnect' : 'Connect'}
                </button>
              </div>

            </div>
          </motion.div>

          {/* Section 7 - Resume & Career Preferences */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl space-y-6 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <div className="p-2 bg-[#B5FF45]/10 rounded-xl">
                <FileText className="w-4 h-4 text-[#B5FF45]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Resume & Career Preferences</h3>
                <p className="text-[11px] text-gray-500">Showcase your credentials and control visibility to verified technology recruiters</p>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Premium completion progress indicator */}
              <div className="space-y-2 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-white">Recruitment Profile Completion</span>
                  <span className="font-mono text-[#B5FF45] font-bold">{careerPrefs.completion}% Completed</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${careerPrefs.completion}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-[#B5FF45] to-[#80E600] rounded-full shadow-[0_0_10px_rgba(181,255,69,0.3)]"
                  />
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed pt-1">
                  Upload an updated PDF resume to complete your credentials profile. Completing your profile increases discovery rates by partner companies by 3x.
                </p>
              </div>

              {/* Upload Drop Zone */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${
                  isDraggingResume 
                    ? 'border-[#B5FF45] bg-[#B5FF45]/5 scale-[0.99]' 
                    : 'border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx"
                  className="hidden" 
                />
                <div className={`p-3 rounded-full ${isDraggingResume ? 'bg-[#B5FF45]/20' : 'bg-white/5'} transition-colors`}>
                  <Upload className={`w-5 h-5 ${isDraggingResume ? 'text-[#B5FF45]' : 'text-gray-400'}`} />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-xs font-semibold text-white">
                    {isDraggingResume ? 'Drop file to upload' : 'Click to upload or drag & drop'}
                  </p>
                  <p className="text-[10px] text-gray-500">Supports PDF, DOCX (Max 5MB)</p>
                </div>
              </div>

              {/* Uploaded File Item */}
              {resumeFile && (
                <div className="flex items-center justify-between p-3.5 bg-white/[0.01] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block truncate max-w-[180px] sm:max-w-xs">{resumeFile.name}</span>
                      <span className="text-[9px] text-gray-500 font-mono block">Size: {resumeFile.size} • Updated: {careerPrefs.lastUpdated}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setResumeFile(null);
                      setCareerPrefs(prev => ({ ...prev, completion: 70, lastUpdated: 'Not uploaded' }));
                      triggerToast('Resume removed.', 'info');
                    }}
                    className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Grid: Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Career Role Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white block">Preferred Industry Segment</label>
                  <select 
                    value={careerPrefs.industry}
                    onChange={(e) => setCareerPrefs(prev => ({ ...prev, industry: e.target.value }))}
                    className="w-full h-10 px-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all"
                  >
                    <option value="Technology / Software" className="bg-[#05080D]">Technology & SaaS</option>
                    <option value="Investment Banking / FinTech" className="bg-[#05080D]">Investment Banking & FinTech</option>
                    <option value="Management Consulting" className="bg-[#05080D]">Management Consulting</option>
                    <option value="Automotive & Core Engineering" className="bg-[#05080D]">Automotive & Core Systems</option>
                  </select>
                </div>

                {/* Target Cities/Locations */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white block">Preferred Job Locations</label>
                  <input 
                    type="text" 
                    value={careerPrefs.location}
                    onChange={(e) => setCareerPrefs(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full h-10 px-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all"
                  />
                </div>

                {/* Resume Visibility */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white block">Resume Discovery Visibility</label>
                  <select 
                    value={careerPrefs.visibility}
                    onChange={(e) => {
                      setCareerPrefs(prev => ({ ...prev, visibility: e.target.value }));
                      triggerToast('Resume visibility updated.', 'success');
                    }}
                    className="w-full h-10 px-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all"
                  >
                    <option value="partners" className="bg-[#05080D]">Partner Companies Only</option>
                    <option value="public" className="bg-[#05080D]">Public (Verifiable URL)</option>
                    <option value="private" className="bg-[#05080D]">Private (Only Me)</option>
                  </select>
                </div>

                {/* Open to Opportunities Toggle */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-white block">Open to Active Opportunities</span>
                  <div className="flex items-center justify-between h-10 px-3 bg-white/[0.01] border border-white/5 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-medium">Flag me as looking for jobs</span>
                    <button
                      onClick={() => {
                        setCareerPrefs(prev => ({ ...prev, openToOpp: !prev.openToOpp }));
                        triggerToast(`Recruiter flag updated.`, 'info');
                      }}
                      className={`relative w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
                        careerPrefs.openToOpp ? 'bg-[#B5FF45]' : 'bg-white/10'
                      }`}
                    >
                      <motion.div 
                        layout
                        className="w-4.5 h-4.5 rounded-full bg-[#05080D] shadow-md"
                        animate={{ x: careerPrefs.openToOpp ? 16 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>

        {/* Right Column - Preferences, Appearance Preview & Action Center (Span 1) */}
        <div className="space-y-8">
          
          {/* Section 4 - Appearance settings & Dynamic Live Preview Card */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl space-y-6 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <div className="p-2 bg-[#B5FF45]/10 rounded-xl">
                <Laptop className="w-4 h-4 text-[#B5FF45]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Appearance Preferences</h3>
                <p className="text-[11px] text-gray-500">Personalize themes, compact layouts, and animation effects</p>
              </div>
            </div>

            <div className="space-y-5">
              
              {/* Default Theme Indicator */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-300">Theme</span>
                <span className="px-3 py-1 bg-white/[0.03] border border-white/10 text-white rounded-lg font-bold font-mono text-[10px]">
                  Dark Theme (Default)
                </span>
              </div>

              {/* Accent Color Preview (Lime) */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-300">Accent Color</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#B5FF45] ring-2 ring-[#B5FF45]/30 shadow-[0_0_8px_#B5FF45]" />
                  <span className="font-semibold text-[11px] text-[#B5FF45] font-mono">Kramik Lime</span>
                </div>
              </div>

              {/* Font Size Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">Font Scaling</label>
                <div className="flex bg-white/[0.03] border border-white/10 p-1 rounded-xl">
                  {(['small', 'medium', 'large'] as const).map((sz) => {
                    const active = fontStyle === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => {
                          setFontStyle(sz);
                          triggerToast(`Font scaled to ${sz}`, 'info');
                        }}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all capitalize ${
                          active 
                            ? 'bg-[#B5FF45]/15 border border-[#B5FF45]/30 text-[#B5FF45]' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Appearance Switches */}
              <div className="space-y-3.5 pt-2">
                
                {/* Compact Mode */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">Compact Mode</span>
                    <span className="text-[9px] text-gray-500">Reduce spacing and grid cell sizes</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCompactMode(!isCompactMode);
                      triggerToast(`Compact layout ${!isCompactMode ? 'enabled' : 'disabled'}!`, 'info');
                    }}
                    className={`relative w-9 h-5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
                      isCompactMode ? 'bg-[#B5FF45]' : 'bg-white/10'
                    }`}
                  >
                    <motion.div 
                      layout
                      className="w-4 h-4 rounded-full bg-[#05080D]"
                      animate={{ x: isCompactMode ? 16 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* Animation Switch */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">Interactive Animations</span>
                    <span className="text-[9px] text-gray-500">Enable transitions and scale elevations</span>
                  </div>
                  <button
                    onClick={() => {
                      setAnimationsEnabled(!animationsEnabled);
                      triggerToast(`Animations ${!animationsEnabled ? 'enabled' : 'disabled'}!`, 'info');
                    }}
                    className={`relative w-9 h-5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
                      animationsEnabled ? 'bg-[#B5FF45]' : 'bg-white/10'
                    }`}
                  >
                    <motion.div 
                      layout
                      className="w-4 h-4 rounded-full bg-[#05080D]"
                      animate={{ x: animationsEnabled ? 16 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* Reduced Motion */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">Reduced Motion</span>
                    <span className="text-[9px] text-gray-500">Minimize movement speed across views</span>
                  </div>
                  <button
                    onClick={() => {
                      setReducedMotion(!reducedMotion);
                      triggerToast(`Reduced motion ${!reducedMotion ? 'enabled' : 'disabled'}!`, 'info');
                    }}
                    className={`relative w-9 h-5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
                      reducedMotion ? 'bg-[#B5FF45]' : 'bg-white/10'
                    }`}
                  >
                    <motion.div 
                      layout
                      className="w-4 h-4 rounded-full bg-[#05080D]"
                      animate={{ x: reducedMotion ? 16 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

              </div>

              {/* LIVE PREVIEW CARD */}
              <div className="border border-white/5 bg-white/[0.01] p-4 rounded-2xl space-y-3">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-mono">Live UI Preview Panel</span>
                
                <div className={`border border-white/10 bg-[#0B0F19] rounded-xl transition-all ${
                  isCompactMode ? 'p-2.5 space-y-2' : 'p-4 space-y-3'
                } ${
                  fontStyle === 'small' ? 'text-[10px]' : fontStyle === 'large' ? 'text-sm' : 'text-xs'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white font-heading">Aptitude Score</span>
                    <span className="text-[9px] font-mono font-bold bg-[#B5FF45]/10 text-[#B5FF45] px-1.5 py-0.5 rounded">
                      Top 5%
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span className="font-medium text-gray-300">Daily Streak: 12 Days</span>
                  </div>

                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#B5FF45] rounded-full" style={{ width: '85%' }} />
                    </div>
                    <p className="text-[8px] text-gray-500">Overall Progress: 85% completed</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Section 8 - Data & Storage */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl space-y-6 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <div className="p-2 bg-[#B5FF45]/10 rounded-xl">
                <Database className="w-4 h-4 text-[#B5FF45]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Data & Storage</h3>
                <p className="text-[11px] text-gray-500">Manage offline material caches, cached metrics and study progress exports</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                  <span className="text-gray-500 block">Bookmarks</span>
                  <span className="font-bold text-white font-mono">14 Saved</span>
                </div>
                <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                  <span className="text-gray-500 block">Downloaded Guides</span>
                  <span className="font-bold text-white font-mono">5 Guides</span>
                </div>
                <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                  <span className="text-gray-500 block">Active Study Cache</span>
                  <span className="font-bold text-white font-mono">{cacheSize}</span>
                </div>
                <div className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                  <span className="text-gray-500 block">Recruiter Data</span>
                  <span className="font-bold text-white font-mono">12.8 MB</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button 
                  onClick={handleClearCache}
                  disabled={isClearingCache}
                  className="w-full py-2.5 bg-white/5 hover:bg-red-500/10 hover:text-red-200 text-white font-bold rounded-xl text-xs transition-all border border-white/5 flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isClearingCache ? 'animate-spin text-red-400' : 'text-gray-400'}`} />
                  {isClearingCache ? 'Clearing Cache...' : 'Clear Device Cache'}
                </button>

                <button 
                  onClick={() => triggerToast('Study progress compiled and downloaded.', 'success')}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs transition-all border border-white/5 flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-gray-400" /> Export Learning Progress
                </button>

                <button 
                  onClick={() => triggerToast('Performance report downloaded successfully.', 'success')}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs transition-all border border-white/5 flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-gray-400" /> Download Performance Report
                </button>
              </div>

            </div>
          </motion.div>

          {/* Section 9 - Help & Support */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl space-y-6 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <div className="p-2 bg-[#B5FF45]/10 rounded-xl">
                <HelpCircle className="w-4 h-4 text-[#B5FF45]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Help & Support</h3>
                <p className="text-[11px] text-gray-500">Contact counselors, view guides, or read policies</p>
              </div>
            </div>

            <div className="space-y-1.5">
              {[
                { title: 'Help Center & Guides', onClick: () => triggerToast('Opening Help Center...', 'info') },
                { title: 'Frequently Asked Questions', onClick: () => triggerToast('Opening FAQs...', 'info') },
                { title: 'Contact Support Counselors', onClick: () => triggerToast('Redirecting to counselor chat...', 'success') },
                { title: 'Report a Platform Bug', onClick: () => triggerToast('Bug reporting ticket form loaded.', 'success') },
                { title: 'Suggest a Feature', onClick: () => triggerToast('Feature suggestions panel loaded.', 'success') },
                { title: 'Community Guidelines', onClick: () => triggerToast('Opening Guidelines...', 'info') },
                { title: 'Privacy Policy', onClick: () => triggerToast('Opening Privacy Policy...', 'info') },
                { title: 'Terms & Conditions', onClick: () => triggerToast('Opening Terms & Conditions...', 'info') }
              ].map((row, idx) => (
                <button
                  key={idx}
                  onClick={row.onClick}
                  className="w-full p-3 bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-xl text-xs text-gray-300 hover:text-white transition-all flex items-center justify-between group text-left"
                >
                  <span>{row.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Section 10 - About Kramik */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl space-y-6 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <div className="p-2 bg-[#B5FF45]/10 rounded-xl">
                <Award className="w-4 h-4 text-[#B5FF45]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">About Kramik</h3>
                <p className="text-[11px] text-gray-500">Software version, build logs, and social footprints</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5 p-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-center">
                <span className="text-[10px] text-gray-500 font-bold block uppercase tracking-wider">Kramik Engine</span>
                <p className="text-sm font-bold text-white">Version 1.4.2 Production</p>
                <p className="text-[10px] text-gray-500 leading-relaxed pt-1">
                  Kramik is an AI-powered placement preparation ecosystem designed to help students master aptitude, prepare core computer science topics, and crack dream careers.
                </p>
              </div>

              {/* Rating Star Interaction */}
              <div className="space-y-2 p-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-center">
                <span className="text-[10px] text-gray-500 font-bold block uppercase tracking-wider">Rate Kramik Platform</span>
                <div className="flex justify-center gap-1 py-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isLit = hoverRating !== null ? star <= hoverRating : star <= rating;
                    return (
                      <button
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        onClick={() => {
                          setRating(star);
                          triggerToast(`Thank you for rating us ${star}/5 stars!`, 'success');
                        }}
                        className="p-1 focus:outline-none transition-transform active:scale-90"
                      >
                        <Star className={`w-5 h-5 ${isLit ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                      </button>
                    );
                  })}
                </div>
                <p className="text-[9px] text-gray-500">Your feedback drives placement engine optimization.</p>
              </div>

              {/* Social Channels footprint */}
              <div className="flex justify-center items-center gap-4 py-2 border-t border-white/5 pt-4">
                {[
                  { Icon: Linkedin, href: 'https://linkedin.com' },
                  { Icon: Github, href: 'https://github.com' },
                  { Icon: Youtube, href: 'https://youtube.com' },
                  { Icon: Instagram, href: 'https://instagram.com' }
                ].map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white/[0.02] hover:bg-[#B5FF45] border border-white/5 text-gray-400 hover:text-[#05080D] rounded-xl transition-all hover:scale-110"
                  >
                    <soc.Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Section 11 - Danger Zone (Stays inside a separate block at the very bottom, red accents, subtle styling) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-red-500/10 bg-red-500/[0.01] p-5 sm:p-6 backdrop-blur-xl space-y-6 hover:border-red-500/20 transition-colors"
      >
        <div className="flex items-center gap-2 border-b border-red-500/10 pb-4">
          <div className="p-2 bg-red-500/10 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-red-200 font-heading">Danger Zone</h3>
            <p className="text-[11px] text-red-500/80">Destructive, irreversible account actions</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-950/10 border border-red-900/20 rounded-xl">
          <div className="space-y-1">
            <span className="text-xs font-bold text-white block">Terminate Study Session</span>
            <p className="text-[10px] text-gray-400 leading-relaxed max-w-md">Log out of your active browser session on this device. Your progress data is securely synced to the cloud.</p>
          </div>
          <button 
            onClick={onSignOut}
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5 text-gray-400" /> Log Out Session
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-950/10 border border-red-900/20 rounded-xl">
          <div className="space-y-1">
            <span className="text-xs font-bold text-red-200 block">Permanently Delete Account</span>
            <p className="text-[10px] text-gray-400 leading-relaxed max-w-md">Erase your learning credentials, custom statistics, mock test attempt archives, resume files, and synced progress history forever.</p>
          </div>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2.5 bg-red-500/15 hover:bg-red-500/20 border border-red-500/20 text-red-300 rounded-xl text-xs font-bold transition-all shrink-0"
          >
            Delete Account
          </button>
        </div>
      </motion.div>

      {/* MODAL: Manage Plan */}
      <AnimatePresence>
        {showManagePlanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowManagePlanModal(false)}
              className="absolute inset-0 bg-[#05080D]/85 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[500px] bg-[#0A0E17] border border-white/10 p-6 sm:p-8 rounded-[24px] shadow-2xl z-10 space-y-6"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#B5FF45] uppercase tracking-wider font-mono">Subscription Hub</span>
                  <h3 className="text-xl font-bold text-white font-heading">Manage Your Subscription</h3>
                </div>
                <button 
                  onClick={() => setShowManagePlanModal(false)}
                  className="p-1.5 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Plans Info Cards */}
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border transition-all ${
                  isPremium 
                    ? 'bg-[#B5FF45]/5 border-[#B5FF45]/30' 
                    : 'bg-white/[0.01] border-white/5'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-white">Kramik Premium Plan</span>
                      <p className="text-[10px] text-gray-400 mt-0.5">Full platform access, AI mentorship, verified recruiter matching</p>
                    </div>
                    {isPremium ? (
                      <span className="text-[10px] bg-[#B5FF45]/15 text-[#B5FF45] font-bold px-2 py-1 rounded">
                        Active Plan
                      </span>
                    ) : (
                      <button 
                        onClick={() => {
                          setIsPremium(true);
                          triggerToast('Upgraded to Kramik Premium successfully!', 'success');
                          setShowManagePlanModal(false);
                        }}
                        className="px-3 py-1 bg-[#B5FF45] hover:bg-[#a1e63d] text-[#05080D] rounded-lg text-[10px] font-bold transition-all"
                      >
                        Activate
                      </button>
                    )}
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-lg font-bold text-white">$19</span>
                    <span className="text-[10px] text-gray-500">/ month billed annually</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border transition-all ${
                  !isPremium 
                    ? 'bg-[#B5FF45]/5 border-[#B5FF45]/30' 
                    : 'bg-white/[0.01] border-white/5'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-white">Free Casual Prep Plan</span>
                      <p className="text-[10px] text-gray-400 mt-0.5">Basic daily practice, limited mock tests and subjects</p>
                    </div>
                    {!isPremium ? (
                      <span className="text-[10px] bg-[#B5FF45]/15 text-[#B5FF45] font-bold px-2 py-1 rounded">
                        Active Plan
                      </span>
                    ) : (
                      <button 
                        onClick={() => {
                          setIsPremium(false);
                          triggerToast('Downgraded to Free tier.', 'info');
                          setShowManagePlanModal(false);
                        }}
                        className="px-3 py-1 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-[10px] font-bold transition-all border border-white/10"
                      >
                        Downgrade
                      </button>
                    )}
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-lg font-bold text-white">$0</span>
                    <span className="text-[10px] text-gray-500">/ forever free</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-[10px] text-gray-500 leading-normal border-t border-white/5 pt-4">
                <p>Next billing date: <span className="text-gray-300">July 12, 2026</span></p>
                <p>Payment method connected: <span className="text-gray-300">Visa ending in •••• 4242</span></p>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowManagePlanModal(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all text-center border border-white/10"
                >
                  Close Manager
                </button>
                <button 
                  onClick={() => triggerToast('Redirecting to stripe portal...', 'info')}
                  className="flex-1 py-3 bg-[#B5FF45] hover:bg-[#a1e63d] text-[#05080D] rounded-xl text-xs font-bold transition-all text-center shadow-lg"
                >
                  Update Payment Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Delete Account Confirmation */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[440px] bg-[#0A0E17] border border-red-500/20 p-6 sm:p-8 rounded-[24px] shadow-2xl z-10 space-y-5"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-red-400">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Irreversible Action</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">Delete Your Account</h3>
                </div>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="p-1.5 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-red-950/10 border border-red-500/10 rounded-xl space-y-2 text-xs text-red-200">
                <p className="font-semibold">All data will be cleared forever:</p>
                <ul className="list-disc pl-4 space-y-1 text-gray-400 text-[11px]">
                  <li>Core Placement Progress metrics</li>
                  <li>Aptitude performance trackers</li>
                  <li>14 Saved bookmarks</li>
                  <li>Parsed resume files</li>
                </ul>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] text-gray-400 block font-sans">
                  Type <span className="font-bold text-red-400 font-mono">DELETE MY ACCOUNT</span> below to proceed:
                </label>
                <input 
                  type="text" 
                  value={deleteConfirmationText}
                  onChange={(e) => setDeleteConfirmationText(e.target.value)}
                  placeholder="DELETE MY ACCOUNT"
                  className="w-full h-10 px-3 bg-white/[0.03] border border-red-500/20 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 transition-all font-mono"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmationText('');
                  }}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all text-center"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmationText !== 'DELETE MY ACCOUNT'}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all text-center ${
                    deleteConfirmationText === 'DELETE MY ACCOUNT'
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                      : 'bg-red-500/20 text-red-300/40 cursor-not-allowed'
                  }`}
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
