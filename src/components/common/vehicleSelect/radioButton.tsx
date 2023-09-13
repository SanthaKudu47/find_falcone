import classes from "./radio.module.css";

function RadioButton({
  value,
  onChange,
  label,
  selected,
  destinationIndex,
  isDisabled,
}: {
  value: string;
  onChange: (v: string, n: number) => void;
  label: string;
  selected: string;
  destinationIndex: number;
  isDisabled: boolean;
}) {
  return (
    <div className={classes.radio__wrapper}>
      <label
        className={
          isDisabled
            ? `${classes.radio__label} ${classes.text__disabled}`
            : classes.radio__label
        }
        onClick={() => {
          if (!isDisabled) onChange(value, destinationIndex);
        }}
      >
        <div
          className={
            isDisabled
              ? `${classes.radio__custom} ${classes.disabled}`
              : classes.radio__custom
          }
        >
          {value === selected && (
            <div className={classes.radio__innerCircle}></div>
          )}
        </div>

        {label}
      </label>
    </div>
  );
}

export default RadioButton;
