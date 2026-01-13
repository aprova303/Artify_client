import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Home from "../components/Home";
import ArtsCard from "../pages/ArtsCard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "/arts/:id",
        Component: <ArtsCard></ArtsCard>,
        loader: () => fetch("http://localhost:3000/arts"),
      },
    ],
  },
]);

export default router;
