# KRAMIK - Google Gemini AI Integration Documentation

## Overview

KRAMIK integrates Google Gemini (`gemini-1.5-flash`) via a dedicated modular AI service (`src/services/ai.service.js`). The integration powers 8 core AI feature domains with prompt engineering, structured JSON responses, and zero-downtime heuristic fallback engines.

---

## Storage Strategy

To avoid database clutter, AI-generated content is stored **only when explicitly saved by the user**:
- **Roadmap Goals**: Persisted to `RoadmapGoal` when added to user targets.
- **Resumes**: Persisted to `Resume` when saved in the Resume Builder.
- **Interview Sessions**: Persisted to `InterviewSession` for user performance tracking.
- **Ephemeral AI Features** (Question Explanations, Study Recommendations, Daily Suggestions, Career Guidance): Generated on-demand and returned directly to the client without creating transient DB records.

---

## Gemini Service Architecture

- **Dedicated Service**: `src/services/ai.service.js`
- **Model**: `gemini-1.5-flash`
- **API Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
- **API Key**: Configured via `GEMINI_API_KEY` in environment variables.
- **Fallback Engine**: If `GEMINI_API_KEY` is not set or network/rate limit issues occur, built-in heuristic algorithms generate fallback data.

---

## Detailed AI Feature & API Endpoint Reference

### 1. Personalized Study Roadmap
- **Service Function**: `generateAiPersonalizedRoadmap`
- **Description**: Generates a milestone-based study plan customized by target role, target company, current skill level, and available study time.
- **API Endpoint**: `POST /api/ai/personalized-roadmap` (also `POST /api/roadmap/ai-generate`)
- **Request Payload**:
  ```json
  {
    "targetRole": "Backend Developer",
    "targetCompany": "Google",
    "currentSkillLevel": "Intermediate",
    "dailyTimeMinutes": 60,
    "targetWeeks": 4
  }
  ```
- **Response Format**:
  ```json
  {
    "title": "Personalized Backend Developer Study Plan",
    "description": "Comprehensive prep roadmap optimized for 60 min/day study.",
    "targetRole": "Backend Developer",
    "targetWeeks": 4,
    "totalDays": 28,
    "dailyTimeCommitment": "60 mins",
    "milestones": [
      {
        "id": "m1",
        "title": "Week 1: Operating Systems & Process Concurrency",
        "description": "Master OS scheduling, memory allocation, and thread sync.",
        "week": 1,
        "topics": [
          { "id": "os-t1", "title": "Process Scheduling", "subjectId": "os", "durationMinutes": 60, "priority": "High", "difficulty": "Medium" }
        ],
        "learningObjectives": ["Understand thread execution", "Analyze deadlock prevention"]
      }
    ]
  }
  ```

---

### 2. Resume Generation
- **Service Functions**: `generateAiSummary`, `generateAiBulletPoints`, `generateFullAiResume`
- **Description**: Generates executive professional summaries, ATS action bullet points, and complete structured resume objects.
- **API Endpoint**: `POST /api/ai/resume/generate` (also `POST /api/resume/ai-generate`)
- **Request Payload (Summary/Bullets/Full)**:
  ```json
  {
    "type": "summary",
    "targetRole": "Software Engineer",
    "skills": ["Node.js", "MongoDB", "Python"],
    "experienceYears": 2,
    "keyHighlights": "Built REST APIs and scalable backend architectures."
  }
  ```
- **Response Format**:
  ```json
  {
    "summaries": [
      "Results-driven Software Engineer with 2+ years of experience specializing in Node.js, MongoDB, Python...",
      "Detail-oriented Software Engineer adept in full-stack architecture..."
    ]
  }
  ```

---

### 3. Resume Review (ATS Scoring)
- **Service Function**: `reviewAiResume`
- **Description**: Evaluates a resume object for ATS compliance, contact details, metric bullet points, missing technical keywords, and formatting suggestions.
- **API Endpoint**: `POST /api/ai/resume/review` (also `POST /api/resume/ai-review`)
- **Request Payload**:
  ```json
  {
    "resumeData": {
      "personalInfo": { "fullName": "Jane Doe", "email": "jane@example.com" },
      "summary": "Software Engineer with experience in backend development...",
      "experience": [...],
      "skills": [...]
    }
  }
  ```
- **Response Format**:
  ```json
  {
    "atsScore": 85,
    "overallFeedback": "Strong ATS compliance with well-structured impact statements.",
    "strengths": ["Contact info complete", "Quantifiable metrics included"],
    "weaknesses": ["Missing CI/CD keywords"],
    "missingKeywords": ["Docker", "CI/CD Pipelines", "Redis"],
    "formattingSuggestions": ["Add section headers for projects"]
  }
  ```

---

### 4. Interview Feedback & Session Summary
- **Service Functions**: `evaluateInterviewAnswer`, `generateOverallInterviewSummary`
- **Description**: Evaluates single candidate interview answers with a 0-100 score, strengths, improvements, missing key concepts, and an exemplary model response. Generates overall session reports with score breakdowns and weak topics identification.
- **API Endpoints**: `POST /api/ai/interview/feedback` and `POST /api/ai/interview/summary`
- **Request Payload (Feedback)**:
  ```json
  {
    "questionTitle": "Explain TCP 3-Way Handshake",
    "questionText": "What happens during TCP connection establishment?",
    "category": "Computer Networks",
    "type": "technical",
    "expectedKeyPoints": ["SYN packet", "SYN-ACK response", "ACK confirmation"],
    "sampleAnswer": "Client sends SYN, server responds with SYN-ACK, client sends ACK.",
    "userAnswer": "The client sends a SYN packet and server sends back SYN-ACK."
  }
  ```
- **Response Format**:
  ```json
  {
    "score": 85,
    "strengths": ["Covered SYN and SYN-ACK packets clearly"],
    "improvements": ["Explicitly mention final ACK confirmation step from client"],
    "missingKeyConcepts": ["Final ACK packet"],
    "improvedAnswer": "The client initiates a connection by sending a SYN packet. The server responds with SYN-ACK..."
  }
  ```

---

### 5. Question Explanations
- **Service Function**: `generateAiQuestionExplanation`
- **Description**: Generates deep-dive explanations, step-by-step resolution logic, real-world engineering examples, key takeaways, and follow-up interview questions for any question.
- **API Endpoints**: `POST /api/ai/question-explanation` and `GET /api/questions/:id/ai-explanation`
- **Request Payload**:
  ```json
  {
    "questionTitle": "What is Virtual Memory?",
    "description": "Explain virtual memory and page tables in modern operating systems.",
    "options": ["Memory management technique", "Physical RAM hardware", "CPU register", "Disk filesystem"],
    "correctAnswer": "Memory management technique",
    "difficulty": "Medium",
    "subjectId": "os"
  }
  ```
- **Response Format**:
  ```json
  {
    "summary": "Virtual memory decouples logical address space from physical RAM.",
    "detailedExplanation": "Virtual memory uses page tables and TLB hardware to map virtual addresses...",
    "realWorldExample": "Allows operating systems to run programs larger than available physical RAM.",
    "keyTakeaways": ["Understands page faults", "Knows TLB cache acceleration"],
    "interviewFollowUps": ["What is thrashing?", "Explain Page Replacement algorithms."]
  }
  ```

---

### 6. Study Recommendations
- **Service Function**: `generateAiStudyRecommendations`
- **Description**: Analyzes user's progress, accuracy rates, and test scores to generate prioritized subject recommendations and daily action plans.
- **API Endpoint**: `GET /api/ai/study-recommendations`
- **Response Format**:
  ```json
  {
    "overallStatus": "Needs Focused Practice",
    "primaryFocus": "Computer Networks & Operating Systems",
    "recommendedSubjects": [
      {
        "subjectId": "cn",
        "subjectName": "Computer Networks",
        "priority": "High",
        "reason": "Accuracy is currently below 60%.",
        "suggestedQuestionsCount": 10
      }
    ],
    "dailyActionPlan": ["Solve 5 Medium Network questions", "Review OSI Model"],
    "learningTips": ["Focus on active recall for protocol definitions"]
  }
  ```

---

### 7. Daily Learning Suggestions
- **Service Function**: `generateAiDailyLearningSuggestions`
- **Description**: Generates a bite-sized daily learning plan with today's focus topic, 3 practice tasks, concept of the day, and time commitment.
- **API Endpoint**: `GET /api/ai/daily-suggestions`
- **Response Format**:
  ```json
  {
    "todaysFocusTopic": "TCP/IP 3-Way Handshake",
    "estimatedTimeMinutes": 30,
    "conceptOfTheDay": "The 3-way handshake establishes a reliable TCP connection using SYN, SYN-ACK, and ACK packets.",
    "practiceTasks": [
      { "id": "t1", "title": "Study TCP Handshake", "description": "Read overview", "subjectId": "cn", "type": "read" },
      { "id": "t2", "title": "Solve 3 MCQs", "description": "Practice questions", "subjectId": "cn", "type": "quiz" }
    ],
    "motivationQuote": "Consistency is the key to mastering complex engineering principles."
  }
  ```

---

### 8. Career Guidance
- **Service Function**: `generateAiCareerGuidance`
- **Description**: Generates career strategy, skills gap analysis, interview preparation guidance, and a 30-60-90 day action plan.
- **API Endpoints**: `POST /api/ai/career-guidance` and `POST /api/user/career-guidance`
- **Request Payload**:
  ```json
  {
    "targetRole": "Backend Engineer",
    "targetCompany": "Product Tech Companies",
    "experienceYears": 1,
    "currentSkills": ["JavaScript", "Node.js", "SQL"],
    "goalTimeframe": "6 months"
  }
  ```
- **Response Format**:
  ```json
  {
    "careerPathOverview": "Strategic overview of the Backend Engineer career trajectory...",
    "industryDemand": "High demand for scalable microservice developers.",
    "skillGapAnalysis": {
      "strengths": ["JavaScript", "Node.js"],
      "skillsToMaster": ["System Design", "Database Indexing", "Docker"]
    },
    "interviewPrepStrategy": [
      "Stage 1: CS Fundamentals & Algorithms",
      "Stage 2: Microservices & Databases",
      "Stage 3: Mock Interviews"
    ],
    "actionPlan30_60_90": {
      "days30": ["Solve 40 practice questions", "Study OS & Networks"],
      "days60": ["Build a full-stack project", "Take grand mock tests"],
      "days90": ["Apply to target roles", "Conduct weekly mock interviews"]
    },
    "recommendedRoles": ["Backend Engineer", "Software Engineer", "Systems Developer"]
  }
  ```
