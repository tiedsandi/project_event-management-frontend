import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  let title = "Oops! Something went wrong.";
  let message =
    "We couldn't process your request right now. Please try again later.";

  if (error.status === 500 && error.data?.message) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Page Not Found";
    message = "The page you're looking for doesn't exist or has been moved.";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
      <div className="max-w-md space-y-6">
        <div className="text-7xl">😵</div>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600">{message}</p>

        <Link
          to="/"
          className="inline-block px-5 py-2 mt-4 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          ← Back to Home
        </Link>

        {error.status && (
          <p className="text-sm text-gray-400">Error code: {error.status}</p>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;
