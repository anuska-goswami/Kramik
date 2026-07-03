import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Building2, Search, Filter, ArrowRight,
  TrendingUp, CheckCircle2, ShieldAlert, Sparkles, BookOpen, Clock, PieChart,
  MessageSquare
} from 'lucide-react';
import { companiesData } from '../../data/companiesData';

export function CompanyPrepContent({ onCompanySelect }: { onCompanySelect?: () => void }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Highest Package');

  const stats = [
    { label: 'Companies Unlocked', value: '45+', icon: Building2, trend: '+3 this week' },
    { label: 'Companies Prepared', value: '12', icon: CheckCircle2, trend: 'Top 15%' },
    { label: 'Mock Tests Completed', value: '28', icon: BookOpen, trend: '+5 this month' },
    { label: 'Placement Readiness', value: '84%', icon: TrendingUp, trend: '+4% from last week', highlight: true }
  ];

  const categories = ['All', 'Product-Based', 'Service-Based', 'Startup', 'Consulting', 'Core Companies', 'Dream Companies'];
  const sortOptions = ['Highest Package', 'Most Popular', 'Beginner Friendly', 'Frequently Asked'];

  let filteredCompanies = companiesData.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          company.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || company.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (sortBy === 'Highest Package') {
    filteredCompanies.sort((a, b) => b.packageValue - a.packageValue);
  } else if (sortBy === 'Most Popular') {
    filteredCompanies.sort((a, b) => b.popularity - a.popularity);
  } else if (sortBy === 'Beginner Friendly') {
    const difficultyMap: Record<string, number> = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
    filteredCompanies.sort((a, b) => difficultyMap[a.difficulty] - difficultyMap[b.difficulty]);
  } else if (sortBy === 'Frequently Asked') {
    filteredCompanies.sort((a, b) => b.frequencyScore - a.frequencyScore);
  }

  const handleCompanyClick = (id: string) => {
    navigate(`/company-prep/${id}`);
    if (onCompanySelect) onCompanySelect();
  };

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
      {/* Header Section */}
      <motion.div 
        variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold tracking-tight text-white mb-3">
            Company Preparation
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
            Prepare strategically for your dream companies with company-specific roadmaps, aptitude patterns, interview experiences, mock tests, and AI-powered guidance.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#B5FF45] text-[#05080D] rounded-xl font-semibold hover:bg-[#a0e63b] transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(181,255,69,0.3)] shrink-0">
          Continue Preparation <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Stats Row */}
      <motion.div 
        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className={`relative overflow-hidden bg-bg-secondary border ${stat.highlight ? 'border-[#B5FF45]/30' : 'border-border-custom'} rounded-2xl p-5 hover:border-border-hover transition-all duration-300 group`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#B5FF45]/[0.02] rounded-full blur-[30px]" />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                </div>
                <div className="mt-2 text-xs font-medium text-[#B5FF45]">
                  {stat.trend}
                </div>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.highlight ? 'bg-[#B5FF45]/10 text-[#B5FF45]' : 'bg-white/5 text-gray-400 group-hover:text-[#B5FF45] group-hover:bg-[#B5FF45]/10'} transition-colors`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main Grid Area */}
      <div className="space-y-6">
        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          <h2 className="text-xl font-bold text-white mb-1">Top Hiring Companies</h2>
          <p className="text-xs text-gray-400">Discover and prepare for your dream role</p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}
          className="flex flex-col lg:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-white/[0.02] border border-border-custom rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 lg:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-[#B5FF45] text-[#05080D] shadow-[0_0_15px_rgba(181,255,69,0.2)]' 
                    : 'bg-white/[0.02] text-gray-400 border border-white/5 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative shrink-0 hidden sm:block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 pl-4 pr-10 bg-white/[0.02] border border-border-custom rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 transition-all appearance-none cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt} value={opt} className="bg-[#05080D]">{opt}</option>
              ))}
            </select>
            <Filter className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </motion.div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence>
            {filteredCompanies.map((company, index) => (
              <motion.div
                layout
                key={company.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleCompanyClick(company.id)}
                className="group relative bg-[#0A0E17]/60 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-500 cursor-pointer flex flex-col h-full"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#B5FF45]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="p-5 flex flex-col flex-grow relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-300">
                      <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                      {company.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#B5FF45] transition-colors">{company.name}</h3>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Avg. Package</span>
                      <span className="font-mono font-medium text-white">{company.avgPackage}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Difficulty</span>
                      <span className={`font-medium ${company.difficulty === 'Hard' ? 'text-red-400' : company.difficulty === 'Medium' ? 'text-yellow-400' : 'text-[#B5FF45]'}`}>{company.difficulty}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Frequency</span>
                      <span className="text-gray-300">{company.frequency}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-5">
                    <button className="w-full py-2.5 bg-white/[0.02] border border-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] hover:border-[#B5FF45] text-white text-xs font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 group-hover:shadow-[0_0_20px_rgba(181,255,69,0.15)]">
                      Start Preparation <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredCompanies.length === 0 && (
          <div className="text-center py-20 bg-[#0A0E17]/60 border border-white/5 rounded-3xl">
            <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-white mb-1">No Companies Found</h4>
            <p className="text-xs text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* Recommended Companies for You */}
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 border-t border-border-custom">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#B5FF45]" />
          Recommended Companies for You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companiesData.slice(1, 4).map(company => (
            <div key={`rec-${company.id}`} className="bg-[#0A0E17]/60 border border-[#B5FF45]/20 rounded-2xl p-5 hover:border-[#B5FF45]/50 transition-colors flex items-center justify-between cursor-pointer group" onClick={() => handleCompanyClick(company.id)}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 border border-white/10 group-hover:scale-105 transition-transform">
                  <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-white group-hover:text-[#B5FF45] transition-colors">{company.name}</h3>
                  <div className="text-xs text-gray-400 mt-1">92% Match • ~4 weeks prep</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#B5FF45] transition-colors" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Continue Preparation */}
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-4">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          Continue Preparation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:border-white/20 transition-colors cursor-pointer group" onClick={() => handleCompanyClick(companiesData[0].id)}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 border border-white/10 group-hover:scale-105 transition-transform">
                <img src={companiesData[0].logo} alt={companiesData[0].name} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-white group-hover:text-[#B5FF45] transition-colors">{companiesData[0].name}</h3>
                <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                  <span>Last accessed: 2 hours ago</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[#B5FF45]">45% Complete</span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] rounded-lg text-sm font-semibold transition-colors">
              Resume
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 pb-4">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'View All Companies', icon: Building2 },
            { label: 'Start Mock Test', icon: CheckCircle2 },
            { label: 'Interview Preparation', icon: MessageSquare },
            { label: 'AI Mentor', icon: Sparkles }
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
