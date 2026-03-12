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
export interface PlayerState {
  playerId: string;
  connectionId: string;
  guesses: GuessResult[];
  solved: boolean;
  solvedAt?: Date;
  score: number;
}

export interface GameState {
  gameId: string;

  attempts: number;

  players: PlayerState[];

  maxAttempts: number;

  isGameOver: boolean;

  difficulty: number;

  language: string;

  wordLength: number;

  secretWord?: string;

  isFromApi: boolean;

  timer: number;

  mode: "SinglePlayer" | "Multiplayer";
}
