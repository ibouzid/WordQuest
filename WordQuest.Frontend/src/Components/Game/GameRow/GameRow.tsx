import classes from './GameRow.module.scss';
import GameTile from '../GameTile/GameTile';
import type { LetterState } from '../types';
import { memo } from 'react';

type GameRowProps = {
  guess: string;
  feedback: LetterState[];
  animate?: boolean;
};

export default memo(function GameRow({ guess, feedback, animate }: GameRowProps) {
  return (
    <div className={classes.row}>
      {guess.split("").map((letter, index) => (
        <GameTile
          key={index}
          letter={letter}
          tileStatus={feedback[index]}
          index={index}
          animate={animate}
        />
      ))}
    </div>
  );
})
