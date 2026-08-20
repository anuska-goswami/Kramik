import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from './models/Company.js';
import CompanyQuestion from './models/CompanyQuestion.js';

dotenv.config();

const sampleCompanies = [
  {
    name: 'Google',
    slug: 'google',
    logo: 'https://logo.clearbit.com/google.com',
    description: 'Global technology leader in search engines, cloud computing, artificial intelligence, and hardware.',
    industry: 'Software & Technology',
    tier: 'MAANG',
    difficulty: 'Hard',
    avgCTC: '30 - 55 LPA',
    locations: ['Bangalore', 'Hyderabad', 'Gurgaon'],
    roles: ['Software Engineer', 'Site Reliability Engineer', 'Product Manager'],
    website: 'https://careers.google.com',
    overview: 'Google interview process focuses heavily on data structures, algorithms, system design, and Googliness (behavioral alignment). Questions test problem-solving efficiency and code clarity.',
    selectionProcess: [
      { roundNumber: 1, name: 'Online Coding Assessment', description: '2-3 algorithmic problems on arrays, graphs, or dynamic programming (90 mins).', duration: '90 mins' },
      { roundNumber: 2, name: 'Technical Phone Screen', description: '1-2 coding problems focusing on optimization and data structures with live execution.', duration: '45 mins' },
      { roundNumber: 3, name: 'Onsite Coding Round 1 & 2', description: 'Deep dive into complex data structures, trees, graphs, and dynamic programming.', duration: '45 mins each' },
      { roundNumber: 4, name: 'System Design Round', description: 'Design scalable distributed systems, caching, database indexing, and API design.', duration: '45 mins' },
      { roundNumber: 5, name: 'Googliness & Leadership', description: 'Behavioral interview evaluating ethics, teamwork, adaptability, and leadership.', duration: '45 mins' }
    ],
    prepTips: [
      'Master Graphs, Dynamic Programming, and Tries.',
      'Always talk out your thought process while coding.',
      'Analyze time and space complexity before writing code.',
      'Prepare STAR-method examples for Googliness questions.'
    ],
    tags: ['MAANG', 'Search', 'Cloud', 'AI', 'Distributed Systems'],
    isPopular: true
  },
  {
    name: 'Amazon',
    slug: 'amazon',
    logo: 'https://logo.clearbit.com/amazon.com',
    description: 'Multinational technology company focusing on e-commerce, cloud computing (AWS), digital streaming, and AI.',
    industry: 'E-Commerce & Cloud',
    tier: 'MAANG',
    difficulty: 'Hard',
    avgCTC: '28 - 48 LPA',
    locations: ['Bangalore', 'Hyderabad', 'Chennai', 'Gurgaon'],
    roles: ['Software Development Engineer (SDE-1)', 'AWS Support Engineer', 'Data Engineer'],
    website: 'https://amazon.jobs',
    overview: 'Amazon heavily emphasizes its 16 Leadership Principles alongside rigorous coding and system design rounds.',
    selectionProcess: [
      { roundNumber: 1, name: 'Online Assessment (OA)', description: '2 coding questions + Work Style Assessment & Reasoning.', duration: '120 mins' },
      { roundNumber: 2, name: 'Technical Round 1 (DS & Algo)', description: 'Problem solving on Binary Trees, Arrays, Heap, and Strings + Leadership Principles.', duration: '60 mins' },
      { roundNumber: 3, name: 'Technical Round 2 (OOP & System Design)', description: 'Object-Oriented Design (LLD) or High-Level System Design + Leadership Principles.', duration: '60 mins' },
      { roundNumber: 4, name: 'Bar Raiser Round', description: 'Extremely tough round testing Leadership Principles, problem solving, and cultural fit.', duration: '60 mins' }
    ],
    prepTips: [
      'Align all behavioral answers with Amazon 16 Leadership Principles.',
      'Practice Low-Level Design (LLD) using OOP patterns (e.g. Parking Lot, Elevator).',
      'Focus on Sliding Window, Two Pointers, and Binary Tree traversals.'
    ],
    tags: ['MAANG', 'E-Commerce', 'AWS', 'LLD', 'Leadership Principles'],
    isPopular: true
  },
  {
    name: 'Microsoft',
    slug: 'microsoft',
    logo: 'https://logo.clearbit.com/microsoft.com',
    description: 'Leading global developer of personal computer software, consumer electronics, and Azure cloud services.',
    industry: 'Software & Cloud',
    tier: 'MAANG',
    difficulty: 'Hard',
    avgCTC: '26 - 50 LPA',
    locations: ['Hyderabad', 'Bangalore', 'Noida'],
    roles: ['Software Engineer', 'Cloud Solutions Architect', 'Security Engineer'],
    website: 'https://careers.microsoft.com',
    overview: 'Microsoft evaluates fundamental CS concepts (OS, Computer Networks, DBMS) alongside algorithm design and code readability.',
    selectionProcess: [
      { roundNumber: 1, name: 'Online Coding Test', description: '3 coding questions testing DS & Algo algorithms on Codility.', duration: '100 mins' },
      { roundNumber: 2, name: 'Technical Round 1', description: 'Arrays, Linked Lists, Trees, and core CS fundamentals (OS/Networking).', duration: '60 mins' },
      { roundNumber: 3, name: 'Technical Round 2', description: 'Advanced problem solving, recursion, DP, and system architecture.', duration: '60 mins' },
      { roundNumber: 4, name: 'AA Round (As-Appropriate / HR)', description: 'Cultural fit, project experience, passion for tech, and problem-solving mindset.', duration: '45 mins' }
    ],
    prepTips: [
      'Revise Operating Systems (Deadlocks, Threads) and Database Internals.',
      'Write clean, production-ready code with proper error handling during interviews.',
      'Practice Linked Lists, Recursion, and Binary Search Trees.'
    ],
    tags: ['MAANG', 'Azure', 'Windows', 'OS', 'Cloud'],
    isPopular: true
  },
  {
    name: 'Tata Consultancy Services (TCS)',
    slug: 'tcs',
    logo: 'https://logo.clearbit.com/tcs.com',
    description: 'India largest IT services and consulting organization operating globally across banking, healthcare, and retail.',
    industry: 'IT Services',
    tier: 'Service-Based',
    difficulty: 'Easy',
    avgCTC: '3.6 - 9 LPA',
    locations: ['Mumbai', 'Bangalore', 'Pune', 'Chennai', 'Kolkata', 'Delhi NCR'],
    roles: ['Ninja Software Developer', 'Digital Developer', 'System Engineer'],
    website: 'https://www.tcs.com/careers',
    overview: 'TCS National Qualifier Test (NQT) tests quantitative aptitude, logical reasoning, verbal ability, and foundational programming logic.',
    selectionProcess: [
      { roundNumber: 1, name: 'TCS NQT Online Exam', description: 'Cognitive (Quants, Reasoning, English) + Technical Coding Section.', duration: '180 mins' },
      { roundNumber: 2, name: 'Technical Interview', description: 'Basic programming in Java/C++/Python, SQL queries, OOP concepts, and final year project.', duration: '30 mins' },
      { roundNumber: 3, name: 'Managerial & HR Round', description: 'Situational questions, relocation flexibility, and communication skills.', duration: '20 mins' }
    ],
    prepTips: [
      'Focus heavily on quantitative aptitude (Speed & Time, Profit & Loss, Work).',
      'Brush up SQL JOINs and basic OOP pillars.',
      'Be clear and articulate about your college project.'
    ],
    tags: ['Service-Based', 'TCS NQT', 'IT Services', 'Mass Recruiter'],
    isPopular: true
  },
  {
    name: 'Infosys',
    slug: 'infosys',
    logo: 'https://logo.clearbit.com/infosys.com',
    description: 'Global leader in next-generation digital services and consulting across 50+ countries.',
    industry: 'IT Services',
    tier: 'Service-Based',
    difficulty: 'Easy',
    avgCTC: '3.6 - 9.5 LPA',
    locations: ['Bangalore', 'Mysore', 'Pune', 'Hyderabad', 'Chennai'],
    roles: ['System Engineer', 'Specialist Programmer (SP)', 'Digital Specialist Engineer (DSE)'],
    website: 'https://www.infosys.com/careers',
    overview: 'Infosys conducts hiring via HackWithInfy and Infosys Certification test for specialized roles, alongside campus recruitment drives.',
    selectionProcess: [
      { roundNumber: 1, name: 'Online Assessment', description: 'Mathematical ability, logical reasoning, verbal ability, pseudo-code & puzzle solving.', duration: '100 mins' },
      { roundNumber: 2, name: 'Technical Interview', description: 'Coding basics, SQL queries, OOP concepts, array manipulation, and resume discussion.', duration: '30 mins' },
      { roundNumber: 3, name: 'HR Interview', description: 'Document verification, willingness to work in shifts, and communication test.', duration: '15 mins' }
    ],
    prepTips: [
      'Practice pseudo-code interpretation and output estimation.',
      'Strong hold on fundamental SQL commands (GROUP BY, HAVING, INNER JOIN).',
      'For SP/DSE roles, focus on Competitive Programming & Dynamic Programming.'
    ],
    tags: ['Service-Based', 'HackWithInfy', 'IT Services', 'Consulting'],
    isPopular: true
  },
  {
    name: 'Flipkart',
    slug: 'flipkart',
    logo: 'https://logo.clearbit.com/flipkart.com',
    description: 'India premier e-commerce marketplace pioneering online retail and fintech innovation.',
    industry: 'E-Commerce & Tech',
    tier: 'Product-Based',
    difficulty: 'Medium',
    avgCTC: '18 - 32 LPA',
    locations: ['Bangalore'],
    roles: ['UI Engineer', 'Backend Software Engineer', 'Data Scientist'],
    website: 'https://www.flipkartcareers.com',
    overview: 'Flipkart technical evaluation includes Machine Coding rounds (LLD) followed by Problem Solving / Data Structures and High Level Design.',
    selectionProcess: [
      { roundNumber: 1, name: 'Online Coding Challenge', description: '3 competitive programming problems on HackerEarth.', duration: '90 mins' },
      { roundNumber: 2, name: 'Machine Coding Round (LLD)', description: 'Design and write clean, working code for a system (e.g. Snake & Ladder, Wallet App) in 2 hours.', duration: '120 mins' },
      { roundNumber: 3, name: 'Problem Solving & Data Structures', description: 'Advanced algorithms, Trees, DP, and optimization.', duration: '60 mins' },
      { roundNumber: 4, name: 'System Architecture & Hiring Manager', description: 'Scalability, microservices, messaging queues, and cultural fit.', duration: '60 mins' }
    ],
    prepTips: [
      'Practice Machine Coding: write clean, object-oriented, extensible code in 90-120 minutes.',
      'Focus on Redis caching, Kafka queues, and relational vs NoSQL trade-offs.',
      'Revise Heap, Segment Tree, and Graph algorithms.'
    ],
    tags: ['Product-Based', 'E-Commerce', 'Machine Coding', 'LLD'],
    isPopular: true
  }
];

const sampleQuestions = [
  // GOOGLE APTITUDE & INTERVIEW
  {
    companySlug: 'google',
    type: 'aptitude',
    title: 'Probability of Random Walk',
    description: 'A particle moves on a 1D number line starting at 0. At each step, it moves +1 with probability 0.6 and -1 with probability 0.4. What is the expected position after 10 steps?',
    round: 'Online Assessment',
    category: 'Quantitative & Probability',
    difficulty: 'Medium',
    options: ['1.0', '2.0', '2.5', '3.0'],
    correctAnswer: '2.0',
    explanation: 'Expected value per step = (+1 * 0.6) + (-1 * 0.4) = 0.6 - 0.4 = 0.2. For 10 steps, expected position = 10 * 0.2 = 2.0.',
    frequency: 4,
    tags: ['Probability', 'Expected Value']
  },
  {
    companySlug: 'google',
    type: 'interview',
    title: 'Find Lowest Common Ancestor in a Binary Tree',
    description: 'Given a binary tree and two nodes p and q, find their lowest common ancestor (LCA).',
    round: 'Technical Round 1',
    category: 'Data Structures & Algorithms',
    difficulty: 'Medium',
    sampleAnswer: `Recursive Approach:
1. If current node is null or equal to p or q, return current node.
2. Recurse for left subtree and right subtree.
3. If both left and right return non-null values, current node is the LCA.
4. Otherwise, return the non-null child.

Time Complexity: O(N) where N is number of nodes.
Space Complexity: O(H) where H is tree height for recursion stack.`,
    keyConcepts: ['Binary Trees', 'Recursion', 'DFS'],
    frequency: 5,
    tags: ['Tree', 'DFS', 'LCA']
  },
  {
    companySlug: 'google',
    type: 'interview',
    title: 'Design a Distributed Rate Limiter',
    description: 'How would you design a rate limiting service capable of handling millions of requests per second across geographically distributed clusters?',
    round: 'System Design Round',
    category: 'System Design',
    difficulty: 'Hard',
    sampleAnswer: `Key Architecture Components:
1. Token Bucket / Sliding Window Log Algorithm using Redis.
2. Atomic Redis operations using Lua scripts to prevent race conditions.
3. Distributed cache clusters (Redis Sentinel / Cluster) with consistent hashing.
4. Graceful fallback & HTTP 429 Too Many Requests response header.`,
    keyConcepts: ['Sliding Window', 'Redis Lua Scripts', 'Consistent Hashing', 'Rate Limiting'],
    frequency: 5,
    tags: ['Distributed Systems', 'Redis', 'Rate Limiter']
  },

  // AMAZON APTITUDE & INTERVIEW
  {
    companySlug: 'amazon',
    type: 'aptitude',
    title: 'Work and Efficiency',
    description: 'A can complete a task in 12 days and B can complete it in 16 days. They work together for 4 days, then A leaves. How many days will B take to finish the remaining work?',
    round: 'Online Assessment',
    category: 'Quantitative',
    difficulty: 'Easy',
    options: ['6.67 days', '7 days', '8.67 days', '9 days'],
    correctAnswer: '6.67 days',
    explanation: 'A 1 day work = 1/12, B 1 day work = 1/16. Combined 1 day = 7/48. In 4 days = 28/48 = 7/12 completed. Remaining = 5/12. Time taken by B = (5/12) / (1/16) = 20/3 = 6.67 days.',
    frequency: 4,
    tags: ['Time and Work', 'Quantitative']
  },
  {
    companySlug: 'amazon',
    type: 'interview',
    title: 'LRU Cache Implementation',
    description: 'Design a data structure for Least Recently Used (LRU) cache supporting get(key) and put(key, value) in O(1) time complexity.',
    round: 'Technical Round 1',
    category: 'Data Structures & Algorithms',
    difficulty: 'Medium',
    sampleAnswer: `Use a combination of a Doubly Linked List (DLL) and a Hash Map.
- Hash Map maps key -> Doubly Linked List Node for O(1) lookup.
- Doubly Linked List maintains usage order. Most recently used node is at the head, least recently used is at the tail.
- On 'get': move node to head.
- On 'put': add/update node at head. If capacity exceeds, evict tail node and remove from hash map.`,
    keyConcepts: ['Doubly Linked List', 'Hash Map', 'O(1) Eviction'],
    frequency: 5,
    tags: ['LRU Cache', 'Doubly Linked List', 'Data Structures']
  },
  {
    companySlug: 'amazon',
    type: 'interview',
    title: 'Tell me about a time you had to deliver under a tight deadline with incomplete requirements.',
    round: 'Behavioral / Bar Raiser',
    category: 'Behavioral & Leadership',
    difficulty: 'Medium',
    sampleAnswer: `Structure using STAR Method:
- Situation: Describe project context and urgency.
- Task: Define your specific responsibility and ambiguous requirements.
- Action: Explain how you communicated with stakeholders, prioritized MVP features, made reasonable assumptions, and iterated quickly.
- Result: Share quantifiable outcome (e.g. delivered on time, 99.9% uptime, saved 2 weeks of engineering effort).`,
    keyConcepts: ['STAR Method', 'Customer Obsession', 'Bias for Action', 'Deliver Results'],
    frequency: 5,
    tags: ['Leadership Principles', 'Behavioral', 'STAR']
  },

  // MICROSOFT APTITUDE & INTERVIEW
  {
    companySlug: 'microsoft',
    type: 'aptitude',
    title: 'Speed, Time and Distance',
    description: 'A train 150m long passes a telegraph post in 12 seconds. What is the speed of the train in km/h?',
    round: 'Online Test',
    category: 'Quantitative',
    difficulty: 'Easy',
    options: ['45 km/h', '50 km/h', '54 km/h', '60 km/h'],
    correctAnswer: '45 km/h',
    explanation: 'Speed = Distance / Time = 150m / 12s = 12.5 m/s. In km/h = 12.5 * (18 / 5) = 45 km/h.',
    frequency: 3,
    tags: ['Speed Time Distance', 'Quantitative']
  },
  {
    companySlug: 'microsoft',
    type: 'interview',
    title: 'Detect and Remove Loop in a Linked List',
    description: 'Write an algorithm to detect if a linked list contains a cycle and remove the loop if present.',
    round: 'Technical Round 1',
    category: 'Data Structures & Algorithms',
    difficulty: 'Medium',
    sampleAnswer: `Floyd Cycle Detection Algorithm (Tortoise and Hare):
1. Use slow pointer (moves 1 step) and fast pointer (moves 2 steps).
2. If slow == fast, loop is detected.
3. Reset slow pointer to head. Keep fast at meeting point.
4. Move both slow and fast 1 step at a time. The point where they meet again is the start of the loop.
5. Traverse fast to node whose next is start of loop, set fast.next = null to break loop.`,
    keyConcepts: ['Two Pointers', 'Cycle Detection', 'Linked List'],
    frequency: 5,
    tags: ['Linked List', 'Floyd Cycle', 'Pointers']
  },

  // TCS APTITUDE & INTERVIEW
  {
    companySlug: 'tcs',
    type: 'aptitude',
    title: 'Ratio and Proportion',
    description: 'The ratio of ages of A and B is 3:5. After 6 years, the ratio becomes 2:3. What is the present age of A?',
    round: 'TCS NQT',
    category: 'Quantitative',
    difficulty: 'Easy',
    options: ['12 years', '18 years', '24 years', '30 years'],
    correctAnswer: '18 years',
    explanation: 'Let ages be 3x and 5x. (3x + 6) / (5x + 6) = 2 / 3 => 3(3x + 6) = 2(5x + 6) => 9x + 18 = 10x + 12 => x = 6. Present age of A = 3 * 6 = 18 years.',
    frequency: 5,
    tags: ['TCS NQT', 'Ages', 'Ratio']
  },
  {
    companySlug: 'tcs',
    type: 'interview',
    title: 'Difference between Process and Thread in OS',
    description: 'Explain key differences between a Process and a Thread with memory management context.',
    round: 'Technical Interview',
    category: 'Computer Fundamentals',
    difficulty: 'Easy',
    sampleAnswer: `- Process: An executing program instance with its own isolated memory address space (heap, stack, data segment). Heavyweight context switching.
- Thread: A subset of a process (lightweight thread of execution) sharing memory, code, and global variables with other threads in the same process, but having its own stack and registers. Fast context switching.`,
    keyConcepts: ['Operating System', 'Memory Isolation', 'Context Switching'],
    frequency: 5,
    tags: ['OS', 'Process vs Thread', 'TCS Interview']
  },

  // INFOSYS APTITUDE & INTERVIEW
  {
    companySlug: 'infosys',
    type: 'aptitude',
    title: 'Data Sufficiency & Puzzles',
    description: 'Find the next number in the sequence: 3, 7, 15, 31, 63, ?',
    round: 'Online Test',
    category: 'Logical Reasoning',
    difficulty: 'Easy',
    options: ['120', '127', '128', '135'],
    correctAnswer: '127',
    explanation: 'Pattern: Each term = (Previous Term * 2) + 1. Or difference between consecutive terms doubles (4, 8, 16, 32, 64). Next term = 63 + 64 = 127 (or 63*2 + 1 = 127).',
    frequency: 4,
    tags: ['Number Series', 'Logical Reasoning']
  },
  {
    companySlug: 'infosys',
    type: 'interview',
    title: 'What are ACID properties in DBMS?',
    description: 'Explain Atomicity, Consistency, Isolation, and Durability in database systems.',
    round: 'Technical Interview',
    category: 'Database Management',
    difficulty: 'Easy',
    sampleAnswer: `- Atomicity: All operations in a transaction succeed or all fail (All or Nothing).
- Consistency: Database remains in a valid state before and after transaction.
- Isolation: Concurrent transactions execute without interfering with each other.
- Durability: Once committed, changes survive system crashes.`,
    keyConcepts: ['Transactions', 'ACID', 'Database Integrity'],
    frequency: 5,
    tags: ['DBMS', 'ACID Properties', 'Database']
  },

  // FLIPKART APTITUDE & INTERVIEW
  {
    companySlug: 'flipkart',
    type: 'aptitude',
    title: 'Permutations and Combinations',
    description: 'In how many ways can the letters of the word "FLIPKART" be arranged so that vowels always come together?',
    round: 'Online Challenge',
    category: 'Quantitative',
    difficulty: 'Medium',
    options: ['5040', '10080', '14400', '40320'],
    correctAnswer: '10080',
    explanation: 'Vowels in FLIPKART = I, A (2 vowels). Consonants = F, L, P, K, R, T (6 consonants). Treat (I,A) as 1 single unit + 6 consonants = 7 units. 7 units can be arranged in 7! = 5040 ways. The 2 vowels can arrange among themselves in 2! = 2 ways. Total = 5040 * 2 = 10,080 ways.',
    frequency: 4,
    tags: ['Permutations', 'Combinations']
  },
  {
    companySlug: 'flipkart',
    type: 'interview',
    title: 'Design an In-Memory Key-Value Store with TTL (Machine Coding)',
    description: 'Design and write working code for an in-memory key-value store supporting GET, SET(key, val, ttl), DELETE, and automatic expiration of expired keys.',
    round: 'Machine Coding Round (LLD)',
    category: 'System Design & LLD',
    difficulty: 'Hard',
    sampleAnswer: `Design Strategy:
1. Thread-safe ConcurrentHashMap for storage: Key -> ValueHolder(value, expireTimestamp).
2. Passive Expiry: On GET, check if currentTime > expireTimestamp. If yes, delete and return null.
3. Active Expiry: Background ScheduledExecutorService sweeping random keys periodically to free memory.
4. Clean interface separation: KeyValueStore interface, ExpirationPolicy interface, MemoryStore implementation.`,
    keyConcepts: ['LLD', 'Thread Safety', 'Passive & Active TTL Expiry', 'OOP Design'],
    frequency: 5,
    tags: ['Machine Coding', 'Low Level Design', 'In-Memory Store']
  }
];

async function seedCompanies() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kramik';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for company seeding...');

    for (const compData of sampleCompanies) {
      await Company.findOneAndUpdate(
        { slug: compData.slug },
        compData,
        { upsert: true, new: true, runValidators: true }
      );
      console.log(`  Seeded company: ${compData.name} (${compData.slug})`);
    }

    console.log(`\n${sampleCompanies.length} companies seeded successfully.\n`);

    for (const qData of sampleQuestions) {
      await CompanyQuestion.findOneAndUpdate(
        { companySlug: qData.companySlug, title: qData.title, type: qData.type },
        qData,
        { upsert: true, new: true, runValidators: true }
      );
      console.log(`  Seeded ${qData.type} question for ${qData.companySlug}: "${qData.title}"`);
    }

    console.log(`\n${sampleQuestions.length} company questions seeded successfully.\n`);

    await mongoose.disconnect();
    console.log('MongoDB disconnected. Company seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Company seeding failed:', error);
    process.exit(1);
  }
}

seedCompanies();
