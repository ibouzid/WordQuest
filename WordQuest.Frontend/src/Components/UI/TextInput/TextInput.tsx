import classes from "./TextInput.module.scss";

export default function TextInput({
  placeholder,
  value,
  onChange,
  label,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
}) {
  return (
    <div>
      {label && <p className={classes.label}>{label}</p>}
      <input
        className={classes.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
