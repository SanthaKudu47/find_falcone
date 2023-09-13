import classes from "@src/components/Section1/section1.module.css";
import mainImage from "@assets/main_image_2.svg";
import Widget from "../widget";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "../common/arrowIcons";

export default function Section1() {
  const [isVisible, setVisible] = useState<boolean>(true);
  function closeHandler() {
    setVisible(!isVisible);
  }
  return (
    <div className={classes.section1}>
      <div className={classes.section1__widget}>
        <div className={classes.section1__widgetHandle}>
          <div
            className={`${classes.section1__widgetClose} ${
              isVisible
                ? classes[`section1__widgetClose--textLeft`]
                : classes[`section1__widgetClose--textRight`]
            }`}
            onClick={closeHandler}
          >
            {isVisible === true ? (
              <>
                <ArrowRight />
              </>
            ) : (
              <>
                <ArrowLeft />
                Disposal
              </>
            )}
          </div>
          {isVisible && <Widget />}
        </div>
      </div>
      <div className={classes.section1__imageBg}>
        <img
          src={mainImage}
          alt="main_img"
          className={classes.section1__image}
        />
      </div>
      <h1 className={classes.section1__title}>FINDING FALCONE</h1>
      <div
        className={`${classes.section1__imageBg} ${classes.section1__bg}`}
      ></div>
      <div className={classes.section1_square}></div>
    </div>
  );
}
