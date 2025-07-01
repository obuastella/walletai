import { ArrowDownLeft, ArrowUpRight, Brain, Activity } from "lucide-react";
import { formatTime } from "../../../utils/formatTime";
import { formatDate } from "../../../utils/formatDate";
import { getRiskColor } from "../../../utils/getRiskColor";

export default function TransactionTable({ filteredTransactions }: any) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="text-left p-4 text-gray-300 font-medium">
                Transaction
              </th>
              <th className="text-left p-4 text-gray-300 font-medium">
                Amount
              </th>
              <th className="text-left p-4 text-gray-300 font-medium">
                Date & Time
              </th>
              <th className="text-left p-4 text-gray-300 font-medium">
                Status
              </th>
              <th className="text-left p-4 text-gray-300 font-medium">
                AI insight
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction: any) => {
              return (
                <tr
                  key={transaction.id}
                  className="border-t border-gray-700/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          transaction.type === "received"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {transaction.type === "received" ? (
                          <ArrowDownLeft className="w-5 h-5" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {transaction.narration}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {transaction.accountName}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {transaction.bank}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`p-4 font-bold ${
                      transaction.type === "received"
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  >
                    {transaction.securityStatus === "blocked" ? (
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-lg text-sm font-medium">
                        BLOCKED
                      </span>
                    ) : (
                      <span>
                        {transaction.type === "received" ? "+" : "-"}N
                        {transaction.amount.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-white text-sm">
                        {formatDate(transaction.date)}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {formatTime(transaction.date)}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${getRiskColor(transaction.status)}`}
                    >
                      {transaction.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 max-w-xs">
                    <div className="flex items-start space-x-2">
                      <Brain className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <p className="text-purple-400 text-xs leading-relaxed">
                        {transaction.systemInsight}
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">
            No transactions match your criteria
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
}
