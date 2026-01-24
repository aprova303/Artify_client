import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const NotFound = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      {/* Header with Login/User Menu */}
      {<div className="absolute top-0 right-0 p-4">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="group relative"
            >
              <img
                src={
                  user?.photoURL ||
                  `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=indigo&color=fff`
                }
                alt={user?.displayName || "User"}
                className="w-12 h-12 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-indigo-500 transition"
              />
              {/* Hover Tooltip */}
              <div className="absolute bottom-0 right-0 mb-16 hidden group-hover:block bg-gray-900 text-white px-3 py-2 rounded-lg whitespace-nowrap text-sm z-50">
                {user?.displayName || "User"}
              </div>
            </button>

            {/* User Menu */}
           {/* {showUserMenu && (
              <div className="absolute top-14 right-0 bg-white rounded-lg shadow-lg overflow-hidden z-50 min-w-[150px]">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition font-semibold"
                >
                  Logout
                </button>
              </div>
            )} */}
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 bg-white hover:bg-gray-100 text-indigo-600 rounded-lg font-semibold border border-indigo-600 transition"
            >
              Register
            </button>
          </div>
        )}
      </div>  }

      {/* 404 Content */}
      <div className="text-center max-w-md">
        {/* Large 404 Display */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-indigo-600 drop-shadow-lg">
            404
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-4">
            Oops! Page Not Found
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-8 text-lg">
          Sorry, the page you're looking for doesn't exist. Let's get you back
          to the art!
        </p>

      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 opacity-10">
        <svg
          className="w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
            className="text-indigo-600"
          />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
