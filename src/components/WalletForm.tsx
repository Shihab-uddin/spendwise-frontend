import { useState, FormEvent } from "react";
import axios from "../api/axios";
import { toast } from 'react-toastify';
import WalletTable from "./WalletTable";

const WalletForm = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/wallet/create", formData);
    //   alert("Wallet added successfully");
      toast.success('Wallet added successfully');
      setFormData({ name: "", description: "" });
    } catch (err) {
    //   alert("Failed to add wallet");
      toast.error('Failed to add wallet');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full p-2 border"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        className="w-full p-2 border"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
        Add Wallet
      </button>
    </form>
    <div className="p-6">
        <WalletTable />
    </div>
    </>
  );
};

export default WalletForm;
