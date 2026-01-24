import React from "react";
import { Link, NavLink } from "react-router";
import Login from "./Login";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { user, signOutUser } = useAppContext();
  const { isDark, toggleTheme } = useTheme();

  const handleSignOut = () => {
    signOutUser().then().catch();
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/explore">Explore Artworks</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/addArtwork">Add Artwork</NavLink>
          </li>
          <li>
            <NavLink to="/myGallery">My Gallery</NavLink>
          </li>
          <li>
            <NavLink to="/myFavorites">My Favorites</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div
      className={`navbar transition-colors duration-300 ${isDark ? "bg-gray-900 text-white shadow-lg shadow-gray-900" : "bg-white text-black shadow-md"}`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className={`btn btn-ghost lg:hidden ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className={`menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow ${isDark ? "bg-gray-800 text-white" : "bg-white text-black"}`}
          >
            {links}
          </ul>
        </div>
        {/* <img src="../assets/icons8-art-48.png" alt="Artify logo" className="w-8 h-8" /> */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <h3
            className={`text-xl font-bold ${isDark ? "text-white" : "text-black"}`}
          >
            ARTIFY
          </h3>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex mr-10">
        <ul
          className={`menu menu-horizontal px-1 ${isDark ? "text-gray-200" : "text-gray-700"}`}
        >
          {links}
        </ul>
      </div>
      <div className="navbar-end gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`btn btn-ghost btn-circle transition-colors duration-300 ${isDark ? "bg-gray-800 hover:bg-gray-700 text-yellow-400" : "bg-gray-100 hover:bg-gray-200 text-yellow-500"}`}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414zM5 17a1 1 0 100-2H4a1 1 0 100 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {user ? (
          <a
            onClick={handleSignOut}
            className={`btn transition-colors duration-300 ${isDark ? "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600" : "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600"}`}
          >
            Sign Out
          </a>
        ) : (
          <>
            <Link
              to="/register"
              className={`btn transition-colors duration-300 ${isDark ? "bg-green-600 hover:bg-green-700 text-white border-green-600" : "bg-green-600 hover:bg-green-700 text-white border-green-600"}`}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className={`btn transition-colors duration-300 ${isDark ? "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600" : "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600"}`}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
