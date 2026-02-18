import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl">Oops! Page Not Found</p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        Go Home
      </Link>
    </div>
  );
}
