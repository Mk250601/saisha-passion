export type Difficulty = "Easy" | "Medium" | "Challenge";

export interface StudentProfile {
  name: string;
  level: string;
  cadence: string;
  currentWeek: number;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  goal: string;
  platformLink?: string;
}

export interface MagicalQuestion {
  id: string;
  title: string;
  methods: string[];
  lesson: string;
}

export interface CurriculumWeek {
  week: number;
  month: string;
  level: string;
  title: string;
  focus: string;
  concepts: string[];
  why: string[];
  realWorld: string[];
  visual: string;
  problems: Problem[];
  magicalQuestions: MagicalQuestion[];
  project: {
    id: string;
    title: string;
    brief: string;
  };
  homework: {
    id: string;
    practice: string[];
    challenge: string;
  };
  resources: {
    notes: string;
    videos: string[];
    practice: string[];
    articles: string[];
  };
}

export interface ProgressState {
  learnedConcepts: string[];
  solvedProblems: string[];
  completedHomework: string[];
  completedProjects: string[];
}
