import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import { AppContextProvider } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import { Toaster } from "react-hot-toast";

const HomeLayout = () => {
  const { isDark } = useTheme();

  return (
    <AppContextProvider>
      <Toaster position="top-right" />
      <div className={isDark ? "dark" : ""}>
        <div
          className={`${isDark ? "bg-gray-950 text-white" : "bg-white text-black"} min-h-screen transition-colors duration-300`}
        >
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
      </div>
    </AppContextProvider>
  );
};

export default HomeLayout;
