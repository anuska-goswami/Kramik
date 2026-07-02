import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Flame, Trophy, CheckCircle, Sparkles, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface SubmissionActivityProps {
  className?: string;
  limitMonths?: number;
}

export function SubmissionActivity({ className = '' }: SubmissionActivityProps) {
  // Current time state for the real-time countdown and midnight rollover
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Interactive simulator: user can complete today's goal in the UI
  const [isTodayCompleted, setIsTodayCompleted] = useState(false);

  // Currently selected month for calendar view
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  // Slide animation direction
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000); // Update every 10 seconds for real-time accuracy
    return () => clearInterval(timer);
  }, []);

  // Compute the dates relative to today
  const getTodayDateString = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  // Helper to get countdown until end of today
  const getCountdownString = (time: Date) => {
    const endOfToday = new Date(time.getFullYear(), time.getMonth(), time.getDate() + 1);
    const diffMs = endOfToday.getTime() - time.getTime();
    if (diffMs <= 0) return '00h 00m left';
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    // Format with leading zeros
    const pad = (num: number) => String(num).padStart(2, '0');
    return `${pad(hours)}h ${pad(minutes)}m left`;
  };

  // Deterministic activity simulator for past dates based on date hash
  const getDayStatus = (year: number, monthIdx: number, day: number) => {
    const cellDate = new Date(year, monthIdx, day);
    cellDate.setHours(0, 0, 0, 0);

    const todayCompare = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
    todayCompare.setHours(0, 0, 0, 0);

    if (cellDate.getTime() > todayCompare.getTime()) {
      return 'future';
    } else if (cellDate.getTime() === todayCompare.getTime()) {
      return isTodayCompleted ? 'submitted' : 'pending';
    } else {
      // Deterministic generation for past days: 75% submission rate
      const hash = (year * 367 + monthIdx * 37 + day * 13) % 100;
      return hash < 75 ? 'submitted' : 'missed';
    }
  };

  // Calculate statistics based on past + today's status (always evaluated globally from August 2025 up to today)
  const statsStartDate = new Date(2025, 7, 1); // August 1st, 2025
  const todayCompare = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
  todayCompare.setHours(0, 0, 0, 0);

  const allDaysTracked: { date: Date; status: string }[] = [];
  const tempDate = new Date(statsStartDate);

  while (tempDate <= todayCompare) {
    const status = getDayStatus(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
    allDaysTracked.push({
      date: new Date(tempDate),
      status,
    });
    tempDate.setDate(tempDate.getDate() + 1);
  }

  let totalSolved = 0;
  let totalActiveDays = 0;

  // Calculate Problems Solved (each active day solved 1-3 problems)
  allDaysTracked.forEach((day) => {
    if (day.status === 'submitted') {
      const hash = (day.date.getFullYear() * 13 + day.date.getMonth() * 7 + day.date.getDate()) % 3 + 1;
      totalSolved += hash;
      totalActiveDays++;
    }
  });

  // Calculate streaks
  let runningStreak = 0;
  let maxStreak = 0;

  for (let i = 0; i < allDaysTracked.length; i++) {
    const day = allDaysTracked[i];
    if (day.status === 'submitted') {
      runningStreak++;
      if (runningStreak > maxStreak) {
        maxStreak = runningStreak;
      }
    } else if (day.status === 'missed') {
      runningStreak = 0;
    }
  }

  // Current active streak working backwards from today/yesterday
  let currentStreak = 0;
  let checkIndex = allDaysTracked.length - 1;
  
  // If today is pending, check starting from yesterday
  if (allDaysTracked[checkIndex]?.status === 'pending') {
    checkIndex--;
  }

  while (checkIndex >= 0) {
    if (allDaysTracked[checkIndex].status === 'submitted') {
      currentStreak++;
      checkIndex--;
    } else {
      break;
    }
  }
  
  // If today is completed, add today to current streak
  if (isTodayCompleted) {
    currentStreak++;
  }

  const longestStreak = Math.max(maxStreak, currentStreak);

  // Month navigation boundary logic (Allow 12 months in the past, 6 months in the future)
  const minDate = new Date(currentTime.getFullYear(), currentTime.getMonth() - 12, 1);
  const maxDate = new Date(currentTime.getFullYear(), currentTime.getMonth() + 6, 1);

  const canGoPrev = viewDate > minDate;
  const canGoNext = viewDate < maxDate;

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    setDirection('left');
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    if (!canGoNext) return;
    setDirection('right');
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Generate calendar cells for the viewed month
  const viewYear = viewDate.getFullYear();
  const viewMonthIdx = viewDate.getMonth();
  const monthName = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const totalDaysInViewMonth = new Date(viewYear, viewMonthIdx + 1, 0).getDate();
  
  // Day of the week of the first day of the month (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const rawStartDay = new Date(viewYear, viewMonthIdx, 1).getDay();
  // Shift so Monday is the first column (0 = Mon, 1 = Tue, ..., 6 = Sun)
  const startOffset = rawStartDay === 0 ? 6 : rawStartDay - 1;

  const dayCells = [];
  // Placeholders for start of month
  for (let p = 0; p < startOffset; p++) {
    dayCells.push({ isPlaceholder: true, dayNum: 0, status: 'future' });
  }
  // Real days
  for (let d = 1; d <= totalDaysInViewMonth; d++) {
    const status = getDayStatus(viewYear, viewMonthIdx, d);
    dayCells.push({
      isPlaceholder: false,
      dayNum: d,
      status,
    });
  }

  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -30 : 30,
      opacity: 0,
    }),
  };

  const isViewingCurrentMonth = viewMonthIdx === currentTime.getMonth() && viewYear === currentTime.getFullYear();
  const isViewingFutureMonth = viewDate.getTime() > new Date(currentTime.getFullYear(), currentTime.getMonth(), 1).getTime();

  return (
    <div className={`bg-[#0A0E17]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 lg:p-8 space-y-8 ${className}`}>
      {/* Header and simulation toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#B5FF45]/10 border border-[#B5FF45]/20">
            <Calendar className="w-5 h-5 text-[#B5FF45]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white font-heading tracking-tight">Placement Activity</h2>
            <p className="text-xs text-gray-500">Monthly calendar tracking your daily preparation milestones</p>
          </div>
        </div>

        {/* Dynamic Simulator Button */}
        <button
          onClick={() => {
            setIsTodayCompleted(!isTodayCompleted);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-2 border ${
            isTodayCompleted
              ? 'bg-[#B5FF45]/10 text-[#B5FF45] border-[#B5FF45]/30 shadow-[0_0_15px_rgba(181,255,69,0.1)]'
              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
          }`}
        >
          {isTodayCompleted ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-[#B5FF45]" />
              Today's Goal Completed!
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              Simulate Submitting Today
            </>
          )}
        </button>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Current Streak', value: `${currentStreak} Days`, icon: Flame, color: 'text-orange-400' },
          { label: 'Longest Streak', value: `${longestStreak} Days`, icon: Trophy, color: 'text-yellow-400' },
          { label: 'Total Active Days', value: `${totalActiveDays} Days`, icon: Calendar, color: 'text-sky-400' },
          { label: 'Activities Completed', value: totalSolved, icon: CheckCircle, color: 'text-[#B5FF45]' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/[0.04] transition-all duration-300"
          >
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-medium">{stat.label}</span>
              <span className="text-lg font-bold text-white block mt-0.5 font-heading">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Single-Month Premium Calendar Container */}
      <div className="max-w-[640px] mx-auto w-full bg-white/[0.01] border border-white/5 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        
        {/* Month Navigation Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              disabled={!canGoPrev}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed outline-none focus-visible:ring-1 focus-visible:ring-[#B5FF45]"
              title="Previous Month"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <h3 className="text-base font-bold text-white tracking-tight min-w-[110px] text-center font-heading">
              {monthName}
            </h3>
            <button
              onClick={handleNextMonth}
              disabled={!canGoNext}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed outline-none focus-visible:ring-1 focus-visible:ring-[#B5FF45]"
              title="Next Month"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-[11px] font-mono text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
            {dayCells.filter(c => !c.isPlaceholder && c.status === 'submitted').length} / {totalDaysInViewMonth} Completed
          </div>
        </div>

        {/* Weekday Labels (Monday to Sunday) */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5 text-center mb-3 text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase select-none">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>

        {/* Animated Calendar Grid */}
        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={viewDate.toISOString()}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="grid grid-cols-7 gap-1.5 sm:gap-2.5"
            >
              {dayCells.map((cell, cIdx) => {
                if (cell.isPlaceholder) {
                  return <div key={`placeholder-${cIdx}`} className="aspect-square" />;
                }

                // Status determinations depending on whether we view past, current, or future months
                let isCurrentDay = false;
                let cellStatus = cell.status;

                if (isViewingCurrentMonth) {
                  const todayDayNum = currentTime.getDate();
                  if (cell.dayNum === todayDayNum) {
                    isCurrentDay = true;
                    cellStatus = 'pending';
                  } else if (cell.dayNum < todayDayNum) {
                    // past dates in current month
                    cellStatus = getDayStatus(viewYear, viewMonthIdx, cell.dayNum);
                  } else {
                    // future dates in current month
                    cellStatus = 'future';
                  }
                } else if (isViewingFutureMonth) {
                  // All dates in future months are completely empty/inactive
                  cellStatus = 'future';
                } else {
                  // Previous months: all are completed past dates (either submitted or missed)
                  cellStatus = getDayStatus(viewYear, viewMonthIdx, cell.dayNum);
                }

                const isSubmitted = cellStatus === 'submitted';
                const isMissed = cellStatus === 'missed';
                const isFuture = cellStatus === 'future';

                let cellClass = '';
                let content = null;

                if (isCurrentDay) {
                  // Today's cell with countdown active
                  cellClass = 'bg-[#B5FF45]/[0.08] border-[#B5FF45] shadow-[0_0_12px_rgba(181,255,69,0.12)] text-[#B5FF45] font-bold';
                  content = (
                    <div className="flex flex-col items-center justify-center h-full pt-1 pb-0.5">
                      <span className="text-xs sm:text-base animate-pulse">⏳</span>
                      <span className="text-[7px] sm:text-[8px] font-mono text-[#B5FF45] mt-0.5 bg-[#B5FF45]/10 px-1 py-0.2 rounded text-center whitespace-nowrap">
                        {getCountdownString(currentTime)}
                      </span>
                    </div>
                  );
                } else if (isSubmitted) {
                  // Completed past dates (🔥)
                  cellClass = 'bg-orange-500/[0.04] border-orange-500/10 text-orange-400 hover:bg-orange-500/[0.08] hover:border-orange-500/30';
                  content = (
                    <div className="flex flex-col items-center justify-center h-full pt-0.5">
                      <span className="text-xs sm:text-base filter drop-shadow-[0_1px_2px_rgba(249,115,22,0.2)]">🔥</span>
                      <span className="text-[7px] sm:text-[8px] text-orange-400/80 font-mono font-medium tracking-wider uppercase mt-0.5 hidden sm:inline">
                        Done
                      </span>
                    </div>
                  );
                } else if (isMissed) {
                  // Missed past dates (😭)
                  cellClass = 'bg-red-500/[0.02] border-red-500/10 text-red-400/80 hover:bg-red-500/[0.05] hover:border-red-500/20';
                  content = (
                    <div className="flex flex-col items-center justify-center h-full pt-0.5">
                      <span className="text-xs sm:text-base opacity-60">😭</span>
                      <span className="text-[7px] sm:text-[8px] text-red-400/60 font-mono font-medium tracking-wider uppercase mt-0.5 hidden sm:inline">
                        Missed
                      </span>
                    </div>
                  );
                } else {
                  // Future dates: plain numbers, reduced opacity, completely inactive
                  cellClass = 'opacity-25 border-white/5 text-gray-500 cursor-not-allowed';
                  content = null;
                }

                const tooltip = isCurrentDay
                  ? `Today: Goal is still pending! Ends in ${getCountdownString(currentTime)}`
                  : isSubmitted
                  ? `${monthName} ${cell.dayNum}: Completed`
                  : isFuture
                  ? `${monthName} ${cell.dayNum}: Future Date`
                  : `${monthName} ${cell.dayNum}: Missed`;

                return (
                  <div
                    key={`day-${cell.dayNum}`}
                    title={tooltip}
                    className={`relative aspect-square rounded-lg sm:rounded-xl border flex flex-col justify-between p-1 sm:p-1.5 text-[9px] sm:text-xs select-none transition-all duration-300 hover:scale-105 ${cellClass}`}
                  >
                    {/* Day number */}
                    <span className="font-mono text-[9px] sm:text-[10px] font-semibold self-start opacity-80">
                      {cell.dayNum}
                    </span>
                    
                    {/* Central slot for activity icon or countdown */}
                    {content}

                    {/* Placeholder spacer so content alignment remains perfect */}
                    {!content && <div className="h-4" />}
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Legend Block */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 text-[11px] text-gray-400">
        <div className="flex flex-wrap items-center gap-4 select-none">
          <span className="flex items-center gap-1.5"><span className="text-sm">🔥</span> Goal Completed</span>
          <span className="flex items-center gap-1.5"><span className="text-sm">😭</span> Not Submitted</span>
          <span className="flex items-center gap-1.5"><span className="text-sm">⏳</span> Today (Countdown active)</span>
        </div>
        
        {/* Current Date & live countdown helper */}
        <div className="flex items-center gap-2 text-[#B5FF45] font-mono text-xs font-semibold bg-[#B5FF45]/10 border border-[#B5FF45]/20 px-3 py-1.5 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Today ends in: {getCountdownString(currentTime)}</span>
        </div>
      </div>
    </div>
  );
}

