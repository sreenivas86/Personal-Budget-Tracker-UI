// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fs-4" to="/">Budget Tracker</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <a href="https://github.com/sreenivas86" target="_blank" rel="noreferrer" className="text-white me-3 fs-5">
              <i className="bi bi-github" />
            </a>
            <Link to="/auth/login" className="btn btn-outline-light me-2">Login</Link>
            <Link to="/auth/register" className="btn btn-success">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
