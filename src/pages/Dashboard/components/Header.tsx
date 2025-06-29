import { Brain, Shield, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left section - Logo and brand */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg sm:rounded-xl">
              <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white">
              WalletAI
            </h1>

            {/* Security badge - hidden on very small screens */}
            <div className="hidden xs:flex items-center space-x-1 sm:space-x-2 bg-green-500/20 px-2 sm:px-3 py-1 rounded-full">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              <span className="text-green-400 text-xs sm:text-sm font-medium">
                Secured
              </span>
            </div>
          </div>

          {/* Desktop navigation - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
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

          {/* Mobile menu button - visible on mobile only */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Quick logout for mobile */}
            <button
              onClick={handleLogout}
              className="cursor-pointer w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <LogOut className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={toggleMobileMenu}
              className="cursor-pointer p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-3 space-y-3">
            {/* Security badge for mobile */}
            <div className="flex items-center justify-center xs:hidden">
              <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-medium">
                  Secured
                </span>
              </div>
            </div>

            {/* AI Monitoring status */}
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-xl">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">AI Monitoring</span>
              </div>
            </div>

            {/* Settings button */}
            <div className="flex justify-center">
              <button className="cursor-pointer flex items-center space-x-2 p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
                <Settings className="w-5 h-5" />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
