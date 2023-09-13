import axios, { AxiosError } from "axios";
import appToast from "../toast";
import { IPlanet } from "@src/components/common/interfaces/planet.interface";



async function getPlanets() {
  const URL = "https://findfalcone.geektrust.com/planets";
  let data: IPlanet[] | null = null;
  try {
    const response = await axios.get<IPlanet[]>(URL);
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

export { getPlanets };
