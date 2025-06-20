import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllCats, getBudgetById, updateBudget } from "../apis/expenseApi";
import { toast } from "react-toastify";

function UpdateBudgetForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetRes, categoryRes] = await Promise.all([
          getBudgetById(id),
          getAllCats(),
        ]);

        const budget = budgetRes.data;
        const allCategories = categoryRes.data;

        setFormData({
          amount: budget.amount,
          month: budget.month,
          categoryId: budget.category?.categoryId || "",
        });

        setCategories(allCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        navigate("/budgets");
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
        amount: parseFloat(formData.amount),
        month: formData.month,
        category: {
          categoryId: parseInt(formData.categoryId),
        },
      };

      await updateBudget(id, payload);
      toast.success("📅 Budget updated successfully!");
      navigate("/budgets");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("❌ Failed to update budget");
    }
  };

  if (loading || !formData) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>Update Budget</h3>
      <form onSubmit={handleSubmit}>
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
          <label>Month (YYYY-MM)</label>
          <input
            className="form-control"
            name="month"
            type="month"
            value={formData.month}
            onChange={handleChange}
            required
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
          Update Budget
        </button>
      </form>
    </div>
  );
}

export default UpdateBudgetForm;
