import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Subject from '../models/Subject.js';
import Question from '../models/Question.js';
import MockTestPreset from '../models/MockTestPreset.js';
import MockTestAttempt from '../models/MockTestAttempt.js';
import * as mockTestService from '../services/mockTest.service.js';

dotenv.config();

async function runTests() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kramik';
  console.log('Connecting to MongoDB at:', mongoUri);
  await mongoose.connect(mongoUri);

  try {
    console.log('\n--- 1. Setup Test Data ---');
    // Ensure test user exists
    let testUser = await User.findOne({ email: 'testmockuser@example.com' });
    if (!testUser) {
      testUser = await User.create({
        fullName: 'Test Mock User',
        email: 'testmockuser@example.com',
        password: 'password123'
      });
      console.log('Created test user:', testUser._id);
    } else {
      console.log('Found existing test user:', testUser._id);
    }

    // Ensure mock subject and question exist
    let subject = await Subject.findOne({ id: 'cn' });
    if (!subject) {
      subject = await Subject.create({
        id: 'cn',
        name: 'Computer Networks',
        description: 'Networking fundamentals',
        chapters: [{ id: 'ch1', title: 'OSI Model', topics: [{ id: 't1', title: 'Physical Layer' }] }]
      });
    }

    let question1 = await Question.findOne({ subjectId: 'cn', title: 'What layer is IP?' });
    if (!question1) {
      question1 = await Question.create({
        title: 'What layer is IP?',
        description: 'Identify the layer for IP protocol in OSI model.',
        options: ['Network Layer', 'Transport Layer', 'Data Link Layer', 'Application Layer'],
        correctAnswer: 'Network Layer',
        explanation: 'IP belongs to Network Layer.',
        difficulty: 'Medium',
        subjectId: 'cn',
        topicId: 't1'
      });
    }

    let question2 = await Question.findOne({ subjectId: 'cn', title: 'What layer is TCP?' });
    if (!question2) {
      question2 = await Question.create({
        title: 'What layer is TCP?',
        description: 'Identify the layer for TCP protocol in OSI model.',
        options: ['Network Layer', 'Transport Layer', 'Data Link Layer', 'Application Layer'],
        correctAnswer: 'Transport Layer',
        explanation: 'TCP belongs to Transport Layer.',
        difficulty: 'Medium',
        subjectId: 'cn',
        topicId: 't1'
      });
    }

    // Ensure Preset exists
    await MockTestPreset.findOneAndUpdate(
      { slug: 'test-preset-cn' },
      {
        title: 'Networking Fundamentals Test',
        slug: 'test-preset-cn',
        description: 'Test on computer networks',
        subjectIds: ['cn'],
        totalQuestions: 2,
        timeLimitMinutes: 10,
        difficulty: 'Medium',
        isFeatured: true
      },
      { upsert: true, new: true }
    );

    console.log('\n--- 2. Test getMockTestPresets ---');
    const presets = await mockTestService.getMockTestPresets();
    console.log(`Found ${presets.length} presets.`);
    const samplePreset = presets.find((p) => p.slug === 'test-preset-cn');
    if (!samplePreset) throw new Error('Preset test-preset-cn not found');
    console.log('✔ Preset retrieved successfully:', samplePreset.title);

    console.log('\n--- 3. Test generateMockTest ---');
    const generatedAttempt = await mockTestService.generateMockTest(testUser._id, {
      presetSlug: 'test-preset-cn'
    });
    console.log('✔ Mock Test Generated ID:', generatedAttempt._id);
    console.log('Total questions in attempt:', generatedAttempt.questions.length);
    console.log('Status:', generatedAttempt.status);

    // Verify answers are stripped
    if (generatedAttempt.questions[0].correctAnswer !== undefined) {
      throw new Error('Security flaw: correctAnswer exposed in generated test payload!');
    }
    console.log('✔ Answers successfully stripped from generated payload.');

    console.log('\n--- 4. Test startMockTest ---');
    const startedAttempt = await mockTestService.startMockTest(generatedAttempt._id, testUser._id);
    console.log('✔ Attempt started. Status:', startedAttempt.status);

    console.log('\n--- 5. Test getMockTestAttempt ---');
    const fetchedAttempt = await mockTestService.getMockTestAttempt(generatedAttempt._id, testUser._id);
    if (fetchedAttempt.questions[0].correctAnswer !== undefined) {
      throw new Error('Security flaw: correctAnswer exposed in active attempt payload!');
    }
    console.log('✔ Active attempt fetched without exposing answers.');

    console.log('\n--- 6. Test submitMockTest ---');
    const q1 = fetchedAttempt.questions[0];
    const q2 = fetchedAttempt.questions[1];

    // Find real question for correct answer text
    const realQ1 = [question1, question2].find((q) => q._id.toString() === q1.questionId.toString());
    const realQ2 = [question1, question2].find((q) => q._id.toString() === q2.questionId.toString());

    const userAnswers = [
      {
        questionId: q1.questionId,
        selectedOption: realQ1 ? realQ1.correctAnswer : 'Network Layer',
        timeTakenSeconds: 15
      },
      {
        questionId: q2.questionId,
        selectedOption: 'Wrong Option',
        timeTakenSeconds: 20
      }
    ];

    const submittedResult = await mockTestService.submitMockTest(generatedAttempt._id, testUser._id, userAnswers);
    console.log('✔ Mock Test Submitted!');
    console.log('Score:', `${submittedResult.score} / ${submittedResult.maxScore}`);
    console.log('Percentage:', `${submittedResult.percentage}%`);
    console.log('Accuracy:', `${submittedResult.accuracy}%`);
    console.log('Subject Breakdown:', JSON.stringify(submittedResult.subjectBreakdown, null, 2));

    if (submittedResult.score !== 1) {
      throw new Error(`Expected score 1, got ${submittedResult.score}`);
    }

    console.log('\n--- 7. Test getUserTestHistory ---');
    const history = await mockTestService.getUserTestHistory(testUser._id, { page: 1, limit: 10 });
    console.log(`✔ History retrieved. Total attempts: ${history.pagination.total}`);

    console.log('\n--- 8. Test getUserPerformanceAnalytics ---');
    const analytics = await mockTestService.getUserPerformanceAnalytics(testUser._id);
    console.log('✔ Performance Analytics:', JSON.stringify({
      totalTestsCompleted: analytics.totalTestsCompleted,
      averagePercentage: analytics.averagePercentage,
      averageAccuracy: analytics.averageAccuracy,
      difficultyBreakdown: analytics.difficultyBreakdown
    }, null, 2));

    console.log('\n--- 9. Test getSubjectReports ---');
    const reports = await mockTestService.getSubjectReports(testUser._id);
    console.log('✔ Subject Reports:', JSON.stringify(reports, null, 2));

    console.log('\n--- 10. Test getLeaderboard ---');
    const leaderboard = await mockTestService.getLeaderboard({ period: 'all-time', limit: 5 });
    console.log('✔ Leaderboard:', JSON.stringify(leaderboard, null, 2));

    console.log('\n✅ ALL MOCK TEST INTEGRATION TESTS PASSED PERFECTLY!\n');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected MongoDB.');
  }
}

runTests();
