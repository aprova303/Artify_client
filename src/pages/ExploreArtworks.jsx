import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const ExploreArtworks = () => {
  const { axios } = useAppContext();
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isDark } = useTheme();
  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/artworks?visibility=Public");
      if (data.success) {
        setArtworks(data.data || []);
        setFilteredArtworks(data.data || []);
      } else {
        toast.error("Failed to load artworks");
      }
    } catch (error) {
      console.error("Error fetching artworks:", error);
      toast.error("Failed to load artworks");
      setArtworks([]);
      setFilteredArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterArtworks(term, selectedCategory);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterArtworks(searchTerm, category);
  };

  const filterArtworks = (term, category) => {
    let filtered = artworks;

    // Filter by search term (title or artist name)
    if (term.trim()) {
      filtered = filtered.filter(
        (art) =>
          art.title?.toLowerCase().includes(term.toLowerCase()) ||
          art.artistName?.toLowerCase().includes(term.toLowerCase()),
      );
    }

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((art) => art.category === category);
    }

    setFilteredArtworks(filtered);
  };

  const categories = [
    "All",
    "Painting",
    "Sculpture",
    "Photography",
    "Digital Art",
    "Illustration",
    "Mixed Media",
    "Printmaking",
    "Ceramics",
  ];

  if (loading) {
    return (
      <div
        // className="flex items-center justify-center min-h-screen"
        className={`min-h-screen py-12 px-4 transition-colors duration-300 ${
          isDark
            ? "bg-gradient-to-br from-gray-950 to-gray-900"
            : "bg-gradient-to-br from-blue-50 to-indigo-100"
        }`}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading artworks...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      // className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4"
      className={`min-h-screen py-12 px-4 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-950 to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1
            //  className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            className={`text-4xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Explore Artworks
          </h1>
          <p className={`mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Discover amazing artworks from talented artists
          </p>
        </div>

        {/* Search Bar */}
        <div
          className={` ${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-6 mb-8`}
        >
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by title or artist name..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className={`w-full px-4 py-3 border border-gray-300 ${isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition`}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                // className={`px-4 py-2 rounded-full font-medium transition ${
                //   selectedCategory === category
                //     ? "bg-indigo-600 text-white"
                //     : {`bg-gray-200 ${isDark ? "bg-gray-700" : ""} text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600`
                // }`}
                // Use this ONLY if you aren't using Tailwind's built-in dark mode support
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : isDark
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-gray-600 dark:text-gray-400">
          Found {filteredArtworks.length} artwork
          {filteredArtworks.length !== 1 ? "s" : ""}
        </div>

        {/* Artworks Grid */}
        {filteredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map((art) => (
              <div
                key={art._id}
                className={` ${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden h-64 ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
                  <img
                    src={art.image || "https://via.placeholder.com/400x300"}
                    alt={art.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                  <div className={`absolute top-3 right-3  ${isDark ? "bg-gray-800 text-indigo-400" : "bg-white text-indigo-600"} rounded-full px-3 py-1 text-xs font-semibold `}>
                   {/* <span className={` ${isDark ? "bg-indigo-900 text-indigo-300" : "bg-indigo-200 text-indigo-700"}  px-4 py-1 rounded-full text-sm font-semibold`}> */}
                    {art.category}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className={`text-lg font-bold ${isDark ? "text-white" : " text-gray-800"} mb-2 truncate`}>
                    {art.title}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-3`}>
                    by {art.userName}
                  </p>
                  <p className={`text-gray-700 font-semibold ${isDark ? "text-gray-300" : "text-black"} text-sm mb-4 line-clamp-2`}>
                    {art.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">❤️</span>
                      <span className="text-sm font-semibold text-gray-700">
                        {art.likesCount || 0}
                      </span>
                    </div>
                    <Link
                      to={`/artwork-details/${art._id}`}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No artworks found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreArtworks;
