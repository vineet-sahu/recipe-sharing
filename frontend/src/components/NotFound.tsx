import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
      <p className="mb-4">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 underline">
        Go back Home
      </Link>
    </div>
  );
};

export default NotFound;
