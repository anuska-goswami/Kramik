import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { Roadmap, RoadmapTopic, AVAILABLE_SUBJECTS, SUBJECT_TOPICS } from './types';

interface CreateRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (roadmap: Roadmap) => void;
  initialRoadmap?: Roadmap | null;
}

export function CreateRoadmapModal({ isOpen, onClose, onSave, initialRoadmap = null }: CreateRoadmapModalProps) {
  const [goal, setGoal] = useState('');
  const [days, setDays] = useState(30);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Track selected subjects and topics
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<{ name: string; subject: string }[]>([]);
  
  // Track which subject is currently expanded to view topics
  const [expandedSubject, setExpandedSubject] = useState<string | null>(AVAILABLE_SUBJECTS[0]);

  // Load initial data on edit
  useEffect(() => {
    if (initialRoadmap) {
      setGoal(initialRoadmap.goal);
      setDays(initialRoadmap.days);
      setStartDate(initialRoadmap.startDate);
      setSelectedSubjects(initialRoadmap.subjects);
      setSelectedTopics(
        (initialRoadmap.topics || []).map(t => ({ name: t.name, subject: t.subject }))
      );
    } else {
      // Reset form on create
      setGoal('');
      setDays(30);
      setStartDate(new Date().toISOString().split('T')[0]);
      setSelectedSubjects([]);
      setSelectedTopics([]);
      setExpandedSubject(AVAILABLE_SUBJECTS[0]);
    }
  }, [initialRoadmap, isOpen]);

  // Handle subject selection
  const handleToggleSubject = (subject: string) => {
    const isSelected = selectedSubjects.includes(subject);
    const topicsForSubject = SUBJECT_TOPICS[subject] || [];

    if (isSelected) {
      // Unselect subject & all its topics
      setSelectedSubjects(prev => prev.filter(s => s !== subject));
      setSelectedTopics(prev => prev.filter(t => t.subject !== subject));
    } else {
      // Select subject & all its topics by default
      setSelectedSubjects(prev => [...prev, subject]);
      const newTopics = topicsForSubject.map(name => ({ name, subject }));
      setSelectedTopics(prev => {
        const filtered = prev.filter(t => t.subject !== subject);
        return [...filtered, ...newTopics];
      });
      // Expand this subject to show topics
      setExpandedSubject(subject);
    }
  };

  // Handle individual topic selection
  const handleToggleTopic = (topicName: string, subject: string) => {
    const isTopicSelected = selectedTopics.some(t => t.name === topicName && t.subject === subject);
    
    if (isTopicSelected) {
      // Remove topic
      const updatedTopics = selectedTopics.filter(t => !(t.name === topicName && t.subject === subject));
      setSelectedTopics(updatedTopics);
      
      // If no topics left for this subject, unselect the subject too
      const hasAnyTopicLeft = updatedTopics.some(t => t.subject === subject);
      if (!hasAnyTopicLeft) {
        setSelectedSubjects(prev => prev.filter(s => s !== subject));
      }
    } else {
      // Add topic
      const updatedTopics = [...selectedTopics, { name: topicName, subject }];
      setSelectedTopics(updatedTopics);
      
      // Ensure subject is selected
      if (!selectedSubjects.includes(subject)) {
        setSelectedSubjects(prev => [...prev, subject]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;
    if (selectedTopics.length === 0) {
      alert('Please select at least one topic for your study plan.');
      return;
    }

    // Build the topics array with completion state
    const finalTopics: RoadmapTopic[] = selectedTopics.map((t, idx) => {
      // Look up if topic already existed and its completion state
      const existingTopic = (initialRoadmap?.topics || []).find(
        et => et.name === t.name && et.subject === t.subject
      );
      return {
        id: existingTopic?.id || `topic-${Date.now()}-${idx}`,
        name: t.name,
        subject: t.subject,
        completed: existingTopic?.completed || false
      };
    });

    // Calculate initial progress based on existing or 0
    const completedCount = finalTopics.filter(t => t.completed).length;
    const progress = finalTopics.length > 0 ? Math.round((completedCount / finalTopics.length) * 100) : 0;

    const savedRoadmap: Roadmap = {
      id: initialRoadmap?.id || `roadmap-${Date.now()}`,
      goal: goal.trim(),
      days: Number(days),
      startDate: startDate,
      subjects: selectedSubjects,
      topics: finalTopics,
      progress: progress,
      createdAt: initialRoadmap?.createdAt || new Date().toISOString().split('T')[0]
    };

    onSave(savedRoadmap);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl max-h-[90vh] bg-bg-secondary/95 border border-border-custom rounded-2xl flex flex-col shadow-2xl overflow-hidden z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-custom bg-bg-secondary/50 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#B5FF45]" />
            <h2 className="text-lg font-bold font-heading text-white">
              {initialRoadmap ? 'Edit Roadmap' : 'Create Custom Study Plan'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Goal Name */}
          <div className="space-y-2">
            <label htmlFor="goal" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Goal Name
            </label>
            <input
              id="goal"
              type="text"
              required
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Crack Google SDE-1, Master System Design, SQL Exam Prep"
              className="w-full h-11 px-4 rounded-xl bg-bg-primary/50 border border-border-custom text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 transition-all"
            />
          </div>

          {/* Duration & Start Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="days" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Number of Days to Complete
              </label>
              <input
                id="days"
                type="number"
                min="1"
                max="365"
                required
                value={days}
                onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                className="w-full h-11 px-4 rounded-xl bg-bg-primary/50 border border-border-custom text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="startDate" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-bg-primary/50 border border-border-custom text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 transition-all"
              />
            </div>
          </div>

          {/* Select Subjects & Topics */}
          <div className="space-y-3">
            <div>
              <span className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Select Subjects & Topics
              </span>
              <p className="text-[11px] text-text-secondary/80 mt-1">
                Select subjects and fine-tune individual topics to build your personalized study curriculum.
              </p>
            </div>

            <div className="border border-border-custom rounded-xl divide-y divide-border-custom overflow-hidden bg-bg-primary/30">
              {AVAILABLE_SUBJECTS.map((subject) => {
                const isSubjectSelected = selectedSubjects.includes(subject);
                const isExpanded = expandedSubject === subject;
                const topics = SUBJECT_TOPICS[subject] || [];
                const selectedTopicsInSubject = selectedTopics.filter(t => t.subject === subject);
                
                return (
                  <div key={subject} className="flex flex-col">
                    {/* Subject Row */}
                    <div className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleSubject(subject)}
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-all cursor-pointer ${
                            isSubjectSelected
                              ? 'bg-[#B5FF45] border-[#B5FF45] text-[#05080D]'
                              : 'border-border-custom hover:border-[#B5FF45]/50'
                          }`}
                        >
                          {isSubjectSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                        </button>
                        <span 
                          onClick={() => setExpandedSubject(isExpanded ? null : subject)}
                          className="text-sm font-semibold text-text-primary cursor-pointer hover:text-white"
                        >
                          {subject}
                          {selectedTopicsInSubject.length > 0 && (
                            <span className="ml-2 text-xs font-normal text-text-secondary">
                              ({selectedTopicsInSubject.length}/{topics.length} topics)
                            </span>
                          )}
                        </span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setExpandedSubject(isExpanded ? null : subject)}
                        className="p-1 rounded-lg text-text-secondary hover:text-white cursor-pointer"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Topics Sub-list */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden bg-bg-secondary/40 border-t border-border-custom/50"
                        >
                          <div className="p-4 pl-12 space-y-3">
                            {topics.map((topic) => {
                              const isTopicSelected = selectedTopics.some(t => t.name === topic && t.subject === subject);
                              
                              return (
                                <label
                                  key={topic}
                                  className="flex items-start gap-3 text-xs text-text-secondary hover:text-text-primary cursor-pointer group"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isTopicSelected}
                                    onChange={() => handleToggleTopic(topic, subject)}
                                    className="sr-only"
                                  />
                                  <span className={`w-4 h-4 rounded border flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                                    isTopicSelected
                                      ? 'bg-[#B5FF45]/15 border-[#B5FF45] text-[#B5FF45]'
                                      : 'border-border-custom group-hover:border-text-secondary'
                                  }`}>
                                    {isTopicSelected && <Check className="w-2.5 h-2.5 stroke-[3.5px]" />}
                                  </span>
                                  <span className="leading-relaxed select-none">{topic}</span>
                                </label>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-border-custom bg-bg-secondary/50 backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="px-4.5 h-10 rounded-xl text-xs font-bold text-text-secondary hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 h-10 rounded-xl text-xs font-bold bg-[#B5FF45] text-[#05080D] hover:bg-[#8ccf32] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_4px_12px_rgba(181,255,69,0.2)]"
          >
            {initialRoadmap ? 'Save Changes' : 'Create Roadmap'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
