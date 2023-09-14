import classes from "./footer.module.css";

function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.footer__inner}>
        <div className={classes.footer__line}></div>
        <h4 className={classes.footer__text}>
          © 2023 find-falcone.onrender.com. All rights reserved.
        </h4>
      </div>
    </div>
  );
}

export default Footer;
