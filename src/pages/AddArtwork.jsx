import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";

const AddArtwork = () => {
  const { user, axios } = useAppContext();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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

    setLoading(true);
    try {
      const artworkData = {
        ...formData,
        userName: user?.displayName || "Anonymous",
        userEmail: user?.email,
      };

      const { data } = await axios.post("/api/artworks", artworkData);

      if (data.success) {
        toast.success("Artwork added successfully!");
        setFormData({
          image: "",
          title: "",
          category: "Painting",
          mediumTools: "",
          description: "",
          dimensions: "",
          price: "",
          visibility: "Public",
        });
      } else {
        toast.error(data.message || "Failed to add artwork");
      }
    } catch (error) {
      toast.error(error.message || "Error adding artwork");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-950 to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <div
          className={`rounded-lg shadow-xl p-8 transition-colors duration-300 ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h1
            className={`text-4xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Add Your Artwork
          </h1>
          <p className={`mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Share your creative masterpiece with the world
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image URL */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                required
              />
            </div>

            {/* Title */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Artwork Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Sunset Over Mountains"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                required
              />
            </div>

            {/* Category and Medium */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                >
                  <option value="Painting">Painting</option>
                  <option value="Sculpture">Sculpture</option>
                  <option value="Photography">Photography</option>
                  <option value="Digital Art">Digital Art</option>
                  <option value="Illustration">Illustration</option>
                  <option value="Mixed Media">Mixed Media</option>
                  <option value="Printmaking">Printmaking</option>
                  <option value="Ceramics">Ceramics</option>
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Medium/Tools *
                </label>
                <input
                  type="text"
                  name="mediumTools"
                  value={formData.mediumTools}
                  onChange={handleChange}
                  placeholder="e.g., Oil on Canvas"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about your artwork..."
                rows="5"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                required
              />
            </div>

            {/* Dimensions and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Dimensions (Optional)
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="e.g., 50x70 cm"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Price (Optional)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 5000"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  min="0"
                />
              </div>
            </div>

            {/* Visibility */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Visibility *
              </label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              >
                <option value="Public">Public (Visible to everyone)</option>
                <option value="Private">Private (Only for you)</option>
              </select>
            </div>

            {/* User Info - Read Only */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg transition-colors duration-300 ${
                isDark
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || "Anonymous"}
                  disabled
                  className={`w-full px-4 py-2 border rounded-lg cursor-not-allowed ${
                    isDark
                      ? "bg-gray-600 border-gray-500 text-gray-300"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className={`w-full px-4 py-2 border rounded-lg cursor-not-allowed ${
                    isDark
                      ? "bg-gray-600 border-gray-500 text-gray-300"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              {loading ? "Adding Artwork..." : "Add Artwork"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArtwork;
