import React from "react";
import "./ExpenseList.css";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import { deleteExpense } from "../apis/expenseApi";
import { useNavigate } from "react-router-dom";
import OpenButton from "../components/OpenButton";

function ExpenseList({ expenses }) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/expense/edit/${id}`);
  };
  const handleDelete = async (id) => {
    await deleteExpense(id);
    navigate(0);
  };
  return (
    <div className="container my-4">
      <h3 className="mb-3">Expenses</h3>
      <OpenButton btnName="➕ Add Expense" navUrl="/expense/add" />
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="custom-table-header">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Amount (₹)</th>
              <th>Date</th>
              <th>Note</th>
              <th>Category</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => (
              <tr key={exp.expenseId}>
                <td>{index + 1}</td>
                <td>{exp.title}</td>
                <td>₹ {exp.amount.toFixed(2)}</td>
                <td>{exp.date}</td>
                <td>{exp.note}</td>
                <td>
                  <span
                    className="badge text-white"
                    style={{
                      backgroundColor: exp.category.colorCode,
                    }}
                  >
                    {exp.category.name}
                  </span>
                </td>
                <td>
                  <EditButton
                    onClick={() => {
                      handleEdit(exp.expenseId);
                    }}
                  />
                  <DeleteButton onClick={() => handleDelete(exp.expenseId)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseList;
