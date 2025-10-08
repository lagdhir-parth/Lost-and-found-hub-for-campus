import "../stylesheets/navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  // auth.isLoggedIn ? console.log("Logged in") : console.log("Not logged in");

  return (
    <div className="nav-main">
      <nav>
        <div className="nav-left">
          <pre>
            <i
              className="fa-solid fa-shield-halved"
              style={{ color: "#eead2b" }}
            ></i>{" "}
            Tech Titans
          </pre>
        </div>
        <div className="nav-middle">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "color-yellow" : "")}
                style={{ textDecoration: "none" }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/lostItemPage"
                className={({ isActive }) => (isActive ? "color-yellow" : "")}
                style={{ textDecoration: "none" }}
              >
                Lost item
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/foundItemPage"
                className={({ isActive }) => (isActive ? "color-yellow" : "")}
                style={{ textDecoration: "none" }}
              >
                Found items
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "color-yellow" : "")}
                style={{ textDecoration: "none" }}
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          {auth.isLoggedIn ? (
            <Link to="/profile">
              <div className="profile-logo-container">
                <i
                  className="fa-solid fa-user fa-2xl profile-logo"
                  style={{ color: "#FFD43B" }}
                ></i>
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
