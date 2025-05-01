import { Routes, Route } from "react-router-dom";
// import Layout from "../components/Layout";
// import RegisterPage from "../pages/RegisterPage";
// import LoginPage from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";
import WalletsPage from "../pages/WalletsPage";
import IncomesPage from "../pages/IncomesPage";
import ExpensesPage from "../pages/ExpensesPage";
import TransfersPage from "../pages/TransfersPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/wallets" element={<ProtectedRoute><WalletsPage /></ProtectedRoute>} />
        <Route path="/incomes" element={<ProtectedRoute><IncomesPage /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute><ExpensesPage /></ProtectedRoute>} />
        <Route path="/transfers" element={<ProtectedRoute><TransfersPage /></ProtectedRoute>} />
      </Routes>
    
  );
}
