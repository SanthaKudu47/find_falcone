import { shipStateInitial } from "@src/context/shipContext";
import {
  ShipStateAction,
  ShipStateType,
  ShipType,
  ShipValueType1,
  ShipValueType2,
  ShipValueType3,
} from "@src/context/types/shipStateTypes";

function isAvailableInDisposal(shipName: ShipType, state: ShipStateType) {
  return state.disposal[shipName] > 0 ? true : false;
}

function isAvailableInSelection(shipName: ShipType, state: ShipStateType) {
  let isEntry = false;
  for (let index = 0; index < state.selected.length; index++) {
    const element = state.selected[index];
    if (element) {
      if (element === shipName) {
        isEntry = true;
        break;
      }
    }
  }
  return isEntry;
}

function shipReducer(ships: ShipStateType, action: ShipStateAction) {
  switch (action.type) {
    case "initiate": {
      const newState = { ...ships };
      newState.initiated = false;
      newState.errors = [];
      newState.selected = [null, null, null, null];
      const data = action.value as ShipValueType1;
      data.forEach((ship, index) => {
        newState.disposal[ship.name as ShipType] = ship.total_no;
      });

      newState.details = data;
      newState.disposalInitial = { ...newState.disposal };

      return newState;
    }

    case "update": {
      const value = action.value as ShipValueType2;

      const destinationIndex = value.destination;
      let newState: ShipStateType = { ...ships };
      if (
        isAvailableInDisposal(value.name, ships) &&
        destinationIndex !== undefined
      ) {
        const propertyName = value.name;
        const updatedDisposal = { ...ships.disposal };
        updatedDisposal[propertyName] = ships.disposal[propertyName] - 1;
        //check for current destination
        const currentShip = ships.selected[destinationIndex] as ShipType;

        if (currentShip) {
          updatedDisposal[currentShip] = updatedDisposal[currentShip] + 1;
        }
        //add to selected
        const updatedSelected = [...ships.selected];
        updatedSelected[destinationIndex] = propertyName;
        newState.disposal = updatedDisposal;
        newState.selected = updatedSelected;
      } else {
        newState.errors.push(
          `Not enough space ${value.name}s available in disposal!`
        );
      }

      return newState;
    }

    // case "remove": {
    //   const destinationIndex = action.value[0].destination;
    //   const newState = { ...ships };
    //   if (
    //     isAvailableInSelection(action.value[0].name, ships) &&
    //     destinationIndex !== undefined
    //   ) {
    //     const propertyName = action.value[0].name;

    //     if (ships.selected[destinationIndex] !== null) {
    //       const updatedDisposal = { ...ships.disposal };
    //       updatedDisposal[propertyName] = ships.disposal[propertyName] + 1;
    //       const updatedSelected = [...ships.selected];
    //       updatedSelected[destinationIndex] = null;
    //     }
    //   } else {
    //     newState.errors.push(
    //       `No any space ${action.value[0].name} in selection!`
    //     );
    //   }

    //   return newState;
    // }

    case "reset_destination": {
      const value = action.value as ShipValueType3;
      //get current selected ship
      const selectedShip = ships.selected[value.destination] as ShipType | null;
      if (selectedShip) {
        const updatedDisposal = { ...ships.disposal };
        const updatedSelectedShips = [...ships.selected];
        updatedDisposal[selectedShip] = updatedDisposal[selectedShip] + 1;
        updatedSelectedShips[value.destination] = null;
        return {
          ...ships,
          selected: updatedSelectedShips,
          disposal: updatedDisposal,
        };
      }
      return ships;
    }
    case "reset": {
      const newState = { ...ships };
      newState.initiated = true;
      newState.errors = shipStateInitial.errors;
      newState.selected = shipStateInitial.selected;
      newState.details = [...ships.details];
      newState.disposal = { ...ships.disposalInitial };
      newState.disposalInitial = { ...ships.disposalInitial };
      return newState;
    }

    default:
      return ships;
  }
}

export { shipReducer };
