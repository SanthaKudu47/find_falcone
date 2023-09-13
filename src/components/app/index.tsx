import Container from "../common/container";
import DropDown from "../common/dropdown";
import { planetType } from "../common/dropdown/planets";
import ItemData from "../common/interfaces/item.interface";
import classes from "./app.module.css";
import { PlanetsContext } from "@src/context/planetContext";
import { IPlanet } from "../common/interfaces/planet.interface";
import VehicleSelect from "../common/vehicleSelect";
import Trip from "../trip";
import FindFalcone from "../findFalcone";
import { useContext } from "react";
import { SkeltonTwo } from "../common/skeltons";
import { useEffect } from "react";

function parseData(
  data: IPlanet[],
  converter: (item: any) => ItemData
): ItemData[] {
  return data.map((value) => converter(value));
}

function planetConverter(from: planetType): ItemData {
  return { value: from.name, info: from.distance.toString() };
}

// function vehicleConverter(from: vehicleType): ItemData {
//   return { value: from.name, info: from.speed.toString() };
// }

function App() {
  const { availableList, selected, desCount } = useContext(PlanetsContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <div className={classes.section}>
        <h4 className={classes.section__title}>
          Select planets you want to search in
        </h4>
        <div className={classes.section__destinationContainer}>
          {availableList && availableList.length > 0 ? (
            <>
              {Array.from("1".repeat(desCount)).map((v, index) => (
                <div key={`${v}_${index}`}>
                  <DropDown
                    data={parseData(availableList, planetConverter)}
                    title={`Destination ${index + 1}`}
                    staticId={index + 1}
                    selectedValue={selected[index]?.name}
                  />
                  {selected[index] !== null && (
                    <div className={classes.section__vehicleSelectContainer}>
                      <VehicleSelect destinationIndex={index} />
                    </div>
                  )}
                  {selected[index] !== null && (
                    <div>
                      <Trip destinationIndex={index} planet={selected[index]} />
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <>
              {Array.from("1".repeat(desCount)).map((v, index) => (
                <SkeltonTwo key={`${v}_${index}`} />
              ))}
            </>
          )}
        </div>
        <FindFalcone selectedPlanets={selected} />
      </div>
    </Container>
  );
}

export default App;
