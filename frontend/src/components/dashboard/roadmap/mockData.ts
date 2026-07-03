import { Roadmap } from './types';

export const initialRoadmaps: Roadmap[] = [
  {
    id: 'road-1',
    goal: 'Crack Frontend Developer Interview',
    days: 30,
    startDate: '2026-07-01',
    subjects: ['Interview Preparation', 'Resume Builder'],
    topics: [
      { id: 'topic-1', name: 'Behavioral Questions & Star Methodology', subject: 'Interview Preparation', completed: true },
      { id: 'topic-2', name: 'Top Coding Patterns (Two Pointers, Sliding Window)', subject: 'Interview Preparation', completed: false },
      { id: 'topic-3', name: 'System Design Fundamentals & Load Balancing', subject: 'Interview Preparation', completed: false },
      { id: 'topic-4', name: 'Structuring Resume Layout & Sections', subject: 'Resume Builder', completed: true },
      { id: 'topic-5', name: 'ATS Keyword Optimization & Alignment', subject: 'Resume Builder', completed: false }
    ],
    progress: 40,
    createdAt: '2026-07-01'
  },
  {
    id: 'road-2',
    goal: 'DBMS and SQL Mastery',
    days: 15,
    startDate: '2026-06-25',
    subjects: ['DBMS', 'SQL'],
    topics: [
      { id: 'topic-6', name: 'Relational Model & ER Diagrams', subject: 'DBMS', completed: true },
      { id: 'topic-7', name: 'Database Normalization (1NF to BCNF)', subject: 'DBMS', completed: true },
      { id: 'topic-8', name: 'ACID Properties & Transaction Schedules', subject: 'DBMS', completed: false },
      { id: 'topic-9', name: 'Basic SQL Queries (SELECT, WHERE, ORDER BY)', subject: 'SQL', completed: true },
      { id: 'topic-10', name: 'Advanced Joins (Inner, Left, Right, Full Joins)', subject: 'SQL', completed: true },
      { id: 'topic-11', name: 'Nested Subqueries, Views, & Index Optimizations', subject: 'SQL', completed: false }
    ],
    progress: 66,
    createdAt: '2026-06-25'
  }
];
