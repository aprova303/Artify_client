import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ArtworkDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, axios } = useAppContext();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [totalArtworks, setTotalArtworks] = useState(0);

  useEffect(() => {
    fetchArtworkDetails();
  }, [id]);

  useEffect(() => {
    if (user && artwork) {
      checkLikeStatus();
      checkFavoriteStatus();
    }
  }, [user, artwork]);

  useEffect(() => {
    if (artwork) {
      fetchArtistArtworkCount();
    }
  }, [artwork]);

  const fetchArtworkDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/artworks/${id}`);
      if (data.success) {
        setArtwork(data.data);
      } else {
        toast.error("Artwork not found");
        navigate("/explore");
      }
    } catch (error) {
      console.error("Error fetching artwork:", error);
      toast.error("Failed to load artwork details");
      navigate("/explore");
    } finally {
      setLoading(false);
    }
  };

  const fetchArtistArtworkCount = async () => {
    try {
      const { data } = await axios.get(
        `/api/users/${artwork.userEmail}/artworks/count`,
      );
      if (data.success) {
        setTotalArtworks(data.count);
      }
    } catch (error) {
      console.error("Error fetching artist artwork count:", error);
    }
  };

  const checkLikeStatus = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get(`/api/artworks/${id}/liked/${user.uid}`);
      if (data.success) {
        setIsLiked(data.isLiked);
      }
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const checkFavoriteStatus = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get(`/api/favorites/${id}/${user.uid}`);
      if (data.success) {
        setIsFavorited(data.isFavorited);
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like artworks");
      navigate("/login");
      return;
    }

    setLikeLoading(true);
    try {
      const { data } = await axios.post(`/api/artworks/${id}/like`, {
        userId: user.uid,
      });
      if (data.success) {
        setIsLiked(data.isLiked);
        setArtwork((prev) => ({
          ...prev,
          likesCount: data.likes,
        }));
        toast.success(data.isLiked ? "Liked!" : "Removed like");
      }
    } catch (error) {
      toast.error("Error updating like status");
      console.error(error);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleAddToFavorites = async () => {
    if (!user) {
      toast.error("Please login to add to favorites");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post(`/api/favorites/${id}`, {
        userId: user.uid,
      });
      if (data.success) {
        setIsFavorited(data.isFavorited);
        toast.success(
          data.isFavorited ? "Added to favorites!" : "Removed from favorites",
        );
      }
    } catch (error) {
      toast.error("Error updating favorites");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading artwork details...
          </p>
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Artwork not found
          </h2>
          <button
            onClick={() => navigate("/explore")}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/explore")}
          className="mb-6 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white rounded-lg transition shadow"
        >
          ← Back to Explore
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div>
              <img
                src={artwork.image || "https://via.placeholder.com/500x500"}
                alt={artwork.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Details Section */}
            <div>
              {/* Title and Category */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {artwork.title}
                  </h1>
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-4 py-1 rounded-full text-sm font-semibold">
                    {artwork.category}
                  </span>
                </div>
              </div>

              {/* Artist Info */}
              <div className="border-b dark:border-gray-700 pb-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Artist
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg font-medium mb-1">
                  {artwork.userName}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {artwork.userEmail}
                </p>
              </div>

              {/* Artwork Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Medium
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {artwork.mediumTools}
                  </p>
                </div>
                {artwork.dimensions && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Dimensions
                    </p>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {artwork.dimensions}
                    </p>
                  </div>
                )}
                {artwork.price && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Price
                    </p>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      ${artwork.price}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              {/* Like and Favorite Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleLike}
                  disabled={likeLoading}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    isLiked
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span>{isLiked ? "❤️" : "🤍"}</span>
                  <span>Like ({artwork.likesCount || 0})</span>
                </button>

                <button
                  onClick={handleAddToFavorites}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    isFavorited
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <span>{isFavorited ? "⭐" : "☆"}</span>
                  <span>{isFavorited ? "Favorited" : "Add to Favorites"}</span>
                </button>
              </div>

              {/* Login Prompt */}
              {!user && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    <a href="/login" className="font-semibold underline">
                      Login
                    </a>{" "}
                    to like and favorite artworks
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Artist Section */}
          <div className="border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              About the Artist
            </h2>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {artwork.userName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Email: {artwork.userEmail}
              </p>
              <div className="text-gray-700 dark:text-gray-300">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Artworks:{" "}
                  <span className="font-semibold">{totalArtworks}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Joined:{" "}
                  <span className="font-semibold">
                    {new Date(artwork.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
