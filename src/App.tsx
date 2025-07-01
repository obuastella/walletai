import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages";
import Dashboard from "./pages/Dashboard/Dashboard";
import TransactionHistory from "./pages/History/TransactionHistory";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./pages/(Auth)/VerifyEmail/VerifyEmail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<TransactionHistory />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
