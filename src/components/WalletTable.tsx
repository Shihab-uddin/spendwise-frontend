import { useEffect, useState, FormEvent } from "react";
import axios from "../api/axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { toast } from "react-toastify";

const WalletTable = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
  });

  const fetchWallets = () => {
    setLoading(true);
    axios
      .get("/wallet/paginated?page=1&limit=5")
      .then((res) => {
        setWallets(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch wallets:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const openModal = (wallet: any) => {
    setSelectedWallet(wallet);
    setEditData({
      name: wallet.name || "",
      description: wallet.description || "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedWallet(null);
    setShowModal(false);
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Edit form submitted (simulate save)");
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this wallet?")) return;

    axios
      .delete(`/wallet/delete/${id}`)
      .then(() => {
        toast.success("Wallet deleted successfully");
        fetchWallets();
      })
      .catch((err) => {
        toast.error("Failed to delete wallet");
        console.error(err);
      });
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Your Wallets</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Wallet Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Balance</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet: any) => (
              <tr key={wallet.id}>
                <td className="border p-2">{wallet.name}</td>
                <td className="border p-2">{wallet.description}</td>
                <td className="border p-2">৳ {wallet.balance}</td>
                <td className="border p-2">
                  {new Date(wallet.createdAt).toLocaleString()}
                </td>
                <td className="border p-2 text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => openModal(wallet)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(wallet.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Form Modal */}
      <Modal title="Edit Wallet" isOpen={showModal} onClose={closeModal}>
        <form onSubmit={handleUpdate} className="space-y-3 text-sm">
          <input
            className="w-full p-2 border"
            placeholder="Wallet Name"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            required
          />
          <textarea
            className="w-full p-2 border"
            placeholder="Description"
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default WalletTable;
