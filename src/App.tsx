import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { Suspense } from "react";

function App() {
  return (
    <Suspense>
      <RouterProvider router={routes} />
    </Suspense>
  );
}
export default App;
