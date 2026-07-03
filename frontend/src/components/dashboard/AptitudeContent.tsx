import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, Target, CheckCircle2, TrendingUp, BookOpen, 
  Clock, PlayCircle, Lock, Star, Calculator, Award,
  Cpu, FileText, FileBarChart, PieChart, Zap, Bookmark, Sparkles
} from 'lucide-react';

export function AptitudeContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const stats = [
    { label: 'Overall Progress', value: '45%', icon: TrendingUp, color: 'text-[#B5FF45]' },
    { label: 'Questions Attempted', value: '1,248', icon: Target, color: 'text-blue-400' },
    { label: 'Accuracy', value: '82%', icon: CheckCircle2, color: 'text-green-400' },
    { label: 'Mock Tests', value: '12', icon: FileText, color: 'text-purple-400' },
  ];

  const categories = [
    {
      id: 'quantitative',
      title: 'Quantitative Aptitude',
      description: 'Master numbers, arithmetic, and advanced mathematical concepts.',
      progress: 60,
      topicsCompleted: '12/18',
      timeEstimation: '45h',
      icon: Calculator,
      color: 'text-blue-400',
      topics: [
        { name: 'Number System', difficulty: 'Medium', questions: 150, progress: 100, time: '3h', status: 'Completed' },
        { name: 'Percentage', difficulty: 'Easy', questions: 120, progress: 100, time: '2h', status: 'Completed' },
        { name: 'Profit & Loss', difficulty: 'Medium', questions: 180, progress: 40, time: '4h', status: 'In Progress' },
        { name: 'Simple & Compound Interest', difficulty: 'Hard', questions: 140, progress: 0, time: '4h', status: 'Not Started' },
        { name: 'Ratio & Proportion', difficulty: 'Easy', questions: 100, progress: 0, time: '2h', status: 'Not Started' },
        { name: 'Average', difficulty: 'Easy', questions: 110, progress: 100, time: '2h', status: 'Completed' },
        { name: 'Time & Work', difficulty: 'Medium', questions: 160, progress: 0, time: '3h', status: 'Locked' },
        { name: 'Time, Speed & Distance', difficulty: 'Hard', questions: 170, progress: 0, time: '4h', status: 'Locked' },
        { name: 'Pipes & Cisterns', difficulty: 'Medium', questions: 90, progress: 0, time: '2h', status: 'Locked' },
        { name: 'Permutation & Combination', difficulty: 'Hard', questions: 120, progress: 0, time: '3h', status: 'Locked' },
        { name: 'Probability', difficulty: 'Hard', questions: 130, progress: 0, time: '3h', status: 'Locked' },
        { name: 'Partnership', difficulty: 'Easy', questions: 80, progress: 100, time: '1.5h', status: 'Completed' },
        { name: 'Mixture & Alligation', difficulty: 'Medium', questions: 100, progress: 0, time: '2.5h', status: 'Locked' },
        { name: 'Boats & Streams', difficulty: 'Medium', questions: 90, progress: 0, time: '2h', status: 'Locked' },
        { name: 'Ages', difficulty: 'Easy', questions: 70, progress: 100, time: '1h', status: 'Completed' },
        { name: 'Simplification', difficulty: 'Easy', questions: 200, progress: 100, time: '3h', status: 'Completed' },
        { name: 'HCF & LCM', difficulty: 'Easy', questions: 100, progress: 100, time: '1.5h', status: 'Completed' },
        { name: 'Quadratic Equations', difficulty: 'Medium', questions: 110, progress: 0, time: '2h', status: 'Locked' },
      ]
    },
    {
      id: 'logical',
      title: 'Logical Reasoning',
      description: 'Enhance your problem-solving and analytical thinking skills.',
      progress: 40,
      topicsCompleted: '6/14',
      timeEstimation: '30h',
      icon: Brain,
      color: 'text-[#B5FF45]',
      topics: [
        { name: 'Seating Arrangement', difficulty: 'Hard', questions: 120, progress: 100, time: '4h', status: 'Completed' },
        { name: 'Blood Relations', difficulty: 'Medium', questions: 90, progress: 50, time: '2h', status: 'In Progress' },
        { name: 'Coding-Decoding', difficulty: 'Easy', questions: 150, progress: 100, time: '3h', status: 'Completed' },
        { name: 'Direction Sense', difficulty: 'Easy', questions: 80, progress: 100, time: '2h', status: 'Completed' },
        { name: 'Syllogism', difficulty: 'Hard', questions: 110, progress: 0, time: '3h', status: 'Not Started' },
        { name: 'Statement & Assumption', difficulty: 'Medium', questions: 70, progress: 0, time: '2h', status: 'Locked' },
        { name: 'Statement & Conclusion', difficulty: 'Medium', questions: 80, progress: 0, time: '2h', status: 'Locked' },
        { name: 'Cause & Effect', difficulty: 'Easy', questions: 60, progress: 100, time: '1.5h', status: 'Completed' },
        { name: 'Series', difficulty: 'Easy', questions: 140, progress: 100, time: '2h', status: 'Completed' },
        { name: 'Calendar', difficulty: 'Hard', questions: 100, progress: 0, time: '3h', status: 'Locked' },
        { name: 'Clock', difficulty: 'Hard', questions: 90, progress: 0, time: '3h', status: 'Locked' },
        { name: 'Ranking', difficulty: 'Medium', questions: 80, progress: 0, time: '1.5h', status: 'Locked' },
        { name: 'Input Output', difficulty: 'Hard', questions: 110, progress: 0, time: '4h', status: 'Locked' },
        { name: 'Puzzles', difficulty: 'Hard', questions: 130, progress: 0, time: '4h', status: 'Locked' },
      ]
    },
    {
      id: 'verbal',
      title: 'Verbal Ability',
      description: 'Improve grammar, vocabulary, and reading comprehension.',
      progress: 25,
      topicsCompleted: '4/10',
      timeEstimation: '25h',
      icon: BookOpen,
      color: 'text-purple-400',
      topics: [
        { name: 'Reading Comprehension', difficulty: 'Hard', questions: 200, progress: 80, time: '6h', status: 'In Progress' },
        { name: 'Synonyms & Antonyms', difficulty: 'Medium', questions: 300, progress: 100, time: '5h', status: 'Completed' },
        { name: 'Sentence Correction', difficulty: 'Medium', questions: 150, progress: 0, time: '4h', status: 'Locked' },
        { name: 'Para Jumbles', difficulty: 'Hard', questions: 120, progress: 0, time: '3h', status: 'Locked' },
        { name: 'Fill in the Blanks', difficulty: 'Easy', questions: 180, progress: 100, time: '2h', status: 'Completed' },
        { name: 'Error Detection', difficulty: 'Medium', questions: 160, progress: 100, time: '3h', status: 'Completed' },
        { name: 'Vocabulary', difficulty: 'Medium', questions: 250, progress: 100, time: '4h', status: 'Completed' },
        { name: 'Idioms & Phrases', difficulty: 'Easy', questions: 140, progress: 0, time: '2h', status: 'Locked' },
        { name: 'Active & Passive Voice', difficulty: 'Easy', questions: 100, progress: 0, time: '2h', status: 'Locked' },
        { name: 'Direct & Indirect Speech', difficulty: 'Medium', questions: 110, progress: 0, time: '2.5h', status: 'Locked' },
      ]
    },
    {
      id: 'data',
      title: 'Data Interpretation',
      description: 'Analyze charts, graphs, and complex data structures.',
      progress: 10,
      topicsCompleted: '1/6',
      timeEstimation: '20h',
      icon: PieChart,
      color: 'text-orange-400',
      topics: [
        { name: 'Bar Graphs', difficulty: 'Easy', questions: 80, progress: 100, time: '2h', status: 'Completed' },
        { name: 'Pie Charts', difficulty: 'Medium', questions: 100, progress: 0, time: '3h', status: 'Not Started' },
        { name: 'Line Graphs', difficulty: 'Medium', questions: 90, progress: 0, time: '2h', status: 'Locked' },
        { name: 'Tables', difficulty: 'Medium', questions: 110, progress: 0, time: '3h', status: 'Locked' },
        { name: 'Mixed Charts', difficulty: 'Hard', questions: 120, progress: 0, time: '4h', status: 'Locked' },
        { name: 'Caselets', difficulty: 'Hard', questions: 100, progress: 0, time: '3h', status: 'Locked' },
      ]
    },
    {
      id: 'sufficiency',
      title: 'Data Sufficiency',
      description: 'Determine if the provided statement is sufficient to solve problems.',
      progress: 0,
      topicsCompleted: '0/5',
      timeEstimation: '15h',
      icon: Award,
      color: 'text-emerald-400',
      topics: [
        { name: 'Number Theory Sufficiency', difficulty: 'Medium', questions: 60, progress: 0, time: '3h', status: 'Not Started' },
        { name: 'Algebraic Relations', difficulty: 'Medium', questions: 50, progress: 0, time: '2.5h', status: 'Locked' },
        { name: 'Arithmetic Sufficiency', difficulty: 'Easy', questions: 70, progress: 0, time: '2h', status: 'Locked' },
        { name: 'Geometric Sufficiency', difficulty: 'Hard', questions: 45, progress: 0, time: '3h', status: 'Locked' },
        { name: 'Logical Sufficiency', difficulty: 'Hard', questions: 55, progress: 0, time: '3.5h', status: 'Locked' },
      ]
    },
    {
      id: 'puzzle',
      title: 'Puzzle Solving',
      description: 'Solve brain teasers, floor puzzles, and grid configurations.',
      progress: 20,
      topicsCompleted: '1/5',
      timeEstimation: '18h',
      icon: Target,
      color: 'text-yellow-400',
      topics: [
        { name: 'Floor-Based Puzzles', difficulty: 'Hard', questions: 60, progress: 100, time: '4h', status: 'Completed' },
        { name: 'Scheduling Puzzles', difficulty: 'Medium', questions: 50, progress: 0, time: '3h', status: 'Not Started' },
        { name: 'Grid-Based Puzzles', difficulty: 'Hard', questions: 70, progress: 0, time: '4h', status: 'Locked' },
        { name: 'Linear & Circular Arrangements', difficulty: 'Medium', questions: 80, progress: 0, time: '3.5h', status: 'Locked' },
        { name: 'Box Puzzles', difficulty: 'Medium', questions: 40, progress: 0, time: '2.5h', status: 'Locked' },
      ]
    },
    {
      id: 'analytical',
      title: 'Analytical Reasoning',
      description: 'Assess courses of action, assertions, and logical arguments.',
      progress: 0,
      topicsCompleted: '0/5',
      timeEstimation: '12h',
      icon: Cpu,
      color: 'text-red-400',
      topics: [
        { name: 'Decision Making', difficulty: 'Medium', questions: 50, progress: 0, time: '2.5h', status: 'Not Started' },
        { name: 'Course of Action', difficulty: 'Easy', questions: 40, progress: 0, time: '2h', status: 'Locked' },
        { name: 'Strengths of Arguments', difficulty: 'Medium', questions: 60, progress: 0, time: '2.5h', status: 'Locked' },
        { name: 'Assertion and Reason', difficulty: 'Easy', questions: 50, progress: 0, time: '2h', status: 'Locked' },
        { name: 'Logical Deductions', difficulty: 'Hard', questions: 55, progress: 0, time: '3h', status: 'Locked' },
      ]
    },
    {
      id: 'mixed',
      title: 'Mixed Practice',
      description: 'High-yield combined assessment drills simulating placement tests.',
      progress: 40,
      topicsCompleted: '2/5',
      timeEstimation: '15h',
      icon: Zap,
      color: 'text-pink-400',
      topics: [
        { name: 'Speed Drills', difficulty: 'Easy', questions: 100, progress: 100, time: '2h', status: 'Completed' },
        { name: 'Full Sectional Practice', difficulty: 'Medium', questions: 120, progress: 0, time: '3.5h', status: 'Not Started' },
        { name: 'Easy Mode Warmups', difficulty: 'Easy', questions: 80, progress: 100, time: '1.5h', status: 'Completed' },
        { name: 'Hard Core Challenges', difficulty: 'Hard', questions: 90, progress: 0, time: '4h', status: 'Locked' },
        { name: 'Daily High Yield Set', difficulty: 'Medium', questions: 50, progress: 0, time: '2h', status: 'Locked' },
      ]
    }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-text-primary">Aptitude Preparation</h1>
          <p className="text-text-secondary max-w-2xl">
            Master Quantitative Aptitude, Logical Reasoning, and Verbal Ability through structured learning, AI guidance, and mock assessments.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#B5FF45] text-[#05080D] rounded-xl font-semibold hover:bg-[#a0e63b] transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(181,255,69,0.3)] whitespace-nowrap">
          <PlayCircle className="w-5 h-5" />
          Continue Learning
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 rounded-2xl bg-white/[0.02] border border-border-custom hover:border-border-hover transition-colors group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 rounded-xl bg-item-hover">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
                <div className="text-2xl font-bold text-text-primary mt-0.5">{stat.value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Target className="w-5 h-5 text-[#B5FF45]" />
          Aptitude Categories
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                activeCategory === category.id 
                  ? 'bg-white/[0.02] border-[#B5FF45]/50 shadow-[0_0_30px_rgba(181,255,69,0.1)]' 
                  : 'bg-white/[0.02] border-border-custom hover:border-border-hover hover:-translate-y-1'
              }`}
            >
              <div 
                className="p-6 cursor-pointer relative"
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                {/* Subtle gradient overlay on active */}
                {activeCategory === category.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B5FF45]/5 to-transparent pointer-events-none" />
                )}
                
                <div className="flex items-start justify-between gap-4 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-item-hover shrink-0">
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary mb-1">{category.title}</h3>
                      <p className="text-sm text-text-secondary line-clamp-1">{category.description}</p>
                      
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <BookOpen className="w-4 h-4 text-[#B5FF45]" />
                          <span>{category.topicsCompleted} Topics</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span>{category.timeEstimation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold text-text-primary">{category.progress}%</div>
                    <div className="text-xs text-text-secondary">Completed</div>
                  </div>
                </div>

                <div className="mt-6 h-1.5 bg-item-hover rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${category.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-[#B5FF45] rounded-full"
                  />
                </div>
              </div>

              {/* Expandable Topics List */}
              <AnimatePresence>
                {activeCategory === category.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border-custom bg-bg-primary/50"
                  >
                    <div className="p-4 space-y-2">
                      {category.topics.map((topic, i) => (
                        <div 
                          key={topic.name}
                          className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-border-custom hover:border-[#B5FF45]/30 transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${
                              topic.status === 'Completed' ? 'bg-[#B5FF45]/10 text-[#B5FF45]' :
                              topic.status === 'In Progress' ? 'bg-blue-400/10 text-blue-400' :
                              topic.status === 'Locked' ? 'bg-item-hover text-text-secondary' :
                              'bg-item-hover text-text-primary'
                            }`}>
                              {topic.status === 'Completed' ? <CheckCircle2 className="w-4 h-4" /> :
                               topic.status === 'Locked' ? <Lock className="w-4 h-4" /> :
                               <PlayCircle className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="font-semibold text-text-primary">{topic.name}</div>
                              <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                                  topic.difficulty === 'Easy' ? 'bg-green-400/10 text-green-400' :
                                  topic.difficulty === 'Medium' ? 'bg-yellow-400/10 text-yellow-400' :
                                  'bg-red-400/10 text-red-400'
                                }`}>
                                  {topic.difficulty}
                                </span>
                                <span>• {topic.questions} Qs</span>
                                <span>• {topic.time}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            {topic.status !== 'Locked' && topic.status !== 'Not Started' && (
                              <div className="hidden sm:flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-item-hover rounded-full overflow-hidden">
                                  <div className="h-full bg-[#B5FF45] rounded-full" style={{ width: `${topic.progress}%` }} />
                                </div>
                                <span className="text-xs text-text-secondary w-8">{topic.progress}%</span>
                              </div>
                            )}
                            <button 
                              disabled={topic.status === 'Locked'}
                              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                topic.status === 'Locked' ? 'bg-item-hover text-text-secondary cursor-not-allowed' :
                                topic.status === 'Completed' ? 'bg-item-hover hover:bg-bg-primary text-text-primary border border-border-custom' :
                                'bg-[#B5FF45]/10 text-[#B5FF45] hover:bg-[#B5FF45]/20'
                              }`}
                            >
                              {topic.status === 'Completed' ? 'Review' :
                               topic.status === 'Locked' ? 'Locked' :
                               topic.status === 'In Progress' ? 'Resume' : 'Start'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Practice Sets & AI Challenge */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Practice Question Sets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Percentage Practice Set 1', questions: 30, time: '45m', diff: 'Easy', completed: true },
                { name: 'Profit & Loss Challenge', questions: 25, time: '40m', diff: 'Medium', completed: false },
                { name: 'Logical Puzzle Set', questions: 15, time: '30m', diff: 'Hard', completed: false },
                { name: 'Reading Comprehension Test', questions: 20, time: '35m', diff: 'Medium', completed: false },
              ].map((set, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-border-custom hover:border-[#B5FF45]/50 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-item-hover rounded-lg">
                      <Target className="w-4 h-4 text-text-secondary group-hover:text-[#B5FF45] transition-colors" />
                    </div>
                    {set.completed && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">{set.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-text-secondary mb-4">
                    <span>{set.questions} Questions</span>
                    <span>• {set.time}</span>
                  </div>
                  <button className="w-full py-2 bg-item-hover hover:bg-[#B5FF45]/10 text-text-primary hover:text-[#B5FF45] rounded-xl text-sm font-semibold transition-colors">
                    {set.completed ? 'Review Answers' : 'Start Practice'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <FileBarChart className="w-5 h-5 text-purple-400" />
              Mock Tests
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'TCS NQT Mock 1', type: 'Company', duration: '90m', q: 60 },
                { title: 'Quant Sectional', type: 'Sectional', duration: '45m', q: 30 },
                { title: 'Full Aptitude Test', type: 'Comprehensive', duration: '120m', q: 100 },
              ].map((test, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-border-custom hover:border-border-hover transition-colors">
                  <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">{test.type}</div>
                  <h3 className="font-bold text-text-primary mb-1 leading-tight">{test.title}</h3>
                  <div className="text-xs text-text-secondary mb-4">{test.duration} • {test.q} Questions</div>
                  <button className="w-full py-2 border border-border-custom hover:border-[#B5FF45] text-text-primary rounded-xl text-sm font-semibold transition-colors">
                    Start Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: AI, Daily, Performance, Resources */}
        <div className="space-y-6">
          {/* Daily Challenge */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#B5FF45]/10 to-transparent border border-[#B5FF45]/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <h3 className="font-bold text-text-primary">Daily Challenge</h3>
              </div>
              <span className="text-xs font-mono text-text-secondary">14:22:05</span>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Complete today's logical reasoning challenge to maintain your streak and earn +50 points.
            </p>
            <div className="flex items-center justify-between text-xs font-semibold mb-4">
              <span className="text-text-primary">Syllogism Hard Mode</span>
              <span className="text-[#B5FF45]">+50 XP</span>
            </div>
            <button className="w-full py-2.5 bg-[#B5FF45] text-[#05080D] rounded-xl font-bold hover:bg-[#a0e63b] transition-colors shadow-lg shadow-[#B5FF45]/20">
              Start Challenge
            </button>
          </div>

          {/* AI Recommendations */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-border-custom">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-text-primary">AI Recommendations</h3>
            </div>
            <div className="space-y-4">
              {[
                "Revise Probability before attempting the next mock test.",
                "Your Logical Reasoning accuracy has improved by 15% this week.",
                "Complete Time & Work before moving to Data Interpretation."
              ].map((rec, i) => (
                <div key={i} className="flex gap-3 text-sm text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B5FF45] mt-1.5 shrink-0" />
                  <p>{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Overview (Compact) */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-border-custom">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="font-bold text-text-primary">Performance</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-text-secondary">Strongest Topic</span>
                  <span className="font-semibold text-text-primary">Percentage</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Needs Work</span>
                  <span className="font-semibold text-text-primary text-red-400">Time & Speed</span>
                </div>
              </div>
              <div className="pt-4 border-t border-border-custom">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-secondary">Overall Readiness</span>
                  <span className="font-bold text-[#B5FF45]">68%</span>
                </div>
                <div className="h-2 bg-item-hover rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-[#B5FF45] w-[68%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="font-bold text-text-primary px-1">Resources</h3>
            {[
              { title: 'Quant Formula Sheet', icon: FileText, type: 'PDF' },
              { title: 'Reasoning Short Tricks', icon: BookOpen, type: 'Notes' }
            ].map((res, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-item-hover border border-border-custom cursor-pointer hover:border-[#B5FF45]/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <res.icon className="w-4 h-4 text-text-secondary group-hover:text-text-primary" />
                  <span className="text-sm font-medium text-text-primary">{res.title}</span>
                </div>
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider bg-bg-primary px-2 py-0.5 rounded">{res.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Learning & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* Continue Learning */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#B5FF45]" />
            Continue Learning
          </h2>
          <div className="space-y-3">
            {[
              { title: 'Profit & Loss', date: 'Accessed 2 hours ago', progress: 40, type: 'Topic' },
              { title: 'TCS NQT Mock 1', date: 'Accessed yesterday', progress: 15, type: 'Mock Test' },
              { title: 'Number System', date: 'Recommended next topic', progress: 0, type: 'Recommended' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-border-custom hover:border-border-hover transition-colors group">
                <div>
                  <h3 className="font-semibold text-text-primary group-hover:text-[#B5FF45] transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{item.type}</span>
                    <span className="text-xs text-text-secondary">• {item.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {item.progress > 0 && (
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-item-hover rounded-full overflow-hidden">
                        <div className="h-full bg-[#B5FF45] rounded-full" style={{ width: `${item.progress}%` }} />
                      </div>
                      <span className="text-xs text-text-secondary w-8">{item.progress}%</span>
                    </div>
                  )}
                  <button className="p-2 rounded-lg bg-item-hover text-text-primary hover:text-[#B5FF45] hover:bg-[#B5FF45]/10 transition-colors">
                    <PlayCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Practice', icon: Target },
              { label: 'Take Mock', icon: FileBarChart },
              { label: 'Progress', icon: TrendingUp },
              { label: 'AI Mentor', icon: Sparkles },
              { label: 'Downloads', icon: FileText },
              { label: 'Bookmarks', icon: Bookmark },
            ].map((action, i) => (
              <button 
                key={i}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white/[0.02] border border-border-custom hover:bg-item-hover hover:border-border-hover transition-all duration-300 group"
              >
                <action.icon className="w-5 h-5 text-text-secondary group-hover:text-[#B5FF45] transition-colors" />
                <span className="text-xs font-semibold text-text-primary">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
