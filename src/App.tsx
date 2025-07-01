import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages";
import Dashboard from "./pages/Dashboard/Dashboard";
import TransactionHistory from "./pages/History/TransactionHistory";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<TransactionHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
