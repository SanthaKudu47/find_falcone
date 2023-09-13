import axios, { AxiosError } from "axios";
import appToast from "../toast";

async function getApiKey() {
  const URL = "https://findfalcone.geektrust.com/token";
  let data: {token:string}|null
   = null;
  try {
    const response = await axios.post< {token:string}|null>(
      URL,
      {},
      {
        headers: {
            'Accept': 'application/json'
          }
      }
    );
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

export { getApiKey };
