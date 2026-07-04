import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Terminal,
  MessageSquare,
  FileText,
  Target,
  Mic,
  Briefcase,
  ChevronRight,
  Sparkles,
  BookOpen,
  Clock,
  ChevronDown
} from "lucide-react";
import { interviewCategories } from "../../data/interviewData";
const iconMap = {
  Users,
  Terminal,
  MessageSquare,
  FileText,
  Target,
  Mic,
  Briefcase,
  UsersRound: Users
};
const categoryData = {
  "hr-interview": [
    {
      q: "Tell me about yourself.",
      tip: "Use the Present-Past-Future formula. Keep it professional and related to the role.",
      points: ["Current role/studies", "Relevant past experience", "Why you are here"],
      mistakes: ["Telling your life story", "Repeating your resume exactly"]
    },
    {
      q: "Why should we hire you?",
      tip: "Align your skills with the job description. Show enthusiasm and cultural fit.",
      points: ["Unique skills", "Relevant experience", "Passion for the company"],
      mistakes: ["Sounding arrogant", "Giving generic answers"]
    },
    {
      q: "What are your strengths and weaknesses?",
      tip: "Be honest but strategic. Choose a weakness you are actively improving.",
      points: ["Real strengths with examples", "A true weakness", "Action plan to improve"],
      mistakes: ['"I work too hard"', "Listing unrelated strengths"]
    },
    {
      q: "Where do you see yourself in five years?",
      tip: "Show ambition but realistic alignment with the company's growth path.",
      points: ["Career progression", "Skill mastery", "Leadership goals"],
      mistakes: ['"In your job"', "Having no clear goals"]
    }
  ],
  "technical-interview": [
    {
      q: "Explain the internal working of a HashMap.",
      tip: "Discuss hashing, buckets, collision resolution (chaining/open addressing), and load factor.",
      points: ["Hash function", "Array of nodes", "O(1) average time complexity"],
      mistakes: ["Confusing HashMap with HashTable", "Forgetting collision handling"]
    },
    {
      q: "What is the difference between TCP and UDP?",
      tip: "Focus on reliability, connection state, and use cases (e.g., streaming vs file transfer).",
      points: ["Connection-oriented vs connectionless", "Reliability and ordering", "Speed differences"],
      mistakes: ["Saying UDP is always better", "Unable to give real-world examples"]
    }
  ],
  "behavioral-questions": [
    {
      q: "Describe a situation where you had to meet a tight deadline.",
      tip: "Use the STAR method. Emphasize your time management and prioritization skills.",
      points: ["Situation: The tight deadline", "Task: What needed to be done", "Action: How you prioritized", "Result: Successful delivery"],
      mistakes: ["Blaming others for the deadline", "Skipping the Result part"]
    },
    {
      q: "Tell me about a time you had a conflict with a team member.",
      tip: "Focus on your communication and conflict resolution skills, not the drama.",
      points: ["The root of the conflict", "How you approached them professionally", "The compromise/resolution"],
      mistakes: ["Speaking negatively about the teammate", "Saying you never have conflicts"]
    }
  ],
  "resume-based": [
    {
      q: "I see you used React in your main project. Why did you choose it over Angular?",
      tip: "Show deep understanding of the tool. Discuss component-based architecture and ecosystem.",
      points: ["Virtual DOM performance", "Component reusability", "Large community and libraries"],
      mistakes: ['"Because everyone uses it"', "Unable to explain Virtual DOM"]
    }
  ]
};
export function InterviewDetailPage({ onBack }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = interviewCategories.find((c) => c.id === id) || interviewCategories[0];
  const Icon = iconMap[category.iconName] || BookOpen;
  const [expandedQs, setExpandedQs] = useState([]);
  const toggleQ = (index) => {
    if (expandedQs.includes(index)) {
      setExpandedQs(expandedQs.filter((i) => i !== index));
    } else {
      setExpandedQs([...expandedQs, index]);
    }
  };
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/interview-prep");
    }
  };
  const questions = categoryData[id || ""] || categoryData["hr-interview"];
  return <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-6 lg:p-8 space-y-8 max-w-[1200px] mx-auto text-white"
  >
      {
    /* Breadcrumbs */
  }
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <button
    onClick={handleBack}
    className="hover:text-white flex items-center gap-1 transition-colors"
  >
          <ArrowLeft className="w-4 h-4" />
          Interview Prep
        </button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#B5FF45] font-medium">{category.title}</span>
      </div>

      {
    /* Hero Card */
  }
      <div className="bg-[#0A0E17]/80 border border-white/5 rounded-3xl p-6 lg:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B5FF45]/5 to-transparent opacity-50" />
        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="flex items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0 text-[#B5FF45]">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{category.title}</h1>
              <p className="text-sm text-gray-400 max-w-xl">{category.description}</p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {category.estimatedTime}</span>
              <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> {questions.length} Questions</span>
            </div>
            <button className="px-6 py-2.5 bg-[#B5FF45] text-[#05080D] rounded-xl font-semibold hover:bg-[#a0e63b] transition-all shadow-[0_0_20px_rgba(181,255,69,0.3)]">
              Continue Learning
            </button>
          </div>
        </div>
      </div>

      {
    /* Progress */
  }
      <div className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-white">Your Progress</h3>
          <span className="text-sm font-semibold text-[#B5FF45]">{category.progress}% Complete</span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#B5FF45] rounded-full" style={{ width: `${category.progress}%` }} />
        </div>
      </div>

      {
    /* Questions Content */
  }
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white mb-6">Common Questions</h2>
        {questions.map((item, idx) => <div key={idx} className="bg-[#0A0E17]/60 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
            <div
    className="p-6 cursor-pointer flex justify-between items-start gap-4"
    onClick={() => toggleQ(idx)}
  >
              <h3 className="text-base md:text-lg font-medium text-white">{item.q}</h3>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform shrink-0 mt-1 ${expandedQs.includes(idx) ? "rotate-180" : ""}`} />
            </div>
            
            <AnimatePresence>
              {expandedQs.includes(idx) && <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    className="overflow-hidden border-t border-white/5"
  >
                  <div className="p-6 bg-black/20 space-y-6">
                    <div className="flex items-start gap-3 p-4 bg-[#B5FF45]/5 rounded-xl border border-[#B5FF45]/20">
                      <Sparkles className="w-5 h-5 text-[#B5FF45] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-[#B5FF45] mb-1">AI Preparation Tip</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">{item.tip}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-3">Key Points to Include</h4>
                        <ul className="space-y-2">
                          {item.points.map((pt, pIdx) => <li key={pIdx} className="flex items-start gap-2 text-sm text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                              {pt}
                            </li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-3">Common Mistakes</h4>
                        <ul className="space-y-2">
                          {item.mistakes.map((mistake, mIdx) => <li key={mIdx} className="flex items-start gap-2 text-sm text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                              {mistake}
                            </li>)}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button className="px-5 py-2.5 bg-white/5 hover:bg-[#B5FF45] hover:text-[#05080D] rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                        <Mic className="w-4 h-4" /> Practice Answer
                      </button>
                    </div>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </div>)}
      </div>
    </motion.div>;
}
