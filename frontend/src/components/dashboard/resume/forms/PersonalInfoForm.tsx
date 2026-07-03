import React from 'react';
import { ResumeData } from '../types';

export function PersonalInfoForm({ data, onChange }: { data: ResumeData['personal']; onChange: (data: ResumeData['personal']) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Full Name</label>
          <input 
            type="text" name="fullName" value={data.fullName} onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-[#0A0E17]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Professional Headline</label>
          <input 
            type="text" name="headline" value={data.headline} onChange={handleChange}
            placeholder="Full Stack Developer"
            className="w-full bg-[#0A0E17]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Email Address</label>
          <input 
            type="email" name="email" value={data.email} onChange={handleChange}
            placeholder="john@example.com"
            className="w-full bg-[#0A0E17]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Mobile Number</label>
          <input 
            type="tel" name="mobile" value={data.mobile} onChange={handleChange}
            placeholder="+1 234 567 890"
            className="w-full bg-[#0A0E17]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Location</label>
        <input 
          type="text" name="location" value={data.location} onChange={handleChange}
          placeholder="New York, USA"
          className="w-full bg-[#0A0E17]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">LinkedIn</label>
          <input 
            type="url" name="linkedin" value={data.linkedin} onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
            className="w-full bg-[#0A0E17]/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">GitHub</label>
          <input 
            type="url" name="github" value={data.github} onChange={handleChange}
            placeholder="github.com/johndoe"
            className="w-full bg-[#0A0E17]/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Portfolio</label>
          <input 
            type="url" name="portfolio" value={data.portfolio} onChange={handleChange}
            placeholder="johndoe.com"
            className="w-full bg-[#0A0E17]/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
          />
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Professional Summary</label>
          <button type="button" className="text-[10px] text-[#B5FF45] font-semibold bg-[#B5FF45]/10 px-2 py-1 rounded hover:bg-[#B5FF45]/20 transition-colors">
            Generate with AI
          </button>
        </div>
        <textarea 
          name="summary" value={data.summary} onChange={handleChange}
          placeholder="Brief overview of your career and goals..."
          rows={4}
          className="w-full bg-[#0A0E17]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors resize-none"
        />
      </div>
    </div>
  );
}
