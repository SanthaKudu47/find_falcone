import { ShipsContext, ShipsContextDispatch } from "@src/context/shipContext";
import RadioButton from "./radioButton";
import { useState, useContext, useEffect } from "react";
import { ShipType, ShipValueType2 } from "@src/context/types/shipStateTypes";
import classes from "./select.module.css";

function isDisabled(remaining: number, selected: string | null, ship: string) {
  return remaining === 0 && selected !== ship;
}

function VehicleSelect({ destinationIndex }: { destinationIndex: number }) {
  const { disposal, selected } = useContext(ShipsContext);
  const dispatch = useContext(ShipsContextDispatch);
  const keys = Object.keys(disposal);
  const [select, setSelect] = useState<string>("");
  function onChange(value: string, destinationIndex: number) {
    setSelect(value);
    if (dispatch)
      dispatch({
        type: "update",
        value: {
          name: value as ShipType,
          destination: destinationIndex,
        } as ShipValueType2,
      });
  }

  useEffect(() => {
    const selectedShip = selected[destinationIndex];
    if (selectedShip) setSelect(selectedShip);
  }, []);

  return (
    <div className={classes.container}>
      {keys.map((key, index) => (
        <RadioButton
          key={index}
          label={`Space ${key} - x${disposal[key as ShipType]}`}
          value={key}
          onChange={onChange}
          selected={select}
          destinationIndex={destinationIndex}
          isDisabled={isDisabled(
            disposal[key as ShipType],
            selected[destinationIndex],
            key
          )}
        />
      ))}
    </div>
  );
}

export default VehicleSelect;
