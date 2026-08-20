import { ApiError } from '../utils/apiResponse.js';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Generic Gemini API caller with JSON parsing & error fallback safety.
 */
const callGeminiAPI = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return null; // Fallback to heuristic generation if no key present
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

// ==========================================
// 1. Personalized Study Roadmap
// ==========================================
export const generateAiPersonalizedRoadmap = async ({
  targetRole = 'Software Engineer',
  targetCompany = '',
  currentSkillLevel = 'Intermediate',
  dailyTimeMinutes = 60,
  targetWeeks = 4
}) => {
  const prompt = `You are a lead tech educator and curriculum director. Design a highly structured, milestone-based personalized study roadmap for a candidate preparing for a "${targetRole}" role${targetCompany ? ` at ${targetCompany}` : ''}.
Current Skill Level: ${currentSkillLevel}
Daily Available Study Time: ${dailyTimeMinutes} minutes
Target Prep Duration: ${targetWeeks} weeks

Return ONLY a valid JSON object matching this structure:
{
  "title": "Personalized ${targetRole} Study Plan",
  "description": "Comprehensive prep roadmap optimized for ${dailyTimeMinutes} min/day study.",
  "targetRole": "${targetRole}",
  "targetWeeks": ${targetWeeks},
  "totalDays": ${targetWeeks * 7},
  "dailyTimeCommitment": "${dailyTimeMinutes} mins",
  "milestones": [
    {
      "id": "m1",
      "title": "Week 1: Core Fundamentals & Data Structures",
      "description": "Master foundational concepts and algorithmic complexity.",
      "week": 1,
      "topics": [
        {
          "id": "t1",
          "title": "Arrays, Strings & Time Complexity",
          "subjectId": "cn",
          "durationMinutes": ${dailyTimeMinutes},
          "priority": "High",
          "difficulty": "Easy"
        }
      ],
      "learningObjectives": ["Understand Big-O notation", "Solve two-pointer problems"]
    }
  ]
}`;

  const rawResult = await callGeminiAPI(prompt);
  if (rawResult) {
    try {
      const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.milestones && Array.isArray(parsed.milestones)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse Gemini personalized roadmap JSON, using fallbacks.');
    }
  }

  // Heuristic Fallback Roadmap Generator
  return {
    title: `Personalized ${targetRole} Study Plan`,
    description: `A ${targetWeeks}-week study roadmap tailored for ${currentSkillLevel} level with ${dailyTimeMinutes} minutes of daily practice.`,
    targetRole,
    targetWeeks,
    totalDays: targetWeeks * 7,
    dailyTimeCommitment: `${dailyTimeMinutes} mins`,
    milestones: [
      {
        id: 'm1',
        title: 'Week 1: Computer Science & Operating Systems Core',
        description: 'Establish deep mastery in OS process management, memory allocation, and thread concurrency.',
        week: 1,
        topics: [
          { id: 'os-t1', title: 'Process Scheduling & Thread Sync', subjectId: 'os', durationMinutes: dailyTimeMinutes, priority: 'High', difficulty: 'Medium' },
          { id: 'os-t2', title: 'Virtual Memory & Paging', subjectId: 'os', durationMinutes: dailyTimeMinutes, priority: 'High', difficulty: 'Medium' }
        ],
        learningObjectives: ['Master process state transitions', 'Analyze deadlock prevention algorithms']
      },
      {
        id: 'm2',
        title: 'Week 2: Computer Networks & Protocol Internals',
        description: 'Understand TCP/IP, OSI Model layers, HTTP/S semantics, and socket programming.',
        week: 2,
        topics: [
          { id: 'cn-t1', title: 'TCP/IP vs OSI Model Protocols', subjectId: 'cn', durationMinutes: dailyTimeMinutes, priority: 'High', difficulty: 'Medium' },
          { id: 'cn-t2', title: 'DNS, HTTP/2, and TLS Handshake', subjectId: 'cn', durationMinutes: dailyTimeMinutes, priority: 'Medium', difficulty: 'Hard' }
        ],
        learningObjectives: ['Explain 3-way handshake in depth', 'Compare TCP vs UDP performance trade-offs']
      },
      {
        id: 'm3',
        title: 'Week 3: Database Management & SQL Optimization',
        description: 'Master relational schema design, ACID transaction guarantees, indexing, and SQL queries.',
        week: 3,
        topics: [
          { id: 'dbms-t1', title: 'SQL Joins, Aggregations & Subqueries', subjectId: 'dbms', durationMinutes: dailyTimeMinutes, priority: 'High', difficulty: 'Medium' },
          { id: 'dbms-t2', title: 'B-Tree Indexing & Query Plan Tuning', subjectId: 'dbms', durationMinutes: dailyTimeMinutes, priority: 'High', difficulty: 'Hard' }
        ],
        learningObjectives: ['Write complex multi-join SQL queries', 'Optimize slow queries using indexes']
      },
      {
        id: 'm4',
        title: 'Week 4: System Design & Mock Interview Prep',
        description: 'Combine core fundamentals to tackle real-world system architecture & mock tests.',
        week: 4,
        topics: [
          { id: 'sd-t1', title: 'Scalable System Architecture & Caching', subjectId: 'computer-fundamentals', durationMinutes: dailyTimeMinutes, priority: 'High', difficulty: 'Hard' },
          { id: 'sd-t2', title: 'Full Grand Mock Test Evaluation', subjectId: 'all', durationMinutes: dailyTimeMinutes, priority: 'High', difficulty: 'Hard' }
        ],
        learningObjectives: ['Design high-throughput backend APIs', 'Score 85%+ on Mock Assessments']
      }
    ]
  };
};

// ==========================================
// 2. Resume Generation (Summary, Bullets & Full Resume)
// ==========================================
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

export const generateFullAiResume = async ({
  fullName,
  email,
  phone,
  targetRole = 'Software Engineer',
  experienceYears = 1,
  skills = [],
  projects = [],
  education = []
}) => {
  const prompt = `You are an elite ATS resume builder. Generate a complete, polished resume object for "${fullName}" targeting the role "${targetRole}".
Email: ${email}, Phone: ${phone}, Skills: ${skills.join(', ')}.

Return ONLY a valid JSON object matching this structure:
{
  "personalInfo": { "fullName": "${fullName}", "email": "${email}", "phone": "${phone || '+1 555-0199'}", "location": "San Francisco, CA", "linkedIn": "linkedin.com/in/profile", "github": "github.com/profile" },
  "summary": "Professional summary paragraph...",
  "experience": [
    { "company": "Tech Company Inc", "position": "${targetRole}", "startDate": "2022-01", "endDate": "Present", "current": true, "location": "Remote", "highlights": ["Bullet point 1", "Bullet point 2"] }
  ],
  "education": [
    { "institution": "State University", "degree": "B.S. in Computer Science", "startDate": "2018", "endDate": "2022", "gpa": "3.8/4.0" }
  ],
  "skills": [
    { "category": "Programming Languages", "items": ["JavaScript", "Python", "Java", "TypeScript"] },
    { "category": "Frameworks & Databases", "items": ["Node.js", "Express", "MongoDB", "PostgreSQL", "React"] }
  ],
  "projects": [
    { "title": "Scalable E-Commerce Backend", "description": "High performance REST microservice built with Node & Mongo.", "technologies": ["Node.js", "MongoDB", "Docker"], "link": "github.com/project" }
  ]
}`;

  const rawResult = await callGeminiAPI(prompt);
  if (rawResult) {
    try {
      const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.summary && parsed.personalInfo) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse full AI resume, falling back to heuristic builder.');
    }
  }

  // Fallback resume payload
  return {
    personalInfo: {
      fullName: fullName || 'Tech Candidate',
      email: email || 'candidate@example.com',
      phone: phone || '+1 555-0199',
      location: 'San Francisco, CA',
      linkedIn: 'linkedin.com/in/tech-candidate',
      github: 'github.com/tech-candidate'
    },
    summary: `Ambitious and results-oriented ${targetRole} with experience building scalable backend architectures, designing RESTful APIs, and solving complex algorithmic challenges.`,
    experience: [
      {
        company: 'Innovate Tech Labs',
        position: targetRole,
        startDate: '2023-01',
        endDate: 'Present',
        current: true,
        location: 'Remote',
        highlights: [
          `Architected microservices using Node.js and MongoDB, handling over 100k daily API requests.`,
          `Improved API endpoint latency by 45% through query index optimizations and redis caching.`
        ]
      }
    ],
    education: [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        startDate: '2019',
        endDate: '2023',
        gpa: '3.8/4.0'
      }
    ],
    skills: [
      { category: 'Languages', items: skills.length > 0 ? skills : ['JavaScript', 'Python', 'Java', 'SQL'] },
      { category: 'Backend & Web', items: ['Node.js', 'Express', 'REST APIs', 'GraphQL'] },
      { category: 'Databases & Tools', items: ['MongoDB', 'PostgreSQL', 'Git', 'Docker'] }
    ],
    projects: projects.length > 0 ? projects : [
      {
        title: 'KRAMIK Placement Platform',
        description: 'Full-stack engineering exam & mock test platform with real-time feedback.',
        technologies: ['Node.js', 'Express', 'MongoDB', 'React'],
        link: 'github.com/kramik'
      }
    ]
  };
};

// ==========================================
// 3. Resume Review (ATS Scoring)
// ==========================================
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

// ==========================================
// 4. Interview Feedback & Overall Summary
// ==========================================
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

  if (text.length > 30) score += 15;
  if (text.length > 100) score += 15;
  if (text.length > 250) score += 10;

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

// ==========================================
// 5. Question Explanations
// ==========================================
export const generateAiQuestionExplanation = async ({
  questionTitle,
  description,
  options = [],
  correctAnswer,
  explanation = '',
  difficulty = 'Medium',
  subjectId = 'general'
}) => {
  const prompt = `You are a master computer science professor and technical interview tutor. Explain the following question in detail:

Question Title: "${questionTitle}"
Description: "${description}"
Options: ${JSON.stringify(options)}
Correct Answer: "${correctAnswer}"
Base Explanation: "${explanation}"
Difficulty: ${difficulty}
Subject Domain: ${subjectId}

Return ONLY a valid JSON object matching this structure:
{
  "summary": "Concise summary of the core computer science concept being tested.",
  "detailedExplanation": "Deep step-by-step breakdown explaining why the correct answer is right and why other options are incorrect.",
  "realWorldExample": "Practical real-world application or software architecture scenario illustrating this principle.",
  "keyTakeaways": ["Key Takeaway 1", "Key Takeaway 2"],
  "interviewFollowUps": ["Follow-up question 1 that top tech interviewers ask", "Follow-up question 2"]
}`;

  const rawResult = await callGeminiAPI(prompt);
  if (rawResult) {
    try {
      const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.summary && parsed.detailedExplanation) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse Gemini question explanation JSON, using fallback.');
    }
  }

  // Heuristic Fallback
  return {
    summary: `Explanation for "${questionTitle}" (${difficulty} - ${subjectId.toUpperCase()}).`,
    detailedExplanation: explanation || `The correct answer is "${correctAnswer}". In ${subjectId.toUpperCase()}, understanding these concepts is vital for optimal application performance and architectural stability.`,
    realWorldExample: `In high-scale production systems, improper handling of this concept can lead to latent bugs or performance bottlenecks.`,
    keyTakeaways: [
      `Master the core mechanics of ${subjectId.toUpperCase()}.`,
      `Always verify option constraints during technical interviews.`
    ],
    interviewFollowUps: [
      `How would you optimize this under strict memory constraints?`,
      `What are the edge cases associated with this implementation?`
    ]
  };
};

// ==========================================
// 6. Study Recommendations
// ==========================================
export const generateAiStudyRecommendations = async ({
  userProgress = {},
  mockTestAnalytics = {},
  weakTopics = [],
  targetRole = 'Software Engineer'
}) => {
  const prompt = `You are an AI prep advisor. Analyze candidate performance data and generate targeted study recommendations.

Total Questions Solved: ${userProgress.totalSolved || 0}
Accuracy: ${userProgress.accuracyPercentage || 0}%
Streak: ${userProgress.dailyStreak?.currentStreak || 0} days
Weak Topics: ${JSON.stringify(weakTopics)}
Target Role: ${targetRole}

Return ONLY a valid JSON object matching this structure:
{
  "overallStatus": "Good Progress / Needs Immediate Focus",
  "primaryFocus": "Computer Networks & SQL Joins",
  "recommendedSubjects": [
    {
      "subjectId": "cn",
      "subjectName": "Computer Networks",
      "priority": "High",
      "reason": "Accuracy is currently below 60%.",
      "suggestedQuestionsCount": 10
    }
  ],
  "dailyActionPlan": ["Solve 5 Medium Network Layer questions", "Review OSI Model vs TCP/IP"],
  "learningTips": ["Use active recall for protocol definitions", "Time your mock tests"]
}`;

  const rawResult = await callGeminiAPI(prompt);
  if (rawResult) {
    try {
      const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.recommendedSubjects && Array.isArray(parsed.recommendedSubjects)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse Gemini study recommendations, using fallbacks.');
    }
  }

  // Heuristic Fallback Study Recommendation Engine
  const accuracy = userProgress.accuracyPercentage || 100;
  const isWeak = accuracy < 70;

  return {
    overallStatus: isWeak ? 'Needs Focused Practice' : 'On Track for Placement',
    primaryFocus: weakTopics.length > 0 ? weakTopics[0].topic || 'Core Fundamentals' : 'Computer Networks & Operating Systems',
    recommendedSubjects: [
      {
        subjectId: 'cn',
        subjectName: 'Computer Networks',
        priority: 'High',
        reason: 'Networking protocols form the backbone of modern backend & system design rounds.',
        suggestedQuestionsCount: 10
      },
      {
        subjectId: 'os',
        subjectName: 'Operating Systems',
        priority: 'Medium',
        reason: 'Essential for understanding concurrency, memory management, and process execution.',
        suggestedQuestionsCount: 8
      }
    ],
    dailyActionPlan: [
      'Solve 5 medium-difficulty practice questions today.',
      'Take a 15-minute timed topic mock test.',
      'Review wrong answer explanations to reinforce weak areas.'
    ],
    learningTips: [
      'Focus on understanding underlying mechanics rather than memorizing answers.',
      'Maintain your daily study streak to maximize placement readiness.'
    ]
  };
};

// ==========================================
// 7. Daily Learning Suggestions
// ==========================================
export const generateAiDailyLearningSuggestions = async ({
  streakCount = 1,
  solvedCount = 0,
  preferredSubject = 'Computer Networks'
}) => {
  const prompt = `You are a daily AI learning coach for tech interview prep. Generate a bite-sized daily learning plan.

Current Streak: ${streakCount} days
Questions Solved: ${solvedCount}
Focus Subject: ${preferredSubject}

Return ONLY a valid JSON object matching this structure:
{
  "todaysFocusTopic": "TCP/IP 3-Way Handshake",
  "estimatedTimeMinutes": 30,
  "conceptOfTheDay": "The 3-way handshake establishes a reliable TCP connection using SYN, SYN-ACK, and ACK packets.",
  "practiceTasks": [
    {
      "id": "t1",
      "title": "Study TCP Handshake Sequence",
      "description": "Understand flags, sequence numbers, and SYN flood attacks.",
      "subjectId": "cn",
      "type": "read"
    },
    {
      "id": "t2",
      "title": "Solve 3 Networking MCQs",
      "description": "Test knowledge on transport layer protocols.",
      "subjectId": "cn",
      "type": "practice"
    }
  ],
  "motivationQuote": "Consistency is the key to mastering complex engineering principles."
}`;

  const rawResult = await callGeminiAPI(prompt);
  if (rawResult) {
    try {
      const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.todaysFocusTopic && parsed.practiceTasks) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse Gemini daily suggestions JSON, using fallback.');
    }
  }

  // Heuristic Fallback Daily Suggestions
  return {
    todaysFocusTopic: `${preferredSubject} Core Principles`,
    estimatedTimeMinutes: 30,
    conceptOfTheDay: `Mastering foundational ${preferredSubject} concepts builds problem-solving intuition for technical rounds.`,
    practiceTasks: [
      {
        id: 'task-1',
        title: `Review ${preferredSubject} Key Definitions`,
        description: 'Read through core concepts and summary notes.',
        subjectId: 'cn',
        type: 'read'
      },
      {
        id: 'task-2',
        title: 'Complete Daily 5-Question Quiz',
        description: 'Solve 5 mixed questions to test recall accuracy.',
        subjectId: 'cn',
        type: 'quiz'
      }
    ],
    motivationQuote: 'Small daily steps compound into massive interview success.'
  };
};

// ==========================================
// 8. Career Guidance
// ==========================================
export const generateAiCareerGuidance = async ({
  targetRole = 'Backend Engineer',
  targetCompany = 'Top Tech Companies',
  experienceYears = 0,
  currentSkills = [],
  goalTimeframe = '6 months'
}) => {
  const prompt = `You are a career strategist and engineering director. Provide comprehensive career guidance for a candidate.

Target Role: "${targetRole}"
Target Company Target: "${targetCompany}"
Experience Level: ${experienceYears} years
Current Skills: ${currentSkills.join(', ')}
Target Timeframe: ${goalTimeframe}

Return ONLY a valid JSON object matching this structure:
{
  "careerPathOverview": "Strategic overview of the ${targetRole} career trajectory and market demand.",
  "industryDemand": "High demand with focus on scalable distributed systems.",
  "skillGapAnalysis": {
    "strengths": ["Solid foundation in core languages"],
    "skillsToMaster": ["Distributed Systems", "Database Indexing", "System Design"]
  },
  "interviewPrepStrategy": [
    "Step 1: Master CS Fundamentals & Algorithms",
    "Step 2: Build 2 production-grade backend projects",
    "Step 3: Conduct mock behavioral & technical interviews"
  ],
  "actionPlan30_60_90": {
    "days30": ["Solve 50 core DS & OS questions", "Complete initial resume draft"],
    "days60": ["Build a full-stack microservices project", "Take 5 timed grand mock tests"],
    "days90": ["Apply to target roles", "Conduct weekly mock interviews"]
  },
  "recommendedRoles": ["Backend Engineer", "Software Engineer", "Systems Developer"]
}`;

  const rawResult = await callGeminiAPI(prompt);
  if (rawResult) {
    try {
      const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.careerPathOverview && parsed.actionPlan30_60_90) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse Gemini career guidance JSON, using fallbacks.');
    }
  }

  // Heuristic Fallback Career Guidance Engine
  return {
    careerPathOverview: `The ${targetRole} role requires a strong blend of computer science fundamentals, backend architecture, problem-solving, and system design.`,
    industryDemand: 'High demand across product tech startups and global enterprise engineering teams.',
    skillGapAnalysis: {
      strengths: currentSkills.length > 0 ? currentSkills : ['General Computer Science Knowledge'],
      skillsToMaster: ['System Architecture', 'Database Query Optimization', 'Containerization & Docker', 'Cloud Fundamentals']
    },
    interviewPrepStrategy: [
      'Stage 1: Deep dive into CS subject fundamentals (OS, Networks, DBMS, OOP).',
      'Stage 2: Practice timed technical mock tests to improve accuracy under pressure.',
      'Stage 3: Refine resume with quantifiable impact metrics and practice STAR method behavioral responses.'
    ],
    actionPlan30_60_90: {
      days30: [
        'Complete foundational subject chapters on KRAMIK platform.',
        'Solve at least 40 practice questions with >75% accuracy.'
      ],
      days60: [
        'Complete 3 grand mock test assessments.',
        'Generate and optimize ATS resume using KRAMIK AI Resume tool.'
      ],
      days90: [
        'Conduct full AI mock interviews for target roles.',
        'Begin applying to top target tech companies with tailored resumes.'
      ]
    },
    recommendedRoles: [targetRole, 'Software Engineer', 'Full Stack Developer', 'Systems Engineer']
  };
};
