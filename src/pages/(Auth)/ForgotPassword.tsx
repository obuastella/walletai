import { useState } from "react";
import { KeyRound, ArrowLeft, CheckCircle, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { BASE_URL } from "../../config/config";

const ForgotPassword = ({}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${BASE_URL}/`,
        handleCodeInApp: true,
      });
      setSuccess(true);
      toast.success("If the email is registered, a reset link has been sent.", {
        position: "top-right",
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send reset link. Please try again.");

      toast.error("Error sending reset email", { position: "top-right" });
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23a855f7%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M0%200h20v20H0V0zm20%2020h20v20H20V20z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>
      <div className=" w-full flex items-center justify-center p-6">
        <div className="border-gray-700/50 border bg-gray-900/80 shadow-4xl backdrop-blur-xl rounded-2xl relative z-10 p-8 max-w-md w-full">
          {!success ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <KeyRound className="h-12 w-12 text-purple-400" />
                </div>
              </div>

              <h1 className="text-center text-3xl font-bold mb-3 text-white">
                Forgot Password
              </h1>

              <p className="text-center text-white/70 text-sm mb-6">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-white font-medium mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-foreground focus:ring-2 focus:ring-primary focus:border-primary  dark:text-white"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="cursor-pointer w-full flex items-center justify-center px-5 py-3 rounded-lg bg-purple-400/20 shadow-lg disabled:shadow-sm hover:bg-secondary/40 disabled:bg-primary/10 disabled:text-gray-300 text-white font-medium transition"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
              </div>

              <h1 className="text-center text-3xl font-bold mb-3 text-gray-800 dark:text-white">
                Check Your Email
              </h1>

              <p className="text-center text-white/70 mb-6">
                We've sent a password reset link to{" "}
                <span className="font-medium text-white">{email}</span>. Please
                check your inbox and follow the instructions.
              </p>

              <div className="bg-blue-900/20 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    The link will expire in 10 minutes. If you don't see the
                    email, check your spam folder.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSuccess(false)}
                className="w-full flex items-center justify-center px-5 py-3 rounded-lg hover:bg-gray-800 bg-gray-700 text-white font-medium transition"
              >
                Try Again
              </button>
            </>
          )}

          <div className="mt-6 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-white hover:text-foreground hover:animate-pulse transition"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
