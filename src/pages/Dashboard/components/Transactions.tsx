import {
  CheckCircle,
  AlertTriangle,
  Shield,
  ArrowDownLeft,
  ArrowUpRight,
  Brain,
} from "lucide-react";
import useUserData from "../../../hooks/useUserData";
import { useUserStore } from "../../../store/userStore";
import { formatDate } from "../../../utils/formatDate";

export default function Transactions() {
  useUserData();
  const { transactions } = useUserStore();
  console.log("User transactions: ", transactions);
  const getSecurityColor = (status: any) => {
    const colors: any = {
      low: "text-green-400",
      flagged: "text-yellow-400",
      blocked: "text-red-400",
    };
    return colors[status] || "text-gray-400";
  };

  const getSecurityIcon = (status: any) => {
    const icons: any = {
      verified: CheckCircle,
      flagged: AlertTriangle,
      blocked: Shield,
    };
    return icons[status] || Shield;
  };

  return (
    <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
      {transactions.length === 0 ? (
        <h2 className="my-42 text-center text-gray-600">no transactions</h2>
      ) : (
        <>
          {transactions.slice(0, 3).map((transaction: any, index: any) => {
            const SecurityIcon = getSecurityIcon(transaction.securityStatus);
            const isReceived = transaction.type === "received";
            return (
              <div
                key={index}
                className="bg-gray-800/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-gray-800/50 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 ${isReceived ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                    >
                      {isReceived ? (
                        <ArrowDownLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-semibold text-sm sm:text-base truncate">
                          {transaction.narration}
                        </h4>
                        <SecurityIcon
                          className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${getSecurityColor(transaction.status)}`}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <p className="text-gray-400 text-xs sm:text-sm">
                            {/* {
                              new Date(transaction.date)
                                .toISOString()
                                .split("T")[0]
                            } */}
                            {formatDate(transaction.date)}
                          </p>
                          <span className="text-gray-600 hidden sm:inline">
                            •
                          </span>
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 sm:py-1 rounded-full self-start ${
                            transaction.status === "low"
                              ? "bg-green-500/20 text-green-400"
                              : transaction.status === "medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {transaction.status} risk
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Brain className="w-3 h-3 text-purple-400 flex-shrink-0" />
                        <p className="text-purple-400 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                          {transaction.systemInsight}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 flex flex-col items-end">
                    <p
                      className={`font-bold text-sm sm:text-base mb-1 ${isReceived ? "text-green-400" : "text-white"}`}
                    >
                      {isReceived ? "+" : "-"}N{transaction.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
