import {
  PlanetsContext,
  PlanetsContextDispatch,
} from "@src/context/planetContext";
import AppButton from "../common/button";
import classes from "./falconeResult.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { ShipsContext, ShipsContextDispatch } from "@src/context/shipContext";
import { ApiKeyContext } from "@src/context/apiKeyContext";
import { ResponseType, getResults } from "@src/utils/network/getResult";
import { durationCalc } from "@src/utils/calcDuration";
import appToast from "@src/utils/toast";
import {SkeltonOne} from "../common/skeltons";
import { useNavigate } from "react-router-dom";

function FalconeResult() {
  const [res, setRes] = useState<ResponseType | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState(true);
  const planetContext = useContext(PlanetsContext);
  const shipContext = useContext(ShipsContext);
  const dispatchShipAction = useContext(ShipsContextDispatch);
  const dispatchPlanetActions = useContext(PlanetsContextDispatch);
  const { key } = useContext(ApiKeyContext);
  const navigate = useNavigate();

  const findFalcone = useCallback(async () => {
    const selectedShips = shipContext.selected;
    const selectedPlanets = planetContext.selected;

    const planets: string[] = [];
    const ships: string[] = [];

    selectedPlanets.filter((planet) => {
      if (planet) planets.push(planet.name);
    });
    selectedShips.filter((ship) => {
      if (ship !== null) ships.push(`Space ${ship}`);
    });

    if (planets.length !== 4 || ships.length !== 4) {
      setError("Need to Select 4 planets and ships");
      appToast("Need to Select 4 planets and ships", "error");
      setLoading(false);
      return;
    }

    const dataObject = {
      token: key,
      planet_names: planets,
      vehicle_names: ships,
    };

    const data = await getResults(dataObject);

    if (data) {
      if (data.status === "success") {
        setError("");
      } else {
        if (data.error) {
          setError(data.error);
        } else {
          setError("Failed on Finding Falcone.King Shan is not pleased.");
        }
      }
      setRes(data);
    } else {
      setRes(null);
    }
    setLoading(false);
  }, [planetContext.selected, shipContext.selected]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    findFalcone();
  }, [findFalcone]);

  function resetter() {
    if (dispatchPlanetActions)
      dispatchPlanetActions({ type: "reset", value: null });
    if (dispatchShipAction) dispatchShipAction({ type: "reset", value: null });
    navigate("/");
  }

  return (
    <div className={classes.container}>
      {isLoading ? (
        <>
          <SkeltonOne />
        </>
      ) : (
        <>
          {" "}
          <h4 className={classes.container__line1}>
            {error === ""
              ? "Success! Congratulations on Finding Falcone.King Shan is mighty pleased."
              : error}
          </h4>
          {error === "" && (
            <>
              <h3 className={classes.container__line2}>
                Time taken :{" "}
                {durationCalc(
                  planetContext.selected,
                  shipContext.selected,
                  shipContext.details
                )}
              </h3>
              <h3 className={classes.container__line2}>
                Planet found : {res?.planet_name}
              </h3>
            </>
          )}
        </>
      )}

      <AppButton onClick={resetter} />
    </div>
  );
}

export default FalconeResult;
