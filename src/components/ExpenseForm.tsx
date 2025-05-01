import { useEffect, useState, FormEvent } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import ExpenseTable from "./ExpenseTable";

const ExpenseForm = () => {
  const [wallets, setWallets] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    amount: 0,
    date: "",
    description: "",
    walletId: ""
  });

  useEffect(() => {
    axios.get("/dashboard")
      .then((res) => {
        if (res.data && res.data.wallets) {
          setWallets(res.data.wallets);
        }
      })
      .catch((err) => console.error("Failed to fetch dashboard data:", err));
    }, []); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/expense/add", { ...formData, amount: Number(formData.amount), walletId: Number(formData.walletId), });
    //   alert("Expense added");
      toast.success('Expense added successfully');
    } catch (err) {
      alert("Failed to add expense");
      toast.error('Failed to add expense');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="w-full p-2 border" placeholder="Name" required
        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input type="number" className="w-full p-2 border" placeholder="Amount" required
        value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: +e.target.value })} />
      <input type="datetime-local" className="w-full p-2 border" required
        value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
      <input className="w-full p-2 border" placeholder="Description"
        value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      <select className="w-full p-2 border" required
        value={formData.walletId} onChange={(e) => setFormData({ ...formData, walletId: e.target.value })}>
        <option value="">Select Wallet</option>
        {wallets.map((w: any) => (
          <option key={w.id} value={w.id}>{w.name}</option>
        ))}
      </select>
      <button className="bg-red-600 text-white px-4 py-2 rounded" type="submit">
        Add Expense
      </button>
    </form>
    <div className="p-6">
        <ExpenseTable />
    </div>
    </>
  );
};

export default ExpenseForm;
