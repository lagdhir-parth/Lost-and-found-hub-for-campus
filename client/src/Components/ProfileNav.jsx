import { Link, NavLink } from "react-router-dom";
import "../stylesheets/profileNav.css";

const ProfileNav = () => {
  return (
    <div className="profile-nav-main">
      <ul>
        <li>
          <NavLink to="userItems" className={({ isActive }) => (isActive ? "color-yellow" : "")} style={{textDecoration:'none'}}>All</NavLink>
        </li>{" "}
        {/* default */}
        <li>
          <NavLink to="userLostItems" className={({ isActive }) => (isActive ? "color-yellow" : "")} style={{textDecoration:'none'}}>Lost Items</NavLink>
        </li>
        <li>
          <NavLink to="userFoundItems" className={({ isActive }) => (isActive ? "color-yellow" : "")}style={{textDecoration:'none'}}>Found Items</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ProfileNav;
