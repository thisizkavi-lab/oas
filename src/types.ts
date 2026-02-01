// Core type definitions for OAS App

// User configuration set during onboarding
export interface UserConfig {
  keyboardLayout: 'jp-mac' | 'us' | 'custom';
  shortcutLevel: 'beginner' | 'intermediate' | 'advanced';
  languages: string[];
  frameworks: string[];
  sourceType: 'course' | 'paper' | 'repo' | 'custom';
  blockSize: 'tiny' | 'medium' | 'full';
  practiceStrictness: 'strict' | 'lenient';
  notesPreference: 'none' | 'inline' | 'after-only';
  onboardingCompleted: boolean;
}

// A training topic (main headline)
export interface TrainingTopic {
  id: string;
  title: string;
  description?: string;
  blocks: CodeBlock[];
  createdAt: string;
  updatedAt: string;
}

// A single code block for practice
export interface CodeBlock {
  id: string;
  title: string;
  sourceReference?: string;
  code: string;           // The shadow/ground truth code
  language: string;
  framework?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  notes?: string;         // Unlocked after practice
  order: number;
}

// Practice session tracking
export interface PracticeSession {
  id: string;
  blockId: string;
  topicId: string;
  startedAt: string;
  completedAt?: string;
  keystrokes: KeystrokeEvent[];
  accuracy: number;
  completionTime: number;
  errorsCount: number;
  hesitationPoints: number[];  // Character positions where user paused
  completed: boolean;
}

export interface KeystrokeEvent {
  key: string;
  timestamp: number;
  correct: boolean;
  position: number;
}

// Practice mode settings
export interface PracticeMode {
  shadowVisible: boolean;    // false = memory mode
  strictMode: boolean;       // true = exact match required
}

// Default values
export const DEFAULT_USER_CONFIG: UserConfig = {
  keyboardLayout: 'jp-mac',
  shortcutLevel: 'beginner',
  languages: ['python'],
  frameworks: [],
  sourceType: 'course',
  blockSize: 'medium',
  practiceStrictness: 'lenient',
  notesPreference: 'after-only',
  onboardingCompleted: false,
};

export const DEFAULT_PRACTICE_MODE: PracticeMode = {
  shadowVisible: true,
  strictMode: false,
};
