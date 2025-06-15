export default function MonitoringStatus() {
  return (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-800">
      <h3 className="text-lg font-bold text-white mb-4">AI Monitoring</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Real-time Analysis</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Active</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Behavioral Learning</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-sm">Learning</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Threat Detection</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-400 text-sm">Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
