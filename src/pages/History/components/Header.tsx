import { Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const viewBalance = () => {
    navigate("/dashboard");
  };
  return (
    <div className="flex-wrap bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-10">
      <div className="flex-wrap md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex-wrap gap-y-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Transaction History
            </h1>
            <p className="text-gray-400 mt-1">
              Monitor and analyze your financial activity with AI
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={viewBalance}
              className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors"
            >
              <Wallet className="w-4 h-4" />
              <span>View Wallet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
