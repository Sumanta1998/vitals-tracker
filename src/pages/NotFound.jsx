import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>
      <p className="mt-4 text-xl font-semibold text-gray-800">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-gray-500">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
