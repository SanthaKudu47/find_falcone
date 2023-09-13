import axios, { AxiosError } from "axios";
import appToast from "../toast";

type DataType = {
  token: string;
  planet_names: string[];
  vehicle_names: string[];
};

export type ResponseType = {
  status: string;
  planet_name?: string;
  error?: string;
};

async function getResults(data: DataType | null) {
  const URL = "https://findfalcone.geektrust.com/find";
  let res:ResponseType|null=null;
  try {
    const response = await axios.post(URL, JSON.stringify(data), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    res = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      appToast(err.message, "error");
    } else {
      appToast("Unknown Error!", "error");
    }
  }

  return res;
}

export { getResults };
