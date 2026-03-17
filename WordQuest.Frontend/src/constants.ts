const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5214";

export const ENDPOINTS = {
  START_GAME: `${BASE_URL}/api/game/start`,
  MAKE_GUESS: `${BASE_URL}/api/game/guess`,
  GET_GAME: `${BASE_URL}/api/game`,
  LEADERBOARD: `${BASE_URL}/api/leaderboard`,
  END_GAME: `${BASE_URL}/api/game/end`,
};