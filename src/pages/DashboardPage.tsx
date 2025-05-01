import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import WalletForm from "../components/WalletForm";
import IncomeForm from "../components/IncomeForm";
import ExpenseForm from "../components/ExpenseForm";
import TransferForm from "../components/TransferForm";
import Stats from "../components/Stats";

const DashboardPage = (): JSX.Element => {
  const [activeForm, setActiveForm] = useState<string>("stats");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderForm = () => {
    switch (activeForm) {
      case "stats": return <Stats />;
      case "wallet": return <WalletForm />;
      case "income": return <IncomeForm />;
      case "expense": return <ExpenseForm />;
      case "transfer": return <TransferForm />;
      default: return null;
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="w-64 h-screen fixed top-0 left-0 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Spendwise</h2>
        <nav className="space-y-2">
          <button onClick={() => setActiveForm("stats")} className="block hover:text-yellow-300">Dashboard</button>
          <button onClick={() => setActiveForm("wallet")} className="block hover:text-yellow-300">Add Wallet</button>
          <button onClick={() => setActiveForm("income")} className="block hover:text-yellow-300">Add Income</button>
          <button onClick={() => setActiveForm("expense")} className="block hover:text-yellow-300">Add Expense</button>
          <button onClick={() => setActiveForm("transfer")} className="block hover:text-yellow-300">Transfer</button>
        </nav>
        <button onClick={handleLogout} className="mt-10 text-sm text-red-400 hover:text-red-200">Logout</button>
      </div>

      <div className="ml-64 flex-1 p-6 bg-gray-100 overflow-auto">
        <div className="bg-white shadow p-4 rounded">
        {activeForm !== 'stats' && (
          <>
            <h1 className="text-2xl font-bold mb-4 capitalize">{`Add ${activeForm}`}</h1>
            {renderForm()}
          </>
        )}
        {activeForm == 'stats' && (
          <>
            <h1 className="text-2xl font-bold mb-4 capitalize">Dashboard Overview</h1>
            {renderForm()}
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
