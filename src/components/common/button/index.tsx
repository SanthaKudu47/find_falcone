import classes from "./button.module.css";
function AppButton({
  text = "Start Again",
  onClick,
}: {
  text?: string;
  onClick?: () => void;
}) {
  return (
    <div className={classes.button} onClick={onClick}>
      {text}
    </div>
  );
}

export default AppButton;
