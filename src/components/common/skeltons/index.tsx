import classes from "./skelton.module.css";
function SkeltonOne() {
  return (
    <div className={classes.skeltonOne}>
      <div
        className={`${classes.skeltonOne__line} ${classes["skeltonOne__line--line1"]}`}
      ></div>
      <div
        className={`${classes.skeltonOne__line} ${classes["skeltonOne__line--line2"]}`}
      ></div>
      <div
        className={`${classes.skeltonOne__line} ${classes["skeltonOne__line--line3"]}`}
      ></div>
    </div>
  );
}

function SkeltonTwo() {
  return (
    <div className={classes.skeltonTwo}>
      <div className={classes.skeltonTwo__select}></div>
      <div className={classes.skeltonTwo__radio}>
        <div className={classes.skeltonTwo__radioButton}></div>
        <div className={classes.skeltonTwo__text}></div>
      </div>
      <div className={classes.skeltonTwo__radio}>
        <div className={classes.skeltonTwo__radioButton}></div>
        <div className={classes.skeltonTwo__text}></div>
      </div>
      <div className={classes.skeltonTwo__radio}>
        <div className={classes.skeltonTwo__radioButton}></div>
        <div className={classes.skeltonTwo__text}></div>
      </div>
      <div className={classes.skeltonTwo__radio}>
        <div className={classes.skeltonTwo__radioButton}></div>
        <div className={classes.skeltonTwo__text}></div>
      </div>
      <div className={classes.skeltonTwo__radio}>
        <div className={classes.skeltonTwo__radioButton}></div>
        <div className={classes.skeltonTwo__text}></div>
      </div>
    </div>
  );
}

export { SkeltonOne, SkeltonTwo };
