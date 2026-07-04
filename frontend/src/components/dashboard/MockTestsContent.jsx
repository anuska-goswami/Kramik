import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileEdit,
  Clock,
  HelpCircle,
  CheckCircle,
  PlayCircle,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  Send,
  Loader2
} from "lucide-react";
export function MockTestsContent({ onShowResult }) {
  const [activeScreen, setActiveScreen] = useState("list");
  const [selectedTest, setSelectedTest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const mockTests = [
    {
      id: "tcs-nqt",
      name: "TCS NQT Advanced Mock Test 04",
      company: "Tata Consultancy Services (NQT Pattern)",
      duration: 120,
      // mins
      questionsCount: 80,
      difficulty: "Medium",
      status: "Result Available",
      lastAttempt: "July 1, 2026",
      score: "81%"
    },
    {
      id: "amazon-oa",
      name: "Amazon Online Assessment Mock 02",
      company: "Amazon (SDE OA Pattern)",
      duration: 90,
      questionsCount: 3,
      difficulty: "Hard",
      status: "Take Test",
      lastAttempt: "Never"
    },
    {
      id: "infosys-se",
      name: "Infosys Systems Engineer Mock",
      company: "Infosys (Aptitude & Technical)",
      duration: 45,
      questionsCount: 40,
      difficulty: "Medium",
      status: "Take Test",
      lastAttempt: "Never"
    },
    {
      id: "accenture-apt",
      name: "Accenture Cognitive & Technical Assessment",
      company: "Accenture",
      duration: 90,
      questionsCount: 90,
      difficulty: "Easy",
      status: "Take Test",
      lastAttempt: "Never"
    }
  ];
  const questions = [
    {
      id: 1,
      text: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
      options: [
        "A. 120 metres",
        "B. 180 metres",
        "C. 324 metres",
        "D. 150 metres"
      ],
      correct: "D. 150 metres"
    },
    {
      id: 2,
      text: "Which of the following database concepts guarantees that either all database modifications are done, or none are?",
      options: [
        "A. Atomicity (ACID)",
        "B. Consistency",
        "C. Isolation",
        "D. Durability"
      ],
      correct: "A. Atomicity (ACID)"
    },
    {
      id: 3,
      text: "In computer networks, which routing protocol is commonly used inside an autonomous system and uses the link-state routing approach?",
      options: [
        "A. Border Gateway Protocol (BGP)",
        "B. Routing Information Protocol (RIP)",
        "C. Open Shortest Path First (OSPF)",
        "D. Intermediate System to Intermediate System (IS-IS)"
      ],
      correct: "C. Open Shortest Path First (OSPF)"
    }
  ];
  useEffect(() => {
    let timer;
    if (activeScreen === "taking" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1e3);
    } else if (activeScreen === "taking" && timeLeft === 0) {
      handleSubmitTest();
    }
    return () => clearInterval(timer);
  }, [activeScreen, timeLeft]);
  const handleStartTest = (test) => {
    setSelectedTest(test);
    setTimeLeft(test.duration * 60);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setActiveScreen("taking");
  };
  const handleSubmitTest = () => {
    setActiveScreen("submitting");
    setTimeout(() => {
      onShowResult();
    }, 2500);
  };
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ":" : ""}${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };
  return <div className="p-6 lg:p-8 max-w-[1600px] mx-auto text-white">
      <AnimatePresence mode="wait">
        
        {
    /* Mock Tests List Screen */
  }
        {activeScreen === "list" && <motion.div
    key="list"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    className="space-y-8"
  >
            <div>
              <h1 className="text-3xl lg:text-4xl font-heading font-bold tracking-tight text-white mb-2">
                Placement Mock Tests
              </h1>
              <p className="text-gray-400 text-sm max-w-2xl">
                Simulate real company online assessments. Build exam endurance, track accuracy, and get comprehensive AI insights.
              </p>
            </div>

            {
    /* Grid of Tests */
  }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTests.map((test) => {
    const isCompleted = test.status === "Result Available";
    return <div
      key={test.id}
      className={`relative overflow-hidden bg-[#0A0E17]/80 backdrop-blur-xl border ${isCompleted ? "border-[#B5FF45]/20 hover:border-[#B5FF45]/40" : "border-white/5 hover:border-white/10"} rounded-3xl p-6 transition-all duration-300 group`}
    >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B5FF45]/[0.01] rounded-full blur-[40px] pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B5FF45] bg-[#B5FF45]/10 px-2 py-0.5 rounded border border-[#B5FF45]/20">
                          {test.difficulty}
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#B5FF45] transition-colors mt-2">
                          {test.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">{test.company}</p>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-white/5 text-gray-400 group-hover:scale-110 transition-transform">
                        <FileEdit className="w-5 h-5 text-[#B5FF45]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-b border-white/5 py-4 my-4 text-xs font-semibold text-gray-400">
                      <div>
                        <span className="text-[10px] text-gray-500 block uppercase mb-1 font-bold">Duration</span>
                        <span className="text-white flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#B5FF45]" /> {test.duration} mins</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block uppercase mb-1 font-bold">Questions</span>
                        <span className="text-white flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5 text-blue-400" /> {test.questionsCount} MCQs</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block uppercase mb-1 font-bold">Last Attempt</span>
                        <span className="text-white">{test.lastAttempt}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-2">
                      {isCompleted ? <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#B5FF45]" />
                          <span className="text-xs text-gray-300">Previous Score: <strong className="text-[#B5FF45]">{test.score}</strong></span>
                        </div> : <div className="text-xs text-gray-500">Not attempted yet</div>}

                      {isCompleted ? <button
      onClick={onShowResult}
      className="px-4 py-2 bg-[#B5FF45]/10 hover:bg-[#B5FF45] text-[#B5FF45] hover:text-[#05080D] rounded-xl text-xs font-bold transition-all flex items-center gap-1"
    >
                          View Performance <ChevronRight className="w-4 h-4" />
                        </button> : <button
      onClick={() => handleStartTest(test)}
      className="px-5 py-2.5 bg-[#B5FF45] hover:bg-[#80E600] text-[#05080D] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(181,255,69,0.15)] hover:scale-[1.02]"
    >
                          Start Mock Test <PlayCircle className="w-4 h-4" />
                        </button>}
                    </div>
                  </div>;
  })}
            </div>
          </motion.div>}

        {
    /* Taking Test Simulated Screen */
  }
        {activeScreen === "taking" && <motion.div
    key="taking"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-6 max-w-4xl mx-auto"
  >
            {
    /* Header / Timer block */
  }
            <div className="bg-[#0A0E17]/90 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Currently Attempting</span>
                <h2 className="text-lg font-bold text-white mt-1">{selectedTest?.name}</h2>
              </div>
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-red-400 font-mono font-bold shrink-0">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>Time Remaining: {formatTime(timeLeft)}</span>
              </div>
            </div>

            {
    /* Questions area */
  }
            <div className="bg-[#0A0E17]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 space-y-6">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-500 border-b border-white/5 pb-4">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>Single Option Correct</span>
              </div>

              {
    /* Question Text */
  }
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white leading-relaxed">
                  {questions[currentQuestionIndex].text}
                </h3>

                {
    /* Options List */
  }
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {questions[currentQuestionIndex].options.map((opt) => {
    const isSelected = answers[currentQuestionIndex] === opt;
    return <button
      key={opt}
      onClick={() => setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: opt }))}
      className={`w-full text-left p-4 rounded-2xl border transition-all ${isSelected ? "bg-[#B5FF45]/10 border-[#B5FF45] text-white font-semibold" : "bg-white/[0.01] border-white/5 hover:bg-white/[0.02] text-gray-300"}`}
    >
                        {opt}
                      </button>;
  })}
                </div>
              </div>

              {
    /* Navigation controls */
  }
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
    disabled={currentQuestionIndex === 0}
    onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
  >
                  Previous
                </button>

                {currentQuestionIndex < questions.length - 1 ? <button
    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
    className="px-5 py-2 bg-[#B5FF45] hover:bg-[#80E600] text-[#05080D] rounded-xl text-xs font-bold transition-all"
  >
                    Next Question
                  </button> : <button
    onClick={handleSubmitTest}
    className="px-5 py-2.5 bg-gradient-to-r from-[#B5FF45] to-[#80E600] text-[#05080D] rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-[0_0_20px_rgba(181,255,69,0.2)] hover:scale-[1.02]"
  >
                    Submit Mock Test <Send className="w-3.5 h-3.5" />
                  </button>}
              </div>
            </div>

            {
    /* Prompt warning */
  }
            <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-400 leading-relaxed">
                Do not leave or refresh this screen. Leaving the mock assessment interface will cause the system to automatically submit your responses.
              </p>
            </div>
          </motion.div>}

        {
    /* Submitting Loading screen */
  }
        {activeScreen === "submitting" && <motion.div
    key="submitting"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center py-24 space-y-6 max-w-md mx-auto text-center"
  >
            <div className="relative">
              <div className="absolute inset-0 bg-[#B5FF45]/20 rounded-full blur-2xl animate-pulse" />
              <Loader2 className="w-16 h-16 text-[#B5FF45] animate-spin relative z-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Grading Mock Answers</h3>
              <p className="text-xs text-gray-400">Our AI Mentor is evaluating your answers against standard guidelines, calculating accuracy metrics, and compiling performance rank profiles...</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#B5FF45] font-semibold tracking-wider uppercase bg-[#B5FF45]/10 px-3 py-1 rounded-full border border-[#B5FF45]/20">
              <Sparkles className="w-3.5 h-3.5 animate-spin" /> Finalizing Assessment Results
            </div>
          </motion.div>}

      </AnimatePresence>
    </div>;
}
