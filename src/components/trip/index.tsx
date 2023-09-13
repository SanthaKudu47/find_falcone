import { useContext } from "react";
import { selectPlanet } from "../common/planets";
import classes from "./trip.module.css";
import { ShipsContext } from "@src/context/shipContext";
import Default from "../widget/ships/Default";
import SpacePod from "../widget/ships/Spacepod";
import SpaceRocket from "../widget/ships/SpaceRocket";
import SpaceShip from "../widget/ships/SpaceShip";
import SpaceShuttle from "../widget/ships/SpaceShuttle";
import { IPlanet } from "../common/interfaces/planet.interface";

function selectShip(name: string | null) {
  switch (name) {
    case "pod":
      return <SpacePod height={60} width={60} enabled={true} />;

    case "rocket":
      return <SpaceRocket width={47} height={72} enabled={true} />;

    case "ship":
      return <SpaceShip width={52} height={75} enabled={true} />;

    case "shuttle":
      return <SpaceShuttle width={41} height={73} enabled={true} />;

    default:
      return <Default height={60} width={60} />;
  }
}

function duration(distance: number, speed: number) {
  return `${distance / speed}`;
}

function Trip({
  destinationIndex,
  planet,
}: {
  destinationIndex: number;
  planet: IPlanet | null;
}) {
  const { selected, details } = useContext(ShipsContext);
  const shipJsx = selectShip(selected[destinationIndex]);
  const planetJsx = selectPlanet(planet ? planet.name.toLowerCase() : "");
  const shipData = details.find(
    (ship) => ship.name === selected[destinationIndex]
  );

  return (
    <div className={classes.container}>
      <div className={classes.container__left}>
        {planetJsx}
        <h4>{planet?.name}</h4>
      </div>
      <div className={classes.container__middle}>
        <div>
          <svg
            width="35"
            height="35"
            viewBox="0 0 66 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.63264 0.202878L65.3574 32.2675L9.63264 63.8768L0.642643 47.6169C15.0795 34.9211 6.65801 21.5142 0.642644 16.3978L9.63264 0.202878Z"
              fill="#536F7A"
            />
            <path
              d="M32.7026 39.4218C28.5042 39.4218 25.1007 36.0731 25.1007 31.9423C25.1007 27.8114 28.5042 24.4627 32.7026 24.4627C36.9009 24.4627 40.3044 27.8114 40.3044 31.9423C40.3044 36.0731 36.9009 39.4218 32.7026 39.4218Z"
              fill="#FDFDFF"
            />
            <path
              d="M29.0795 26.3464C29.844 26.0949 30.6622 25.9586 31.5127 25.9586C35.7476 25.9586 39.1807 29.3365 39.1807 33.5032C39.1807 33.6056 39.1786 33.7076 39.1745 33.809C39.3506 33.2169 39.4451 32.5904 39.4451 31.9423C39.4451 28.2784 36.4263 25.3082 32.7026 25.3082C31.3691 25.3082 30.126 25.6891 29.0795 26.3464Z"
              fill="#536F7A"
            />
          </svg>
        </div>
        {planet && shipData && (
          <h4>{duration(planet.distance, shipData.speed)}</h4>
        )}
      </div>
      <div className={classes.container__right}>
        <>
          {shipJsx}
          <h4>{`Space ${selected[destinationIndex]}`}</h4>
        </>
      </div>
    </div>
  );
}

export default Trip;
