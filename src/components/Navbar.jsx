import React from "react";
import { Link, NavLink } from "react-router";
import Login from "./Login";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, signOutUser } = useAppContext();

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
    <div className="navbar bg-base-100 shadow-sm justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <img src="../assets/icons8-art-48.png" alt="" />
        <a className="btn btn-ghost text-xl">ARTIFY</a>
      </div>
      <div className="navbar-center hidden lg:flex mr-10">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <a onClick={handleSignOut} className="btn">
            Sign Out
          </a>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      {/* <div className="login-btn flex gap-5"> */}
      {/* <img src={user} alt="" /> */}
      {/* <button onClick={Login} className="btn btn-primary">
        Login
      </button> */}
      {/* </div> */}
    </div>
  );
};

export default Navbar;
