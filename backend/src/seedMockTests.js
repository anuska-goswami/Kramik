import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MockTestPreset from './models/MockTestPreset.js';

dotenv.config();

const samplePresets = [
  {
    title: 'Full CS Fundamentals Grand Mock Test',
    slug: 'full-cs-grand-mock',
    description: 'Comprehensive evaluation covering Computer Networks, Operating Systems, DBMS, OOP, SQL, and Computer Fundamentals.',
    subjectIds: ['cn', 'os', 'dbms', 'oop', 'sql', 'computer-fundamentals'],
    totalQuestions: 20,
    timeLimitMinutes: 30,
    difficulty: 'Mixed',
    isFeatured: true
  },
  {
    title: 'Computer Networks & OS Speed Test',
    slug: 'cn-os-speed-test',
    description: 'Timed speed test assessing OSI Model, TCP/IP, Process Scheduling, and Kernel internals.',
    subjectIds: ['cn', 'os'],
    totalQuestions: 10,
    timeLimitMinutes: 15,
    difficulty: 'Medium',
    isFeatured: true
  },
  {
    title: 'Database Systems & SQL Assessment',
    slug: 'dbms-sql-assessment',
    description: 'Targeted test evaluating Relational Modeling, Normalization, SQL Joins, Indexing, and ACID properties.',
    subjectIds: ['dbms', 'sql'],
    totalQuestions: 10,
    timeLimitMinutes: 15,
    difficulty: 'Medium',
    isFeatured: true
  },
  {
    title: 'Object-Oriented Programming & Fundamentals',
    slug: 'oop-concepts-mock',
    description: 'Fundamental test on Encapsulation, Polymorphism, Abstraction, Inheritance, and digital logic.',
    subjectIds: ['oop', 'computer-fundamentals'],
    totalQuestions: 10,
    timeLimitMinutes: 15,
    difficulty: 'Easy',
    isFeatured: false
  }
];

async function seedMockTests() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kramik';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for mock test presets seeding...');

    for (const presetData of samplePresets) {
      await MockTestPreset.findOneAndUpdate(
        { slug: presetData.slug },
        presetData,
        { upsert: true, new: true, runValidators: true }
      );
      console.log(`  Seeded Mock Test Preset: "${presetData.title}" (${presetData.slug})`);
    }

    console.log(`\n${samplePresets.length} mock test presets seeded successfully.\n`);
    await mongoose.disconnect();
    console.log('MongoDB disconnected. Mock test seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Mock test seeding failed:', error);
    process.exit(1);
  }
}

seedMockTests();
