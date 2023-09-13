import axios, { AxiosError } from "axios";
import appToast from "../toast";
import { ShipData } from "@src/context/types/shipStateTypes";

async function getVehicles() {
  const URL = "https://findfalcone.geektrust.com/vehicles";
  let data: ShipData[] | null = null;
  try {
    const response = await axios.get<ShipData[]>(URL);
    data = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      appToast(err.message, "error");
    } else {
      appToast("Unknown Error!", "error");
    }
  }

  return data;
}

export { getVehicles };
