import Company from '../models/Company.js';
import CompanyQuestion from '../models/CompanyQuestion.js';
import UserCompanyProgress from '../models/UserCompanyProgress.js';
import { ApiError } from '../utils/apiResponse.js';

/**
 * Helper to compute progress statistics for a user for a specific company
 */
async function computeUserCompanyStats(userId, companySlug) {
  if (!userId) {
    return {
      isBookmarked: false,
      solvedAptitudeCount: 0,
      completedInterviewCount: 0,
      totalAptitudeCount: 0,
      totalInterviewCount: 0,
      progressPercentage: 0
    };
  }

  const [userProgress, totalAptitude, totalInterview] = await Promise.all([
    UserCompanyProgress.findOne({ user: userId, companySlug }),
    CompanyQuestion.countDocuments({ companySlug, type: 'aptitude' }),
    CompanyQuestion.countDocuments({ companySlug, type: 'interview' })
  ]);

  const solvedAptitudeCount = userProgress ? userProgress.solvedAptitudeQuestions.length : 0;
  const completedInterviewCount = userProgress ? userProgress.completedInterviewQuestions.length : 0;
  const isBookmarked = userProgress ? userProgress.isBookmarked : false;

  const totalQuestions = totalAptitude + totalInterview;
  const totalCompleted = solvedAptitudeCount + completedInterviewCount;
  const progressPercentage = totalQuestions > 0 
    ? Math.round((totalCompleted / totalQuestions) * 100) 
    : 0;

  return {
    isBookmarked,
    solvedAptitudeCount,
    completedInterviewCount,
    totalAptitudeCount: totalAptitude,
    totalInterviewCount: totalInterview,
    progressPercentage
  };
}

/**
 * Fetch companies list with filtering, searching, pagination, and user state
 */
export const getCompanies = async ({
  search,
  industry,
  tier,
  difficulty,
  bookmarkedOnly,
  page = 1,
  limit = 20,
  userId = null
}) => {
  const filter = {};

  if (search) {
    const searchRegex = new RegExp(search, 'i');
    filter.$or = [
      { name: searchRegex },
      { industry: searchRegex },
      { description: searchRegex },
      { roles: searchRegex },
      { tags: searchRegex }
    ];
  }

  if (industry) {
    filter.industry = new RegExp(`^${industry}$`, 'i');
  }

  if (tier) {
    filter.tier = tier;
  }

  if (difficulty) {
    filter.difficulty = difficulty;
  }

  if (userId && bookmarkedOnly) {
    const userBookmarks = await UserCompanyProgress.find({
      user: userId,
      isBookmarked: true
    }).select('companySlug');
    const bookmarkedSlugs = userBookmarks.map((b) => b.companySlug);
    filter.slug = { $in: bookmarkedSlugs };
  }

  const skip = (page - 1) * limit;

  const [companies, total] = await Promise.all([
    Company.find(filter)
      .sort({ isPopular: -1, name: 1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Company.countDocuments(filter)
  ]);

  // Fetch question counts for companies
  const companySlugs = companies.map((c) => c.slug);
  
  const questionCounts = await CompanyQuestion.aggregate([
    { $match: { companySlug: { $in: companySlugs } } },
    { $group: { _id: { slug: '$companySlug', type: '$type' }, count: { $sum: 1 } } }
  ]);

  const countMap = {};
  questionCounts.forEach((qc) => {
    const slug = qc._id.slug;
    const type = qc._id.type;
    if (!countMap[slug]) {
      countMap[slug] = { aptitude: 0, interview: 0 };
    }
    countMap[slug][type] = qc.count;
  });

  // Fetch user progress records if authenticated
  let userProgressMap = {};
  if (userId && companySlugs.length > 0) {
    const userProgresses = await UserCompanyProgress.find({
      user: userId,
      companySlug: { $in: companySlugs }
    }).lean();

    userProgresses.forEach((up) => {
      userProgressMap[up.companySlug] = up;
    });
  }

  const formattedCompanies = companies.map((company) => {
    const slug = company.slug;
    const counts = countMap[slug] || { aptitude: 0, interview: 0 };
    const up = userProgressMap[slug];

    const solvedApt = up ? (up.solvedAptitudeQuestions || []).length : 0;
    const compInt = up ? (up.completedInterviewQuestions || []).length : 0;
    const isBookmarked = up ? !!up.isBookmarked : false;

    const totalQ = counts.aptitude + counts.interview;
    const totalDone = solvedApt + compInt;
    const progressPercentage = totalQ > 0 ? Math.round((totalDone / totalQ) * 100) : 0;

    return {
      ...company,
      totalAptitudeQuestions: counts.aptitude,
      totalInterviewQuestions: counts.interview,
      isBookmarked,
      userProgress: {
        solvedAptitude: solvedApt,
        completedInterview: compInt,
        progressPercentage
      }
    };
  });

  return {
    companies: formattedCompanies,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Fetch detailed company info by slug
 */
export const getCompanyBySlug = async (slug, userId = null) => {
  const company = await Company.findOne({ slug: slug.toLowerCase() }).lean();
  if (!company) {
    throw new ApiError(404, `Company '${slug}' not found`);
  }

  const stats = await computeUserCompanyStats(userId, company.slug);

  return {
    ...company,
    stats
  };
};

/**
 * Fetch company-wise questions (aptitude or interview)
 */
export const getCompanyQuestions = async (
  slug,
  type,
  { difficulty, category, round, search },
  userId = null
) => {
  const companySlug = slug.toLowerCase();
  const company = await Company.findOne({ slug: companySlug }).select('name slug').lean();
  if (!company) {
    throw new ApiError(404, `Company '${slug}' not found`);
  }

  const filter = { companySlug, type };

  if (difficulty) {
    filter.difficulty = difficulty;
  }
  if (category) {
    filter.category = new RegExp(`^${category}$`, 'i');
  }
  if (round) {
    filter.round = new RegExp(round, 'i');
  }
  if (search) {
    const searchRegex = new RegExp(search, 'i');
    filter.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { category: searchRegex },
      { tags: searchRegex }
    ];
  }

  const questions = await CompanyQuestion.find(filter)
    .sort({ frequency: -1, createdAt: -1 })
    .lean();

  let solvedSet = new Set();
  let completedSet = new Set();

  if (userId) {
    const userProgress = await UserCompanyProgress.findOne({ user: userId, companySlug }).lean();
    if (userProgress) {
      if (type === 'aptitude' && userProgress.solvedAptitudeQuestions) {
        userProgress.solvedAptitudeQuestions.forEach((item) => {
          solvedSet.add(item.question.toString());
        });
      }
      if (type === 'interview' && userProgress.completedInterviewQuestions) {
        userProgress.completedInterviewQuestions.forEach((item) => {
          completedSet.add(item.question.toString());
        });
      }
    }
  }

  const formattedQuestions = questions.map((q) => {
    const qIdStr = q._id.toString();
    return {
      ...q,
      status: type === 'aptitude' 
        ? (solvedSet.has(qIdStr) ? 'solved' : 'unsolved')
        : (completedSet.has(qIdStr) ? 'completed' : 'pending')
    };
  });

  return {
    company: {
      name: company.name,
      slug: company.slug
    },
    type,
    total: formattedQuestions.length,
    questions: formattedQuestions
  };
};

/**
 * Toggle bookmark status for a company
 */
export const toggleCompanyBookmark = async (slug, userId) => {
  const companySlug = slug.toLowerCase();
  const company = await Company.findOne({ slug: companySlug }).select('name slug').lean();
  if (!company) {
    throw new ApiError(404, `Company '${slug}' not found`);
  }

  let progress = await UserCompanyProgress.findOne({ user: userId, companySlug });

  if (!progress) {
    progress = new UserCompanyProgress({
      user: userId,
      companySlug,
      isBookmarked: true
    });
  } else {
    progress.isBookmarked = !progress.isBookmarked;
  }

  progress.lastAccessedAt = new Date();
  await progress.save();

  return {
    companySlug: company.slug,
    companyName: company.name,
    isBookmarked: progress.isBookmarked
  };
};

/**
 * Get all bookmarked companies for a user
 */
export const getUserBookmarkedCompanies = async (userId) => {
  const bookmarks = await UserCompanyProgress.find({
    user: userId,
    isBookmarked: true
  }).lean();

  const slugs = bookmarks.map((b) => b.companySlug);
  if (slugs.length === 0) {
    return [];
  }

  const { companies } = await getCompanies({
    bookmarkedOnly: true,
    page: 1,
    limit: 100,
    userId
  });

  return companies;
};

/**
 * Record answer/attempt for an aptitude question
 */
export const recordAptitudeAttempt = async (slug, userId, questionId, isCorrect = true) => {
  const companySlug = slug.toLowerCase();
  const question = await CompanyQuestion.findOne({
    _id: questionId,
    companySlug,
    type: 'aptitude'
  });

  if (!question) {
    throw new ApiError(404, 'Aptitude question not found for this company');
  }

  let progress = await UserCompanyProgress.findOne({ user: userId, companySlug });
  if (!progress) {
    progress = new UserCompanyProgress({
      user: userId,
      companySlug
    });
  }

  const existingIndex = progress.solvedAptitudeQuestions.findIndex(
    (item) => item.question.toString() === questionId
  );

  if (existingIndex > -1) {
    progress.solvedAptitudeQuestions[existingIndex].isCorrect = isCorrect;
    progress.solvedAptitudeQuestions[existingIndex].attemptedAt = new Date();
  } else {
    progress.solvedAptitudeQuestions.push({
      question: questionId,
      isCorrect,
      attemptedAt: new Date()
    });
  }

  progress.lastAccessedAt = new Date();
  await progress.save();

  const stats = await computeUserCompanyStats(userId, companySlug);
  return stats;
};

/**
 * Toggle completion status for an interview question
 */
export const toggleInterviewCompletion = async (slug, userId, questionId) => {
  const companySlug = slug.toLowerCase();
  const question = await CompanyQuestion.findOne({
    _id: questionId,
    companySlug,
    type: 'interview'
  });

  if (!question) {
    throw new ApiError(404, 'Interview question not found for this company');
  }

  let progress = await UserCompanyProgress.findOne({ user: userId, companySlug });
  if (!progress) {
    progress = new UserCompanyProgress({
      user: userId,
      companySlug
    });
  }

  const existingIndex = progress.completedInterviewQuestions.findIndex(
    (item) => item.question.toString() === questionId
  );

  let isCompleted = false;
  if (existingIndex > -1) {
    progress.completedInterviewQuestions.splice(existingIndex, 1);
    isCompleted = false;
  } else {
    progress.completedInterviewQuestions.push({
      question: questionId,
      completedAt: new Date()
    });
    isCompleted = true;
  }

  progress.lastAccessedAt = new Date();
  await progress.save();

  const stats = await computeUserCompanyStats(userId, companySlug);
  return {
    ...stats,
    questionId,
    isCompleted
  };
};

/**
 * Get user preparation progress for a company
 */
export const getCompanyProgress = async (slug, userId) => {
  const companySlug = slug.toLowerCase();
  const company = await Company.findOne({ slug: companySlug }).select('name slug').lean();
  if (!company) {
    throw new ApiError(404, `Company '${slug}' not found`);
  }

  const stats = await computeUserCompanyStats(userId, companySlug);
  return {
    company: {
      name: company.name,
      slug: company.slug
    },
    ...stats
  };
};
