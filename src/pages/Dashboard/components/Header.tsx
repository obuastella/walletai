import { Brain, Shield, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">WalletAI</h1>
            <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">
                Secured
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">AI Monitoring</span>
            </div>

            <button className="cursor-pointer p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="cursor-pointer w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <LogOut className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
