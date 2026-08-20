import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import * as interviewService from '../services/interview.service.js';

dotenv.config();

async function testInterviewModule() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kramik';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for interview module verification test...');

    // 1. Find or create dummy test user
    let user = await User.findOne({ email: 'testinterview@kramik.com' });
    if (!user) {
      user = new User({
        fullName: 'Interview Test Candidate',
        email: 'testinterview@kramik.com',
        password: 'hashedpassword123'
      });
      await user.save();
    }
    console.log(`Test user ID: ${user._id}`);

    // 2. Fetch questions bank
    const questionsRes = await interviewService.getInterviewQuestions({ type: 'technical' });
    console.log(`Fetched ${questionsRes.questions.length} technical questions from bank.`);

    // 3. Start mock interview session
    const session = await interviewService.startInterviewSession(user._id, {
      type: 'mixed',
      targetRole: 'Senior Backend Engineer',
      questionCount: 3
    });
    console.log(`Created interview session ID: ${session._id}, Title: "${session.title}", Questions: ${session.totalQuestions}`);

    // 4. Submit answers for questions
    const q1Answer = 'An LRU cache combines a Doubly Linked List for usage order tracking and a Hash Map for O(1) key lookups. On GET, move node to head. On PUT, insert at head and evict tail if capacity exceeded.';
    const sub1 = await interviewService.submitAnswer(session._id, user._id, 0, q1Answer);
    console.log(`Q1 Answer Submitted. AI Score: ${sub1.qaPair.aiFeedback.score}/100. Strengths:`, sub1.qaPair.aiFeedback.strengths);

    const q2Answer = 'I had a disagreement with a team member over API protocols. We created a matrix evaluating latency, client complexity, and caching, ran benchmarks, and agreed on REST.';
    const sub2 = await interviewService.submitAnswer(session._id, user._id, 1, q2Answer);
    console.log(`Q2 Answer Submitted. AI Score: ${sub2.qaPair.aiFeedback.score}/100. Strengths:`, sub2.qaPair.aiFeedback.strengths);

    // 5. Complete session
    const completedSession = await interviewService.completeInterviewSession(session._id, user._id);
    console.log(`Completed Session Status: ${completedSession.status}`);
    console.log(`Overall Score: ${completedSession.overallScore}/100`);
    console.log(`Score Breakdown:`, completedSession.scoreBreakdown);
    console.log(`AI Summary: "${completedSession.aiOverallFeedback.summary}"`);
    console.log(`Weak Topics Count: ${completedSession.weakTopics.length}`);

    // 6. Fetch history
    const history = await interviewService.getInterviewHistory(user._id, {});
    console.log(`Interview History Count: ${history.sessions.length}`);

    // 7. Fetch weak topic analytics
    const analytics = await interviewService.getWeakTopicsAnalytics(user._id);
    console.log(`Aggregated Weak Topics Analytics - Overall Avg: ${analytics.overallAverageScore}%, Completed Sessions: ${analytics.totalSessionsCompleted}`);

    // 8. Clean up test session
    await interviewService.deleteInterviewSession(session._id, user._id);
    console.log('Cleaned up test interview session.');

    await mongoose.disconnect();
    console.log('\nInterview preparation backend verification PASSED successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

testInterviewModule();
