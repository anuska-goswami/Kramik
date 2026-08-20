import Question from '../models/Question.js';
import Subject from '../models/Subject.js';
import UserProgress from '../models/UserProgress.js';

// Helper to format Date to YYYY-MM-DD
const formatDateKey = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export const getDashboardMetrics = async (userId) => {
  const totalQuestionsCount = await Question.countDocuments();
  const subjects = await Subject.find().lean();
  
  const userProgress = await UserProgress.findOne({ user: userId })
    .populate('solvedQuestions')
    .lean();

  const solvedQuestions = userProgress ? userProgress.solvedQuestions : [];
  const solvedCount = solvedQuestions.length;
  const solvedIdsSet = new Set(solvedQuestions.map(q => q._id.toString()));

  // 1. Overall Progress
  const overallProgress = totalQuestionsCount > 0 
    ? Math.round((solvedCount / totalQuestionsCount) * 100) 
    : 0;

  // 2. Subject Progress & Topic Map
  const subjectProgressList = [];
  const allTopicQuestionsMap = new Map(); // topicId -> array of questions

  const allQuestions = await Question.find().select('_id subjectId topicId difficulty title').lean();
  allQuestions.forEach(q => {
    if (!allTopicQuestionsMap.has(q.topicId)) {
      allTopicQuestionsMap.set(q.topicId, []);
    }
    allTopicQuestionsMap.get(q.topicId).push(q);
  });

  subjects.forEach(subject => {
    const subjectQuestions = allQuestions.filter(q => q.subjectId === subject.id);
    const totalSubjectQuestions = subjectQuestions.length;
    const solvedSubjectQuestions = subjectQuestions.filter(q => solvedIdsSet.has(q._id.toString()));
    const solvedSubjectCount = solvedSubjectQuestions.length;
    
    let totalTopics = 0;
    let completedTopics = 0;

    subject.chapters.forEach(chapter => {
      chapter.topics.forEach(topic => {
        totalTopics += 1;
        const topicQs = allTopicQuestionsMap.get(topic.id) || [];
        const solvedTopicQs = topicQs.filter(q => solvedIdsSet.has(q._id.toString()));
        if (topicQs.length > 0 && solvedTopicQs.length === topicQs.length) {
          completedTopics += 1;
        }
      });
    });

    const progress = totalSubjectQuestions > 0 
      ? Math.round((solvedSubjectCount / totalSubjectQuestions) * 100) 
      : 0;

    subjectProgressList.push({
      id: subject.id,
      name: subject.name,
      description: subject.description,
      progress,
      totalQuestions: totalSubjectQuestions,
      questionsSolved: solvedSubjectCount,
      completedTopics,
      totalTopics
    });
  });

  // 3. Questions Solved Breakdown
  const easySolved = solvedQuestions.filter(q => q.difficulty === 'Easy').length;
  const mediumSolved = solvedQuestions.filter(q => q.difficulty === 'Medium').length;
  const hardSolved = solvedQuestions.filter(q => q.difficulty === 'Hard').length;

  const questionsSolvedBreakdown = {
    totalSolved: solvedCount,
    totalQuestions: totalQuestionsCount,
    easy: easySolved,
    medium: mediumSolved,
    hard: hardSolved
  };

  // 4. Daily Streak Calculation
  const attemptsLog = userProgress ? (userProgress.attemptsLog || []) : [];
  const activeDatesSet = new Set();

  attemptsLog.forEach(att => {
    if (att.attemptedAt) {
      activeDatesSet.add(formatDateKey(att.attemptedAt));
    }
  });
  if (userProgress && userProgress.lastStudied) {
    activeDatesSet.add(formatDateKey(userProgress.lastStudied));
  }

  let streak = 0;
  const today = new Date();
  let checkDate = new Date(today);

  // If today has activity, start streak counting from today; otherwise check yesterday
  const todayKey = formatDateKey(today);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = formatDateKey(yesterday);

  if (activeDatesSet.has(todayKey) || activeDatesSet.has(yesterdayKey)) {
    if (!activeDatesSet.has(todayKey)) {
      checkDate = yesterday;
    }
    while (activeDatesSet.has(formatDateKey(checkDate))) {
      streak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  const dailyStreak = {
    currentStreak: streak,
    lastActiveDate: userProgress ? userProgress.lastStudied : null
  };

  // 5. Weekly Activity Timeline (Last 7 Days)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyActivity = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = formatDateKey(d);
    const dayName = daysOfWeek[d.getDay()];

    const attemptsOnDay = attemptsLog.filter(att => att.attemptedAt && formatDateKey(att.attemptedAt) === dateStr);
    weeklyActivity.push({
      day: dayName,
      date: dateStr,
      count: attemptsOnDay.length
    });
  }

  // 6. Accuracy Percentage
  const totalAttempts = userProgress ? (userProgress.totalAttempts || solvedCount) : 0;
  const correctAttempts = userProgress ? (userProgress.correctAttempts || solvedCount) : 0;
  const accuracyPercentage = totalAttempts > 0 
    ? Math.round((correctAttempts / totalAttempts) * 100) 
    : 100;

  // 7. Continue Learning Recommendation
  let continueLearning = null;
  // Find subject in progress (<100% and >0%) or default to first subject
  const inProgressSubject = subjectProgressList.find(s => s.progress > 0 && s.progress < 100) || subjectProgressList[0];
  
  if (inProgressSubject) {
    const dbSubject = subjects.find(s => s.id === inProgressSubject.id);
    let nextTopic = null;

    if (dbSubject) {
      for (const ch of dbSubject.chapters) {
        for (const top of ch.topics) {
          const topQuestions = allTopicQuestionsMap.get(top.id) || [];
          const solvedTopQuestions = topQuestions.filter(q => solvedIdsSet.has(q._id.toString()));
          if (topQuestions.length === 0 || solvedTopQuestions.length < topQuestions.length) {
            nextTopic = {
              subjectId: dbSubject.id,
              subjectName: dbSubject.name,
              chapterId: ch.id,
              chapterTitle: ch.title,
              topicId: top.id,
              topicTitle: top.title,
              progress: topQuestions.length > 0 ? Math.round((solvedTopQuestions.length / topQuestions.length) * 100) : 0,
              totalQuestions: topQuestions.length,
              solvedQuestions: solvedTopQuestions.length
            };
            break;
          }
        }
        if (nextTopic) break;
      }
    }
    continueLearning = nextTopic || {
      subjectId: inProgressSubject.id,
      subjectName: inProgressSubject.name,
      topicId: 't1',
      topicTitle: 'Introduction',
      progress: inProgressSubject.progress,
      totalQuestions: inProgressSubject.totalQuestions,
      solvedQuestions: inProgressSubject.questionsSolved
    };
  }

  // 8. Recently Practiced Topics
  const topicLastAttemptMap = new Map();
  attemptsLog.forEach(att => {
    const q = allQuestions.find(item => item._id.toString() === att.question.toString());
    if (q) {
      const existingDate = topicLastAttemptMap.get(q.topicId);
      const attemptDate = new Date(att.attemptedAt);
      if (!existingDate || attemptDate > existingDate) {
        topicLastAttemptMap.set(q.topicId, attemptDate);
      }
    }
  });

  const recentlyPracticedTopics = [];
  topicLastAttemptMap.forEach((lastPracticed, topicId) => {
    let matchedTopic = null;
    let matchedSubject = null;

    for (const sub of subjects) {
      for (const ch of sub.chapters) {
        const found = ch.topics.find(t => t.id === topicId);
        if (found) {
          matchedTopic = found;
          matchedSubject = sub;
          break;
        }
      }
      if (matchedTopic) break;
    }

    if (matchedTopic && matchedSubject) {
      const topicQs = allTopicQuestionsMap.get(topicId) || [];
      const solvedCount = topicQs.filter(q => solvedIdsSet.has(q._id.toString())).length;

      recentlyPracticedTopics.push({
        topicId: matchedTopic.id,
        topicTitle: matchedTopic.title,
        subjectId: matchedSubject.id,
        subjectName: matchedSubject.name,
        lastPracticed,
        solvedCount,
        totalQuestions: topicQs.length
      });
    }
  });

  recentlyPracticedTopics.sort((a, b) => b.lastPracticed - a.lastPracticed);

  // 9. Placement Readiness Score Computation
  const completionScore = overallProgress;
  const coverageScore = subjectProgressList.length > 0 
    ? Math.round(subjectProgressList.reduce((acc, curr) => acc + curr.progress, 0) / subjectProgressList.length)
    : 0;
  const accuracyScore = accuracyPercentage;
  const streakBonus = Math.min(streak * 2, 10);

  const placementReadinessScore = Math.min(
    100,
    Math.round((completionScore * 0.40) + (coverageScore * 0.30) + (accuracyScore * 0.20) + (streakBonus * 1.0))
  );

  let readinessLevel = 'Beginner';
  if (placementReadinessScore >= 80) readinessLevel = 'Placement Ready';
  else if (placementReadinessScore >= 50) readinessLevel = 'Intermediate';

  return {
    overallProgress,
    subjectProgress: subjectProgressList,
    questionsSolved: questionsSolvedBreakdown,
    dailyStreak,
    weeklyActivity,
    accuracyPercentage,
    continueLearning,
    recentlyPracticedTopics: recentlyPracticedTopics.slice(0, 5),
    placementReadiness: {
      score: placementReadinessScore,
      level: readinessLevel,
      breakdown: {
        completionScore,
        coverageScore,
        accuracyScore,
        streakBonus
      }
    }
  };
};
