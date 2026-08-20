import mongoose from 'mongoose';
import dotenv from 'dotenv';
import InterviewQuestion from './models/InterviewQuestion.js';

dotenv.config();

const sampleInterviewQuestions = [
  // TECHNICAL QUESTIONS - DATA STRUCTURES & ALGORITHMS
  {
    type: 'technical',
    title: 'Design and Implement an LRU Cache',
    question: 'Explain the data structures and design principles required to implement a Least Recently Used (LRU) Cache supporting get(key) and put(key, value) in O(1) time complexity.',
    category: 'Data Structures',
    difficulty: 'Medium',
    expectedKeyPoints: [
      'Doubly Linked List for usage order tracking',
      'Hash Map for O(1) key lookups',
      'O(1) insertion at head and eviction from tail',
      'Capacity constraint handling'
    ],
    sampleAnswer: `An LRU cache requires O(1) time complexity for both GET and PUT operations.
1. Use a Hash Map that maps key to a node in a Doubly Linked List (DLL).
2. The Doubly Linked List maintains the order of element usage. The head node represents the most recently accessed item, while the tail node represents the least recently used item.
3. GET Operation: Look up key in Hash Map. If found, move node to DLL head and return value. Time: O(1).
4. PUT Operation: If key exists, update value and move to head. If key does not exist, insert new node at head and map key. If capacity is exceeded, remove node from tail and delete entry from Hash Map. Time: O(1).`,
    tips: [
      'Draw the Doubly Linked List pointers clearly.',
      'Mention thread safety or concurrency considerations if asked.'
    ],
    targetRole: ['Software Engineer', 'Backend Developer', 'Full Stack Developer']
  },
  {
    type: 'technical',
    title: 'Explain Dynamic Programming vs Recursion with Memoization',
    question: 'Compare Top-Down Dynamic Programming (Memoization) with Bottom-Up Dynamic Programming (Tabulation). When would you prefer one over the other?',
    category: 'Algorithms',
    difficulty: 'Medium',
    expectedKeyPoints: [
      'Overlapping subproblems and optimal substructure',
      'Top-Down uses recursion + caching (memoization)',
      'Bottom-Up uses iterative table filling (tabulation)',
      'Stack overflow risks in recursion vs space optimization in tabulation'
    ],
    sampleAnswer: `Both techniques solve problems with overlapping subproblems and optimal substructure.
- Top-Down (Memoization): Starts from target problem, recursively breaks it down, and caches results of solved subproblems in a hash map/array. Advantage: Only computes required subproblems. Disadvantage: Recursion call stack overhead (risk of stack overflow).
- Bottom-Up (Tabulation): Starts from base cases and iteratively fills a table up to the target state. Advantage: No recursion overhead, allows space optimization (e.g. reduction from O(N) to O(1) space). Disadvantage: Solves all subproblems up to target regardless of necessity.`,
    tips: [
      'Use 0/1 Knapsack or Fibonacci sequence as a concrete example during explanation.'
    ],
    targetRole: ['Software Engineer', 'Competitive Programmer']
  },

  // TECHNICAL QUESTIONS - SYSTEM DESIGN
  {
    type: 'technical',
    title: 'Design a Scalable URL Shortener (e.g., TinyURL)',
    question: 'How would you design a distributed URL shortening service capable of handling 100M new URLs created daily and 1B redirects daily?',
    category: 'System Design',
    difficulty: 'Hard',
    expectedKeyPoints: [
      'Base62 encoding (A-Z, a-z, 0-9) for short keys',
      'Database choice (NoSQL / Relational with auto-increment ID generator or Base62 hash)',
      'Caching layer (Redis / Memcached) for fast HTTP 302/301 redirects',
      'Scalability & Load Balancing across API servers'
    ],
    sampleAnswer: `Architecture Overview:
1. API endpoints: POST /api/shorten (accepts longURL) and GET /:shortKey (redirects to longURL).
2. Key Generation: Use Base62 encoding on a unique counter (e.g., Snowflake ID generator or distributed range allocator) to produce 7-character strings yielding 62^7 (~3.5 Trillion) unique URLs.
3. Database: NoSQL store (Cassandra / MongoDB) mapping shortKey -> longURL, userID, createdAt, expireAt.
4. Caching: Redis cluster storing top 20% most accessed short URLs. On HTTP GET, check Redis first; if cache hit, return HTTP 302 redirect instantly (latency < 5ms).
5. Load Balancing: NGINX / AWS ALB distributing incoming traffic across stateless API servers.`,
    tips: [
      'Highlight HTTP 301 (Permanent) vs 302 (Temporary redirect) trade-offs for analytics tracking.'
    ],
    targetRole: ['Backend Developer', 'System Architect', 'Senior Software Engineer']
  },

  // TECHNICAL QUESTIONS - OPERATING SYSTEMS & COMPUTER NETWORKS
  {
    type: 'technical',
    title: 'Explain TCP 3-Way Handshake and 4-Way Teardown',
    question: 'Walk through how a TCP connection is established between client and server, and how it is gracefully terminated.',
    category: 'Computer Networks',
    difficulty: 'Easy',
    expectedKeyPoints: [
      'SYN, SYN-ACK, ACK sequence for connection establishment',
      'Initial Sequence Numbers (ISN)',
      'FIN, ACK, FIN, ACK sequence for teardown',
      'TIME_WAIT state purpose'
    ],
    sampleAnswer: `Connection Establishment (3-Way Handshake):
1. Client -> Server: Sends SYN packet with initial sequence number (x).
2. Server -> Client: Responds with SYN-ACK packet with sequence number (y) and acknowledgment number (x+1).
3. Client -> Server: Sends ACK packet with acknowledgment number (y+1). Connection is established.

Connection Teardown (4-Way Handshake):
1. Client -> Server: Sends FIN packet when done sending data.
2. Server -> Client: Sends ACK packet acknowledging FIN.
3. Server -> Client: Sends FIN packet when its transmission is complete.
4. Client -> Server: Sends ACK packet and enters TIME_WAIT state (2 * MSL) to ensure final ACK reaches server before releasing socket.`,
    tips: [
      'Emphasize why TIME_WAIT state exists to prevent delayed duplicate packets from corrupting future connections.'
    ],
    targetRole: ['Backend Developer', 'DevOps Engineer', 'Network Engineer']
  },

  // TECHNICAL QUESTIONS - DBMS
  {
    type: 'technical',
    title: 'Explain Database Indexing Internals (B-Trees & B+ Trees)',
    question: 'How do database indexes improve query performance? Compare B-Tree and B+ Tree indexing structures.',
    category: 'Database Management',
    difficulty: 'Medium',
    expectedKeyPoints: [
      'O(log N) lookup complexity vs O(N) full table scan',
      'B-Tree stores data pointers in both internal and leaf nodes',
      'B+ Tree stores data pointers only in leaf nodes with doubly linked leaves',
      'Sequential disk I/O and range query efficiency in B+ Trees'
    ],
    sampleAnswer: `Indexes act as lookup lookup structures reducing query time from O(N) to O(log N).
- B-Tree: Keys and record pointers are stored in both internal nodes and leaf nodes.
- B+ Tree: Internal nodes store only search key routing signals; all data records/pointers reside exclusively in leaf nodes.
- Advantage of B+ Tree (used by MySQL InnoDB & PostgreSQL): Leaf nodes are connected as a doubly linked list, enabling extremely efficient sequential range scans (WHERE age BETWEEN 20 AND 30) without re-traversing upper tree nodes. Higher fan-out means fewer disk I/O operations per query.`,
    tips: [
      'Mention clustered vs non-clustered indexes for extra points.'
    ],
    targetRole: ['Database Administrator', 'Backend Developer']
  },

  // HR QUESTIONS - BEHAVIORAL
  {
    type: 'hr',
    title: 'Describe a situation where you had a conflict with a team member.',
    question: 'How do you handle technical disagreements or interpersonal conflict within an engineering team? Give a specific past example.',
    category: 'Conflict Resolution',
    difficulty: 'Medium',
    expectedKeyPoints: [
      'STAR method (Situation, Task, Action, Result)',
      'Active listening and seeking to understand opposing viewpoint',
      'Focusing on objective data, benchmarks, or user impact rather than ego',
      'Reaching consensus or agreeing to commit after decision'
    ],
    sampleAnswer: `STAR Response:
- Situation: During a release at my previous project, a teammate and I disagreed on whether to use GraphQL or REST for a new mobile API module.
- Task: We needed to settle on an architecture within 2 days to meet client milestone goals.
- Action: I invited the teammate to a whiteboard session. Instead of arguing preferences, we created a matrix evaluating payload size, client implementation effort, and caching requirements. We ran a quick benchmark prototype.
- Result: Data showed REST with targeted field filtering met requirements with 40% less implementation overhead. We agreed on REST, delivered on time, and maintained a great collaborative relationship.`,
    tips: [
      'Focus on resolution, empathy, and data-driven decision making.'
    ],
    targetRole: ['All Roles']
  },
  {
    type: 'hr',
    title: 'Tell me about a time you failed or made a mistake in production.',
    question: 'Describe a significant mistake or failure in your engineering work. What happened, how did you handle it, and what did you learn?',
    category: 'Accountability & Failure',
    difficulty: 'Medium',
    expectedKeyPoints: [
      'Ownership and taking immediate responsibility without shifting blame',
      'Immediate mitigation / rollback actions taken',
      'Blameless post-mortem analysis',
      'Preventative safeguards introduced (tests, alerts, automation)'
    ],
    sampleAnswer: `STAR Response:
- Situation: Early in my career, I deployed a database migration script that accidentally dropped a non-null constraint on an active staging/prod database table.
- Task: Immediate restoration of system stability and prevention of data corruption.
- Action: I immediately notified the team lead, triggered the automated rollback procedure, and restored data from the latest snapshot within 15 minutes.
- Result: System downtime was minimal (<20 mins) with zero data loss. Following the incident, I wrote a blameless post-mortem and added automated CI/CD migration dry-runs to prevent similar human errors.`,
    tips: [
      'Be genuine. Interviewers value transparency, quick remediation, and learning from errors.'
    ],
    targetRole: ['All Roles']
  },

  // HR QUESTIONS - LEADERSHIP & MOTIVATION
  {
    type: 'hr',
    title: 'Why do you want to join our company?',
    question: 'What motivates you to apply for this role and how does it align with your long-term career growth?',
    category: 'Motivation & Career Goals',
    difficulty: 'Easy',
    expectedKeyPoints: [
      'Demonstrated research about company mission, product, or culture',
      'Alignment of personal technical skills with company challenges',
      'Long-term value creation and desire for growth'
    ],
    sampleAnswer: `I have been following your engineering blog regarding distributed systems and cloud infrastructure scalability. My passion lies in building high-throughput backend services, and your recent expansion into real-time analytics presents the exact engineering challenge I thrive on.
With my background in Node.js, system design, and database optimization, I can contribute immediately to your product pipeline while growing alongside a high-caliber engineering team.`,
    tips: [
      'Tailor the response to specific company achievements or technology stack.'
    ],
    targetRole: ['All Roles']
  }
];

async function seedInterviews() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kramik';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for interview seeding...');

    for (const qData of sampleInterviewQuestions) {
      await InterviewQuestion.findOneAndUpdate(
        { title: qData.title, type: qData.type },
        qData,
        { upsert: true, new: true, runValidators: true }
      );
      console.log(`  Seeded ${qData.type.toUpperCase()} interview question: "${qData.title}"`);
    }

    console.log(`\n${sampleInterviewQuestions.length} interview questions seeded successfully.\n`);
    await mongoose.disconnect();
    console.log('MongoDB disconnected. Interview seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Interview seeding failed:', error);
    process.exit(1);
  }
}

seedInterviews();
