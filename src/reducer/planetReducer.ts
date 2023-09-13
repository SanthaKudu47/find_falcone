import { IPlanet } from "@src/components/common/interfaces/planet.interface";
import { initialPlanetState } from "@src/context/planetContext";
import {
  PlanetActionTypes,
  PlanetState,
} from "@src/context/types/planetStateTypes";

function isAlreadySelected(value: string, planets: (IPlanet | null)[]) {
  let isEntry = false;
  let foundMatch = false;
  for (let index = 0; index < planets.length; index++) {
    if (foundMatch) break;
    const element = planets[index];
    if (element) {
      if (element.name === value) {
        foundMatch = true;
        isEntry = true;
      }
    }
  }
  return isEntry;
}

function planetsReducer(
  state: PlanetState,
  action: {
    type: PlanetActionTypes;
    value: IPlanet[] | { name: string; destinationId: number } | null;
  }
) {
  switch (action.type) {
    case "initiate": {
      const newState: PlanetState = {
        ...state,
        defaultList: action.value as IPlanet[],
        availableList: action.value as IPlanet[],
        selected: initialPlanetState.selected,
        desCount: initialPlanetState.desCount,
        initiated: true,
      };

      return newState;
    }
    case "insert": {
      const parsedAction = action.value as {
        name: string;
        destinationId: number;
      };
      if (!isAlreadySelected(parsedAction.name, state.selected)) {
        const found = state.defaultList.find(
          (planet) => planet.name === parsedAction.name
        );

        if (found) {
          const newAvailableList = state.availableList.filter(
            (planet) => planet.name !== found.name
          );
          //get current value of destination id

          const newSelectedList = [...state.selected];
          if (state.selected[parsedAction.destinationId] !== null) {
            const selectedPlanet = state.selected[
              parsedAction.destinationId
            ] as IPlanet;

            newAvailableList.push(selectedPlanet);
          }

          newSelectedList[parsedAction.destinationId] = found;
          const newState: PlanetState = {
            ...state,
            availableList: newAvailableList,
            selected: newSelectedList,
          };
          return newState;
        }
        return state;
      }
      //no changes
      return state;
    }

    case "remove": {
      const parsedAction = action.value as {
        name: string;
        destinationId: number;
      };

      if (state.selected[parsedAction.destinationId] !== null) {
        const selectedPlanet = state.selected[
          parsedAction.destinationId
        ] as IPlanet;

        const newAvailableList: IPlanet[] = [...state.availableList];
        newAvailableList.push(selectedPlanet);
        const newSelectedList = [...state.selected];
        newSelectedList[parsedAction.destinationId] = null;
        const newState: PlanetState = {
          ...state,
          availableList: newAvailableList,
          selected: newSelectedList,
        };

        return newState;
      }

      return state;
    }

    case "reset":
      const newState: PlanetState = {
        ...state,
        availableList: state.defaultList,
        selected: initialPlanetState.selected,
        desCount: initialPlanetState.desCount,
        initiated: true,
      };
      return newState;
    default:
      return state;
  }
}

export { planetsReducer };
