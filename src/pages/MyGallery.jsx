import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const MyGallery = () => {
  const { user, axios } = useAppContext();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const {isDark} = useTheme();
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    category: "Painting",
    mediumTools: "",
    description: "",
    dimensions: "",
    price: "",
    visibility: "Public",
  });

  useEffect(() => {
    fetchUserArtworks();
  }, [user]);

  const fetchUserArtworks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/artworks/user/${user?.email}`);
      if (data.success) {
        setArtworks(data.data || []);
      } else {
        toast.error("Failed to load your artworks");
      }
    } catch (error) {
      console.error("Error fetching artworks:", error);
      toast.error("Failed to load your artworks");
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      image: artwork.image,
      title: artwork.title,
      category: artwork.category,
      mediumTools: artwork.mediumTools,
      description: artwork.description,
      dimensions: artwork.dimensions || "",
      price: artwork.price || "",
      visibility: artwork.visibility,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !formData.image ||
      !formData.title ||
      !formData.category ||
      !formData.mediumTools ||
      !formData.description
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const { data } = await axios.put(
        `/api/artworks/${editingArtwork._id}`,
        formData,
      );
      if (data.success) {
        toast.success("Artwork updated successfully!");
        setArtworks(
          artworks.map((art) =>
            art._id === editingArtwork._id ? { ...art, ...formData } : art,
          ),
        );
        setShowModal(false);
        setEditingArtwork(null);
      } else {
        toast.error(data.message || "Failed to update artwork");
      }
    } catch (error) {
      toast.error(error.message || "Error updating artwork");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this artwork? This action cannot be undone.",
      )
    ) {
      try {
        const { data } = await axios.delete(`/api/artworks/${id}`);
        if (data.success) {
          toast.success("Artwork deleted successfully!");
          setArtworks(artworks.filter((art) => art._id !== id));
        } else {
          toast.error(data.message || "Failed to delete artwork");
        }
      } catch (error) {
        toast.error(error.message || "Error deleting artwork");
        console.error(error);
      }
    }
  };

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
            Loading your gallery...
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
        <div className="mb-12">
          <h1 className={`text-4xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
            My Gallery
          </h1>
          <p className={`mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Manage your artworks
          </p>
        </div>

        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <div
                key={artwork._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {artwork.category} • {artwork.mediumTools}
                  </p>

                  {/* Visibility Badge */}
                  <div className="mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        artwork.visibility === "Public"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {artwork.visibility}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(artwork)}
                      className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition text-sm"
                    >
                       Update
                    </button>
                    <button
                      onClick={() => handleDelete(artwork._id)}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition text-sm"
                    >
                       Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            {/* <div className="text-6xl mb-4"></div> */}
            <h3 className={`font-bold text-2xl mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              No artworks yet
            </h3>
            <p className={`mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Start by adding your first artwork to your gallery
            </p>
            <a
              href="/addArtwork"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition inline-block"
            >
              + Add Artwork
            </a>
          </div>
        )}

        {/* Edit Modal */}
        {showModal && editingArtwork && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Update Artwork
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingArtwork(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-2xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                {/* Category and Medium */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                      required
                    >
                      <option value="Painting">Painting</option>
                      <option value="Sculpture">Sculpture</option>
                      <option value="Photography">Photography</option>
                      <option value="Digital Art">Digital Art</option>
                      <option value="Illustration">Illustration</option>
                      <option value="Mixed Media">Mixed Media</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Medium
                    </label>
                    <input
                      type="text"
                      name="mediumTools"
                      value={formData.mediumTools}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                    required
                  />
                </div>

                {/* Dimensions and Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Dimensions (Optional)
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price (Optional)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                      min="0"
                    />
                  </div>
                </div>

                {/* Visibility */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Visibility
                  </label>
                  <select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingArtwork(null);
                    }}
                    className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-semibold rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGallery;
