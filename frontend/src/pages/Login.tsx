import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginUser } from "../services/auth";

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<{ email?: string; password?: string }>({});

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirectTo = params.get("redirect") || "/";

  const validate = () => {
    const errors: { email?: string; password?: string } = {};

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

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return; // Stop if validation fails

    setLoading(true);
    try {
      const { token } = await loginUser(email, password);
      await login(token);

      console.log("Login successful, redirecting to:", redirectTo);
      navigate(redirectTo);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit}>
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
              <p className="text-red-600 text-xs mt-1">{fieldErrors.password}</p>
            )}
          </div>

          {/* General Error */}
          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition font-medium"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-green-600 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
