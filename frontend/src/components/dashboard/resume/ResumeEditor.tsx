import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, FileText, Download, Check, Share2, Printer, 
  ChevronRight, ChevronLeft, Sparkles, User, BookOpen, Wrench, 
  Briefcase, Award, Trophy, Eye
} from 'lucide-react';
import { initialResumeData, ResumeData } from './types';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { AchievementsForm } from './forms/AchievementsForm';
import { ResumePreview } from './ResumePreview';

const steps = [
  { id: 'personal', title: 'Personal Info', icon: User },
  { id: 'education', title: 'Education', icon: BookOpen },
  { id: 'skills', title: 'Skills', icon: Wrench },
  { id: 'projects', title: 'Projects', icon: FileText },
  { id: 'experience', title: 'Experience', icon: Briefcase },
  { id: 'certifications', title: 'Certifications', icon: Award },
  { id: 'achievements', title: 'Achievements', icon: Trophy },
];

export function ResumeEditor({ onBack }: { onBack: () => void }) {
  const [data, setData] = useState<ResumeData>(initialResumeData);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const activeStep = steps[activeStepIndex];

  const handleNext = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  const updateData = (section: keyof ResumeData, value: any) => {
    setData(prev => ({ ...prev, [section]: value }));
  };

  return (
    <div className="h-full flex flex-col max-w-[1600px] mx-auto text-white overflow-hidden">
      {/* Top Header */}
      <div className="flex-none p-4 md:p-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 bg-[#05080D] z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">Untitled Resume</h2>
            <p className="text-xs text-gray-500">Last saved just now</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 mr-4 border-r border-white/10 pr-4">
             <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
               <span className="w-2 h-2 rounded-full bg-[#B5FF45]" />
               ATS Score: <span className="text-white font-bold">78/100</span>
             </div>
          </div>
          
          <button 
            className="lg:hidden flex items-center justify-center p-2.5 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setShowMobilePreview(true)}
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button className="hidden sm:flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#B5FF45] text-[#05080D] rounded-xl text-sm font-semibold hover:bg-[#a0e63b] transition-all shadow-[0_0_15px_rgba(181,255,69,0.2)]">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        
        {/* Left Column - Stepper & Form */}
        <div className="flex-1 lg:w-1/2 flex flex-col min-h-0 border-r border-white/5">
          {/* Stepper */}
          <div className="flex-none px-4 md:px-8 py-4 overflow-x-auto custom-scrollbar border-b border-white/5 bg-[#0A0E17]/30">
            <div className="flex items-center gap-2 min-w-max">
              {steps.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isCompleted = idx < activeStepIndex;
                return (
                  <div key={step.id} className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveStepIndex(idx)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive 
                          ? 'bg-[#B5FF45]/10 text-[#B5FF45] border border-[#B5FF45]/20' 
                          : isCompleted 
                            ? 'text-gray-300 hover:bg-white/5' 
                            : 'text-gray-600 hover:text-gray-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : <step.icon className="w-3.5 h-3.5" />}
                      {step.title}
                    </button>
                    {idx < steps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-gray-700 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 bg-[#05080D]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-2xl mx-auto h-full flex flex-col"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="p-2.5 bg-[#B5FF45]/10 text-[#B5FF45] rounded-xl">
                    <activeStep.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{activeStep.title}</h3>
                    <p className="text-xs text-gray-400">Provide your {activeStep.title.toLowerCase()} details.</p>
                  </div>
                </div>

                <div className="flex-1 pb-8">
                  {activeStep.id === 'personal' && <PersonalInfoForm data={data.personal} onChange={(val) => updateData('personal', val)} />}
                  {activeStep.id === 'education' && <EducationForm data={data.education} onChange={(val) => updateData('education', val)} />}
                  {activeStep.id === 'skills' && <SkillsForm data={data.skills} onChange={(val) => updateData('skills', val)} />}
                  {activeStep.id === 'projects' && <ProjectsForm data={data.projects} onChange={(val) => updateData('projects', val)} />}
                  {activeStep.id === 'experience' && <ExperienceForm data={data.experience} onChange={(val) => updateData('experience', val)} />}
                  {activeStep.id === 'certifications' && <CertificationsForm data={data.certifications} onChange={(val) => updateData('certifications', val)} />}
                  {activeStep.id === 'achievements' && <AchievementsForm data={data.achievements} onChange={(val) => updateData('achievements', val)} />}
                </div>

                {/* Navigation Buttons */}
                <div className="flex-none pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                  <button
                    onClick={handlePrev}
                    disabled={activeStepIndex === 0}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      activeStepIndex === 0 ? 'opacity-0 pointer-events-none' : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={handleNext}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      activeStepIndex === steps.length - 1 
                        ? 'bg-[#B5FF45]/10 text-[#B5FF45] border border-[#B5FF45]/20 hover:bg-[#B5FF45] hover:text-[#05080D]' 
                        : 'bg-white text-[#05080D] hover:bg-gray-200'
                    }`}
                  >
                    {activeStepIndex === steps.length - 1 ? 'Finish' : 'Next Step'} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column - Live Preview (Desktop) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#0A0E17]/40 flex-col min-h-0 relative">
          {/* AI Assistant Overlay/Panel */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#B5FF45]/10 text-[#B5FF45] border border-[#B5FF45]/30 rounded-lg text-xs font-semibold hover:bg-[#B5FF45] hover:text-[#05080D] transition-colors backdrop-blur-sm shadow-xl">
              <Sparkles className="w-3.5 h-3.5" /> AI Resume Assistant
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden text-black min-h-[1056px] w-full max-w-[794px] mx-auto transform origin-top transition-transform duration-300">
               <ResumePreview data={data} />
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Preview Modal */}
      <AnimatePresence>
        {showMobilePreview && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-0 z-50 bg-[#05080D] flex flex-col lg:hidden"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0A0E17]">
              <h3 className="font-bold text-white">Live Preview</h3>
              <button 
                onClick={() => setShowMobilePreview(false)}
                className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-semibold hover:bg-white/20"
              >
                Close Preview
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden text-black min-h-[1056px] w-[794px] mx-auto origin-top-left scale-[0.4] sm:scale-75 md:scale-90">
                 <ResumePreview data={data} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
