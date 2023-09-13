import { IPlanet } from "@src/components/common/interfaces/planet.interface";
import { ShipData } from "@src/context/types/shipStateTypes";

function durationCalc(
    selectedPlanets: (IPlanet | null)[],
    selectedShips: (string | null)[],
    shipDetails: ShipData[]
  ) {
    let total = 0;
    for (let index = 0; index < selectedPlanets.length; index++) {
      const planet = selectedPlanets[index];
      const shipName = selectedShips[index];
      const shipData = shipDetails.find((ship) => ship.name === shipName);
      if (planet && shipName && shipData) {
        total += planet.distance / shipData.speed;
      }
    }
  
    return total;
  }

  export {durationCalc}