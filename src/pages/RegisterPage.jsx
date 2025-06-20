// src/pages/RegisterPage.jsx

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validation";
import "bootstrap-icons/font/bootstrap-icons.css";
import { sendData } from "../apis/authApiService";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedForm = { ...formData, [id]: value };
    setFormData(updatedForm);

    let error = "";
    if (id === "name") error = validateName(value);
    else if (id === "email") error = validateEmail(value);
    else if (id === "password") error = validatePassword(value);
    else if (id === "confirmPassword")
      error = validateConfirmPassword(updatedForm.password, value);

    const updatedErrors = { ...errors, [id]: error };

    // Re-validate confirm password if password changes
    if (id === "password" && updatedForm.confirmPassword) {
      updatedErrors.confirmPassword = validateConfirmPassword(
        value,
        updatedForm.confirmPassword
      );
    }

    setErrors(updatedErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    const newErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === "");

    if (isValid) {
      try {
        let res = await sendData({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        console.log(res)
        if (res.status === 201) {
          navigate("/auth/login");
        } else if(res.status === 409) {
          document.getElementById("afterSubmit").innerText = res.data;
        }
      } catch (error) {
        console.log(error)
        
          document.getElementById("afterSubmit").innerText =
            error.message;
        
      }
    }
  };

  const renderFeedback = (field) => {
    return errors[field] ? (
      <div className="text-danger small">{errors[field]}</div>
    ) : formData[field] ? (
      <div className="text-success small">✅</div>
    ) : null;
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1 d-flex justify-content-center align-items-center bg-light">
        <div
          className="card p-4 shadow-sm"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="text-center mb-4">Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {renderFeedback("name")}
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
              {renderFeedback("email")}
            </div>

            <div className="mb-2 position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control pe-5 ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <i
                className={`bi ${
                  showPassword ? "bi-eye-slash" : "bi-eye"
                } position-absolute top-50 end-0 translate-middle-y me-3`}
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword((prev) => !prev)}
              ></i>
              {renderFeedback("password")}
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control pe-5 ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
              <i
                className={`bi ${
                  showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                } position-absolute top-50 end-0 translate-middle-y me-3`}
                style={{ cursor: "pointer" }}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              ></i>
              {renderFeedback("confirmPassword")}
            </div>

            <button type="submit" className="btn btn-success w-100">
              Register
            </button>
            <p id="afterSubmit" className="text-danger"></p>
          </form>
          <div className="text-center mt-3">
            <small>
              Already have an account? <a href="/auth/login">Login</a>
            </small>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;
