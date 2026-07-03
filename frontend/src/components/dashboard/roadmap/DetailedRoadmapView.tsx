import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, BookOpen, CheckCircle2, Circle, Calendar, Trophy, ArrowRight } from 'lucide-react';
import { Roadmap, RoadmapTopic } from './types';

interface DetailedRoadmapViewProps {
  roadmap: Roadmap;
  onBack: () => void;
  onUpdateRoadmap: (updated: Roadmap) => void;
}

export function DetailedRoadmapView({ roadmap, onBack, onUpdateRoadmap }: DetailedRoadmapViewProps) {
  const totalTopics = roadmap.topics.length;
  const completedTopics = roadmap.topics.filter(t => t.completed).length;
  const remainingTopics = totalTopics - completedTopics;

  // Toggle completion of a specific topic
  const handleToggleTopic = (topicId: string) => {
    const updatedTopics = roadmap.topics.map(t => {
      if (t.id === topicId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });

    // Re-calculate progress percentage
    const completedCount = updatedTopics.filter(t => t.completed).length;
    const progress = updatedTopics.length > 0 ? Math.round((completedCount / updatedTopics.length) * 100) : 0;

    onUpdateRoadmap({
      ...roadmap,
      topics: updatedTopics,
      progress
    });
  };

  // Group topics by subject
  const topicsBySubject = roadmap.subjects.reduce<Record<string, RoadmapTopic[]>>((acc, subject) => {
    acc[subject] = roadmap.topics.filter(t => t.subject === subject);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Top Navigation & Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Back to dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">{roadmap.goal}</h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-text-secondary">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-text-secondary" />
                Started {roadmap.startDate}
              </span>
              <span className="h-3 w-px bg-white/10 hidden sm:inline" />
              <span>Duration: <strong className="text-white">{roadmap.days} Days</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">Overall Study Progress</span>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="text-emerald-400">Completed: {completedTopics} Topics</span>
            <span className="text-text-secondary">|</span>
            <span className="text-amber-400">Remaining: {remainingTopics} Topics</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-3.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${roadmap.progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#B5FF45] to-[#80E600] rounded-full shadow-[0_0_12px_rgba(181,255,69,0.4)]"
            />
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-text-secondary font-medium">Syllabus Completion</span>
            <span className="font-bold text-[#B5FF45] text-sm">{roadmap.progress}%</span>
          </div>
        </div>
      </div>

      {/* Subjects & Topics List */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Syllabus Breakdown</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {roadmap.subjects.map((subject) => {
            const subjectTopics = topicsBySubject[subject] || [];
            const completedCount = subjectTopics.filter(t => t.completed).length;
            const subjectProgress = subjectTopics.length > 0 
              ? Math.round((completedCount / subjectTopics.length) * 100) 
              : 0;

            return (
              <div 
                key={subject}
                className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-sm flex flex-col justify-between space-y-4 hover:border-white/10 transition-colors shadow-sm"
              >
                <div className="space-y-3">
                  {/* Subject Name and Subtitle */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B5FF45] shadow-[0_0_4px_#B5FF45]" />
                      <h4 className="text-sm font-bold text-white font-heading">{subject}</h4>
                    </div>
                    <span className="text-[10px] font-bold text-text-secondary bg-white/5 px-2.5 py-0.5 rounded-full">
                      {completedCount} / {subjectTopics.length} Done
                    </span>
                  </div>

                  {/* Topics checkboxes list */}
                  <div className="space-y-2.5">
                    {subjectTopics.length === 0 ? (
                      <p className="text-xs text-text-secondary italic">No topics selected for this subject.</p>
                    ) : (
                      subjectTopics.map((topic) => (
                        <div
                          key={topic.id}
                          onClick={() => handleToggleTopic(topic.id)}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                            topic.completed
                              ? 'bg-emerald-950/5 border-emerald-500/10 hover:bg-emerald-950/10'
                              : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                          }`}
                        >
                          <button
                            type="button"
                            className="mt-0.5 text-text-secondary hover:text-white shrink-0"
                          >
                            {topic.completed ? (
                              <CheckCircle2 className="w-4.5 h-4.5 text-[#B5FF45]" />
                            ) : (
                              <Circle className="w-4.5 h-4.5 text-text-secondary hover:text-[#B5FF45]" />
                            )}
                          </button>
                          
                          <span className={`text-xs leading-relaxed transition-all ${
                            topic.completed
                              ? 'line-through text-text-secondary/60 font-medium'
                              : 'text-text-primary'
                          }`}>
                            {topic.name}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Individual Subject Mini progress indicator */}
                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-text-secondary mb-1">
                    <span>Subject Progress</span>
                    <span>{subjectProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500/70 rounded-full" 
                      style={{ width: `${subjectProgress}%` }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
