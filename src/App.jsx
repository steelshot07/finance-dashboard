import { useState, useEffect } from "react";
import { mockTransactions } from "./data/mockData";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import Charts from "./components/Charts";
import TransactionsTable from "./components/TransactionsTable";
import InsightsSection from "./components/InsightsSection";
import "./styles/dashboard.css";

function App() {

  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("fintrack-transactions");
      return saved ? JSON.parse(saved) : mockTransactions;
    } catch {
      return mockTransactions;
    }
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("fintrack-role") || "viewer";
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("fintrack-darkmode") === "true";
  });

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    localStorage.setItem("fintrack-transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("fintrack-role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("fintrack-darkmode", String(darkMode));
  }, [darkMode]);

  const addTransaction = (newTx) => {
    setTransactions((prev) => [...prev, { ...newTx, id: Date.now() }]);
  };

  return (
    <div className={`app-wrapper ${darkMode ? "dark" : ""}`}>
      <Header role={role} setRole={setRole} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="container-fluid px-4 py-4">
        <SummaryCards transactions={transactions} />
        <Charts transactions={transactions} />
        <TransactionsTable
          transactions={transactions}
          role={role}
          search={search}
          setSearch={setSearch}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterType={filterType}
          setFilterType={setFilterType}
          addTransaction={addTransaction}
        />
        <InsightsSection transactions={transactions} />
      </main>
    </div>
  );
}

export default App;