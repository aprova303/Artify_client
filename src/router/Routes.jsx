import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Home from "../components/Home";
import ArtsCard from "../pages/ArtsCard";
import Register from "../components/Register";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AddArtwork from "../pages/AddArtwork";
import MyGallery from "../pages/MyGallery";
import MyFavorites from "../pages/MyFavorites";
import ExploreArtworks from "../pages/ExploreArtworks";
import ArtworkDetails from "../pages/ArtworkDetails";
import PrivateRoute from "../components/PrivateRoute";

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
        Component: ArtsCard,
        loader: () => fetch("http://localhost:3000/arts"),
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: "/explore",
        Component: ExploreArtworks,
      },
      {
        path: "/artwork/:id",
        Component: ArtworkDetails,
      },
      {
        path: "/addArtwork",
        Component: () => (
          <PrivateRoute>
            <AddArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: "/myGallery",
        Component: () => (
          <PrivateRoute>
            <MyGallery />
          </PrivateRoute>
        ),
      },
      {
        path: "/myFavorites",
        Component: () => (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
