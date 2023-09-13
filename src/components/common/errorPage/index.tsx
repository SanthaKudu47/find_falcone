import { useRouteError } from "react-router-dom";

interface ErrorObjectInterface {
  data: string;
  error: {
    columnNumber: number;
    fileName: string;
    lineNumber: number;
    message: string;
    stack: string;
  };
  internal: Boolean;
  status: number;
  statusText: string;
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorObjectInterface;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText}</i>
      </p>
    </div>
  );
}
