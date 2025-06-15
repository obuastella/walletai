import { CheckCircle, Copy, Download, X } from "lucide-react";
import { useState } from "react";

export default function Request({ closeRequestModal }: any) {
  const [copied, setCopied] = useState(false);
  const userAccountNumber = "1234567890";
  const userBankName = "WalletAI Bank";
  const copyToClipboard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-0 w-full max-w-md border border-gray-600/50 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600/20 rounded-xl">
              <Download className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-white text-lg font-semibold">
                Request Money
              </h2>
              <p className="text-gray-400 text-sm">
                Share your account details
              </p>
            </div>
          </div>
          <button
            onClick={closeRequestModal}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Instructions */}
          <div className="mb-6">
            <p className="text-gray-300 text-sm leading-relaxed">
              Copy your account number and share it with the sender to receive
              funds directly to your WalletAI account.
            </p>
          </div>

          {/* Account Details Card */}
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-5 border border-blue-500/20 mb-6">
            <div className="space-y-4">
              {/* Account Number */}
              <div>
                <label className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2 block">
                  Account Number
                </label>
                <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/30">
                  <span className="text-white font-mono text-lg font-semibold tracking-wider">
                    {userAccountNumber}
                  </span>
                  <button
                    onClick={() => copyToClipboard(userAccountNumber)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Bank Name */}
              <div>
                <label className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2 block">
                  Bank Name
                </label>
                <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-600/30">
                  <span className="text-white font-medium">{userBankName}</span>
                  <button
                    onClick={() => copyToClipboard(userBankName)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copy All Button */}
          <button
            onClick={() =>
              copyToClipboard(
                `Account Number: ${userAccountNumber}\nBank: ${userBankName}`
              )
            }
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy All Details</span>
              </>
            )}
          </button>

          {/* Security Note */}
          <div className="mt-4 p-3 bg-yellow-600/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-300 text-xs leading-relaxed">
              <strong>Security Note:</strong> Only share these details with
              trusted senders. Never share your PIN or password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
