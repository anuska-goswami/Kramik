import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, GripVertical, Sparkles } from "lucide-react";
export function ExperienceForm({ data, onChange }) {
  const handleAdd = () => {
    onChange([...data, {
      id: Date.now().toString(),
      company: "",
      role: "",
      type: "Full-time",
      startDate: "",
      endDate: "",
      responsibilities: "",
      technologies: "",
      achievements: ""
    }]);
  };
  const handleUpdate = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };
  const handleRemove = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };
  return <div className="space-y-6">
      <AnimatePresence>
        {data.map((exp, index) => <motion.div
    key={exp.id}
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
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Company Name</label>
                  <input
    type="text"
    value={exp.company}
    onChange={(e) => handleUpdate(index, "company", e.target.value)}
    placeholder="e.g., Google"
    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Role / Title</label>
                  <input
    type="text"
    value={exp.role}
    onChange={(e) => handleUpdate(index, "role", e.target.value)}
    placeholder="e.g., Software Engineer Intern"
    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Employment Type</label>
                  <select
    value={exp.type}
    onChange={(e) => handleUpdate(index, "type", e.target.value)}
    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors appearance-none"
  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Start Date</label>
                  <input
    type="text"
    value={exp.startDate}
    onChange={(e) => handleUpdate(index, "startDate", e.target.value)}
    placeholder="e.g., Jun 2023"
    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">End Date</label>
                  <input
    type="text"
    value={exp.endDate}
    onChange={(e) => handleUpdate(index, "endDate", e.target.value)}
    placeholder="e.g., Present"
    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Responsibilities & Achievements</label>
                  <button type="button" className="text-[10px] text-[#B5FF45] font-semibold bg-[#B5FF45]/10 px-2 py-1 rounded hover:bg-[#B5FF45]/20 transition-colors flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Enhance with AI
                  </button>
                </div>
                <textarea
    value={exp.responsibilities}
    onChange={(e) => handleUpdate(index, "responsibilities", e.target.value)}
    placeholder="• Developed new features for...&#10;• Increased performance by..."
    rows={4}
    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors resize-none text-sm"
  />
              </div>
            </div>
          </motion.div>)}
      </AnimatePresence>

      <button
    onClick={handleAdd}
    className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-2 text-sm font-semibold"
  >
        <Plus className="w-4 h-4" /> Add Experience
      </button>
    </div>;
}
