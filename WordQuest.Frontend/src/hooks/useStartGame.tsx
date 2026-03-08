import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { GameState } from '../Components/Game/types';
import { useNavigate } from 'react-router-dom';

interface StartParams {
  WordLength: number;
  Language: string;
  Difficulty: number;
}

const startGame = async (params: StartParams): Promise<GameState> => {
  const response = await fetch('http://localhost:5214/api/game/start', {
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
    }
  });
}
