import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Target, Users, BookOpen, Brain, 
  FileText, BarChart3, Briefcase, Sparkles, Star, 
  ChevronDown, HelpCircle, Trophy, Zap, Sparkle, 
  Laptop, Smartphone, ClipboardCheck, ArrowUpRight,
  Shield, Check, Mail, Map as MapIcon, GraduationCap, LayoutDashboard
} from 'lucide-react';
import { DashboardPreview } from './DashboardPreview';

// Animated Counter Component using IntersectionObserver / useInView
function AnimatedCounter({ value, suffix = '', duration = 1.5 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 16);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / (totalMiliseconds / incrementTime));
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Single FAQ Item Component (Accordion)
function FAQItem({ question, answer }: { question: string; answer: string; key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-300 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-semibold text-white text-base pr-4 font-heading">{question}</span>
        <span className={`p-1.5 rounded-lg bg-white/5 text-text-secondary hover:text-white transition-all duration-300 transform shrink-0 ${isOpen ? 'rotate-180 text-[#B5FF45]' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6 text-sm sm:text-base text-text-secondary leading-relaxed border-t border-white/[0.03] pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  const navigate = useNavigate();

  // Features list
  const features = [
    {
      icon: MapIcon,
      title: "Personalized Roadmap",
      desc: "Instant bespoke study planners based on your time constraints, goal companies, and chosen subjects with simple status checkboxes.",
      accent: "from-[#B5FF45] to-[#80E600]"
    },
    {
      icon: Sparkles,
      title: "AI Guidance",
      desc: "Smart conceptual explanations, detailed exam feedback, and instant doubt assistance to optimize your preparation loops.",
      accent: "from-[#00F0FF] to-[#0072FF]"
    },
    {
      icon: Users,
      title: "Mock Interviews",
      desc: "Simulate pressure-packed behavioral and tech interviews with instant grading, scoring charts, and detailed core feedback.",
      accent: "from-[#FF3B30] to-[#FF9500]"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      desc: "Keep tabs on completed syllabus modules, active learning streaks, mock test score lines, and individual subject progress metrics.",
      accent: "from-[#AF52DE] to-[#5856D6]"
    },
    {
      icon: Briefcase,
      title: "Company-wise Preparation",
      desc: "Target top tech giants or tier-2 consultancies with specialized question pools, previous patterns, and high-frequency company-specific cards.",
      accent: "from-[#34C759] to-[#30B0C7]"
    }
  ];

  // Process timeline
  const processSteps = [
    {
      number: "01",
      icon: Target,
      title: "Set Goal",
      desc: "Choose target roles and preparation timelines to configure your custom roadmap."
    },
    {
      number: "02",
      icon: BookOpen,
      title: "Learn",
      desc: "Master key engineering subjects, DBMS, OS, computer networks, and OOP with clear modules."
    },
    {
      number: "03",
      icon: Brain,
      title: "Practice",
      desc: "Solve specialized quant drills, analytical puzzles, and company placement question pools."
    },
    {
      number: "04",
      icon: BarChart3,
      title: "Track Progress",
      desc: "Analyze score progress metrics, review bookmark folders, and monitor your preparation trends."
    },
    {
      number: "05",
      icon: Trophy,
      title: "Get Placed",
      desc: "Acquire full interview readiness, optimize ATS resume cards, and confidently land your offer."
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Incoming SDE at Google | CSE Student",
      review: "KRAMIK's personalized roadmap completely changed how I prepared. The step-by-step tracking kept me focused, and the SQL practice questions matched my interviews perfectly!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Rohan Verma",
      role: "Software Engineer at Amazon | IT Student",
      review: "The AI Guidance acted like a personal mentor, reviewing my answers and explaining complex OS scheduling in seconds. The resume builder helped me bypass ATS screens with ease.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Ananya Iyer",
      role: "Graduate Trainee at TCS | ECE Student",
      review: "As an ECE student, core CS subjects and aptitude felt daunting. KRAMIK structured everything so beautifully that I cleared my coding assessments and mock interviews on the first try!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "What is KRAMIK?",
      answer: "KRAMIK is an all-in-one AI-powered placement preparation platform. It helps students master aptitude drills, core computer science subjects (DBMS, OS, CN, OOP, SQL), company-specific requirements, and technical interviews through tailored roadmaps and modern progress tracking."
    },
    {
      question: "Is KRAMIK free to use?",
      answer: "Yes! KRAMIK is free to get started. You can build your custom roadmaps, complete core subject preparation, and track your progress without any upfront costs."
    },
    {
      question: "How does the personalized roadmap work?",
      answer: "Simply input your target role, preparation timeline (number of days), and select your desired subjects. KRAMIK instantly aggregates the highest-yield topics into a day-by-day study calendar so you know exactly what to learn and practice each day."
    },
    {
      question: "Can I prepare for company-specific placements?",
      answer: "Absolutely. KRAMIK features dedicated company prep sheets containing previous interview questions, exam patterns, and service/product-based tech case studies (for Google, TCS, and more)."
    },
    {
      question: "Does KRAMIK provide AI guidance?",
      answer: "Yes, KRAMIK features deep AI integration that provides smart explanations, answers your doubts on core topics, and evaluates your performance in mock rounds to bridge your learning gaps."
    },
    {
      question: "Can I build my resume using KRAMIK?",
      answer: "Yes! KRAMIK includes an interactive Resume Builder designed to help you structure your resume, optimize it for ATS scanners, craft strong impact bullet points, and showcase your GitHub/portfolio."
    }
  ];

  // Mockup callouts
  const callouts = [
    { label: "Roadmap", text: "Custom day-by-day learning schedules", pos: "lg:top-12 lg:-left-20" },
    { label: "Aptitude", text: "Quantitative & verbal mock drills", pos: "lg:top-1/3 lg:-left-28" },
    { label: "Company Prep", text: "Targeted questions for tech giants", pos: "lg:bottom-16 lg:-left-16" },
    { label: "Interview Prep", text: "Behavioral & coding mock setups", pos: "lg:top-16 lg:-right-20" },
    { label: "Resume Builder", text: "ATS-optimized layouts & strong bullets", pos: "lg:top-[45%] lg:-right-24" },
    { label: "Performance Tracking", text: "Real-time analytics & subject progress", pos: "lg:bottom-20 lg:-right-16" }
  ];

  return (
    <div className="bg-[#05080D] text-white overflow-hidden font-sans">
      
      {/* SECTION 1: HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Ambient background glow designs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#B5FF45]/[0.03] blur-[130px] pointer-events-none" />
        <div className="absolute top-[25%] right-[-10%] w-[45%] h-[55%] rounded-full bg-[#B5FF45]/[0.02] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-[#B5FF45]/[0.015] blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-[1280px]">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Column: Content */}
            <div className="w-full lg:w-[45%] flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl lg:max-w-none mx-auto">
              
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B5FF45]/20 bg-white/5 backdrop-blur-md mb-6"
              >
                <Sparkle className="w-4 h-4 text-[#B5FF45] animate-pulse" />
                <span className="text-xs font-bold text-text-secondary tracking-wide uppercase">AI-Powered Placement Suite</span>
              </motion.div>
   
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading tracking-tight leading-[1.1] mb-6 text-white"
              >
                One Step <br />
                <span className="bg-gradient-to-r from-[#B5FF45] via-[#9CE633] to-[#73CC14] bg-clip-text text-transparent">Ahead.</span>
              </motion.h1>
   
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-text-secondary mb-8 max-w-lg leading-relaxed font-normal"
              >
                Your all-in-one AI-powered placement preparation platform for aptitude, core subjects, company preparation, interview readiness, personalized roadmaps, and resume building.
              </motion.p>
   
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
              >
                <button 
                  onClick={() => navigate('/signup')}
                  className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 h-12 bg-[#B5FF45] text-[#05080D] font-bold rounded-xl shadow-[0_4px_20px_rgba(181,255,69,0.2)] hover:bg-[#c3ff5c] hover:shadow-[0_4px_30px_rgba(181,255,69,0.35)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  Get Started
                  <ArrowRight className="w-4.5 h-4.5 stroke-[2.5px] transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <a 
                  href="#features"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 h-12 bg-transparent text-white font-semibold rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-white/10 active:scale-95 transition-all duration-300"
                >
                  Explore Features
                </a>
              </motion.div>
   
              {/* Dynamic Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-[2.5px] border-[#05080D] overflow-hidden bg-white/5">
                      <img src={`https://i.pravatar.cc/100?img=${i * 12 + 6}`} alt={`Alumni ${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-text-secondary font-medium text-center sm:text-left">
                  <span className="text-[#B5FF45] font-bold">10,000+</span> CSE, IT & Core students already placement-ready.
                </p>
              </motion.div>
            </div>
  
            {/* Right Column: Hero Mockup */}
            <div className="w-full lg:w-[55%] relative flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full relative z-10 max-w-[560px] lg:max-w-none"
              >
                {/* Visual Glass Platform Background */}
                <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-[#B5FF45]/5 to-transparent blur-3xl -z-10" />
                <DashboardPreview />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUSTED NUMBERS */}
      <section className="py-12 border-y border-white/5 bg-gradient-to-b from-transparent to-white/[0.01]">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-[1280px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            
            {/* Stat 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md flex flex-col items-center text-center justify-between group hover:border-[#B5FF45]/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#B5FF45]/5 flex items-center justify-center border border-[#B5FF45]/10 mb-3 text-[#B5FF45] group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <AnimatedCounter value={10000} suffix="+" />
                <span className="text-xs text-text-secondary mt-1 uppercase tracking-wider font-semibold">Students Preparing</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md flex flex-col items-center text-center justify-between group hover:border-[#B5FF45]/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#B5FF45]/5 flex items-center justify-center border border-[#B5FF45]/10 mb-3 text-[#B5FF45] group-hover:scale-110 transition-transform">
                <Brain className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <AnimatedCounter value={5000} suffix="+" />
                <span className="text-xs text-text-secondary mt-1 uppercase tracking-wider font-semibold">Questions Available</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md flex flex-col items-center text-center justify-between group hover:border-[#B5FF45]/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#B5FF45]/5 flex items-center justify-center border border-[#B5FF45]/10 mb-3 text-[#B5FF45] group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <AnimatedCounter value={120} suffix="+" />
                <span className="text-xs text-text-secondary mt-1 uppercase tracking-wider font-semibold">Mock Tests</span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md flex flex-col items-center text-center justify-between group hover:border-[#B5FF45]/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#B5FF45]/5 flex items-center justify-center border border-[#B5FF45]/10 mb-3 text-[#B5FF45] group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <AnimatedCounter value={50} suffix="+" />
                <span className="text-xs text-text-secondary mt-1 uppercase tracking-wider font-semibold">Companies Covered</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURES GRID */}
      <section id="features" className="py-20 lg:py-28 relative">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#B5FF45]/[0.01] blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-[1280px]">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 space-y-4">
            <span className="text-[#B5FF45] text-xs font-bold uppercase tracking-wider block">Comprehensive Platform</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight leading-tight">
              Engineered to Deliver Results
            </h2>
            <p className="text-base text-text-secondary max-w-xl mx-auto">
              Everything you need to study, practice, review, and mock placement interviews in a single beautifully unified dashboard.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, borderColor: 'rgba(181, 255, 69, 0.25)', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                className="p-6 sm:p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between h-[280px] relative overflow-hidden transition-all duration-300 shadow-md group"
              >
                {/* Accent Highlight Corner */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feat.accent} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 blur-xl`} />
                <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#B5FF45] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white group-hover:text-[#B5FF45] group-hover:border-[#B5FF45]/20 group-hover:bg-[#B5FF45]/5 transition-all duration-300">
                    <feat.icon className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-white tracking-tight">{feat.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-4">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
            
            {/* Feature Placeholder / Action card */}
            <motion.div
              whileHover={{ y: -6 }}
              onClick={() => navigate('/signup')}
              className="p-6 sm:p-8 rounded-2xl border border-dashed border-[#B5FF45]/20 bg-gradient-to-br from-[#B5FF45]/[0.02] to-transparent flex flex-col justify-between h-[280px] relative transition-all duration-300 cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-full bg-[#B5FF45]/10 flex items-center justify-center text-[#B5FF45] mb-2 shadow-[0_0_12px_rgba(181,255,69,0.1)]">
                  <Zap className="w-5 h-5 text-[#B5FF45]" />
                </div>
                <h3 className="text-lg font-bold font-heading text-white tracking-tight">Ready to excel?</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Join thousands of other successful students and start your custom daily roadmap immediately.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#B5FF45] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                Get started free <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW KRAMIK WORKS */}
      <section id="how-it-works" className="py-20 lg:py-28 border-t border-white/5 bg-gradient-to-b from-white/[0.005] to-transparent relative">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-[1280px]">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20 space-y-4">
            <span className="text-[#B5FF45] text-xs font-bold uppercase tracking-wider block">Structured Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              Your Complete Preparation Loop
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              A straightforward, outcome-focused methodology designed to take you from core basics to high-value offers.
            </p>
          </div>

          {/* Process Timeline */}
          <div className="relative">
            {/* Connecting Horizontal Line (visible on desktop md) */}
            <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-10">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group relative px-2">
                  
                  {/* Step Bubble Indicator */}
                  <div className="w-22 h-22 rounded-full border border-white/10 bg-[#0A0E17] flex items-center justify-center relative z-10 transition-all duration-500 group-hover:border-[#B5FF45] group-hover:shadow-[0_0_20px_rgba(181,255,69,0.15)] mb-6">
                    <step.icon className="w-8 h-8 text-text-secondary group-hover:text-[#B5FF45] transition-colors duration-300" />
                    
                    {/* Floating Step Number */}
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#111827] border border-white/5 text-[10px] font-bold text-text-secondary flex items-center justify-center group-hover:border-[#B5FF45]/30 group-hover:text-[#B5FF45] transition-all">
                      {step.number}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-base font-bold font-heading text-white tracking-tight mb-2 group-hover:text-[#B5FF45] transition-colors">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[180px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PREMIUM DASHBOARD PREVIEW */}
      <section id="dashboard-preview" className="py-20 lg:py-28 border-t border-white/5 relative bg-[#070B13]/30">
        <div className="absolute top-[-5%] right-[20%] w-[45%] h-[45%] rounded-full bg-[#B5FF45]/[0.015] blur-[140px] pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-[1280px]">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20 space-y-4">
            <span className="text-[#B5FF45] text-xs font-bold uppercase tracking-wider block">Visual Sneak Peek</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              The KRAMIK Preparation Interface
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              A distraction-free engineering environment. See your syllabus, review progress graphs, and complete mock cards at a glance.
            </p>
          </div>

          {/* Interactive Layout: Mockup in center, floating callouts around */}
          <div className="relative flex flex-col items-center">
            
            {/* Desktop Surrounding Callouts */}
            <div className="w-full relative min-h-[640px] hidden lg:flex items-center justify-center">
              
              {/* Central Browser Mockup */}
              <div className="w-full max-w-[760px] relative z-10">
                <div className="rounded-2xl border border-white/10 bg-[#0B101A]/80 backdrop-blur-2xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-left">
                  {/* Browser Top Controls */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.01] shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="px-8 py-1 rounded bg-white/5 border border-white/[0.03] text-[10px] text-text-secondary select-none font-mono">
                      kramik.com/dashboard
                    </div>
                    <div className="w-14" />
                  </div>

                  {/* Mockup content wrapper */}
                  <div className="h-[460px] overflow-hidden opacity-90 scale-[0.99] origin-top">
                    <DashboardPreview />
                  </div>
                </div>
              </div>

              {/* Callouts rendered as absolutely positioned glass pills on Desktop */}
              {callouts.map((call, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: idx % 2 === 0 ? [-4, 4, -4] : [4, -4, 4] }}
                  transition={{ duration: 5 + idx, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute ${call.pos} z-20 p-4 rounded-xl border border-[#B5FF45]/10 bg-[#0A0E17]/90 backdrop-blur-md shadow-xl w-60 text-left`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B5FF45] shadow-[0_0_6px_#B5FF45]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-heading">{call.label}</span>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">{call.text}</p>
                </motion.div>
              ))}

            </div>

            {/* Mobile Representation of browser mockup and callout cards */}
            <div className="w-full lg:hidden space-y-8">
              <div className="rounded-2xl border border-white/10 bg-[#0B101A]/80 shadow-2xl overflow-hidden flex flex-col text-left">
                {/* Browser bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.01]">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="px-4 py-0.5 rounded bg-white/5 text-[9px] text-text-secondary font-mono">
                    kramik.com/dashboard
                  </div>
                  <div className="w-8" />
                </div>
                
                {/* Simulated simplified viewport */}
                <div className="h-[360px] overflow-hidden relative">
                  <DashboardPreview />
                </div>
              </div>

              {/* Mobile Callout Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {callouts.map((call, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B5FF45]" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider font-heading">{call.label}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-normal">{call.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-12 lg:mt-16 text-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="group inline-flex items-center justify-center gap-2 px-8 h-12 bg-[#B5FF45] text-[#05080D] font-bold rounded-xl shadow-[0_4px_20px_rgba(181,255,69,0.15)] hover:bg-[#c3ff5c] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                View Dashboard
                <LayoutDashboard className="w-4.5 h-4.5 stroke-[2.5px] transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section id="testimonials" className="py-20 lg:py-28 border-t border-white/5 relative">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-[1280px]">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20 space-y-4">
            <span className="text-[#B5FF45] text-xs font-bold uppercase tracking-wider block">Success Stories</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              Highly Rated by Placement Achievers
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              See how students from diverse backgrounds leveraged KRAMIK to master technical rounds and get placed.
            </p>
          </div>

          {/* Grid Layout of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, borderColor: 'rgba(255, 255, 255, 0.1)' }}
                className="p-6 sm:p-8 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md flex flex-col justify-between space-y-6 transition-all duration-300 relative shadow-md"
              >
                {/* Stars Row */}
                <div className="flex items-center gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#B5FF45]" fill="currentColor" />
                  ))}
                </div>

                {/* Review Paragraph */}
                <p className="text-sm text-text-secondary leading-relaxed italic">
                  "{test.review}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-white/[0.03]">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
                    <img src={test.avatar} alt={test.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white tracking-tight leading-tight">{test.name}</h4>
                    <span className="text-[11px] text-text-secondary font-medium leading-none mt-1 block">{test.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ SECTION (ACCORDION) */}
      <section id="faq" className="py-20 lg:py-28 border-t border-white/5 relative bg-gradient-to-b from-transparent to-[#05080D]">
        <div className="absolute bottom-0 left-[10%] w-[45%] h-[35%] rounded-full bg-[#B5FF45]/[0.01] blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-[840px]">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20 space-y-4">
            <span className="text-[#B5FF45] text-xs font-bold uppercase tracking-wider block">Have Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              Everything you need to know about the KRAMIK preparation suite and personalized roadmap tool.
            </p>
          </div>

          {/* FAQ Accordion list */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {/* Bottom Action Support Badge */}
          <div className="mt-14 text-center p-6 rounded-2xl border border-white/5 bg-white/[0.01] max-w-md mx-auto">
            <HelpCircle className="w-6 h-6 text-[#B5FF45] mx-auto mb-2.5" />
            <h4 className="text-sm font-bold text-white mb-1">Still have questions?</h4>
            <p className="text-xs text-text-secondary mb-3">Our technical placement advisors are always here to support.</p>
            <a href="mailto:support@kramik.com" className="text-xs font-bold text-[#B5FF45] hover:underline uppercase tracking-wide">
              support@kramik.com
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
