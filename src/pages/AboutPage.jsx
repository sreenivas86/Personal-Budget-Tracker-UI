// src/pages/AboutPage.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function AboutPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container my-5 flex-grow-1">
        {/* App Description */}
        <div className="text-center mb-5">
          <h1 className="mb-3">About Budget Tracker</h1>
          <p className="lead">
            Budget Tracker is a user-friendly application designed to help individuals and families track their income and expenses,
            set monthly budgets, and make smarter financial decisions. It offers real-time insights into your spending habits so you can stay financially healthy.
          </p>
        </div>

        {/* Developer Details */}
        <div className="card shadow p-4">
          <h3 className="mb-3">Developer Info</h3>

          <p><strong>Name:</strong> Sreenivas Reddy Daram</p>
          <p><strong>Email:</strong> <a href="mailto:sreenivasreddydaram@gmail.com">sreenivasreddydaram@gmail.com</a></p>
          <p><strong>Education:</strong> Master of Computer Applications, Sri Venkateswara University</p>

          {/* Skills */}
          <div className="mt-4">
            <h5>Skills</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">✅ Python, Java, JavaScript</li>
              <li className="list-group-item">✅ Flask, Spring Security, Spring Boot, Express.js</li>
              <li className="list-group-item">✅ MySQL, MongoDB</li>
              <li className="list-group-item">✅ React.js, Node.js</li>
              <li className="list-group-item">✅ DevOps: Docker, Jenkins, Kubernetes, AWS</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="mt-4">
            <h5>Connect With Me</h5>
            <div className="d-flex gap-4 fs-4 mt-2">
              <a href="https://github.com/sreenivas86" target="_blank" rel="noreferrer" className="text-dark">
                <i className="bi bi-github"></i>
              </a>
              <a href="https://linkedin.com/in/sreenivas86" target="_blank" rel="noreferrer" className="text-primary">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://instagram.com/sreenivas_sr" target="_blank" rel="noreferrer" className="text-danger">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutPage;
