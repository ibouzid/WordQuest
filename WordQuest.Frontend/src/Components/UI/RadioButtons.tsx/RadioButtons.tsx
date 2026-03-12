import classes from "./RadioButtons.module.scss";

export default function RadioButtons<T extends string | number>({
  inputName,
  options,
  onChange,
}: {
  inputName: string;
  options: T[];
  onChange: (value: T) => void;
}) {
  return (
    <div className={classes.radioButtons}>
      {options.map((option) => (
        <label className={classes.label} key={option}>
          <input
            defaultChecked={option === options[0]}
            className={classes.input}
            type="radio"
            name={inputName}
            value={option}
            onChange={() => onChange(option)}
          />{" "}
          {option}
        </label>
      ))}
    </div>
  );
}