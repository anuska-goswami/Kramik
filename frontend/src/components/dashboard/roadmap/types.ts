export interface RoadmapTopic {
  id: string;
  name: string;
  subject: string;
  completed: boolean;
}

export interface Roadmap {
  id: string;
  goal: string;
  days: number;
  startDate: string;
  subjects: string[];
  topics: RoadmapTopic[];
  progress: number;
  createdAt: string;
}

export const AVAILABLE_SUBJECTS = [
  'Aptitude',
  'DBMS',
  'OS',
  'CN',
  'OOP',
  'SQL',
  'Interview Preparation',
  'Company Preparation',
  'Resume Builder'
];

export const SUBJECT_TOPICS: Record<string, string[]> = {
  'Aptitude': [
    'Quantitative Aptitude Drill (Percentages, Profit & Loss)',
    'Logical Reasoning Problems (Syllogisms, Arrangements)',
    'Verbal Ability Practice (Grammar, Comprehension)',
    'Data Interpretation Practice (Charts & Graphs)'
  ],
  'DBMS': [
    'Relational Model & ER Diagrams',
    'Database Normalization (1NF to BCNF)',
    'ACID Properties & Transaction Schedules',
    'Concurrency Control & Deadlocks'
  ],
  'OS': [
    'CPU Scheduling Algorithms (FCFS, SJF, RR)',
    'Multi-threading & Thread Pools',
    'Banker\'s Algorithm & Deadlock Avoidance',
    'Virtual Memory & Page Replacement Algorithms',
    'File Systems & Disk Scheduling'
  ],
  'CN': [
    'OSI Model Layers & Protocols',
    'IP Addressing, CIDR, & Subnetting',
    'TCP Three-Way Handshake & Congestion Control',
    'DNS, HTTP/HTTPS Protocols & Web Architectures'
  ],
  'OOP': [
    'Classes, Objects, & Constructors',
    'Inheritance & Polymorphism in Practice',
    'Encapsulation & Data Abstraction',
    'SOLID Principles & Common Design Patterns'
  ],
  'SQL': [
    'Basic SQL Queries (SELECT, WHERE, ORDER BY)',
    'Aggregate Functions & GROUP BY Queries',
    'Advanced Joins (Inner, Left, Right, Full Joins)',
    'Nested Subqueries, Views, & Index Optimizations'
  ],
  'Interview Preparation': [
    'Behavioral Questions & Star Methodology',
    'Top Coding Patterns (Two Pointers, Sliding Window)',
    'System Design Fundamentals & Load Balancing',
    'Live Mock Interview & Performance Scoring'
  ],
  'Company Preparation': [
    'Company-Specific Quantitative Patterns',
    'Previous Year Coding Interview Questions',
    'Service-Based Exam Preparation',
    'Product-Based Tech Interview Case Studies'
  ],
  'Resume Builder': [
    'Structuring Resume Layout & Sections',
    'ATS Keyword Optimization & Alignment',
    'Crafting Strong Impact Bullet Points',
    'Portfolio & GitHub Showcase Optimization'
  ]
};
