import { IPlanet } from "@src/components/common/interfaces/planet.interface";

export type PlanetState = {
  selected: (IPlanet | null)[];
  defaultList: IPlanet[];
  availableList: IPlanet[];
  desCount: number;
  initiated: boolean;
}

export type PlanetActionTypes = "insert" | "remove" | "reset" | "initiate";
