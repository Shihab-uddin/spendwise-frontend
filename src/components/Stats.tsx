import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import IncomeTable from './IncomeTable';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Stats() {
  type Wallet = {
    id: number;
    name: string;
    description: string;
    balance: number;
    userId: number;
  };

  type Income = {
    id: number;
    name: string;
    amount: number;
    description: string;
    date: string;
  };

  type Expense = {
    id: number;
    name: string;
    amount: number;
    description: string;
    date: string;
  };

  type Transfer = {
    id: number;
    fromWalletId: number;
    toWalletId: number;
    amount: number;
    description: string;
  };

  type DashboardData = {
    totalBalance: number;
    wallets: Wallet[];
    allIncomes: Income[];
    allExpenses: Expense[];
    allTransfers: Transfer[];
  };

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  // const [year, setYear] = useState(new Date().getFullYear());
  // const [activeTable, setActiveTable] = useState('expense');

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/dashboard');
      setDashboardData(data);
    } catch (err) {
      toast.error('Failed to load dashboard data');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) return <p>Loading...</p>;

  // ChartJS Data Setup
  const walletChartData = {
    labels: dashboardData.wallets.map(w => w.name),
    datasets: [{
      label: 'Balance',
      data: dashboardData.wallets.map(w => w.balance),
      backgroundColor: '#3b82f6',
    }],
  };

  const income = dashboardData.allIncomes.reduce((acc, cur) => acc + cur.amount, 0);
  const expense = dashboardData.allExpenses.reduce((acc, cur) => acc + cur.amount, 0);

  const incomeExpenseData = {
    labels: ['Income', 'Expense'],
    datasets: [{
      label: 'Amount',
      data: [income, expense],
      backgroundColor: ['#22c55e', '#ef4444'],
    }],
  };

  return (
    <div className="p-4">
      {/* Row 1 - Charts */}
      <div className="flex gap-4 mb-6">
        <div className="w-1/2 bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Wallet Balances</h2>
          <Bar data={walletChartData} />
        </div>
        <div className="w-1/2 bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Income vs Expense</h2>
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="border p-1">
              {[...Array(12)].map((_, idx) => (
                <option key={idx} value={idx + 1}>{idx + 1}</option>
              ))}
            </select>
          </div>
          <Pie data={incomeExpenseData} />
        </div>
      </div>

      {/* Row 2 - Table and Filter */}
      <div className="bg-white p-4 rounded shadow">
        {/* <div className="flex items-center justify-between mb-3">
          <select onChange={(e) => setActiveTable(e.target.value)} value={activeTable} className="border p-1">
            <option value="wallet">Wallet</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="transfer">Transfer</option>
          </select>
          <div>
            <select onChange={(e) => setMonth(Number(e.target.value))} value={month} className="border p-1 mr-2">
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="border p-1 w-24" />
          </div>
        </div> */}

        {/* Placeholder Table */}
        {/* <h2 className="font-semibold mb-2">Recent Transaction</h2> */}
        {/* <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-center" colSpan={3}>Table data will be added later</td>
            </tr>
          </tbody>
        </table> */}
        <ExpenseTable />
        <IncomeTable />
      </div>
    </div>
  );
}
