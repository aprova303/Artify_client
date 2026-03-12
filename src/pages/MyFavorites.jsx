import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const MyFavorites = () => {
  const { user, axios } = useAppContext();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const {isDark} = useTheme();

  useEffect(() => {
    if (user?.uid) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      console.log("Fetching favorites for user:", user?.uid);
      const { data } = await axios.get(`/api/favorites/user/${user?.uid}`);
      console.log("Favorites API Response:", data);

      if (data.success) {
        const favoritesData = data.data || [];
        console.log("Favorites Data:", favoritesData);

        if (favoritesData.length === 0) {
          console.log("No favorites found");
          setFavorites([]);
        } else {
          // Check if we need to fetch full artwork details
          if (!favoritesData[0].title) {
            // Only IDs or minimal data were returned, fetch full artwork details
            console.log("Fetching full artwork details...");
            const fullArtworks = await Promise.all(
              favoritesData.map((fav) => {
                const artworkId = fav.artworkId || fav.artwork?._id || fav._id;
                console.log("Fetching artwork with ID:", artworkId);
                return axios
                  .get(`/api/artworks/${artworkId}`)
                  .then((res) => {
                    console.log("Fetched artwork:", res.data);
                    return res.data.data || res.data;
                  })
                  .catch((err) => {
                    console.error(
                      "Error fetching artwork details:",
                      artworkId,
                      err,
                    );
                    return null;
                  });
              }),
            );
            const validArtworks = fullArtworks.filter((art) => art !== null);
            console.log("Valid Artworks:", validArtworks);
            setFavorites(validArtworks);
          } else {
            // Full artwork data was already returned
            console.log("Full artwork data already returned");
            setFavorites(favoritesData);
          }
        }
      } else {
        console.error("API Error:", data.error || "Unknown error");
        toast.error(data.error || "Failed to load favorites");
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error(error.response?.data?.error || "Failed to load favorites");
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromFavorites = async (artworkId) => {
    try {
      const { data } = await axios.post(`/api/favorites/${artworkId}`, {
        userId: user?.uid,
      });
      if (data.success) {
        toast.success("Removed from favorites!");
        setFavorites(favorites.filter((fav) => fav._id !== artworkId));
      } else {
        toast.error(data.error || "Failed to remove from favorites");
      }
    } catch (error) {
      toast.error(error.message || "Error removing from favorites");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen py-12 px-4 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-950 to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading your favorites...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-950 to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1  className={`text-4xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
            My Favorites
          </h1>
          <p className={`text-gray-600 ${isDark ? "text-gray-400" : "text-gray-600"} text-lg`}>
            Your collection of favorite artworks
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((artwork) => (
              <div
                key={artwork._id}
                className={` ${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden h-64 ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
                  <img
                    src={artwork.image || "https://via.placeholder.com/400x300"}
                    alt={artwork.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                  <div className={`absolute top-3 right-3 ${isDark ? "bg-gray-800" : "bg-white"} rounded-full px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400`}>
                    {artwork.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2 truncate`}>
                    {artwork.title}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-3`}>
                    by {artwork.userName}
                  </p>
                  <p className={`text-gray-700 ${isDark ? "dark:text-gray-300" : "text-gray-600"} text-sm mb-4 line-clamp-2`}>
                    {artwork.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">❤️</span>
                      <span className="text-sm font-semibold text-gray-700">
                        {artwork.likesCount || 0}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/artwork-details/${artwork._id}`}
                      className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition text-center font-semibold"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleRemoveFromFavorites(artwork._id)}
                      className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition font-semibold"
                    >
                       Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className={`text-2xl font-bold text-gray-900 ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
              No favorites yet
            </h3>
            <p className={`text-gray-600 ${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}>
              Start by favoriting your favorite artworks
            </p>
            <Link
              to="/explore"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition inline-block"
            >
              Explore Artworks
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
