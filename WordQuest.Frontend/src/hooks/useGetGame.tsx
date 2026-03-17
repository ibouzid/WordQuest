import { useQuery } from '@tanstack/react-query';
import type { GameState } from '../Components/Game/types';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { ENDPOINTS } from '../constants';



const getGame = async (gameId: string, navigate: NavigateFunction): Promise<GameState> => {
  
  const response = await fetch(`${ENDPOINTS.GET_GAME}/${gameId}`, {
    method: 'GET',
  });
  if (!response.ok) {navigate('/')}
  return response.json();
};

export function useGetGame(gameId: string) {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ['game', gameId],
    queryFn: () => getGame(gameId, navigate),
  });
}
