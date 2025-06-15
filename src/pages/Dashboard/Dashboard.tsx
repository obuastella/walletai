import {
  ArrowUpRight,
  ArrowDownLeft,
  Brain,
  ChevronRight,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import WalletBalance from "./components/WalletBalance";
import SecurityStats from "./components/SecurityStats";
import Header from "./components/Header";
import MonitoringStatus from "./components/MonitoringStatus";
import { transactions } from "../transactions";

export default function Dashboard() {
  const getSecurityColor = (status: any) => {
    switch (status) {
      case "verified":
        return "text-green-400";
      case "flagged":
        return "text-yellow-400";
      case "blocked":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getSecurityIcon = (status: any) => {
    switch (status) {
      case "verified":
        return CheckCircle;
      case "flagged":
        return AlertTriangle;
      case "blocked":
        return Shield;
      default:
        return Shield;
    }
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
                <h3 className="text-xl font-bold text-white">
                  Secured Transactions
                </h3>
                <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => {
                  const SecurityIcon = getSecurityIcon(
                    transaction.securityStatus
                  );
                  return (
                    <div
                      key={transaction.id}
                      className="bg-gray-800/30 rounded-2xl p-4 hover:bg-gray-800/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                              transaction.type === "received"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {transaction.type === "received" ? (
                              <ArrowDownLeft className="w-6 h-6" />
                            ) : (
                              <ArrowUpRight className="w-6 h-6" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-white font-semibold">
                                {transaction.description}
                              </h4>
                              <SecurityIcon
                                className={`w-4 h-4 ${getSecurityColor(transaction.securityStatus)}`}
                              />
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <p className="text-gray-400 text-sm">
                                {transaction.date}
                              </p>
                              <span className="text-gray-600">•</span>
                              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                                {transaction.category}
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  transaction.riskLevel === "low"
                                    ? "bg-green-500/20 text-green-400"
                                    : transaction.riskLevel === "medium"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-red-500/20 text-red-400"
                                }`}
                              >
                                {transaction.riskLevel} risk
                              </span>
                            </div>
                            {/* AI Security Insight */}
                            <div className="flex items-center space-x-2 mt-2">
                              <Brain className="w-3 h-3 text-purple-400" />
                              <p className="text-purple-400 text-xs">
                                {transaction.aiInsight}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-bold ${
                              transaction.type === "received"
                                ? "text-green-400"
                                : "text-white"
                            }`}
                          >
                            {transaction.type === "received" ? "+" : "-"}$
                            {transaction.amount.toFixed(2)}
                          </p>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors mt-1" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
