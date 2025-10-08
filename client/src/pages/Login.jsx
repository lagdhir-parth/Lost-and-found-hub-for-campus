import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../stylesheets/login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const API = import.meta.env.VITE_API_URL; // your backend base URL
  const [formData, setFormData] = useState({
    username: "",
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

    try {
      const res = await axios.post(`${API}/auth/login`, formData, {
        withCredentials: true,
      });
      setSuccess("Login successful!!!");
      setFormData({
        username: "",
        password: "",
      });

      // const res2 = await axios.get(`${API}/auth/profile`);
      await setAuth({ isLoggedIn: true, user: res.data.user, loading: false });
      // setTimeout(() => {
      navigate("/profile"); // using react-router's useNavigate()
      // }, 1000);
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
    <div className="login-main-content">
      <div className="login-container">
        <p className="login-heading">Login Account</p>
        {}
        {error && (
          <p className="login-msg" style={{ color: "red" }}>
            {error}
          </p>
        )}
        {success && (
          <p className="login-msg" style={{ color: "green" }}>
            {success}
          </p>
        )}
        <div></div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-row">
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
          <div className="login-form-row">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="login-btns">
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <pre className="login-register-msg">
          You don't have an account?{" "}
          <Link to="/register" style={{ color: "#eead2b" }}>
            Register
          </Link>
        </pre>
      </div>
    </div>
  );
}

export default Login;
