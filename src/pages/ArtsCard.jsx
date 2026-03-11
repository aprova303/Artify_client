import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
// import { FaStar } from "react-icons/fa";
// import { Link, useLoaderData } from "react-router";

const ArtsCard = ({ art }) => {

    const { isDark, toggleTheme } = useTheme();
  return (
    <div>
      <div
      //  className={`card  bg-base-100 shadow-lg hover:shadow-xl transition-shadow ${isDark ? 'dark' : ''}`}
      className={` ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1`}
       >
        <figure>
          <img
            src={
              art?.image ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={art?.title || "Art"}
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg">
            {art?.title || "Untitled"}
            {art?.category && (
              <div className="badge badge-secondary text-xs">
                {art.category}
              </div>
            )}
          </h2>
          <p className="text-sm">
            {art?.description || "No description available"}
          </p>
          <div className="card-actions justify-between items-center mt-4">
            <div className="text-lg font-bold text-primary">
              ${art?.price || "N/A"}
            </div>
            <Link
              to={`/artwork-details/${art._id}`}
              className="btn btn-sm btn-primary"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtsCard;
