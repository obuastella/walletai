import { EyeOff, Eye, Shield, Send, Download } from "lucide-react";
import { useState } from "react";
import SendMoney from "./SendMoney";
import Request from "./Request";
import useUserData from "../../../hooks/useUserData";
import { useUserStore } from "../../../store/userStore";
import { auth, db } from "../../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const quickActions = [
  { icon: Send, label: "Send Money", color: "purple" },
  { icon: Download, label: "Request", color: "blue" },
];

export default function WalletBalance() {
  useUserData();

  const { accountBalance } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const transferAmount = 5000;
  const [balanceVisible, setBalanceVisible] = useState(true);
  let securityScore = 94;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
  };

  const handleAdd = async () => {
    setIsLoading(true);

    try {
      // Get current user ID
      const userId = auth.currentUser?.uid;

      if (userId) {
        // Update user document with new balance
        const userRef = doc(db, "Users", userId);

        await updateDoc(userRef, {
          accountBalance: accountBalance + transferAmount,
        });

        console.log("Balance updated relaod your page!");
        toast.success("Balance updated relaod your page!");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("An error occured", error);
      toast.error("An error occurred");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 relative overflow-hidden w-full max-w-full">
      {/* Background decorative elements - responsive sizing */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white/5 rounded-full -translate-y-16 sm:-translate-y-24 lg:-translate-y-32 translate-x-16 sm:translate-x-24 lg:translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-white/5 rounded-full translate-y-12 sm:translate-y-18 lg:translate-y-24 -translate-x-12 sm:-translate-x-18 lg:-translate-x-24"></div>

      <div className="relative z-10">
        {/* Main content - responsive layout */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
          {/* Balance section */}
          <div className="flex-1">
            <p className="text-purple-200 text-xs sm:text-sm font-medium">
              Total Balance
            </p>
            <button
              disabled={isLoading}
              onClick={handleAdd}
              className="px-6 p-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-sm cursor-pointer"
            >
              Add 5k
            </button>
            <div className="flex items-center space-x-2 sm:space-x-3 mt-1 sm:mt-2">
              {balanceVisible ? (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-all">
                  N {accountBalance}.00
                </h2>
              ) : (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  ****
                </h2>
              )}
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="p-1.5 sm:p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl transition-all flex-shrink-0"
              >
                {balanceVisible ? (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Security score section */}
          <div className="text-left sm:text-right sm:flex-shrink-0">
            <div className="flex items-center space-x-2 mb-1 sm:mb-2 sm:justify-end">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
              <span className="text-purple-200 text-xs sm:text-sm">
                Security Score
              </span>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              {securityScore}%
            </div>
            <p className="text-green-300 text-xs sm:text-sm">Excellent</p>
          </div>
        </div>

        {/* Quick Actions - responsive grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
              className="cursor-pointer bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-300 group min-h-[80px] sm:min-h-[100px] flex flex-col items-center justify-center"
            >
              <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white text-xs sm:text-sm font-medium text-center leading-tight">
                {action.label}
              </p>
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
