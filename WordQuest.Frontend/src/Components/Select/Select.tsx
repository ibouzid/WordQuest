import classes from "./Select.module.scss";

type SelectProps = {
  options: string[];
  value: string;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

export default function Select({
  options,
  value,
  isOpen,
  label,
  onToggle,
  onSelect,
}: SelectProps) {
  return (
    <div className={classes.select}>
      <label className={classes.label}>{label}</label>
      <button onClick={onToggle} className={classes.trigger}>
        {value}
      </button>

      <div
        className={`${classes.list} ${isOpen ? classes.open : ""}`}
      >
        {options.map((option) => (
          <button
            key={option}
            className={classes.option}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}