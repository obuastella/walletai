import { Send, X, DollarSign, Building, User, Lock } from "lucide-react";
import { useState, useEffect } from "react";

export default function SendMoney({ closeModal }: any) {
  const [bankOptions] = useState([
    { code: "044", name: "Access Bank" },
    { code: "011", name: "First Bank" },
    { code: "058", name: "GTBank" },
    { code: "032", name: "Union Bank" },
    { code: "033", name: "UBA" },
  ]);
  const [selectedBank, setSelectedBank] = useState("");
  const [narration, setNarration] = useState("");
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accountName, setAccountName] = useState("");

  // Simulate account name lookup when account number and bank are filled
  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank) {
      setIsLoading(true);
      setTimeout(() => {
        setAccountName("John Doe Smith");
        setIsLoading(false);
      }, 1500);
    } else {
      setAccountName("");
    }
  }, [accountNumber, selectedBank]);

  const handleNext = () => {
    if (step === 1 && amount && accountNumber.length === 10 && selectedBank) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSend = () => {
    const payload = {
      amount: amount,
      accountNumber: accountNumber,
      selectedBank: selectedBank,
      narration: narration,
    };
    console.log("Payload: ", payload);
    if (pin.length === 4) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setAmount("");
        setAccountNumber("");
        setSelectedBank("");
        setNarration("");
        setAccountName("");
        setPin("");
        setStep(1);
        closeModal();
        alert("Money sent out!");
      }, 2000);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-0 w-full max-w-md border border-gray-600/50 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600/20 rounded-xl">
              <Send className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-white text-lg font-semibold">Send Money</h2>
              <p className="text-gray-400 text-sm">Step {step} of 2</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm text-purple-400">{step}/2</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(step / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-4">
              {/* Amount Input */}
              <div className="relative">
                <label className="text-gray-300 text-sm font-medium mb-2 block">
                  Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-10 pr-4 py-3 rounded-xl border border-gray-600/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Account Number */}
              <div className="relative">
                <label className="text-gray-300 text-sm font-medium mb-2 block">
                  Account Number
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="0123456789"
                    maxLength={10}
                    value={accountNumber}
                    onChange={(e) =>
                      setAccountNumber(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-10 pr-4 py-3 rounded-xl border border-gray-600/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Bank Selection */}
              <div className="relative">
                <label className="text-gray-300 text-sm font-medium mb-2 block">
                  Select Bank
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-10 pr-4 py-3 rounded-xl border border-gray-600/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all appearance-none"
                  >
                    <option value="" className="bg-gray-800">
                      Choose a bank
                    </option>
                    {bankOptions.map((bank) => (
                      <option
                        key={bank.code}
                        value={bank.code}
                        className="bg-gray-800"
                      >
                        {bank.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Narration */}
              <div className="relative">
                <label className="text-gray-300 text-sm font-medium mb-2 block">
                  Narration
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Narration"
                    value={narration}
                    onChange={(e) => setNarration(e.target.value)}
                    className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-10 pr-4 py-3 rounded-xl border border-gray-600/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Account Name Display */}
              {accountNumber.length === 10 && selectedBank && (
                <div className="relative">
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Account Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <div className="w-full bg-gray-700/50 backdrop-blur-sm text-white pl-10 pr-4 py-3 rounded-xl border border-gray-600/50 flex items-center">
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-400">Verifying...</span>
                        </div>
                      ) : (
                        <span className="text-green-400 font-medium">
                          {accountName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={
                  !amount ||
                  accountNumber.length !== 10 ||
                  !selectedBank ||
                  isLoading
                }
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Transaction Summary */}
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                <h3 className="text-white font-medium mb-3">
                  Transaction Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white font-medium">N{amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">To:</span>
                    <span className="text-white font-medium">
                      {accountName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bank:</span>
                    <span className="text-white font-medium">
                      {
                        bankOptions.find((bank) => bank.code === selectedBank)
                          ?.name
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account:</span>
                    <span className="text-white font-medium">
                      ***{accountNumber.slice(-4)}
                    </span>
                  </div>
                </div>
              </div>

              {/* PIN Input */}
              <div className="relative">
                <label className="text-gray-300 text-sm font-medium mb-2 block">
                  Enter PIN to Confirm
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-10 pr-4 py-3 rounded-xl border border-gray-600/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-center text-2xl tracking-widest"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-gray-700/50 hover:bg-gray-700 text-white py-3 rounded-xl font-medium transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleSend}
                  disabled={pin.length !== 4 || isLoading}
                  className="flex-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Money</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
