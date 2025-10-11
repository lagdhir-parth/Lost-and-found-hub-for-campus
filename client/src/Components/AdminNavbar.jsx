// src/components/AdminNavbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import "../stylesheets/admin/admin.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    await setAuth({
      isLoggedIn: false,
      loading: false,
      user: null,
    });
    // You can also clear any admin auth context here if needed
    navigate("/");
  };

  const handleHomeClick = ()=>{
    navigate('/')
  }

  return (
    <nav className="admin-navbar">
      <div className="admin-logo">Admin Panel</div>

      <ul className="admin-nav-links">
        <li>
          <NavLink to="/admin/all-items" className="nav-link">
            All Items
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/lost-items" className="nav-link">
            Lost Items
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/found-items" className="nav-link">
            Found Items
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="nav-link">
            Users
          </NavLink>
        </li>
      </ul>

      <div className="admin-nav-btns">
        <button className="admin-logout-btn" style={{marginRight:'15px'}} onClick={handleHomeClick}>
          Home
        </button>
        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
