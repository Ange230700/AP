import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppWrapper from "./AppWrapper";
import Home from "./pages/Home";
import AuthForms from "./pages/AuthForms";
import { ProductProvider } from "./contexts/ProductContext";
import { UserProvider } from "./contexts/UserContext";
import "./sass/index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    children: [
      {
        index: true,
        element: <AuthForms />,
      },
      // {
      //   path: "/authentication",
      //   element: <AuthForms />,
      // },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </UserProvider>
  </React.StrictMode>
);
