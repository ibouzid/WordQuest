export const LetterState = {
  Correct: 0,
  Present: 1,
  Absent: 2,
} as const;

export type LetterState = (typeof LetterState)[keyof typeof LetterState];

export type GuessResult = {
  guess: string;
  feedback: LetterState[];
};

export interface GameState {
  gameId: string;

  attempts: number;

  guesses: GuessResult[];

  maxAttempts: number;

  isGameOver: boolean;

  difficulty: number;

  language: string;

  wordLength: number;

  secretWord?: string;

  isFromApi: boolean;

  timer: number;
}
