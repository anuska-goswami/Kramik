import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Map, Plus, Search, Trash2, Edit2, Clock, CheckCircle, ListTodo, Award, Percent } from 'lucide-react';
import { Roadmap } from './types';
import { initialRoadmaps } from './mockData';
import { CreateRoadmapModal } from './CreateRoadmapModal';
import { DetailedRoadmapView } from './DetailedRoadmapView';

export function RoadmapContent() {
  // Load from localStorage or fallback to initialRoadmaps
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(() => {
    const saved = localStorage.getItem('kramik_roadmaps');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((r: any) => {
            if (!r.topics || !Array.isArray(r.topics)) {
              const topics: any[] = [];
              if (r.tasks && Array.isArray(r.tasks)) {
                r.tasks.forEach((task: any, idx: number) => {
                  topics.push({
                    id: task.id || `topic-${Date.now()}-${idx}`,
                    name: task.title || task.name || 'Untitled Topic',
                    subject: task.subject || (r.subjects && r.subjects[0]) || 'Aptitude',
                    completed: !!task.completed
                  });
                });
              } else if (r.selectedTopics && Array.isArray(r.selectedTopics)) {
                r.selectedTopics.forEach((tName: string, idx: number) => {
                  topics.push({
                    id: `topic-${Date.now()}-${idx}`,
                    name: tName,
                    subject: (r.subjects && r.subjects[0]) || 'Aptitude',
                    completed: false
                  });
                });
              }
              return {
                ...r,
                topics: topics
              };
            }
            return r;
          });
        }
      } catch (e) {
        console.error("Failed to parse kramik_roadmaps", e);
      }
    }
    return initialRoadmaps;
  });

  // Navigation / detailed view state
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  // Modal controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState<Roadmap | null>(null);

  // Save to localStorage whenever roadmaps state updates
  useEffect(() => {
    localStorage.setItem('kramik_roadmaps', JSON.stringify(roadmaps));
  }, [roadmaps]);

  // Handle Create or Update save
  const handleSaveRoadmap = (savedRoadmap: Roadmap) => {
    const exists = roadmaps.some(r => r.id === savedRoadmap.id);
    let updated: Roadmap[];
    if (exists) {
      updated = roadmaps.map(r => r.id === savedRoadmap.id ? savedRoadmap : r);
    } else {
      updated = [savedRoadmap, ...roadmaps];
    }
    setRoadmaps(updated);
  };

  // Delete roadmap
  const handleDeleteRoadmap = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this roadmap? This action cannot be undone.')) {
      setRoadmaps(prev => prev.filter(r => r.id !== id));
      if (selectedRoadmapId === id) {
        setSelectedRoadmapId(null);
      }
    }
  };

  // Edit roadmap
  const handleEditRoadmap = (roadmap: Roadmap, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRoadmap(roadmap);
    setIsModalOpen(true);
  };

  // Calculate stats
  const totalRoadmaps = roadmaps.length;
  const activeRoadmaps = roadmaps.filter(r => r.progress < 100).length;
  const overallProgress = totalRoadmaps > 0 
    ? Math.round(roadmaps.reduce((acc, r) => acc + r.progress, 0) / totalRoadmaps)
    : 0;

  // Filter roadmaps
  const filteredRoadmaps = roadmaps.filter(r => {
    const matchesSearch = r.goal.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const isActive = r.progress < 100;
    let matchesStatus = true;
    if (statusFilter === 'Active') matchesStatus = isActive;
    else if (statusFilter === 'Completed') matchesStatus = !isActive;

    return matchesSearch && matchesStatus;
  });

  // Find currently active detailed roadmap
  const selectedRoadmap = roadmaps.find(r => r.id === selectedRoadmapId);

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      <AnimatePresence mode="wait">
        {selectedRoadmapId && selectedRoadmap ? (
          // Detailed View Page
          <motion.div
            key="detailed-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <DetailedRoadmapView
              roadmap={selectedRoadmap}
              onBack={() => setSelectedRoadmapId(null)}
              onUpdateRoadmap={handleSaveRoadmap}
            />
          </motion.div>
        ) : (
          // Main Dashboard Page
          <motion.div
            key="main-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight flex items-center gap-3">
                  <Map className="w-8 h-8 text-[#B5FF45]" />
                  My Roadmap
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  Create your own study plan and track your progress.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingRoadmap(null);
                  setIsModalOpen(true);
                }}
                className="px-5 sm:px-6 h-11 rounded-xl text-xs sm:text-sm font-bold bg-[#B5FF45] text-[#05080D] hover:bg-[#8ccf32] active:scale-[0.98] transition-all flex items-center gap-2 shadow-[0_4px_16px_rgba(181,255,69,0.25)] cursor-pointer self-start sm:self-auto shrink-0"
              >
                <Plus className="w-4.5 h-4.5 stroke-[3px]" />
                Create Roadmap
              </button>
            </div>

            {/* Top Three Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Total Roadmaps */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between backdrop-blur-md">
                <div className="space-y-1">
                  <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider block">Total Roadmaps</span>
                  <span className="text-2xl font-black font-heading text-white">{totalRoadmaps}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <ListTodo className="w-5 h-5" />
                </div>
              </div>

              {/* Card 2: Active Roadmaps */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between backdrop-blur-md">
                <div className="space-y-1">
                  <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider block">Active Roadmaps</span>
                  <span className="text-2xl font-black font-heading text-white">{activeRoadmaps}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#B5FF45]/10 border border-[#B5FF45]/20 flex items-center justify-center text-[#B5FF45]">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              {/* Card 3: Overall Progress */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between backdrop-blur-md">
                <div className="space-y-1">
                  <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider block">Overall Progress</span>
                  <span className="text-2xl font-black font-heading text-white">{overallProgress}%</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Percent className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md">
              <div className="relative flex items-center flex-1">
                <Search className="w-4 h-4 text-text-secondary absolute left-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search goals, subjects, or topics..."
                  className="w-full bg-bg-primary/40 border border-border-custom rounded-xl pl-11 pr-4 h-11 text-xs text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 transition-all"
                />
              </div>

              <div className="flex bg-bg-primary/50 p-1 rounded-xl border border-border-custom">
                {(['All', 'Active', 'Completed'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`px-4.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      statusFilter === tab 
                        ? 'bg-[#B5FF45]/15 text-white border border-[#B5FF45]/20' 
                        : 'text-text-secondary hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Roadmaps Grid */}
            {filteredRoadmaps.length === 0 ? (
              <div className="p-16 text-center rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
                <Map className="w-12 h-12 text-text-secondary/40 mx-auto" />
                <div>
                  <h3 className="text-base font-bold text-white">No roadmaps found</h3>
                  <p className="text-xs text-text-secondary mt-1 max-w-sm mx-auto">
                    Try searching for another keyword or create a customized roadmap to start tracking your placement curriculum.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingRoadmap(null);
                    setIsModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#B5FF45] text-[#05080D] hover:bg-[#8ccf32] transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-[0_4px_12px_rgba(181,255,69,0.15)]"
                >
                  <Plus className="w-4 h-4 stroke-[3px]" />
                  Create Roadmap
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRoadmaps.map((roadmap) => {
                  const daysCompleted = Math.round((roadmap.progress / 100) * roadmap.days);
                  const isCompleted = roadmap.progress === 100;
                  
                  // Dynamically discover Today's Task
                  const nextUncompletedTopic = (roadmap.topics || []).find(t => !t.completed);
                  const todaysTaskText = nextUncompletedTopic 
                    ? nextUncompletedTopic.name 
                    : 'All topics completed! 🎉';

                  return (
                    <motion.div
                      key={roadmap.id}
                      whileHover={{ y: -4, borderColor: 'rgba(181, 255, 69, 0.25)' }}
                      onClick={() => setSelectedRoadmapId(roadmap.id)}
                      className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.03] transition-all cursor-pointer flex flex-col justify-between h-[340px] relative shadow-lg group"
                    >
                      {/* Top Row: Title & Completion Pill */}
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                            Duration: {roadmap.days} Days
                          </span>
                          <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${
                            isCompleted
                              ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                              : 'bg-[#B5FF45]/10 border-[#B5FF45]/20 text-[#B5FF45]'
                          }`}>
                            {isCompleted ? 'Completed' : 'Active'}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-white tracking-tight leading-snug line-clamp-2 group-hover:text-[#B5FF45] transition-colors">
                            {roadmap.goal}
                          </h3>
                          <p className="text-[10px] text-text-secondary mt-1">
                            Days Completed: <strong className="text-white font-semibold">{daysCompleted} / {roadmap.days} Days</strong>
                          </p>
                        </div>

                        {/* Middle Row: Today's Task Preview */}
                        <div className="bg-bg-primary/30 border border-white/5 p-3.5 rounded-xl space-y-1">
                          <span className="text-[9px] text-text-secondary font-bold uppercase tracking-wider block">Today's Task</span>
                          <span className="text-xs text-text-primary font-medium line-clamp-1 truncate block">
                            {todaysTaskText}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Row: Progress and Control Buttons */}
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-text-secondary font-medium">Roadmap Progress</span>
                            <span className="font-bold text-[#B5FF45]">{roadmap.progress}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${roadmap.progress}%` }}
                              transition={{ duration: 0.5 }}
                              className="h-full bg-gradient-to-r from-[#B5FF45] to-[#80E600] rounded-full shadow-[0_0_8px_rgba(181,255,69,0.3)]"
                            />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => handleEditRoadmap(roadmap, e)}
                              className="p-2 rounded-xl border border-white/5 bg-white/[0.01] text-text-secondary hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                              title="Edit Roadmap"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteRoadmap(roadmap.id, e)}
                              className="p-2 rounded-xl border border-white/5 bg-white/[0.01] text-text-secondary hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/10 transition-all cursor-pointer"
                              title="Delete Roadmap"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => setSelectedRoadmapId(roadmap.id)}
                            className="px-4.5 py-2 rounded-xl text-xs font-bold bg-[#B5FF45] text-[#05080D] hover:bg-[#8ccf32] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save / Edit Roadmap Modal */}
      <CreateRoadmapModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRoadmap(null);
        }}
        onSave={handleSaveRoadmap}
        initialRoadmap={editingRoadmap}
      />
    </div>
  );
}
