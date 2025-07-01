//@ts-nocheck
import { useState } from "react";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import TransactionTable from "./components/TransactionTable";
// import { transactions } from "../transactions";
import FilterBar from "./components/FilterBar";
import useUserData from "../../hooks/useUserData";
import { useUserStore } from "../../store/userStore";

export default function TransactionHistory() {
  useUserData();
  const { transactions } = useUserStore();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === "all" || transaction.status === filter;
    const matchesSearch =
      transaction.narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.accountName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.bank.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || transaction.narration === categoryFilter;
    return matchesFilter && matchesSearch && matchesCategory;
  });

  const totalTransactions = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce((sum, t) => {
    return sum + (t.type === "received" ? t.amount : -t.amount);
  }, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsBar
          totalTransactions={totalTransactions}
          totalAmount={totalAmount}
          filteredTransactions={filteredTransactions}
        />
        <FilterBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TransactionTable filteredTransactions={filteredTransactions} />
      </div>
    </div>
  );
}
