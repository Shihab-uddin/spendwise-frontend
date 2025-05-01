import { JSX } from "react";
import { useNavigate } from "react-router-dom";

// src/pages/DashboardPage.jsx


const DashboardPage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="flex w-screen h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Spendwise</h2>
        <nav className="space-y-2">
          <a href="#" className="block hover:text-yellow-300">Add Wallet</a>
          <a href="#" className="block hover:text-yellow-300">Add Income</a>
          <a href="#" className="block hover:text-yellow-300">Add Expense</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white shadow p-4 rounded">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="relative group">
            <button className="font-semibold">Shihab ▼</button>
            <div className="absolute right-0 hidden group-hover:block bg-white border mt-1 shadow-lg">
              <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">Logout</button>
            </div>
          </div>
        </div>
        <div className="mt-6">Main Dashboard Content...</div>
      </div>
    </div>
  );
};
export default DashboardPage;
