import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        The page you are looking for either does not exist.
      </p>
      <FaExclamationCircle className="text-red-600 text-6xl mb-8" />
      <Link to="/" className="text-blue-200 underline">
        Go Back Home
      </Link>
    </div>
  );
}

export default PageNotFound;
