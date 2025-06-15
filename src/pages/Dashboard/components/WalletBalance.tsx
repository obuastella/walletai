import { EyeOff, Eye, Shield, Send, Download } from "lucide-react";
import { useState } from "react";
import SendMoney from "./SendMoney";
import Request from "./Request";

const quickActions = [
  { icon: Send, label: "Send Money", color: "purple" },
  { icon: Download, label: "Request", color: "blue" },
];

export default function WalletBalance() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  let securityScore = 94;
  const balance = 2847.5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 rounded-3xl p-8 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-purple-200 text-sm font-medium">Total Balance</p>
            <div className="flex items-center space-x-3 mt-2">
              {balanceVisible ? (
                <h2 className="text-4xl font-bold text-white">
                  N{balance.toLocaleString()}
                </h2>
              ) : (
                <h2 className="text-4xl font-bold text-white">****</h2>
              )}
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                {balanceVisible ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-green-300" />
              <span className="text-purple-200 text-sm">Security Score</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {securityScore}%
            </div>
            <p className="text-green-300 text-sm">Excellent</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                if (action.label === "Send Money") {
                  setIsModalOpen(true);
                } else if (action.label === "Request") {
                  setIsRequestModalOpen(true);
                }
              }}
              className="cursor-pointer bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-2xl p-4 transition-all duration-300 group"
            >
              <action.icon className="w-6 h-6 text-white mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white text-sm font-medium">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && <SendMoney closeModal={closeModal} />}
      {isRequestModalOpen && <Request closeRequestModal={closeRequestModal} />}
    </div>
  );
}
