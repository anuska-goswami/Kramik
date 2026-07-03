import React, { useState } from 'react';
import { ResumeData } from '../types';
import { Sparkles, X, Plus } from 'lucide-react';

export function SkillsForm({ data, onChange }: { data: ResumeData['skills']; onChange: (data: ResumeData['skills']) => void }) {
  const [inputs, setInputs] = useState({ technical: '', core: '', tools: '', soft: '', languages: '' });

  const handleAdd = (category: keyof ResumeData['skills'], e?: React.KeyboardEvent) => {
    if (e && e.key !== 'Enter') return;
    if (e) e.preventDefault();
    
    const value = inputs[category].trim();
    if (value && !data[category].includes(value)) {
      onChange({ ...data, [category]: [...data[category], value] });
      setInputs({ ...inputs, [category]: '' });
    }
  };

  const handleRemove = (category: keyof ResumeData['skills'], index: number) => {
    const newArr = [...data[category]];
    newArr.splice(index, 1);
    onChange({ ...data, [category]: newArr });
  };

  const categories: Array<{ id: keyof ResumeData['skills']; label: string; placeholder: string; aiSuggestions: string[] }> = [
    { id: 'technical', label: 'Technical Skills (Programming Languages, Frameworks)', placeholder: 'e.g., React, Python, Node.js', aiSuggestions: ['React', 'TypeScript', 'Node.js', 'Python'] },
    { id: 'tools', label: 'Tools & Technologies', placeholder: 'e.g., Git, Docker, AWS', aiSuggestions: ['Git', 'Docker', 'AWS', 'Figma'] },
    { id: 'core', label: 'Core Subjects', placeholder: 'e.g., DBMS, OS, Computer Networks', aiSuggestions: ['DBMS', 'OS', 'OOP', 'System Design'] },
    { id: 'soft', label: 'Soft Skills', placeholder: 'e.g., Leadership, Problem Solving', aiSuggestions: ['Leadership', 'Problem Solving', 'Communication'] },
    { id: 'languages', label: 'Languages Known', placeholder: 'e.g., English, Spanish', aiSuggestions: ['English', 'Spanish'] },
  ];

  return (
    <div className="space-y-8">
      {categories.map(cat => (
        <div key={cat.id} className="bg-[#0A0E17]/60 border border-white/10 rounded-2xl p-5">
          <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">{cat.label}</label>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {data[cat.id].map((skill, idx) => (
              <div key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-[#B5FF45]/10 text-[#B5FF45] border border-[#B5FF45]/20 rounded-lg text-sm">
                <span>{skill}</span>
                <button onClick={() => handleRemove(cat.id, idx)} className="hover:text-white transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputs[cat.id]}
              onChange={(e) => setInputs({ ...inputs, [cat.id]: e.target.value })}
              onKeyDown={(e) => handleAdd(cat.id, e)}
              placeholder={cat.placeholder}
              className="flex-1 bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
            />
            <button 
              onClick={() => handleAdd(cat.id)}
              className="px-4 py-2 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] rounded-xl transition-colors text-white font-semibold flex items-center justify-center shrink-0"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          {cat.aiSuggestions.length > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <Sparkles className="w-3.5 h-3.5 text-[#B5FF45]" />
              <span className="text-xs text-gray-500">Suggestions:</span>
              {cat.aiSuggestions.filter(s => !data[cat.id].includes(s)).map((s, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    onChange({ ...data, [cat.id]: [...data[cat.id], s] });
                  }}
                  className="text-xs px-2 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-gray-400 transition-colors"
                >
                  + {s}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
