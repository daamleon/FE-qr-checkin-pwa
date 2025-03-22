import React from "react";
import { Link } from "react-router-dom";
import { Scan } from "lucide-react";

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to QR Check-in
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Simplify your check-in process with our easy-to-use QR code system.
            Scan, manage, and analyze your data effortlessly.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/scan"
              className="inline-flex items-center px-6 py-3 bg-pink-700 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
            >
              <Scan className="h-5 w-5 mr-2" />
              <span>Start Scanning</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
