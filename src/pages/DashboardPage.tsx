import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import WalletForm from "../components/WalletForm";
import IncomeForm from "../components/IncomeForm";
import ExpenseForm from "../components/ExpenseForm";
import TransferForm from "../components/TransferForm";
import Stats from "../components/Stats";

const DashboardPage = (): JSX.Element => {
  const [activeForm, setActiveForm] = useState<string>("stats");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleNavClick = (form: string) => {
    setActiveForm(form);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
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
    <div className="flex flex-col md:flex-row w-screen h-screen">
      {/* Mobile Header with hamburger menu */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold">Spendwise</h2>
        <button 
          onClick={toggleSidebar}
          className="p-2 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Sidebar - fixed on desktop, slide-in on mobile */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
        transform transition-transform duration-300 ease-in-out
        fixed md:relative top-0 md:top-auto left-0 z-30
        w-64 h-screen bg-gray-900 text-white p-6 space-y-4
        md:block
      `}>
        <h2 className="text-xl font-bold hidden md:block">Spendwise</h2>
        <nav className="space-y-2">
          <button onClick={() => handleNavClick("stats")} className="block w-full text-left py-2 px-1 hover:text-yellow-300">Dashboard</button>
          <button onClick={() => handleNavClick("wallet")} className="block w-full text-left py-2 px-1 hover:text-yellow-300">Add Wallet</button>
          <button onClick={() => handleNavClick("income")} className="block w-full text-left py-2 px-1 hover:text-yellow-300">Add Income</button>
          <button onClick={() => handleNavClick("expense")} className="block w-full text-left py-2 px-1 hover:text-yellow-300">Add Expense</button>
          <button onClick={() => handleNavClick("transfer")} className="block w-full text-left py-2 px-1 hover:text-yellow-300">Transfer</button>
        </nav>
        <button onClick={handleLogout} className="mt-10 text-sm text-red-400 hover:text-red-200">Logout</button>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 bg-gray-100 overflow-auto">
        <div className="bg-white shadow p-4 rounded">
          {activeForm !== 'stats' && (
            <>
              <h1 className="text-2xl font-bold mb-4 capitalize">{`Add ${activeForm}`}</h1>
              {renderForm()}
            </>
          )}
          {activeForm === 'stats' && (
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