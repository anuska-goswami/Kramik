import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as aiService from '../services/ai.service.js';

dotenv.config();

async function runAiTests() {
  console.log('=== KRAMIK Google Gemini AI Integration Test Suite ===\n');

  try {
    // 1. Personalized Study Roadmap
    console.log('--- 1. Testing Personalized Study Roadmap ---');
    const roadmap = await aiService.generateAiPersonalizedRoadmap({
      targetRole: 'Backend Developer',
      targetCompany: 'Google',
      currentSkillLevel: 'Intermediate',
      dailyTimeMinutes: 60,
      targetWeeks: 4
    });
    console.log('✔ Roadmap Title:', roadmap.title);
    console.log('✔ Total Milestones:', roadmap.milestones.length);
    if (!roadmap.milestones || roadmap.milestones.length === 0) throw new Error('Roadmap milestones empty!');

    // 2. Resume Generation
    console.log('\n--- 2. Testing Resume Generation ---');
    const summaries = await aiService.generateAiSummary({
      targetRole: 'Software Engineer',
      skills: ['Node.js', 'MongoDB', 'Python'],
      experienceYears: 2
    });
    console.log(`✔ Generated ${summaries.length} summary options.`);

    const bulletPoints = await aiService.generateAiBulletPoints({
      position: 'Backend Engineer',
      company: 'Tech Corp',
      keyTasks: 'Optimized API queries and reduced latency.'
    });
    console.log(`✔ Generated ${bulletPoints.length} ATS action bullet points.`);

    const fullResume = await aiService.generateFullAiResume({
      fullName: 'Alice Developer',
      email: 'alice@example.com',
      targetRole: 'Full Stack Engineer'
    });
    console.log('✔ Generated full resume object for:', fullResume.personalInfo.fullName);

    // 3. Resume Review
    console.log('\n--- 3. Testing Resume Review (ATS Scoring) ---');
    const review = await aiService.reviewAiResume(fullResume);
    console.log(`✔ Resume Review ATS Score: ${review.atsScore}/100`);
    console.log('✔ Overall Feedback:', review.overallFeedback);

    // 4. Interview Feedback & Summary
    console.log('\n--- 4. Testing Interview Feedback ---');
    const answerFeedback = await aiService.evaluateInterviewAnswer({
      questionTitle: 'Explain TCP 3-Way Handshake',
      questionText: 'How does TCP establish a connection?',
      category: 'Computer Networks',
      type: 'technical',
      expectedKeyPoints: ['SYN', 'SYN-ACK', 'ACK'],
      sampleAnswer: 'Client sends SYN, server responds SYN-ACK, client sends ACK.',
      userAnswer: 'The client sends a SYN packet and server returns SYN-ACK packet.'
    });
    console.log(`✔ Interview Answer Score: ${answerFeedback.score}/100`);
    console.log('✔ Strengths:', answerFeedback.strengths.join(', '));

    const overallInterviewSummary = await aiService.generateOverallInterviewSummary({
      targetRole: 'Backend Engineer',
      type: 'technical',
      qaPairs: [{ category: 'Computer Networks', aiFeedback: answerFeedback }]
    });
    console.log(`✔ Overall Interview Score: ${overallInterviewSummary.overallScore}/100`);

    // 5. Question Explanations
    console.log('\n--- 5. Testing Question Explanations ---');
    const questionExplanation = await aiService.generateAiQuestionExplanation({
      questionTitle: 'What is Virtual Memory?',
      description: 'Explain virtual memory in operating systems.',
      options: ['Memory management technique', 'Physical RAM hardware', 'CPU cache', 'Disk storage'],
      correctAnswer: 'Memory management technique',
      explanation: 'Virtual memory decouples logical address space from physical RAM.',
      difficulty: 'Medium',
      subjectId: 'os'
    });
    console.log('✔ Question Explanation Summary:', questionExplanation.summary);
    console.log('✔ Real World Example:', questionExplanation.realWorldExample);

    // 6. Study Recommendations
    console.log('\n--- 6. Testing Study Recommendations ---');
    const studyRecs = await aiService.generateAiStudyRecommendations({
      userProgress: { totalSolved: 25, accuracyPercentage: 65 },
      weakTopics: [{ topic: 'Computer Networks', count: 3 }]
    });
    console.log('✔ Study Status:', studyRecs.overallStatus);
    console.log('✔ Primary Focus:', studyRecs.primaryFocus);

    // 7. Daily Learning Suggestions
    console.log('\n--- 7. Testing Daily Learning Suggestions ---');
    const dailySuggestions = await aiService.generateAiDailyLearningSuggestions({
      streakCount: 3,
      solvedCount: 15,
      preferredSubject: 'Operating Systems'
    });
    console.log('✔ Today Focus Topic:', dailySuggestions.todaysFocusTopic);
    console.log(`✔ Generated ${dailySuggestions.practiceTasks.length} daily practice tasks.`);

    // 8. Career Guidance
    console.log('\n--- 8. Testing Career Guidance ---');
    const careerGuidance = await aiService.generateAiCareerGuidance({
      targetRole: 'Software Engineer',
      targetCompany: 'Top Tech Companies',
      experienceYears: 1,
      currentSkills: ['JavaScript', 'Node.js', 'SQL']
    });
    console.log('✔ Career Overview:', careerGuidance.careerPathOverview);
    console.log('✔ Action Plan 30 Days:', careerGuidance.actionPlan30_60_90.days30.join('; '));

    console.log('\n✅ ALL 8 GOOGLE GEMINI AI FEATURES TESTED AND PASSED PERFECTLY!\n');
  } catch (err) {
    console.error('❌ AI Test suite failed:', err);
    process.exitCode = 1;
  }
}

runAiTests();
