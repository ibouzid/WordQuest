import { memo } from 'react';
import classes from './Keyboard.module.scss';

export default memo(function Key({letter, status, onClick}: {letter: string, status: "used" | "unused", onClick: () => void}) {
    const getColor = () => {
        switch (status) {
            case "used":
                return classes.used;
            case "unused":
                return classes.unused;
            default:
                return "";
        }
    }
    const getSpecialClass = () => {
        if (letter === "Backspace") return classes.backSpace;
        if (letter === "Enter") return classes.enter;
        return "";
    }
  return (
    <div onClick={onClick} className={`${classes.key} ${getColor()} ${getSpecialClass()}`}>{letter}</div>
  )
})
