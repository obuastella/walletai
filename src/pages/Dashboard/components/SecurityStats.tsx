import { Shield, Activity, CheckCircle } from "lucide-react";
import useUserData from "../../../hooks/useUserData";
import { useUserStore } from "../../../store/userStore";

export default function SecurityStats() {
  useUserData();
  const { transactions } = useUserStore();
  return (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-800">
      <h3 className="text-lg font-bold text-white mb-4">Security Stats</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-gray-300">High Threats</span>
          </div>
          <span className="text-white font-semibold">
            {transactions.filter((t: any) => t.status === "high").length}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-gray-300">Transactions Requests</span>
          </div>
          <span className="text-white font-semibold">
            {transactions?.length}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-gray-300">Uptime</span>
          </div>
          <span className="text-green-400 font-semibold">99.9%</span>
        </div>
      </div>
    </div>
  );
}
