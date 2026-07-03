import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, Sparkles, CheckCircle2, TrendingUp,
  Plus, Upload, Edit, Copy, Download, Trash2, ArrowRight
} from 'lucide-react';
import { ResumeEditor } from './ResumeEditor';

export function ResumeBuilderContent() {
  const [view, setView] = useState<'list' | 'edit'>('list');

  const stats = [
    { label: 'Resume Completion', value: '0%', icon: CheckCircle2, highlight: true },
    { label: 'ATS Score', value: 'N/A', icon: TrendingUp },
    { label: 'AI Suggestions', value: '3 Pending', icon: Sparkles },
    { label: 'Total Resumes', value: '0', icon: FileText }
  ];

  if (view === 'edit') {
    return <ResumeEditor onBack={() => setView('list')} />;
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="p-6 lg:p-8 space-y-10 max-w-[1600px] mx-auto text-white"
    >
      {/* Hero Section */}
      <motion.div 
        variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold tracking-tight text-white mb-3">
            AI Resume Builder
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
            Create an ATS-friendly, professional resume in minutes with AI-powered suggestions and real-time feedback.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <button 
            onClick={() => setView('edit')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#B5FF45] text-[#05080D] rounded-xl font-semibold hover:bg-[#a0e63b] transition-all duration-300 shadow-[0_0_20px_rgba(181,255,69,0.3)]"
          >
            <Plus className="w-5 h-5" /> Create New Resume
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
            <Upload className="w-5 h-5" /> Import Existing Resume
          </button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div 
        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className={`relative overflow-hidden bg-[#0A0E17]/60 border ${stat.highlight ? 'border-[#B5FF45]/30' : 'border-white/5'} rounded-2xl p-5 hover:border-white/20 transition-all duration-300 group`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#B5FF45]/[0.02] rounded-full blur-[30px]" />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                </div>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.highlight ? 'bg-[#B5FF45]/10 text-[#B5FF45]' : 'bg-white/5 text-gray-400 group-hover:text-[#B5FF45] group-hover:bg-[#B5FF45]/10'} transition-colors`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Recent Resumes */}
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Your Resumes</h2>
          <p className="text-xs text-gray-400">Manage your saved resumes</p>
        </div>

        <div className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 text-gray-500">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No resumes yet</h3>
          <p className="text-sm text-gray-400 max-w-sm mb-6">You haven't created any resumes yet. Start by creating a new one or importing an existing resume.</p>
          <button 
            onClick={() => setView('edit')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#B5FF45]/10 text-[#B5FF45] border border-[#B5FF45]/20 hover:bg-[#B5FF45] hover:text-[#05080D] font-bold text-sm rounded-xl transition-all duration-300"
          >
            Create Your First Resume
          </button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 border-t border-border-custom pb-4">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Create Resume', icon: Plus },
            { label: 'Improve Resume with AI', icon: Sparkles },
            { label: 'Resume Score', icon: TrendingUp },
            { label: 'Download PDF', icon: Download },
            { label: 'Mock Interview', icon: FileText },
            { label: 'Company Preparation', icon: FileText },
          ].map((action, idx) => (
            <button key={idx} className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border border-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold text-gray-300 hover:text-white transition-all group">
              <action.icon className="w-4 h-4 text-gray-500 group-hover:text-[#B5FF45] transition-colors" />
              {action.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
