import React, { useState, useEffect } from "react";
import ArtsCard from "../pages/ArtsCard";
import { useLoaderData, useParams } from "react-router";
import Banner from "./Banner";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import { useTheme } from "../context/ThemeContext";
import { useAppContext } from "../context/AppContext";

// Fake data for Top Artists of the Week
const topArtists = [
  {
    id: 1,
    name: "Elena Rodriguez",
    specialty: "Digital Art",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    artworks: 156,
    followers: "12.5K",
    featured:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Marcus Chen",
    specialty: "Oil Painting",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    artworks: 89,
    followers: "8.2K",
    featured:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Sophia Williams",
    specialty: "Watercolor",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    artworks: 234,
    followers: "15.8K",
    featured:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    name: "James Park",
    specialty: "Sculpture",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    artworks: 67,
    followers: "5.4K",
    featured:
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=300&h=200&fit=crop",
  },
];

const Home = () => {
  const { isDark } = useTheme();
  const { user, signOutUser } = useAppContext();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const data = useLoaderData();
  // const {artsId} = useParams()

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://artify-project.vercel.app";

  useEffect(() => {
    fetch(`${API_BASE_URL}/arts`)
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

  if (loading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      >
        Loading...
      </div>
    );

  const handleSignOut = () => {
    signOutUser().then().catch();
  };

  return (
    <div>
      <div className="relative">
        <Banner />
      </div>

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
            className={`mb-6 leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Discover the most talented artists featured this week. Explore their
            unique styles and inspiring creations.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-6"></div>

          {/* Top Artists Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topArtists.map((artist, index) => (
              <Fade key={artist.id} delay={index * 100} triggerOnce>
                <div
                  className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                    isDark ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  {/* Featured Artwork */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={artist.featured}
                      alt={`${artist.name}'s featured work`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span
                      className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                        isDark
                          ? "bg-purple-600 text-white"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      #{index + 1}
                    </span>
                  </div>

                  {/* Artist Info */}
                  <div className="p-4 text-center">
                    <div className="relative -mt-10 mb-3">
                      <img
                        src={artist.avatar}
                        alt={artist.name}
                        className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 mx-auto object-cover shadow-md"
                      />
                    </div>
                    <h3
                      className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {artist.name}
                    </h3>
                    <p
                      className={`text-sm ${isDark ? "text-purple-400" : "text-purple-600"}`}
                    >
                      {artist.specialty}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-center">
                        <p
                          className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {artist.artworks}
                        </p>
                        <p
                          className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          Artworks
                        </p>
                      </div>
                      <div className="text-center">
                        <p
                          className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {artist.followers}
                        </p>
                        <p
                          className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          Followers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
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
