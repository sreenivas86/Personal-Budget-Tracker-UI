import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateEmail, validatePassword } from "../utils/validation";
import { login } from "../apis/authApiService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleEmail = (e) => {
    const val = e.target.value;
    setEmail(val);
    const err = validateEmail(val);
    setEmailError(err || "");
  };

  const handlePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
    const err = validatePassword(val);
    setPasswordError(err || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!email || !password) {
      setSubmitError("All fields are required.");
      return;
    }

    try {
      const res = await login({ email, password });
      if (res.status === 200) {
        localStorage.setItem("jwtToken", res.data); // Make sure `res.data.token` exists
        navigate("/dashboard");
      }
    } catch (error) {
      setSubmitError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="flex-grow-1 d-flex justify-content-center align-items-center bg-light">
        <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleEmail}
                placeholder="Enter email"
                required
              />
              <p className="text-danger">{emailError}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={handlePassword}
                placeholder="Password"
                required
              />
              <p className="text-danger">{passwordError}</p>
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>
            <p className="text-danger mt-2">{submitError}</p>
          </form>

          <div className="text-center mt-3">
            <small>No account? <a href="/auth/register">Register here</a></small>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;
