import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import { AppContextProvider } from "../context/AppContext";

const HomeLayout = () => {
  return (
    <AppContextProvider>
      <div>
        <nav className="w-11/12 mx-auto my-3">
          <Navbar></Navbar>
          {/* <Banner></Banner> */}
        </nav>
        <main className="w-11/12 mx-auto my-3">
          <Outlet></Outlet>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </AppContextProvider>
  );
};

export default HomeLayout;
