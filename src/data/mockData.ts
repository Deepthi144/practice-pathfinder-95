export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
}

export interface Question {
  id: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'aptitude' | 'coding';
  company?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Test {
  id: string;
  title: string;
  company: string;
  duration: number; // minutes
  questionCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionIds: string[];
}

export interface TestResult {
  id: string;
  userId: string;
  testId: string;
  testTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number; // seconds
  date: string;
  answers: Record<string, number>;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  totalScore: number;
  testsCompleted: number;
  avgAccuracy: number;
}

export const mockUsers: User[] = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'student' },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', role: 'student' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: '4', name: 'Amit Kumar', email: 'amit@example.com', role: 'student' },
  { id: '5', name: 'Sneha Reddy', email: 'sneha@example.com', role: 'student' },
];

export const mockQuestions: Question[] = [
  {
    id: 'q1', topic: 'Quantitative Aptitude', difficulty: 'Easy', type: 'aptitude',
    question: 'If a train travels 360 km in 4 hours, what is its speed?',
    options: ['80 km/h', '90 km/h', '100 km/h', '70 km/h'],
    correctAnswer: 1, explanation: 'Speed = Distance/Time = 360/4 = 90 km/h',
  },
  {
    id: 'q2', topic: 'Logical Reasoning', difficulty: 'Easy', type: 'aptitude',
    question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correctAnswer: 1, explanation: 'Differences: 4,6,8,10,12. Next = 30+12 = 42',
  },
  {
    id: 'q3', topic: 'Verbal Ability', difficulty: 'Medium', type: 'aptitude',
    question: 'Choose the synonym of "Ephemeral":',
    options: ['Permanent', 'Transient', 'Eternal', 'Durable'],
    correctAnswer: 1, explanation: 'Ephemeral means lasting for a very short time, synonym is Transient.',
  },
  {
    id: 'q4', topic: 'Data Structures', difficulty: 'Medium', type: 'coding',
    question: 'What is the time complexity of searching in a balanced BST?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 1, explanation: 'Balanced BST has height log(n), so search is O(log n).',
  },
  {
    id: 'q5', topic: 'Algorithms', difficulty: 'Hard', type: 'coding',
    question: 'Which sorting algorithm has the best average-case time complexity?',
    options: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Selection Sort'],
    correctAnswer: 2, explanation: 'Quick Sort has average O(n log n) with small constants.',
  },
  {
    id: 'q6', topic: 'Quantitative Aptitude', difficulty: 'Medium', type: 'aptitude', company: 'TCS',
    question: 'A man can row 6 km/h in still water. If the river flows at 2 km/h, how long to go 16 km upstream?',
    options: ['2 hours', '3 hours', '4 hours', '5 hours'],
    correctAnswer: 2, explanation: 'Upstream speed = 6-2 = 4 km/h. Time = 16/4 = 4 hours.',
  },
  {
    id: 'q7', topic: 'Data Structures', difficulty: 'Easy', type: 'coding', company: 'Infosys',
    question: 'Which data structure uses FIFO ordering?',
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    correctAnswer: 1, explanation: 'Queue follows First In First Out (FIFO) principle.',
  },
  {
    id: 'q8', topic: 'Logical Reasoning', difficulty: 'Hard', type: 'aptitude', company: 'Amazon',
    question: 'If all Bloops are Razzles and all Razzles are Lazzles, are all Bloops definitely Lazzles?',
    options: ['Yes', 'No', 'Cannot be determined', 'Only some'],
    correctAnswer: 0, explanation: 'By transitive property: Bloops → Razzles → Lazzles.',
  },
  {
    id: 'q9', topic: 'Algorithms', difficulty: 'Medium', type: 'coding', company: 'Amazon',
    question: 'What is the space complexity of Merge Sort?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2, explanation: 'Merge Sort requires O(n) auxiliary space for merging.',
  },
  {
    id: 'q10', topic: 'Quantitative Aptitude', difficulty: 'Easy', type: 'aptitude', company: 'TCS',
    question: 'What is 15% of 200?',
    options: ['25', '30', '35', '40'],
    correctAnswer: 1, explanation: '15/100 × 200 = 30.',
  },
  {
    id: 'q11', topic: 'Data Structures', difficulty: 'Hard', type: 'coding',
    question: 'What is the worst-case time complexity of inserting into a hash table?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2, explanation: 'Worst case all keys hash to same bucket: O(n).',
  },
  {
    id: 'q12', topic: 'Verbal Ability', difficulty: 'Easy', type: 'aptitude',
    question: 'Choose the antonym of "Benevolent":',
    options: ['Kind', 'Malevolent', 'Generous', 'Gracious'],
    correctAnswer: 1, explanation: 'Benevolent means well-meaning, opposite is Malevolent.',
  },
];

export const mockTests: Test[] = [
  {
    id: 't1', title: 'TCS NQT Mock Test', company: 'TCS',
    duration: 10, questionCount: 5, difficulty: 'Easy',
    questionIds: ['q1', 'q2', 'q6', 'q10', 'q12'],
  },
  {
    id: 't2', title: 'Infosys Aptitude Test', company: 'Infosys',
    duration: 15, questionCount: 5, difficulty: 'Medium',
    questionIds: ['q3', 'q4', 'q6', 'q7', 'q9'],
  },
  {
    id: 't3', title: 'Amazon Coding Challenge', company: 'Amazon',
    duration: 20, questionCount: 5, difficulty: 'Hard',
    questionIds: ['q5', 'q8', 'q9', 'q11', 'q4'],
  },
];

export const mockResults: TestResult[] = [
  {
    id: 'r1', userId: '1', testId: 't1', testTitle: 'TCS NQT Mock Test',
    score: 80, totalQuestions: 5, correctAnswers: 4, timeTaken: 420, date: '2024-03-15', answers: {},
  },
  {
    id: 'r2', userId: '1', testId: 't2', testTitle: 'Infosys Aptitude Test',
    score: 60, totalQuestions: 5, correctAnswers: 3, timeTaken: 780, date: '2024-03-18', answers: {},
  },
  {
    id: 'r3', userId: '1', testId: 't3', testTitle: 'Amazon Coding Challenge',
    score: 40, totalQuestions: 5, correctAnswers: 2, timeTaken: 1100, date: '2024-03-20', answers: {},
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: '4', name: 'Amit Kumar', totalScore: 920, testsCompleted: 12, avgAccuracy: 88 },
  { rank: 2, userId: '5', name: 'Sneha Reddy', totalScore: 870, testsCompleted: 11, avgAccuracy: 85 },
  { rank: 3, userId: '1', name: 'Rahul Sharma', totalScore: 780, testsCompleted: 10, avgAccuracy: 78 },
  { rank: 4, userId: '2', name: 'Priya Patel', totalScore: 720, testsCompleted: 9, avgAccuracy: 75 },
  { rank: 5, userId: '6', name: 'Vikram Singh', totalScore: 680, testsCompleted: 8, avgAccuracy: 72 },
  { rank: 6, userId: '7', name: 'Ananya Desai', totalScore: 650, testsCompleted: 10, avgAccuracy: 68 },
  { rank: 7, userId: '8', name: 'Karthik Nair', totalScore: 600, testsCompleted: 7, avgAccuracy: 65 },
  { rank: 8, userId: '9', name: 'Meera Joshi', totalScore: 550, testsCompleted: 8, avgAccuracy: 62 },
];

export const performanceData = [
  { month: 'Jan', score: 55, tests: 2 },
  { month: 'Feb', score: 62, tests: 3 },
  { month: 'Mar', score: 70, tests: 4 },
  { month: 'Apr', score: 68, tests: 3 },
  { month: 'May', score: 78, tests: 5 },
  { month: 'Jun', score: 85, tests: 4 },
];

export const topicPerformance = [
  { topic: 'Quantitative', score: 82, total: 100 },
  { topic: 'Logical', score: 75, total: 100 },
  { topic: 'Verbal', score: 68, total: 100 },
  { topic: 'Data Structures', score: 70, total: 100 },
  { topic: 'Algorithms', score: 60, total: 100 },
];
