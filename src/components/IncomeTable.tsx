import { useEffect, useState, FormEvent } from "react";
import axios from "../api/axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { toast } from "react-toastify";

const IncomeTable = () => {
  const [incomes, setIncomes] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncome, setSelectedIncome] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [editData, setEditData] = useState({
    name: "",
    amount: 0,
    description: "",
    date: "",
    walletId: "",
  });

  const limit = 5;

  const fetchIncomes = () => {
    setLoading(true);
    const params: any = {
      page: currentPage,
      limit,
    };

    // If month & year selected, generate startDate and endDate
    if (selectedMonth && selectedYear) {
      const startDate = `${selectedYear}-${selectedMonth}-01`;
      const endDate = new Date(
        parseInt(selectedYear),
        parseInt(selectedMonth),
        0
      )
        .toISOString()
        .slice(0, 10);
      params.startDate = startDate;
      params.endDate = endDate;
    }

    axios
      .get("/income/paginated", { params })
      .then((res) => {
        setIncomes(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch income data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIncomes();
  }, [currentPage, selectedMonth, selectedYear]);

  useEffect(() => {
    axios
      .get("/dashboard")
      .then((res) => {
        if (res.data?.wallets) {
          setWallets(res.data.wallets);
        }
      })
      .catch((err) => console.error("Failed to fetch wallets:", err));
  }, []);

  const openModal = (income: any) => {
    setSelectedIncome(income);
    setEditData({
      name: income.name || "",
      amount: income.amount || 0,
      description: income.description || "",
      date: income.date ? income.date.slice(0, 16) : "",
      walletId: income.walletId?.toString() || "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedIncome(null);
    setShowModal(false);
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();

    if (!selectedIncome) return;

    axios
      .put(`/income/update/${selectedIncome.id}`, {
        ...editData,
        amount: Number(editData.amount),
        walletId: Number(editData.walletId),
      })
      .then(() => {
        toast.success("Income updated successfully");
        closeModal();
        fetchIncomes();
      })
      .catch((err) => {
        toast.error("Failed to update income");
        console.error(err);
      });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this income?")) return;

    axios
      .delete(`/income/delete/${id}`)
      .then(() => {
        toast.success("Income deleted successfully");
        fetchIncomes();
      })
      .catch((err) => {
        toast.error("Failed to delete income");
        console.error(err);
      });
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Recent Incomes</h2>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <select
          className="border p-2"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Month</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Year</option>
          {["2023", "2024", "2025", "2026"].map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>

        <button
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          onClick={() => {
            setSelectedMonth("");
            setSelectedYear("");
            setCurrentPage(1);
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Serial</th>
                <th className="border p-2">Income Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Wallet Name</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Date Created</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.description}</td>
                  <td className="border p-2">{item.wallet?.name || "N/A"}</td>
                  <td className="border p-2">৳ {item.amount}</td>
                  <td className="border p-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => openModal(item)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Edit Form Modal */}
      <Modal title="Edit Income" isOpen={showModal} onClose={closeModal}>
        <form onSubmit={handleUpdate} className="space-y-3 text-sm">
          <input
            className="w-full p-2 border"
            placeholder="Name"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            required
          />
          <input
            type="number"
            className="w-full p-2 border"
            placeholder="Amount"
            value={editData.amount}
            onChange={(e) =>
              setEditData({ ...editData, amount: +e.target.value })
            }
            required
          />
          <input
            className="w-full p-2 border"
            placeholder="Description"
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
          <input
            type="datetime-local"
            className="w-full p-2 border"
            value={editData.date}
            onChange={(e) =>
              setEditData({ ...editData, date: e.target.value })
            }
            required
          />
          <select
            className="w-full p-2 border"
            value={editData.walletId}
            onChange={(e) =>
              setEditData({ ...editData, walletId: e.target.value })
            }
            required
          >
            <option value="">Select Wallet</option>
            {wallets.map((w: any) => (
              <option key={w.id} value={String(w.id)}>
                {w.name}
              </option>
            ))}
          </select>
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

export default IncomeTable;
