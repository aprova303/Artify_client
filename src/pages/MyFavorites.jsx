import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyFavorites = () => {
  const { user, axios } = useAppContext();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/favorites/user/${user?.uid}`);
      if (data.success) {
        setFavorites(data.data || []);
      } else {
        toast.error("Failed to load favorites");
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error("Failed to load favorites");
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Favorites
          </h1>
          <p className="text-gray-600 text-lg">
            Your collection of favorite artworks
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((artwork) => (
              <div
                key={artwork._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-64 bg-gray-200">
                  <img
                    src={artwork.image || "https://via.placeholder.com/400x300"}
                    alt={artwork.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-semibold text-indigo-600">
                    {artwork.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    by {artwork.userName}
                  </p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
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
                      ❌ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-6">
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
