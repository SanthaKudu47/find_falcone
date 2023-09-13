import planetsAndVehicles from "@assets/planets-vehicles.jpg";
import { useRef } from "react";
import classes from "./problem.module.css";

function FalconeProblem() {
  const divRef = useRef(null);

  function imageLeadHandler() {
    if (divRef.current) {
      const element = divRef.current as HTMLDivElement;
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div ref={divRef} className={classes.container}>
      <h4 className={classes.container__title}>Problem</h4>
      <p className={classes.container__text}>
        Our coding challenges are set in the planet of Lengaburu. After the
        recent Falicornian war, King Shan has exiled Queen Al Falcone for 15
        years.
      </p>
      <p className={classes.container__text}>
        However, if he finds her before the 15 years are up, she has to go into
        exile for another 15 years! King Shan has received intelligence that Al
        Falcone is hiding in one of six neighbouring planets. In this problem
        you need to build a UI through which King Shan can choose the planets to
        search, and the vehicles to use in Finding Falcone. See more details on
        planets & vehicles.
      </p>
      <img
        src={planetsAndVehicles}
        onLoad={imageLeadHandler}
        alt="problem_img"
        className={classes.container__image}
      />
    </div>
  );
}

export default FalconeProblem;
