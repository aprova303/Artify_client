import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ExploreArtworks = () => {
  const { axios } = useAppContext();
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading artworks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Artworks
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing artworks from talented artists
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by title or artist name..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-gray-600">
          Found {filteredArtworks.length} artwork
          {filteredArtworks.length !== 1 ? "s" : ""}
        </div>

        {/* Artworks Grid */}
        {filteredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map((art) => (
              <div
                key={art._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-64 bg-gray-200">
                  <img
                    src={art.imageUrl || "https://via.placeholder.com/400x300"}
                    alt={art.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-semibold text-indigo-600">
                    {art.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                    {art.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    by {art.artistName}
                  </p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {art.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">❤️</span>
                      <span className="text-sm font-semibold text-gray-700">
                        {art.likes || 0}
                      </span>
                    </div>
                    <Link
                      to={`/artwork/${art._id}`}
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
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No artworks found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreArtworks;
