import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { GameState } from '../Components/Game/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ENDPOINTS } from '../constants';

interface GameEndRequest {
  GameId: string;
}

const endGame = async (GameEndRequest: GameEndRequest): Promise<GameState> => {
  const response = await fetch(`${ENDPOINTS.END_GAME}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(GameEndRequest),
  });
  if (!response.ok) throw new Error('Failed to end game');
  return response.json();
};

export function useEndGame() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (gameId: string) => endGame({ GameId: gameId }),
    onSuccess: (newGame) => {
      queryClient.setQueryData(['game', newGame.gameId], newGame);
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
