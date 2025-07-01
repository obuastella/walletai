import { signInWithEmailAndPassword } from "firebase/auth";

import { Lock, Mail, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { auth } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    setIsLoading(true);
    console.log("Payload: ", payload);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user logged in successfully", user);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      console.log("An error occured:", error);
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        toast.error("Invalid email or Password", {
          position: "top-right",
        });
      } else {
        toast.error(error.message);
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      {/* Email Input */}
      <div className="space-y-3">
        <label
          htmlFor="email"
          className="text-sm font-semibold text-gray-300 uppercase tracking-wide"
        >
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-3">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-gray-300 uppercase tracking-wide"
        >
          Password
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-14 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-purple-400 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between pt-2">
        <Link
          to="/forgot-password"
          className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      {/* Login Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-500/25"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
            <span className="text-lg">Signing in...</span>
          </div>
        ) : (
          <span className="text-lg">Sign In</span>
        )}
      </button>
    </div>
  );
}
