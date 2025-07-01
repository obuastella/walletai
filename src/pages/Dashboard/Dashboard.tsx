import WalletBalance from "./components/WalletBalance";
import SecurityStats from "./components/SecurityStats";
import Header from "./components/Header";
import MonitoringStatus from "./components/MonitoringStatus";
import Transactions from "./components/Transactions";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const viewTransactions = () => {
    navigate("/history");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WalletBalance />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Secure Transactions */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base md:text-xl font-bold text-white">
                  Secured Transactions
                </h3>
                <button
                  onClick={viewTransactions}
                  className="cursor-pointer hover:underline text-purple-400 hover:text-purple-300 text-sm font-medium"
                >
                  View All
                </button>
              </div>
              <Transactions />
            </div>
          </div>

          {/* Security Sidebar */}
          <div className="space-y-6">
            <SecurityStats />
            <MonitoringStatus />
          </div>
        </div>
      </div>
    </div>
  );
}
