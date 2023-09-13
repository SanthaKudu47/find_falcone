import { ApiKeyState } from "@src/context/types/apiKeyStateType";

function apiKeyReducer(
  state: ApiKeyState,
  action: {
    type: string;
    value: string;
  }
) {
  switch (action.type) {
    case "add":
      const newState = { ...state };
      newState.date = new Date();
      newState.key = action.value;
      return newState;

    default:
      return state;
  }
}

export { apiKeyReducer };
