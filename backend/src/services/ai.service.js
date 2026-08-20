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
