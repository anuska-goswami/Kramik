import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, GripVertical, Sparkles } from 'lucide-react';
import { ResumeData } from '../types';

export function ProjectsForm({ data, onChange }: { data: ResumeData['projects']; onChange: (data: ResumeData['projects']) => void }) {
  const handleAdd = () => {
    onChange([...data, {
      id: Date.now().toString(),
      title: '',
      duration: '',
      technologies: '',
      github: '',
      live: '',
      description: '',
      role: ''
    }]);
  };

  const handleUpdate = (index: number, field: string, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {data.map((proj, index) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="p-5 bg-[#0A0E17]/60 border border-white/10 rounded-2xl space-y-4 relative group"
          >
            <button 
              onClick={() => handleRemove(index)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="absolute top-4 left-2 cursor-grab text-gray-600 opacity-0 group-hover:opacity-100">
              <GripVertical className="w-4 h-4" />
            </div>

            <div className="pl-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Project Title</label>
                  <input 
                    type="text" value={proj.title} onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                    placeholder="e.g., E-commerce Platform"
                    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Duration / Date</label>
                  <input 
                    type="text" value={proj.duration} onChange={(e) => handleUpdate(index, 'duration', e.target.value)}
                    placeholder="e.g., Jan 2023 - Mar 2023"
                    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">GitHub Link</label>
                  <input 
                    type="url" value={proj.github} onChange={(e) => handleUpdate(index, 'github', e.target.value)}
                    placeholder="github.com/..."
                    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Live Demo Link (Optional)</label>
                  <input 
                    type="url" value={proj.live} onChange={(e) => handleUpdate(index, 'live', e.target.value)}
                    placeholder="example.com"
                    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Technologies Used</label>
                <input 
                  type="text" value={proj.technologies} onChange={(e) => handleUpdate(index, 'technologies', e.target.value)}
                  placeholder="e.g., React, Node.js, MongoDB"
                  className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Description</label>
                  <button type="button" className="text-[10px] text-[#B5FF45] font-semibold bg-[#B5FF45]/10 px-2 py-1 rounded hover:bg-[#B5FF45]/20 transition-colors flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Improve with AI
                  </button>
                </div>
                <textarea 
                  value={proj.description} onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                  placeholder="• Developed a scalable e-commerce platform...&#10;• Reduced load time by 30%..."
                  rows={4}
                  className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors resize-none text-sm"
                />
                <p className="text-[10px] text-gray-500 mt-1">Use bullet points for better ATS compatibility.</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button 
        onClick={handleAdd}
        className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-2 text-sm font-semibold"
      >
        <Plus className="w-4 h-4" /> Add Project
      </button>
    </div>
  );
}
