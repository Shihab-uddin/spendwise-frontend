import { useEffect, useState, FormEvent } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import TransferTable from "./TransferTable";

const TransferForm = () => {
  const [wallets, setWallets] = useState([]);
  const [formData, setFormData] = useState({
    amount: 0,
    description: "",
    date: "",
    fromWalletId: "",
    toWalletId: ""
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
      await axios.post("/transfer/add", {
        ...formData,
        amount: Number(formData.amount),
        fromWalletId: Number(formData.fromWalletId),
        toWalletId: Number(formData.toWalletId),
      });
    //   alert("Transfer successful");
      toast.success('Transfer successful"');
    } catch (err) {
    //   alert("Failed to transfer");
      toast.error('Failed to transfer');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="number" className="w-full p-2 border" placeholder="Amount" required
        value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: +e.target.value })} />
      <input className="w-full p-2 border" placeholder="Description"
        value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      <input type="datetime-local" className="w-full p-2 border" required
        value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
      <select className="w-full p-2 border" required
        value={formData.fromWalletId} onChange={(e) => setFormData({ ...formData, fromWalletId: e.target.value })}>
        <option value="">From Wallet</option>
        {wallets.map((w: any) => (
          <option key={w.id} value={w.id}>{w.name}</option>
        ))}
      </select>
      <select className="w-full p-2 border" required
        value={formData.toWalletId} onChange={(e) => setFormData({ ...formData, toWalletId: e.target.value })}>
        <option value="">To Wallet</option>
        {wallets.map((w: any) => (
          <option key={w.id} value={w.id}>{w.name}</option>
        ))}
      </select>
      <button className="bg-yellow-600 text-white px-4 py-2 rounded" type="submit">
        Transfer
      </button>
    </form>
    <div className="p-6">
        <TransferTable />
    </div>
    </>
  );
};

export default TransferForm;
