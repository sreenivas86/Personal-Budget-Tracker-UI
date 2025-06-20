import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllCats, getExpenseById, updateExpense } from "../apis/expenseApi";
import { toast } from "react-toastify";

function UpdateExpenseForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expenseRes, categoryRes] = await Promise.all([
          getExpenseById(id),
          getAllCats(),
        ]);

        const expense = expenseRes.data;
        const allCategories = categoryRes.data;

        setFormData({
          title: expense.title,
          amount: expense.amount,
          date: expense.date,
          note: expense.note,
          categoryId: expense.category?.categoryId || "",
        });

        setCategories(allCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        navigate("/");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        amount: parseFloat(formData.amount),
        date: formData.date,
        note: formData.note,
        category: {
          categoryId: parseInt(formData.categoryId),
        },
      };

      await updateExpense(id, payload);
      toast.success("🎉 successfully updated")
      navigate("/expenses");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading || !formData) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>Update Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Amount (₹)</label>
          <input
            className="form-control"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Date</label>
          <input
            className="form-control"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Note</label>
          <textarea
            className="form-control"
            name="note"
            value={formData.note}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <select
            className="form-select"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateExpenseForm;
