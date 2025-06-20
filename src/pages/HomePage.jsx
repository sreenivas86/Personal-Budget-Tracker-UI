// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // <- Import Footer

function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center py-5">
        <h1 className="mb-4">Welcome to Budget Tracker</h1>
        <p className="lead mb-4 px-3">
          Budget Tracker is a simple and efficient web application that helps you manage your income,
          track expenses, set monthly budgets, and gain insights into your financial habits.
        </p>
        <Link to="/auth/login" className="btn btn-primary btn-lg">Get Started</Link>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
