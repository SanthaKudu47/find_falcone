import { useCallback, useEffect, useReducer } from "react";
import Header from "@src/components/header";
import Section1 from "@src/components/section1";
import {
  ShipsContext,
  ShipsContextDispatch,
  shipStateInitial,
} from "@src/context/shipContext";
import { shipReducer } from "@src/reducer/shipReducer";
import { Outlet, useLoaderData } from "react-router-dom";
import { getVehicles } from "@src/utils/network/getVehicles";
import { ShipData, ShipType } from "@src/context/types/shipStateTypes";
import { getApiKey } from "@src/utils/network/getApiKey";
import { getPlanets } from "@src/utils/network/getPlanets";
import { IPlanet } from "../interfaces/planet.interface";
import { planetsReducer } from "@src/reducer/planetReducer";
import {
  PlanetsContext,
  PlanetsContextDispatch,
  initialPlanetState,
} from "@src/context/planetContext";
import { apiKeyReducer } from "@src/reducer/apiKeyReducer";
import { ApiKeyContext, initialApiKeyState } from "@src/context/apiKeyContext";
import Footer from "../footer";

export async function dataLoader() {
  const apiKey = await getApiKey();
  const ships = await getVehicles();
  const response = await getPlanets();
  if (apiKey && ships && response) {
    return { token: apiKey.token, ships: ships, planets: response };
  } else {
    return { token: null, ships: null, planets: null };
  }
}

export default function Root() {
  const data = useLoaderData() as {
    token: string | null;
    ships: ShipData[] | null;
    planets: IPlanet[] | null;
  };
  const [ships, dispatchShipActions] = useReducer(
    shipReducer,
    shipStateInitial
  );

  const [planetSelection, dispatchPlanetsActions] = useReducer(
    planetsReducer,
    initialPlanetState
  );

  const [apiKeyState, dispatchKeyActions] = useReducer(
    apiKeyReducer,
    initialApiKeyState
  );

  const loadApiKeyData = useCallback(async () => {
    if (data.token) {
      dispatchKeyActions({ type: "add", value: data.token });
    }
  }, []);

  const loadPlanetData = useCallback(async () => {
    if (data.planets) {
      dispatchPlanetsActions({ type: "initiate", value: data.planets });
    }
  }, []);

  const loadVehicleData = useCallback(async () => {
    if (data.ships) {
      const info = data.ships.map((ship) => {
        return {
          name: ship.name.slice(6) as ShipType,
          total_no: ship.total_no,
          max_distance: ship.max_distance,
          speed: ship.speed,
        };
      });
      dispatchShipActions({ type: "initiate", value: info });
    }
  }, []);

  useEffect(() => {
    console.log("loading....");
    loadApiKeyData();
    loadVehicleData();
    loadPlanetData();
  }, [loadVehicleData, loadVehicleData, loadApiKeyData]);
  return (
    <>
      <ShipsContext.Provider value={ships}>
        <ShipsContextDispatch.Provider value={dispatchShipActions}>
          <PlanetsContext.Provider value={planetSelection}>
            <PlanetsContextDispatch.Provider value={dispatchPlanetsActions}>
              <ApiKeyContext.Provider value={apiKeyState}>
                <Header />
                <Section1 />
                <Outlet />
                <Footer />
              </ApiKeyContext.Provider>
            </PlanetsContextDispatch.Provider>
          </PlanetsContext.Provider>
        </ShipsContextDispatch.Provider>
      </ShipsContext.Provider>
    </>
  );
}
