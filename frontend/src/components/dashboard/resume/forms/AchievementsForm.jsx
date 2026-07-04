import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, GripVertical } from "lucide-react";
export function AchievementsForm({ data, onChange }) {
  const handleAdd = () => {
    onChange([...data, {
      id: Date.now().toString(),
      title: "",
      description: ""
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
        {data.map((item, index) => <motion.div
    key={item.id}
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
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Achievement / Extracurricular Title</label>
                <input
    type="text"
    value={item.title}
    onChange={(e) => handleUpdate(index, "title", e.target.value)}
    placeholder="e.g., Winner, Hackathon 2023"
    className="w-full bg-[#05080D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#B5FF45]/50 transition-colors"
  />
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Description (Optional)</label>
                <textarea
    value={item.description}
    onChange={(e) => handleUpdate(index, "description", e.target.value)}
    placeholder="Briefly describe your role or impact..."
    rows={2}
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
        <Plus className="w-4 h-4" /> Add Achievement
      </button>
    </div>;
}
