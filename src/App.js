import React from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

const App = () => {
  return (
    <main>
      <RouterProvider router={routes} />
      <Toaster />
    </main>
  );
};

export default App;
