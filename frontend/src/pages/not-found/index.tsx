import { HelpCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 text-center">
      {/* Icon */}
      <div className="bg-white p-6 rounded-full shadow-lg">
        <HelpCircle className="h-12 w-12 text-indigo-600" />
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-4xl font-bold text-gray-800">
        Question Not Found
      </h1>

      {/* Message */}
      <p className="mt-2 text-lg text-gray-700 max-w-md">
        Oops! Looks like this quiz or interview question wandered off the page.  
        Don’t worry — you can always head back and explore more shared questions 📚.
      </p>

      {/* Action button */}
      <Link
        to="/view"
        className="mt-6 inline-flex items-center px-5 py-3 bg-indigo-600 text-white text-base font-medium rounded-2xl shadow hover:bg-indigo-700 transition"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Questions
      </Link>
    </div>
  );
}
