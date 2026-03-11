import React from "react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <footer
      className={`bg-${isDark ? "gray-900" : "gray-100"} text-${isDark ? "gray-300" : "gray-600"} mt-10`}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-5">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <h3
                className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}
              >
                ARTIFY
              </h3>
            </div>
            <p
              className={`text-sm  ${isDark ? "text-white" : "text-gray-600"}`}
            >
              Connecting artists with art lovers worldwide. Share, explore, and
              celebrate creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`mb-4 font-semibold ${isDark ? "text-white" : "text-gray-800"}`}
            >
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className={`text-sm hover:text-indigo-400 transition  ${isDark ? "text-white" : "text-gray-600"}`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/explore"
                  className={`text-sm hover:text-indigo-400 transition  ${isDark ? "text-white" : "text-gray-600"}`}
                >
                  Explore Artworks
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-sm hover:text-indigo-400 transition  ${isDark ? "text-white" : "text-gray-600"}`}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-sm hover:text-indigo-400 transition  ${isDark ? "text-white" : "text-gray-600"}`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
      
            {/* Contact Info */}
            <div>
              <h4
                className={`mb-4 font-semibold ${isDark ? "text-white" : "text-gray-800"}`}
              >
                Contact
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">
                  <span className="font-semibold">Email:</span>
                  <br />
                  <a
                    href="mailto:info@artify.com"
                    className={`text-sm hover:text-indigo-400 transition  ${isDark ? "text-white" : "text-gray-600"}`}
                  >
                    artify@gmail.coom
                  </a>
                </li>
                <li className="text-gray-400">
                  <span className="font-semibold">Phone:</span>
                  <br />
                  <a
                    href="tel:+1234567890"
                    className={`text-sm hover:text-indigo-400 transition  ${isDark ? "text-white" : "text-gray-600"}`}
                  >
                    013********
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className=" pt-4 mb-4">
            <div className="flex flex-col  justify-between items-center gap-6">
              <div>
                <h4
                  className={`mb-4 sm:mb-0 font-semibold ${isDark ? "text-white" : "text-gray-800"}`}
                >
                  Follow Us
                </h4>
              </div>
              <div className="flex gap-6">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${isDark ? "text-white" : "text-gray-600"}`}
                  aria-label="Facebook"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Twitter */}
                {/* <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-400 transition"
                aria-label="Twitter"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.953 4.57a10 10 0 002.856-3.915 10 10 0 01-2.856.973v1.945h2m-8.031 7.26c0 2.597 2.092 4.689 4.689 4.689 1.326 0 2.566-.536 3.445-1.408-.87.867-2.077 1.408-3.445 1.408-2.597 0-4.689-2.092-4.689-4.689 0-1.326.536-2.566 1.408-3.445-.867.87-1.408 2.077-1.408 3.445M4.574 15.069c0 2.597 2.092 4.689 4.689 4.689 1.326 0 2.566-.536 3.445-1.408-.87.867-2.077 1.408-3.445 1.408-2.597 0-4.689-2.092-4.689-4.689 0-1.326.536-2.566 1.408-3.445-.867.87-1.408 2.077-1.408 3.445" />
                </svg>
              </a> */}

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${isDark ? "text-white" : "text-gray-600"}`}
                  aria-label="Instagram"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${isDark ? "text-white" : "text-gray-600"}`}
                  aria-label="LinkedIn"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-2 items-center justify-center">
            <p className={`text-sm ${isDark ? "text-white" : "text-gray-600"}`}>
              &copy; {new Date().getFullYear()} ARTIFY. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
