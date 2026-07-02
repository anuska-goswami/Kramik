import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User, Lock, Bell, Database, HelpCircle, LogOut, Check, Trash2, Download,
  Sparkles, Code, Volume2, Shield, Eye, EyeOff, Save, CheckCircle, Smartphone
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface SettingsContentProps {
  onSignOut: () => void;
}

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

export function SettingsContent({ onSignOut }: SettingsContentProps) {
  const { theme, toggleTheme } = useTheme();

  // Load profile from localStorage or default
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('kramik_profile');
    return saved ? JSON.parse(saved) : {
      fullName: 'Anushka Goswami',
      email: 'anuskagoswami643@gmail.com',
      college: 'National Institute of Technology',
      graduationYear: '2027',
      targetRole: 'Software Development Engineer (SDE)',
      github: 'https://github.com/anushka-goswami',
      linkedin: 'https://linkedin.com/in/anushkagoswami',
      dailyGoal: '2' // hours
    };
  });

  // Toggles state
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('kramik_notifications');
    return saved ? JSON.parse(saved) : {
      emailReminders: true,
      soundEffects: true,
      weeklyReport: true,
      mockUpdates: true,
      aiInsights: true,
      smsAlerts: false
    };
  });

  // Security Form
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false
  });

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // App preference
  const [appMode, setAppMode] = useState(() => {
    return localStorage.getItem('kramik_focus_mode') === 'true';
  });

  // active sub-section tab
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'security' | 'database' | 'help'>('profile');

  // Toasts list
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Trigger Toast helper
  const triggerToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Save profile to localStorage
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('kramik_profile', JSON.stringify(profile));
    triggerToast('Profile information saved successfully!', 'success');
  };

  // Toggle notifications config
  const handleToggleNotification = (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    localStorage.setItem('kramik_notifications', JSON.stringify(updated));
    
    // Format label for toast
    const label = (key as string)
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
    triggerToast(`${label} ${updated[key] ? 'enabled' : 'disabled'}`, 'info');
  };

  // Handle focus mode toggle
  const handleToggleFocusMode = () => {
    const nextVal = !appMode;
    setAppMode(nextVal);
    localStorage.setItem('kramik_focus_mode', String(nextVal));
    triggerToast(nextVal ? 'Sleek Focus Mode enabled!' : 'Standard Dashboard mode enabled!', 'success');
  };

  // Handle password update
  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!security.currentPassword) {
      triggerToast('Please provide your current password', 'error');
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      triggerToast('New passwords do not match!', 'error');
      return;
    }
    if (security.newPassword.length < 6) {
      triggerToast('Password must be at least 6 characters', 'error');
      return;
    }
    triggerToast('Password updated securely!', 'success');
    setSecurity({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactor: security.twoFactor
    });
  };

  // Toggle Two Factor
  const handleToggle2FA = () => {
    const updated = !security.twoFactor;
    setSecurity(prev => ({ ...prev, twoFactor: updated }));
    triggerToast(updated ? 'Two-Factor Authentication activated!' : 'Two-Factor Authentication deactivated', 'info');
  };

  // Clear local practice history
  const handleClearHistory = () => {
    if (window.confirm('Are you absolutely sure you want to clear your local mock tests and practice history? This action is irreversible.')) {
      // simulate clearing
      triggerToast('Local practice history cleared successfully.', 'success');
    }
  };

  // Factory reset app settings
  const handleFactoryReset = () => {
    if (window.confirm('This will restore all app settings, notification preferences, and local customizations to their factory defaults. Continue?')) {
      localStorage.removeItem('kramik_profile');
      localStorage.removeItem('kramik_notifications');
      localStorage.removeItem('kramik_focus_mode');
      triggerToast('Settings restored to defaults.', 'info');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  // Export profile backup (JSON)
  const handleDownloadBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ profile, notifications, theme, focusMode: appMode }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "kramik_profile_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('Backup JSON generated and downloaded!', 'success');
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto relative">
      
      {/* Toast Overlay */}
      <div className="fixed top-24 right-6 z-[999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`p-4 rounded-xl shadow-lg border text-sm font-medium flex items-center gap-2 pointer-events-auto backdrop-blur-md min-w-[280px]
                ${toast.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-200' 
                  : toast.type === 'error'
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-800 dark:text-rose-200'
                    : 'bg-blue-500/10 border-blue-500/20 text-blue-800 dark:text-blue-200'
                }
              `}
            >
              <CheckCircle className={`w-4 h-4 shrink-0 ${toast.type === 'success' ? 'text-emerald-500' : toast.type === 'error' ? 'text-rose-500' : 'text-blue-500'}`} />
              <span>{toast.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-1">System Settings</h1>
          <p className="text-sm text-text-secondary">Manage your profile, themes, notification triggers, and security controls.</p>
        </div>
        <button
          onClick={onSignOut}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 hover:border-red-500/50 bg-red-500/5 hover:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium transition-all duration-300 active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          Sign Out of Kramik
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Navigation Panel */}
        <div className="md:col-span-1 flex flex-col gap-1.5 bg-bg-secondary p-3 rounded-2xl border border-border-custom h-fit">
          <button
            onClick={() => setActiveSection('profile')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${activeSection === 'profile' 
                ? 'bg-accent-custom/10 text-accent-custom dark:bg-[#B5FF45]/10 dark:text-[#B5FF45]' 
                : 'text-text-secondary hover:text-text-primary hover:bg-item-hover'
              }
            `}
          >
            <User className="w-4 h-4" />
            My Profile
          </button>
          
          <button
            onClick={() => setActiveSection('notifications')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${activeSection === 'notifications' 
                ? 'bg-accent-custom/10 text-accent-custom dark:bg-[#B5FF45]/10 dark:text-[#B5FF45]' 
                : 'text-text-secondary hover:text-text-primary hover:bg-item-hover'
              }
            `}
          >
            <Bell className="w-4 h-4" />
            Notifications
          </button>

          <button
            onClick={() => setActiveSection('security')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${activeSection === 'security' 
                ? 'bg-accent-custom/10 text-accent-custom dark:bg-[#B5FF45]/10 dark:text-[#B5FF45]' 
                : 'text-text-secondary hover:text-text-primary hover:bg-item-hover'
              }
            `}
          >
            <Lock className="w-4 h-4" />
            Account Security
          </button>

          <button
            onClick={() => setActiveSection('database')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${activeSection === 'database' 
                ? 'bg-accent-custom/10 text-accent-custom dark:bg-[#B5FF45]/10 dark:text-[#B5FF45]' 
                : 'text-text-secondary hover:text-text-primary hover:bg-item-hover'
              }
            `}
          >
            <Database className="w-4 h-4" />
            Data & Backup
          </button>

          <button
            onClick={() => setActiveSection('help')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${activeSection === 'help' 
                ? 'bg-accent-custom/10 text-accent-custom dark:bg-[#B5FF45]/10 dark:text-[#B5FF45]' 
                : 'text-text-secondary hover:text-text-primary hover:bg-item-hover'
              }
            `}
          >
            <HelpCircle className="w-4 h-4" />
            Support Center
          </button>
        </div>

        {/* Right Content Panels */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            
            {/* PROFILE SECTION */}
            {activeSection === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-bg-secondary border border-border-custom rounded-3xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-2xl bg-accent-custom/10 text-accent-custom dark:text-[#B5FF45]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Profile Information</h3>
                    <p className="text-xs text-text-secondary">Personalize your candidate details to refine AI mock questions and reports.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Full name */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">Candidate Full Name</label>
                      <input
                        type="text"
                        required
                        value={profile.fullName}
                        onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                        className="w-full h-11 px-4 bg-item-hover border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-custom/50 focus:border-accent-custom transition-colors"
                      />
                    </div>

                    {/* Email address */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">Primary Contact Email</label>
                      <input
                        type="email"
                        required
                        value={profile.email}
                        onChange={e => setProfile({ ...profile, email: e.target.value })}
                        className="w-full h-11 px-4 bg-item-hover border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-custom/50 focus:border-accent-custom transition-colors"
                      />
                    </div>

                    {/* College */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">University / College</label>
                      <input
                        type="text"
                        value={profile.college}
                        onChange={e => setProfile({ ...profile, college: e.target.value })}
                        className="w-full h-11 px-4 bg-item-hover border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-custom/50 focus:border-accent-custom transition-colors"
                      />
                    </div>

                    {/* Graduation Year */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">Graduation Year</label>
                      <select
                        value={profile.graduationYear}
                        onChange={e => setProfile({ ...profile, graduationYear: e.target.value })}
                        className="w-full h-11 px-4 bg-item-hover border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-custom/50 focus:border-accent-custom transition-colors"
                      >
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                      </select>
                    </div>

                    {/* Target Role */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">Target Placement Role</label>
                      <input
                        type="text"
                        value={profile.targetRole}
                        placeholder="e.g. Frontend Engineer, Product Manager"
                        onChange={e => setProfile({ ...profile, targetRole: e.target.value })}
                        className="w-full h-11 px-4 bg-item-hover border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-custom/50 focus:border-accent-custom transition-colors"
                      />
                    </div>

                    {/* Daily Study Goal */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">Daily Preparation Goal (Hours)</label>
                      <select
                        value={profile.dailyGoal}
                        onChange={e => setProfile({ ...profile, dailyGoal: e.target.value })}
                        className="w-full h-11 px-4 bg-item-hover border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-custom/50 focus:border-accent-custom transition-colors"
                      >
                        <option value="1">1 Hour per day</option>
                        <option value="2">2 Hours per day</option>
                        <option value="3">3 Hours per day (Recommended)</option>
                        <option value="5">5+ Hours intensive</option>
                      </select>
                    </div>

                    {/* Github Link */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">GitHub Link</label>
                      <input
                        type="text"
                        value={profile.github}
                        onChange={e => setProfile({ ...profile, github: e.target.value })}
                        className="w-full h-11 px-4 bg-item-hover border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-custom/50 focus:border-accent-custom transition-colors"
                      />
                    </div>

                    {/* LinkedIn Link */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">LinkedIn Link</label>
                      <input
                        type="text"
                        value={profile.linkedin}
                        onChange={e => setProfile({ ...profile, linkedin: e.target.value })}
                        className="w-full h-11 px-4 bg-item-hover border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-custom/50 focus:border-accent-custom transition-colors"
                      />
                    </div>
                  </div>

                  {/* Aesthetic toggle item built inside profile for app layout focus */}
                  <div className="pt-4 border-t border-border-custom">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-accent-custom/5 border border-accent-custom/10">
                      <div className="flex gap-3">
                        <Code className="w-5 h-5 text-accent-custom mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-text-primary">Enable Aesthetic Focus Mode</p>
                          <p className="text-xs text-text-secondary">Simplifies navigation sidebars to maximize concentration while preparing code.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleToggleFocusMode}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${appMode ? 'bg-[#B5FF45]' : 'bg-text-secondary/30'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${appMode ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-custom text-white hover:opacity-90 font-bold text-sm transition-all duration-300 hover:scale-[1.01]"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* NOTIFICATIONS SECTION */}
            {activeSection === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-bg-secondary border border-border-custom rounded-3xl p-6 shadow-sm space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-accent-custom/10 text-accent-custom dark:text-[#B5FF45]">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Notification Triggers</h3>
                    <p className="text-xs text-text-secondary">Customize what alerts you receive and manage focus block triggers.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Email reminders */}
                  <div className="flex items-center justify-between py-4 border-b border-border-custom">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Email Placement Tips & reminders</p>
                      <p className="text-xs text-text-secondary">Receive structured preparation strategies, schedule reminders, and progress logs.</p>
                    </div>
                    <button
                      onClick={() => handleToggleNotification('emailReminders')}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${notifications.emailReminders ? 'bg-[#B5FF45]' : 'bg-text-secondary/30'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${notifications.emailReminders ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Sound Effects */}
                  <div className="flex items-center justify-between py-4 border-b border-border-custom">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Interactive Sound Effects</p>
                      <p className="text-xs text-text-secondary">Toggle audio feedback when completing mock test questions or achieving streak milestones.</p>
                    </div>
                    <button
                      onClick={() => handleToggleNotification('soundEffects')}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${notifications.soundEffects ? 'bg-[#B5FF45]' : 'bg-text-secondary/30'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${notifications.soundEffects ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Weekly report */}
                  <div className="flex items-center justify-between py-4 border-b border-border-custom">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Weekly AI Performance Summaries</p>
                      <p className="text-xs text-text-secondary">A detailed breakdown of core CS subjects studied and mock test accuracy insights.</p>
                    </div>
                    <button
                      onClick={() => handleToggleNotification('weeklyReport')}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${notifications.weeklyReport ? 'bg-[#B5FF45]' : 'bg-text-secondary/30'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${notifications.weeklyReport ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Mock Updates */}
                  <div className="flex items-center justify-between py-4 border-b border-border-custom">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Company Mock Test Releases</p>
                      <p className="text-xs text-text-secondary">Get real-time updates when standard placement test structures (e.g. TCS NQT, Infosys) are published.</p>
                    </div>
                    <button
                      onClick={() => handleToggleNotification('mockUpdates')}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${notifications.mockUpdates ? 'bg-[#B5FF45]' : 'bg-text-secondary/30'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${notifications.mockUpdates ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* AI insights */}
                  <div className="flex items-center justify-between py-4 border-b border-border-custom">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Custom AI Mentor Proactive Guidance</p>
                      <p className="text-xs text-text-secondary">Allow the AI agent to suggest subjects if you are lagging behind on specific core CS subjects.</p>
                    </div>
                    <button
                      onClick={() => handleToggleNotification('aiInsights')}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${notifications.aiInsights ? 'bg-[#B5FF45]' : 'bg-text-secondary/30'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${notifications.aiInsights ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* SMS alerts */}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">SMS Reminders & Instant Code Drills</p>
                      <p className="text-xs text-text-secondary">Receive daily micro-problems via phone SMS to keep your coding streak active.</p>
                    </div>
                    <button
                      onClick={() => handleToggleNotification('smsAlerts')}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${notifications.smsAlerts ? 'bg-[#B5FF45]' : 'bg-text-secondary/30'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${notifications.smsAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SECURITY SECTION */}
            {activeSection === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-bg-secondary border border-border-custom rounded-3xl p-6 shadow-sm space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-accent-custom/10 text-accent-custom dark:text-[#B5FF45]">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Account Security</h3>
                    <p className="text-xs text-text-secondary">Protect your placement portfolio and secure your login authorizations.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveSecurity} className="space-y-5">
                  <div className="space-y-4">
                    
                    {/* Current Password */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPass ? 'text' : 'password'}
                          value={security.currentPassword}
                          onChange={e => setSecurity({ ...security, currentPassword: e.target.value })}
                          className="w-full h-11 pl-4 pr-11 bg-item-hover border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-custom/50 focus:border-accent-custom transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                        >
                          {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">New Secure Password</label>
                      <div className="relative">
                        <input
                          type={showNewPass ? 'text' : 'password'}
                          value={security.newPassword}
                          onChange={e => setSecurity({ ...security, newPassword: e.target.value })}
                          className="w-full h-11 pl-4 pr-11 bg-item-hover border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-custom/50 focus:border-accent-custom transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                        >
                          {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPass ? 'text' : 'password'}
                          value={security.confirmPassword}
                          onChange={e => setSecurity({ ...security, confirmPassword: e.target.value })}
                          className="w-full h-11 pl-4 pr-11 bg-item-hover border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-custom/50 focus:border-accent-custom transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                        >
                          {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Multi factor option */}
                  <div className="p-4 bg-item-hover rounded-2xl border border-border-custom flex items-center justify-between">
                    <div className="flex gap-3">
                      <Shield className="w-5 h-5 text-accent-custom mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">Two-Factor Authenticator (2FA)</p>
                        <p className="text-xs text-text-secondary">Secures your study metrics using verified email token authorizations upon every sign-in request.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggle2FA}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${security.twoFactor ? 'bg-[#B5FF45]' : 'bg-text-secondary/30'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${security.twoFactor ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-custom text-white hover:opacity-90 font-bold text-sm transition-all duration-300 hover:scale-[1.01]"
                    >
                      <Save className="w-4 h-4" />
                      Update Password
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* DATA & BACKUP */}
            {activeSection === 'database' && (
              <motion.div
                key="database"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-bg-secondary border border-border-custom rounded-3xl p-6 shadow-sm space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-accent-custom/10 text-accent-custom dark:text-[#B5FF45]">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Data Management & Backup</h3>
                    <p className="text-xs text-text-secondary">Download copies of your studies or clear locally cached data securely.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  
                  {/* Backup Data */}
                  <div className="p-5 rounded-2xl border border-border-custom bg-item-hover flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <p className="text-sm font-bold text-text-primary">Download Data Backup</p>
                      <p className="text-xs text-text-secondary">Generates a JSON compilation containing your candidate profiles, study progress goals, and custom triggers.</p>
                    </div>
                    <button
                      onClick={handleDownloadBackup}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border-custom bg-bg-secondary text-text-primary hover:bg-item-hover text-sm font-semibold transition-all duration-300"
                    >
                      <Download className="w-4 h-4 text-accent-custom" />
                      Export Profile JSON
                    </button>
                  </div>

                  {/* Clear history */}
                  <div className="p-5 rounded-2xl border border-border-custom bg-item-hover flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <p className="text-sm font-bold text-text-primary">Flush Placement Progress History</p>
                      <p className="text-xs text-text-secondary">Clears locally cached mock test scores, complete lists, and answers without signing you out.</p>
                    </div>
                    <button
                      onClick={handleClearHistory}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear History
                    </button>
                  </div>

                  {/* Factory Reset */}
                  <div className="p-5 rounded-2xl border border-red-500/10 bg-red-500/[0.01] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <p className="text-sm font-bold text-red-600 dark:text-red-400">Total Factory Reset</p>
                      <p className="text-xs text-text-secondary">Restores all parameters, clear stored context profiles, resets toggles, and reboots application.</p>
                    </div>
                    <button
                      onClick={handleFactoryReset}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all duration-300"
                    >
                      Reset All Settings
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* HELP & SUPPORT SECTION */}
            {activeSection === 'help' && (
              <motion.div
                key="help"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-bg-secondary border border-border-custom rounded-3xl p-6 shadow-sm space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-accent-custom/10 text-accent-custom dark:text-[#B5FF45]">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Support & Documentation</h3>
                    <p className="text-xs text-text-secondary">Have issues with aptitude questions or platform compilation? Contact developer teams.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="p-5 rounded-2xl border border-border-custom bg-item-hover">
                    <h4 className="text-sm font-bold text-text-primary mb-2">CS Subjects Core Guides</h4>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4">Learn detailed structures of DBMS models, operating scheduling models, and system networking protocols.</p>
                    <a href="#subjects" className="text-xs font-semibold text-accent-custom dark:text-[#B5FF45] hover:underline inline-flex items-center gap-1">
                      Browse subjects database &rarr;
                    </a>
                  </div>

                  <div className="p-5 rounded-2xl border border-border-custom bg-item-hover">
                    <h4 className="text-sm font-bold text-text-primary mb-2">Submit Placement bug</h4>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4">Stuck on a test bug or inaccurate answer key? File a ticket to our editorial review team instantly.</p>
                    <button
                      onClick={() => triggerToast('Ticket requested! Support staff will reach out to you via email.', 'info')}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-bg-secondary text-text-primary border border-border-custom hover:bg-item-hover transition-colors"
                    >
                      Request Support Ticket
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-custom">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Sparkles className="w-4 h-4 text-accent-custom dark:text-[#B5FF45]" />
                    <span>Kramik platform version: <strong>v2.1.0-alpha (LTS)</strong>. Running safely on secure Node containers.</span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
