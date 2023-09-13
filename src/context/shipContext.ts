import { createContext } from "react";
import React from "react";
import { ShipStateAction, ShipStateType } from "./types/shipStateTypes";

const shipStateInitial: ShipStateType = {
  details: [],
  disposal: { pod: 0, rocket: 0, shuttle: 0, ship: 0 },
  disposalInitial: { pod: 0, rocket: 0, shuttle: 0, ship: 0 },
  selected: [null, null, null, null],
  errors: [],
  initiated: false,
};
const ShipsContext = createContext(shipStateInitial);
const ShipsContextDispatch =
  createContext<React.Dispatch<ShipStateAction> | null>(null);

export { shipStateInitial, ShipsContext, ShipsContextDispatch };
