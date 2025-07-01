import { Activity, CheckCircle, AlertTriangle, Angry } from "lucide-react";

const StatsBar = ({ totalTransactions, filteredTransactions }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">Total Transactions</p>
          <p className="text-2xl font-bold text-white">{totalTransactions}</p>
        </div>
        <Activity className="w-8 h-8 text-purple-400" />
      </div>
    </div>

    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">Verified</p>
          <p className="text-2xl font-bold text-green-400">
            {filteredTransactions.filter((t: any) => t.status === "low").length}
          </p>
        </div>
        <CheckCircle className="w-8 h-8 text-green-400" />
      </div>
    </div>

    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">Medium risk</p>
          <p className="text-2xl font-bold text-yellow-400">
            {
              filteredTransactions.filter((t: any) => t.status === "medium")
                .length
            }
          </p>
        </div>
        <AlertTriangle className="w-8 h-8 text-yellow-400" />
      </div>
    </div>
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">High risk</p>
          <p className="text-2xl font-bold text-red-400">
            {
              filteredTransactions.filter((t: any) => t.status === "high")
                .length
            }
          </p>
        </div>
        <Angry className="w-8 h-8 text-red-400" />
      </div>
    </div>
  </div>
);

export default StatsBar;
