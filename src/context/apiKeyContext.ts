import { createContext } from "react";
import { ApiKeyState } from "./types/apiKeyStateType";

export const initialApiKeyState: ApiKeyState = {
  key: "",
  date: new Date(),
};
const ApiKeyContext = createContext(initialApiKeyState);
export { ApiKeyContext };
