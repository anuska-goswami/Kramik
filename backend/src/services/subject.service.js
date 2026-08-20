import Subject from '../models/Subject.js';
import UserProgress from '../models/UserProgress.js';
import Question from '../models/Question.js';
import { ApiError } from '../utils/apiResponse.js';

export const getAllSubjectsWithStats = async (userId) => {
  const subjects = await Subject.find().lean();
  
  let userProgress = null;
  if (userId) {
    userProgress = await UserProgress.findOne({ user: userId });
  }

  const solvedQuestionIds = userProgress ? userProgress.solvedQuestions.map(id => id.toString()) : [];

  const subjectsWithStats = await Promise.all(subjects.map(async (subject) => {
    const questions = await Question.find({ subjectId: subject.id }).select('_id topicId').lean();
    const totalQuestions = questions.length;
    
    const solvedQuestionsInSubject = questions.filter(q => solvedQuestionIds.includes(q._id.toString()));
    const questionsSolvedCount = solvedQuestionsInSubject.length;

    const solvedTopicIds = new Set(solvedQuestionsInSubject.map(q => q.topicId));
    const completedTopicsCount = solvedTopicIds.size;

    let totalTopicsCount = 0;
    subject.chapters.forEach(chapter => {
      totalTopicsCount += chapter.topics.length;
    });

    const progressPercent = totalQuestions > 0 
      ? Math.round((questionsSolvedCount / totalQuestions) * 100) 
      : 0;

    const updatedChapters = subject.chapters.map(chapter => {
      const updatedTopics = chapter.topics.map(topic => {
        const topicQuestions = questions.filter(q => q.topicId === topic.id);
        const topicQuestionsCount = topicQuestions.length;
        const solvedTopicQuestions = topicQuestions.filter(q => solvedQuestionIds.includes(q._id.toString()));
        
        let status = 'Available';
        if (topicQuestionsCount > 0 && solvedTopicQuestions.length === topicQuestionsCount) {
          status = 'Completed';
        } else if (solvedTopicQuestions.length > 0) {
          status = 'In Progress';
        }

        return {
          ...topic,
          status
        };
      });

      return {
        ...chapter,
        topics: updatedTopics
      };
    });

    return {
      id: subject.id,
      name: subject.name,
      description: subject.description,
      progress: progressPercent,
      completedTopics: completedTopicsCount,
      totalTopics: totalTopicsCount,
      questionsSolved: questionsSolvedCount,
      accuracy: 80,
      lastStudied: userProgress ? 'Recent' : 'Not started',
      chapters: updatedChapters
    };
  }));

  return subjectsWithStats;
};

export const getSubjectByIdWithStats = async (subjectId, userId) => {
  const subject = await Subject.findOne({ id: subjectId }).lean();
  if (!subject) {
    throw new ApiError(404, 'Subject not found');
  }

  let userProgress = null;
  if (userId) {
    userProgress = await UserProgress.findOne({ user: userId });
  }

  const solvedQuestionIds = userProgress ? userProgress.solvedQuestions.map(id => id.toString()) : [];
  const questions = await Question.find({ subjectId: subject.id }).select('_id topicId').lean();

  const updatedChapters = subject.chapters.map(chapter => {
    const updatedTopics = chapter.topics.map(topic => {
      const topicQuestions = questions.filter(q => q.topicId === topic.id);
      const topicQuestionsCount = topicQuestions.length;
      const solvedTopicQuestions = topicQuestions.filter(q => solvedQuestionIds.includes(q._id.toString()));
      
      let status = 'Available';
      if (topicQuestionsCount > 0 && solvedTopicQuestions.length === topicQuestionsCount) {
        status = 'Completed';
      } else if (solvedTopicQuestions.length > 0) {
        status = 'In Progress';
      }

      return {
        ...topic,
        status
      };
    });

    return {
      ...chapter,
      topics: updatedTopics
    };
  });

  return {
    ...subject,
    chapters: updatedChapters
  };
};
