import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Scan, User, Calendar } from "lucide-react";

const NavMobile: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10">
      <div className="flex justify-around p-2">
        <Link
          to="/data"
          className={`flex flex-col items-center p-2 rounded-lg ${
            location.pathname === "/data"
              ? "text-blue-600 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          <Calendar className="h-6 w-6" />
          <span className="text-xs">Events</span>
        </Link>
        <Link
          to="/scan"
          className={`flex flex-col items-center p-2 rounded-lg ${
            location.pathname === "/scan"
              ? "text-blue-600 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          <Scan className="h-6 w-6" />
          <span className="text-xs">Scan QR</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center p-2 rounded-lg ${
            location.pathname === "/profile"
              ? "text-blue-600 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
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
