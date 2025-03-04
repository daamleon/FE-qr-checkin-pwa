import React from "react";
import { Link, useLocation } from "react-router-dom";
import { QrCode, Scan, Info, Database } from "lucide-react";
import NavMobile from "./NavMobile";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <header className="bg-white shadow-sm t-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to="/" className="flex items-center">
              <QrCode className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xs md:text-lg font-bold text-gray-900">
                QR Check-in
              </h1>
            </Link>

            <nav className="hidden md:flex items-center">
              <Link
                to="/scan"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/scan"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center">
                  <Scan className="h-5 w-5 mr-1" />
                  <span>Scan</span>
                </div>
              </Link>

              <Link
                to="/data"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/data"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center">
                  <Database className="h-5 w-5 mr-1" />
                  <span>Data</span>
                </div>
              </Link>

              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/about"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center">
                  <Info className="h-5 w-5 mr-1" />
                  <span>About</span>
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
