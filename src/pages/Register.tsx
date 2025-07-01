import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./(Auth)/RegisterForm";

export default function Register() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23a855f7%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M0%200h20v20H0V0zm20%2020h20v20H20V20z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        </div>
        <div className="relative w-full max-w-md z-10">
          {/* Main Card */}
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-purple-500 via-purple-600 to-blue-500 rounded-3xl mb-6 shadow-lg shadow-purple-500/25">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                WalletAi
              </h1>
              <p className="text-gray-400 text-lg">
                Smart payments, smarter insights
              </p>
            </div>

            {/* Login Form */}
            <RegisterForm />

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={handleNavigate}
                  className="cursor-pointer text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
