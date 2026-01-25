import React, { useState, useEffect } from "react";
import ArtsCard from "../pages/ArtsCard";
import { useLoaderData, useParams } from "react-router";
import Banner from "./Banner";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { isDark } = useTheme();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = useLoaderData();
  // const {artsId} = useParams()

  useEffect(() => {
    fetch("http://localhost:3000/arts")
      .then((res) => res.json())
      .then((data) => {
        setArts(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching arts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Banner />

      <Fade>
        <section
          className={`my-12 py-8 px-6 rounded-lg border-l-4 border-purple-500 transition-colors duration-300 ${
            isDark
              ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
              : "bg-gradient-to-r from-purple-50 to-pink-50 text-gray-900"
          }`}
        >
          <Zoom triggerOnce>
            <h2 className="text-3xl font-bold mb-2 text-purple-600 dark:text-purple-400 flex items-center gap-2">
               Top Artists of the Week
            </h2>
          </Zoom>
          <p
            className={`mb-4 leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Discover the most talented artists featured this week. Explore their
            unique styles and inspiring creations.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          {/* Placeholder for artist cards or list */}
        </section>
      </Fade>

      <Fade delay={200}>
        <section
          className={`my-12 py-8 px-6 rounded-lg border-l-4 border-blue-500 transition-colors duration-300 ${
            isDark
              ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
              : "bg-gradient-to-r from-blue-50 to-cyan-50 text-gray-900"
          }`}
        >
          <Zoom triggerOnce>
            <h2 className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400 flex items-center gap-2">
               Community Highlights
            </h2>
          </Zoom>
          <p
            className={`mb-4 leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Check out the latest buzz from our art community. From trending
            artworks to user spotlights and discussions.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
          {/* Placeholder for highlights */}
        </section>
      </Fade>
      <div className="w-full h-full bg-center flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {arts.map((art) => (
            <ArtsCard key={art._id} art={art}></ArtsCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
