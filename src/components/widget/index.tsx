import { ShipsContext } from "@src/context/shipContext";
import Default from "./ships/Default";
import SpaceRocket from "./ships/SpaceRocket";
import SpaceShip from "./ships/SpaceShip";
import SpaceShuttle from "./ships/SpaceShuttle";
import SpacePod from "./ships/Spacepod";
import classes from "./widget.module.css";
import { useContext } from "react";

function getSpaceShip(name: string) {
  switch (name) {
    case "Space pod":
      return <SpacePod width={54} height={44} />;
    case "Space rocket":
      return <SpaceRocket width={47} height={77} />;

    case "Space shuttle":
      return <SpaceShuttle width={41} height={73} />;

    case "Space ship":
      return <SpaceShip width={52} height={75} />;

    default:
      return <Default width={47} height={77} />;
  }
}

function initialize(disposal: {
  pod: number;
  rocket: number;
  shuttle: number;
  ship: number;
}) {
  const data: {
    name: string;
    total_no: number;
  }[] = [];

  data.push({ name: "Space pod", total_no: disposal.pod });
  data.push({ name: "Space rocket", total_no: disposal.rocket });
  data.push({ name: "Space shuttle", total_no: disposal.shuttle });
  data.push({ name: "Space ship", total_no: disposal.ship });

  return data;
}

export default function Widget() {
  const shipsContext = useContext(ShipsContext);
  const data = initialize(shipsContext.disposal);

  return (
    <div className={classes.widget}>
      <div className={classes.widget__head}>Disposal</div>
      <div className={classes.widget__container}>
        {data.map((shipInfo, index) => {
          return (
            <div className={classes.widget__section} key={index}>
              <div className={classes.widget__image}>
                {getSpaceShip(shipInfo.name)}
              </div>
              <div className={classes.widget__text}>
                <h4> {shipInfo.name}</h4>
                <h4> x{shipInfo.total_no}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
