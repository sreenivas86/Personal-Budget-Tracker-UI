import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCats, addBudget } from "../apis/expenseApi"; // Adjust if you have a separate file
import DashboardNavbar from "../components/DashboardNavbar";
import { toast } from "react-toastify";
//import "./AddBudgetForm.css"; // Optional CSS file for styling

function AddBudgetForm() {
  const [formData, setFormData] = useState({
    categoryId: "",
    amount: "",
    month: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCats(); // API call to fetch categories
        setCategories(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
    category: {
      categoryId: parseInt(formData.categoryId),
    },
    amount: parseFloat(formData.amount),
    month: formData.month,
  };
    try {
      await addBudget(requestData); // API call to add budget
      toast.success("Added successfully")
      navigate("/budgets"); // Navigate back to budget list
    } catch (error) {
      toast.error(error.response.data)
      console.error("Add budget failed", error.response.data);
    }
  };

  if (loading) return <p>Loading form...</p>;

  return (
    <div className="container my-4">
      <DashboardNavbar />
      <h3 className="mb-3">Add New Budget</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">Category</label>
          <select
            className="form-select"
            name="categoryId"
            id="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount (₹)</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="month" className="form-label">Month (YYYY-MM)</label>
          <input
            type="month"
            className="form-control"
            name="month"
            id="month"
            value={formData.month}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Budget
        </button>
      </form>
    </div>
  );
}

export default AddBudgetForm;
