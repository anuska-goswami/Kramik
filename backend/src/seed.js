import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subject from './models/Subject.js';
import Question from './models/Question.js';

dotenv.config();

const subjects = [
  {
    id: "cn",
    name: "Computer Networks",
    description: "Master TCP/IP, OSI model, routing protocols, and network security.",
    chapters: [
      {
        id: "cn-chap-1",
        title: "Network Fundamentals",
        topics: [
          { id: "cn-t1", title: "OSI Reference Model", duration: "45m", difficulty: "Easy" },
          { id: "cn-t2", title: "TCP/IP Protocol Suite", duration: "1h 15m", difficulty: "Medium" },
          { id: "cn-t3", title: "Types of Networks (LAN, WAN)", duration: "30m", difficulty: "Easy" },
          { id: "cn-t4", title: "Network Topologies", duration: "1h", difficulty: "Medium" }
        ]
      },
      {
        id: "cn-chap-2",
        title: "Data Link Layer",
        topics: [
          { id: "cn-t5", title: "Error Detection & Correction", duration: "30m", difficulty: "Easy" },
          { id: "cn-t6", title: "MAC Addressing", duration: "45m", difficulty: "Medium" },
          { id: "cn-t7", title: "CSMA/CD & CSMA/CA", duration: "1h", difficulty: "Medium" },
          { id: "cn-t8", title: "Switching Techniques", duration: "1h 30m", difficulty: "Hard" }
        ]
      },
      {
        id: "cn-chap-3",
        title: "Network Layer & Routing",
        topics: [
          { id: "cn-t9", title: "IPv4 vs IPv6", duration: "1h", difficulty: "Medium" },
          { id: "cn-t10", title: "Subnetting & CIDR", duration: "45m", difficulty: "Medium" },
          { id: "cn-t11", title: "Distance Vector Routing", duration: "1h", difficulty: "Medium" },
          { id: "cn-t12", title: "Link State Routing (OSPF)", duration: "2h", difficulty: "Hard" },
          { id: "cn-t13", title: "BGP and Inter-domain Routing", duration: "2h", difficulty: "Hard" }
        ]
      }
    ]
  },
  {
    id: "os",
    name: "Operating Systems (OS)",
    description: "Understand process scheduling, memory management, deadlocks, and system calls.",
    chapters: [
      {
        id: "os-chap-1",
        title: "Introduction & System Calls",
        topics: [
          { id: "os-t1", title: "OS Basics & Kernel", duration: "45m", difficulty: "Easy" },
          { id: "os-t2", title: "Types of OS", duration: "30m", difficulty: "Easy" },
          { id: "os-t3", title: "System Calls API", duration: "1h", difficulty: "Medium" }
        ]
      },
      {
        id: "os-chap-2",
        title: "Process Management & Scheduling",
        topics: [
          { id: "os-t4", title: "Process States & PCB", duration: "45m", difficulty: "Easy" },
          { id: "os-t5", title: "FCFS & SJF Scheduling", duration: "1h", difficulty: "Medium" },
          { id: "os-t6", title: "Round Robin & Priority", duration: "1h", difficulty: "Medium" },
          { id: "os-t7", title: "Multilevel Queue", duration: "45m", difficulty: "Hard" },
          { id: "os-t8", title: "Thread & Concurrency", duration: "1h", difficulty: "Medium" }
        ]
      }
    ]
  },
  {
    id: "dbms",
    name: "Database Management Systems",
    description: "Normalization, transactions, ACID properties, indexing, and ER diagrams.",
    chapters: [
      {
        id: "dbms-chap-1",
        title: "ER Modeling & Relational Model",
        topics: [
          { id: "dbms-t1", title: "Entities & Attributes", duration: "45m", difficulty: "Easy" },
          { id: "dbms-t2", title: "Keys in DBMS", duration: "30m", difficulty: "Easy" },
          { id: "dbms-t3", title: "Relational Algebra", duration: "1h", difficulty: "Medium" }
        ]
      },
      {
        id: "dbms-chap-2",
        title: "Normalization",
        topics: [
          { id: "dbms-t4", title: "Functional Dependencies", duration: "45m", difficulty: "Medium" },
          { id: "dbms-t5", title: "1NF, 2NF, 3NF", duration: "1h 30m", difficulty: "Hard" },
          { id: "dbms-t6", title: "BCNF", duration: "1h", difficulty: "Hard" },
          { id: "dbms-t7", title: "Lossless Decomposition", duration: "45m", difficulty: "Medium" }
        ]
      }
    ]
  },
  {
    id: "oop",
    name: "Object-Oriented Programming",
    description: "Learn abstraction, encapsulation, inheritance, polymorphism, and solid principles.",
    chapters: [
      {
        id: "oop-chap-1",
        title: "OOP Basics & Pillars",
        topics: [
          { id: "oop-t1", title: "Classes & Objects", duration: "45m", difficulty: "Easy" },
          { id: "oop-t2", title: "Encapsulation", duration: "30m", difficulty: "Easy" },
          { id: "oop-t3", title: "Abstraction", duration: "45m", difficulty: "Medium" }
        ]
      },
      {
        id: "oop-chap-2",
        title: "Inheritance & Polymorphism",
        topics: [
          { id: "oop-t4", title: "Single & Multilevel Inheritance", duration: "1h", difficulty: "Medium" },
          { id: "oop-t5", title: "Virtual Functions & Runtime Polymorphism", duration: "1h 15m", difficulty: "Hard" },
          { id: "oop-t6", title: "Operator Overloading", duration: "45m", difficulty: "Medium" },
          { id: "oop-t7", title: "Interfaces & Abstract Classes", duration: "1h", difficulty: "Medium" }
        ]
      }
    ]
  },
  {
    id: "sql",
    name: "SQL",
    description: "Write complex joins, subqueries, CTEs, window functions, and optimize queries.",
    chapters: [
      {
        id: "sql-chap-1",
        title: "SQL Basics & Queries",
        topics: [
          { id: "sql-t1", title: "SELECT, WHERE, ORDER BY", duration: "30m", difficulty: "Easy" },
          { id: "sql-t2", title: "INSERT, UPDATE, DELETE", duration: "30m", difficulty: "Easy" },
          { id: "sql-t3", title: "Filtering & Sorting", duration: "45m", difficulty: "Easy" }
        ]
      },
      {
        id: "sql-chap-2",
        title: "Joins & Subqueries",
        topics: [
          { id: "sql-t4", title: "INNER, LEFT, RIGHT Joins", duration: "1h", difficulty: "Medium" },
          { id: "sql-t5", title: "Subqueries & EXISTS", duration: "1h", difficulty: "Medium" },
          { id: "sql-t6", title: "GROUP BY & HAVING", duration: "45m", difficulty: "Medium" },
          { id: "sql-t7", title: "Window Functions", duration: "1h 30m", difficulty: "Hard" }
        ]
      }
    ]
  },
  {
    id: "computer-fundamentals",
    name: "Computer Fundamentals",
    description: "Basic computer organization, binary math, gates, and digital logic concepts.",
    chapters: [
      {
        id: "cf-chap-1",
        title: "Number Systems & Digital Logic",
        topics: [
          { id: "cf-t1", title: "Binary Number System", duration: "45m", difficulty: "Easy" },
          { id: "cf-t2", title: "Octal & Hexadecimal", duration: "30m", difficulty: "Easy" },
          { id: "cf-t3", title: "Number System Conversions", duration: "45m", difficulty: "Medium" }
        ]
      },
      {
        id: "cf-chap-2",
        title: "Computer Organization",
        topics: [
          { id: "cf-t4", title: "CPU Architecture", duration: "1h", difficulty: "Medium" },
          { id: "cf-t5", title: "Memory Hierarchy", duration: "45m", difficulty: "Medium" },
          { id: "cf-t6", title: "I/O Systems", duration: "45m", difficulty: "Easy" }
        ]
      }
    ]
  }
];

const questions = [
  {
    title: "What is the primary function of the Physical Layer in the OSI model?",
    description: "The Physical Layer is the first layer of the OSI model. It deals with bit stream transmission over a physical medium such as cables, hubs, and network cards.",
    options: [
      "Transmission of raw bits over a physical link",
      "Routing of data packets",
      "Process-to-process communication",
      "Encryption of data"
    ],
    correctAnswer: "Transmission of raw bits over a physical link",
    explanation: "The Physical Layer is responsible for transmitting raw bit streams over a physical medium. It defines electrical, mechanical, and procedural specifications for the physical link.",
    difficulty: "Easy",
    subjectId: "cn",
    topicId: "cn-t1",
    companies: ["google", "microsoft"],
    tags: ["OSI Model", "Physical Layer"]
  },
  {
    title: "What is a kernel in an operating system?",
    description: "The kernel is the core component of an operating system that manages system resources and acts as a bridge between hardware and software.",
    options: [
      "A program that translates high-level code to assembly",
      "The central module of the OS that manages system resources and hardware communication",
      "A tool for disk partitioning",
      "A user interface for system configuration"
    ],
    correctAnswer: "The central module of the OS that manages system resources and hardware communication",
    explanation: "The kernel is the core part of an OS. It handles process management, memory management, device drivers, and system calls — essentially bridging hardware and user-space applications.",
    difficulty: "Easy",
    subjectId: "os",
    topicId: "os-t1",
    companies: ["amazon", "tcs"],
    tags: ["OS Basics", "Kernel"]
  },
  {
    title: "What defines a primary key in a relational database?",
    description: "A primary key is a special column (or set of columns) in a relational database table that uniquely identifies each row.",
    options: [
      "A key that can accept null values",
      "A unique identifier for each record in a table",
      "A key used to link two tables together",
      "An index for full-text search"
    ],
    correctAnswer: "A unique identifier for each record in a table",
    explanation: "A primary key uniquely identifies each record in a table. It cannot contain NULL values and must be unique across all rows.",
    difficulty: "Easy",
    subjectId: "dbms",
    topicId: "dbms-t1",
    companies: ["adobe", "infosys"],
    tags: ["DBMS Basics", "Keys"]
  },
  {
    title: "What is encapsulation in Object-Oriented Programming?",
    description: "Encapsulation is one of the four pillars of OOP. It refers to bundling data (attributes) and methods (functions) that operate on that data into a single unit, typically a class.",
    options: [
      "The ability of a class to derive from multiple parent classes",
      "The bundling of data and methods into a single unit, restricting direct access to some components",
      "The process of creating multiple functions with the same name but different parameters",
      "The concept of hiding all internal details of an object"
    ],
    correctAnswer: "The bundling of data and methods into a single unit, restricting direct access to some components",
    explanation: "Encapsulation wraps data and code together as a single unit (class) and restricts direct access to some components using access modifiers (private, protected, public).",
    difficulty: "Easy",
    subjectId: "oop",
    topicId: "oop-t2",
    companies: ["google", "oracle"],
    tags: ["OOP", "Encapsulation"]
  },
  {
    title: "What does the SQL SELECT statement do?",
    description: "SELECT is the most commonly used SQL statement. It queries data from one or more tables in a database.",
    options: [
      "Deletes records from a table",
      "Creates a new table in the database",
      "Retrieves data from one or more tables",
      "Modifies the structure of an existing table"
    ],
    correctAnswer: "Retrieves data from one or more tables",
    explanation: "The SELECT statement is used to retrieve data from database tables. It can be combined with WHERE, JOIN, GROUP BY, and other clauses to filter and aggregate results.",
    difficulty: "Easy",
    subjectId: "sql",
    topicId: "sql-t1",
    companies: ["tcs", "cognizant"],
    tags: ["SQL Basics", "SELECT"]
  },
  {
    title: "What is the decimal equivalent of the binary number 1010?",
    description: "To convert binary to decimal, multiply each bit by 2 raised to the power of its position (starting from 0) and sum the results. 1010 = 1x2^3 + 0x2^2 + 1x2^1 + 0x2^0 = 8 + 0 + 2 + 0 = 10.",
    options: [
      "8",
      "10",
      "12",
      "14"
    ],
    correctAnswer: "10",
    explanation: "1010 in binary = (1 × 2³) + (0 × 2²) + (1 × 2¹) + (0 × 2⁰) = 8 + 0 + 2 + 0 = 10 in decimal.",
    difficulty: "Easy",
    subjectId: "computer-fundamentals",
    topicId: "cf-t1",
    companies: ["wipro", "infosys"],
    tags: ["Binary", "Number Systems"]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kramik');
    console.log('Connected to MongoDB');

    for (const sub of subjects) {
      await Subject.findOneAndUpdate({ id: sub.id }, sub, { upsert: true, new: true });
      console.log(`  Seeded subject: ${sub.id}`);
    }
    console.log(`\n${subjects.length} subjects seeded.\n`);

    for (const q of questions) {
      await Question.findOneAndUpdate(
        { title: q.title, subjectId: q.subjectId },
        q,
        { upsert: true, new: true }
      );
      console.log(`  Seeded question for: ${q.subjectId}`);
    }
    console.log(`\n${questions.length} questions seeded.\n`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB. Done.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
