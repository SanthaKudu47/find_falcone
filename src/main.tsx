import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { dataLoader } from "./components/common/rootLayout/index.tsx";
import ErrorPage from "./components/common/errorPage/index.tsx";
import App from "./components/app/index.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FalconeResult from "./components/falconeResult/index.tsx";
import FalconeProblem from "./components/falconeProblem/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: dataLoader,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "find_falcone",
        element: <FalconeResult />,
      },
      {
        path: "problem",
        element: <FalconeProblem />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
