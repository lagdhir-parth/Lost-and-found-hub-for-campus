import { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/register.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const API = import.meta.env.VITE_API_URL; // your backend base URL
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(`${API}/auth/register`, formData);
      setSuccess("Registration successful!");
      setFormData({
        username: "",
        name: "",
        email: "",
        password: "",
        m_no: "",
      });
      // Navigate to another route in the frontend
      setTimeout(() => {
        navigate("/login"); // using react-router's useNavigate()
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer); // If error changes again before the 3 seconds are up, the old timer is cleared, preventing multiple timers running at the same time.
    }
  }, [success]);

  return (
    <div className="main-content">
      <div className="register-container">
        <p className="heading">Register Account</p>
        {}
        {error && (
          <p className="msg" style={{ color: "red" }}>
            {error}
          </p>
        )}
        {success && (
          <p className="msg" style={{ color: "green" }}>
            {success}
          </p>
        )}
        <div></div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-row">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="form-row">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              required
            />
          </div>

          <div className="form-row">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your e-mail ID"
              required
            />
          </div>
          <div className="form-row">
            <label>Mobile number:</label>
            <input
              type="text"
              name="m_no"
              value={formData.m_no}
              onChange={handleChange}
              placeholder="Mobile number (Optional)"
            />
          </div>
          <div className="btns">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  username: "",
                  name: "",
                  email: "",
                  password: "",
                  m_no: "",
                })
              }
            >
              Clear
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <pre className="loginPage-msg">
          You already have an account?{" "}
          <Link to="/login" style={{ color: "#eead2b" }}>
            Login
          </Link>
        </pre>
      </div>
    </div>
  );
}

export default Register;
