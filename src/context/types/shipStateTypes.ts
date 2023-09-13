export type ShipValueType1 = ShipData[];
export type ShipValueType2 = { name: ShipType; destination: number };
export type ShipValueType3 = { destination: number };

export type ShipData = {
  name: string;
  total_no: number;
  max_distance: number;
  speed: number;
};
export type ShipStateAction = {
  type: ActionType;
  value: ShipValueType1 | ShipValueType2 | ShipValueType3|null;
};

export type ShipStateType = {
  details: ShipData[];
  disposal: {
    pod: number;
    rocket: number;
    shuttle: number;
    ship: number;
  };
  disposalInitial: {
    pod: number;
    rocket: number;
    shuttle: number;
    ship: number;
  };
  selected: (string | null)[];
  errors: string[];
  initiated: boolean;
};
export type ShipType = "pod" | "rocket" | "shuttle" | "ship";
export type ActionType =
  | "update"
  | "remove"
  | "reset"
  | "initiate"
  | "reset_destination";
