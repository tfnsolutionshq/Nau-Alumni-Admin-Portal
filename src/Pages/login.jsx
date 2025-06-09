import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import UnizikLogo from "../assets/Images/unizik-logo.png";
import UnizikLogo2 from "../assets/Images/logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img
              src={UnizikLogo}
              alt="University Alumni Logo"
              className="h-12"
            />
          </div>
          <button className="flex items-center gap-2 text-gray-600 bg-gray-100 px-3 py-2 rounded-md text-sm">
            Contact Support
          </button>
        </header>
      </div>
      <hr className="w-full border-t border-gray-200" />

      <div className="max-w-7xl mx-auto px-4">
        <main className="flex justify-center items-center py-12">
          <div className="w-full max-w-md bg-white border border-gray-100 rounded-lg shadow-sm p-8">
            <div className="flex justify-center mb-6">
              <img
                src={UnizikLogo2}
                alt="University Emblem"
                className="h-20"
              />
            </div>

            <h1 className="text-2xl font-bold text-center mb-6">
              Login to Admin Portal
            </h1>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="user@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : "Login"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600">Forgot Password?</span>{" "}
              <a href="/" className="text-blue-600 hover:underline">
                Request access
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;