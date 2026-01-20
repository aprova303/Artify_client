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

  useEffect(() => {
    fetchArtworkDetails();
    checkLikeStatus();
    checkFavoriteStatus();
  }, [id, user]);

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
      // Dummy data for development
      setArtwork({
        _id: id,
        imageUrl:
          "https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=800",
        title: "Mountain Sunset",
        artistName: "John Artist",
        artistEmail: "john@example.com",
        category: "Painting",
        medium: "Oil on Canvas",
        description:
          "A breathtaking sunset captured over majestic mountain peaks. This artwork depicts the interplay of light and shadow as the sun dips below the horizon.",
        dimensions: "100x80 cm",
        price: 5000,
        likes: 24,
        createdAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const checkLikeStatus = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get(`/api/artworks/${id}/liked`);
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const checkFavoriteStatus = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get(`/api/favorites/${id}`);
      setIsFavorited(data.isFavorited);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like artworks");
      return;
    }

    setLikeLoading(true);
    try {
      const { data } = await axios.post(`/api/artworks/${id}/like`, {
        userId: user.uid,
      });
      if (data.success) {
        setIsLiked(!isLiked);
        setArtwork((prev) => ({
          ...prev,
          likes: data.likes,
        }));
        toast.success(isLiked ? "Removed like" : "Liked!");
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
      return;
    }

    try {
      const { data } = await axios.post(`/api/favorites/${id}`, {
        userId: user.uid,
        artwork: artwork,
      });
      if (data.success) {
        setIsFavorited(!isFavorited);
        toast.success(
          isFavorited ? "Removed from favorites" : "Added to favorites!",
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
          <p className="mt-4 text-gray-600">Loading artwork details...</p>
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/explore")}
          className="mb-6 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition shadow"
        >
          ← Back to Explore
        </button>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div>
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Details Section */}
            <div>
              {/* Title and Category */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">
                    {artwork.title}
                  </h1>
                  <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-semibold">
                    {artwork.category}
                  </span>
                </div>
              </div>

              {/* Artist Info */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Artist
                </h3>
                <p className="text-gray-700 text-lg font-medium mb-1">
                  {artwork.artistName}
                </p>
                <p className="text-gray-500 text-sm">{artwork.artistEmail}</p>
              </div>

              {/* Artwork Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Medium</p>
                  <p className="text-gray-900 font-semibold">
                    {artwork.medium}
                  </p>
                </div>
                {artwork.dimensions && (
                  <div>
                    <p className="text-gray-600 text-sm">Dimensions</p>
                    <p className="text-gray-900 font-semibold">
                      {artwork.dimensions}
                    </p>
                  </div>
                )}
                {artwork.price && (
                  <div>
                    <p className="text-gray-600 text-sm">Price</p>
                    <p className="text-gray-900 font-semibold">
                      ${artwork.price}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
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
                  <span>Like ({artwork.likes || 0})</span>
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
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-700 text-sm">
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
          <div className="border-t bg-gray-50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              About the Artist
            </h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {artwork.artistName}
              </h3>
              <p className="text-gray-600 mb-4">Email: {artwork.artistEmail}</p>
              <div className="text-gray-700">
                <p className="text-sm text-gray-600">
                  Total Artworks: <span className="font-semibold">12</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
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
