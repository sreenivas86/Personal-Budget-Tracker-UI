// src/components/Footer.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="mb-2">
        <a href="mailto:sreenivasreddy.mca@gmail.com" className="text-white me-3 fs-5">
          <i className="bi bi-envelope-fill"></i>
        </a>
        <a href="https://instagram.com/sreenivas_sr" target="_blank" rel="noreferrer" className="text-white me-3 fs-5">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="text-white fs-5">
          <i className="bi bi-facebook"></i>
        </a>
      </div>
      <small>
        &copy; {new Date().getFullYear()} Budget Tracker. Developed by <strong>Sreenivas Reddy Daram</strong> |
        MCA, Sri Venkateswara University
      </small>
    </footer>
  );
}

export default Footer;
