// Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-neutral-primary w-full border-t border-default">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About / Logo */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Jimmy App</h2>
          <p className="text-gray-300 text-sm">
            Connect with friends, share moments, and explore the world of social
            media. with <span className="text-black font-bold">Jimmy App</span>
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="flex flex-col gap-1 text-gray-300 text-sm">
            <Link
              to={"/"}
              className="hover:text-black cursor-pointer transition"
            >
              Home
            </Link>
            <Link
              to={"/profile"}
              className="hover:text-black cursor-pointer transition"
            >
              Profile
            </Link>
            <Link
              to={"/"}
              className="hover:text-black cursor-pointer transition"
            >
              Home
            </Link>{" "}
            <Link
              to={"/editdata"}
              className="hover:text-black cursor-pointer transition"
            >
              Profile Data
            </Link>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="flex gap-3 mt-2 text-gray-300">
            <FaFacebookF className="cursor-pointer hover:text-black transition" />
            <FaTwitter className="cursor-pointer hover:text-black transition" />
            <FaInstagram className="cursor-pointer hover:text-black transition" />
            <FaLinkedinIn className="cursor-pointer hover:text-black transition" />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-default mt-4 text-gray-400 text-sm py-4 text-center">
        © {new Date().getFullYear()} Ahmed Gamal.
      </div>
    </footer>
  );
}
