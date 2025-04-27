import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import WalletsPage from "../pages/WalletsPage";
import IncomesPage from "../pages/IncomesPage";
import ExpensesPage from "../pages/ExpensesPage";
import TransfersPage from "../pages/TransfersPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="wallets" element={<WalletsPage />} />
          <Route path="incomes" element={<IncomesPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="transfers" element={<TransfersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
