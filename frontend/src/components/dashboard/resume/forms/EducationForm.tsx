import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { ResumeData } from '../types';

export function EducationForm({ data, onChange }: { data: ResumeData['education']; onChange: (data: ResumeData['education']) => void }) {
  const handleAdd = () => {
    onChange([...data, {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      branch: '',
      university: '',
      startDate: '',
      endDate: '',
      cgpa: '',
      coursework: ''
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
        {data.map((edu, index) => (
          <motion.div
            key={edu.id}
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
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Institution Name</label>
                  <input 
                    type="text" value={edu.institution} onChange={(e) => handleUpdate(index, 'institution', e.target.value)}
                    placeholder="e.g., MIT"
                    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Degree</label>
                  <input 
                    type="text" value={edu.degree} onChange={(e) => handleUpdate(index, 'degree', e.target.value)}
                    placeholder="e.g., B.Tech"
                    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Branch / Specialization</label>
                  <input 
                    type="text" value={edu.branch} onChange={(e) => handleUpdate(index, 'branch', e.target.value)}
                    placeholder="e.g., Computer Science"
                    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">CGPA / Percentage</label>
                  <input 
                    type="text" value={edu.cgpa} onChange={(e) => handleUpdate(index, 'cgpa', e.target.value)}
                    placeholder="e.g., 9.5"
                    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Start Date</label>
                  <input 
                    type="text" value={edu.startDate} onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
                    placeholder="e.g., Aug 2020"
                    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">End Date</label>
                  <input 
                    type="text" value={edu.endDate} onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                    placeholder="e.g., May 2024"
                    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button 
        onClick={handleAdd}
        className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-2 text-sm font-semibold"
      >
        <Plus className="w-4 h-4" /> Add Education
      </button>
    </div>
  );
}
