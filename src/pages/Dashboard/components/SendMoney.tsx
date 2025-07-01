import { Send, X, DollarSign, Building, User, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { useUserStore } from "../../../store/userStore";
import useUserData from "../../../hooks/useUserData";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../../config/firebase";

export default function SendMoney({ closeModal }: any) {
  useUserData();
  const { accountBalance } = useUserStore();
  //
  // Risk assessment rules
  const assessTransactionRisk = (
    amount: any,
    narration: any,
    accountBalance: any
  ) => {
    const amountNum = parseFloat(amount);
    const balanceRatio = amountNum / accountBalance;

    // Normalize narration for pattern matching
    const normalizedNarration = narration.toLowerCase().trim();

    // High-risk keywords and patterns
    const highRiskKeywords = [
      "gambling",
      "bet",
      "loan",
      "urgent",
      "emergency",
      "crypto",
      "bitcoin",
    ];
    const mediumRiskKeywords = [
      "transfer",
      "payment",
      "bill",
      "rent",
      "shopping",
    ];
    const lowRiskKeywords = ["salary", "refund", "family", "gift", "savings"];

    // Check for suspicious patterns
    const hasHighRiskKeyword = highRiskKeywords.some((keyword) =>
      normalizedNarration.includes(keyword)
    );
    const hasMediumRiskKeyword = mediumRiskKeywords.some((keyword) =>
      normalizedNarration.includes(keyword)
    );
    const hasLowRiskKeyword = lowRiskKeywords.some((keyword) =>
      normalizedNarration.includes(keyword)
    );

    // Risk assessment logic
    let status = "low";
    let insight = "";

    // High risk conditions
    if (balanceRatio > 0.8) {
      status = "high";
      insight = "High-value transaction detected - Exceeds 80% of balance";
    } else if (amountNum > 100000) {
      status = "high";
      insight =
        "Large transaction amount detected - Enhanced monitoring required";
    } else if (hasHighRiskKeyword) {
      status = "high";
      insight = "Suspicious pattern detected - High-risk transaction category";
    }

    // Medium risk conditions
    else if (balanceRatio > 0.5) {
      status = "medium";
      insight = "Moderate transaction amount - Standard verification applied";
    } else if (amountNum > 50000) {
      status = "medium";
      insight = "Medium-value transaction - Routine security checks completed";
    } else if (hasMediumRiskKeyword) {
      status = "medium";
      insight = "Regular transaction pattern detected - Medium risk assessment";
    }

    // Low risk conditions
    else if (hasLowRiskKeyword) {
      status = "low";
      insight = "Regular income/family pattern verified - Low risk transaction";
    } else if (amountNum < 10000) {
      status = "low";
      insight = "Small transaction amount - Automated approval processed";
    } else {
      status = "low";
      insight = "Standard transaction pattern - Low risk verified";
    }

    // Additional insights based on specific patterns
    if (
      normalizedNarration.includes("new") ||
      normalizedNarration.includes("first")
    ) {
      insight = "New merchant detected - Transaction verified and approved";
    }

    if (normalizedNarration.length < 3) {
      insight = "Minimal transaction description - Manual review recommended";
      status = status === "low" ? "medium" : status;
    }

    return { status, insight };
  };
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
    if (
      step === 1 &&
      amount &&
      accountNumber.length === 10 &&
      selectedBank &&
      narration
    ) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSend = async () => {
    try {
      // Convert amount to number for comparison
      const transferAmount = parseFloat(amount);

      // Validate amount
      if (isNaN(transferAmount) || transferAmount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      // Check if user has sufficient balance
      if (transferAmount > accountBalance) {
        toast.error(
          `Insufficient funds! Your balance is ₦${accountBalance.toLocaleString()}`
        );
        return;
      }

      // Validate other required fields
      if (!accountNumber || !selectedBank || !narration.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Validate PIN
      if (pin.length !== 4) {
        toast.error("Please enter your 4-digit PIN");
        return;
      }

      // Assess transaction risk and generate insights
      const { status, insight } = assessTransactionRisk(
        transferAmount,
        narration,
        accountBalance
      );

      // Create transaction object
      const transaction = {
        id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        narration: narration.trim(),
        date: new Date().toISOString(),
        accountName: accountName,
        accountNumber: accountNumber,
        bank: selectedBank,
        amount: transferAmount,
        status: status, // high, medium, low
        systemInsight: insight,
        type: "debit", // since it's money going out
        createdAt: new Date(),
        processed: true,
      };

      const payload = {
        amount: transferAmount,
        accountNumber: accountNumber,
        selectedBank: selectedBank,
        narration: narration,
        transaction: transaction,
      };

      console.log("Transaction Payload: ", payload);

      setIsLoading(true);

      // Simulate API call and database update
      setTimeout(async () => {
        try {
          // Get current user ID (replace with your auth method)
          const userId = auth.currentUser?.uid; // or however you get user ID

          if (userId) {
            // Update user document with new transaction
            const userRef = doc(db, "Users", userId);

            await updateDoc(userRef, {
              transactions: arrayUnion(transaction),
              // Optionally update balance
              accountBalance: accountBalance - transferAmount,
            });

            console.log("Transaction saved to database successfully");
          }

          // Reset form
          setAmount("");
          setAccountNumber("");
          setSelectedBank("");
          setNarration("");
          setAccountName("");
          setPin("");
          setStep(1);
          closeModal();

          // Show success message with risk status
          const statusColor =
            status === "high" ? "🔴" : status === "medium" ? "🟡" : "🟢";
          toast.success(
            `Transaction completed! ${statusColor} Risk Level: ${status.toUpperCase()}. Reload your page!`
          );
        } catch (error) {
          console.error("Error saving transaction:", error);
          toast.error("Transaction failed. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }, 2000);
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("An error occurred. Please try again.");
      setIsLoading(false);
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
                        key={bank.name}
                        value={bank.name}
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
                    required
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
                  !narration ||
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
