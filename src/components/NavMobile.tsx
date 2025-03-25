import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Scan, User, Calendar } from "lucide-react";

const NavMobile: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10 border-t py-2 md:hidden">
      <div className="flex justify-around items-center relative gap-12">
        {/* Events */}
        <Link
          to="/organizer/1/events"
          className={`flex flex-col items-center ${
            location.pathname === "/organizer/1/events"
              ? "text-pink-700 font-semibold"
              : "text-gray-600 hover:text-pink-700"
          }`}
        >
          <Calendar className="h-6 w-6" />
          <span className="text-xs">Events</span>
        </Link>

        {/* Scan QR (Tombol Utama) */}
        <Link
          to="/scan"
          className="absolute -top-4 bg-pink-700 text-white rounded-full p-3 shadow-lg hover:bg-pink-800 transition duration-300"
        >
          <Scan className="h-8 w-8" />
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className={`flex flex-col items-center ${
            location.pathname === "/profile"
              ? "text-pink-700 font-semibold "
              : "text-gray-600 hover:text-pink-700"
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavMobile;
