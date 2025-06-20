// src/components/DashboardNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/auth/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold fs-4">Budget Tracker</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/expenses" className="nav-link">
                Expense
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/budgets" className="nav-link">
                Budget
              </Link>
            </li>
          </ul>

          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
