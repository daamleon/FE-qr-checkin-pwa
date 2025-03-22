import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Scan, User, Calendar } from "lucide-react";
import NavMobile from "./NavMobile";
// import MobileSidebar from "../components/Sidebar";
const Header: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <header className=" bg-white shadow-sm t-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to="/" className="flex items-center">
              <img className="h-10" src="/agendakota2.png" alt="" />
            </Link>
            {/* <MobileSidebar /> */}
            <nav className="hidden md:flex items-center">
              <Link
                to="/organizer/1/events"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/organizer/1/events"
                    ? "text-pink-700 bg-blue-50"
                    : "text-gray-600 hover:text-pink-700 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span>Events</span>
                </div>
              </Link>

              <Link
                to="/scan"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/scan"
                    ? "text-pink-700 bg-blue-50"
                    : "text-gray-600 hover:text-pink-700 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center">
                  <Scan className="h-5 w-5 mr-1" />
                  <span>Scan</span>
                </div>
              </Link>

              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/about"
                    ? "text-pink-700 bg-blue-50"
                    : "text-gray-600 hover:text-pink-700 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  <span>Profile</span>
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <NavMobile />
    </>
  );
};

export default Header;
