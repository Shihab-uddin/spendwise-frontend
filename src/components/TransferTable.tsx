// TransferTable.tsx
import { useEffect, useState, FormEvent } from "react";
import axios from "../api/axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { toast } from "react-toastify";

const TransferTable = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransfer, setSelectedTransfer] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    description: "",
    amount: 0,
    date: "",
  });

  const fetchTransfers = () => {
    setLoading(true);
    axios
      .get("/transfer/paginated?page=1&limit=5")
      .then((res) => {
        setTransfers(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch transfer data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const openModal = (transfer: any) => {
    setSelectedTransfer(transfer);
    setEditData({
      description: transfer.description || "",
      amount: transfer.amount || 0,
      date: transfer.date ? transfer.date.slice(0, 16) : "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTransfer(null);
    setShowModal(false);
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Edit form submitted (simulate save)");
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this transfer?")) return;

    axios
      .delete(`/transfer/delete/${id}`)
      .then(() => {
        toast.success("Transfer deleted successfully");
        fetchTransfers();
      })
      .catch((err) => {
        toast.error("Failed to delete transfer");
        console.error(err);
      });
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Recent Transfers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Serial</th>
              <th className="border p-2">Transfer From</th>
              <th className="border p-2">Transfer To</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date Created</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((item: any, index: number) => (
              <tr key={item.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{item.fromWallet?.name || "N/A"}</td>
                <td className="border p-2">{item.toWallet?.name || "N/A"}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">৳ {item.amount}</td>
                <td className="border p-2">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="border p-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => openModal(item)}>
                    <FiEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(item.id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal title="Edit Transfer" isOpen={showModal} onClose={closeModal}>
        <form onSubmit={handleUpdate} className="space-y-3 text-sm">
          <input
            className="w-full p-2 border"
            placeholder="Description"
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          />
          <input
            type="number"
            className="w-full p-2 border"
            placeholder="Amount"
            value={editData.amount}
            onChange={(e) => setEditData({ ...editData, amount: +e.target.value })}
            required
          />
          <input
            type="datetime-local"
            className="w-full p-2 border"
            value={editData.date}
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            required
          />
          <div className="flex justify-end pt-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TransferTable;