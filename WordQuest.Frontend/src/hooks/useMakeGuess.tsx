import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { GameState } from '../Components/Game/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../constants';

interface GuessParams {
  GameId: string;
  Guess: string;
  PlayerId: string;
}

const makeGuess = async (params: GuessParams): Promise<GameState> => {
  const response = await fetch(`${API_URL}/guess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export function useMakeGuess() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (params: GuessParams) => makeGuess(params), 
    onSuccess: (updatedGameState) => {
      queryClient.setQueryData(['game', updatedGameState.gameId], updatedGameState);
      queryClient.setQueryData(['startGame'], updatedGameState);
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
