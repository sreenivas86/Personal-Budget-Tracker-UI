// src/pages/ContactUsPage.jsx

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', mobile: '', message: '' });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container py-5 flex-grow-1">
        <h2 className="text-center mb-4">Contact Us</h2>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  className="form-control"
                  placeholder="Write your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactUsPage;
