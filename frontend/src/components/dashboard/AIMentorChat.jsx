import { useState } from "react";
import { motion } from "motion/react";
import { X, Send, Sparkles, BrainCircuit, User } from "lucide-react";
export function AIMentorChat({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, type: "ai", text: "Hi Anuska! I noticed you are struggling with Operating Systems. Would you like a quick 5-minute explanation of Deadlocks?" }
  ]);
  const [input, setInput] = useState("");
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), type: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: Date.now(),
        type: "ai",
        text: "That is a great question! Deadlocks occur when two or more processes are waiting for each other to release resources, causing a system halt. Think of it like two trains on the same track facing each other, waiting for the other to move."
      }]);
    }, 1e3);
  };
  return <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.95 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-[#0A0E17]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(181,255,69,0.05)] z-40 flex flex-col overflow-hidden"
  >
      {
    /* Chat Header */
  }
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 bg-gradient-to-r from-white/[0.02] to-transparent shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#B5FF45]/10 border border-[#B5FF45]/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#B5FF45]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Study Mentor</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B5FF45] shadow-[0_0_5px_#B5FF45]" />
              <span className="text-[10px] text-gray-400 font-medium">Online</span>
            </div>
          </div>
        </div>
        <button
    onClick={onClose}
    className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
  >
          <X className="w-4 h-4" />
        </button>
      </div>

      {
    /* Chat Messages */
  }
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
        {messages.map((msg) => <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.type === "user" ? "ml-auto flex-row-reverse" : ""}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.type === "ai" ? "bg-[#B5FF45]/10 text-[#B5FF45]" : "bg-white/10 text-gray-300"}`}>
              {msg.type === "ai" ? <BrainCircuit className="w-3 h-3" /> : <User className="w-3 h-3" />}
            </div>
            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.type === "user" ? "bg-white/10 text-white rounded-tr-sm" : "bg-gradient-to-br from-[#B5FF45]/10 to-transparent border border-[#B5FF45]/20 text-gray-200 rounded-tl-sm"}`}>
              {msg.text}
            </div>
          </div>)}
      </div>

      {
    /* Chat Input */
  }
      <div className="p-4 border-t border-white/10 bg-[#05080D]/50 shrink-0">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Ask a question or explain a topic..."
    className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 transition-all"
  />
          <button
    type="submit"
    disabled={!input.trim()}
    className="absolute right-2 p-1.5 text-gray-400 hover:text-[#B5FF45] disabled:opacity-50 disabled:hover:text-gray-400 transition-colors"
  >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </motion.div>;
}
