import RoadmapGoal from '../models/RoadmapGoal.js';
import Subject from '../models/Subject.js';
import { ApiError } from '../utils/apiResponse.js';

const generateDailyTasks = async (targetDays, subjectId) => {
  const tasks = [];
  let topicsList = [];
  let subjectName = '';

  if (subjectId) {
    const subject = await Subject.findOne({ id: subjectId }).lean();
    if (subject) {
      subjectName = subject.name;
      subject.chapters.forEach(ch => {
        ch.topics.forEach(top => {
          topicsList.push({
            topicId: top.id,
            topicTitle: top.title,
            chapterTitle: ch.title,
            subjectId: subject.id
          });
        });
      });
    }
  }

  for (let day = 1; day <= targetDays; day++) {
    let title = `Day ${day}: Core Fundamentals & Problem Solving`;
    let description = `Complete practice exercises and review concepts for Day ${day}.`;
    let topicId = null;
    let sId = subjectId || null;

    if (topicsList.length > 0) {
      // Map topics across targetDays evenly
      const topicIndex = (day - 1) % topicsList.length;
      const matchedTopic = topicsList[topicIndex];
      title = `Day ${day}: ${matchedTopic.topicTitle}`;
      description = `Study ${matchedTopic.topicTitle} from ${matchedTopic.chapterTitle} in ${subjectName}.`;
      topicId = matchedTopic.topicId;
      sId = matchedTopic.subjectId;
    } else {
      if (day === 1) {
        title = `Day 1: Orientation & Diagnostic Problem Solving`;
        description = `Set up study workspace and solve introductory practice questions.`;
      } else if (day === targetDays) {
        title = `Day ${day}: Comprehensive Revision & Final Assessment`;
        description = `Review all completed topics and take final milestone test.`;
      } else {
        title = `Day ${day}: Module ${day}: Advanced Concepts & Practice`;
        description = `Master topic concepts and solve target practice questions.`;
      }
    }

    tasks.push({
      dayNumber: day,
      title,
      description,
      subjectId: sId,
      topicId,
      isCompleted: false,
      completedAt: null
    });
  }

  return tasks;
};

const calculateGoalStats = (goalDoc) => {
  const goalObj = goalDoc.toObject ? goalDoc.toObject() : goalDoc;
  const totalTasks = goalObj.dailyTasks ? goalObj.dailyTasks.length : 0;
  const completedTasks = goalObj.dailyTasks 
    ? goalObj.dailyTasks.filter(t => t.isCompleted).length 
    : 0;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    ...goalObj,
    totalTasks,
    completedTasks,
    progress
  };
};

export const createGoal = async (userId, { title, description, targetDays, subjectId }) => {
  const days = parseInt(targetDays, 10);
  if (isNaN(days) || days < 1) {
    throw new ApiError(400, 'Target duration must be at least 1 day');
  }

  const startDate = new Date();
  const targetDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);
  const dailyTasks = await generateDailyTasks(days, subjectId);

  const newGoal = new RoadmapGoal({
    user: userId,
    title,
    description: description || '',
    targetDays: days,
    subjectId: subjectId || null,
    startDate,
    targetDate,
    status: 'In Progress',
    dailyTasks
  });

  await newGoal.save();
  return calculateGoalStats(newGoal);
};

export const getUserGoals = async (userId) => {
  const goals = await RoadmapGoal.find({ user: userId }).sort({ createdAt: -1 });
  return goals.map(g => calculateGoalStats(g));
};

export const getGoalById = async (userId, goalId) => {
  const goal = await RoadmapGoal.findOne({ _id: goalId, user: userId });
  if (!goal) {
    throw new ApiError(404, 'Roadmap goal not found');
  }
  return calculateGoalStats(goal);
};

export const updateGoal = async (userId, goalId, { title, description, targetDays }) => {
  const goal = await RoadmapGoal.findOne({ _id: goalId, user: userId });
  if (!goal) {
    throw new ApiError(404, 'Roadmap goal not found');
  }

  if (title !== undefined) goal.title = title;
  if (description !== undefined) goal.description = description;

  if (targetDays !== undefined) {
    const newDays = parseInt(targetDays, 10);
    if (!isNaN(newDays) && newDays >= 1 && newDays !== goal.targetDays) {
      goal.targetDays = newDays;
      goal.targetDate = new Date(goal.startDate.getTime() + newDays * 24 * 60 * 60 * 1000);
      goal.dailyTasks = await generateDailyTasks(newDays, goal.subjectId);
    }
  }

  await goal.save();
  return calculateGoalStats(goal);
};

export const deleteGoal = async (userId, goalId) => {
  const goal = await RoadmapGoal.findOneAndDelete({ _id: goalId, user: userId });
  if (!goal) {
    throw new ApiError(404, 'Roadmap goal not found');
  }
  return { message: 'Roadmap goal deleted successfully' };
};

export const toggleTaskCompletion = async (userId, goalId, taskId) => {
  const goal = await RoadmapGoal.findOne({ _id: goalId, user: userId });
  if (!goal) {
    throw new ApiError(404, 'Roadmap goal not found');
  }

  const task = goal.dailyTasks.id(taskId) || goal.dailyTasks.find(t => t._id.toString() === taskId);
  if (!task) {
    throw new ApiError(404, 'Daily task not found');
  }

  task.isCompleted = !task.isCompleted;
  task.completedAt = task.isCompleted ? new Date() : null;

  const total = goal.dailyTasks.length;
  const completed = goal.dailyTasks.filter(t => t.isCompleted).length;

  if (completed === total && total > 0) {
    goal.status = 'Completed';
  } else if (completed > 0) {
    goal.status = 'In Progress';
  } else {
    goal.status = 'Not Started';
  }

  await goal.save();
  return {
    message: `Task marked as ${task.isCompleted ? 'completed' : 'incomplete'}`,
    task,
    goal: calculateGoalStats(goal)
  };
};

export const getRoadmapSummary = async (userId) => {
  const goals = await RoadmapGoal.find({ user: userId });
  let totalTasks = 0;
  let completedTasks = 0;
  let completedGoals = 0;
  let inProgressGoals = 0;
  const upcomingTodayTasks = [];

  goals.forEach(goal => {
    const total = goal.dailyTasks.length;
    const completed = goal.dailyTasks.filter(t => t.isCompleted).length;

    totalTasks += total;
    completedTasks += completed;

    if (goal.status === 'Completed' || (total > 0 && completed === total)) {
      completedGoals += 1;
    } else {
      inProgressGoals += 1;
    }

    const pendingTask = goal.dailyTasks.find(t => !t.isCompleted);
    if (pendingTask) {
      upcomingTodayTasks.push({
        goalId: goal._id,
        goalTitle: goal.title,
        task: pendingTask
      });
    }
  });

  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    overallProgress,
    totalGoals: goals.length,
    completedGoals,
    inProgressGoals,
    totalTasks,
    completedTasks,
    upcomingTodayTasks
  };
};
