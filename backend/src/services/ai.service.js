import { ApiError } from '../utils/apiResponse.js';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const callGeminiAPI = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return null; // Fallback to heuristic generation
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      console.warn('Gemini API call returned non-200 status:', response.statusText);
      return null;
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidateText || null;
  } catch (error) {
    console.error('Error contacting Gemini API:', error);
    return null;
  }
};

export const generateAiSummary = async ({ targetRole, skills = [], experienceYears = 0, keyHighlights = '' }) => {
  const prompt = `You are a professional executive resume writer. Generate 3 distinct professional summary options for a candidate targeting the role of "${targetRole || 'Software Engineer'}".
Skills: ${skills.join(', ')}.
Experience Years: ${experienceYears}.
Key Highlights: ${keyHighlights}.

Return ONLY a JSON array of 3 strings containing the summaries. Format: ["summary1", "summary2", "summary3"]`;

  const rawResult = await callGeminiAPI(prompt);
  if (rawResult) {
    try {
      const jsonMatch = rawResult.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse Gemini JSON summary result, using fallbacks.');
    }
  }

  // Heuristic Fallback
  const role = targetRole || 'Software Engineer';
  const skillText = skills.length > 0 ? skills.slice(0, 4).join(', ') : 'full-stack development, algorithms, and system design';

  return [
    `Results-driven ${role} with ${experienceYears}+ years of experience specializing in ${skillText}. Proven track record in designing scalable applications, optimizing codebase performance, and collaborating across cross-functional engineering teams.`,
    `Detail-oriented ${role} adept in ${skillText}. Passionate about building robust software solutions, clean code architectures, and delivering seamless user experiences in fast-paced tech environments.`,
    `Innovative ${role} possessing strong technical expertise in ${skillText}. Skilled at solving complex problems, writing maintainable code, and driving product features from concept to production deployment.`
  ];
};

export const generateAiBulletPoints = async ({ position, company, keyTasks = '', targetRole = '' }) => {
  const prompt = `You are an expert resume coach. Generate 4 high-impact, ATS-optimized action-verb bullet points for a candidate working as "${position}" at "${company}".
Key Tasks / Achievements: ${keyTasks}.
Target Role: ${targetRole}.

Return ONLY a JSON array of strings containing the bullet points. Format: ["bullet 1", "bullet 2", "bullet 3", "bullet 4"]`;

  const rawResult = await callGeminiAPI(prompt);
  if (rawResult) {
    try {
      const jsonMatch = rawResult.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse Gemini bullet points, using fallbacks.');
    }
  }

  const pos = position || 'Software Engineer';
  const comp = company || 'Tech Corporation';

  return [
    `Architected and deployed core features as a ${pos} at ${comp}, improving application responsiveness and user satisfaction by 35%.`,
    `Engineered RESTful APIs and database schemas, reducing query latency by 40% across high-traffic production endpoints.`,
    `Collaborated with cross-functional teams to implement end-to-end features, adhering to clean architecture and test-driven development practices.`,
    `Optimized CI/CD build pipelines and automated testing suites, cutting deployment cycles from 2 days to under 30 minutes.`
  ];
};

export const reviewAiResume = async (resumeData) => {
  const resumeStr = JSON.stringify(resumeData);
  const prompt = `You are an ATS (Applicant Tracking System) reviewer and hiring manager. Evaluate the following resume JSON and provide an ATS Review report.

Resume Content: ${resumeStr}

Return ONLY a valid JSON object matching this structure:
{
  "atsScore": 85,
  "overallFeedback": "Concise summary of overall strength",
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["area 1", "area 2"],
  "missingKeywords": ["keyword 1", "keyword 2"],
  "formattingSuggestions": ["tip 1", "tip 2"]
}`;

  const rawResult = await callGeminiAPI(prompt);
  if (rawResult) {
    try {
      const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.atsScore !== undefined) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse Gemini ATS review JSON, using heuristic reviewer.');
    }
  }

  // Heuristic ATS Review Engine
  let score = 50;
  const strengths = [];
  const weaknesses = [];
  const missingKeywords = ['Unit Testing', 'CI/CD Pipelines', 'REST APIs', 'Cloud Services (AWS/GCP)', 'Docker'];
  const formattingSuggestions = [];

  if (resumeData.personalInfo && resumeData.personalInfo.fullName && resumeData.personalInfo.email) {
    score += 15;
    strengths.push('Contact information is complete with full name and valid email.');
  } else {
    weaknesses.push('Missing basic contact details (full name or email).');
    formattingSuggestions.push('Ensure header includes clear contact information (Name, Email, Phone, LinkedIn).');
  }

  if (resumeData.summary && resumeData.summary.length > 50) {
    score += 15;
    strengths.push('Professional summary provides a clear career narrative.');
  } else {
    weaknesses.push('Professional summary is brief or missing.');
    formattingSuggestions.push('Add a 3-4 sentence professional summary highlighting your core tech stack.');
  }

  if (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) {
    score += 10;
    const hasHighlights = resumeData.experience.some(e => e.highlights && e.highlights.length > 0);
    if (hasHighlights) {
      score += 10;
      strengths.push('Work experience includes quantifiable bullet points.');
    } else {
      weaknesses.push('Experience entries lack action bullet points.');
    }
  } else {
    weaknesses.push('No work experience listed.');
  }

  if (Array.isArray(resumeData.skills) && resumeData.skills.length > 0) {
    score += 10;
    strengths.push('Technical skills are categorized cleanly.');
  } else {
    weaknesses.push('Skills section is empty or uncategorized.');
  }

  return {
    atsScore: Math.min(100, score),
    overallFeedback: score >= 80 
      ? 'Strong ATS compliance. Content is well structured with clear impact statements.'
      : 'Good foundation, but requires quantifiable metric bullet points and key technical keywords to maximize interview callback rates.',
    strengths,
    weaknesses,
    missingKeywords,
    formattingSuggestions
  };
};

/**
 * AI Interview Question Feedback Generator using Google Gemini
 */
export const evaluateInterviewAnswer = async ({
  questionTitle,
  questionText,
  category,
  type,
  expectedKeyPoints = [],
  sampleAnswer = '',
  userAnswer
}) => {
  const prompt = `You are an expert technical and HR interviewer evaluating a candidate's response.

Question Title: "${questionTitle}"
Question Details: "${questionText}"
Topic/Category: "${category}"
Interview Type: "${type}" (technical or hr)
Expected Key Points: ${expectedKeyPoints.join(', ')}
Reference Model Answer: "${sampleAnswer}"

Candidate's Answer: "${userAnswer || 'No response provided.'}"

Evaluate the candidate's answer thoroughly. Return ONLY a valid JSON object matching this structure:
{
  "score": 85,
  "strengths": ["Clear explanation of core concept", "Good practical example provided"],
  "improvements": ["Elaborate more on edge cases", "Mention time complexity"],
  "missingKeyConcepts": ["Concept X", "Concept Y"],
  "improvedAnswer": "An exemplary, refined answer that would score 100% in a top-tier interview."
}`;

  const rawResult = await callGeminiAPI(prompt);
  if (rawResult) {
    try {
      const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (typeof parsed.score === 'number') {
          return {
            score: Math.min(100, Math.max(0, Math.round(parsed.score))),
            strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
            improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
            missingKeyConcepts: Array.isArray(parsed.missingKeyConcepts) ? parsed.missingKeyConcepts : [],
            improvedAnswer: parsed.improvedAnswer || sampleAnswer || 'Keep practicing structured answers.'
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse Gemini interview answer JSON evaluation, falling back to heuristic engine.');
    }
  }

  // Heuristic Interview Answer Evaluator (Fallback)
  const text = (userAnswer || '').trim();
  let score = 40;
  const strengths = [];
  const improvements = [];
  const missingKeyConcepts = [];

  if (text.length === 0) {
    return {
      score: 0,
      strengths: [],
      improvements: ['Attempt answering the question even if uncertain.', 'Structure response with definition, explanation, and example.'],
      missingKeyConcepts: expectedKeyPoints,
      improvedAnswer: sampleAnswer || 'Provide a structured, detailed answer addressing core concepts.'
    };
  }

  // Length heuristic
  if (text.length > 30) score += 15;
  if (text.length > 100) score += 15;
  if (text.length > 250) score += 10;

  // Expected key points matching
  let matchedCount = 0;
  expectedKeyPoints.forEach((kp) => {
    const kpWords = kp.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const matched = kpWords.some(w => text.toLowerCase().includes(w));
    if (matched) {
      matchedCount++;
    } else {
      missingKeyConcepts.push(kp);
    }
  });

  if (expectedKeyPoints.length > 0) {
    const keyPointRatio = matchedCount / expectedKeyPoints.length;
    score += Math.round(keyPointRatio * 20);
    if (keyPointRatio > 0.5) {
      strengths.push(`Covered essential keywords such as: ${expectedKeyPoints.slice(0, 2).join(', ')}.`);
    }
  }

  if (type === 'hr') {
    const starKeywords = ['situation', 'task', 'action', 'result', 'team', 'challenge', 'project', 'learned'];
    const starMatches = starKeywords.filter(w => text.toLowerCase().includes(w));
    if (starMatches.length >= 2) {
      score += 10;
      strengths.push('Good narrative structure with behavioral context.');
    } else {
      improvements.push('Use the STAR method (Situation, Task, Action, Result) to format your response.');
    }
  } else {
    // Technical check
    if (text.includes('time complexity') || text.includes('space complexity') || text.includes('O(') || text.includes('algorithm')) {
      score += 10;
      strengths.push('Included algorithmic performance considerations (complexity analysis).');
    } else {
      improvements.push('Mention time and space complexity analysis in your technical explanations.');
    }
  }

  if (improvements.length === 0) {
    improvements.push('Consider providing an edge case scenario to make your answer even more robust.');
  }

  score = Math.min(100, Math.max(20, score));

  return {
    score,
    strengths: strengths.length > 0 ? strengths : ['Good initial attempt answering the question.'],
    improvements,
    missingKeyConcepts: missingKeyConcepts.length > 0 ? missingKeyConcepts : ['No critical concepts missed.'],
    improvedAnswer: sampleAnswer || 'A structured response with clear definitions, practical examples, and complexity analysis.'
  };
};

/**
 * AI Overall Interview Session Evaluation & Weak Topic Analysis using Gemini
 */
export const generateOverallInterviewSummary = async (sessionData) => {
  const prompt = `You are a senior hiring director providing a comprehensive evaluation report for a completed candidate mock interview.

Target Role: "${sessionData.targetRole || 'Software Engineer'}"
Interview Type: "${sessionData.type}"
Q&A Session Transcript & Individual Evaluations: ${JSON.stringify(sessionData.qaPairs)}

Evaluate overall performance and return ONLY a valid JSON object matching this structure:
{
  "overallScore": 82,
  "scoreBreakdown": {
    "technicalAccuracy": 85,
    "communicationClarity": 80,
    "completeness": 80
  },
  "summary": "The candidate demonstrated strong foundational knowledge in backend engineering and communication.",
  "topStrengths": ["Solid algorithmic problem solving", "Structured behavioral responses"],
  "keyImprovements": ["Deepen understanding of distributed caching", "Work on complexity analysis"],
  "weakTopics": [
    {
      "topic": "System Design",
      "averageScore": 55,
      "questionCount": 1,
      "recommendation": "Review distributed rate limiting, caching strategies, and database indexing."
    }
  ]
}`;

  const rawResult = await callGeminiAPI(prompt);
  if (rawResult) {
    try {
      const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (typeof parsed.overallScore === 'number') {
          return {
            overallScore: Math.min(100, Math.max(0, Math.round(parsed.overallScore))),
            scoreBreakdown: {
              technicalAccuracy: parsed.scoreBreakdown?.technicalAccuracy || Math.round(parsed.overallScore),
              communicationClarity: parsed.scoreBreakdown?.communicationClarity || Math.round(parsed.overallScore),
              completeness: parsed.scoreBreakdown?.completeness || Math.round(parsed.overallScore)
            },
            summary: parsed.summary || 'Completed interview session.',
            topStrengths: Array.isArray(parsed.topStrengths) ? parsed.topStrengths : [],
            keyImprovements: Array.isArray(parsed.keyImprovements) ? parsed.keyImprovements : [],
            weakTopics: Array.isArray(parsed.weakTopics) ? parsed.weakTopics : []
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse Gemini overall interview summary JSON, using heuristic aggregator.');
    }
  }

  // Heuristic Aggregator & Weak Topic Analysis (Fallback)
  const qaPairs = sessionData.qaPairs || [];
  if (qaPairs.length === 0) {
    return {
      overallScore: 0,
      scoreBreakdown: { technicalAccuracy: 0, communicationClarity: 0, completeness: 0 },
      summary: 'Interview session ended without answered questions.',
      topStrengths: [],
      keyImprovements: ['Complete all questions to receive full evaluation.'],
      weakTopics: []
    };
  }

  const scores = qaPairs.map((qa) => (qa.aiFeedback ? qa.aiFeedback.score : 0));
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  // Group by category/topic to identify weak topics (< 70 average)
  const topicStats = {};
  qaPairs.forEach((qa) => {
    const topic = qa.category || 'General';
    const s = qa.aiFeedback ? qa.aiFeedback.score : 0;
    if (!topicStats[topic]) {
      topicStats[topic] = { totalScore: 0, count: 0 };
    }
    topicStats[topic].totalScore += s;
    topicStats[topic].count += 1;
  });

  const weakTopics = [];
  Object.keys(topicStats).forEach((topic) => {
    const stat = topicStats[topic];
    const topicAvg = Math.round(stat.totalScore / stat.count);
    if (topicAvg < 70) {
      weakTopics.push({
        topic,
        averageScore: topicAvg,
        questionCount: stat.count,
        recommendation: `Focus on revising core principles and solving practice problems in ${topic}.`
      });
    }
  });

  const techAccuracy = Math.min(100, Math.round(avgScore * 1.02));
  const commClarity = Math.min(100, Math.round(avgScore * 0.98));
  const completeness = Math.min(100, Math.round(avgScore * 0.95));

  return {
    overallScore: avgScore,
    scoreBreakdown: {
      technicalAccuracy: techAccuracy,
      communicationClarity: commClarity,
      completeness
    },
    summary: avgScore >= 75
      ? `Strong performance for ${sessionData.targetRole || 'Software Engineer'} role. Demonstrated clear communication and technical accuracy across most questions.`
      : `Good effort for ${sessionData.targetRole || 'Software Engineer'} role. Additional practice on weak topics will significantly boost interview performance.`,
    topStrengths: [
      `Completed ${qaPairs.length} questions in ${sessionData.type} mode.`,
      `Average response score of ${avgScore}/100.`
    ],
    keyImprovements: weakTopics.length > 0
      ? [`Revise weak topics: ${weakTopics.map(w => w.topic).join(', ')}.`]
      : ['Practice answering under strict time constraints to build confidence.'],
    weakTopics
  };
};

