import { createContext } from "react";
import React from "react";
import { IPlanet } from "@src/components/common/interfaces/planet.interface";
import { PlanetActionTypes, PlanetState } from "./types/planetStateTypes";

const initialPlanetState: PlanetState = {
  selected: [null, null, null, null],
  defaultList: [],
  availableList: [],
  desCount: 0,
  initiated:false,

};
initialPlanetState.desCount = initialPlanetState.selected.length;
const PlanetsContext = createContext(initialPlanetState);
const PlanetsContextDispatch = createContext<React.Dispatch<{
  type: PlanetActionTypes;
  value: IPlanet[] | { name: string; destinationId: number }|null;
}> | null>(null);
export { PlanetsContext, initialPlanetState, PlanetsContextDispatch };
