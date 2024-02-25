import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppWrapper from "./AppWrapper";
import Home from "./pages/Home";
import AuthForms from "./pages/AuthForms";
import { ProductProvider } from "./contexts/ProductContext";
import "./sass/index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/authentication",
        element: <AuthForms />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  </React.StrictMode>
);
