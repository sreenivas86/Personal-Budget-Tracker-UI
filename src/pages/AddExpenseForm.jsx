import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCats, addExpense } from "../apis/expenseApi";
import { toast } from "react-toastify";

function AddExpenseForm() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    note: "",
    categoryId: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCats();
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        navigate("/");
      }
    };

    fetchCategories();
  }, [navigate]);

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

      await addExpense(payload);
      toast.success("🎉 Expense added successfully!");
      navigate("/expenses");
    } catch (err) {
      console.error("Error adding expense:", err);
      toast.error("❌ Failed to add expense");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Expense</h3>
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

        <button type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default AddExpenseForm;
