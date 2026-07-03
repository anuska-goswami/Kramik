export const interviewCategories = [
  {
    id: 'hr-interview',
    title: 'HR Interview Preparation',
    description: 'Master common HR questions, behavioral scenarios, and company culture fit.',
    progress: 45,
    estimatedTime: '2 hours',
    iconName: 'Users'
  },
  {
    id: 'technical-interview',
    title: 'Technical Interview Preparation',
    description: 'Topic-wise technical questions for OS, DBMS, Networks, OOP, and more.',
    progress: 30,
    estimatedTime: '5 hours',
    iconName: 'Terminal'
  },
  {
    id: 'behavioral-questions',
    title: 'Behavioral Interview Questions',
    description: 'Structure answers using the STAR method for situation-based questions.',
    progress: 10,
    estimatedTime: '1.5 hours',
    iconName: 'MessageSquare'
  },
  {
    id: 'resume-based',
    title: 'Resume-Based Interview Questions',
    description: 'Defend your projects, internships, skills, and extracurriculars.',
    progress: 60,
    estimatedTime: '1 hour',
    iconName: 'FileText'
  },
  {
    id: 'group-discussion',
    title: 'Group Discussion (GD)',
    description: 'Current affairs, abstract topics, case discussions, and GD etiquette.',
    progress: 0,
    estimatedTime: '2.5 hours',
    iconName: 'UsersRound'
  },
  {
    id: 'communication-skills',
    title: 'Communication Skills',
    description: 'Public speaking, active listening, clarity of thought, and articulation.',
    progress: 20,
    estimatedTime: '3 hours',
    iconName: 'Mic'
  },
  {
    id: 'situational-case',
    title: 'Situational & Case-Based',
    description: 'Tackle hypothetical business and technical scenarios effectively.',
    progress: 0,
    estimatedTime: '2 hours',
    iconName: 'Briefcase'
  },
  {
    id: 'mock-practice',
    title: 'Mock Interview Practice',
    description: 'Simulated interview environments with time pressure and feedback.',
    progress: 80,
    estimatedTime: '4 hours',
    iconName: 'Target'
  }
];

export const mockInterviewsData = [
  {
    id: 'hr-mock-1',
    title: 'HR Mock Interview',
    duration: '30m',
    questions: 10,
    difficulty: 'Medium'
  },
  {
    id: 'tech-mock-1',
    title: 'Technical Mock Interview',
    duration: '45m',
    questions: 15,
    difficulty: 'Hard'
  },
  {
    id: 'company-sim-1',
    title: 'Company-Specific Interview Simulation',
    duration: '60m',
    questions: 20,
    difficulty: 'Hard'
  },
  {
    id: 'comm-assessment-1',
    title: 'Communication Assessment',
    duration: '20m',
    questions: 5,
    difficulty: 'Easy'
  }
];

export const interviewExperiencesData = [
  {
    id: 'exp-1',
    company: 'Google',
    role: 'Software Engineer',
    year: '2023',
    difficulty: 'Hard',
    rounds: 4,
    summary: 'The interview focused heavily on System Design and advanced Data Structures like Graphs and Dynamic Programming. The Googlyness round was unique and tested cultural fit.',
  },
  {
    id: 'exp-2',
    company: 'Amazon',
    role: 'SDE 1',
    year: '2022',
    difficulty: 'Medium',
    rounds: 3,
    summary: 'Mostly centered around problem-solving (Leetcode Medium/Hard) and Amazon Leadership Principles. Make sure to frame your behavioral answers using STAR methodology.',
  },
  {
    id: 'exp-3',
    company: 'TCS',
    role: 'Ninja/Digital',
    year: '2023',
    difficulty: 'Easy',
    rounds: 2,
    summary: 'Standard aptitude followed by a technical/HR combined round. Basic questions on Java, OOP concepts, and SQL queries. Very friendly panel.',
  }
];

export const resourcesData = [
  { title: 'HR Interview Notes', type: 'PDF', time: '15 mins', iconName: 'FileText' },
  { title: 'Technical Interview Notes', type: 'Guide', time: '30 mins', iconName: 'Terminal' },
  { title: 'Resume Tips', type: 'Article', time: '10 mins', iconName: 'FileText' },
  { title: 'Communication Guides', type: 'Video', time: '20 mins', iconName: 'PlayCircle' },
  { title: 'Group Discussion PDFs', type: 'PDF', time: '25 mins', iconName: 'Users' },
  { title: 'Common HR Questions PDF', type: 'PDF', time: '15 mins', iconName: 'FileText' }
];
