import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../services/auth"; // <-- you’ll need to create this API call

export const Signup = () =>{
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const navigate = useNavigate();

  const validate = () => {
    const errors: typeof fieldErrors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 4) {
      errors.password = "Password must be at least 4 characters";
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      await registerUser({ name, email, password }); // call your API
      console.log("Signup successful, redirecting to login...");
      toast.success("Signup successful, redirecting to login...");
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Signup failed");
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className={`w-full px-4 py-2 rounded-lg border ${
                fieldErrors.name ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-green-500 focus:outline-none`}
            />
            {fieldErrors.name && (
              <p className="text-red-600 text-xs mt-1">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-lg border ${
                fieldErrors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-green-500 focus:outline-none`}
            />
            {fieldErrors.email && (
              <p className="text-red-600 text-xs mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={`w-full px-4 py-2 rounded-lg border ${
                fieldErrors.password ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-green-500 focus:outline-none`}
            />
            {fieldErrors.password && (
              <p className="text-red-600 text-xs mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className={`w-full px-4 py-2 rounded-lg border ${
                fieldErrors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-green-500 focus:outline-none`}
            />
            {fieldErrors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* General Error */}
          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          {/* Signup button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition font-medium"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
