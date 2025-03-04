import React from "react";
import { Link } from "react-router-dom";
import { Scan, Database, Info } from "lucide-react";

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
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              <Scan className="h-5 w-5 mr-2" />
              <span>Start Scanning</span>
            </Link>
            <Link
              to="/data"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-50 transition duration-300"
            >
              <Database className="h-5 w-5 mr-2" />
              <span>View Data</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Scan className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Quick Scanning
            </h3>
            <p className="text-gray-600">
              Scan QR codes quickly and efficiently for seamless check-ins.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Database className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Data Management
            </h3>
            <p className="text-gray-600">
              Manage and analyze your check-in data with ease.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Info className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              User-Friendly
            </h3>
            <p className="text-gray-600">
              Intuitive interface designed for all users.
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-white shadow-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            &copy; {new Date().getFullYear()} QR Check-in. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
