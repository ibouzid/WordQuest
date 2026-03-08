import classes from "./GameTile.module.scss";
import { LetterState } from "../types";
import { motion } from "framer-motion";
import { memo } from "react";

export type MotionTileProps = {
  letter: string;
  tileStatus?: LetterState;
  index: number;
  animate?: boolean;
};

export default memo(function GameTile({
  letter,
  tileStatus,
  index,
  animate,
}: MotionTileProps) {
  const delay = index * 0.3;
  const statusClassMap = {
    [LetterState.Correct]: classes.isCorrect,
    [LetterState.Present]: classes.isPresent,
    [LetterState.Absent]: classes.isAbsent,
  };
  return (
    <motion.div
      className={classes.tile}
      initial={{ rotateX: 0 }}
      animate={{ rotateX: animate ? 180 : 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className={`${classes.face} ${classes.front}`}>{letter}</div>
      <div
        className={`${classes.face} ${classes.back} ${tileStatus === LetterState.Correct || tileStatus === LetterState.Absent || tileStatus === LetterState.Present ? statusClassMap[tileStatus] : ""}`}
      >
        {letter}
      </div>
    </motion.div>
  );
})
