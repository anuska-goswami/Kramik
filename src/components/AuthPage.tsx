import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, EyeOff, ArrowRight, CheckCircle, Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type AuthMode = 'signin' | 'signup';

interface AuthPageProps {
  onBack: () => void;
  onSuccess?: () => void;
}

export function AuthPage({ onBack, onSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(); // Set authenticated state
      if (onSuccess) {
        onSuccess();
      } else {
        onBack();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-navy)] text-white flex items-center justify-center relative overflow-hidden py-12 px-6">
      
      {/* Background Glows & Texture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[800px] rounded-full bg-[#B5FF45]/[0.05] blur-[150px] pointer-events-none" />
      
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      />

      {/* Close/Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 z-50 p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
      >
        <ArrowRight className="w-5 h-5 rotate-180" />
      </button>

      {/* Auth Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[480px] bg-white/[0.04] backdrop-blur-[24px] border border-white/[0.08] rounded-[28px] p-8 sm:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="text-2xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-[#B5FF45] to-[#D7FF88] bg-clip-text text-transparent">K</span>
            <span className="text-white">ramik</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-sm text-gray-400">
            {mode === 'signin' ? 'Sign in to continue your preparation.' : 'Join Kramik to accelerate your placement preparation.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="relative flex items-center p-1 bg-white/5 border border-white/5 rounded-full mb-8">
          <motion.div 
            className="absolute h-[calc(100%-8px)] rounded-full bg-gradient-to-r from-[#B5FF45] to-[#9AE52B] top-1 bottom-1 shadow-sm"
            layoutId="tab-indicator"
            initial={false}
            animate={{
              width: 'calc(50% - 4px)',
              x: mode === 'signin' ? 4 : '100%',
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button 
            onClick={() => setMode('signin')}
            className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300 ${mode === 'signin' ? 'text-[#05080D]' : 'text-gray-400 hover:text-white'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setMode('signup')}
            className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300 ${mode === 'signup' ? 'text-[#05080D]' : 'text-gray-400 hover:text-white'}`}
          >
            Sign Up
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {mode === 'signup' && (
              <div className="relative group">
                <input 
                  type="text" 
                  id="fullname"
                  placeholder=" "
                  className="block w-full px-4 pt-6 pb-2 text-white bg-white/[0.03] border border-white/10 rounded-2xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
                  required
                />
                <label 
                  htmlFor="fullname" 
                  className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
                >
                  Full Name
                </label>
              </div>
            )}

            <div className="relative group">
              <input 
                type="email" 
                id="email"
                placeholder=" "
                className="block w-full px-4 pt-6 pb-2 text-white bg-white/[0.03] border border-white/10 rounded-2xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
                required
              />
              <label 
                htmlFor="email" 
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
              >
                Email Address
              </label>
            </div>

            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=" "
                className="block w-full px-4 pt-6 pb-2 text-white bg-white/[0.03] border border-white/10 rounded-2xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer pr-12 h-14"
                required
              />
              <label 
                htmlFor="password" 
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
              >
                Password
              </label>
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {mode === 'signup' && (
              <>
                <div className="relative group">
                  <input 
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder=" "
                    className="block w-full px-4 pt-6 pb-2 text-white bg-white/[0.03] border border-white/10 rounded-2xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#B5FF45]/50 focus:border-[#B5FF45]/50 focus:bg-white/[0.05] transition-all duration-300 peer h-14"
                    required
                  />
                  <label 
                    htmlFor="confirmPassword" 
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-[18px] z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#B5FF45]"
                  >
                    Confirm Password
                  </label>
                </div>
                
                {/* Password Strength Indicator */}
                <div className="flex gap-1.5 mt-1 px-1">
                  <div className="h-1 flex-1 rounded-full bg-[#B5FF45]"></div>
                  <div className="h-1 flex-1 rounded-full bg-[#B5FF45]"></div>
                  <div className="h-1 flex-1 rounded-full bg-white/10"></div>
                  <div className="h-1 flex-1 rounded-full bg-white/10"></div>
                </div>
              </>
            )}

            {mode === 'signin' && (
              <div className="flex items-center justify-between mt-1 px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative w-4 h-4 rounded border border-white/20 bg-white/5 group-hover:border-[#B5FF45]/50 transition-colors flex items-center justify-center">
                    <input type="checkbox" className="absolute opacity-0 w-full h-full cursor-pointer peer" />
                    <CheckCircle className="w-3 h-3 text-[#B5FF45] opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-sm text-gray-400 hover:text-[#B5FF45] transition-colors hover:underline underline-offset-4">Forgot password?</a>
              </div>
            )}

            {mode === 'signup' && (
              <label className="flex items-start gap-3 mt-1 px-1 cursor-pointer group">
                <div className="relative w-4 h-4 rounded border border-white/20 bg-white/5 group-hover:border-[#B5FF45]/50 transition-colors flex items-center justify-center shrink-0 mt-0.5">
                  <input type="checkbox" className="absolute opacity-0 w-full h-full cursor-pointer peer" required />
                  <CheckCircle className="w-3 h-3 text-[#B5FF45] opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm text-gray-400 leading-relaxed">
                  I agree to the <a href="#" className="text-white hover:text-[#B5FF45] hover:underline underline-offset-4 transition-colors">Terms of Service</a> and <a href="#" className="text-white hover:text-[#B5FF45] hover:underline underline-offset-4 transition-colors">Privacy Policy</a>
                </span>
              </label>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-2 bg-gradient-to-r from-[#B5FF45] to-[#9AE52B] text-[#05080D] font-bold rounded-2xl shadow-[0_0_20px_rgba(181,255,69,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(181,255,69,0.25)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Or</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <button 
              type="button"
              onClick={() => {
                login();
                if (onSuccess) onSuccess();
              }}
              className="w-full flex items-center justify-center gap-3 py-4 bg-white/[0.03] border border-white/10 text-white font-medium rounded-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-gray-400 mt-2">
              {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-white font-medium hover:text-[#B5FF45] transition-colors underline-offset-4 hover:underline"
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
