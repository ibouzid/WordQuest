import classes from './Keyboard.module.scss';

export default function Key({letter, status, onClick}: {letter: string, status: "used" | "unused", onClick: () => void}) {
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
  return (
    <div onClick={onClick} className={`${classes.key} ${getColor()}`}>{letter}</div>
  )
}
