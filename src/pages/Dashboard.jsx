// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import ExpenseList from "../pages/ExpenseList";
import { getAllExpenses } from "../apis/expenseApi"; // ✅ real API

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getAllExpenses();
        setExpenses(response.data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses(); // ✅ This is where you call it
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <DashboardNavbar />
      <main className="flex-grow-1 container">
        <h1 className="mt-3 mb-4">Dashboard</h1>
        <ExpenseList expenses={expenses} />
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
