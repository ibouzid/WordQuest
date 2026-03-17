import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { GameState } from '../Components/Game/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ENDPOINTS } from '../constants';

interface StartParams {
  WordLength: number;
  Language: string;
  Difficulty: number;
  GuessAttempts: number;
  Timer: number;
  Mode: "SinglePlayer" | "Multiplayer";
  PlayerId: string;
  GameId?: string;
}

const startGame = async (params: StartParams): Promise<GameState> => {
  const response = await fetch(`${ENDPOINTS.START_GAME}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!response.ok) throw new Error('Failed to start game');
  return response.json();
};

export function useStartGame() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (params: StartParams) => startGame(params),
    onSuccess: (newGame) => {
      queryClient.setQueryData(['game', newGame.gameId], newGame);
      navigate(`/game/${newGame.gameId}`);
    },
    onError: (error: Error) => {
        navigate("/");
        toast.error(`Game failed: ${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          pauseOnHover: true,
          draggable: true,
        });
      },
  });
}
