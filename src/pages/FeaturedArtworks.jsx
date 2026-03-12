import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "../context/ThemeContext";

const FeaturedArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    fetchFeaturedArtworks();
  }, []);

  const fetchFeaturedArtworks = async () => {
    try {
      setLoading(true);
      const API_BASE_URL = import.meta.env.VITE_API_URL || "https://artify-project.vercel.app";
      const response = await fetch(
        `${API_BASE_URL}/api/artworks/featured`,
      );
      const data = await response.json();

      if (response.ok) {
        setArtworks(data);
      } else {
        toast.error("Failed to load featured artworks");
      }
    } catch (error) {
      console.error("Error fetching featured artworks:", error);
      toast.error("Error loading featured artworks");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-500">
          Loading featured artworks...
        </div>
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-500">No artworks available yet</div>
      </div>
    );
  }

  return (
    <section className={`py-12 px-4 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
        <Fade direction="down" triggerOnce>
          <div className="text-center mb-12">
            <h2
              className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}
            >
              Featured Artworks
            </h2>
            <p
              className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              Discover the most recent stunning artworks from our talented
              artists
            </p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
            <Fade
              key={artwork._id}
              direction="up"
              delay={index * 100}
              triggerOnce
            >
              <div
                className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden`}
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gray-200 h-56">
                  <img
                    src={artwork.image || "https://via.placeholder.com/300x300"}
                    alt={artwork.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                    {artwork.title}
                  </h3>

                  {/* Artist Name */}
                  <p className="text-sm text-gray-600 mb-3">
                    by{" "}
                    <span className="font-semibold text-gray-800">
                      {artwork.userName}
                    </span>
                  </p>

                  {/* Category */}
                  <div className="mb-4">
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {artwork.category}
                    </span>
                  </div>

                  {/* Description Preview */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {artwork.description}
                  </p>

                  {/* Price (if available) */}
                  {artwork.price > 0 && (
                    <div className="mb-4 text-lg font-bold text-indigo-600">
                      ${artwork.price.toLocaleString()}
                    </div>
                  )}

                  {/* View Details Button */}
                  <Link
                    to={`/artwork-details/${artwork._id}`}
                    className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtworks;
