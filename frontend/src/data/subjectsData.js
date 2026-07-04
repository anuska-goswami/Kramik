export const subjectsDatabase = {
  cn: {
    id: "cn",
    name: "Computer Networks",
    description: "Master TCP/IP, OSI model, routing protocols, and network security.",
    progress: 78,
    completedTopics: 18,
    totalTopics: 23,
    duration: "45 hours",
    chaptersCompleted: 4,
    totalChapters: 12,
    questionsSolved: 145,
    accuracy: 82,
    lastStudied: "Today, 2 hours ago",
    chapters: [
      {
        id: "chap-1",
        title: "Network Fundamentals",
        progress: 100,
        totalTopics: 4,
        completedTopics: 4,
        isLocked: false,
        topics: [
          { id: "t1", title: "OSI Reference Model", duration: "45m", difficulty: "Easy", status: "Completed" },
          { id: "t2", title: "TCP/IP Protocol Suite", duration: "1h 15m", difficulty: "Medium", status: "Completed" },
          { id: "t3", title: "Types of Networks (LAN, WAN)", duration: "30m", difficulty: "Easy", status: "Completed" },
          { id: "t4", title: "Network Topologies", duration: "1h", difficulty: "Medium", status: "Completed" }
        ]
      },
      {
        id: "chap-2",
        title: "Data Link Layer",
        progress: 50,
        totalTopics: 4,
        completedTopics: 2,
        isLocked: false,
        topics: [
          { id: "t5", title: "Error Detection & Correction", duration: "30m", difficulty: "Easy", status: "Completed" },
          { id: "t6", title: "MAC Addressing", duration: "45m", difficulty: "Medium", status: "Completed" },
          { id: "t7", title: "CSMA/CD & CSMA/CA", duration: "1h", difficulty: "Medium", status: "In Progress" },
          { id: "t8", title: "Switching Techniques", duration: "1h 30m", difficulty: "Hard", status: "Available" }
        ]
      },
      {
        id: "chap-3",
        title: "Network Layer & Routing",
        progress: 0,
        totalTopics: 5,
        completedTopics: 0,
        isLocked: true,
        topics: [
          { id: "t9", title: "IPv4 vs IPv6", duration: "1h", difficulty: "Medium", status: "Locked" },
          { id: "t10", title: "Subnetting & CIDR", duration: "45m", difficulty: "Medium", status: "Locked" },
          { id: "t11", title: "Distance Vector Routing", duration: "1h", difficulty: "Medium", status: "Locked" },
          { id: "t12", title: "Link State Routing (OSPF)", duration: "2h", difficulty: "Hard", status: "Locked" },
          { id: "t13", title: "BGP and Inter-domain Routing", duration: "2h", difficulty: "Hard", status: "Locked" }
        ]
      }
    ]
  },
  os: {
    id: "os",
    name: "Operating Systems (OS)",
    description: "Understand process scheduling, memory management, deadlocks, and system calls.",
    progress: 35,
    completedTopics: 5,
    totalTopics: 15,
    duration: "20 hours",
    chaptersCompleted: 1,
    totalChapters: 5,
    questionsSolved: 42,
    accuracy: 76,
    lastStudied: "Yesterday",
    chapters: [
      {
        id: "os-chap-1",
        title: "Introduction & System Calls",
        progress: 100,
        totalTopics: 3,
        completedTopics: 3,
        isLocked: false,
        topics: [
          { id: "os-t1", title: "OS Basics & Kernel", duration: "45m", difficulty: "Easy", status: "Completed" },
          { id: "os-t2", title: "Types of OS", duration: "30m", difficulty: "Easy", status: "Completed" },
          { id: "os-t3", title: "System Calls API", duration: "1h", difficulty: "Medium", status: "Completed" }
        ]
      },
      {
        id: "os-chap-2",
        title: "Process Management & Scheduling",
        progress: 40,
        totalTopics: 5,
        completedTopics: 2,
        isLocked: false,
        topics: [
          { id: "os-t4", title: "Process States & PCB", duration: "45m", difficulty: "Easy", status: "Completed" },
          { id: "os-t5", title: "FCFS & SJF Scheduling", duration: "1h", difficulty: "Medium", status: "Completed" },
          { id: "os-t6", title: "Round Robin & Priority", duration: "1h", difficulty: "Medium", status: "In Progress" },
          { id: "os-t7", title: "Multilevel Queue", duration: "45m", difficulty: "Hard", status: "Available" },
          { id: "os-t8", title: "Thread & Concurrency", duration: "1h", difficulty: "Medium", status: "Available" }
        ]
      }
    ]
  },
  dbms: {
    id: "dbms",
    name: "Database Management Systems",
    description: "Normalization, transactions, ACID properties, indexing, and ER diagrams.",
    progress: 90,
    completedTopics: 12,
    totalTopics: 12,
    duration: "18 hours",
    chaptersCompleted: 4,
    totalChapters: 4,
    questionsSolved: 88,
    accuracy: 94,
    lastStudied: "2 days ago",
    chapters: [
      {
        id: "dbms-chap-1",
        title: "ER Modeling & Relational Model",
        progress: 100,
        totalTopics: 3,
        completedTopics: 3,
        isLocked: false,
        topics: [
          { id: "dbms-t1", title: "Entities & Attributes", duration: "45m", difficulty: "Easy", status: "Completed" },
          { id: "dbms-t2", title: "Keys in DBMS", duration: "30m", difficulty: "Easy", status: "Completed" },
          { id: "dbms-t3", title: "Relational Algebra", duration: "1h", difficulty: "Medium", status: "Completed" }
        ]
      },
      {
        id: "dbms-chap-2",
        title: "Normalization",
        progress: 100,
        totalTopics: 4,
        completedTopics: 4,
        isLocked: false,
        topics: [
          { id: "dbms-t4", title: "Functional Dependencies", duration: "45m", difficulty: "Medium", status: "Completed" },
          { id: "dbms-t5", title: "1NF, 2NF, 3NF", duration: "1h 30m", difficulty: "Hard", status: "Completed" },
          { id: "dbms-t6", title: "BCNF", duration: "1h", difficulty: "Hard", status: "Completed" },
          { id: "dbms-t7", title: "Lossless Decomposition", duration: "45m", difficulty: "Medium", status: "Completed" }
        ]
      }
    ]
  },
  aptitude: {
    id: "aptitude",
    name: "Aptitude & Reasoning",
    description: "Quantitative aptitude, logical reasoning, and shortcuts designed for OA screening.",
    progress: 45,
    completedTopics: 9,
    totalTopics: 20,
    duration: "30 hours",
    chaptersCompleted: 2,
    totalChapters: 8,
    questionsSolved: 250,
    accuracy: 85,
    lastStudied: "Today",
    chapters: [
      {
        id: "apt-chap-1",
        title: "Number System & Percentages",
        progress: 100,
        totalTopics: 4,
        completedTopics: 4,
        isLocked: false,
        topics: [
          { id: "apt-t1", title: "Divisibility & Remainders", duration: "1h", difficulty: "Medium", status: "Completed" },
          { id: "apt-t2", title: "HCF & LCM", duration: "45m", difficulty: "Easy", status: "Completed" },
          { id: "apt-t3", title: "Percentage Basics", duration: "1h", difficulty: "Easy", status: "Completed" },
          { id: "apt-t4", title: "Successive Percentage", duration: "45m", difficulty: "Medium", status: "Completed" }
        ]
      },
      {
        id: "apt-chap-2",
        title: "Time, Speed & Distance",
        progress: 25,
        totalTopics: 4,
        completedTopics: 1,
        isLocked: false,
        topics: [
          { id: "apt-t5", title: "Basic Formula & Relative Speed", duration: "1h", difficulty: "Medium", status: "Completed" },
          { id: "apt-t6", title: "Trains & Platforms", duration: "1h", difficulty: "Medium", status: "In Progress" },
          { id: "apt-t7", title: "Boats & Streams", duration: "1h", difficulty: "Hard", status: "Available" },
          { id: "apt-t8", title: "Circular Tracks", duration: "45m", difficulty: "Hard", status: "Available" }
        ]
      }
    ]
  }
};
export const defaultSubject = {
  id: "generic",
  name: "Subject Overview",
  description: "Detailed modules and chapters for this subject.",
  progress: 0,
  completedTopics: 0,
  totalTopics: 10,
  duration: "10 hours",
  chaptersCompleted: 0,
  totalChapters: 3,
  questionsSolved: 0,
  accuracy: 0,
  lastStudied: "Not started",
  chapters: [
    {
      id: "gen-chap-1",
      title: "Introduction to Concepts",
      progress: 0,
      totalTopics: 3,
      completedTopics: 0,
      isLocked: false,
      topics: [
        { id: "gen-t1", title: "Basics & Fundamentals", duration: "1h", difficulty: "Easy", status: "Available" },
        { id: "gen-t2", title: "Core Principles", duration: "1h", difficulty: "Medium", status: "Available" },
        { id: "gen-t3", title: "Advanced Applications", duration: "1h 30m", difficulty: "Hard", status: "Available" }
      ]
    }
  ]
};
