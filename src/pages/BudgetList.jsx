import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import OpenButton from "../components/OpenButton";
import { deleteBudget, getAllBudgets } from "../apis/expenseApi"; // use correct file if it's budgetApi
import "./ExpenseList.css";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";

function BudgetList() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch budgets on mount
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await getAllBudgets(); // make sure this API function exists
        setBudgets(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load budgets", error);
      }
    };

    fetchBudgets();
  }, []);

  const handleEdit = (id) => {
    navigate(`/budget/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);
      setBudgets(budgets.filter((b) => b.budgetId !== id)); // Remove from UI
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (loading) return <p>Loading budgets...</p>;

  return (
    <div className="contaner-fluid">
      <DashboardNavbar/>
    <div className="container my-4">
      
      <h3 className="mb-3">Budgets</h3>
      <OpenButton btnName="➕ Add Budget" navUrl="/budget/add" />
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="custom-table-header">
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Amount (₹)</th>
              <th>Month</th>
              
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget, index) => (
              <tr key={budget.budgetId}>
                <td>{index + 1}</td>
                <td>
                  <span
                    className="badge text-white"
                    style={{
                      backgroundColor: budget.category.colorCode,
                    }}
                  >
                    {budget.category.name}
                  </span>
                </td>
                <td>₹ {budget.amount.toFixed(2)}</td>
                <td>{budget.month}</td>
                
                <td>
                  <EditButton onClick={() => handleEdit(budget.budgetId)} />
                  <DeleteButton onClick={() => handleDelete(budget.budgetId)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
    <Footer></Footer>
    </div>
  );
}

export default BudgetList;
