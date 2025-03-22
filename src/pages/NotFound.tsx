import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-8">Oops! Page Not Found</h2>
        <p className="text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/scan"
          className="inline-block px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Go Back
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
