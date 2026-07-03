import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Building2, MapPin, Globe, Briefcase, Bookmark, Share2, 
  ChevronRight, Calendar, Users, Target, PlayCircle, FileText, CheckCircle2,
  Clock, Zap, Layout, Terminal, Code, Award, Sparkles, MessageSquare, BookOpen,
  PieChart, ChevronDown, ArrowRight
} from 'lucide-react';
import { companiesData } from '../../data/companiesData';

export function CompanyDetailPage({ onBack }: { onBack?: () => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const company = companiesData.find(c => c.id === id) || companiesData[0];
  
  const [activeTab, setActiveTab] = useState('Overview');
  const [expandedRounds, setExpandedRounds] = useState<number[]>([0]);

  const toggleRound = (index: number) => {
    if (expandedRounds.includes(index)) {
      setExpandedRounds(expandedRounds.filter(i => i !== index));
    } else {
      setExpandedRounds([...expandedRounds, index]);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/company-prep');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto text-white"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <button 
          onClick={handleBack}
          className="hover:text-white flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Company Prep
        </button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#B5FF45] font-medium">{company.name}</span>
      </div>

      {/* Hero Section */}
      <div className="bg-[#0A0E17]/80 border border-white/5 rounded-3xl p-6 lg:p-10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B5FF45]/5 to-transparent opacity-50" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
          
          {/* Logo & Basic Info */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-2xl flex items-center justify-center p-4 border-2 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white">{company.name}</h1>
                <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {company.category}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Multiple Locations</div>
                <div className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> {company.name.toLowerCase()}.com</div>
                <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 10,000+ Employees</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 ml-auto w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-[#B5FF45] text-[#05080D] rounded-xl font-bold hover:bg-[#a0e63b] transition-all duration-300 shadow-[0_0_20px_rgba(181,255,69,0.3)] hover:scale-105">
              Start Company Roadmap
            </button>
            <button className="p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.05] hover:text-[#B5FF45] hover:border-[#B5FF45]/50 transition-all text-gray-400 group">
              <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.05] hover:text-[#B5FF45] hover:border-[#B5FF45]/50 transition-all text-gray-400 group">
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative z-10 border-t border-white/5 pt-8">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Average Package</p>
            <p className="text-xl font-mono font-bold text-white">{company.avgPackage}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Difficulty Level</p>
            <p className={`text-xl font-bold ${company.difficulty === 'Hard' ? 'text-red-400' : company.difficulty === 'Medium' ? 'text-yellow-400' : 'text-[#B5FF45]'}`}>{company.difficulty}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Hiring Frequency</p>
            <p className="text-xl font-bold text-white">{company.frequency}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Eligibility</p>
            <p className="text-sm font-medium text-gray-300 line-clamp-2">{company.eligibility}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-border-custom pb-2 hide-scrollbar">
        {['Overview', 'Recruitment Process', 'Preparation Roadmap', 'Interview Experiences', 'Mock Tests', 'Resources'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-[#B5FF45]/10 text-[#B5FF45]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Company Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{company.overview}</p>
                </div>
                
                {/* AI Insights */}
                <div className="bg-gradient-to-br from-[#B5FF45]/10 to-transparent border border-[#B5FF45]/30 rounded-2xl p-6 lg:p-8 relative overflow-hidden">
                  <Sparkles className="absolute top-6 right-6 w-12 h-12 text-[#B5FF45]/20" />
                  <h3 className="text-xl font-bold text-[#B5FF45] mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> AI Company Insights
                  </h3>
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-start gap-3 p-4 bg-black/20 rounded-xl border border-white/5">
                      <Target className="w-5 h-5 text-[#B5FF45] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-medium mb-1">Focus on Data Structures and Algorithms</p>
                        <p className="text-xs text-gray-400">Based on recent interview experiences, {company.name} heavily emphasizes Arrays, Strings, and Dynamic Programming in the initial rounds.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-black/20 rounded-xl border border-white/5">
                      <Clock className="w-5 h-5 text-[#B5FF45] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-medium mb-1">Time Management in Online Assessment</p>
                        <p className="text-xs text-gray-400">The OA round is typically fast-paced. Practice solving medium-level leetcode problems within 20 minutes.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Placement Success Tracker */}
                <div className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-6">Your Readiness</h3>
                  
                  <div className="flex flex-col items-center justify-center mb-8">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" className="stroke-white/10" strokeWidth="12" fill="none" />
                        <circle cx="64" cy="64" r="56" className="stroke-[#B5FF45]" strokeWidth="12" fill="none" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * 45) / 100} strokeLinecap="round" />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-white">45%</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Ready</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'Aptitude Readiness', value: 60 },
                      { label: 'Core Subject Readiness', value: 40 },
                      { label: 'Interview Readiness', value: 30 }
                    ].map(metric => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-400">{metric.label}</span>
                          <span className="text-white font-medium">{metric.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#B5FF45] rounded-full" style={{ width: `${metric.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Recruitment Process' && (
            <div className="space-y-6">
              <div className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl font-bold text-white mb-8">Hiring Timeline</h3>
                
                <div className="relative border-l-2 border-white/10 ml-4 lg:ml-0 lg:border-l-0 lg:border-t-2 lg:flex justify-between pt-8 lg:pt-12 pb-4 space-y-10 lg:space-y-0">
                  {company.hiringProcess.map((round, idx) => (
                    <div key={idx} className="relative lg:w-1/4 px-6 lg:px-4 text-left lg:text-center">
                      <div className="absolute -left-[9px] top-0 lg:-top-[57px] lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 bg-[#05080D] border-2 border-[#B5FF45] rounded-full shadow-[0_0_10px_#B5FF45]" />
                      <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:border-[#B5FF45]/50 transition-colors">
                        <div className="text-xs text-[#B5FF45] font-semibold mb-1 uppercase tracking-wider">Round {idx + 1}</div>
                        <h4 className="text-white font-bold text-sm mb-2">{round}</h4>
                        <p className="text-xs text-gray-400">Duration: 60-90 mins</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Preparation Roadmap' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Aptitude Preparation', progress: 100, status: 'Completed', icon: PieChart },
                { title: 'Core Subjects (OS, DBMS)', progress: 60, status: 'In Progress', icon: BookOpen },
                { title: 'Technical MCQs', progress: 0, status: 'Not Started', icon: Terminal },
                { title: 'Resume Preparation', progress: 0, status: 'Not Started', icon: FileText },
                { title: 'HR Interview Questions', progress: 0, status: 'Not Started', icon: MessageSquare }
              ].map((phase, idx) => (
                <div key={idx} className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors group">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${phase.progress === 100 ? 'bg-[#B5FF45]/20 text-[#B5FF45]' : 'bg-white/5 text-gray-400 group-hover:text-white'} transition-colors`}>
                        <phase.icon className="w-5 h-5" />
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        phase.progress === 100 ? 'bg-[#B5FF45]/10 text-[#B5FF45]' : 
                        phase.progress > 0 ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-gray-500'
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{phase.title}</h4>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-4">
                      <div className="h-full bg-[#B5FF45] rounded-full" style={{ width: `${phase.progress}%` }} />
                    </div>
                  </div>
                  <button className="mt-6 w-full py-2.5 bg-white/[0.02] border border-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] hover:border-[#B5FF45] text-white text-xs font-semibold rounded-xl transition-all duration-300">
                    {phase.progress === 100 ? 'Review Section' : 'Continue Learning'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Interview Experiences' && (
            <div className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-6">Previous Year Experiences</h3>
                {[1, 2, 3].map((_, idx) => (
                  <div key={idx} className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl overflow-hidden">
                    <div 
                      className="p-6 cursor-pointer hover:bg-white/[0.02] transition-colors flex justify-between items-center"
                      onClick={() => toggleRound(idx)}
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-white">Software Development Engineer</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-[#B5FF45]/10 text-[#B5FF45] font-semibold">Selected</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>Anonymous Candidate</span>
                          <span>•</span>
                          <span>2023 Batch</span>
                          <span>•</span>
                          <span>Difficulty: Medium</span>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedRounds.includes(idx) ? 'rotate-180' : ''}`} />
                    </div>
                    
                    <AnimatePresence>
                      {expandedRounds.includes(idx) && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden border-t border-white/5"
                        >
                          <div className="p-6 bg-black/20 space-y-6">
                            <div>
                              <h5 className="text-[#B5FF45] text-sm font-semibold mb-2">Round 1: Online Assessment</h5>
                              <p className="text-sm text-gray-300">Platform: HackerRank. 2 coding questions (Medium, Hard). Topics included dynamic programming and graphs.</p>
                            </div>
                            <div>
                              <h5 className="text-[#B5FF45] text-sm font-semibold mb-2">Round 2: Technical Interview</h5>
                              <p className="text-sm text-gray-300">Discussed project architecture. Was asked to implement LRU Cache and explain time complexity.</p>
                            </div>
                            <div className="flex gap-4">
                              <button className="text-xs text-[#B5FF45] hover:underline">Read Full Experience</button>
                              <button className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"><Bookmark className="w-3 h-3" /> Bookmark</button>
                              <button className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"><Share2 className="w-3 h-3" /> Share</button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-border-custom space-y-6">
                <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Interview Questions</h3>
                {[
                  { category: 'Technical Questions', q: 'Explain the internal working of a HashMap in Java.' },
                  { category: 'Scenario-Based Questions', q: 'How would you design a scalable URL shortener like bit.ly?' },
                  { category: 'HR Questions', q: 'Tell me about a time you had a conflict with a team member.' },
                  { category: 'Behavioral Questions', q: 'Describe a situation where you had to meet a tight deadline.' }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                        {faq.category}
                      </span>
                      <button className="px-3 py-1.5 bg-[#B5FF45]/10 text-[#B5FF45] hover:bg-[#B5FF45] hover:text-[#05080D] rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" /> Practice Answer
                      </button>
                    </div>
                    <h4 className="text-base font-medium text-white mb-3">{faq.q}</h4>
                    <div className="flex items-start gap-2 bg-black/20 p-4 rounded-xl border border-[#B5FF45]/10">
                      <Sparkles className="w-4 h-4 text-[#B5FF45] shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-400">
                        <span className="text-[#B5FF45] font-semibold mr-1">AI Tip:</span>
                        Structure your answer using the STAR format (Situation, Task, Action, Result). Highlight specific technical tradeoffs you considered.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Mock Tests' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Full Recruitment Simulation', questions: 50, duration: '90m', difficulty: 'Hard' },
                { title: 'Company Aptitude Test', questions: 30, duration: '45m', difficulty: 'Medium' },
                { title: 'Technical MCQ Round', questions: 40, duration: '60m', difficulty: 'Medium' }
              ].map((test, idx) => (
                <div key={idx} className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-6 hover:border-[#B5FF45]/50 transition-colors group flex flex-col">
                  <div className="p-3 bg-white/5 rounded-xl w-fit mb-4 group-hover:bg-[#B5FF45]/10 group-hover:text-[#B5FF45] transition-colors">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{test.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-6">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {test.duration}</span>
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {test.questions} Qs</span>
                    <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> {test.difficulty}</span>
                  </div>
                  <button className="mt-auto w-full py-2.5 bg-[#B5FF45]/10 text-[#B5FF45] border border-[#B5FF45]/20 hover:bg-[#B5FF45] hover:text-[#05080D] font-bold rounded-xl transition-all duration-300">
                    Start Mock Test
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Resources' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Interview Preparation Guide', type: 'PDF', time: '45 mins' },
                { title: 'Top 50 Technical Questions', type: 'Article', time: '30 mins' },
                { title: 'Resume Tips for ' + company.name, type: 'Video', time: '15 mins' }
              ].map((resource, idx) => (
                <div key={idx} className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-white/5 rounded-lg group-hover:text-[#B5FF45] transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#B5FF45] transition-colors">{resource.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{resource.type} • {resource.time} read</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#B5FF45] transition-colors" />
                </div>
              ))}
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
