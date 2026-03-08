
import { memo } from 'react';
import GameTile from '../GameTile/GameTile'
import { LetterState } from '../types';
import classes from './GameRow.module.scss';

export default memo(function EmptyRow({wordLength}: {wordLength: number}) {
  return (
   <div className={classes.row}>
        {Array(wordLength).fill("").map((_, index) => (
           <GameTile index={index} key={index} letter="" tileStatus={LetterState.Absent} />
        ))}
    </div>
  )
})
