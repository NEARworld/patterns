import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Home from "../home";

const SquaresBasic = lazy(() => import("../patterns/squares/basic"));
const Parabola = lazy(() => import("../math/parabola/parabola"));

export const routes = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: "blinking_squares",
        element: <SquaresBasic />,
      },
      {
        path: "parabola",
        element: <Parabola />,
      },
    ],
  },
]);
