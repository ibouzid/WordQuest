import classes from "./GameDescription.module.scss";

export default function TileColorsSection() {
  return (
       <ul className={classes.legend}>
        <li>
          <span className={`${classes.tile} ${classes.correct}`}>A</span>
          Correct letter in the correct position
        </li>

        <li>
          <span className={`${classes.tile} ${classes.present}`}>A</span>
          Correct letter but in the wrong position
        </li>

        <li>
          <span className={`${classes.tile} ${classes.absent}`}>A</span>
          Letter is not in the word
        </li>
      </ul>
  )
}
