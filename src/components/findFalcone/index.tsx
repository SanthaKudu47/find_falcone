import { ShipsContext } from "@src/context/shipContext";
import { IPlanet } from "../common/interfaces/planet.interface";
import classes from "./findFalcone.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AppButton from "../common/button";
import { durationCalc } from "@src/utils/calcDuration";



export default function FindFalcone({
  selectedPlanets,
}: {
  selectedPlanets: (IPlanet | null)[];
}) {
  const { selected, details } = useContext(ShipsContext);

  return (
    <div className={classes.container}>
      <h4 className={classes.container__time}>
        Time taken:{durationCalc(selectedPlanets, selected, details)}
      </h4>
      <Link to={"find_falcone"} className={classes.container__link}>
        <AppButton text="Find Falcone" />
      </Link>
    </div>
  );
}
