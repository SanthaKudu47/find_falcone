import classes from "./header.module.css";
import logoImage from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import menuImage from "@assets/menu_icon.svg";
import { useState } from "react";
export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();
  function clickHandler() {
    setOpen(!isOpen);
  }

  function linkHandler() {
    setOpen(false);
  }

  function redirect() {
    if (location && location.pathname === "/") {
      window.open("https://www.geektrust.com", "_blank");
    }
  }
  return (
    <>
      <div className={classes.header}>
        <div className={classes.header__content}>
          <div className={classes.header__logo}>
            <Link to={"/"}>
              <img src={logoImage} alt="logo_img" width={39} height={52} />
            </Link>
          </div>
          <h4 className={classes.header__title}>FINDING FALCONE</h4>
          <div className={classes.header__nav}>
            <ul className={classes.header__navList}>
              <Link to={"/problem"} className={classes.header__navItem}>
                <li>Problem</li>
              </Link>

              <a
                href="https://www.geektrust.com"
                className={classes.header__navItem}
                target="_blank"
                rel="noopener noreferrer"
                onClick={redirect}
              >
                <li>Geek Trust Home</li>
              </a>
            </ul>
          </div>
          <div className={classes.header__mobileNav}>
            <img src={menuImage} alt="menu_icon" onClick={clickHandler} />
            {isOpen && (
              <div className={classes["header__mobileDrawer"]}>
                <ul>
                  <Link
                    to={"/test"}
                    className={classes.header__navItem}
                    onClick={linkHandler}
                  >
                    <li>Home</li>
                  </Link>
                  <Link
                    to={"/problem"}
                    className={classes.header__navItem}
                    onClick={linkHandler}
                  >
                    <li>Problem</li>
                  </Link>

                  <a
                    href="https://www.geektrust.com"
                    className={classes.header__navItem}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={linkHandler}
                  >
                    <li>Geek Trust Home</li>
                  </a>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
